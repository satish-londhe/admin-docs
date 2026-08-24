#!/usr/bin/env node
/**
 * Prepare Docusaurus DataMount markdown for markfluence → Confluence sync.
 * - Excludes redirect stub pages (unlisted or config exclude list)
 * - Converts :::admonition blocks to markfluence [!NOTE]/[!WARNING] syntax
 * - Rewrites /img/... paths for local attachment upload
 * - Rewrites internal doc links to Confluence page URLs (resolved via API)
 */

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

function loadConfig() {
  const configPath = path.join(__dirname, 'datamount.config.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function rimraf(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const ADMONITION_MAP = {
  info: 'NOTE',
  note: 'NOTE',
  tip: 'TIP',
  warning: 'WARNING',
  danger: 'WARNING',
  important: 'NOTE',
};

function convertAdmonitions(content) {
  const lines = content.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const match = lines[i].match(/^:::(\w+)(?:\[(.+)\])?\s*$/);
    if (!match) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const type = match[1].toLowerCase();
    const title = match[2]?.trim();
    const tag = ADMONITION_MAP[type] ?? 'NOTE';
    i += 1;

    const body = [];
    while (i < lines.length && lines[i].trim() !== ':::') {
      body.push(lines[i]);
      i += 1;
    }
    if (i < lines.length && lines[i].trim() === ':::') {
      i += 1;
    }

    out.push(`> [!${tag}]`);
    if (title) {
      out.push(`> **${title}**`);
    }
    for (const line of body) {
      out.push(line ? `> ${line}` : '>');
    }
    out.push('');
  }

  return out.join('\n');
}

function stripNoPrintBlocks(content) {
  return content.replace(/<div class="no-print">\s*[\s\S]*?\s*<\/div>\s*/g, '');
}

function sanitizeFrontmatter(content) {
  if (!content.startsWith('---\n')) {
    return content;
  }

  const end = content.indexOf('\n---\n', 4);
  if (end === -1) {
    return content;
  }

  const frontmatter = content.slice(4, end);
  const body = content.slice(end + 5);
  const kept = [];

  for (const line of frontmatter.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (/^(sidebar_position|tags|unlisted)\s*:/.test(trimmed)) {
      continue;
    }
    kept.push(line);
  }

  if (kept.length === 0) {
    return body;
  }

  return `---\n${kept.join('\n')}\n---\n${body}`;
}

function normalizeConfluenceDomain(raw) {
  return raw.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
}

async function fetchConfluencePages(domain, space, email, token) {
  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  const baseUrl = `https://${domain}/wiki/rest/api`;
  const pages = [];
  let start = 0;
  const limit = 100;

  while (true) {
    const url =
      `${baseUrl}/content?spaceKey=${encodeURIComponent(space)}` +
      `&type=page&limit=${limit}&start=${start}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Confluence API ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    pages.push(...(data.results ?? []));
    const batchSize = data.size ?? data.results?.length ?? 0;
    const total = data.totalSize ?? pages.length;
    if (batchSize < limit || pages.length >= total) {
      break;
    }
    start += limit;
  }

  return pages;
}

async function enrichRegistryFromConfluence(registry, domain, space, email, token) {
  const pages = await fetchConfluencePages(domain, space, email, token);
  const byTitle = new Map(pages.map((page) => [page.title, String(page.id)]));
  let resolved = 0;

  for (const entry of registry.values()) {
    if (!entry.pageId && byTitle.has(entry.title)) {
      entry.pageId = byTitle.get(entry.title);
      resolved += 1;
    }
  }

  console.log(
    `Resolved ${resolved} page ID(s) from Confluence (${pages.length} page(s) in ${space}).`,
  );
}

function buildConfluencePageUrl(domain, space, target, anchor) {
  if (!target.pageId) {
    return null;
  }
  const url =
    `https://${domain}/wiki/spaces/${encodeURIComponent(space)}` +
    `/pages/${target.pageId}`;
  return anchor ? `${url}${anchor}` : url;
}

function rewriteConfluenceLinks(content, registry, domain, space) {
  if (!domain || !space) {
    return content;
  }

  return content.replace(
    /\[([^\]]+)\]\(\/engagements\/datamount\/?([^)#]*)(#[^)]+)?\)/g,
    (match, linkText, slugPart, hash = '') => {
      const slug = slugFromLinkPath(slugPart);
      const target = registry.get(slug);
      if (!target) {
        console.warn(`Warning: no Confluence page mapping for slug "${slug}"`);
        return match;
      }
      const url = buildConfluencePageUrl(domain, space, target, hash);
      if (!url) {
        return match;
      }
      return `[${linkText}](${url})`;
    },
  );
}

function parseFrontmatterFields(raw) {
  const titleMatch =
    raw.match(/^title:\s*"(.*)"\s*$/m) || raw.match(/^title:\s*(.+)\s*$/m);
  const pageIdMatch = raw.match(/^confluence-page-id:\s*(\d+)\s*$/m);
  let title = titleMatch ? titleMatch[1].trim() : null;
  if (title?.startsWith('"') && title.endsWith('"')) {
    title = title.slice(1, -1);
  }
  return {
    title,
    pageId: pageIdMatch ? pageIdMatch[1] : null,
  };
}

function slugFromLinkPath(pathPart) {
  const normalized = pathPart.replace(/\/$/, '').trim();
  if (!normalized || normalized === 'index') {
    return 'index';
  }
  return normalized.split('/').pop();
}

function buildPageRegistry(sourceDir, excludeFiles, pageMapPath) {
  const registry = new Map();
  let pageMap = {};

  if (pageMapPath && fs.existsSync(pageMapPath)) {
    pageMap = JSON.parse(fs.readFileSync(pageMapPath, 'utf8'));
    delete pageMap._comment;
  }

  for (const file of fs.readdirSync(sourceDir).filter((f) => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(sourceDir, file), 'utf8');
    if (shouldExclude(file, raw, excludeFiles)) {
      continue;
    }

    const slug = file === 'index.md' ? 'index' : file.replace(/\.md$/, '');
    const { title, pageId } = parseFrontmatterFields(raw);
    const mappedId = pageMap[slug];
    const resolvedPageId =
      pageId || (mappedId && String(mappedId).trim() ? String(mappedId).trim() : null);

    registry.set(slug, {
      title: title || slug,
      pageId: resolvedPageId,
    });
  }

  return registry;
}

function rewriteImages(content, fileRelDir) {
  const staticPrefix = path
    .relative(fileRelDir, path.join(ROOT, '.confluence-sync/static'))
    .split(path.sep)
    .join('/');

  return content
    .replace(/!\[([^\]]*)\]\(\/img\/([^)]+)\)/g, (_, alt, imgPath) => {
      return `![${alt}](${staticPrefix}/img/${imgPath})`;
    })
    .replace(
      /^img\/screenshots\/datamount\/([^\s]+\.png)\s*$/gm,
      (_, filename) => `${staticPrefix}/img/screenshots/datamount/${filename}`,
    );
}

function replaceMermaidBlocks(content) {
  const enableMermaid = process.env.CONFLUENCE_MERMAID === 'true';
  if (enableMermaid) {
    return content;
  }

  return content.replace(/```mermaid\n([\s\S]*?)```/g, () => {
    return `> [!NOTE]
> **Diagram**
>
> Mermaid diagram on this page. Re-sync with \`CONFLUENCE_MERMAID=true\` or \`--mermaid\` to render as a PNG attachment in Confluence.
`;
  });
}

function shouldExclude(fileName, content, excludeFiles) {
  if (excludeFiles.includes(fileName)) {
    return true;
  }
  if (/^unlisted:\s*true\s*$/m.test(content.split('---\n')[1] ?? '')) {
    return true;
  }
  if (content.includes('# Page moved')) {
    return true;
  }
  return false;
}

async function prepare() {
  const config = loadConfig();
  const sourceDir = path.join(ROOT, config.sourceDir);
  const prepareDir = path.join(ROOT, config.prepareDir);
  const staticSource = path.join(ROOT, config.staticSourceDir);
  const staticPrepare = path.join(ROOT, config.staticPrepareDir);
  const pageMapPath = config.pageMapFile
    ? path.join(ROOT, config.pageMapFile)
    : null;
  const confluenceSpace = process.env.CONFLUENCE_SPACE?.trim() || '';
  const confluenceDomain = process.env.CONFLUENCE_DOMAIN
    ? normalizeConfluenceDomain(process.env.CONFLUENCE_DOMAIN)
    : '';
  const confluenceEmail = process.env.CONFLUENCE_EMAIL?.trim() || '';
  const confluenceToken = process.env.CONFLUENCE_API_TOKEN?.trim() || '';

  const pageRegistry = buildPageRegistry(
    sourceDir,
    config.excludeFiles,
    pageMapPath,
  );

  if (confluenceDomain && confluenceSpace && confluenceEmail && confluenceToken) {
    try {
      await enrichRegistryFromConfluence(
        pageRegistry,
        confluenceDomain,
        confluenceSpace,
        confluenceEmail,
        confluenceToken,
      );
    } catch (error) {
      console.warn(`Could not resolve page IDs from Confluence: ${error.message}`);
    }
  }

  rimraf(path.join(ROOT, '.confluence-sync'));
  fs.mkdirSync(prepareDir, { recursive: true });
  copyDir(staticSource, staticPrepare);

  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.md'));
  let included = 0;
  let skipped = 0;

  for (const file of files) {
    const srcPath = path.join(sourceDir, file);
    const raw = fs.readFileSync(srcPath, 'utf8');

    if (shouldExclude(file, raw, config.excludeFiles)) {
      skipped += 1;
      continue;
    }

    let content = sanitizeFrontmatter(raw);
    content = stripNoPrintBlocks(content);
    content = convertAdmonitions(content);
    content = replaceMermaidBlocks(content);
    content = rewriteImages(content, prepareDir);
    content = rewriteConfluenceLinks(
      content,
      pageRegistry,
      confluenceDomain,
      confluenceSpace,
    );

    fs.writeFileSync(path.join(prepareDir, file), content, 'utf8');
    included += 1;
  }

  console.log(`Prepared ${included} page(s) for Confluence sync (${skipped} skipped).`);
  console.log(`Output: ${prepareDir}`);
  if (confluenceDomain && confluenceSpace) {
    const withIds = [...pageRegistry.values()].filter((p) => p.pageId).length;
    console.log(
      `Internal links → https://${confluenceDomain}/wiki/spaces/${confluenceSpace}/pages/… (${withIds}/${pageRegistry.size} pages resolved).`,
    );
    if (withIds < pageRegistry.size) {
      console.warn(
        'Some pages have no Confluence ID yet — run sync once, then sync again to wire cross-links.',
      );
    }
  } else {
    console.warn(
      'CONFLUENCE_DOMAIN and CONFLUENCE_SPACE required — internal links left as Docusaurus paths.',
    );
  }
  if (process.env.CONFLUENCE_MERMAID === 'true') {
    console.log('Mermaid blocks preserved (CONFLUENCE_MERMAID=true).');
  } else {
    console.log(
      'Mermaid blocks replaced with sync hint (set CONFLUENCE_MERMAID=true or pass --mermaid to render PNGs).',
    );
  }
}

loadEnvFile(path.join(ROOT, '.env.confluence'));
await prepare();
