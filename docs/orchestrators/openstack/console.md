---
sidebar_position: 8
title: "Console Access"
tags: ["orchestrator", "openstack", "console", "novnc", "setup"]
---

# Console Access

Requirements so customers can open the **VM console** from CMP (typically noVNC via Nova).

:::note[Console Proxy URL field]

The **Console Proxy URL** field on Cloud Provider **Provider Config** (Step 2) is **deprecated and not in use**. Console setup for OpenStack does not depend on that field — see [Connecting — Console Proxy URL](/orchestrators/openstack/connecting#wizard-step-2--provider-config).

:::

:::danger[Documentation in progress]

This page is a **stub**. Document how CMP opens the OpenStack console today, HTTPS / reachability, and Horizon validation steps from [OpenStack Requirements](/installation/orchestrator-requirements/openstack#7-openstack-setup-checkpoints).

:::

## Topics to cover

* Nova console types (noVNC / SPICE)  
* How CMP obtains and opens the console URL (without the deprecated Console Proxy URL field)  
* Certificate / mixed-content issues  
* Troubleshooting checklist

## Related

* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting)
* [OpenStack Requirements](/installation/orchestrator-requirements/openstack)
* [CloudStack Console Proxy](/orchestrators/cloudstack/console-proxy) — CloudStack-only reference (different mechanism)
