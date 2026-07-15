---
sidebar_position: 3
title: "CloudStack"
tags: ["faq", "cloudstack", "vm", "networking", "isolated", "packages"]
---

# CloudStack Q&A

Questions tied to **Apache CloudStack** behaviour and how CMP uses ACS APIs. Feature guides: [CloudStack features](/orchestrator-features/cloudstack/), [Networks](/orchestrator-features/cloudstack/networks/).

## Can clients set their own password on instance create or password reset?

**No** — not through a native CloudStack parameter that CMP can pass.

CloudStack does **not** support end-user-chosen passwords for:

* VM **deploy**  
* **Reset password**  

Standard ACS workflow:

1. CloudStack **generates** a random password  
2. Password is **injected** into the guest (password-enabled template + User Data / VR services)  
3. Generated password is returned via API and shown in CMP  

CMP therefore displays the **auto-generated** password from CloudStack. There is no supported ACS API field to supply a custom password at deploy or reset time.

Ensure templates are password-enabled and network offerings include **User Data** — see [Virtual Router/VPC — User Data](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#user-data--required-for-templates-marketplace-and-startup-scripts).

## Plans are in the admin panel but missing on Create Instance. Why?

Check all of the following:

1. **Package status** — must be **Active**  
2. **Zone and OS family** — Create Instance filters by selected zone and OS; Windows/Linux-restricted packages only appear for the matching family  
3. **Plan categories** — if plan categories are enabled, **every** visible package must have a plan category; packages without one are hidden  
4. **Compute categories** — if compute categories are configured, packages must be assigned; unassigned packages stay hidden  

See [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine).

## We changed the rate card offering (40 GB → 60 GB disk, same price). Do existing VMs upgrade?

**No.** Updating the rate card package / offering only affects **new** orders.

Existing VMs keep the offering they were provisioned with. To grow disk on running VMs, use the **VM upgrade** (or resize) flow per instance so ACS and CMP update the associated offering and disk.

## Why is no IP listed under Isolated Network → IP Addresses?

Expected when the VM only has a **private** IP and CMP is reusing **Source NAT**.

* The first public IP of an isolated network is the **Source NAT** IP  
* CMP reuses it with **port forwarding** for the first public-access VM  
* That SNAT IP is **not** listed as a separately acquired IP under **IP Addresses** in that empty/private-only case  

When the customer requests public IP on create:

* If SNAT is free → reuse SNAT + port forwarding  
* If SNAT is already tied to a VM → acquire a **new** public IP  

Details: [Isolated Network — Source NAT reuse](/orchestrator-features/cloudstack/networks/isolated-network#source-nat-ip-reuse--cmp-workflow).

## How to change the region (zone) name?

Same as other orchestrators in CMP: **Settings → Orchestrator → Zones**. See [All orchestrators — region name](/faq/orchestrators/all-orchestrators#how-to-change-the-region-name).
