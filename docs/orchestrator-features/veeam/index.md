---
sidebar_position: 1
title: "Veeam Features"
tags: ["orchestrator", "veeam", "vspc", "features", "backup"]
---

# Veeam Features

Feature documentation for **Veeam Service Provider Console (VSPC)** in CMP — how customers consume Veeam plans after [Veeam setup](/orchestrators/veeam/) is complete.

:::tip[Setup vs features]

Need to connect VSPC, create packages, or set unit pricing? Start with [Orchestrator Setup — Veeam](/orchestrators/veeam/).

:::

## What Stack Console automates

| Capability | Behaviour |
|---|---|
| **VSPC account** | Company account created via API when customer purchases a plan |
| **Credentials** | Generated via API and emailed; reset available in Stack Console |
| **Quotas** | Assigned from package or unit pricing; upgrades via CMP/API |
| **Backup jobs** | **Not** managed by CMP — customer configures in Veeam |

:::important[Agents are customer-side]

CMP does not install agents or schedule backup jobs. After credentials are delivered, the customer (or your ops team) must configure protection in Veeam / VSPC — install agents on required VMs and create backup jobs.

:::

---

## Customer workflow

### 1. Plan selection

Customer selects a **Veeam Account package** (predefined plan) or usage is billed via **Custom Unit Pricing** where configured.

Example quotas on a predefined plan:

| Quota | Example |
|---|---|
| Repository | 20 GB |
| Workstation agents | 10 |
| Server agents | 5 |

Usage-based unit pricing can additionally bill per **VM**, **workstation**, **server**, **concurrent task**, and other Cloud Connect / Hosted / VB365 dimensions — [Veeam Custom Unit Pricing](/orchestrators/veeam/packages#veeam-custom-unit-pricing).

### 2. Automated account provisioning

CMP creates a **VSPC company account** (Veeam Company) via API for each customer who purchases a plan.

### 3. Credential generation & delivery

Unique VSPC credentials are generated via API and **securely emailed** to the customer.

### 4. Self-service via Stack Console

Customers can **reset credentials** from Stack Console without opening a support ticket.

### 5. Quota & plan management

Customers or admins can request quota or plan changes through CMP — for example upgrading repository storage from **20 GB to 100 GB** via API.

### 6. Day-to-day backup operations

After login, customers are redirected to the **public VSPC web UI** to manage backup operations. This requires the **VSPC web UI URL** to be publicly reachable — see [Veeam Requirements](/installation/orchestrator-requirements/veeam).

---

## What customers get (summary)

| Capability | Behaviour |
|---|---|
| **Plan / package** | Predefined Veeam Account package or usage-based unit rates |
| **Account** | VSPC company created automatically |
| **Credentials** | Emailed on provisioning; reset in Stack Console |
| **Quota upgrades** | Repository size and other quota changes through CMP |
| **Backups** | Configured by customer in Veeam (agents / jobs) |

:::danger[Documentation in progress]

Customer portal screenshots and detailed upgrade flows are being expanded. Setup and package behaviour: [Veeam setup](/orchestrators/veeam/) and [Packages](/orchestrators/veeam/packages).

:::

## Related

* [Veeam (VSPC) setup](/orchestrators/veeam/)
* [Connecting CMP to Veeam](/orchestrators/veeam/connecting)
* [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages)
* [Veeam Requirements](/installation/orchestrator-requirements/veeam)
* [Orchestrator Features](/orchestrator-features/)
