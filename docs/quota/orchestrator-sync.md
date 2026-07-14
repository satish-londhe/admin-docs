---
sidebar_position: 5
title: "Orchestrator-Side Quota Sync"
tags: ["quota", "orchestrator", "cloudstack"]
---

# Orchestrator-Side Quota Sync

CMP manages quotas at the **application level**. Each connected orchestrator also enforces its **own** limits. The two systems are **not** synced automatically — admins must keep orchestrator limits **equal to or greater than** CMP [account](/quota/account-quotas) and [project](/quota/project-quotas) quotas.

:::tip[Quick start]

| Orchestrator | Status |
|---|---|
| **CloudStack** | Fully documented — use the links in [CloudStack](#cloudstack) below |
| **OpenStack, VMware, Proxmox, OpenNebula, and others** | Same general principle applies — detailed CMP docs **coming soon** |

:::

## The mismatch problem

```
CMP allows: 20 vCPUs for Customer A
Orchestrator account limit: 10 vCPUs (default or outdated)

Result: Customer hits orchestrator limit before CMP limit
        → Provisioning fails with an orchestrator error
        → Customer sees a confusing error despite having CMP quota available
```

Always keep orchestrator limits **≥** CMP quota values for every resource you sell.

## CloudStack

CloudStack enforces limits at **domain**, **account**, and **project** levels. CMP does **not** call CloudStack quota APIs as its quota engine — customer quotas are managed in CMP. CloudStack `max.*` Global Settings remain active and can still block provisioning.

### Required reading

| Topic | Link |
|---|---|
| Full CloudStack quota guide (`max.*` keys, defaults, checklist) | [Quota Management (ACS)](/orchestrators/cloudstack/quota-management) |
| Why CloudStack and CMP quotas differ | [Two independent quota systems](/orchestrators/cloudstack/quota-management#why-cloudstack-quotas-still-matter) |
| How to set CloudStack Global Settings | [Configuring CloudStack quotas](/orchestrators/cloudstack/quota-management#configuring-cloudstack-quotas) |
| CMP ↔ CloudStack resource mapping | [Mapping CMP quotas to CloudStack settings](/orchestrators/cloudstack/quota-management#mapping-cmp-quotas-to-cloudstack-settings) |
| After CMP quota increases | [Verify after CMP quota changes](/orchestrators/cloudstack/quota-management#step-3--verify-after-cmp-quota-changes) |
| Connect CloudStack to CMP (includes Wizard Step 6 global quota) | [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) |
| CMP global defaults for new customers | [Global Resource Quotas](/quota/global-quotas) |
| Per-customer CMP limits | [Account-Level Quotas](/quota/account-quotas) |
| Approve quota increase requests in CMP | [Quota Requests & Approvals](/quota/quota-requests) |

### Recommended CloudStack approach

* Set **domain** limits to `-1` (unlimited) or a very high value — see [Domain-level quota settings](/orchestrators/cloudstack/quota-management#domain-level-quota-settings)
* Set **account** and **project** `max.*` values to **≥** the highest CMP account / project quotas you assign — or `-1` where supported
* Use the validation checklist on [Quota Management (ACS)](/orchestrators/cloudstack/quota-management#validation-checklist) before go-live

Key settings (full list on the ACS page):

| CloudStack Setting | Set to |
|---|---|
| `max.account.user.vms` | ≥ CMP Instances / Virtual Machine quota |
| `max.account.cpus` | ≥ CMP CPU quota |
| `max.account.memory` | ≥ CMP Memory quota (**MiB** in CloudStack — CMP uses GB) |
| `max.account.primary.storage` | ≥ CMP storage quota (**GiB**) |
| `max.account.snapshots` | ≥ CMP snapshot quota |
| `max.account.public.ips` | ≥ CMP IP Address quota |
| `max.domain.*` | High or `-1` (unlimited) |
| `max.project.*` | ≥ CMP [project](/quota/project-quotas) limits (or `-1`) |

### After approving a CMP quota request (CloudStack)

When you approve a request under **Settings → Quota → Resource Quota Requests**, CMP updates the **account** quota only. Also verify CloudStack account (and project) limits still exceed the new values.

See [Quota Requests & Approvals](/quota/quota-requests) and [Verify after CMP quota changes](/orchestrators/cloudstack/quota-management#step-3--verify-after-cmp-quota-changes).

## Other orchestrators (docs coming soon)

CMP also supports **OpenStack**, **VMware vSphere**, **Proxmox VE**, **OpenNebula**, and other backends. The same rule applies to all of them:

:::info[Documentation coming soon]

Detailed orchestrator-side quota sync pages for **OpenStack**, **VMware**, **Proxmox**, **OpenNebula**, and related integrations will be added when those orchestrator sections are fully documented.

Until then:

1. Keep each orchestrator's project / account / tenant limits **≥** the matching CMP [account](/quota/account-quotas) and [project](/quota/project-quotas) quotas
2. After approving a [quota request](/quota/quota-requests) in CMP, update the orchestrator-side limits manually if they are lower than the new CMP values
3. Prefer setting orchestrator caps high enough that **CMP** is the customer-facing limit customers see first

Placeholder orchestrator hubs (content TBD):

* [OpenStack](/orchestrators/openstack/)
* [VMware](/orchestrators/vmware/)
* [Proxmox](/orchestrators/proxmox/)
* [OpenNebula](/orchestrators/opennebula/)

:::

## General best practice

:::tip[Rule of thumb]

Set orchestrator limits to **at least 2×** the highest CMP quota you plan to assign (or unlimited / `-1` where supported). That way the orchestrator rarely becomes the bottleneck during normal growth or [quota request](/quota/quota-requests) approvals.

:::

## Related

* [Global Resource Quotas](/quota/global-quotas)
* [Account-Level Quotas](/quota/account-quotas)
* [Project-Level Quotas](/quota/project-quotas)
* [Quota Requests & Approvals](/quota/quota-requests)
* [Quota Management — ACS](/orchestrators/cloudstack/quota-management)
* [CloudStack setup](/orchestrators/cloudstack/)
