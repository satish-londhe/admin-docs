# Google Docs export — DataMount

Publish the full DataMount engagement as **one Google Doc** with **working in-document links** (section anchors). Intended for customer review without a public docs site.

## Why Google Doc instead of Confluence?

Confluence cross-links from markdown sync are unreliable. A single Google Doc with `#section` anchors imports cleanly and links stay inside the document.

## Prerequisites

1. **Google Cloud project** with **Google Drive API** enabled
2. **OAuth desktop client** JSON (same setup as [MCP Google Drive](/.cursor/MCP-SETUP.md))
3. Save keys outside the repo, e.g. `~/.config/cmp-docs/gcp-oauth.keys.json`

## One-time setup

```bash
cp .env.gdocs.example .env.gdocs
# Optional: set GOOGLE_DRIVE_FOLDER_ID to a shared Drive folder

npm install

# Authorize (opens browser once)
npm run auth:gdocs
```

## Commands

```bash
# Build HTML only (no Google upload) — inspect .gdocs-sync/datamount-integration-review.html
npm run prepare:gdocs:datamount

# Create or update Google Doc
npm run sync:gdocs:datamount
```

After the first sync, add the printed document ID to `.env.gdocs`:

```env
GOOGLE_DOC_ID=your-document-id-here
```

Future runs update the same doc.

## What gets exported

All 21 DataMount pages (sidebar order), in one document:

- Table of contents with links to each section
- Internal `/engagements/datamount/...` links rewritten to `#section` anchors
- Admonitions, tables, code blocks
- Screenshots embedded as base64 images (when present under `static/img/`)

Redirect stub pages (`phase-0-capacity-ipam.md`, etc.) are excluded.

## Manual import (no OAuth)

If you prefer not to run the sync script:

1. Run `npm run prepare:gdocs:datamount`
2. Open [Google Drive](https://drive.google.com)
3. **New → File upload** → select `.gdocs-sync/datamount-integration-review.html`
4. Right-click uploaded file → **Open with → Google Docs**

Internal links should work after conversion.

## Share with customer

1. Open the Google Doc → **Share**
2. Add customer emails (Viewer or Commenter)
3. Or create a **anyone with the link** view link if appropriate for the engagement

## Source registry

After first publish, optionally register the doc in `.cursor/sources.json` under `datamount-cmp-integration-review-response` for AI reference.
