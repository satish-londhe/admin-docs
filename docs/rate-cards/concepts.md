---
sidebar_position: 2
title: "How Rate Cards Work"
tags: ["rate-cards", "packages"]
---

# How Rate Cards Work

Packages (rate card entries) are the **resource bundles that customers select** when provisioning services. Each package maps to an underlying orchestrator offering (compute offering, disk offering, network offering, etc.).

## Package identity

Every package in CMP is **unique** based on the combination of:

```
Cloud Provider  +  Cloud Provider Setup  +  Zone  +  Storage Category
```

This means the same "4 vCPU / 8 GB RAM" spec can have different packages for different zones or storage types (SSD vs HDD), each with independent pricing.

## Package types

| Package Type | Orchestrator mapping | Notes |
| --- | --- | --- |
| Virtual Machine | Compute Offering | CPU + RAM; storage is separate via disk offering |
| Block Storage / Volume | Disk Offering | Root disk override and additional volumes |
| Load Balancer | Network Offering | One LB package per CMP setup |
| IP Address | IP Offering | Optional; may be bundled in VM package |
| VPC / Virtual Router | VPC Offering | Multiple packages with different VR configurations |
| Kubernetes (K8s) | K8s cluster config | Managed cluster packages |
| Bandwidth | Usage-based | Charged per GB at the network level |
| Snapshot / Template / ISO | Logical size-based | Hourly billing; no predefined packages |

## Predefined vs custom packages

| Type | Description |
| --- | --- |
| **Predefined** | Fixed packages the admin creates (e.g. "Starter — 2 vCPU / 4 GB") shown in the portal |
| **Custom** | Customer inputs their own CPU/RAM/storage values; CMP uses the custom offering in the orchestrator |

For custom packages, ensure:

* A custom compute offering (unconstrained) exists in the orchestrator
* Unit pricing is configured in CMP (per vCPU/month, per GB RAM/month, per GB storage/month)
* Custom pricing should be **equal to or higher than** predefined package pricing for equivalent resources

## Pricing flow

```
Admin creates offering in orchestrator (e.g. CloudStack)
        ↓
Admin syncs / maps offering to CMP package
        ↓
Admin sets pricing (monthly → auto-derives hourly & yearly)
        ↓
Package appears in customer portal for the configured zone
```

## Related

* [Virtual Machine Packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [IP Address Packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing) — custom packages and bandwidth
* [Block Storage / Volume Packages](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Pricing Formulas](/rate-cards/pricing-formulas)
* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Rate Cards Overview](/rate-cards/)
