---
sidebar_position: 2
title: "Keycloak"
tags: ["platform", "identity", "sso", "keycloak"]
---

# Keycloak

CMP supports Keycloak as an external identity provider for SSO, social login (Google, GitHub), and 2FA when Keycloak is the active provider.

:::tip[Installation checklist]

For redirect URI examples, service-account roles, and pre-flight checklist, see [Keycloak SSO requirements](/installation/orchestrator-requirements/keycloak).

:::

## When to use Keycloak

* Customers should sign in through enterprise SSO instead of CMP-native passwords
* Social login (Google, GitHub) is centralized in Keycloak
* Identity lifecycle is managed in Keycloak Admin Console

## Configure in CMP

**Path:** **Admin → Settings → Social Login → Keycloak**

Store Client ID, Client Secret, and realm/base URL in Social Login settings. Do not use `.env` for production IdP credentials.

## Important migration notes

### Enabling Keycloak for existing CMP customers

* All existing customers must be **manually registered in Keycloak**
* The Keycloak email address must **exactly match** the CMP email address
* Social logins (Google, GitHub) must be reconfigured in Keycloak by each customer

### Disabling Keycloak for existing customers

* CMP does not store passwords when Keycloak is active, so customers need **Forgot Password** after disabling SSO
* Social logins must be reconfigured back in CMP by customers
* Turn off Keycloak in **Admin → Settings → Social Login** (set **Status** to **Inactive**)

### Super admin registration

If the super admin email exists in CMP but not in Keycloak, create an admin user in Keycloak manually using the **same email** before enabling SSO.

## Keycloak client setup (summary)

Create an **OpenID Connect** client in your Keycloak realm:

| Setting | Value |
|---|---|
| Root URL | Frontend CMP URL (e.g. `https://portal.example.com`) |
| Home URL | Same as Root URL |
| Valid Redirect URIs | Backend API URL + `/socialite/keycloak/callback` and `/socialite/keycloak/handle-callback` |
| Valid Post Logout Redirect URI | Frontend URL + `/*` |

Enable under **Realm Settings → Login**: User Registration, Forgot Password, Email as Username, Edit Username, Verify Email.

### Service account roles

On **Clients →** *your client* **→ Service Account Roles**, assign:

* `query-users`
* `view-realm`
* `query-groups`
* `manage-users`
* `realm-admin`
* `view-users`

## Logout flow

1. User logs out of CMP
2. CMP redirects to Keycloak's logout endpoint with a `redirect_uri` back to CMP
3. Keycloak clears the session and redirects back to CMP

## Related

* [Identity Providers](/platform-features#identity-providers)
* [Keycloak SSO requirements](/installation/orchestrator-requirements/keycloak)
* [Zitadel](/platform-features/identity-providers/zitadel/)
* [2FA](/platform-features/identity-providers/2fa)
