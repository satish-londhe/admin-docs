---
sidebar_position: 9
title: "Quota Management"
tags: ["orchestrator", "openstack", "quota", "setup"]
---

# Quota Management (OpenStack)

CMP customer projects map **one-to-one** to OpenStack projects. Quota can be enforced in CMP only, or **synced** so OpenStack project limits follow CMP.

## Sync vs CMP-only

Configured in Cloud Provider **Step 2 — Provider Config** as **Open Stack Sync Default Quota** (recommended: **Yes**).

| Mode | OpenStack project quota | When to use |
|---|---|---|
| **Sync (Yes)** | Updated when CMP quota is set or changed | **Recommended** — keeps OpenStack aligned with CMP |
| **CMP-only (No)** | Often left unlimited / not driven by CMP sync | Enforce limits only in CMP |

Details: [Connecting — Wizard Step 2 Provider Config](/orchestrators/openstack/connecting#wizard-step-2--provider-config) (**Open Stack Sync Default Quota**).

Also see platform [Quota Management](/quota/global-quotas).

:::danger[Documentation in progress]

Per-service quota fields (compute, network, volume, floating IP), default values, and raise-limit procedures will be expanded here.

:::

## Related

* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting)
* [Projects & Credentials](/orchestrators/openstack/projects-and-credentials)
* [Quota Management](/quota/global-quotas)
* [CloudStack Quota Management](/orchestrators/cloudstack/quota-management) — reference
