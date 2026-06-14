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

Changes made directly in CloudStack (or other orchestrators) are **not** automatically reflected in CMP. After creating, updating, or deleting templates at the orchestrator level admin must need to sync them manually with CMP.

:::

### Initial setup (Wizard Step 4)

During first-time Cloud Provider setup, configure templates in **Wizard Step 4 — Template**. See [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting).


## Zone-specific template configuration

Templates are configured **independently** for each Cloud Provider Setup and zone.

Even if the underlying cloud platform supports sharing templates across multiple zones, CMP requires a **separate template configuration for every zone**. This allows administrators to control template availability and settings independently for each deployment location.

## Creating or editing a template

After templates are available for configuration in CMP:

1. Log in to the **CMP Admin Panel**
2. Navigate to **Settings → Orchestrator → Cloud Provider Setup** (or **Settings → Orchestrator → Templates**)
3. Select the correct **Cloud Provider Setup** and **zone**
4. Open the template to create or edit
5. Configure the fields described below
6. Set **Status** to Active and click **Save**

{/* TODO: add screenshot cmp-template-edit-form.png */}

## Compute category (optional)

Compute Categories group templates and packages for filtering and presentation within CMP. This setting has **no direct dependency** on the orchestrator.

* Configuring Compute Categories is **optional**
* Once a category is used for any package or template, apply it **consistently** across all related templates and packages in the same zone to maintain a uniform customer experience

:::info

Compute Categories are primarily used for organization and filtering in the customer portal. See [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync) for how compute categories relate to package mapping.

:::

## Template type

Select the appropriate template type. This determines which provisioning workflow CMP uses during VM creation.

| Value | Description |
|---|---|
| **Operating System** | Standard VM template used for virtual machine provisioning |
| **ISO** | ISO image used for ISO-based deployment workflows |

## Template offering

Template Offerings represent templates or images available at the orchestrator level. Only offerings that have been made available in CMP can be selected and mapped.

### CloudStack

For CloudStack integrations, only templates marked **Public** and **Featured** are available for configuration in CMP.

### OpenStack

For OpenStack integrations, only **Public** images are available.

:::warning[OpenStack image ID changes]

When an image is recreated or modified in OpenStack, the underlying image identifier may change. After updating an image, verify that the correct image is still mapped in CMP.

:::

## Name

The **Name** field is used internally by administrators to identify the template. This value is **not displayed** to end customers — customers see the **Operating System** name and version instead.

## Select operating system

Choose the operating system associated with this template.

If the required operating system is not available, add it from **Settings → Operating System** before continuing.

## Select operating system version

Select the operating system version associated with the template.

This value is **displayed to end customers** during VM provisioning — use clear, user-friendly labels (for example, `Ubuntu 22.04 LTS` rather than an internal build name).

If the required OS version is not available, add it from **Settings → Operating System**.

## Password management

The **How will the password be set?** field determines how CMP provisions and manages guest operating system passwords.

### Available methods

| Method | Supported platforms |
|---|---|
| **Using Template** | CloudStack, OpenStack |
| **Using Startup Script** | VMware, Proxmox, OpenStack (Linux) |

### CloudStack (Using Template)

For CloudStack, templates must be registered as **Password Enabled** in CloudStack.

CMP does **not** send a password during the `deployVirtualMachine` API request. Instead:

* CloudStack generates the password when the template is password-enabled
* CloudStack returns the password in the deployment response
* CMP stores the password against the VM record
* The password is displayed in the CMP interface and can be used for password reset operations

See [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates) for CloudStack-side requirements.

### Proxmox (Using Startup Script)

For Proxmox, CMP uses cloud-init to configure the guest operating system. The following values are passed automatically during provisioning:

* `ciuser` — from VM username, template default username, or OS default username (in that order)
* `cipassword` — from the VM password (provided at provisioning or generated)

The underlying template or image must support **cloud-init**. There is no CloudStack-style **password enabled** flag on the template.

### OpenStack

OpenStack supports two password management methods:

**Using Template**

CMP sets the `admin_pass` value, which the image uses to configure the guest password. The image must be password-enabled.

**Using Startup Script (Linux only)**

CMP automatically injects an internal cloud-init startup script that creates the user account, configures the password, and optionally adds SSH public keys. Administrators do **not** need to manually configure this script.

### VMware (Using Startup Script)

For VMware, CMP uses **Guest OS Customization** during clone operations:

* **Linux:** A customization script creates the user and configures the password
* **Windows:** Sysprep and Guest Customization apply the password and execute run-once commands

The template is used as the clone source — username and password are injected by CMP through the customization spec, not via a CloudStack-style password-enabled flag.

### Zabbix Agent (deprecated)

The Zabbix Agent template field is **deprecated**. You can skip this setting.

## Template capabilities

### Is the Template Password Enabled?

Controls whether CMP exposes password-related functionality for the template. Some providers prefer SSH-key-only access; others support both password and SSH authentication.

This setting also controls whether password fields are displayed on the VM provisioning form.

### Does the Template Support Password Reset?

Some templates may not be password-enabled but still support password reset through orchestrator APIs. Enable this option to show the **Reset Password** action on the VM details page after deployment.

### Does the Template Support SSH Key Injection?

Enable this option if the template supports configuring SSH public keys during VM provisioning using startup scripts or native orchestrator functionality.

## Documentation fields

These fields provide custom documentation links for end users on the VM details page.

| Field | Description |
|---|---|
| **Documentation Label** | Display name shown to the end user |
| **Documentation URL** | Link to operating system docs, application setup guides, or post-deployment instructions |

## Minimum resource requirements

Some templates require minimum CPU, memory, or storage to function correctly.

| Field | Description |
|---|---|
| **Minimum CPU (cores)** | Minimum CPU required for this template |
| **Minimum Memory (MB)** | Minimum RAM required for this template |
| **Minimum Storage (GB)** | Minimum root disk size required for this template |

When these values are configured, CMP **automatically filters** available VM packages and displays only packages that meet or exceed the minimum requirements. This prevents customers from provisioning instances that do not satisfy the template's resource requirements.

## Startup script (CloudStack only)

The **Start-up Script** field allows administrators to associate a startup script with the template.

This feature is primarily used for **Marketplace applications** and advanced guest initialization scenarios.

:::info[Standard deployments]

For standard Linux and Windows VM deployments, CMP automatically handles internal startup scripts where required. Administrators typically do **not** need to define a custom startup script.

:::

:::warning[Marketplace applications]

Marketplace apps require startup script support on the template. See [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates#enable-startup-script-support).

:::

## Default firewall allowed ports (CloudStack only)

CMP can automatically create default firewall rules immediately after VM provisioning using orchestrator APIs. Rules are created at the **public IP address firewall** level.

If **Default Firewall Allowed Ports** is configured, CMP creates rules for the specified ports.

If no ports are specified, CMP creates rules for:

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

* Template has been re-configured in CMP for the correct Cloud Provider Setup and zone
* Orchestrator-side template meets [CMP compatibility requirements](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
* **Operating System** and **Version** are configured correctly
* **Password management** method matches the orchestrator and template type
* Template capabilities (password enabled, password reset, SSH key injection) are set correctly
* **Minimum resource requirements** are defined if applicable
* **Default firewall allowed ports** are configured as required (CloudStack)
* **Status** is set to **Active**

## Related

* [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
* [Templates](/orchestrators/cloudstack/templates/)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Creating & Configuring Zones](/zones/creating-zones)
* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync)
