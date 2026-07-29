---
sidebar_position: 1
title: "Marketplace Apps"
tags: ["platform", "marketplace", "templates", "cloudstack", "userdata"]
---

# Marketplace Apps

Marketplace apps are **VM templates with pre-installed applications**. The service provider prepares the image (OS + application) so end users can deploy a ready-to-use app without installing software manually.

**Example:** A WordPress Marketplace App is a VM image where WordPress is already installed on Ubuntu or CentOS. The customer chooses the app, supplies a few settings (if required), and launches a VM.

:::info[Provider responsibility]

CMP does **not** build the application image for you. Admins must prepare and register the CloudStack (or other orchestrator) template, then configure the Marketplace App, versions, environment variables, and startup script in CMP.

:::

## How it fits together

```text
Prepared OS+app image (CloudStack template)
        ↓
CMP Apps Marketplace (app, versions, env vars)
        ↓
CMP Template (Image Type = Market Place App + startup script)
        ↓
Customer Create Instance → Marketplace Apps tab → env inputs → deploy
```

| Step | Where | Docs |
|---|---|---|
| Prepare password-enabled, UserData-capable template | CloudStack | [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates) |
| Create Marketplace App + versions + env vars | **Settings → Orchestrator → Apps Marketplace** | [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp) |
| Map template to app / version + startup script | **Settings → Orchestrator → Templates** | [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp#4-link-templates) |
| Network offerings include **User Data** | CloudStack VPC / network offerings | [Virtual Router / VPC — User Data](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#user-data--required-for-templates-marketplace-and-startup-scripts) |
| Align userdata size limits | CloudStack + CMP Global Settings | [Startup script size](/platform-features/marketplace-apps/startup-script-limits) |

## Pages in this section

* [Configure Marketplace Apps in CMP](/platform-features/marketplace-apps/configure-in-cmp) — apps, versions, environment variables, templates, customer view
* [Environment variables](/platform-features/marketplace-apps/environment-variables) — role of deployment parameters
* [Startup script size (CloudStack)](/platform-features/marketplace-apps/startup-script-limits) — `vm.userdata.max.length` and CMP limits
* [Automation limitations](/platform-features/marketplace-apps/automation-limitations) — what CMP cannot do inside the guest OS

## Related

* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp) — Image Type **Market Place App**, startup script
* [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates#enable-startup-script-support)
* [Platform Features](/platform-features/)
* [Store & Products](/platform-features/store/) — separate non-automated catalogue (not the same as Marketplace Apps)
