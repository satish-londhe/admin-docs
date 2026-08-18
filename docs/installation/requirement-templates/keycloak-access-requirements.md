---
sidebar_position: 10
title: "Keycloak Access Requirements (Template)"
tags: ["installation", "requirements", "templates", "onboarding"]
---

:::tip[Download Word template]

<a href="/requirement-templates/keycloak-access-requirements-template.docx" download="Keycloak-Access-Requirements.docx"><strong>Download Word document (.docx)</strong></a> — open in Microsoft Word or Google Docs, fill every **Your value** cell, then email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

Subject: `Keycloak Access Requirements — <Your Company>`

[Requirement Templates overview](/installation/requirement-templates/)

:::


**Instructions:** Fill this template **only if** you enable Keycloak SSO with CMP. Email with subject `Keycloak Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/installation/requirement-templates/cmp-platform-requirements) — Keycloak redirect URLs must match CMP portal/API domains.

**Reference doc:** Keycloak SSO Requirements · **Optional** integration

---

## A. Keycloak environment

| Field | Your value |
|---|---|
| **Keycloak version** | |
| **Realm name for CMP** | |
| **Production or staging?** | |

---

## B. Credential sharing option

Choose **A** or **B**:

### Option A — Admin credentials shared with StackConsole

| Field | Your value |
|---|---|
| **Keycloak Admin URL** | |
| **Admin username** | |
| **Admin password** | |

### Option B — Client credentials only (self-service setup)

| Field | Your value |
|---|---|
| **Keycloak URL** | |
| **Realm** | |
| **Client ID** | |
| **Client Secret** | |

---

## C. CMP URLs for Keycloak client configuration

| Field | Your value |
|---|---|
| **Frontend (portal) URL** | Must match platform template |
| **Valid redirect URIs configured?** | Yes / No |
| **Post-logout redirect URI configured?** | Yes / No |

---

## D. Pre-enable checklist

| Check | Yes / No / N/A |
|---|---|
| Super Admin email exists in Keycloak **before** enabling SSO | |
| Existing CMP users migrated to Keycloak (matching emails) | |
| Social logins re-configured in Keycloak if needed | |

---

## E. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
