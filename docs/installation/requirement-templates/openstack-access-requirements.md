---
sidebar_position: 5
title: "OpenStack Access Requirements (Template)"
tags: ["installation", "requirements", "templates", "onboarding"]
---

:::tip[Download Word template]

<a href="/requirement-templates/openstack-access-requirements-template.docx" download="OpenStack-Access-Requirements.docx"><strong>Download Word document (.docx)</strong></a> — open in Microsoft Word or Google Docs, fill every **Your value** cell, then email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

Subject: `OpenStack Access Requirements — <Your Company>`

[Requirement Templates overview](/installation/requirement-templates/)

:::


**Instructions:** Fill this template for **each OpenStack** cloud you connect to CMP. Email with subject `OpenStack Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/installation/requirement-templates/cmp-platform-requirements).

**Reference doc:** OpenStack Requirements

---

## A. OpenStack environment

| Field | Your value |
|---|---|
| **Distribution** | Upstream / RHOSP / Charmed / Virtuozzo VHI / Other |
| **OpenStack version** | |
| **Region name(s)** | |

---

## B. Access for StackConsole team (Horizon)

| Option | Your value |
|---|---|
| **VPN provided to StackConsole?** | Yes / No |
| **OR jump server IP whitelisted?** | `14.192.19.227` — Yes / No |
| **Horizon URL reachable?** | Yes / No |

---

## C. Horizon / admin credentials

| Field | Your value |
|---|---|
| **Horizon Dashboard URL** | |
| **Username** | |
| **Password** | |
| **Domain** | |

---

## D. CMP VM → OpenStack API connectivity

| Service | Endpoint URL | Port reachable? |
|---|---|---|
| Keystone | | |
| Nova | | |
| Neutron | | |
| Cinder | | |
| Glance | | |
| Magnum (if used) | | |

---

## E. API validation

| Check | Yes / No |
|---|---|
| Nova endpoint includes `/v2.1` suffix | |
| Neutron endpoint includes `/v2.0` suffix | |
| Cinder endpoint includes `/v3` suffix (dynamic project ID) | |
| Keystone works with and without `/v3` | |
| Availability Zone names identical across Nova, Cinder, Neutron | |

---

## F. Configuration values for CMP

| Variable | Your value |
|---|---|
| `project_id` | |
| `domain_id` | |
| `external_network_id` | |
| `open_stack_project_user_role` | e.g. `member` |
| `open_stack_default_storage_policy` | UUID if multiple storage types |
| **VHI only:** `open_stack_admin_secret` | |
| **VHI only:** `open_stack_admin_key` | |
| **VHI only:** `open_stack_admin_domain` | |
| **VHI only:** `open_stack_admin_project` | |

---

## G. Storage types displayed in CMP

| Label | Notes |
|---|---|
| e.g. SSD | |
| e.g. NVMe | |

---

## H. Setup checkpoints

| Check | Verified? |
|---|---|
| At least one bootable image | |
| 4–5 flavors available | |
| Test user/project can create VM | |
| VM console from Horizon | |

---

## I. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
