---
sidebar_position: 2
title: "Bandwidth"
tags: ["orchestrator", "openstack", "features", "bandwidth", "billing"]
---

# Bandwidth

CMP bills **outgoing network bandwidth** as a usage-based service. On **OpenStack**, CMP implements **VM-level** bandwidth billing using **Gnocchi** metrics (`network.outgoing.bytes` on the VM’s network interface).

:::important[Orchestrator support]

Bandwidth billing only works for **CloudStack** and **OpenStack**. Other orchestrators are not supported for bandwidth billing.

For CloudStack (network / VPC level), see [CloudStack Bandwidth](/orchestrator-features/cloudstack/bandwidth) — that page is separate and CloudStack-specific.

:::

:::important[Only outgoing traffic is billed]

CMP bills **outgoing** traffic only (bytes sent / egress). **Inbound** traffic is always free.

:::

---

## OpenStack limitations (read first)

| Limitation | Detail |
|---|---|
| **VM-level billing only** | At CMP, OpenStack bandwidth is billed per **Virtual Machine**, not per network |
| **No network-level billing** | Keep `enable_network_bandwidth = false` — CMP does not provide network-level bandwidth billing for OpenStack |
| **No VPC bandwidth** | Keep `enable_vpc_bandwidth = false` — the OpenStack usage path does not resolve VPC resources correctly (it would use `vm_id`, which VPC does not have) |
| **Gnocchi required** | Usage comes from Gnocchi `network.outgoing.bytes` on the VM resource / network interface |
| **Outgoing only billed** | Only outgoing bytes are charged; inbound is free |
| **Always hourly billing** | Bandwidth billing cycle is always **HOURLY**; charges aggregate on the monthly invoice |

:::warning[Do not enable network or VPC bandwidth on OpenStack]

Leave **`enable_network_bandwidth = false`** and **`enable_vpc_bandwidth = false`**. Enabling VPC bandwidth would create records that cannot be matched correctly to OpenStack resources.

:::

---

## Enabling bandwidth for OpenStack

OpenStack supports network-level and VM-level metrics via Gnocchi. In CMP, use **VM-level** bandwidth only.

### 1. Enable the global master switch

Set `enable_bandwidth = true`.

Without this, no bandwidth records or billing are created for any service type.

### 2. Disable network-level bandwidth

Set `enable_network_bandwidth = false`.

For OpenStack, CMP does **not** provide bandwidth billing on the network.

### 3. Enable VM-level bandwidth

Set `enable_vm_bandwidth = true`.

This creates bandwidth for Virtual Machines and fetches usage from Gnocchi using the VM resource ID (`network.outgoing.bytes` on the VM’s network interface). Use this when you want to bill on per-VM traffic.

### 4. Do not enable VPC-level bandwidth

Leave `enable_vpc_bandwidth = false` for OpenStack.

### Global settings summary

| Global setting | OpenStack value | Purpose |
|---|---|---|
| `enable_bandwidth` | `true` | Required for any bandwidth |
| `enable_network_bandwidth` | `false` | Keep off — no network-level billing for OpenStack |
| `enable_vm_bandwidth` | `true` | Enable for VM-level billing |
| `enable_vpc_bandwidth` | `false` | Keep off — not supported on OpenStack |

### 5. Free threshold and unit pricing

* Set **Free Bandwidth Threshold (GB)** on the OpenStack Cloud Provider Setup (Provider Config), if available for your setup — monthly free allowance before billing starts (`0` = charge from the first GB). The counter resets each month.
* Configure **1 GB Bandwidth per Month** (or equivalent `per_gb_bandwidth_price`) on the account rate card / unit pricing for the region and currency when bandwidth billing is enabled.

---

## How CMP fetches OpenStack bandwidth

CMP reads **Gnocchi** metrics for each VM:

* Metric: `network.outgoing.bytes`
* Scope: VM resource ID / network interface
* Parent **Bandwidth** entity: Virtual Machine

Only **outgoing** traffic is used for billing.

---

## How bandwidth billing works

Every service comes with a **free bandwidth threshold** — a monthly data allowance. Usage within the allowance is not charged; only the overage is billed.

**Example:**

* Plan includes **5 GB** free bandwidth per month
* Customer uses **3 GB** → no extra charge
* Customer uses **8 GB** → pay for **3 GB** overage only

### What gets billed?

**Outgoing traffic** — data sent from the VM (for example, downloads served from the instance, API responses to the internet).

### How are charges calculated?

Bandwidth charges are calculated **hourly** and added to the monthly invoice:

1. **Hourly tracking** — usage is tracked every hour
2. **Threshold check** — only usage above the free threshold is charged
3. **Monthly summary** — hourly charges combine on the monthly invoice

```
Chargeable Bandwidth = Total Usage − Free Threshold
Hourly Charge        = Chargeable Bandwidth × Price per GB per Hour
Monthly Charge       = Sum of all hourly charges
```

Unit price per GB comes from the rate card:

1. Rate card lookup for the account
2. Unit pricing for region and currency
3. Extract `per_gb_bandwidth_price` (**1 GB Bandwidth per Month**)

### Billing specifics

| Rule | Detail |
|---|---|
| **Billing cycle** | Always **HOURLY** for bandwidth |
| **Threshold** | Only usage exceeding the free threshold is billed |
| **Inbound traffic** | Always free |
| **Invoice frequency** | Hourly usage invoices generated and aggregated monthly |

---

## OpenStack workflow (summary)

```
enable_bandwidth = true
enable_vm_bandwidth = true
enable_network_bandwidth = false
enable_vpc_bandwidth = false
        │
        ▼
Customer runs Virtual Machines
        │
        ▼
Gnocchi records network.outgoing.bytes (per VM)
        │
        ▼
CMP matches Bandwidth entity to VM resource ID
        │
        ▼
Apply free threshold → bill overage × unit price (hourly → monthly invoice)
```

---

## Related

* [OpenStack Features](/orchestrator-features/openstack/)
* [OpenStack Setup](/orchestrators/openstack/)
* [Billing cycles](/billing/billing-cycles/) — `BANDWIDTH` is always hourly
* [CloudStack Bandwidth](/orchestrator-features/cloudstack/bandwidth) — separate page (network / VPC level; do not mix settings)
