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
