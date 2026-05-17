---
sidebar_position: 5
title: "Offering Sync & Packages"
tags: ["orchestrator", "cloudstack"]
---

# Offering Sync & Packages

All CMP packages are unique per **Provider + Setup + Zone + Storage Category**.

## Virtual Machine packages

CloudStack-specific compute offerings map to CMP VM packages.

* **Create offerings without storage** — CMP uses the override disk option; set CPU (MHz) and RAM only in compute offerings, and pick storage from disk offerings separately.
* Add correct CPU MHz and storage type values for your infrastructure.

### Custom offering (required)

Customers who need resources outside predefined packages use the **custom package** option. CMP uses a single custom offering for this:

* Must be created with the **custom unconstrained** option enabled
* The super admin must map this offering in CMP with compute categories, plan categories, and display names

## Virtual Router / VPC packages

Create multiple CloudStack VPC offerings based on virtual router VM configuration and network speed. Each offering can be mapped to a CMP VPC/Virtual Router package with different pricing.

## Load Balancer packages

CloudStack load balancers operate at the network/IP layer. Create one LB package in CMP as an admin.

## IP Address packages

Two billing options when creating an instance with a public IP:

1. **Include IP price within the VM package**
2. **Charge IP separately** — enable via global setting `plan_ip_billing = true`

## Block Storage / Volume packages

* Map CloudStack disk offerings to CMP Volume packages
* Create a **custom disk offering** for flexible storage provisioning
* Enable override disk option to allow customers to choose root volume size at instance creation

## Snapshot / Template / ISO billing

All charged on an **hourly basis** based on logical size. See [Snapshot & Backup billing](/collection/billing-invoicing) for details.

## Unit pricing reference

| Unit | Used for |
| --- | --- |
| 1 CPU / month | Custom package CPU pricing |
| 1 GB RAM / month | Custom package memory pricing |
| 1 GB Storage / month | Custom package storage pricing |
| 1 GB Bandwidth / month | Network-level bandwidth usage |

### Free bandwidth threshold

Set the free bandwidth value (in GB) in Cloud Provider setup. Usage beyond this threshold is charged. Resets monthly.

### Pricing formula

See [Pricing Formulas](/collection/packages-offerings) for hourly ↔ monthly ↔ yearly conversion.