---
sidebar_position: 1
title: "Veeam (VSPC)"
tags: ["orchestrator", "veeam", "vspc", "backup"]
---

# Veeam Service Provider Console (VSPC)

This section covers integrating CMP with **Veeam Service Provider Console (VSPC)** so Stack Console can automate company (customer) account creation, credentials, quotas, and plan changes.

:::warning[Standalone backup service]

Veeam VSPC is a **separate backup product** in CMP — not CloudStack/OpenStack VM backup. CMP creates the VSPC account and credentials; customers configure agents and jobs **manually in Veeam**.

CloudStack VM backup (when B&R is configured) is **integrated in CMP** via CloudStack APIs — no VSPC dashboard for that path.

See **[Backup and Recovery](/overview/backup-and-recovery)**.

:::

:::important[What CMP does — and does not — manage]

Stack Console automates:

* VSPC **company / account** creation
* **Credential** generation and delivery
* **Quota** assignment and plan upgrades

CMP does **not** run the backup jobs themselves. End users must **install Veeam agents** on the required virtual machines (or otherwise configure protection in Veeam) after they receive access.

:::

## Admin setup workflow

Complete these steps in order after [Veeam Requirements](/installation/orchestrator-requirements/veeam) are submitted to StackConsole:

| Step | Task | Documentation |
|---|---|---|
| **1** | Submit access requirements to StackConsole | [Veeam Requirements](/installation/orchestrator-requirements/veeam) — role, VSPC API URL, VSPC web UI URL, API key |
| **2** | Cross-check VSPC (version **9.1**, at least one **location**) | [Cross-check before connecting](/orchestrators/veeam/connecting#cross-check-before-connecting) |
| **3** | Add Veeam Cloud Provider in CMP | [Connecting CMP to Veeam](/orchestrators/veeam/connecting) |
| **4** | Create Veeam Account packages (predefined plans) | [Create Veeam Account Package](/orchestrators/veeam/packages#create-veeam-account-package) |
| **5** | Define Custom Unit Pricing (optional — usage-based) | [Veeam Custom Unit Pricing](/orchestrators/veeam/packages#veeam-custom-unit-pricing) |

```
Requirements → Cross-check VSPC → Add Cloud Provider → Packages → Unit Pricing (optional)
```

Customer-facing behaviour after go-live: [Veeam Features](/orchestrator-features/veeam/).

---

## Customer workflow (high level)

1. **Plan selection** — customer chooses a Veeam package (predefined plan or usage-based unit pricing)
2. **Automated account provisioning** — CMP creates a VSPC company account via API for each customer
3. **Credential generation & delivery** — unique credentials are generated via API and emailed to the customer
4. **Self-service** — customers can reset credentials through Stack Console
5. **Quota & plan management** — upgrades (for example repository **20 GB → 100 GB**) go through CMP/API
6. **Backup configuration** — customer installs Veeam agents and configures jobs in VSPC (not automated by CMP)

Example quota dimensions on a predefined plan:

| Quota | Example |
|---|---|
| Repository | 20 GB |
| Workstation agents | 10 |
| Server agents | 5 |

For **usage-based** billing, unit pricing can also cover Cloud Connect dimensions such as **VM**, **workstation**, **server**, and **concurrent task** — see [Veeam Custom Unit Pricing](/orchestrators/veeam/packages#veeam-custom-unit-pricing).

## Pages in this section

| Page | Description |
|---|---|
| [Veeam Requirements](/installation/orchestrator-requirements/veeam) | Submit role, API URL, web UI URL, and API key to StackConsole |
| [Connecting CMP to Veeam](/orchestrators/veeam/connecting) | Cross-check, API key, add Cloud Provider wizard |
| [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages) | Predefined Account packages and Custom Unit Pricing |

## After setup

| Topic | Link |
|---|---|
| Customer Veeam feature notes | [Veeam Features](/orchestrator-features/veeam/) |
| Installation checklist | [Veeam Requirements](/installation/orchestrator-requirements/veeam) |

## Related

* [Supported Orchestrators](/overview/supported-orchestrators)
* [Orchestrator Features — Veeam](/orchestrator-features/veeam/)
