---
sidebar_position: 2
title: "APIs"
tags: ["platform", "features", "api", "integration"]
---

# APIs

CMP is built on **REST-based APIs**. Use this page to enable API access, generate tokens, authenticate, and configure role-based permissions for integrations.

:::tip[Quick start]

| Topic | Summary |
|---|---|
| **API style** | REST |
| **Auth** | Bearer token from **Profile → API** |
| **Enablement** | **Admin APIs** and **User APIs** — both off by default; contact StackConsole to enable |
| **Docs UI** | Swagger / Postman-style URL generated with the token |

:::

:::info[API reference status]

CMP API reference documentation is still being prepared and may not yet be complete. If you need details for a specific endpoint that is not documented, contact the **StackConsole** team for guidance.

:::

## Prerequisites

Before integrating or calling CMP APIs, ensure API access is **enabled** for your platform.

CMP provides two enablement settings:

| Setting | Purpose |
|---|---|
| **Admin APIs** | Administrator-level APIs. When enabled, only administrator users can generate access tokens and run operations that require admin privileges |
| **User APIs** | Customer / user-level APIs. End users can generate access tokens and call APIs allowed by their role |

By default, **both** settings are **disabled**. To enable API access for your environment, contact the **StackConsole** team.

## Generate API access token

1. Log in with the end user’s (or integration user’s) credentials
2. Open **Profile → API**
3. Click **Enable API**

CMP instantly generates:

* **API Access Token**
* **API Documentation URL**

Open the documentation URL to use the interactive API interface (Swagger / Postman-style).

![Screenshot: CMP — Profile → API tab with Enable API](/img/screenshots/cmp-profile-api-tab.png)

## Use the token to access the API

1. Copy the **API Access Token** from the API page
2. Open the **API Documentation URL**
3. Authenticate:
   * Open **Authorization → Bearer Token**
   * Paste the token
4. Call endpoints allowed by that user’s **role permissions**

![Screenshot: CMP — API docs Authorization Bearer Token](/img/screenshots/cmp-api-docs-bearer-token.png)

## Role-specific API access and permissions

To allow a user to use APIs, create a custom **role** with the required permissions, then assign that role to a **subuser**.

### Step 1 — Create a role with required permissions

1. Go to **Profile**
2. Open the **Roles** tab
3. Click **Create Role**

![Screenshot: CMP — Create Role](/img/screenshots/cmp-create-role-api.png)

### Step 2 — Select required permissions

From the permissions list, enable the permissions required for API token generation and API access under at least:

Enable each permission exactly as required for your integration use case (match your environment’s permission checkboxes for these sections).

![Screenshot: CMP — Role permissions under Billing Setup](/img/screenshots/cmp-api-role-permissions-billing-setup.png)

### Step 3 — Save the role

1. Enter a **Role Name** (for example, `API Access Role`)
2. Add an optional **description**
3. Click **Save**

The custom API-ready role is now created.

### Step 4 — Create a subuser and assign the role

1. Open the **admin panel**
2. Go to **Profile → Users**
3. Click **Create User**
4. Enter user details (name, email, password, and so on)
5. In **Role**, select the role created in Step 3
6. Click **Save**

That subuser can now generate an API token and call APIs allowed by the role.

![Screenshot: CMP — Create User and assign API role](/img/screenshots/cmp-create-user-assign-api-role.png)

## Important notes for integrations

:::warning[Integration token vs end-user browsing]

* After you generate the API access token with the subuser account, you do **not** need to log in again or regenerate the token for each call
* The token is for **system-to-system** integration — configure it in your backend or application to fetch plans, pricing, and other API data automatically
* This token is **not** related to end users browsing your website
* End users do **not** need to log in or generate tokens to view packages, pricing, or UI data — your site should use the single integration token on the backend

:::

## Related

* [Platform Features](/platform-features/)
* [Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration) — `token_default_expiry_minutes`, sliding renewal, max session lifetime
* [Identity Providers](/platform-features#identity-providers)
* [What is CMP](/overview/what-is-cmp)
* [Billing Overview](/billing/overview)
