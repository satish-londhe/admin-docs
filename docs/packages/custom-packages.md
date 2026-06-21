---
sidebar_position: 3
title: "Custom Packages & Unit Pricing"
tags: ["packages"]
---

# Custom Packages & Unit Pricing

Custom packages let customers provision VMs with their own specified CPU, RAM, and storage values — outside of predefined package tiers. CMP calculates pricing based on **unit pricing** configured by the admin.

## How custom packages work

```
Customer selects "Custom" instead of a predefined package
        ↓
Customer enters desired vCPU, RAM, and storage values
        ↓
CMP calculates price = (vCPU × CPU unit price) + (RAM × RAM unit price) + (storage × storage unit price)
        ↓
CMP provisions using the orchestrator's custom/unconstrained offering
```

## Orchestrator setup: custom offering

You must create a dedicated **custom offering** in your orchestrator before custom packages work.

### CloudStack

* Create a compute offering with the **custom unconstrained** option enabled
* This allows CMP to pass any CPU/RAM values at provisioning time
* One custom offering is sufficient — CMP reuses it for all custom package requests

### OpenStack

* Use a flavor with `0` CPU/RAM/disk, or configure Nova to accept custom resource requests

## Configuring unit pricing in CMP

**Path:** Admin Panel → Packages → Unit Pricing

| Unit | Description | Billing |
| --- | --- | --- |
| **1 vCPU / month** | Price per CPU core requested in a custom package | Monthly / hourly derived |
| **1 GB RAM / month** | Price per GB memory requested | Monthly / hourly derived |
| **1 GB Storage / month** | Price per GB storage requested | Monthly / hourly derived |
| **1 GB Bandwidth / month** | Price per GB of network usage | Hourly (usage-based) |

## Critical pricing rule

> ⚠️ Custom package pricing must **never be less than** predefined package pricing for equivalent resources. Custom packages should be priced equal to or higher than predefined packages to prevent customers from circumventing predefined pricing by using custom packages.

**Example check:**

* Predefined package: 4 vCPU + 8 GB RAM = $20/month → $0.25/vCPU/month + $0.25/GB/month implied
* Custom unit pricing: must be ≥ $0.25/vCPU + $0.25/GB RAM (otherwise customers would always choose custom)

## Bandwidth unit pricing

CMP supports charging for network bandwidth using CloudStack's usage data (incoming + outgoing traffic at the network level).

### Free bandwidth threshold

Set a free monthly bandwidth allowance (in GB) per cloud provider setup. Usage beyond this threshold is charged at the unit price. Resets to zero every month.

**Reference:** https://www.shapeblue.com/cloudstack-usage-service-deep-dive/

## Related

* [How Packages Work in CMP](/packages/overview)
* [Virtual Machine Packages](/packages/vm-packages)
* [Pricing Formulas](/packages/pricing-formulas)
* [Offering Sync & Packages — CloudStack](/orchestrators/cloudstack/offering-sync-and-packages/)
