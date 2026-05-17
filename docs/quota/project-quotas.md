---
sidebar_position: 3
title: "Project-Level Quotas"
tags: ["quota"]
---

# Project-Level Quotas

Project-level quotas allow **resource distribution within a customer account** across individual projects. This is useful when an account owner wants to allocate specific resource budgets to sub-users or teams.

## Default behaviour

By default, CMP sets project quota to **Unlimited** — meaning sub-users within a project can use resources up to the full account-level limit.

> ⚠️ Setting project quota to Unlimited does **not** grant unlimited resources. The [Account-Level Quotas](/quota/account-quotas) is always the hard ceiling. Project quotas only control internal distribution — they can never exceed the account total.

## How project quotas work

```
Account Quota: 20 vCPU, 100 GB RAM
        │
        ├── Project A — Quota: 8 vCPU, 40 GB RAM
        │       └── Sub-user 1 (can use up to Project A limits)
        │
        ├── Project B — Quota: 12 vCPU, 60 GB RAM
        │       └── Sub-user 2 (can use up to Project B limits)
        │
        └── (Total: 20 vCPU used — cannot exceed account quota)
```

## Configuring project quotas

**Path:** Customer Portal → Projects → Select Project → Quota Settings

Only the **Account Owner** can set project-level quota. Sub-users cannot modify project quotas.

## Sub-user access

CMP supports sub-user access where the account owner can:

* Create sub-users and assign them to specific projects
* Set project quotas to limit what each sub-user can provision
* Prevent sub-users from accessing resources in other projects

## When to use

| Scenario | Recommendation |
| --- | --- |
| Small team, no resource segregation needed | Leave project quotas as Unlimited |
| Multiple teams sharing one account | Set explicit project quotas per team |
| Controlled billing for specific projects | Set project quotas + monitor per-project usage |

## Related

* [Global Resource Quotas](/quota/global-quotas)
* [Account-Level Quotas](/quota/account-quotas)
* [Quota Requests & Approvals](/quota/quota-requests)
