---
sidebar_position: 7
title: "Quota Management (ACS)"
tags: ["orchestrator", "cloudstack", "quota"]
---

# Quota Management (CloudStack)

CloudStack has its own quota management system at **domain**, **account**, and **project** levels. CMP also has a **separate quota engine** — and the two systems do **not** share state.

:::warning[Two independent quota systems]

| System | Scope | Managed in |
|---|---|---|
| **CMP quotas** | Per customer account, project, and global defaults | [Global Resource Quotas](/quota/global-quotas), [Account-Level Quotas](/quota/account-quotas) |
| **CloudStack quotas** | Per domain, account, and project in CloudStack | CloudStack **Global Settings** (`max.*` keys) |

CMP supports **multiple orchestrators** (CloudStack, OpenStack, VMware, and others). Because of this, CMP does **not** use CloudStack's quota management APIs as its quota engine. CMP enforces limits in the CMP portal; CloudStack enforces its own limits independently at the orchestrator layer.

:::

## Why CloudStack quotas still matter

CloudStack's quota system **cannot be disabled**. It is always active. When a customer exceeds a CloudStack limit, provisioning fails with a **CloudStack quota error** returned directly to CMP — even if the customer still has available quota in CMP.

### The mismatch problem

This is the most common source of customer confusion:

```
CMP quota:     Primary Storage = 1024 GB  ✅  (customer sees quota available)
CloudStack:    max.account.primary.storage = 200 GB  ❌  (actual enforcement limit)

Customer creates a 200 GB VM → CloudStack rejects → quota error in CMP portal
Customer expectation: "I have 1024 GB quota — why did this fail?"
```

The customer sees CMP quota as sufficient, but CloudStack blocked the operation first. This is difficult to explain without aligning both systems.

:::warning[Recommendation — set CloudStack limits high or unlimited]

Set CloudStack quota global settings to **higher values than your CMP quotas**, or to **`-1` (unlimited)** where supported. CloudStack limits should **never** be lower than the CMP limits you assign to customers.

**Rule of thumb:** CloudStack limit ≥ CMP limit for every resource type you sell.

:::

## Default CloudStack quota behaviour

On most CloudStack installations:

| Level | Typical default |
|---|---|
| **Domain** | **Unlimited** (`-1`) for most resource types |
| **Project** | Limited — for example, 20 VMs, 200 GB primary storage |
| **Account** | Limited — for example, 20 VMs, 40 vCPUs, 40960 MiB memory, 200 GB primary storage |

Account-level defaults are often **too low** for a production CMP deployment. Domain and project limits can also block provisioning if left at factory defaults.

## Configuring CloudStack quotas

### Step 1 — Open Global Settings

1. Log in to the CloudStack UI as root admin
2. Navigate to **Configuration → Global Settings**
3. Search for **`max`**
4. Set pagination to **200 rows** to see all quota-related settings

### Step 2 — Update account, domain, and project limits

For each `max.account.*`, `max.domain.*`, and `max.project.*` setting relevant to your CMP services, set the value to **`-1`** (unlimited) or a number **greater than** your highest CMP quota for that resource.

:::tip[Unlimited value]

In CloudStack Global Settings, **`-1`** means unlimited for most `max.*` quota keys.

:::

### Step 3 — Verify after CMP quota changes

When you approve a [quota increase request](/quota/quota-requests) in CMP, also verify the customer's CloudStack **account** and **project** limits still exceed the new CMP values. CMP does not update CloudStack quotas automatically.

## Account-level quota settings

These factory defaults apply to every **account** in CloudStack unless overridden. They are **too low** for CMP — change them.

:::danger[Set to `-1`]

For CMP, set each **`max.account.*`** setting below to **`-1`** (unlimited) in CloudStack **Global Settings**.

The **Default** column is CloudStack’s factory value only — **do not leave those defaults** for a production CMP deployment. Leaving `20` VMs / `40` CPUs / `200` GiB storage (and similar) causes provisioning failures even when CMP quota still has capacity.

:::

| Global setting | Description | Default (factory) | Set to (for CMP) |
|---|---|---|---|
| `max.account.user.vms` | Maximum user VMs per account | 20 | **`-1`** |
| `max.account.cpus` | Maximum vCPU cores per account | 40 | **`-1`** |
| `max.account.memory` | Maximum memory per account (MiB) | 40960 | **`-1`** |
| `max.account.primary.storage` | Maximum primary storage per account (GiB) | 200 | **`-1`** |
| `max.account.secondary.storage` | Maximum secondary storage per account (GiB) | 400 | **`-1`** |
| `max.account.volumes` | Maximum volumes per account | 20 | **`-1`** |
| `max.account.snapshots` | Maximum snapshots per account | 20 | **`-1`** |
| `max.account.templates` | Maximum templates per account | 20 | **`-1`** |
| `max.account.public.ips` | Maximum public IPs per account | 20 | **`-1`** |
| `max.account.networks` | Maximum networks per account | 20 | **`-1`** |
| `max.account.vpcs` | Maximum VPCs per account | 20 | **`-1`** |
| `max.account.projects` | Maximum projects per account | 10 | **`-1`** |
| `max.account.backups` | Maximum backups per account | 20 | **`-1`** |
| `max.account.backup.storage` | Maximum backup storage per account (GiB) | — | **`-1`** |


## Domain-level quota settings

Domain limits apply across all accounts within a domain. On most setups these already default to **unlimited** (`-1`). Keep them at **`-1`**, or ensure they stay above your CMP limits.

| Global setting | Description | Default | Set to (for CMP) |
|---|---|---|---|
| `max.domain.user.vms` | Maximum user VMs per domain | -1 | **`-1`** |
| `max.domain.cpus` | Maximum vCPU cores per domain | -1 | **`-1`** |
| `max.domain.memory` | Maximum memory per domain (MiB) | -1 | **`-1`** |
| `max.domain.primary.storage` | Maximum primary storage per domain (GiB) | -1 | **`-1`** |
| `max.domain.secondary.storage` | Maximum secondary storage per domain (GiB) | -1 | **`-1`** |
| `max.domain.volumes` | Maximum volumes per domain | -1 | **`-1`** |
| `max.domain.snapshots` | Maximum snapshots per domain | -1 | **`-1`** |
| `max.domain.templates` | Maximum templates per domain | -1 | **`-1`** |
| `max.domain.public.ips` | Maximum public IPs per domain | -1 | **`-1`** |
| `max.domain.networks` | Maximum networks per domain | -1 | **`-1`** |
| `max.domain.vpcs` | Maximum VPCs per domain | -1 | **`-1`** |
| `max.domain.projects` | Maximum projects per domain | 50 | **`-1`** |
| `max.domain.backups` | Maximum backups per domain | 40 | **`-1`** |
| `max.domain.backup.storage` | Maximum backup storage per domain (GiB) | 800 | **`-1`** |

## Project-level quota settings

Project limits apply within CloudStack projects. CMP maps customers to CloudStack projects — low project defaults can block provisioning even when account and CMP quotas allow it.

:::danger[Set to `-1`]

For CMP, set each **`max.project.*`** setting below to **`-1`** (unlimited).

The **Default** column is CloudStack’s factory value only — **do not leave those defaults**. They match the same low account-style limits (for example 20 VMs, 40 CPUs, 200 GiB primary storage).

:::

| Global setting | Description | Default (factory) | Set to (for CMP) |
|---|---|---|---|
| `max.project.user.vms` | Maximum user VMs per project | 20 | **`-1`** |
| `max.project.cpus` | Maximum vCPU cores per project | 40 | **`-1`** |
| `max.project.memory` | Maximum memory per project (MiB) | 40960 | **`-1`** |
| `max.project.primary.storage` | Maximum primary storage per project (GiB) | 200 | **`-1`** |
| `max.project.secondary.storage` | Maximum secondary storage per project (GiB) | 400 | **`-1`** |
| `max.project.volumes` | Maximum volumes per project | 20 | **`-1`** |
| `max.project.snapshots` | Maximum snapshots per project | 20 | **`-1`** |
| `max.project.templates` | Maximum templates per project | 20 | **`-1`** |
| `max.project.public.ips` | Maximum public IPs per project | 20 | **`-1`** |
| `max.project.networks` | Maximum networks per project | 20 | **`-1`** |
| `max.project.vpcs` | Maximum VPCs per project | 20 | **`-1`** |
| `max.project.backups` | Maximum backups per project | 20 | **`-1`** |
| `max.project.backup.storage` | Maximum backup storage per project (GiB) | 400 | **`-1`** |

## Mapping CMP quotas to CloudStack settings

When configuring CMP [Global Resource Quotas](/quota/global-quotas) or [Account-Level Quotas](/quota/account-quotas), ensure the matching CloudStack settings are at least as high:

| CMP quota resource | CloudStack account setting | CloudStack project setting | Notes |
|---|---|---|---|
| VM Instances | `max.account.user.vms` | `max.project.user.vms` | |
| vCPU | `max.account.cpus` | `max.project.cpus` | |
| RAM (GB) | `max.account.memory` | `max.project.memory` | CloudStack uses **MiB** — multiply CMP GB × 1024 |
| Primary / block storage (GB) | `max.account.primary.storage` | `max.project.primary.storage` | CloudStack uses **GiB** |
| Snapshots | `max.account.snapshots` | `max.project.snapshots` | |
| Public IPs | `max.account.public.ips` | `max.project.public.ips` | |
| VPCs / Networks | `max.account.vpcs`, `max.account.networks` | `max.project.vpcs`, `max.project.networks` | |
| Volumes | `max.account.volumes` | `max.project.volumes` | |
| VM Backups | `max.account.backups` | `max.project.backups` | |
| Templates | `max.account.templates` | `max.project.templates` | |

## Other CloudStack `max.*` settings

These settings are not CMP quota mappings but can affect provisioning:

| Global setting | Description | Default |
|---|---|---|
| `max.template.iso.size` | Maximum template or ISO download size (GB) | 50 |
| `max.data.migration.wait.time` | Max wait time (minutes) for data migration before spawning new SSVM | 15 |
| `max.ssvm.count` | Additional SSVMs for concurrent data object migration | 5 |
| `max.number.managed.clustered.file.systems` | Max managed SRs/datastores per cluster (XenServer/VMware) | 200 |
| `network.loadbalancer.haproxy.max.conn` | HAProxy max concurrent connections (global) | 4096 |
| `network.ipv6.search.retry.max` | Max retries searching for available IPv6 address | 10000 |

## CMP quota settings

CMP quota configuration is managed separately in the CMP admin panel:

* [Global Resource Quotas](/quota/global-quotas) — defaults for new accounts
* [Account-Level Quotas](/quota/account-quotas) — per-customer overrides
* [Project-Level Quotas](/quota/project-quotas) — within-account project limits
* [Quota Requests & Approvals](/quota/quota-requests) — customer increase workflow

See also [Orchestrator-Side Quota Sync](/quota/orchestrator-sync) for cross-orchestrator guidance.

## Validation checklist

Before going live with customer provisioning:

* [ ] CloudStack `max.account.*` settings are set to `-1` or values **≥** your highest CMP account quotas
* [ ] CloudStack `max.project.*` settings are set to `-1` or values **≥** your highest CMP project quotas
* [ ] CloudStack `max.domain.*` settings are `-1` or sufficiently high (most default to unlimited)
* [ ] CMP [Global Resource Quotas](/quota/global-quotas) are configured for your intended service catalogue
* [ ] Process defined to update CloudStack limits when [quota increase requests](/quota/quota-requests) are approved in CMP
* [ ] Test provisioning at/near quota limits — confirm errors reference the correct system when limits are hit

## Related

* [Global Resource Quotas](/quota/global-quotas)
* [Account-Level Quotas](/quota/account-quotas)
* [Project-Level Quotas](/quota/project-quotas)
* [Orchestrator-Side Quota Sync](/quota/orchestrator-sync)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Apache CloudStack — Global Settings](https://docs.cloudstack.apache.org/en/latest/adminguide/index.html)
