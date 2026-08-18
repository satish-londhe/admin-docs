---
sidebar_position: 3
title: "CloudStack Access Requirements (Template)"
tags: ["installation", "requirements", "templates", "onboarding"]
---

:::tip[Download Word template]

<a href="/requirement-templates/cloudstack-access-requirements-template.docx" download="CloudStack-Access-Requirements.docx"><strong>Download Word document (.docx)</strong></a> — open in Microsoft Word or Google Docs, fill every **Your value** cell, then email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

Subject: `CloudStack Access Requirements — <Your Company>`

[Requirement Templates overview](/installation/requirement-templates/)

:::


**Instructions:** Fill this template for **each CloudStack** environment you connect to CMP. Email with subject `CloudStack Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/installation/requirement-templates/cmp-platform-requirements) (VMs, domain, SSL — fill **once**, not here).

**Reference doc:** Apache CloudStack Requirements

---

## A. CloudStack environment

| Field | Your value |
|---|---|
| **CloudStack version** | |
| **Environment name** (e.g. Production-ACS-01) | |
| **Primary zone name(s)** | |

---

## B. Access for StackConsole team (CloudStack UI)

| Option | Your value |
|---|---|
| **VPN provided to StackConsole?** | Yes / No |
| **OR jump server IP whitelisted?** | `14.192.19.227` — Yes / No |
| **CloudStack UI reachable from VPN/whitelist?** | Yes / No |

---

## C. CloudStack API credentials (Domain Admin minimum)

| Field | Your value |
|---|---|
| **CloudStack URL** | e.g. `http://cloudstack.example.com:8080/client` |
| **Username** | |
| **Password** | |
| **User domain** | |

---

## D. CMP VM → CloudStack connectivity

| Field | Your value |
|---|---|
| **API endpoint tested from CMP VM?** | Yes / No |
| **Test command result** | `curl` to API URL — JSON response / connection error |
| **Private or public API access?** | |

---

## E. Console Proxy DNS (if VM console offered)

| Field | Your value |
|---|---|
| **Console subdomain** | e.g. `console.yourcompany.com` |
| **Wildcard DNS configured?** | e.g. `*.console.yourcompany.com` → CPVM IP — Yes / No / N/A |

---

## F. Templates (CloudStack-side)

| Check | Yes / No / N/A |
|---|---|
| At least one template **Featured + Public** | |
| Password-enabled templates | |
| SSH key injection enabled | |
| Startup script / UserData support | |
| Scalable root disk | |

---

## G. Services you will offer via CMP

| Service | Enabled? |
|---|---|
| Virtual Machine | |
| VPC | |
| Kubernetes | |
| Load Balancer | |
| ISO / Template upload | |
| Backup model | CloudStack native / CMP snapshot / Other |

---

## H. CloudStack global settings (before go-live)

| Setting | Your value |
|---|---|
| `kvm.snapshot.enabled` | `true` (KVM) |
| Quota limits (CPU, RAM, IP, …) | `-1` (unlimited) recommended |

---

## I. Setup checkpoints

| Check | Verified? |
|---|---|
| Isolated and VPC networks working | |
| VM creation working | |
| Public IP association working | |
| Console access from CloudStack UI | |

---

## J. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
