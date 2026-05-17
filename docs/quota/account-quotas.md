---
sidebar_position: 2
title: "Account-Level Quotas"
tags: ["quota"]
---

# Account-Level Quotas

Account-level quotas let admins assign **custom resource limits to individual customer accounts**, overriding the global defaults when a customer needs higher limits.

## When to use

* A customer needs more resources than the global default allows
* A premium customer has a dedicated resource allocation
* A specific customer's quota needs to be restricted below the global default

## Configuring account-level quotas

**Path:** Admin Panel → Clients → Select Customer → Quota Settings

Set per-resource limits for this specific account. These values override the [Global Resource Quotas](https://global-resource-quotas) for this customer only.

## Quota hierarchy

```
Global Quota (system default)
        │
        ├── Customer A — uses global default
        │
        ├── Customer B — Account-Level Quota set (overrides global)
        │       └── Project 1 — Project-Level Quota (optional)
        │       └── Project 2 — Project-Level Quota (optional)
        │
        └── Customer C — uses global default
```

## Key rules

* Account quota is the **hard ceiling** for a customer — project quotas within the account can never exceed the account total
* Setting an account quota to `0` blocks provisioning of that resource type entirely
* Setting to `-1` or unlimited removes the CMP-side cap for that resource (orchestrator limits still apply)

## End-user perspective

From the customer's side:

* They see their account quota in the portal
* When they reach the limit, they can submit a **Quota Request** to the admin
* The admin reviews and approves or rejects from the [Quota Requests & Approvals](https://quota-requests-approvals) section

## Related

* [Global Resource Quotas](https://global-resource-quotas)
* [Project-Level Quotas](https://project-level-quotas)
* [Quota Requests & Approvals](https://quota-requests-approvals)
* [Orchestrator-Side Quota Sync](https://orchestrator-side-quota-sync)