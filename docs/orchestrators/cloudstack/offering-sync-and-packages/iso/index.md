---
sidebar_position: 1
title: "ISO"
tags: ["orchestrator", "cloudstack", "packages", "iso"]
---

# ISO Management & Packages

ISO images allow cloud customers to boot virtual machines from custom installation media, live distributions, or diagnostic tools instead of pre-configured OS templates.

:::warning[ISO service disabled by default]

The **ISO** service is **disabled by default** in CMP. To offer ISO management and billing to your customers, contact the **StackConsole team** to enable the ISO feature on your platform before configuring packages or global settings.

:::

## Overview

When the ISO service is enabled, CMP provides two methods for adding customer ISO images to CloudStack:

1. **Upload ISO from URL:** The customer provides a public HTTP or HTTPS link to an ISO file. CloudStack's Secondary Storage VM (SSVM) downloads the file directly from the remote URL.
2. **Upload ISO from Local:** The customer selects an ISO file from their workstation. The browser uploads the file directly to CloudStack's Secondary Storage VM (SSVM) over an authenticated HTTPS endpoint, bypassing the CMP server to eliminate double-bandwidth proxying.

ISO storage is billed continuously on an **hourly per-GB** rate card basis until the image is deleted by the customer.

## Pages in this section

| Page | Description |
|---|---|
| **[Prerequisites & Architecture Requirements](/orchestrators/cloudstack/offering-sync-and-packages/iso/prerequisites)** | Infrastructure and network architecture for URL and local ISO uploads, direct browser-to-SSVM upload path, reverse proxy setup, and firewall security. |
| **[Packages & Enablement Settings](/orchestrators/cloudstack/offering-sync-and-packages/iso/packages)** | Rate card package configuration, hourly per-GB pricing, free ISO allowance, global settings (`iso_upload_from_local`), and customer portal management. |

## Upload methods comparison

| Dimension | Method 1: Upload from URL | Method 2: Upload from Local |
|---|---|---|
| **Data flow path** | Remote ISO URL ➔ CloudStack SSVM ➔ Secondary Storage | User Browser ➔ CloudStack SSVM ➔ Secondary Storage |
| **Public CloudStack endpoint required?** | **No** (SSVM only requires outbound internet reachability) | **Yes** (SSVM HTTPS upload endpoint exposed via reverse proxy) |
| **CMP server network traffic** | Minimal (API metadata / control plane only) | Minimal (API metadata / control plane only) |
| **Global setting requirement** | Standard ISO service enablement | `iso_upload_from_local = true` in Global Settings |
| **SSL certificate requirement** | Handled by remote server hosting the ISO | Valid CA-signed SSL certificate on the SSVM upload domain |

## Related

* [ISO Prerequisites & Architecture](/orchestrators/cloudstack/offering-sync-and-packages/iso/prerequisites)
* [ISO Packages & Billing](/orchestrators/cloudstack/offering-sync-and-packages/iso/packages)
* [CloudStack Packages Overview](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Templates Offering](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot)
* [Pricing Formulas](/billing/rate-cards/pricing-formulas#snapshot--template--iso-pricing)
