---
sidebar_position: 9
title: "Bandwidth"
tags: ["orchestrator", "cloudstack", "features", "bandwidth", "billing"]
---

# Bandwidth

CMP bills **outgoing network bandwidth** as a usage-based service. On **CloudStack**, usage is collected at the **network** level (Isolated networks and, optionally, VPC) — not per VM.

:::important[Orchestrator support]

Bandwidth billing only works for **CloudStack** and **OpenStack**. Other orchestrators are not supported for bandwidth billing.

:::

:::important[Only outgoing traffic is billed]

CMP bills **outgoing** traffic only (bytes sent / egress). **Inbound** traffic is always free.

:::

---

## CloudStack limitations (read first)

Highlight these CloudStack constraints before enabling bandwidth:

| Limitation | Detail |
|---|---|
| **Network-level only** | CloudStack reports bandwidth for **Isolated networks** and (when available) **VPC** — not per VM |
| **No VM-level usage** | CloudStack Usage returns **0** for VM bandwidth; keep `enable_vm_bandwidth = false` |
| **No per-instance tracking** | Apache CloudStack tracks bytes sent/received for the **account/network**, not per instance |
| **Outgoing only billed** | Usage type **4** (`NETWORK_BYTES_SENT`) is billed; type **5** (`NETWORK_BYTES_RECEIVED`) is not charged |
| **VPC depends on Usage Server** | Set `enable_vpc_bandwidth = true` **only** if CloudStack returns usage records with `vpcid` |
| **API only — not the usage DB** | CMP calls `listUsageRecords`; it does **not** read `cloudstack-usage` DB or `cloud.usage_event` directly |
| **Always hourly billing** | Bandwidth billing cycle is always **HOURLY**; charges aggregate on the monthly invoice |

:::warning[Do not enable VM-level bandwidth on CloudStack]

Leave **`enable_vm_bandwidth = false`**. Enabling it creates bandwidth records and invoices with **zero** usage because CloudStack does not report VM bandwidth.

:::

---

## Enabling bandwidth for CloudStack

### 1. Cloud Provider Setup

1. Enable the **Bandwidth** service in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) (Wizard Step 1)
2. Set **Free Bandwidth Threshold (GB)** in Provider Config — monthly free allowance before billing starts (`0` = charge from the first GB). The counter resets each month.

### 2. CMP global settings

| Global setting | CloudStack value | Purpose |
|---|---|---|
| `enable_bandwidth` | `true` | Required for any bandwidth records or billing |
| `enable_network_bandwidth` | `true` | Isolated networks (recommended) — usage matched by `networkid` |
| `enable_vpc_bandwidth` | `true` or `false` | Enable **only** if CloudStack returns VPC usage with `vpcid` |
| `enable_vm_bandwidth` | `false` | Keep off — no VM usage on CloudStack |

**Enable the global master switch**

Set `enable_bandwidth = true`. Without this, no bandwidth records or billing are created for any service type.

**Enable network-level bandwidth (Isolated networks)**

Set `enable_network_bandwidth = true`. This creates bandwidth records and usage-based billing when users create Isolated networks (non-VPC). Usage is pulled from CloudStack `listUsageRecords` by `networkid`. Recommended for all CloudStack regions where you want network bandwidth billing.

**Enable VPC-level bandwidth**

Set `enable_vpc_bandwidth = true` only if your CloudStack Usage Server returns usage records with `vpcid`. This creates bandwidth for VPCs and matches usage by `vpcid`. If your CloudStack only exposes network-level usage, leave this `false` to avoid creating VPC bandwidth records that never get real usage.

**Do not enable VM-level bandwidth**

Leave `enable_vm_bandwidth = false` for CloudStack.

### 3. Unit pricing

Set **1 GB Bandwidth per Month** on [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing#bandwidth-conditional) for each zone / storage category (column appears when bandwidth billing is enabled). CMP uses `per_gb_bandwidth_price` from the account’s rate card unit pricing for the region and currency.

---

## How CMP fetches CloudStack bandwidth

CMP does **not** read the `cloudstack-usage` database or `cloud.usage_event` directly. It calls the CloudStack management API:

**API:** [`listUsageRecords`](https://docs.cloudstack.apache.org/en/4.22.0.0/adminguide/usage.html)

### CloudStack usage types

From Apache CloudStack network billing types (`UsageTypes`):

| Type ID | Constant | Meaning | Billed in CMP? |
|---|---|---|---|
| **4** | `NETWORK_BYTES_SENT` | Bytes sent (egress / outgoing) | **Yes — billed only** |
| **5** | `NETWORK_BYTES_RECEIVED` | Bytes received (ingress / incoming) | No — inbound is free |

CloudStack tracks total bytes sent/received for the account’s network context. It does **not** currently track network traffic per instance.

**Parent service for the Bandwidth entity on CloudStack:** Isolated Network or VPC (matched by `networkid` / `vpcid`).

---

## How bandwidth billing works

Every service comes with a **free bandwidth threshold** — a monthly data allowance. Usage within the allowance is not charged; only the overage is billed.

Admins set the free limit at **Cloud Provider Setup → Provider Config → Free Bandwidth Threshold (GB)**.

**Example:**

* Plan includes **5 GB** free bandwidth per month
* Customer uses **3 GB** → no extra charge
* Customer uses **8 GB** → pay for **3 GB** overage only

### What gets billed?

**Outgoing traffic** — data sent from your services (for example, downloads from customer VMs, API responses to the internet).

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
3. Extract `per_gb_bandwidth_price` (**1 GB Bandwidth per Month** on the Unit Pricing form)

### Billing specifics

| Rule | Detail |
|---|---|
| **Billing cycle** | Always **HOURLY** for bandwidth |
| **Threshold** | Only usage exceeding the free threshold is billed |
| **Inbound traffic** | Always free |
| **Invoice frequency** | Hourly usage invoices generated and aggregated monthly |

End users can view network bandwidth details on the Isolated Network / VPC (or related bandwidth) views in the customer portal when bandwidth is enabled.

---

## CloudStack workflow (summary)

```
Enable Bandwidth service + global flags
        │
        ▼
Customer creates Isolated Network (and/or VPC if enabled)
        │
        ▼
CloudStack Usage Server records NETWORK_BYTES_SENT (type 4)
        │
        ▼
CMP calls listUsageRecords (match networkid / vpcid)
        │
        ▼
Apply free threshold → bill overage × unit price (hourly → monthly invoice)
```

Official reference: [CloudStack Usage](https://docs.cloudstack.apache.org/en/4.22.0.0/adminguide/usage.html).

---

## Related

* [Unit Pricing — Bandwidth](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing#bandwidth-conditional)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) — Bandwidth service, Free Bandwidth Threshold
* [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network)
* [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network)
* [Billing cycles](/billing/billing-cycles/) — `BANDWIDTH` is always hourly
* [CloudStack Features](/orchestrator-features/cloudstack/)
* [OpenStack Bandwidth](/orchestrator-features/openstack/bandwidth) — separate OpenStack page (VM-level / Gnocchi)
