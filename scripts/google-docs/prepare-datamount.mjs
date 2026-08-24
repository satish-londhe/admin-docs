#!/usr/bin/env node
/**
 * Build a single HTML document for DataMount with in-document anchor links
 * (Google Docs import / Drive API upload).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const ADMONITION_MAP = {
  info: 'note',
  note: 'note',
  tip: 'tip',
  warning: 'warning',
  danger: 'warning',
  important: 'note',
};

function loadConfig() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, 'datamount.config.json'), 'utf8'),
  );
}

function slugFromLinkPath(pathPart) {
  const normalized = pathPart.replace(/\/$/, '').trim();
  if (!normalized || normalized === 'index') {
    return 'index';
  }
  return normalized.split('/').pop();
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) {
    return { title: null, body: raw };
  }
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { title: null, body: raw };
  }
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const titleMatch =
    fm.match(/^title:\s*"(.*)"\s*$/m) || fm.match(/^title:\s*(.+)\s*$/m);
  let title = titleMatch ? titleMatch[1].trim() : null;
  if (title?.startsWith('"') && title.endsWith('"')) {
    title = title.slice(1, -1);
  }
  return { title, body };
}

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
    const cssClass = ADMONITION_MAP[type] ?? 'note';
    i += 1;

    const body = [];
    while (i < lines.length && lines[i].trim() !== ':::') {
      body.push(lines[i]);
      i += 1;
    }
    if (i < lines.length && lines[i].trim() === ':::') {
      i += 1;
    }

    out.push(`<div class="admonition ${cssClass}">`);
    if (title) {
      out.push(`<p><strong>${title}</strong></p>`);
    }
    out.push(body.join('\n'));
    out.push('</div>');
    out.push('');
  }

  return out.join('\n');
}

function replaceMermaidBlocks(content) {
  return content.replace(/```mermaid\n([\s\S]*?)```/g, () => {
    return `<div class="admonition note"><p><strong>Diagram</strong></p><p>Flow diagram — see the markdown source in the repo for the full Mermaid chart.</p></div>`;
  });
}

function rewriteInternalLinks(content) {
  return content.replace(
    /\[([^\]]+)\]\(\/engagements\/datamount\/?([^)#]*)(#[^)]+)?\)/g,
    (_, linkText, slugPart, hash = '') => {
      const slug = slugFromLinkPath(slugPart);
      const href = hash || `#${slug}`;
      return `[${linkText}](${href})`;
    },
  );
}

function rewriteImages(content, staticDir) {
  return content.replace(/!\[([^\]]*)\]\(\/img\/([^)]+)\)/g, (_, alt, imgPath) => {
    const localPath = path.join(staticDir, imgPath.replace(/^screenshots\/datamount\//, ''));
    const fullPath = path.join(ROOT, 'static/img', imgPath);
    const target = fs.existsSync(fullPath) ? fullPath : localPath;
    if (!fs.existsSync(target)) {
      return `<p><em>Screenshot: ${imgPath}</em></p>`;
    }
    const data = fs.readFileSync(target).toString('base64');
    const ext = path.extname(target).slice(1).toLowerCase() || 'png';
    const mime = ext === 'jpg' ? 'jpeg' : ext;
    return `<p><img alt="${alt}" src="data:image/${mime};base64,${data}" style="max-width:100%;height:auto;" /></p>`;
  });
}

function stripLeadingH1(body, title) {
  const lines = body.split('\n');
  if (lines[0]?.startsWith('# ')) {
    const heading = lines[0].slice(2).trim();
    if (!title || heading === title || heading.replace(/^DataMount — /, '') === title) {
      return lines.slice(1).join('\n').replace(/^\n+/, '');
    }
  }
  return body;
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

function configureMarked() {
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }) => {
    const plain = text.replace(/<[^>]+>/g, '');
    const id = slugifyHeading(plain);
    return `<h${depth} id="${id}"><a name="${id}"></a>${text}</h${depth}>\n`;
  };

  marked.setOptions({
    gfm: true,
    breaks: false,
    renderer,
  });
}

function buildHtml(pages, docTitle) {
  const tocItems = pages
    .map(
      (page) =>
        `<li><a href="#${page.slug}">${page.title}</a></li>`,
    )
    .join('\n');

  const sections = pages
    .map((page) => {
      const html = marked.parse(page.markdown);
      return `
<section class="doc-section">
  <a name="${page.slug}"></a>
  <h1 id="${page.slug}">${page.title}</h1>
  ${html}
</section>`;
    })
    .join('\n<hr class="section-break" />\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${docTitle}</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; line-height: 1.45; color: #172b4d; max-width: 960px; margin: 0 auto; padding: 24px; }
    h1, h2, h3, h4 { color: #091e42; }
    h1 { font-size: 24px; margin-top: 28px; }
    h2 { font-size: 18px; margin-top: 22px; }
    h3 { font-size: 15px; margin-top: 18px; }
    table { border-collapse: collapse; width: 100%; margin: 12px 0; }
    th, td { border: 1px solid #c1c7d0; padding: 8px 10px; vertical-align: top; text-align: left; }
    th { background: #f4f5f7; }
    code, pre { font-family: Consolas, Monaco, monospace; }
    pre { background: #f4f5f7; padding: 12px; overflow-x: auto; border-radius: 4px; }
    .toc { background: #f4f5f7; padding: 16px 20px; border-radius: 6px; margin-bottom: 24px; }
    .toc ul { columns: 2; column-gap: 32px; margin: 0; padding-left: 20px; }
    .section-break { border: 0; border-top: 2px solid #dfe1e6; margin: 32px 0; }
    .admonition { border-left: 4px solid #0052cc; background: #deebff; padding: 12px 14px; margin: 14px 0; border-radius: 4px; }
    .admonition.warning { border-color: #ff991f; background: #fff7d6; }
    .admonition.tip { border-color: #00875a; background: #e3fcef; }
    img { max-width: 100%; height: auto; }
    a { color: #0052cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    @media print {
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <h1>${docTitle}</h1>
  <p><em>StackConsole vendor response — generated from admin-docs. Internal links jump to sections within this document.</em></p>
  <div class="toc">
    <h2>Table of contents</h2>
    <ul>
${tocItems}
    </ul>
  </div>
  <hr class="section-break" />
${sections}
</body>
</html>`;
}

function prepare() {
  const config = loadConfig();
  const sourceDir = path.join(ROOT, config.sourceDir);
  const outputPath = path.join(ROOT, config.outputHtml);
  const staticDir = path.join(ROOT, 'static/img/screenshots/datamount');

  configureMarked();

  const pages = [];

  for (const file of config.pageOrder) {
    const srcPath = path.join(sourceDir, file);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Skipping missing file: ${file}`);
      continue;
    }

    const raw = fs.readFileSync(srcPath, 'utf8');
    if (shouldExclude(file, raw, config.excludeFiles)) {
      continue;
    }

    const { title, body } = parseFrontmatter(raw);
    const slug = file === 'index.md' ? 'index' : file.replace(/\.md$/, '');

    let markdown = stripLeadingH1(body, title);
    markdown = convertAdmonitions(markdown);
    markdown = replaceMermaidBlocks(markdown);
    markdown = rewriteInternalLinks(markdown);
    markdown = rewriteImages(markdown, staticDir);

    pages.push({
      slug,
      title: title || slug,
      markdown,
    });
  }

  const html = buildHtml(pages, config.docTitle);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`Prepared Google Doc HTML: ${pages.length} section(s).`);
  console.log(`Output: ${outputPath}`);
  console.log('Internal links use #section anchors within the same document.');
}

prepare();
