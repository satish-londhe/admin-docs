---
sidebar_position: 2
title: "All orchestrators"
tags: ["faq", "all-orchestrators", "vm"]
---

# All orchestrators

Answers that apply the same way no matter which cloud is connected (**CloudStack**, **OpenStack**, **VMware**, **Proxmox**, and others).

## How can we migrate an instance from one region to another?

**Not available in CMP** as a self-service or admin migration flow today.

For specific VMs, perform migration **directly in the provider** (CloudStack / OpenStack / …) using that product’s supported tools, then reconcile CMP inventory if needed (contact StackConsole for sync guidance).

If you want this in CMP, share how migration works on your provider version so it can be assessed for the roadmap.

## How to change the region name?

In CMP, customer-facing “region” usually maps to a **Zone**.

**Path:** **Admin → Settings → Orchestrator → Zones** → edit the zone → update **name** (and **country** if needed) → save.

If no custom icon is set, CMP may show a flag from the configured country.
