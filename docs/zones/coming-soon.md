---
sidebar_position: 3
title: "Coming Soon Zones"
tags: ["zones"]
---

# Coming Soon Zones

The "Coming Soon" option lets you publish a zone to customers before it is operationally ready for provisioning.

## How to enable

When adding or editing a zone, check the **"Is Coming Soon"** option.

## Behaviour when enabled

| Behaviour | Detail |
| --- | --- |
| Visible to end users | ✅ Yes — customers can see the zone listed |
| Available for selection | ❌ No — the zone is disabled for provisioning |
| Cloud Provider mapping required | ❌ No — backend mapping is not required |
| Zone fields | Can remain nullable |

## Use cases

* Announcing upcoming datacenter regions to customers
* Showing planned expansion locations for marketing purposes
* Pre-launch visibility without backend readiness

## Disabling "Coming Soon"

When the zone is operationally ready:

1. Edit the zone in **Settings → Orchestrator → Zones**
2. Uncheck **"Is Coming Soon"**
3. Fill in the **Associated Cloud Provider Setup** and complete the zone mapping
4. Save — the zone is now active and available for provisioning