# CLAUDE.md — CMP Admin Documentation Context

This file gives Claude Code full context about this project so it can continue building and maintaining the documentation without needing prior conversation history.

---

## Project overview

This is the **CMP (Cloud Management Platform) Admin Documentation** site built with [Docusaurus v3](https://docusaurus.io/).

CMP is a multi-cloud IaaS management platform that supports multiple orchestrators:
- Apache CloudStack (ACS) — primary, most documented
- OpenStack
- VMware vSphere
- Proxmox VE
- OpenNebula
- CEPH (storage)
- PowerDNS (DNS)

**Repo:** https://github.com/satish-londhe/admin-docs  
**Target URL:** https://docs.stackconsole.io  
**Audience:** Cloud provider admins (not end customers)

---

## Folder structure

```
admin-docs/
├── docs/
│   ├── overview/          # What is CMP, architecture, glossary, release notes
│   ├── installation/      # Prerequisites, server install, DNS, SSL, env vars
│   ├── orchestrators/
│   │   ├── cloudstack/    # Full CloudStack docs (10 pages)
│   │   ├── openstack/     # Placeholder — needs content
│   │   ├── vmware/        # Placeholder — needs content
│   │   ├── proxmox/       # Placeholder — needs content
│   │   ├── opennebula/    # Placeholder — needs content
│   │   ├── ceph/          # Placeholder — needs content
│   │   └── powerdns/      # Placeholder — needs content
│   ├── zones/             # Zone overview, creating zones, coming soon
│   ├── packages/          # VM, storage, LB, IP, VPC, bandwidth, pricing
│   ├── billing/           # Billing models, prepaid wallet
│   ├── quota/             # Global, account, project quotas, requests, sync
│   ├── auth/              # Keycloak SSO, 2FA
│   └── faq/               # Billing FAQs, general FAQs
├── sidebars.js            # Full sidebar config — all sections defined
├── docusaurus.config.js   # Site config — update URL, title, algolia keys
├── src/css/custom.css     # Custom styles
└── CLAUDE.md              # This file
```

---

## Doc conventions

Every markdown file must have this frontmatter:
```md
---
sidebar_position: <number>
title: "Page Title"
tags: ["tag1", "tag2"]
---
```

Internal links use **relative paths** from the `docs/` root:
```md
[VM Packages](/packages/vm-packages)
[CloudStack Setup](/orchestrators/cloudstack/)
```

Use admonitions for warnings and tips:
```md
:::warning
Important warning here.
:::

:::tip
Helpful tip here.
:::

:::info
Informational note.
:::
```

---

## Content status

### ✅ Fully documented
- CMP Overview (5 pages)
- Installation & Setup (6 pages)
- CloudStack / ACS (10 pages)
- Zones & Regions (3 pages)
- Packages & Offerings (7 pages)
- Billing & Invoicing (2 pages)
- Quota Management (5 pages)
- Authentication & SSO (2 pages)
- FAQ & Troubleshooting (2 pages)

### 🔲 Needs content (placeholders exist)
- OpenStack — needs: connecting, project/credential setup, flavor/image sync, network config
- VMware vSphere — needs: connecting, datastore/resource pools, template/ISO management
- Proxmox VE — needs: connecting, node/storage configuration
- OpenNebula — needs: connecting, templates/datastores
- CEPH — needs: CMP+CEPH integration, pool/RBD configuration
- PowerDNS — needs: DNS provider setup, zone/record management

### 🔲 Not yet created (future)
- Snapshots & Backups collection (standalone — currently only inside CloudStack section)
- User & Account Management
- Branding & Customization
- Global Settings Reference

---

## Key domain knowledge

### Billing
- Hourly formula: `Monthly ÷ (30.5 × 24)` = hourly rate
- Services always on hourly billing: VM_SNAPSHOT, BS_SNAPSHOT, BACKUP, BS_BACKUP, BANDWIDTH, ACCOUNT_TEMPLATE, ISO
- Prepaid = wallet top-up, real-time deduction. Postpaid = invoice at period end.
- `plan_ip_billing = true` in global settings charges IPs separately from VM packages

### CloudStack specifics
- CMP uses DomainAdmin credentials (not ROOT) for all operations
- Customer registration on CloudStack is deferred until first service creation
- Template requirements: password-enabled, SSH enabled, startup script, scalable root disk
- L2 networks do NOT support UserData — cannot use password-enabled templates
- `kvm.snapshot.enabled = true` required in CloudStack global settings for KVM VM snapshots
- CloudStack quota settings default to low limits — must be raised to avoid provisioning failures

### Packages
- Every package is unique per: Cloud Provider + Setup + Zone + Storage Category
- Override disk option = storage billed separately (recommended)
- Custom packages must be priced ≥ predefined packages for equivalent resources

### Keycloak SSO
- Existing customers must be manually registered in Keycloak with matching email
- Super admin must exist in Keycloak before enabling SSO
- 2FA enforcement: `enforce_2fa_to_all = true` in global settings

---

## Tasks for Claude Code

When asked to continue work on this project, prioritize:

1. **Fill placeholder orchestrator docs** — OpenStack, VMware, Proxmox, OpenNebula, CEPH, PowerDNS
2. **Add admonitions** — convert `> ⚠️` and `> ℹ️` blocks to proper Docusaurus admonitions
3. **Fix internal links** — ensure all cross-references use correct relative Docusaurus paths
4. **Add intro pages** — each `index.md` should have a clear overview and links to child pages
5. **Create missing collections** — Snapshots & Backups, User Management, Branding, Global Settings
6. **Improve search** — add more tags and descriptive frontmatter to all pages

---

## How to run locally

```bash
npm install
npm start         # starts dev server at http://localhost:3000
npm run build     # production build
npm run serve     # serve the production build locally
```

## How to deploy

```bash
# GitHub Pages
npm run deploy

# Or just push to main — set up CI/CD via GitHub Actions
```
