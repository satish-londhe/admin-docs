---
sidebar_position: 1
title: "How Packages Work in CMP"
tags: ["packages"]
---

# How Packages Work in CMP

Packages are the **resource bundles that customers select** when provisioning services. Each package maps to an underlying orchestrator offering (compute offering, disk offering, network offering, etc.).

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

* [Virtual Machine Packages](https://virtual-machine-packages)
* [Custom Packages & Unit Pricing](https://custom-packages-unit-pricing)
* [Block Storage / Volume Packages](https://block-storage-volume-packages)
* [Pricing Formulas](https://pricing-formulas)
* [Offering Sync & Packages — CloudStack](/doc/offering-sync-packages)