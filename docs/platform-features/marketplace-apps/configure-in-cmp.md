---
sidebar_position: 2
title: "Configure in CMP"
tags: ["platform", "marketplace", "templates", "admin"]
---

# Configure Marketplace Apps in CMP

**Path:** **Settings → Orchestrator → Apps Marketplace**

Complete these steps **after** you have a prepared CloudStack template with the application installed and [startup script / UserData support](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates#enable-startup-script-support).

## 1. Create or edit the Marketplace App

Open **Apps Marketplace** and use **+ Add Marketplace App**, or open an existing app’s **Edit** action.

![Screenshot: Apps Marketplace list with Featured apps and actions menu](/img/screenshots/cmp-apps-marketplace-list.png)

### Form fields (Edit Marketplace App)

![Screenshot: Edit Marketplace App — name, description, categories, logos](/img/screenshots/cmp-edit-marketplace-app.png)

**Name**

*Required.* Display name (for example `Postgresql`, `Odoo`).

**URL**

*Optional.* Link to external product documentation or the vendor site. Useful for [Application Information and Documentation](/platform-features/marketplace-apps/automation-limitations#2-application-information-and-documentation).

**Short Description**

*Required.* Shown to customers when they select the app on Create Instance.

**App Master Category**

*Required.* Top-level grouping (for example **Marketplace**).

**Categories**

*Required.* Customer-facing category (for example `hosting`, `cms`). Use **+ Add** to add more.

**Upload Light Theme Logo / Upload Dark Theme Logo**

*Optional but recommended.* Logos for light and dark portal themes.

**Mark as Featured**

*Optional.* Featured apps are highlighted in the Apps Marketplace list and customer UI.

**Email content / instructions**

*Optional but recommended for credentials email.* Per-app copy shown to the customer after deploy (via the credentials email and related UI). Content is **specific to each Marketplace App** — for example WordPress login steps vs database connection notes.

Use **create** when you first add the app, and **update** later to revise instructions without recreating the app. This text is passed into the [Market Place Application Credentials](/platform-features/marketplace-apps/application-credentials) email as **`{{email_content}}`**.

:::tip[Keep instructions in sync with variables]

If you add or rename environment variables, update the email content so customers know how to use the values they receive in **`{{table}}`**.

:::

## 2. Manage versions

From the app row actions, open **Update Version** (or the versions screen for that app).

![Screenshot: Marketplace App versions — Update Version and Pricing](/img/screenshots/cmp-marketplace-app-versions.png)

Typical fields:

| Field | Purpose |
|---|---|
| **Version** | Label shown to customers (for example `psql 17`, `Odoo 18`) |
| **Pricing** | For example **FREE**, or a licence / paid type when configured |
| **Status** | **Enable** / disable availability |

Add one version row per application release you sell. Each version is later linked from a [CMP template](#4-link-templates).

## 3. Define environment variables

From the app row actions, open **Environment Variables**.

These are the **deployment parameters** customers fill in on Create Instance. Values are substituted into the admin startup script at deploy time, **stored for the VM** after deploy (sensitive values encrypted), and included in the credentials email via **`{{table}}`**. See [Environment variables](/platform-features/marketplace-apps/environment-variables) and [Application credentials email](/platform-features/marketplace-apps/application-credentials).

![Screenshot: Environment Variables of Postgresql — Add Variable panel](/img/screenshots/cmp-marketplace-env-variables.png)

### Add Variable fields

**Name**

*Required.* Label shown to the customer (for example `PSQL Password`, `Database Name`).

**Type**

*Required.* Input type — for example `text`, `password`, `url`. Use `password` for secrets so CMP can treat them as sensitive in storage and UI.

**Required**

*Optional.* Whether the customer must enter a value before deploy.

**Status**

*Required.* **Enable** to show the field on Create Instance.

## 4. Link templates

Map each CloudStack offering to a Marketplace App version under **Settings → Orchestrator → Templates**.

1. Create or edit a template for the correct Cloud Provider Setup and zone.
2. Set **Image Type** to **Market Place App**.
3. Select **OS** / **OS Version** as usual.
4. Set **Select Market Place App** and **Select Market Place App Version**.
5. Configure **User Config** and the **Start-up Script** so placeholders match your environment variables.

![Screenshot: Template form — Image Type Market Place App, app and version selected](/img/screenshots/cmp-template-marketplace-app-type.png)

:::tip[Documentation on the VM]

Use template **Documentation Label** and **Documentation URL** (and/or the app **URL**) so customers can open setup guides after deploy. See [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp#documentation-label-and-url).

:::

:::warning[User Data required]

Marketplace apps depend on UserData / startup scripts. Ensure VPC and network offerings include **User Data** — otherwise apps appear to deploy but scripts never run. See [User Data — required for templates, Marketplace, and startup scripts](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#user-data--required-for-templates-marketplace-and-startup-scripts).

:::

## 5. Customer Create Instance view

When configuration is complete, customers use **Create Instance → Choose Image → Marketplace Apps**, select the app and version, then enter the environment variable values.

![Screenshot: Create Instance — Marketplace Apps tab with environment setup fields](/img/screenshots/cmp-create-instance-marketplace-apps.png)

CMP substitutes those values into the admin startup script and deploys the VM with the pre-installed application image. After deploy, customers receive the [Market Place Application Credentials](/platform-features/marketplace-apps/application-credentials) email (when configured). Showing the same Marketplace details on the end-user **VM details** page is a [planned improvement](/platform-features/marketplace-apps/application-credentials#future-improvements).

## Related

* [Marketplace Apps overview](/platform-features/marketplace-apps/)
* [Environment variables](/platform-features/marketplace-apps/environment-variables)
* [Application credentials email](/platform-features/marketplace-apps/application-credentials)
* [Startup script size](/platform-features/marketplace-apps/startup-script-limits)
* [Automation limitations](/platform-features/marketplace-apps/automation-limitations)
* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp)
