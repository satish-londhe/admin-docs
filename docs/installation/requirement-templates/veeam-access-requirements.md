---
sidebar_position: 8
title: "Veeam Access Requirements (Template)"
tags: ["installation", "requirements", "templates", "onboarding"]
---

:::tip[Download Word template]

<a href="/requirement-templates/veeam-access-requirements-template.docx" download="Veeam-Access-Requirements.docx"><strong>Download Word document (.docx)</strong></a> — open in Microsoft Word or Google Docs, fill every **Your value** cell, then email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

Subject: `Veeam Access Requirements — <Your Company>`

[Requirement Templates overview](/installation/requirement-templates/)

:::


**Instructions:** Fill this template for **each Veeam Service Provider Console** instance. Email with subject `Veeam Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/installation/requirement-templates/cmp-platform-requirements).

**Reference doc:** Veeam Requirements · **VSPC 9.1** · Standalone backup integration

---

## A. Veeam environment

| Field | Your value |
|---|---|
| **VSPC version** | 9.1 (required) |
| **Location name in VSPC** | |

---

## B. Access credentials for CMP

| Field | Your value |
|---|---|
| **Company Administrator username** | |
| **Company Administrator password** | |
| **REST API Simple Key** | Created under Configuration → REST API Keys |
| **Portal Administrator available to create keys?** | Yes / No |

---

## C. Public connectivity (required)

| Endpoint | URL | Publicly reachable? |
|---|---|---|
| **VSPC API** | e.g. `https://vspc.example.com:1280/` | Yes / No |
| **VSPC customer portal** | | Yes / No |

---

## D. VSPC configuration checklist

| Check | Yes / No |
|---|---|
| At least one location exists | |
| Company Administrator account ready | |
| REST API key created and stored securely | |
| API and portal tested from outside provider LAN | |

---

## E. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
