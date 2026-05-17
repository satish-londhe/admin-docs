---
sidebar_position: 1
title: "Zones Overview"
tags: ["zones"]
---

# Zones Overview

Zone synchronization between CMP and the cloud orchestrator is **not automatic**. Zones created in CloudStack (or any other orchestrator) must be manually configured in CMP.

## Key points

* Zones created in the orchestrator are **not auto-synced** to CMP
* Manual configuration is required under **Settings → Orchestrator → Zones**
* Zone mapping is **mandatory** for active use
* Zones can be marked as **"Coming Soon"** for pre-launch visibility without backend readiness

## Zone mapping flow

```
Create zone in orchestrator (e.g. CloudStack)
              ↓
Log in to CMP Admin Panel
              ↓
Settings → Orchestrator → Zones → Add Zone
              ↓
Associate Cloud Provider + Zone Name + Country
              ↓
Zone is live and available to customers
```

## Related pages

* [Creating & Configuring Zones](/zones/creating-zones)
* [Coming Soon Zones](/zones/coming-soon)
