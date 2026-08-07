---
sidebar_position: 4
title: "Application credentials email"
tags: ["platform", "marketplace", "email", "credentials", "environment-variables"]
---

# Application credentials email

When a customer deploys a VM from a **Marketplace App**, CMP can send an email with **application credentials and environment details** (for example WordPress admin URL, username, and password) — not only the generic “VM created successfully” message with OS, RAM, and storage.

:::tip[Why this exists]

Previously, Marketplace deploys often only sent the standard VM-created email. App-specific login details were not delivered to the customer unless they found them another way. This flow maps Marketplace environment / script output variables into a dedicated email template.

:::

## How it works

```text
Admin: define env vars + per-app email content / instructions
        ↓
Customer: Create Instance → Marketplace App → enter env values → deploy
        ↓
CMP: store Marketplace variables for the VM (sensitive values encrypted)
        ↓
Email: Market Place Application Credentials
        → fetch vars for that VM
        → merge {{table}}, {{email_content}}, and other tags
        → send to customer
```

| Stage | What CMP does |
|---|---|
| **Deploy** | Runs the Marketplace startup script; collects environment / script output variables (URL, username, password, and so on) |
| **Store** | Saves those variables for the VM in the database; **sensitive** values are stored **encrypted** |
| **Email** | When the Marketplace credentials email is triggered, loads variables for that VM, replaces placeholders, and sends the message |

---

## Admin setup

Complete the usual Marketplace App setup first — see [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp). Then configure **email content / instructions** and the system email template.

### 1. Environment variables on the Marketplace App

**Path:** **Settings → Orchestrator → Apps Marketplace** → app actions → **Environment Variables**

Define the variables the customer (or startup script) must provide for this app — for example WordPress site URL, admin user, and admin password. These are the values CMP stores after deploy and can inject into the email.

Each Marketplace App has its **own** variable set. See [Environment variables](/platform-features/marketplace-apps/environment-variables).

### 2. Email content and instructions (per app)

**Path:** **Settings → Orchestrator → Apps Marketplace** → create or edit the app

Admins add **environment variable email content** and **instructions** on the Marketplace App. Content is **different for each app** (WordPress vs PostgreSQL vs Odoo, and so on).

Use **create** and **update** options on the Marketplace App so you can:

* Set instructions when the app is first created
* Revise email content and instructions later without recreating the app

That per-app copy is passed into the email as **`{{email_content}}`** (and related instruction display) together with the resolved variable values.

:::important[Admin responsibility]

CMP does not invent WordPress (or other) credentials. You must:

1. Define the correct environment variables for the app  
2. Ensure the startup script produces or uses those values consistently  
3. Write clear per-app email content / instructions (how to log in, where files live, and so on)  
4. Keep the **Market Place Application Credentials** email template active and using the supported tags  

:::

### 3. Email template — Market Place Application Credentials

**Path:** **Settings → System → Templates** (Email Templates) → **Market Place Application Credentials**

A dedicated template sends Marketplace application credentials after a successful Marketplace deploy.

![Screenshot: Edit Email Template — Market Place Application Credentials with {{table}} and {{email_content}}](/img/screenshots/cmp-marketplace-app-credentials-email-template.png)

| Field | Typical value |
|---|---|
| **Template Name** | `Market Place Application Credentials` |
| **Category** | Services |
| **Status** | Active |
| **User Type** | Customer |
| **Subject** | Market Place Application Credentials (or your branding) |

#### Supported placeholders

Use the **Available Tags** list in the editor. Tags especially important for Marketplace credentials:

| Tag | Purpose |
|---|---|
| **`{{table}}`** | Dynamically populates environment variable names and values for the deployed VM |
| **`{{email_content}}`** | Per-app email content / instructions configured on that Marketplace App |
| **`{{marketplace_app_name}}`** | Name of the Marketplace App (for example WordPress) |
| **`{{virtual_machine}}`** | Deployed VM identifier / name |
| **`{{name}}`** | Customer display name |
| **`{{company_name}}`** | Provider / company name |
| **`{{first_name}}`**, **`{{email}}`** | Customer contact fields |
| **`{{current_date}}`**, **`{{current_datetime}}`**, **`{{current_date_long}}`** | Date stamps |
| **`{{mailTemplate}}`**, **`{{parsedBody}}`** | Template / body helpers as listed in the editor |

Example body pattern (aligned with the stock template):

```text
Hello {{name}},

We are pleased to inform you that your {{marketplace_app_name}} application has been deployed successfully.
Your application is now ready to use.

Below are the details of your deployment:
Virtual Machine: {{virtual_machine}}
{{email_content}}

Application Credentials:
{{table}}

Regards,
{{company_name}}
```

:::tip[Use `{{table}}` for variables]

Always include **`{{table}}`** where you want the dynamic environment variable list. Without it, customers only see static copy and miss URL / username / password rows.

:::

---

## What happens at VM creation

1. Customer creates a VM from **Create Instance → Marketplace Apps** and submits environment values.
2. CMP deploys the VM and runs the Marketplace startup script.
3. CMP **stores** Marketplace script / environment output variables for that VM. Sensitive fields (passwords and similar) are stored **encrypted**.
4. If variables exist for the VM, CMP **fetches** them when the Marketplace credentials email is triggered.
5. CMP merges:
   * Stored variable values → **`{{table}}`** (and any mapped placeholders)
   * Per-app admin content → **`{{email_content}}`**
   * Standard tags (`{{name}}`, `{{marketplace_app_name}}`, and so on)
6. The **Market Place Application Credentials** email is sent to the customer.

---

## Future improvements

**VM details / Overview (end user):** Show all Marketplace App environment variable details on the customer **VM details** page after deploy — the same information sent in the credentials email — with sensitive values masked or shown securely when needed. Customers will then be able to recover credentials from the portal without relying only on email.

---

## Admin checklist

| Step | Where | Done when |
|---|---|---|
| Marketplace App + version | **Apps Marketplace** | App is Active and version Enabled |
| Environment variables | App → **Environment Variables** | Required fields defined and Enabled |
| Email content / instructions | App create / update | Per-app copy ready for `{{email_content}}` |
| Startup script + placeholders | **Templates** (Image Type = Market Place App) | Script uses the same variables |
| Email template Active | **Settings → System → Templates** | **Market Place Application Credentials** uses `{{table}}` (and ideally `{{email_content}}`) |
| User Data on network | CloudStack offerings | Startup script can run |

---

## Related

* [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp)
* [Environment variables](/platform-features/marketplace-apps/environment-variables)
* [Automation limitations](/platform-features/marketplace-apps/automation-limitations)
* [Marketplace Apps overview](/platform-features/marketplace-apps/)
* [Multi-language — email templates](/platform-features/multi-language#email-template-translations)
