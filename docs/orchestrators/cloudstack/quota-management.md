---
sidebar_position: 7
title: "Quota Management (ACS)"
tags: ["orchestrator", "cloudstack", "quota"]
---

# Quota Management (CloudStack)

CMP manages quotas at its own level, while **CloudStack enforces limits** at the Domain, Account, and Project levels independently.

## CloudStack default quota behaviour

* **Domain-level** limits in CloudStack default to *unlimited*
* **Account** and **Project-level** limits are often set too low by default

**Recommendation:** Set these limits in CloudStack to maximum possible values or unlimited (`-1`).

### Finding quota settings in CloudStack

In CloudStack Global Settings:

1. Search for the keyword `max`
2. Set pagination to **200 max rows**
3. Update domain, account, and project limits as needed

## Key CloudStack quota global settings

| Setting | Description |
| --- | --- |
| `max.account.snapshots` | Maximum snapshots per account |
| `max.domain.snapshots` | Maximum snapshots per domain |
| `max.project.snapshots` | Maximum snapshots per project |

## CMP quota settings

See the [Quota Management](/quota/global-quotas) section for CMP-level global, account, and project quota configuration.

> **Important:** CMP quotas and CloudStack quotas are separate systems. Always keep CloudStack limits at or above the CMP-configured limits to avoid provisioning failures.
