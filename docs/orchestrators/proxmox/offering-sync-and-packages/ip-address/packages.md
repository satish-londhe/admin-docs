---
sidebar_position: 2
title: "Configure pricing"
tags: ["orchestrator", "proxmox", "packages", "ip-address", "ipam"]
---

# Configure IP Address pricing (Proxmox)

IP Address packages define **how IPs are priced** on the rate card for a Proxmox setup and zone. CMP allocates addresses from the pools you manage in [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam); this package is the **billing** side of those IPs.

Category overview: [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/). When billing applies per network: [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing).

:::warning[One package per setup and zone; no free trials]

CMP allows **only one IP Address package per Cloud Provider Setup + Zone**. You cannot create multiple IP package tiers for the same setup and zone.

**Free trials are not applicable** to IP Address packages. The form does not include **Enable Free Trial** — IPs are billed according to package pricing and network billing flags from acquisition / allocation.

:::

:::info[Before you begin]

* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) complete, with **IP Address** enabled under Cloud Provider Services if you offer IP billing
* [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam) — networks imported, IP pools generated, and **Do you want to enable billing for IP addresses for this network?** set per network
* Zone exists for the Proxmox setup

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → IP Address → Add Package**

:::tip[Shared Network IP billing]

**Same package prices** apply when IP billing is enabled on a Proxmox network. Per-network **when** billing applies: [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing).

:::

![Screenshot: CMP — Create IP Address Package for Proxmox](/img/screenshots/proxmox-cmp-create-ip-address-package.png)

---

## How this relates to Networks and IPAM

| Layer | Where | Role |
|---|---|---|
| **IPAM** | [Networks IP Address](/orchestrators/proxmox/networks-and-ipam#networks-ip-address-ipam) | Pool of available / allocated IPs (and optional Associated IP for display) |
| **Network flag** | Import / Update Network — **enable billing for IP addresses** | **Yes** = charge for IPs on that network; **No** = no IP billing for that network |
| **IP Address package** | This page | Rate card prices (monthly / yearly / etc.) when IP billing applies |

If the network’s IP billing flag is **No**, customers are not charged for IPs on that network even when an IP package exists. Set the flag to **Yes** when you want this package’s pricing to apply.

---

## Create / edit IP Address package fields

**Cloud Provider**

*Required.* Select **Proxmox (proxmox)**.

**Cloud Provider Setup**

*Required.* The Proxmox setup from [Connecting](/orchestrators/proxmox/connecting) (for example `Proxmox`).

**Package Name**

*Required.* Display name for the IP plan — for example `Public IP` or `Ip Plan`.

**Zone**

*Required.* CMP zone where this IP pricing applies. Create a separate package if you sell IPs in multiple zones (one package per setup + zone).

**Tag**

*Optional.* CMP-level label for representation (for example **Recommended**). Not related to Proxmox tags.

**Status**

*Required.*

| Status | Behaviour |
|---|---|
| **Active** | IP pricing can apply when customers use billable IPs in this zone |
| **Inactive** | Hidden — use while configuring pricing or testing |

**Billing cycle and pricing**

*Required.* Set prices for each currency and cycle CMP displays (for example Monthly and Yearly for USD and INR).

Example (from the form):

| Currency | Monthly | Yearly |
|---|---|---|
| USD ($) | 0 | 0 |
| INR (₹) | 0 | 0 |

Use non-zero values when you charge for IPs. For hourly derivation from monthly, see [Pricing Formulas](/billing/rate-cards/pricing-formulas) where applicable.

:::info[No free trial field]

The **Create IP Address Package** form does not include **Enable Free Trial**.

:::

Click **Save**.

---

## Checklist

- [ ] One Active IP package per Proxmox Setup + Zone where you bill IPs
- [ ] Networks that should charge IPs have **enable billing for IP addresses** = **Yes**
- [ ] IP pools exist under Networks IP Address
- [ ] Pricing set

---

## Related

* [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/) — category overview
* [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing)
* [Proxmox Packages](/orchestrators/proxmox/offering-sync-and-packages/)
* [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam)
* [Virtual Machine packages](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine)
* [CloudStack — IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/)
* [Free Trials](/billing/free-trials) — IPs are not free-trial eligible
