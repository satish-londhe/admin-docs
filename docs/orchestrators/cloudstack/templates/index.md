---
sidebar_position: 1
title: "Templates"
tags: ["cloudstack", "templates", "orchestrator"]
---

# Templates

Templates are the foundation for provisioning virtual machines through StackConsole CMP. This section explains how to prepare templates that are fully compatible with CMP and how to configure and manage them in CMP after they are registered in CloudStack.

A properly configured template ensures that password management, SSH key injection, root disk scaling, startup scripts, and other CMP features work as expected.

:::info[Before you begin]

Complete [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) through Wizard Step 4 before configuring templates in CMP. Templates must exist in CloudStack and be marked **Public** and **Featured** before they appear during CMP setup.

:::

## Pages in this section

* [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates) — CloudStack template requirements before registration
* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp) — manual configuration and per-zone template settings in CMP

## Template workflow

The overall template workflow consists of the following steps:

1. Prepare and validate the template at the CloudStack level.
2. Register the template in CloudStack with the required options (Public, Featured, password-enabled, and so on).
3. Re-configure the template manually in CMP (during Cloud Provider setup or by raising a support ticket — see below).
4. Configure the template within CMP (OS, version, password method, compute category, and related fields).
5. Make the template available for customer VM deployments in the selected zone.

:::info[No self-service Sync option]

Template inventory in CMP is **not updated automatically** when CloudStack changes. CMP does **not** provide a **Sync** button for templates. After any add, modify, or remove in CloudStack, templates must be **re-configured manually** in CMP. Raise a support ticket with StackConsole if you need template inventory or mapping updated.

:::

## Quick compatibility checklist

| Requirement | Required | Description |
|---|---|---|
| Password enabled | Yes | Required for CloudStack password management via UserData. |
| SSH enabled | Yes | Required for SSH key injection and secure access. |
| Startup script enabled | Yes | Allows UserData and initialization scripts to run at first boot. |
| Scalable root disk | Yes | Root disk size must match the customer-selected package at provisioning time. |
| Public & Featured | Yes | CloudStack templates must be **Public** and **Featured** to appear in CMP during configuration. |

See [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates) for the full validation checklist.

## Frequently asked questions

### Can I create or modify templates directly in CloudStack?

Yes. Templates can be created or modified directly in CloudStack. However, CMP is not updated automatically — templates must be **re-configured manually** in CMP after any orchestrator-side change. Raise a support ticket with StackConsole if you need help updating template inventory or mappings.

### When do I need to re-configure templates in CMP?

Whenever templates are added, modified, or removed in CloudStack. CMP does not offer a self-service **Sync** option — admins need to manually update those changes at CMP.

### Why are templates configured separately for each zone?

CMP manages templates independently for every Cloud Provider Setup and zone. Even if CloudStack shares a template across multiple zones, CMP requires a separate configuration entry for each zone.

### Why do password-enabled templates fail on L2 networks?

:::warning[L2 networks and password-enabled templates]

Apache CloudStack L2 networks do not support UserData. Password-enabled templates rely on UserData, so they **cannot** be deployed on L2 networks. Use a non-password-enabled template for L2 provisioning.

:::

## Related

* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) — Wizard Step 4 covers initial template registration
* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync) — sync compute and disk offerings alongside templates
