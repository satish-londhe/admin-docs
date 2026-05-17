---
sidebar_position: 4
title: "Client Registration Flow"
tags: ["orchestrator", "cloudstack"]
---

# Client Registration Flow

## When does CMP register a customer on CloudStack?

CMP does **not** register a customer on CloudStack at the time of signup. Registration is deferred until all of the following are complete:

1. Customer has verified KYC
2. Payment details are confirmed (as per CMP provider setup)
3. Customer creates their **first CloudStack-provisioned service** (e.g. a VM)

At that point, CMP checks whether the user already exists on CloudStack. If not, it registers them.

## What gets created on CloudStack per customer?

For each new customer, CMP automatically creates:

```
ROOT
└── CMP-PROD (parent domain)
    └── <Customer Name> Domain
        └── <Customer> Account
            └── <Customer> User
```

This hierarchy isolates each customer's resources within their own CloudStack domain.

## Registration trigger diagram

```
Customer signs up on CMP
        ↓
KYC verified + Payment confirmed
        ↓
Customer creates first CloudStack service
        ↓
CMP checks: user on CloudStack?
   ├── YES → use existing credentials
   └── NO  → create domain > account > user → store credentials
```

## Related

* [Domain & Credential Configuration](/orchestrators/cloudstack/domain-credentials)
