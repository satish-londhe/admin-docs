---
sidebar_position: 4
title: "Block Storage / Volume Packages"
tags: ["packages"]
---

# Block Storage / Volume Packages

Block storage packages define the pricing and orchestrator mappings for **additional data volumes** and **root disk storage** when the override disk option is enabled.

## Two use cases for storage packages

| Use case | Description |
| --- | --- |
| **Root disk (override)** | Customer selects root disk size at VM creation; billed per GB using storage packages |
| **Additional volume** | Customer purchases a data disk separately and attaches it to an existing VM |

Both use the same storage package definitions and disk offering mappings.

## Orchestrator side: disk offerings

### CloudStack

Create disk offerings in CloudStack for each storage tier you want to offer:

* **Fixed-size offerings** — for predefined storage packages (e.g. 50 GB SSD, 100 GB SSD)
* **Custom disk offering** — for flexible storage sizing (customers enter their own GB value)

Map these disk offerings to CMP volume packages.

### OpenStack / VMware / Proxmox

Create equivalent storage volumes or profiles per your orchestrator.

## Creating volume packages in CMP

**Path:** Admin Panel → Packages → Block Storage → Add Package

| Field | Description |
| --- | --- |
| **Name / Display Name** | e.g. "SSD 100 GB", "HDD 500 GB" |
| **Cloud Provider + Zone** | Scopes the package to a specific orchestrator + zone |
| **Disk Offering** | The orchestrator disk offering to map |
| **Storage Category** | SSD / HDD / NVMe |
| **Size (GB)** | Fixed size for predefined packages; leave flexible for custom |
| **Pricing** | Per GB/month or fixed price/month |

## Custom disk offering

For customers who need non-standard sizes:

* Create a **custom disk offering** in CloudStack (no fixed size)
* Map it in CMP as the custom storage package
* CMP passes the customer's requested size to CloudStack at provisioning time

## Snapshot billing from volumes

When a customer takes a volume snapshot, billing is based on the **logical size** of the snapshot:

* Charged **hourly**
* Rate defined in the snapshot/backup rate card
* See [Snapshot & Backup Billing](/collection/billing-invoicing) for rate configuration

## Related

* [How Packages Work in CMP](https://how-packages-work-in-cmp)
* [Virtual Machine Packages](https://virtual-machine-packages)
* [Custom Packages & Unit Pricing](https://custom-packages-unit-pricing)
* [Snapshots & Backups](/collection/snapshots-backups)
* [Offering Sync & Packages — CloudStack](/doc/offering-sync-packages)