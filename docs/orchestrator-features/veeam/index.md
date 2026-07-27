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

## What customers get

| Capability | Behaviour |
|---|---|
| **Plan / package** | Select a predefined Veeam plan (repository, VM, workstation, server, concurrent task quotas) |
| **Account** | VSPC company account created automatically via API |
| **Credentials** | Generated and emailed; reset available in Stack Console |
| **Quota upgrades** | Plan or quota changes (for example repository size) requested through CMP |
| **Day-to-day backups** | Performed in **Veeam** (agents / jobs) — **not** automated by CMP |

:::important[Agents are customer-side]

CMP does not install agents or schedule backup jobs. After credentials are delivered, the customer (or your ops team) configures protection in Veeam / VSPC.

:::

:::danger[Documentation in progress]

Customer portal screenshots, upgrade flows, and detailed limits are being expanded. Current setup and package behaviour: [Veeam setup](/orchestrators/veeam/) and [Packages](/orchestrators/veeam/packages).

:::

## Related

* [Veeam (VSPC) setup](/orchestrators/veeam/)
* [Connecting CMP to Veeam](/orchestrators/veeam/connecting)
* [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages)
* [Orchestrator Features](/orchestrator-features/)
