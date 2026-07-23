---
sidebar_position: 1
title: "Templates"
tags: ["orchestrator", "cloudstack", "features", "templates"]
---

# Templates

Customer **My Templates** in CMP for CloudStack — create and manage account-owned templates, use them when provisioning instances, and (when enabled) bill storage via [Custom Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template).

Admin-prepared OS templates used for standard VM provisioning are configured under **Orchestrator Setup**. This section covers **customer-created templates** (My Template) after setup.

:::tip[Setup vs features]

- **Admin OS templates** — [Templates (setup)](/orchestrators/cloudstack/templates/)
- **Custom Template billing** — [Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template)
- **This section** — how customers create and use My Templates in the portal

:::

:::info[My Template service]

Customers can create My Templates only when **My Template** is enabled in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) (Wizard Step 1).

:::

---

## How customers create templates

CMP supports three ways to create a customer template:

| Method | Typical use | Documentation |
|---|---|---|
| **From existing VM (root volume)** | Golden image for [Autoscaling](/orchestrator-features/cloudstack/autoscaling/) and repeatable app deployments | [Create from VM root volume](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume) |
| **Upload from local** | Customer uploads a template file from their machine | Coming soon |
| **Upload from URL** | Customer registers a template from a remote URL | Coming soon |

Local and URL upload depend on admin settings (for example `template_upload_from_local`) — see [Template packages — customer upload](/orchestrators/cloudstack/offering-sync-and-packages/template#customer-template-upload-disabled-by-default).

---

## Templates list (customer portal)

**Customer path:** **Virtual Machines → Templates**

Templates created from VMs (and other My Template flows) appear on the global **Templates** page.

![Screenshot: CMP — Templates list with customer My Template](/img/screenshots/cmp-templates-list.png)

Typical columns include project, OS, zone, **Password Enabled**, and download status.

Once a template is ready, it also appears on **Create Instance → Choose Image → My Templates** so customers can provision new VMs from it — see [Use on Create Instance](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume#use-on-create-instance--my-templates).

---

## Billing

Customer-owned templates stored under **My Template** are billed **hourly per GB** when a [Custom Template package](/orchestrators/cloudstack/offering-sync-and-packages/template) is configured for the zone.

Admin OS templates used at VM creation are **not** charged via the Custom Template package.

---

## Related

* [Create from VM root volume](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume)
* [Autoscaling](/orchestrator-features/cloudstack/autoscaling/)
* [ISO](/orchestrator-features/cloudstack/iso)
* [Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [Templates (admin setup)](/orchestrators/cloudstack/templates/)
* [CloudStack Features](/orchestrator-features/cloudstack/)
