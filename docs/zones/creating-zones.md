---
sidebar_position: 2
title: "Creating & Configuring Zones"
tags: ["zones"]
---

# Creating & Configuring Zones

## Steps

1. Log in to the **CMP Admin Panel**
2. Navigate to **Settings → Orchestrator → Zones**
3. Click **Add Zone**
4. Fill in the required fields:

| Field | Description |
| --- | --- |
| **Associated Cloud Provider** | The orchestrator type (e.g. CloudStack, OpenStack) |
| **Associated Cloud Provider Setup** | The specific Cloud Provider configuration instance |
| **Zone Name** | Must match the zone name exactly as it appears in the orchestrator |
| **Country** | The geographic country for this zone |
| Other fields | As applicable to your configuration |

5. Click **Save**

The zone is now active in CMP and available for package assignment and customer provisioning.

## Important notes

* The **Zone Name** must exactly match the orchestrator zone name — a mismatch will cause provisioning failures
* Each zone must be associated with one Cloud Provider Setup
* Packages and quotas are scoped per Provider + Zone combination

## Related

* [Zones Overview](https://zones-overview)
* [Coming Soon Zones](https://coming-soon-zones)