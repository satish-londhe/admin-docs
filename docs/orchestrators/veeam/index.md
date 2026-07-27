---
sidebar_position: 1
title: "Veeam (VSPC)"
tags: ["orchestrator", "veeam", "vspc", "backup"]
---

# Veeam Service Provider Console (VSPC)

This section covers integrating CMP with **Veeam Service Provider Console (VSPC)** so Stack Console can automate company (customer) account creation, credentials, quotas, and plan changes.

:::warning[Standalone backup orchestrator]

Veeam VSPC in CMP is **independent** of compute orchestrators (CloudStack, VMware, and others). It is also **not** the same as CloudStack’s native Backup & Recovery **Veeam plugin** used for VM Backup packages. See [CloudStack VM Backup](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup) for that path.

:::

:::important[What CMP does — and does not — manage]

Stack Console automates:

* VSPC **company / account** creation
* **Credential** generation and delivery
* **Quota** assignment and plan upgrades

CMP does **not** run the backup jobs themselves. End users must **install Veeam agents** on the required virtual machines (or otherwise configure protection in Veeam) after they receive access.

:::

## Customer workflow (high level)

1. **Plan selection** — customer chooses a Veeam package (quotas such as repository GB, VMs, workstations, servers, concurrent tasks)
2. **Automated account provisioning** — CMP creates a VSPC company account via API
3. **Credentials** — unique credentials are generated via API and emailed to the customer
4. **Self-service** — customers can reset credentials in Stack Console
5. **Quota / plan management** — upgrades (for example repository 20 GB → 100 GB) go through CMP/API

Example quota dimensions on a plan:

| Quota | Example |
|---|---|
| Workstation agents | 10 |
| Server agents | 5 |
| Repository | 20 GB |

## Pages in this section

| Page | Description |
|---|---|
| [Connecting CMP to Veeam](/orchestrators/veeam/connecting) | Access requirements, API key, public URLs, add Cloud Provider |
| [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages) | Predefined plans and custom unit pricing on the rate card |

## After setup

| Topic | Link |
|---|---|
| Customer Veeam feature notes | [Veeam Features](/orchestrator-features/veeam/) |
| Installation checklist | [Veeam Requirements](/installation/orchestrator-requirements/veeam) |

## Related

* [Supported Orchestrators](/overview/supported-orchestrators)
* [Orchestrator Features — Veeam](/orchestrator-features/veeam/)
