---
sidebar_position: 1
title: "Marketplace Apps"
tags: ["platform", "marketplace", "templates", "cloudstack", "userdata"]
---

# Marketplace Apps

Marketplace apps are **VM templates with pre-installed applications**. The service provider prepares the image (OS + application) so end users can deploy a ready-to-use app without installing software manually.

**Example:** A WordPress or cPanel Marketplace App is a VM image where the software stack is already pre-installed. The customer chooses the app, enters deployment parameters (such as domain name, admin credentials, or database settings), and launches a VM.

---

## Workflow & Responsibilities (Summary)

Providers often assume complex automation occurs behind the scenes. For example, in a **cPanel** deployment, providers often assume:
* The customer supplies their intended domain during service creation.
* Because cPanel requires a domain to initialize, a temporary provider/platform subdomain or URL based on the provisioned public IP is initially assigned.
* The customer later switches to their production domain by updating DNS / CNAME records.
* Domain handling is part of the initial web-hosting setup flow, while final customer domain mapping happens post-provisioning.

### How CMP Actually Works

CMP does not manage internal guest application state or automated DNS provisioning for apps out-of-the-box. Instead, CMP provides a **generic parameter substitution and startup script mechanism**:

1. **Template Preparation (CloudStack / Orchestrator Admin):** Prepares the base VM template with the application installed and all necessary configuration tools/hooks that can be configured by a startup script via UserData.
2. **CMP Configuration (Admin):** Configures the Marketplace App in CMP with the required **Environment Variables**, and attaches a **Startup Script** containing matching placeholders (for example `{{DOMAIN}}`, `{{ADMIN_PASSWORD}}`).
3. **Customer Input & CMP Orchestration:** When a customer provisions the VM with the marketplace app, CMP renders input fields to collect the required environment variables (such as their domain or credentials) from the customer. CMP then replaces the placeholders in the admin's startup script with the customer's inputs and injects the rendered script into CloudStack UserData. At first boot, the startup script executes inside the guest OS to apply the configuration.

### Responsibilities Matrix

| Responsibility | CloudStack / Provider Admin | End Customer | CMP Platform |
|---|---|---|---|
| **OS & App Image Preparation** | **Yes** — Build and register template with app pre-installed | No | No |
| **Startup Script & Placeholders** | **Yes** — Write startup script with `{{VAR}}` placeholders | No | No |
| **Marketplace App & Env Vars Setup** | **Yes** — Define variables, pricing, and email instructions | No | No |
| **Provide Deployment Parameters** | No | **Yes** — Enter domain, passwords, or custom inputs at checkout | No |
| **Replace Variables & Inject UserData** | No | No | **Yes** — Substitute inputs into script and pass to CloudStack |
| **Execute Guest Configuration** | No | No | **Yes (via guest startup script)** — Runs at first VM boot |
| **Deliver Credentials & Access Info** | No | Receives details via email | **Yes** — Sends credentials email with `{{table}}` & instructions |
| **Post-Deploy DNS & Custom Mapping** | Guides customer (via email / docs) | **Yes** — Points DNS / CNAME records to VM public IP | No |

---

## Marketplace Application Provisioning vs. Managed Services

CMP Marketplace Apps are designed to provision a VM with a predefined application or software stack. The Marketplace application represents the software that will be installed and configured on the VM during provisioning.

CMP's responsibility is primarily focused on **VM provisioning and application initialization**. CMP does not automatically become the managed service provider for the application installed on the VM.

### How It Works

A Marketplace application can define:

* VM / resource requirements
* Application or software to be installed
* Environment variables
* Application credentials
* Startup scripts
* Cloud-Init / user-data configuration
* Other parameters required during VM initialization

During VM provisioning, the configured parameters are passed to the VM and used by the predefined template and startup process to install or configure the application.

The resulting VM is then delivered with the selected application available for the customer to use and manage.

### Example: cPanel

For example, a Marketplace offering may provide:

**Ubuntu VM + cPanel**

In this scenario:

1. CMP provisions the VM.
2. The predefined application/template installs or configures cPanel.
3. Required parameters can be passed through the Marketplace application configuration and Cloud-Init / user-data.
4. The VM is delivered with cPanel available.
5. The customer manages cPanel and the services operated through cPanel.

CMP should not be interpreted as providing a separate managed Web Hosting or Email Hosting service simply because cPanel is installed on the VM.

For example, cPanel may provide capabilities for:

* Website hosting
* Domain management within cPanel
* Mailbox management
* Email services
* Other hosting-related functionality supported by the cPanel installation

These capabilities are provided and managed through cPanel and the customer-managed VM environment, not as separate managed services delivered by CMP.

:::info[cPanel Scope]

The cPanel Marketplace offering provisions a VM with cPanel installed and configured as a predefined application. CMP does not provide cPanel-based Web Hosting or Email Hosting as separate managed services. Website hosting, email hosting, domains, mailboxes, DNS configuration, and other cPanel-level services are managed through the cPanel environment by the customer.

:::

### Other Examples

The same model applies to other Marketplace applications:

* **Ubuntu + WordPress**: CMP provisions the VM and provides the predefined WordPress environment. The customer manages the WordPress application, website, content, plugins, themes, updates, and related services.
* **Ubuntu + Next.js**: CMP provisions the VM and provides the predefined Next.js environment. The customer is responsible for deploying and managing their Next.js application.
* **Ubuntu + MySQL**: CMP provisions the VM with the predefined MySQL environment. Database administration, database users, schemas, backups, security, and ongoing database management remain outside the CMP provisioning layer.

### Marketplace Application vs. Managed Service

It is important to distinguish between the following:

| CMP Marketplace Application | Managed Service |
|---|---|
| Provisions a VM | Operates and manages the service |
| Installs/configures predefined software | Provides ongoing service management |
| Passes configuration parameters | Manages application-level configuration |
| Uses Cloud-Init/user-data during provisioning | Handles ongoing operational activities |
| Delivers the VM/application environment | Manages the service throughout its lifecycle |

Therefore, installing an application through the CMP Marketplace does **not** mean that CMP provides the application as a managed service.

### Domain and DNS

Domain registration and DNS management are outside the current CMP Marketplace application provisioning scope.

If an application requires a domain name, the required domain information can be collected as part of the Marketplace application configuration ([environment variables](/platform-features/marketplace-apps/environment-variables)) and passed to the VM during provisioning.

The customer remains responsible for managing the domain and configuring the required DNS records with their domain/DNS provider. CMP does not currently provide DNS management or external DNS integration.

### Important Scope Clarification

Marketplace Apps should therefore be understood as a mechanism for **provisioning a VM with a predefined application/environment**, rather than as a mechanism for creating a fully managed application service.

```text
CMP Marketplace
      ↓
VM provisioning
      ↓
Predefined application installation / configuration
      ↓
Cloud-Init / user-data execution
      ↓
Application available on VM
      ↓
Customer manages the application / service
```

This distinction applies to cPanel, WordPress, Next.js, MySQL, and other applications provided through the Marketplace.

---

## How it fits together

```text
Prepared OS+app image (CloudStack template)
        ↓
CMP Apps Marketplace (app, versions, env vars, email content / instructions)
        ↓
CMP Template (Image Type = Market Place App + startup script)
        ↓
Customer Create Instance → Marketplace Apps tab → env inputs (if any) → deploy
        ↓
Credentials email always sent ({{email_content}} + {{table}} when vars exist)
```

| Step | Where | Docs |
|---|---|---|
| Prepare password-enabled, UserData-capable template | CloudStack | [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates) |
| Create Marketplace App + versions + env vars + email content | **Settings → Orchestrator → Apps Marketplace** | [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp) |
| Map template to app / version + startup script | **Settings → Orchestrator → Templates** | [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp#4-link-templates) |
| Activate credentials email template | **Settings → System → Templates** | [Application credentials email](/platform-features/marketplace-apps/application-credentials) — always sent after Marketplace deploy |
| Network offerings include **User Data** | CloudStack VPC / network offerings | [Virtual Router / VPC — User Data](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#user-data--required-for-templates-marketplace-and-startup-scripts) |
| Align userdata size limits | CloudStack + CMP Global Settings | [Startup script size](/platform-features/marketplace-apps/startup-script-limits) |

:::tip[Credentials after deploy]

CMP **always** sends **Market Place Application Credentials** after a successful Marketplace deploy (not only the generic VM-created email), using the Active template — whether or not the app defines environment variables. Configure per-app email content (and `{{table}}` when you have variables). See [Application credentials email](/platform-features/marketplace-apps/application-credentials).

:::

## Pages in this section

* [Configure Marketplace Apps in CMP](/platform-features/marketplace-apps/configure-in-cmp) — apps, versions, environment variables, email content, templates, customer view
* [Environment variables](/platform-features/marketplace-apps/environment-variables) — deployment parameters, storage, email
* [Application credentials email](/platform-features/marketplace-apps/application-credentials) — `{{table}}`, per-app content, planned VM details UI
* [Startup script size (CloudStack)](/platform-features/marketplace-apps/startup-script-limits) — `vm.userdata.max.length` and CMP limits
* [Automation limitations](/platform-features/marketplace-apps/automation-limitations) — what CMP cannot scrape from the guest OS

## Related

* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp) — Image Type **Market Place App**, startup script
* [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates#enable-startup-script-support)
* [Platform Features](/platform-features/)
* [Store & Products](/platform-features/store/) — separate non-automated catalogue (not the same as Marketplace Apps)
