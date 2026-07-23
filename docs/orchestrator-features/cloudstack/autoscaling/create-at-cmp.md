---
sidebar_position: 3
title: "Create autoscaling at CMP"
tags: ["orchestrator", "cloudstack", "features", "autoscale", "cmp"]
---

# Create autoscaling at CMP

:::danger[Documentation in progress]

This page is **in progress**. Content, create-form fields, and screenshots will be expanded as CMP Autoscale documentation is completed.

:::

This page covers how **VM Autoscaling** is offered and created through CMP on CloudStack — admin prerequisites and the customer create flow at a high level.

Read [CloudStack considerations and practical use cases](/orchestrator-features/cloudstack/autoscaling/cloudstack-considerations) first so the application and golden template are ready before customers enable AutoScale.

---

## Before customers can create AutoScale

### Admin — Cloud Provider and packages

1. Enable **VM Autoscale** (and **Load Balancer** if LB is required) in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) Wizard Step 1
2. Create an **Active** [VM Autoscale package](/orchestrators/cloudstack/offering-sync-and-packages/vm-autoscale) for the zone (engine fee optional — can be `0`)
3. Ensure [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine), [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer), and [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address) packages exist for resources the group will use
4. Ensure [My Template](/orchestrator-features/cloudstack/templates/) is available so customers can register a golden image — typically [create from VM root volume](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume) (VM must be powered off)

### CloudStack / network readiness

* Network or VPC offerings support **Load Balancer** (and AutoScale where your CloudStack version requires it on the offering)
* Quota allows **VM Autoscale** (and related VM / LB / IP limits) — see [Global quotas](/quota/global-quotas)

:::warning[VPC public IP for load balancer]

On VPC, do **not** use the **Source NAT** IP for load balancer rules. Customers need a separately acquired public IP. See [Load Balancer — VPC Source NAT](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer#vpc-source-nat-ip-and-load-balancing).

:::

---

## Recommended customer sequence

```text
1. Build & test horizontally scalable app on multiple VMs
2. Create golden VM → register Template (My Template)
3. Create / select Load Balancer (eligible public IP)
4. Create AutoScale in CMP (profile, policies, min/max, template)
5. Scale-up / scale-down runs from CloudStack; CMP bills VMs (+ optional engine fee)
```

### 1. Prepare the application and golden template

Follow [CloudStack considerations](/orchestrator-features/cloudstack/autoscaling/cloudstack-considerations): shared DB/cache, auto-start, no VM-local-only session state.

Then create a template from the golden VM — power off the VM and use [Create from VM root volume](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume). When the template is ready, it appears under **Create Instance → My Templates** and can be selected for the AutoScale VM profile.

### 2. Create a load balancer

Customers create a load balancer from the CMP **Load Balancer** service and select a public IP that CloudStack accepts for LB rules.

### 3. Create AutoScale at CMP

**Customer path:** typically **Create → Autoscale** / **VM Autoscale** (label may vary by portal theme)

In CMP, creating AutoScale maps to the CloudStack AutoScale model:

| CMP / CloudStack concept | Purpose |
|---|---|
| **VM profile** | Service offering + **template** used when launching scaled VMs |
| **Scale-up / scale-down policies** | Conditions and thresholds (for example CPU above X% for Y duration) |
| **VM group** | Min / max members, polling interval, link to **load balancer rule** and profile |

When scale-up fires, CloudStack launches VMs from the template and adds them to the LB. When scale-down fires, excess VMs are removed (subject to min members and grace / expunge behaviour in CloudStack).

:::info[Form fields and screenshots]

Exact CMP Create Autoscale form fields and screenshots can be expanded here when provided. Until then, use the packages and considerations pages above, and validate against your CMP version UI.

:::

### 4. Billing after create

| Resource | Billing source |
|---|---|
| Auto Scaling engine (optional) | [VM Autoscale package](/orchestrators/cloudstack/offering-sync-and-packages/vm-autoscale) |
| Running / scaled VMs | [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine) |
| Load balancer | [Load Balancer packages](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer) |
| Public IPs | [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address) |

---

## Validation checklist

Before go-live with AutoScale for a customer:

* [ ] App tested with **≥ 2** VMs behind LB
* [ ] Golden **template** boots and serves traffic unattended
* [ ] LB uses an **eligible** public IP (not VPC Source NAT)
* [ ] VM Autoscale package is **Active** for the zone
* [ ] Scale-up / scale-down policies and min/max members are intentional
* [ ] Quotas allow expected peak VM count

---

## Related

* [CloudStack considerations and practical use cases](/orchestrator-features/cloudstack/autoscaling/cloudstack-considerations)
* [Autoscaling](/orchestrator-features/cloudstack/autoscaling/)
* [Create from VM root volume](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume)
* [VM Autoscale packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-autoscale)
* [Load Balancer packages](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
