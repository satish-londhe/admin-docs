---
sidebar_position: 5
title: "Stoppable Services"
tags: ["billing", "stoppable", "hourly", "vm", "kubernetes", "storage"]
---

# Stoppable Services

**Stoppable service billing** controls whether **compute** charges pause when a Virtual Machine or Kubernetes cluster is **stopped** (including while resources are suspended/stopped by the customer or by disciplinary / schedule flows).

Controlled by the global setting:

**`enable_stoppable_service_billing`**

| Value | Behaviour |
|---|---|
| **`true` (ON)** | Compute billing pauses while the resource is stopped; storage (and related allocated resources) keep billing |
| **`false` (OFF)** | Compute and storage keep billing for the full period even while VMs / Kubernetes are stopped |

:::danger[Critical — override root disk required]

Stoppable compute pause works correctly only when **compute and storage are billed separately** — **override root disk** must be **enabled**.

If storage is **bundled inside the compute offering**, “CPU/RAM only” pause is not cleanly separated — storage is tied to the same package, so stoppable billing does not behave as customers expect. Prefer **compute-only packages + override disk** for PAYG stoppable billing.

See [VM packages & storage FAQ](/faq/platform/packages-storage), [CloudStack Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine), and [OpenStack Virtual Machine packages](/orchestrators/openstack/offering-sync-and-packages/virtual-machine).

:::

:::tip[Applies with hourly metering]

Stoppable behaviour is meaningful for **hourly (pay-as-you-go)** compute. Fixed cycles (monthly and longer) still follow full-period commitment rules — see [Billing cycles](/billing/billing-cycles/).

:::

## When `enable_stoppable_service_billing` is ON (`true`)

While a VM or Kubernetes cluster is **stopped**:

| Resource | Billing while stopped |
|---|---|
| **Compute** (VM CPU/RAM, Kubernetes compute) | **Stops** — no compute charges accrue for the stopped hours |
| **Disk / storage** (volumes, allocated disks) | **Continues** — storage stays allocated, so disk billing continues |
| **IP address** (if any) | **Continues** — same as storage; the IP remains allocated |

You are billed for compute only for hours when the VM / Kubernetes cluster was **actually running**. During suspension or a customer stop, compute does not accrue; disk (and IP) still do.

**Example:** Hourly VM stopped for 48 hours → no CPU/RAM charge for those 48 hours; root/data volume charges continue for the whole time.

## When `enable_stoppable_service_billing` is OFF (`false`)

All resources continue to be charged for the full period — **compute and disk/storage** — even while VMs and Kubernetes are stopped due to suspension or a manual stop.

| Resource | Billing while stopped |
|---|---|
| **Compute** | **Continues** |
| **Disk / storage** | **Continues** |

Stopping the workload does **not** reduce the bill when this flag is off.

## Scheduled start / stop

Scheduler-driven stop/start follows the same rules. When the flag is ON and a VM is stopped by schedule, compute pauses and storage continues. See also [FAQ — scheduled VMs](/faq/platform/packages-storage#if-users-run-vms-on-a-schedule-how-are-usage-hours-calculated).

## Comparison

| | Flag **ON** | Flag **OFF** |
|---|---|---|
| VM / K8s **running** | Compute + storage billed | Compute + storage billed |
| VM / K8s **stopped** | Compute **paused**; storage (and IP) **continue** | Compute + storage **both continue** |
| Customer saving money by stopping | ✅ Compute hours saved | ❌ No compute saving while stopped |

## Related

* [Hourly billing](/billing/billing-cycles/hourly)
* [Billing overview](/billing/overview)
* [Disciplinary Actions](/billing/disciplinary-actions/)
* [IP Address packages — billing lifecycle](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/packages#billing-lifecycle)
* [FAQ — packages & storage](/faq/platform/packages-storage)
* [FAQ — billing & pricing](/faq/platform/billing-pricing)
