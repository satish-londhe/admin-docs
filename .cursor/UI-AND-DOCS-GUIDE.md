# UI elements & documentation guide — for agents

**Audience:** Cursor agents, ChatGPT, or humans improving CMP Admin Documentation without prior chat history.

**Site:** Docusaurus v3 → https://docs.stackconsole.io  
**Readers:** Cloud provider **admins** (not end customers).

**Read first:** [README.md](./README.md) (sources, sidebars, MCP). **Always apply:** [rules/doc-sources.mdc](./rules/doc-sources.mdc).

This guide explains **how CMP UI is represented in markdown**, **how to structure a page**, and **where to add related links**. Do **not** invent product behaviour — use Google Docs, Read.ai, and author screenshots.

---

## 1. How CMP UI maps to documentation

CMP admin and customer portal UIs share a small set of patterns. Document them consistently so admins can find settings in the product while reading the doc.

### 1.1 Navigation paths

Use the exact menu trail the admin clicks, with arrows:

```md
**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → Virtual Machine**
```

| Pattern | Example |
|---|---|
| Top-level area | **Settings**, **Clients**, customer **Billing** tab |
| Nested menus | **Settings → Orchestrator → Templates** |
| Wizard steps | Cloud Provider Setup **Wizard Step 2 — Provider Config** |
| Breadcrumb in UI | Form title: **Edit Payment Gateway Providers** (breadcrumb: **Payment Gateway Providers**) |

Put the path **once** near the top of a form section, then document fields below. Repeat the path only when the form lives on a different screen.

**Customer portal** vs **admin CMP:** say explicitly which UI you mean — e.g. “Customer portal → Billing → Account Statement” vs “CMP admin → Clients → …”.

### 1.2 Form titles and sections

Match the **on-screen form title** as a markdown heading when it starts a major block:

```md
## Payment Gateway Providers

Form title: **Edit Payment Gateway Providers**

**Path:** **Settings → Billing Setup → Payment Provider**
```

Use `##` / `###` for **forms and workflows**, not for individual fields.

### 1.3 Form fields (required pattern)

**Every CMP form field** (zones, packages, gateways, quota, templates, etc.) uses this pattern:

```md
**Package Name**

*Required.* Display name for the package — for example, `2vCore-2GB Memory`. Use a label customers recognize on the Create Instance page.

**Status**

*Required.* **Active** or **Inactive**. Set **Active** when this package should be sold.
```

Rules:

| Rule | Detail |
|---|---|
| Field label | **Bold** on its own line — same spelling/capitalization as the UI |
| Requirement | `*Required.*` / `*Optional.*` / `*Read-only.*` / `*Not applicable.*` on the next line |
| Guidance | Plain language: purpose, valid values, what breaks if wrong |
| **Do not** | Use `## Field Name` or `### Field Name` for fields |
| **Do not** | Add an index table that only links to fields below (“See Package Name below”) |
| **Do** | Use tables **inside** a field for value/behaviour (Active vs Inactive, Yes vs No) |

Good reference: [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine), [Stripe gateway](/billing/payment-gateways/stripe).

### 1.4 Buttons, actions, and toggles

| UI element | How to document |
|---|---|
| Button | Bold label: **Add Package**, **Save**, **Commit-and-push** |
| Toggle / Yes–No | Table or inline: **Yes** / **No** with behaviour for each |
| Dropdown option | Quote exact option text: **Fixed offering**, **CloudStack (Nimbo)** |
| Disabled / hidden | Explain **when** the control appears or is greyed out |
| Customer action | “Customer selects … on the Create Instance page” |

### 1.5 Lists, tables, and status in the UI

| Doc use | Example |
|---|---|
| Allowed vs restricted | Two-column table (see [Freeze](/billing/disciplinary-actions/freeze)) |
| Workflow steps | Numbered list matching admin clicks |
| API/async pattern | `request → task → poll → validate → continue` |
| Lifecycle states | `AVAILABLE → RESERVED → ALLOCATED → …` |
| Feature matrix | Hub index tables with Status + Page link |

### 1.6 Screenshots

```md
img/screenshots/cmp-payment-provider-stripe.png

![Screenshot: CMP — Edit Payment Gateway Providers for Stripe](/img/screenshots/cmp-payment-provider-stripe.png)
```

| Rule | Detail |
|---|---|
| File location | `static/img/screenshots/` — link as `/img/screenshots/….png` |
| Naming | `cmp-…` for CMP UI, `acs-…` for CloudStack, provider name for gateways |
| Alt text | Start with `Screenshot:` + screen + what it shows |
| Placeholder | Until the real file exists, use `placeholder.png` but keep the **target path** as plain text above the image |
| Placement | Co-locate directly above the form fields under `## Configure ...`, not detached at the top of the page |
| One form | Prefer one screenshot per major form; crop sensitive data |

Do **not** embed Google Doc images on the live site unless exported to `static/img/screenshots/`.

### 1.7 Admonitions (Docusaurus)

Use titled admonitions for warnings admins must not miss:

```md
:::warning[Important — decide at initial CMP setup]
…
:::

:::info[Before you begin]
…
:::

:::tip[Quick start]
…
:::

:::important[Not yet rolled out]
…
:::

:::danger[Documentation in progress]
…
:::
```

| Type | When |
|---|---|
| `:::info` | Prerequisites, module enablement, background |
| `:::tip` | Quick-start table, shortcuts |
| `:::warning` | Irreversible choices, common misconfiguration |
| `:::important` | Policy / rollout / must-read before action |
| `:::danger` | Stub page, contract billing TBD, unverified behaviour |

Admonition titles **do not** create URL anchors — add a real `##` heading if other pages must link to that section.

### 1.8 Stubs and work in progress

When the UI exists but behaviour is unverified:

```md
:::info[Documentation coming soon]

Full feature documentation for **Virtual Machines** on CloudStack will be added here.

Until then, use the related setup and package docs below.

:::
```

Or:

```md
:::danger[Documentation in progress]
…
:::
```

Always add **Related** links to the closest setup/package pages so the stub is still useful.

---

## 2. Page types and structure

Pick the template that matches what you are documenting.

### 2.1 Hub / index page

**Where:** `index.md` at section root (e.g. [Platform Features](/platform-features/), [Payment Gateways](/billing/payment-gateways/)).

**Include:**

1. Frontmatter (`sidebar_position: 1` on index)
2. One-paragraph purpose
3. **Feature list** or **Pages in this section** table (Status | Page)
4. **Related** bullet list to sibling sections
5. Optional `:::info[How this section grows]` for scope boundaries

**Do not** duplicate full field lists from child pages — link to them.

### 2.2 Orchestrator setup page

**Where:** `docs/orchestrators/<provider>/` — connect, zones, templates, packages.

**Include:**

1. What this setup achieves (one paragraph)
2. `:::info[Before you begin]` with links to prerequisites
3. **CMP path** and/or orchestrator UI path
4. Field blocks per §1.3
5. Screenshots for CMP and orchestrator where both UIs are involved
6. **Related** links to packages, features, installation requirements

**Setup vs features:** If it is “connect and configure once” → `orchestrators/`. If it is “how VMs/backups behave after setup” → `orchestrator-features/`.

### 2.3 Package / rate-card form page

**Where:** `docs/orchestrators/<provider>/offering-sync-and-packages/`.

**Include:**

1. Link to orchestrator prerequisites (offerings, zones, templates)
2. Orchestrator-side requirements **before** CMP form fields
3. `:::warning` for one-time decisions (e.g. override disk)
4. **Configure … in CMP** section with path + every form field
5. Cross-links to dependent package types (VM → Volumes)

Reference: [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine).

### 2.4 Payment gateway page

**Where:** `docs/billing/payment-gateways/<provider>.md`.

**Standard sections:**

1. One-line description + provider link
2. `:::tip[Quick start]` table (configure path, modes)
3. **What … is used for in CMP** — link to [prepaid](/billing/payment-modes/prepaid), [postpaid](/billing/payment-modes/postpaid), [Auto Pay](/platform-features/auto-pay)
4. **Payment Gateway Providers** form (provider-level fields)
5. **Configure …** / **Payment Gateway Settings** (credentials, branches)
6. Provider-specific sections (webhooks, test cards, etc.)
7. Link back to [Payment Gateways hub](/billing/payment-gateways/)

### 2.5 Feature behaviour page

**Where:** `docs/orchestrator-features/` or `docs/platform-features/`.

**Include:**

1. What the customer or admin can do (not how to install)
2. Triggers, billing impact, quota impact
3. Tables for allowed/restricted actions
4. Links to **setup** and **packages** that must exist first
5. Screenshots of customer portal when documenting self-service

Reference: [Freeze](/billing/disciplinary-actions/freeze), [VM Downgrade](/orchestrator-features/cloudstack/virtual-machine/vm-downgrade).

### 2.6 Installation / orchestrator-requirements page

**Where:** `docs/installation/`, `docs/installation/orchestrator-requirements/`.

**Rule:** **Link, don’t duplicate.** Shared VM/DNS/SSL/SMTP content lives on canonical pages — see [rules/installation-link-dont-duplicate.mdc](./rules/installation-link-dont-duplicate.mdc).

Keep only **orchestrator-specific** checkpoints (credentials, template flags, provider API URLs).

### 2.7 Engagement / internal docs (e.g. DataMount SoW)

**Where:** `docs/engagements/`.

Different audience (customer PDF, internal delivery). Use `no-print` for nav hints; print CSS in `src/css/custom.css`. Not the template for product admin docs unless explicitly asked.

---

## 3. Where to add related links

Use **relative paths from docs root** (leading `/`):

```md
[VM Packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
```

### 3.1 Link map — when to link what

| From | Link to |
|---|---|
| Orchestrator setup | Installation requirement for that provider, zones, templates, packages index |
| Package form | Connect/setup page, zones, templates, dependent package types (VM ↔ Volumes) |
| Orchestrator feature | Setup page, relevant package page, billing mode if charges change |
| Platform feature | Billing, quota, auth if the feature touches them |
| Billing (modes, disciplinary) | Payment gateways, invoice settings, rate cards |
| Payment gateway | Payment modes, hub page, new-gateway requirements |
| Installation orchestrator-requirements | `/installation/prerequisites`, `/installation/hosting-topology`, billing gateways — **not** full duplicate sections |
| Index / hub | All major child pages + one level up (e.g. Orchestrator Features → CloudStack) |

### 3.2 Standard “Related” block

End most non-trivial pages with:

```md
## Related

* [Parent section](/orchestrators/cloudstack/)
* [Prerequisite setup](/orchestrators/cloudstack/connecting)
* [Sibling feature](/orchestrator-features/cloudstack/virtual-machine/vm-downgrade)
```

Order: parent → prerequisites → siblings → billing/quota if relevant.

### 3.3 “Before you begin” block

Use at the top of setup/package pages:

```md
:::info[Before you begin]

Ensure the following are already configured:

* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected
* [Zones](/orchestrators/cloudstack/zones) are mapped
* …

:::
```

### 3.4 Cross-orchestrator links

When behaviour is the same (e.g. VM Downgrade rules), link across providers:

```md
[OpenStack — Virtual Machine packages](/orchestrators/openstack/offering-sync-and-packages/virtual-machine) — same downgrade rules
```

### 3.5 External links

| OK | Avoid |
|---|---|
| Vendor docs (Stripe, Apache CloudStack) | Google Doc source URLs on published pages (internal agents only) |
| Product marketing sites | Broken anchors to admonition titles |

---

## 4. Technical conventions (Docusaurus)

### 4.1 Frontmatter

```md
---
sidebar_position: <n>
title: "Page Title"
tags: ["area", "topic", "keyword"]
---
```

Add `hide_table_of_contents: true` only for long print/PDF pages (e.g. customer SoW).

### 4.2 Sidebars

Every new page: update **`sidebars.ts` and `sidebars.js`** identically.

Category labels: `_category_.json` in folder (e.g. Identity Providers under Platform Features).

### 4.3 Anchors and MDX

| Do | Don't |
|---|---|
| Use `##` headings for link targets | `{#custom-id}` in MDX (breaks build) |
| Link to headings: `[text](/path#heading-slug)` | Rely on admonition titles for anchors |
| Use `<h3 id="…">` only if a pinned id is required | Invent slug names without checking build |

Run `npm run build` to catch broken links and MDX errors.

### 4.4 Tags

Use tags for search: orchestrator name, feature name, `billing`, `packages`, gateway name.

---

## 5. Content sources (agents)

| Source | Use for |
|---|---|
| [sources.json](./sources.json) | Google Doc IDs, tabs, local caches |
| Primary Google Doc | Main admin procedures |
| Features List doc | Scope, gaps, newer field behaviour |
| Tabbed doc (`1X5CShCn7…`) | Billing, networks, store, sync tabs |
| Payment gateways cache | Gateway credential fields |
| Read.ai MCP | Meeting decisions, limits, edge cases |
| Author screenshots | **Authoritative** when they disagree with outdated Google Doc text |

**Do not publish** internal Google Doc URLs on the site unless the user asks.

---

## 6. Wording and accuracy rules

| Topic | Rule |
|---|---|
| Template sync | No self-service Sync — **re-configure manually** at **Settings → Orchestrator → Templates** |
| Support tickets | Do not tell admins to “raise a ticket with StackConsole” for routine template updates |
| Free trial / N/A controls | If UI shows a control but product is N/A, document **Not applicable** |
| Screenshots vs doc | Prefer **current UI** (screenshot) over stale Google Doc |
| Payment redirect | Document redirect-and-return honestly when checkout leaves CMP for the gateway |
| Refunds | CMP wallet credit / no charge — do not claim gateway refunds unless product supports them |

---

## 7. Agent checklist (improve or add a page)

- [ ] Read source (Google Doc tab / Read.ai / screenshot) — registered in `sources.json` if new
- [ ] Correct folder: setup vs `orchestrator-features` vs `platform-features` vs `billing`
- [ ] Frontmatter + tags
- [ ] **CMP path** (and orchestrator path if applicable) before form fields
- [ ] Every field: **bold name** + `*Required.*` / `*Optional.*` + guidance
- [ ] Screenshots: path line + image (or placeholder with target path)
- [ ] `:::info[Before you begin]` or `:::tip[Quick start]` where helpful
- [ ] **Related** links (parent, prerequisites, siblings, billing)
- [ ] No duplicated installation content — link to canonical pages
- [ ] `sidebars.ts` + `sidebars.js`
- [ ] `npm run build` passes
- [ ] Index/hub table updated if adding a new feature to a section

---

## 8. Example pages to copy

| Pattern | Path |
|---|---|
| Package form + orchestrator prereqs | `/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine` |
| Payment gateway (two-level forms) | `/billing/payment-gateways/stripe` |
| Payment hub + quick start | `/billing/payment-gateways/` |
| Feature behaviour + timeline table | `/billing/disciplinary-actions/freeze` |
| Platform hub + feature table | `/platform-features/` |
| Feature stub + related links | `/orchestrator-features/cloudstack/virtual-machine/` |
| Store / rollout notice | `/platform-features/store/` |
| Installation link-only | `/installation/orchestrator-requirements/` (any provider) |

---

## 9. Prompt to share with other agents

Paste this when handing off work:

> You are improving CMP Admin Documentation (Docusaurus v3, audience: cloud provider admins). Read `.cursor/UI-AND-DOCS-GUIDE.md` and `.cursor/README.md`. Follow form-field rules: bold field names, *Required.*/ *Optional.*, no `##` per field. Document **CMP path** menus exactly. Add **Related** links to setup, packages, and features. Put screenshots in `static/img/screenshots/`. Update `sidebars.ts` and `sidebars.js`. Do not invent behaviour — use sources in `.cursor/sources.json` and author screenshots. Run `npm run build` before finishing.

---

## 10. Related files

| File | Role |
|---|---|
| [README.md](./README.md) | Sources, MCP, sidebars, prompt templates |
| [rules/doc-sources.mdc](./rules/doc-sources.mdc) | Always-on writing rules |
| [rules/installation-link-dont-duplicate.mdc](./rules/installation-link-dont-duplicate.mdc) | Installation linking |
| [sources.json](./sources.json) | Source registry |
| [../AGENTS.md](../AGENTS.md) | Short entry point for Cursor |
| [../CLAUDE.md](../CLAUDE.md) | High-level project context |
