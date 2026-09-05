---
sidebar_position: 1
title: "Zitadel Overview"
tags: ["platform", "identity", "sso", "zitadel"]
---

# Zitadel

Zitadel is an OIDC identity provider supported by CMP for customer and affiliate login. Configuration is stored in **Admin → Settings → Social Login → Zitadel**.

## Two credential types

| Credential | Used for | Where it comes from |
|---|---|---|
| **Client ID + Client Secret** | End-user OIDC login (Web application) | Zitadel project → Web app → Code (confidential) |
| **Personal Access Token (PAT)** | Admin API — user creation, migration | Zitadel machine user (service account) |

:::warning[Do not mix credentials]

The Web application's **Client Secret** is not the machine-user **PAT**. Using the Client Secret as `--pat=` causes `invalid_client` / authentication failures on migration.

:::

## Setup flow (high level)

1. [Create Zitadel instance and Web application](/platform-features/identity-providers/zitadel/setup) — redirect URIs, JWT tokens, refresh token
2. Save Client ID, Client Secret, and Base URL in CMP Social Login
3. [Create machine user and PAT](/platform-features/identity-providers/zitadel/machine-user-and-pat) — required for migrating existing CMP users
4. [User migration](/platform-features/identity-providers/zitadel/user-migration) — existing accounts are migrated by the StackConsole team
5. Set Keycloak **Status** to **Inactive** in Social Login if Zitadel is the sole active SSO provider

## Configuration summary

Replace `{APP_URL}` with your CMP frontend base URL (no trailing slash unless your deployment uses one).

| Setting | Required value |
|---|---|
| Application type | **Web** |
| Authentication method | **Code** (confidential / Basic) |
| Redirect URI 1 | `{APP_URL}/socialite/zitadel/callback` |
| Redirect URI 2 | `{APP_URL}/socialite/zitadel/handle-callback` |
| Redirect URI 3 | `{APP_URL}/affiliate/socialite/zitadel/callback` |
| Redirect URI 4 | `{APP_URL}/affiliate/socialite/zitadel/handle-callback` |
| Development Mode | Enable only when `{APP_URL}` uses `http://` |
| Post Logout Redirect URIs | Leave empty |
| Auth token type | **JWT** |
| Refresh token | **Enabled** |
| User info in ID token | Recommended: **Enabled** |

:::info[Client ID vs Application UUID]

The Web application's **Client ID** shown in Zitadel is **not** the Application UUID in the browser URL. Copy the Client ID from the application details screen.

:::

## Pages in this section

* [Setup](/platform-features/identity-providers/zitadel/setup) — instance, Web app, CMP Social Login
* [Machine user & PAT](/platform-features/identity-providers/zitadel/machine-user-and-pat) — permissions for user migration
* [User migration](/platform-features/identity-providers/zitadel/user-migration) — migrate existing CMP users

## Related

* [Identity Providers](/platform-features#identity-providers)
