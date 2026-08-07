---
sidebar_position: 3
title: "Configuring Templates in CMP"
tags: ["cloudstack", "templates", "orchestrator", "configuration"]
---

# Configuring Templates in CMP

After a template has been created and validated at the orchestrator level, it must be **re-configured manually** in StackConsole CMP before it becomes available for customer VM provisioning.

This page explains how to add and update templates in CMP, configure template properties, and understand the purpose of each configuration option.

:::info[Before you begin]

Ensure the following before configuring a template in CMP:

* The template has been created and validated at the orchestrator level
* The template meets all [CMP compatibility requirements](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
* For CloudStack, the template is marked **Public** and **Featured**
* The appropriate **Cloud Provider Setup** and **zone** are already configured in CMP

:::

## Template re-configuration

Template inventory in CMP is **not updated automatically** when the orchestrator changes. CMP does **not** provide a self-service **Sync** option for templates.

Any template created, modified, or removed at the orchestrator level must be **re-configured manually** in CMP. 

:::warning[Orchestrator changes are not reflected automatically]

Changes made directly in CloudStack (or other orchestrators) are **not** automatically reflected in CMP. After creating, updating, or deleting templates at the orchestrator level, an administrator must **re-configure templates manually** in CMP under **Settings → Orchestrator → Templates**.

:::

### Initial setup (Wizard Step 4)

During first-time Cloud Provider setup, configure templates in **Wizard Step 4 — Template**. See [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting).

## Creating or editing a template

After templates are available for configuration in CMP:

1. Log in to the **CMP Admin Panel**
2. Navigate to **Settings → Orchestrator → Cloud Provider Setup** (or **Settings → Orchestrator → Templates**)
3. Select the correct **Cloud Provider Setup** and **zone**
4. Open the template to create or edit
5. Configure the fields described below
6. Set **Status** to **Active** and click **Save**

![Screenshot: CMP — Create or edit template form](/img/screenshots/create_templates_cmp.png)

## Cloud Provider, Cloud Provider Setup, and Zone

These three fields define **where** the template is available in CMP:

* **Cloud Provider** — the orchestrator type (CloudStack, OpenStack, and so on)
* **Cloud Provider Setup** — the specific configured instance of that orchestrator
* **Zone** — the deployment zone within that setup

Templates are configured **independently per zone**. Even if CloudStack shares a template across zones, create a separate CMP template entry for each zone where customers should provision VMs.

## Compute category (optional)

Select one or more **Compute Categories** that best represent this template's resource profile.

Compute Categories group templates and packages for filtering and presentation within CMP. They help organize templates and offer **filtered plans** to customers. This setting has **no direct dependency** on the orchestrator.

* Configuring Compute Categories is **optional**
* Once a category is used for any package or template, apply it **consistently** across all related templates and packages in the same zone

:::info

Compute Categories are primarily used for organization and filtering in the customer portal. See [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) for how compute categories relate to package mapping.

:::

## Template type and image type

### Template Type

Select the provisioning workflow CMP uses during VM creation.

| Value | Description |
|---|---|
| **Operating System/Template** | Standard VM template used for virtual machine provisioning |
| **ISO** | ISO image used for ISO-based deployment workflows |

### Image Type

Required classification of the image:

| Value | Description |
|---|---|
| **Operating System** | Standard OS template for VM provisioning |
| **Market Place App** | Template linked to a [Marketplace App](/platform-features/marketplace-apps/) and version — use with **Select Market Place App** / **Version** and a startup script |

Set according to how the template should be categorized in CMP. For Marketplace Apps, see [Link templates](/platform-features/marketplace-apps/configure-in-cmp#4-link-templates).

## Template offering

Select the **Cloud Provider template offering (ID)** associated with this CMP template. The dropdown lists orchestrator templates available for the selected Cloud Provider Setup and zone.

Example offering value: `Debian-11-0d0a5bf3-eb33-42d0-87be-e073d602f9f8`

### CloudStack

For CloudStack integrations, only templates marked **Public** and **Featured** appear in the offering list.

:::warning[CloudStack template changes]

When a template is recreated or modified in CloudStack, the underlying offering ID may change. After orchestrator-side changes, verify the correct offering is still mapped in CMP.

:::

## Name, operating system, and version

### Name

Internal name used by administrators — for example, `Debian-11`. End customers see **Select OS** and **Select OS Version**, not this field.

### Select OS

Choose the operating system family. Add missing entries from **Settings → Operating System** before continuing.

### Select OS Version

Version displayed to customers during VM provisioning. Use clear labels customers will recognize.

## Other configuration

The **User Config** section controls how CMP provisions login access for VMs created from this template.

### How Password will be set?

| Method | Supported platforms |
|---|---|
| **Using Template** | CloudStack, OpenStack |
| **Using Startup Script** | VMware, Proxmox, OpenStack (Linux) |

For CloudStack, select **Using Template**. Templates must be **Password Enabled** in CloudStack. CMP does not send a password in the `deployVirtualMachine` request — CloudStack generates it and CMP stores the result on the VM record.

See [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates) for CloudStack-side requirements.

### Is the Template Password Enabled?

Controls whether password-related fields appear on the VM provisioning form and whether CMP manages passwords for this template.

### Does the Template have the ability to reset the password?

Enable when password reset via orchestrator API should be available on the VM details page after deployment — even if the template is not password-enabled in the CloudStack sense.

### Does the template support setting an SSH Key using a startup script?

Enable when the template supports SSH public key injection during provisioning via startup script or orchestrator-native mechanisms.

### Default username

As a CloudStack admin, set the correct default login username when you configure templates in CMP. This value is **informational only** — CMP shows it to end customers on the VM details page so they know which account to use. **CMP does not create, modify, or validate users at the template level**; the actual login user must exist inside the VM image and be configured in CloudStack as part of your template preparation.

**Recommended defaults** — match the username baked into the OS image:

| Operating system | Typical default username |
|---|---|
| Ubuntu | `ubuntu` |
| CentOS / Rocky / AlmaLinux | `centos` or `cloud-user` (match your image) |
| Debian | `debian` |
| Windows | `Administrator` |

Set the username once at the **operating system level** in CMP (**Settings → Operating System**) for all templates of that OS — for example, `ubuntu` for every Ubuntu template. Most deployments only need this OS-level setting.

Use the template-level **Default username** field only when a **specific** template uses a different login user than the OS default — for example, one custom Ubuntu image that logs in as `appuser` instead of `ubuntu`.

**How CMP resolves the displayed username:**

1. If **Default username** is set on the template → CMP shows that value.
2. If the template field is empty → CMP uses the username from the linked **Operating System** entry.

:::info[Admin responsibility]

Ensure the username shown in CMP matches the user that actually exists in the VM. Wrong values confuse customers at login time; fixing them requires updating the OS-level or template-level setting in CMP — not a CloudStack API action by CMP.

:::

### Default SSH port

If SSH listens on a non-standard port in this template, enter it here — for example, `22`. The port is shown to end customers on the VM details page. If left empty, no SSH port information is displayed.

### Read-Only Username for VM Creation

| Value | Behavior |
|---|---|
| **No** (default) | Customers can set or change the username during VM creation |
| **Yes** | Username is fixed — customers cannot enter a custom username at provisioning time |

### Read-Only Username for VM Reset

| Value | Behavior |
|---|---|
| **No** (default) | Username can be changed during password reset on the VM overview page |
| **Yes** | Username is locked during password reset operations |

### Zabbix Agent (deprecated)

The **Zabbix Agent** field is **deprecated**. Leave at default or skip — do not configure for new templates.

### Documentation Label and URL

These fields provide custom documentation links for end users on the VM details page.

| Field | Description |
|---|---|
| **Documentation Label** | Display name shown to the end user |
| **Documentation URL** | Link to operating system docs, application setup guides, or post-deployment instructions |

## Minimum resource requirements

When you define [VM packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine) and [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes) packages in CMP, offerings can start at small sizes — for example, 1–2 vCPU, small RAM, or a **10 GB** root disk. Some templates need more resources to run reliably (larger OS images, Windows, database templates, Marketplace apps, and so on).

Use the minimum resource fields on the template to tell CMP which packages are valid for that template. During VM provisioning, CMP compares each available package against these minimums and **shows only packages that meet or exceed them**.

img/screenshots/cmp-template-minimum-resources.png

![Screenshot: CMP — Template Minimum CPU, Memory, and Storage fields](/img/screenshots/cmp-template-minimum-resources.png)

| Field | Description | Example |
|---|---|---|
| **Minimum CPU (in Cores)** | Lowest vCPU count required to provision this template | `4` for a database or application template |
| **Minimum Memory (In MB)** | Lowest RAM required to provision this template | `8192` for 8 GB minimum |
| **Minimum Storage (In GB)** | Lowest **root disk** size CMP will offer for this template | Set to at least the template’s CloudStack virtual size (for example `13` if the template is ~12.24 GB) |

Leave a field empty or at zero if the template has no minimum for that resource — CMP will not filter packages on that dimension.

### Why Minimum Storage matters (CloudStack)

CloudStack requires the provisioned **root disk size** to be **greater than or equal to the template size**. If a customer (or CloudStack UI) picks a smaller root disk — for example **10 GB** when the template is **12.24 GB** — deploy fails with:

```text
Unsupported: rootdisksize override (10 GB) is smaller than template size (12.24 GB)
```

See [Configure a scalable root disk](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates#configure-a-scalable-root-disk) for the CloudStack-side rule and package checklist.

**How admins avoid this in CMP:**

1. Note the template’s size in CloudStack (virtual size of the registered template).
2. Ensure root-disk / volume packages for that zone are **≥** that size (create packages larger than the template by default).
3. On the CMP template form, set **Minimum Storage (In GB)** to that floor (round up if needed). CMP then **filters out** smaller storage packages when customers provision VMs from this template.

:::tip[Per-template exceptions]

If one specific template is larger than your usual OS images (for example a Windows or preloaded app image), set a higher **Minimum Storage** on **that** template only. Other templates can keep a lower floor. Customers never see undersized packages for the large template.

:::

:::tip[Package filtering behavior]

If **Minimum CPU** is set to `4`, a customer selecting this template will see packages with 4 or more vCPUs only — packages with 2 vCPU are hidden. The same logic applies to memory and storage when those minimums are configured.

:::

This prevents customers from provisioning VMs that cannot satisfy the template’s resource requirements and reduces failed deployments due to undersized packages or CloudStack root-disk validation errors.

## Startup script (CloudStack only)

The **Start-up Script** field allows administrators to associate a startup script with the template. Click **Placeholder** in the editor to insert supported variables into the script.

This feature is primarily used for **Marketplace applications** and advanced guest initialization scenarios. For Marketplace Apps, combine the script with [environment variables](/platform-features/marketplace-apps/environment-variables), configure the [application credentials email](/platform-features/marketplace-apps/application-credentials), and respect [startup script size limits](/platform-features/marketplace-apps/startup-script-limits).

:::warning[Marketplace applications]

Marketplace apps require startup script support on the template. See [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates#enable-startup-script-support) and [Marketplace Apps](/platform-features/marketplace-apps/).

:::

## Default firewall allowed ports (CloudStack only)

CMP can automatically create default firewall rules immediately after VM provisioning using orchestrator APIs. Rules are created at the **public IP address firewall** level.

Configure ports in the **Default Firewall Allowed Ports** section:

| Protocol | How to add |
|---|---|
| **TCP** | Enter port number and click **+ Add** — repeat for each TCP port |
| **UDP** | Enter port number and click **+ Add** — repeat for each UDP port |

If no ports are configured, CMP creates default rules for:

* TCP **22** (SSH)
* TCP **3389** (RDP)
* **ICMP**

The global setting `enable_default_firewall_ports` can be set to `false` to disable this default behavior.

:::info[Default egress rules]

The Cloud Provider Setup includes an option to automatically create **default egress rules**. When enabled, CMP creates an **Allow All** outbound rule during VM provisioning. Disable this option if you do not want default egress rules created automatically.

:::

## Status

Use **Status** to control whether the template is available for customer provisioning.

| Status | Behavior |
|---|---|
| **Active** | Template is available in customer VM creation workflows |
| **Inactive** | Template remains configured in CMP but is hidden from customer provisioning |

{/* TODO: add screenshot cmp-template-status-field.png */}

## Validation checklist

Before making a template available to customers, verify:

* Orchestrator-side template meets [CMP compatibility requirements](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
* Template has been re-configured in CMP for the correct **Cloud Provider**, **Cloud Provider Setup**, and **Zone**
* **Template Offering** maps to the correct CloudStack template ID
* **Operating System**, **Version**, and **Image Type** are configured correctly
* **User Config** — password method, password enabled, reset, and SSH key settings match the template
* **Default username** and **Default SSH port** are set if the template uses non-default values
* **Read-Only Username** flags match your provisioning policy
* **Minimum resource requirements** are defined if applicable — especially **Minimum Storage (In GB)** when the CloudStack template size is larger than your smallest root-disk package
* **Default firewall allowed ports** (TCP/UDP) are configured as required
* **Status** is set to **Active**

## Related

* [Marketplace Apps](/platform-features/marketplace-apps/)
* [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
* [Templates](/orchestrators/cloudstack/templates/)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Configuring Zones in CMP](/orchestrators/cloudstack/zones)
* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
