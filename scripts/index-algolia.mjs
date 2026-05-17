/**
 * Indexes CMP Admin Docs content into Algolia.
 * Run: ALGOLIA_ADMIN_KEY=<your-admin-key> node scripts/index-algolia.mjs
 *
 * Find your Admin API Key at:
 * https://dashboard.algolia.com → API Keys → Admin API Key
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { algoliasearch } from '../node_modules/algoliasearch/dist/node.js';

const APP_ID = '296NWKX1XL';
const INDEX_NAME = 'cmp-admin-docs';
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

if (!ADMIN_KEY) {
  console.error('Error: ALGOLIA_ADMIN_KEY env var is required.');
  console.error('Run: ALGOLIA_ADMIN_KEY=<key> node scripts/index-algolia.mjs');
  process.exit(1);
}

const client = algoliasearch(APP_ID, ADMIN_KEY);

// Recursively collect all .md files under docs/
function collectMarkdownFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectMarkdownFiles(full, files);
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

// Parse frontmatter title and tags from a markdown file
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return { title: '', tags: [] };
  const fm = match[1];
  const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const tagsMatch = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map((t) => t.trim().replace(/['"]/g, ''))
    : [];
  return { title, tags };
}

// Strip markdown syntax, frontmatter, and headings for clean text content
function extractText(content) {
  return content
    .replace(/^---[\s\S]*?---\n/, '')       // remove frontmatter
    .replace(/```[\s\S]*?```/g, '')          // remove code blocks
    .replace(/`[^`]+`/g, '')                 // remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')         // remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text only
    .replace(/#{1,6}\s+/g, '')              // remove heading markers
    .replace(/[*_~>|]/g, '')                // remove markdown symbols
    .replace(/\s+/g, ' ')
    .trim();
}

// Build a URL path from the file path (mirrors Docusaurus routing)
function fileToUrl(filePath, docsRoot) {
  const rel = relative(docsRoot, filePath)
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/, '')
    .replace(/\/index$/, '/');
  return `https://docs.stackconsole.io/${rel}`;
}

// Extract H2/H3 headings for section-level records
function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];
  for (const line of lines) {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    if (h2) headings.push({ level: 2, text: h2[1].trim() });
    if (h3) headings.push({ level: 3, text: h3[1].trim() });
  }
  return headings;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
}

const docsRoot = new URL('../docs', import.meta.url).pathname;
const files = collectMarkdownFiles(docsRoot);

const records = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const { title, tags } = parseFrontmatter(content);
  const text = extractText(content);
  const url = fileToUrl(file, docsRoot);
  const headings = extractHeadings(content);

  // Page-level record
  records.push({
    objectID: url,
    url,
    type: 'lvl1',
    hierarchy: { lvl0: 'Documentation', lvl1: title },
    content: text.slice(0, 500),
    tags,
  });

  // Section-level records for each heading
  for (const h of headings) {
    const anchor = slugify(h.text);
    records.push({
      objectID: `${url}#${anchor}`,
      url: `${url}#${anchor}`,
      type: h.level === 2 ? 'lvl2' : 'lvl3',
      hierarchy: {
        lvl0: 'Documentation',
        lvl1: title,
        [h.level === 2 ? 'lvl2' : 'lvl3']: h.text,
      },
      content: null,
      tags,
    });
  }
}

console.log(`Indexing ${records.length} records into "${INDEX_NAME}"...`);

await client.saveObjects({ indexName: INDEX_NAME, objects: records });

// Configure index settings for DocSearch-compatible ranking
await client.setSettings({
  indexName: INDEX_NAME,
  indexSettings: {
    searchableAttributes: [
      'unordered(hierarchy.lvl0)',
      'unordered(hierarchy.lvl1)',
      'unordered(hierarchy.lvl2)',
      'unordered(hierarchy.lvl3)',
      'content',
    ],
    attributesForFaceting: ['type', 'tags'],
    attributesToHighlight: ['hierarchy', 'content'],
    attributesToSnippet: ['content:15'],
    distinct: true,
    attributeForDistinct: 'url',
    customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
    ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
    minWordSizefor1Typo: 3,
    minWordSizefor2Typos: 7,
    removeWordsIfNoResults: 'allOptional',
    advancedSyntax: true,
  },
});

console.log(`Done. ${records.length} records indexed.`);
