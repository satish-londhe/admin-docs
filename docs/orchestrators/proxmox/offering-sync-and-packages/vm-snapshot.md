---
sidebar_position: 5
title: "VM Snapshot"
tags: ["orchestrator", "proxmox", "packages", "vm-snapshot", "snapshot"]
---

# VM Snapshot packages (Proxmox)

VM Snapshot packages define how CMP bills **VM (instance) snapshots** on Proxmox (`VM_SNAPSHOT`). Pricing is **hourly per GB** based on snapshot size.

:::warning[One package per setup and zone; free trial not applicable]

CMP allows **only one VM Snapshot package per Cloud Provider Setup + Zone**.

**Free trials are not applicable** to VM Snapshot packages. Do **not** use **Enable Free Trial** on this form even if the checkbox appears — snapshot billing follows the hourly per-GB rate from creation until the snapshot is deleted.

:::

:::info[Before you begin]

* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) — enable **VM Snapshot** (or equivalent) under Cloud Provider Services if you offer snapshots to customers
* Zone and rate card exist for the Proxmox setup
* Understand that `VM_SNAPSHOT` is an **always-hourly** service type — see [Billing overview](/billing/overview)

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → VM Snapshot → Add Package**

![Screenshot: CMP — Create VM Snapshot Package for Proxmox](/img/screenshots/proxmox-cmp-create-vm-snapshot-package.png)

---

## How VM snapshot billing works

```text
VM snapshot cost per hour = current snapshot size (GB) × Hourly (per GB)
```

Billing continues while the snapshot exists and stops when it is deleted. Monthly / yearly package cycles are not used for this service — only **Hourly (per GB)** on the form.

---

## Create / edit VM Snapshot package fields

**Cloud Provider**

*Required.* Select **Proxmox (proxmox)**.

**Cloud Provider Setup**

*Required.* The Proxmox setup from [Connecting](/orchestrators/proxmox/connecting).

**Package Name**

*Required.* Display name — for example `VM Snapshot` or `Instance Snapshot Plan`.

**Zone**

*Required.* CMP zone where this snapshot pricing applies. One package per setup + zone.

**Tag**

*Optional.* CMP-level label for representation.

**Status**

*Required.*

| Status | Behaviour |
|---|---|
| **Active** | Per-GB hourly pricing applies when customers create VM snapshots in this zone |
| **Inactive** | Hidden — use while configuring pricing or testing |

**Enable Free Trial**

*Not applicable.* Leave **unchecked**. Free trials do not apply to VM Snapshot packages.

**Billing cycle and pricing**

*Required.* Enter **Hourly (per GB)** for each currency CMP displays (for example USD and INR).

| Currency | Hourly (per GB) |
|---|---|
| USD ($) | _(your rate)_ |
| INR (₹) | _(your rate)_ |

Click **Save**.

---

## Checklist

- [ ] One Active VM Snapshot package per Proxmox Setup + Zone where you sell snapshots
- [ ] **Enable Free Trial** left off
- [ ] Hourly (per GB) rates set for each currency
- [ ] Status is **Active**

---

## Related

* [Proxmox Packages](/orchestrators/proxmox/offering-sync-and-packages/)
* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting)
* [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap) — backup destinations (external storage / PBS) under development for an upcoming version; snapshots are separate from backup
* [Billing cycles — hourly](/billing/billing-cycles/hourly)
* [CloudStack Volume Snapshot packages](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot) — similar hourly per-GB pattern
