---
sidebar_position: 3
title: "Sync Resources (Import VM)"
tags: ["orchestrator", "cloudstack", "features", "import", "sync", "vm"]
---

# Sync Resources — Import Existing Virtual Machines (CloudStack)

The **Import Virtual Machine** feature lets administrators onboard existing virtual machines from Apache CloudStack into Stack Console (CMP).

Use it to:

* Manage existing CloudStack resources from CMP
* Enable billing and visibility for VMs created outside CMP
* Synchronize infrastructure that bypassed CMP provisioning

CMP retrieves VM data from CloudStack and creates corresponding resources such as compute, storage, networks, and snapshots.

:::danger[Documentation in progress]

This page is **in progress**. Import / sync has many additional edge cases (multi-orchestrator behaviour, advanced mapping, post-import controls, and screenshots). Treat this as the current CloudStack baseline; more detail will be added as documentation is completed.

:::

---

## Use cases

| Scenario | What to do |
|---|---|
| Customers already have VMs on CloudStack and you want to manage them from CMP | Create the CMP customer first, map/sync the account, then **Import VM** |
| Resources were created directly on CloudStack for a customer already in CMP | Sync the account (if needed), then import the VMs and associated services |

:::important[Customers are not auto-created]

Import does **not** automatically create a customer in CMP.

1. Create the corresponding **customer account** in CMP
2. Sync / map that CMP account with the orchestrator customer account
3. Then import VMs and associated services

:::

---

## Restrictions (general)

* Only the **VM** and its **associated services** can be synced (for example block storage, networks, snapshots)
* Once the CMP account is synced with the orchestrator-level customer account, that mapping **cannot be changed** later

---

## CloudStack prerequisites

Certain predefined or hierarchical configurations must be in place before CloudStack customer import.

### Domain access

CMP can access **only** the CloudStack **domain** linked to the Cloud Provider Setup (the CMP parent / DomainAdmin domain).

* CMP can sync customer resources **only** from that associated domain
* Resources **outside** this domain are **not visible** and **cannot** be imported

It is the administrator’s responsibility to migrate CloudStack customers who must be imported into CMP into that specific domain.

:::warning[Required CloudStack hierarchy — critical]

Import and account sync **only work** when CloudStack follows this exact structure. Wrong hierarchy is a common cause of failed imports and broken mapping.

```text
CMP-linked parent domain
  └── Customer domain (one per customer)
        └── One account
              └── One user
```

| Level | Requirement |
|---|---|
| **Customer** | Separate **domain** per customer |
| **Under that domain** | Exactly **one account** |
| **Under that account** | Exactly **one user** |

Do **not** put multiple customer accounts under one domain, or multiple users under one account, for customers you plan to sync into CMP. Fix the hierarchy in CloudStack before mapping accounts or importing VMs.

:::

### Project mapping

CMP has project-mapping options with CloudStack (**Project Setting** in Provider Config — for example **Under Project**). See [Connecting CMP to CloudStack — Provider Config](/orchestrators/cloudstack/connecting#wizard-step-2--provider-config).

If mapping is set to **Under Project**:

* The CMP project and the CloudStack project must be correctly mapped
* Import fails if mapping is incorrect or missing

---

## Limitations / restrictions (CloudStack)

### Scope of synchronization

Only the VM and associated services are synced:

* Block storage
* Networks
* Snapshots

External or unsupported configurations are not managed by CMP.

### Account mapping

* The CMP account must be mapped with the CloudStack account before import
* Mapping is **mandatory**
* Once mapped, it **cannot** be changed

### Domain restriction

CMP fetches only accounts, users, and VMs **within the configured domain**. Outside that domain: not visible, not importable.

### Domain hierarchy

Must follow the **Required CloudStack hierarchy** warning above: separate customer domain → one account → one user.

### Project mapping

If **Project Mapping = Under Project**, CloudStack project ↔ CMP project mapping is required or import fails.

---

## FAQ

### I already have customers and VMs on CloudStack. Will import create the customer in CMP?

**No.** Import does not create the customer.

1. Create the customer account in CMP
2. Sync / map it with the CloudStack customer account
3. Import VMs and associated services

---

## Summary

CloudStack Import VM onboards existing infrastructure into CMP for management and billing. It requires:

* Correct **domain hierarchy** and domain membership
* Correct **account** (and **project**, when Under Project) mapping
* **Template** assignment when CloudStack cannot resolve one

Once imported, resources become visible and billable in CMP. Some provisioning-level controls may remain more limited than for VMs created directly in CMP — more detail will be documented as this page expands.

---

## Related

* [CloudStack Features](/orchestrator-features/cloudstack/)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Client registration](/orchestrators/cloudstack/client-registration)
* [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)
* [Templates (admin setup)](/orchestrators/cloudstack/templates/)
