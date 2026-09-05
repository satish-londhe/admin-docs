---
sidebar_position: 2
title: "Zitadel Setup"
tags: ["platform", "identity", "sso", "zitadel", "setup"]
---

# Zitadel — Setup

Step-by-step setup for a Zitadel instance, Stack Console Web/OIDC application, and CMP Social Login configuration.

:::warning[Secrets]

Never publish or share a live Client Secret or PAT in tickets, screenshots, or documentation. Redact secrets in screenshots shared externally.

:::

## Part A — Create the Zitadel instance

### Step 1 — Open Zitadel and sign in

Open the [Zitadel](https://zitadel.com) website and sign in or sign up with the email that will own the instance.


![Screenshot: Zitadel homepage](/img/screenshots/zitadel/zitadel-homepage.png)

Enter your login name and click **Continue**.


![Screenshot: Zitadel login name](/img/screenshots/zitadel/zitadel-login-name.png)

Enter your password and click **Continue**.


![Screenshot: Zitadel password](/img/screenshots/zitadel/zitadel-login-password.png)

### Step 2 — Create your first instance

From the Customer Portal dashboard, click **Create Instance** under **Create your first instance**.


![Screenshot: Zitadel Customer Portal — Create Instance](/img/screenshots/zitadel/zitadel-customer-portal-dashboard.png)

Enter an **Instance name** and confirm the **Organization name**, then click **Next: Select your region**.


![Screenshot: Setup your first instance](/img/screenshots/zitadel/zitadel-instance-setup-name.png)

### Step 3 — Select your data region

Choose the region where instance data will be stored. This choice is permanent.


![Screenshot: Select your data region](/img/screenshots/zitadel/zitadel-instance-select-region.png)

### Step 4 — Create the first admin user

Enter the username/email and password for the first user in the new instance.


![Screenshot: Create your first user](/img/screenshots/zitadel/zitadel-instance-create-user.png)

### Step 5 — Confirm and create the instance

Review **Instance name**, **Organization name**, **Selected data region**, and **Instance user**, then click **Create instance**.


![Screenshot: Confirm your instance details](/img/screenshots/zitadel/zitadel-instance-confirm.png)

When creation completes, **Create your first instance** is marked complete and **Create your first app** becomes the next task.


![Screenshot: Instance created — Create your first app](/img/screenshots/zitadel/zitadel-instance-created.png)

## Part B — Create the Web application

:::important[Use your own project]

Create the Stack Console application in **your own project** (for example `stack-console`). Do **not** modify applications in the built-in **ZITADEL** project (Management-API, Admin-API, Console).

:::

### Step 6 — Sign in as instance admin

Sign in with the user created during instance setup.


![Screenshot: Sign in with instance administrator](/img/screenshots/zitadel/zitadel-instance-admin-login-name.png)


![Screenshot: Instance administrator password](/img/screenshots/zitadel/zitadel-instance-admin-password.png)

### Step 7 — Create application

Open **Projects → Create Application**. Select an existing project or create a new one.


![Screenshot: Create Application](/img/screenshots/zitadel/zitadel-create-application.png)

Use your own project — do not modify the built-in **ZITADEL** project.


Open your project and click **New (+)** under **Applications**.



| Setting | Value |
|---|---|
| **Application type** | **Web** |
| **Name** | Descriptive name (e.g. `stack-console-web`) |
| **Authentication method** | **Code** (confidential authorization-code; not public PKCE-only) |


![Screenshot: Authentication method — Code](/img/screenshots/zitadel/zitadel-auth-method-code.png)

### Step 8 — Configure redirect URIs

Add all four URIs **exactly** (replace `{APP_URL}` with your CMP frontend URL):

| # | Redirect URI |
|---|---|
| 1 | `{APP_URL}/socialite/zitadel/callback` |
| 2 | `{APP_URL}/socialite/zitadel/handle-callback` |
| 3 | `{APP_URL}/affiliate/socialite/zitadel/callback` |
| 4 | `{APP_URL}/affiliate/socialite/zitadel/handle-callback` |

| Setting | Value |
|---|---|
| **Development Mode** | Enable **only** when `{APP_URL}` uses `http://` |
| **Post Logout Redirect URIs** | Leave **empty** for this Stack Console flow |


![Screenshot: Redirect URI configuration](/img/screenshots/zitadel/zitadel-redirect-uris.png)

### Step 9 — Create and copy credentials

Verify application name, type, grant type, authentication method, redirect URIs, and Development Mode, then click **Create**.


![Screenshot: Application overview before creation](/img/screenshots/zitadel/zitadel-application-review.png)

Copy immediately:

* **Client ID** — OIDC client identifier (not the Application UUID from the browser URL)
* **Client Secret** — Zitadel does not show the original secret again after the dialog closes


![Screenshot: Client ID and Client Secret](/img/screenshots/zitadel/zitadel-client-credentials.png)

**Regenerate Client Secret:** Application → **Actions → Regenerate Client Secret**. Copy the new value immediately. Regeneration invalidates the old secret; Client ID stays the same.

When updating only the secret in CMP, paste the new secret, **leave PAT blank** to retain the stored PAT, and save.

### Step 10 — Token settings

| Setting | Required value |
|---|---|
| **Auth token type** | **JWT** |
| **Refresh token** | **Enabled** |
| **User roles in access token** | Enable if required by your Stack Console role flow |
| **User roles inside ID token** | Enable if required by your Stack Console role flow |
| **User profile info in ID token** | Recommended: **Enabled** |
| **ZITADEL API audience** | Enable if offered and self-service API access is required |


![Screenshot: Token settings for the Web application](/img/screenshots/zitadel/zitadel-token-settings.png)

Save token settings. Minimum requirements: **JWT** auth tokens and **Refresh token enabled**.

## Part C — Save credentials in CMP

**Path:** **Admin → Settings → Social Login → Zitadel → Edit**

**Client ID**

*Required.* Paste the Client ID from the Zitadel Web application.

**Client Secret**

*Required.* Paste the Client Secret from the Web application.

**Base URL**

*Required.* Zitadel issuer origin only — **without** `/oauth` or `/ui` (for example `https://your-instance.zitadel.cloud`).

**Personal Access Token (PAT)**

*Optional at login-only setup.* Required for [user migration](/platform-features/identity-providers/zitadel/user-migration). Paste the machine-user PAT when configuring admin API access. On later edits, leave blank to keep the stored PAT.

**Status**

*Required.* Set to **Active** when ready. Set other SSO providers to **Inactive** if only one should be active.

:::warning[Do not use .env]

Store all Zitadel credentials in CMP Social Login settings. Do not put `ZITADEL_*` values in `.env`.

:::

## Verification checklist

- [ ] Instance is created and accessible
- [ ] Own Stack Console project is used; built-in ZITADEL project was not modified
- [ ] Web application created with **Code** / confidential authentication
- [ ] All four redirect URIs configured exactly
- [ ] Development Mode enabled only for HTTP environments
- [ ] Post Logout Redirect URIs are empty
- [ ] Client ID and Client Secret saved in CMP Social Login
- [ ] Auth token type is JWT; refresh token is enabled
- [ ] Login with Zitadel succeeds after saving

## Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| `Errors.App.NotFound` | Wrong Client ID | Use the Web app Client ID, not Application UUID or a built-in ZITADEL project app |
| Auth fails after secret change | Secret from wrong app | Confirm secret belongs to the same Web application as the configured Client ID |

## Next steps

* [Machine user & PAT](/platform-features/identity-providers/zitadel/machine-user-and-pat) — required before migrating existing users
* [User migration](/platform-features/identity-providers/zitadel/user-migration)

## Related

* [Zitadel overview](/platform-features/identity-providers/zitadel/)
* [Identity Providers](/platform-features#identity-providers)
