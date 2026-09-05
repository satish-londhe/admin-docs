# Cursor handoff — CMP Admin Docs

**Audience:** You (human) or Cursor Agent continuing documentation on any section without prior chat history.

**Repo:** CMP Admin Documentation (Docusaurus v3) → https://docs.stackconsole.io  
**Who reads the site:** Cloud provider **admins** (not end customers)

Read this file first, then open the section you are writing. Do **not** invent product behaviour — use sources below or ask the author.

---

## Quick start (any new section)

1. **Connect MCP** (once per machine): Cursor Settings → Tools & MCP → connect **google-drive** and **read-ai**. Details: [MCP-SETUP.md](./MCP-SETUP.md).
2. **Find the source** for your topic in [sources.json](./sources.json) (Google Doc ID, tab URL, local cache under `.cursor/sources/`).
3. **Match an existing page** in the same area (copy frontmatter, field style, admonitions, screenshot pattern).
4. **Write under `docs/`**, then wire **both** `sidebars.ts` and `sidebars.js`.
5. **Put screenshots** in `static/img/screenshots/` (names like `cmp-….png`). In markdown: plain path line + `![…](/img/screenshots/….png)`.
6. **Register new Google Doc tabs** in `sources.json` (+ optional cache file) when you pull from a new tab.
7. Run locally: `npm run start -- --host 0.0.0.0 --port 3001` (or `npm run build` to catch broken anchors).

---

## Where content lives

| Area | Path | Purpose |
|---|---|---|
| **Orchestrator Setup** | `docs/orchestrators/` | Connect providers, zones, packages, rate-card setup |
| **Orchestrator Features** | `docs/orchestrator-features/` | How features work after setup (customer/admin behaviour) |
| **Platform Features** | `docs/platform-features/` | CMP-wide (Store/Products, APIs, …) — not tied to one orchestrator |
| **Billing** | `docs/billing/` | Payment modes, rate cards, disciplinary, gateways, invoices |
| **Installation** | `docs/installation/` | Prerequisites + `orchestrator-requirements/` |
| **Quota / Auth / FAQ** | `docs/quota/`, `docs/auth/`, `docs/faq/` | As named |

**Rule of thumb:** Setup (connect + packages) → `orchestrators/…`. Day-to-day feature behaviour → `orchestrator-features/…`. Catalogue / marketplace / APIs → `platform-features/…`.

Standalone orchestrators today: **CloudStack**, **CEPH**, **Veeam (VSPC)**, plus stubs for OpenStack, VMware, Proxmox, OpenNebula, PowerDNS.

---

## Sources of truth (do not publish URLs on the site)

| Source | Use for |
|---|---|
| Primary Google Doc `1H44tP15QM6yN9D_3zieNI_GiZT4yGFTYPD00uoNfgwo` | Main CMP admin procedures |
| Features List `154BSmee2KfUPvHxLUKWUCBgKpHdqi6PC0elVmiVZTvA` | Feature inventory / gaps / newer field behaviour |
| Tabbed doc `1X5CShCn7ZuccXeJpydYlQCOGXu-QTABrInrjsVVV578` | Many feature tabs (billing, networks, store, sync, …) — pick tab from `sources.json` |
| Veeam setup `1UBfw20joa_imI0ADKPBCFPjdltkUg0VZw6V0R2XIP0Q` | VSPC connect + packages |
| **Read.ai** MCP | Meeting limits, edge cases, “what we decided” |
| Screenshots from author | Always prefer UI paste over guessing form fields |

Full list + caches: [sources.json](./sources.json). Always-applied writing rules: [rules/doc-sources.mdc](./rules/doc-sources.mdc).

If Google Drive / Read.ai MCP fails: ask the author to **paste** the Google Doc section or meeting notes.

---

## Writing conventions (must match)

### Frontmatter

```md
---
sidebar_position: <n>
title: "Page Title"
tags: ["tag1", "tag2"]
---
```

### Links

Internal links from docs root, e.g. `[CEPH](/orchestrators/ceph/)`.

### Admonitions

Use Docusaurus titles: `:::warning[Title]`, `:::important[…]`, `:::danger[Documentation in progress]`, `:::tip`, `:::info`.

### Form fields

- Bold field name on its **own line** — **not** `##` / `###` per field  
- Then `*Required.*` / `*Optional.*` / `*Read-only.*` / `*Not applicable.*` + guidance  
- No “see Field below” index tables  
- Tables OK for values/behaviour inside a field  

### Screenshots

```md
img/screenshots/cmp-example.png

![Screenshot: short description](/img/screenshots/cmp-example.png)
```

### Sidebars

Update **`sidebars.ts` and `sidebars.js`** the same way every time.

### Wording

- Do **not** tell admins to “raise a support ticket with StackConsole” for template sync — CMP has no template Sync; say **re-configure manually**.  
- Do **not** invent Free Trial / billing behaviour — if UI shows a control but product says N/A (e.g. Veeam free trial), document **Not applicable**.  
- Prefer **production-ready** accuracy over copying outdated Google Doc stubs when screenshots disagree with the doc.

### Anchors / MDX

- Admonition titles do **not** create heading anchors — use real `##` / `###` headings for deep links.  
- Avoid `{#custom-id}` in MDX (curly braces break the build); use a plain heading or HTML `<h3 id="…">` if you must pin an id.

---

## Checklist — new page or section

- [ ] Source read (Google Doc tab / paste / Read.ai) and registered in `sources.json` if new
- [ ] Correct folder (setup vs features vs platform vs billing)
- [ ] Frontmatter + tags
- [ ] Fields match **current UI** (screenshots preferred)
- [ ] Related links to setup / packages / features
- [ ] `sidebars.ts` + `sidebars.js`
- [ ] Screenshots under `static/img/screenshots/`
- [ ] Index / overview table updated if the section has one
- [ ] No broken anchors (`npm run build`)

---

## Prompt templates (paste into Cursor Agent)

**Continue a section from Google Doc:**

> Read the source for \<topic\> from `.cursor/sources.json` (or this Google Doc tab: \<URL\>). Update/create docs under `docs/…` using our conventions in `.cursor/README.md`. Wire both sidebars. Do not publish source URLs.

**Document a form from screenshots:**

> Using the attached screenshot(s), document every form field on `docs/…` with bold field names (*Required.* / *Optional.*). Replace any outdated fields. Add screenshots to `static/img/screenshots/cmp-….png`.

**Meeting-driven limits:**

> Search Read.ai for meetings about \<topic\>. Add only confirmed limits/features to the docs; mark unknowns as Documentation in progress.

---

## Recently documented (examples to copy)

| Topic | Paths |
|---|---|
| CloudStack Sync / Import VM | `docs/orchestrator-features/cloudstack/sync-resources.md` |
| Store & Products | `docs/platform-features/store/` |
| CEPH object storage | `docs/orchestrators/ceph/`, `docs/orchestrator-features/ceph/` |
| Veeam VSPC | `docs/orchestrators/veeam/`, `docs/installation/orchestrator-requirements/veeam.md`, `docs/orchestrator-features/veeam/` |
| Disciplinary freeze (customer UI) | `docs/billing/disciplinary-actions/freeze.md` |

Older high-level overview: root [CLAUDE.md](../CLAUDE.md) (folder tree there may lag — prefer this README + live `docs/` tree).

---

## Related files

| File | Role |
|---|---|
| [UI-AND-DOCS-GUIDE.md](./UI-AND-DOCS-GUIDE.md) | UI elements, page templates, related links — share with other agents |
| [MCP-SETUP.md](./MCP-SETUP.md) | Connect Google Drive + Read.ai |
| [sources.json](./sources.json) | Source registry |
| [rules/doc-sources.mdc](./rules/doc-sources.mdc) | Always-on Cursor rule for docs |
| [CHATGPT-PROMPT.md](./CHATGPT-PROMPT.md) | Prompt if using ChatGPT outside Cursor |
| [../AGENTS.md](../AGENTS.md) | Short pointer for Cursor agents |
| [../README.md](../README.md) | Local run / deploy |
