#!/usr/bin/env node
/**
 * One-time Google OAuth for DataMount Google Doc sync.
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/documents',
];

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

function expandHome(value) {
  return value.replace(/^~(?=$|[/\\])/, process.env.HOME || '');
}

function oauthPaths() {
  return {
    keys: expandHome(
      process.env.GOOGLE_OAUTH_KEYS_PATH ||
        '~/.config/cmp-docs/gcp-oauth.keys.json',
    ),
    token: expandHome(
      process.env.GOOGLE_TOKEN_PATH ||
        '~/.config/cmp-docs/.gdrive-server-credentials.json',
    ),
  };
}

loadEnvFile(path.join(ROOT, '.env.gdocs'));

const { keys, token } = oauthPaths();
if (!fs.existsSync(keys)) {
  console.error(`OAuth keys not found: ${keys}`);
  console.error('See scripts/google-docs/README.md');
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(keys, 'utf8'));
const block = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  block.client_id,
  block.client_secret,
  block.redirect_uris?.[0] || 'http://127.0.0.1:4321/oauth2callback',
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
});

console.log('Open this URL in your browser:\n');
console.log(authUrl);
console.log('');

const code = await new Promise((resolve, reject) => {
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1:4321');
      if (url.pathname !== '/oauth2callback') {
        res.writeHead(404);
        res.end();
        return;
      }
      const authCode = url.searchParams.get('code');
      if (!authCode) {
        res.writeHead(400);
        res.end('Missing code');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Authorization complete.</h1><p>Return to the terminal.</p>');
      server.close();
      resolve(authCode);
    } catch (error) {
      reject(error);
    }
  });
  server.listen(4321, '127.0.0.1');
});

const { tokens } = await oAuth2Client.getToken(code);
fs.mkdirSync(path.dirname(token), { recursive: true });
fs.writeFileSync(token, JSON.stringify(tokens, null, 2));
console.log(`Saved OAuth token: ${token}`);
console.log('You can now run: npm run sync:gdocs:datamount');
