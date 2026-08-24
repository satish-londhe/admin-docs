# Confluence sync — DataMount (markfluence)

Automatically publish `docs/engagements/datamount/` to Confluence Cloud for **customer review** — no public site required.

**Tool:** [markfluence](https://github.com/pilat/markfluence) — Markdown → Confluence storage format, with Mermaid PNG rendering and smart change detection.

## Prerequisites

- **Node.js 22+** (markfluence requirement; repo otherwise supports Node 20+)
- Confluence **Cloud** site
- API token from [Atlassian account settings](https://id.atlassian.com/manage-profile/security/api-tokens)
- Permission to create/update pages in the target space

## One-time Confluence setup

1. Create or pick a **space** for the customer review (e.g. `DataMount`).
2. Create a parent page: **DataMount Integration Review**.
3. Copy the **page ID** from the browser URL:
   ```
   https://YOUR.atlassian.net/wiki/spaces/DataMount/pages/123456789/DataMount+Integration+Review
                                                                    ^^^^^^^^^
   ```

## Local setup

```bash
cp .env.confluence.example .env.confluence
# Edit .env.confluence with your values
npm install
```

## Commands

```bash
# Preview what would sync (no Confluence writes)
npm run sync:confluence:datamount:dry

# Sync to Confluence (creates/updates pages under parent)
npm run sync:confluence:datamount
```

Optional flags (pass after `--`):

```bash
npm run sync:confluence:datamount -- --verbose
npm run sync:confluence:datamount -- --mermaid   # try PNG render (may fail on Gantt charts)
```

**Mermaid diagrams:** By default, sync **replaces** ` ```mermaid ` blocks with a note (markfluence’s PNG renderer fails on some diagrams, e.g. Gantt). Set `CONFLUENCE_MERMAID=true` in `.env.confluence` or pass `--mermaid` to attempt PNG export.

## What the prepare step does

Before markfluence runs, `scripts/confluence/prepare-datamount.mjs`:

| Step | Detail |
|---|---|
| Exclude redirect stubs | `phase-0-capacity-ipam.md`, etc. (`unlisted: true`) |
| Convert admonitions | Docusaurus `:::warning[Title]` → markfluence `> [!WARNING]` |
| Fix image paths | `/img/...` → local paths under `.confluence-sync/static/` for attachment upload |
| Rewrite internal links | `/engagements/datamount/...` → full Confluence page URLs (via REST API lookup) |
| Strip Docusaurus frontmatter | Removes `sidebar_position`, `tags`, `unlisted`; keeps `title`, `confluence-page-id` |

Prepared files are written to `.confluence-sync/` (gitignored). **Source markdown in `docs/` is never modified.**

### Internal links → Confluence pages

Cross-links stay **inside Confluence** as normal clickable links — they do not point to a public Docusaurus URL.

During prepare, each `[text](/engagements/datamount/foo)` link becomes:

```markdown
[text](https://YOUR.atlassian.net/wiki/spaces/DataMount/pages/123456789)
```

Page IDs are resolved from:

1. `confluence-page-id` in source frontmatter
2. `scripts/confluence/confluence-page-map.json`
3. **Confluence REST API** (title lookup in the target space)

The sync script runs **two passes** automatically: the first creates/updates pages; the second re-resolves page IDs and refreshes cross-links. On a brand-new space, both passes run in one command.

Anchor links (`#section`) are appended to the Confluence URL where present (heading slugs may differ from Docusaurus).

## Re-sync after first publish

Add Confluence page IDs to frontmatter so updates hit the same page and cross-links use stable IDs:

```yaml
---
title: "Confirmed architecture"
confluence-page-id: 123456789
---
```

Get the page ID from the Confluence URL after the first sync.

Alternatively, maintain `scripts/confluence/confluence-page-map.json`:

```json
{
  "index": "396165401",
  "architecture": "396165402"
}
```

Keys are markdown filenames without `.md` (`index` for `index.md`).

## GitHub Actions (CI)

Workflow: `.github/workflows/sync-datamount-confluence.yml`

Add these **repository secrets**:

| Secret | Value |
|---|---|
| `CONFLUENCE_DOMAIN` | `mycompany.atlassian.net` |
| `CONFLUENCE_SPACE` | Space key |
| `CONFLUENCE_EMAIL` | Atlassian email |
| `CONFLUENCE_API_TOKEN` | API token |
| `CONFLUENCE_PARENT_PAGE_ID` | Parent page ID |

Runs on push to `main` when `docs/engagements/datamount/**` changes (manual trigger also available).

## Limitations

- **Anchor names** may differ between Docusaurus and Confluence heading slugs — verify important deep links after first sync.
- **Mermaid** requires Confluence to accept PNG attachments from markfluence; use `--no-mermaid` if rendering fails.
- **Confluence Server / Data Center** — markfluence targets Cloud REST API; on-prem may need a different tool.
