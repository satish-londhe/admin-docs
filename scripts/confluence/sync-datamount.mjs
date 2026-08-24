#!/usr/bin/env node
/**
 * Prepare DataMount markdown and sync to Confluence via markfluence.
 *
 * Credentials: .env.confluence (local) or environment variables / GitHub secrets.
 *
 * Runs two prepare+sync passes: the first creates/updates pages; the second
 * re-resolves page IDs from Confluence and rewrites cross-links to full URLs.
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) {
    return;
  }
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function normalizeConfluenceDomain(raw) {
  let domain = raw.trim();
  domain = domain.replace(/^https?:\/\//i, '');
  domain = domain.replace(/\/.*$/, '');
  return domain;
}

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required variable: ${name}`);
    console.error('Copy .env.confluence.example to .env.confluence and fill in values.');
    process.exit(1);
  }
  return value;
}

function runPrepare() {
  return spawnSync('node', [path.join(__dirname, 'prepare-datamount.mjs')], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  });
}

function runMarkfluence(args, syncDir) {
  const bin = path.join(ROOT, 'node_modules', '.bin', 'markfluence');
  return spawnSync(bin, [...args, syncDir], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  });
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose') || args.includes('-v');
const enableMermaid =
  args.includes('--mermaid') || process.env.CONFLUENCE_MERMAID === 'true';
const noMermaid = !enableMermaid;

loadEnvFile(path.join(ROOT, '.env.confluence'));

const domain = normalizeConfluenceDomain(required('CONFLUENCE_DOMAIN'));
const space = required('CONFLUENCE_SPACE');
const email = required('CONFLUENCE_EMAIL');
const token = required('CONFLUENCE_API_TOKEN');
const parent = process.env.CONFLUENCE_PARENT_PAGE_ID;

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'datamount.config.json'), 'utf8'),
);
const syncDir = path.join(ROOT, config.prepareDir);

const markfluenceArgs = [
  '--domain',
  domain,
  '--space',
  space,
  '--user',
  email,
  '--token',
  token,
];

if (parent) {
  markfluenceArgs.push('--parent', parent);
}
if (dryRun) {
  markfluenceArgs.push('--dry-run');
}
if (verbose) {
  markfluenceArgs.push('--verbose');
}
if (noMermaid) {
  markfluenceArgs.push('--no-mermaid');
}

for (const pass of [1, 2]) {
  if (pass === 2 && dryRun) {
    console.log('\n--- Pass 2 (cross-link refresh preview) ---\n');
  } else if (pass === 2) {
    console.log('\n--- Pass 2: refresh cross-links with Confluence page IDs ---\n');
  }

  const prepare = runPrepare();
  if (prepare.status !== 0) {
    process.exit(prepare.status ?? 1);
  }

  const result = runMarkfluence(markfluenceArgs, syncDir);
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

process.exit(0);
