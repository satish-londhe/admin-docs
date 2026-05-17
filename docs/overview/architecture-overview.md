---
sidebar_position: 3
title: "Architecture Overview"
tags: ["overview"]
---

# Architecture Overview

CMP is a layered platform that sits between your cloud infrastructure and your customers.

## Component layers

```
┌─────────────────────────────────────────┐
│         Customer Portal (Frontend)       │
├─────────────────────────────────────────┤
│         CMP API (Backend)               │
├──────────────┬──────────────────────────┤
│  Billing &   │   Orchestrator Adapters  │
│  Invoicing   │  (ACS / OS / VMware ...) │
├──────────────┴──────────────────────────┤
│     Cloud Infrastructure (Zones)        │
│  CloudStack | OpenStack | VMware | ...  │
└─────────────────────────────────────────┘
```

## Key components

* **Frontend** — White-label customer portal. Supports theme customization, branding, and SSO.
* **CMP API** — Core backend. Manages users, billing, quotas, packages, and communicates with orchestrators.
* **Orchestrator Adapters** — Per-orchestrator modules that translate CMP actions into native API calls (CloudStack API, OpenStack API, etc.).
* **Billing Engine** — Handles hourly metering, invoice generation, wallet management, and disciplinary actions.
* **Keycloak (optional)** — External identity provider for SSO, social login, and 2FA.

## Data flow: VM provisioning example

1. Customer selects a package and zone in the portal
2. CMP checks quota at account/project level
3. CMP calls the orchestrator adapter for the selected zone
4. Orchestrator (e.g. CloudStack) provisions the VM
5. CMP stores the VM record and starts billing subscription
6. Customer sees the VM live in the portal