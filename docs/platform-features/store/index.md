---
sidebar_position: 1
title: "Store & Products"
tags: ["platform", "features", "store", "products", "marketplace"]
---

:::important[Not yet rolled out]

This documentation describes an **improvement** on the basic Products / Store feature. It is **not yet rolled out** to all deployments — you may find that some of these capabilities are **not available** on your CMP today. They will become available in upcoming updates.

:::

# Selling Non-Automated Services in CMP

CMP can sell **orchestrator-provisioned** services (VMs, load balancers, Kubernetes, IPs, and similar) and **manually delivered** offerings that cannot be auto-provisioned.

Examples of non-automated services:

* Managed support
* Microsoft Office 365 / SaaS licenses
* Physical servers
* Third-party backup products (for example NAKIVO)
* Windows Remote Desktop Services (RDS)
* Other manually fulfilled services

To keep the catalogue scalable, CMP classifies these offerings by how they relate to infrastructure and how they are delivered.

:::info[Module enablement]

By default the **Products / Store** module is **not enabled**. Contact the StackConsole team if you need it turned on for your deployment.

:::

## Add-ons vs Products

| Type | Definition | Fulfilment |
|---|---|---|
| **[Add-ons](#add-ons-vm-bound-services)** | Depend on an existing CMP-managed virtual resource (typically a VM) | Admin works on that specific VM |
| **[Products](#products-standalone-services)** | Standalone — not tied to one VM lifecycle | Admin delivers keys, credentials, docs, or hardware; customer often completes setup |

### Add-ons (VM-bound services)

Services that must be installed, configured, or attached to a **specific Virtual Machine**.

On purchase, a service request is linked to the target VM. Admins access that VM to complete the work.

Examples:

* Managed OS support (patching a specific instance)
* Backup agent / policy on a specific VM
* Windows RDS licensing and configuration on a terminal server

### Products (standalone services)

Independent offerings outside a specific VM or orchestrator resource — for example delivering a **license key** rather than configuring a guest.

Examples:

* SaaS licenses (Office 365, Adobe Creative Cloud)
* Physical hardware
* VoIP / telephony accounts
* Consultancy or support contracts not tied to a single asset

### The “Hybrid” exception

Some offerings (Office 365, security agents) can be either:

| Model | When to use |
|---|---|
| **Add-on** | Admin must log into the customer’s VM to install or activate |
| **Product** | Admin only sends a license key; the customer installs it |

:::warning[Communication outside CMP]

Once an add-on or product order is placed, **ongoing order communication** (updates, clarification, delivery details) must be handled **outside CMP** today — for example email or your support desk.

CMP does not yet provide a full in-platform conversation thread for product orders. Manual **Send Email** from an order is available for one-off messages. Broader in-platform order messaging is on the roadmap.

:::

## Admin setup path

Configure the catalogue under **Settings → Products**:

1. [Categories](/platform-features/store/categories)
2. [Product Vendors](/platform-features/store/product-vendors)
3. [Add Products](/platform-features/store/add-products)
4. [Product Billing (rate card)](/platform-features/store/product-billing)
5. [Orders](/platform-features/store/orders)

Customers buy from the [Store](/platform-features/store/customer-store). See also [Billing behaviour](/platform-features/store/billing-behavior) and [Products changelog](/platform-features/store/changelog).

## Related

* [Platform Features](/platform-features/)
* [Products changelog](/platform-features/store/changelog)
* [Rate Cards](/billing/rate-cards/)
* [Billing Overview](/billing/overview)
