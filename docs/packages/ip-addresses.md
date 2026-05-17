---
sidebar_position: 5
title: "IP Address Packages"
tags: ["packages"]
---

# IP Address Packages

IP address packages control how public IPs are billed when customers provision VMs or purchase standalone IPs.

## Two billing modes

### Mode 1: IP price included in VM package (default)

The cost of a public IP is rolled into the VM package price. No separate line item appears on the invoice for the IP.

This is the default behaviour — no additional configuration required.

### Mode 2: IP charged separately

A separate IP charge is applied whenever a VM is created with a public IP, or when a customer purchases a reserved IP.

**To enable:** Set `plan_ip_billing = true` in **Admin Panel → Global Settings**.

## Reserved vs bundled IPs

| Type | Description |
| --- | --- |
| **Bundled IP** | IP assigned at instance creation — billed per Mode 1 or 2 above |
| **Reserved / Standalone IP** | Customer purchases an IP address separately and assigns it manually to a VM — always billed separately |

> ℹ️ A "free IP when bundled, paid when reserved" model is **not currently supported**. The `plan_ip_billing` flag applies globally — either all IPs are free (included in VM) or all IPs are charged separately.

## Creating IP packages in CMP

**Path:** Admin Panel → Packages → IP Addresses → Add Package

| Field | Description |
| --- | --- |
| **Cloud Provider + Zone** | Scopes the package to a specific orchestrator + zone |
| **Pricing** | Per IP/month or per IP/hour |

## Billing lifecycle

* IP billing starts when the IP is assigned to a VM or reserved
* IP billing continues even when the VM is **stopped** (unlike CPU/RAM which pause)
* IP billing stops when the IP is released/deleted

## Related

* [How Packages Work in CMP](/packages/overview)
* [Virtual Machine Packages](/packages/vm-packages)
* [Billing Models Overview](/billing/overview)
