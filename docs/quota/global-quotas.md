---
sidebar_position: 1
title: "Global Resource Quotas"
tags: ["quota"]
---

# Global Resource Quotas

Global quotas define the **default resource limits** applied to every newly created customer account. They act as the system-wide baseline before any account-specific overrides are set.

## How global quotas work

```
Global Quota (default)
        ↓
Applied automatically to all new accounts
        ↓
Admin can override per-account → Account-Level Quota
        ↓
Account owner can distribute within account → Project-Level Quota
```

## Configuring global quotas

**Path:** Admin Panel → Settings → Quota → Global Resource Quota

Set limits for:

| Resource | Description |
| --- | --- |
| vCPU | Total virtual CPUs per account |
| RAM (GB) | Total memory per account |
| Storage (GB) | Total block storage per account |
| Public IP Addresses | Total IPs per account |
| Snapshots | Maximum snapshots per account |
| VM Instances | Maximum virtual machines per account |
| Load Balancers | Maximum LB instances per account |
| Kubernetes Clusters | Maximum K8s clusters per account |
| VPCs / Networks | Maximum virtual networks per account |

## Important behaviour

* Global quotas apply **only to newly created accounts** at the time of creation
* Changing global quotas does **not retroactively update** existing accounts
* To update an existing account's limits, use [Account-Level Quotas](/quota/account-quotas)

## Relationship to orchestrator quotas

> ⚠️ CMP quotas and orchestrator quotas (e.g. CloudStack domain/account limits) are **independent systems**. Always ensure orchestrator-side limits are equal to or higher than CMP limits to avoid provisioning failures.

See [Orchestrator-Side Quota Sync](/quota/orchestrator-sync) for CloudStack-specific guidance.

## Related

* [Account-Level Quotas](/quota/account-quotas)
* [Project-Level Quotas](/quota/project-quotas)
* [Quota Requests & Approvals](/quota/quota-requests)
* [Orchestrator-Side Quota Sync](/quota/orchestrator-sync)
* [Quota Management — ACS](/orchestrators/cloudstack/quota-management)
