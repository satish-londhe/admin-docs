---
sidebar_position: 8
title: "Keycloak SSO Requirements"
tags: ["installation", "keycloak", "sso", "authentication", "requirements"]
---

# Keycloak SSO Requirements

This page covers the Keycloak-specific requirements for enabling Single Sign-On (SSO) with CMP. Complete the [common prerequisites](/installation/prerequisites) first.

:::info
Keycloak SSO is an **optional** integration. CMP works without Keycloak using its built-in authentication. Keycloak is required only when you want to enforce centralized identity management or enterprise SSO.
:::

---

## Important Considerations Before Enabling Keycloak

Read these carefully before proceeding with Keycloak setup:

### Existing CMP Users
If existing CMP customers need to use Keycloak after it is enabled:
- All existing users must be **manually registered in Keycloak**
- The email address used in Keycloak **must exactly match** the email used in CMP
- Social logins (Google, GitHub) must be **re-configured in Keycloak** (they cannot be carried over from CMP)

### Disabling Keycloak Later
If you later need to disable Keycloak after it was enabled:
- CMP does not store passwords (Keycloak manages them), so all users will need to **reset their passwords**
- Social logins must be **re-configured in CMP** (they are not automatically restored)

### Super Admin in Keycloak
🔴 If the Super Admin email is already registered in CMP but not yet in Keycloak:
- An admin user **must be created in Keycloak** with the exact same email address **before enabling SSO**
- Failing to do this will lock the Super Admin out of CMP after SSO is enabled

---

## CMP ↔ Keycloak Logout Flow

When a user logs out of CMP:
1. CMP redirects the user to Keycloak's logout endpoint with a `redirect_uri` pointing back to CMP
2. Keycloak clears its session
3. Keycloak redirects the user back to CMP (post-logout landing)

This ensures a complete single-logout experience across all Keycloak-integrated apps.

---

## Keycloak Requirements

### Option A — Share Admin Credentials

If you are comfortable sharing admin credentials with the StackConsole team, provide:

| Field | Value |
|---|---|
| Keycloak URL | |
| Admin Username | |
| Admin Password | |

---

### Option B — Provide Client ID & Secret (Self-Service Setup)

If admin credentials cannot be shared, follow these steps to create a Keycloak client and share only the client credentials:

#### Step 1 — Log in and Create a Realm

Log into the Keycloak Admin Console and create a new Realm for CMP.

#### Step 2 — Create an OpenID Connect Client

Go to **Clients → Create Client** with type **OpenID Connect** and configure:

| Setting | Value |
|---|---|
| Root URL | Frontend CMP URL (e.g., `https://portal.yourcompany.com`) |
| Home URL | Same as Root URL |
| Valid Redirect URIs | Backend API URL callback (e.g., `https://api.yourcompany.com/socialite/keycloak/callback`) |
| Valid Redirect URIs (additional) | `https://api.yourcompany.com/socialite/keycloak/handle-callback` |
| Valid Post Logout Redirect URLs | `https://portal.yourcompany.com/*` |
| Web Origins | `https://portal.yourcompany.com` |

:::info
**Valid Redirect URIs** are the callback URLs inside Keycloak — where Keycloak sends the user after a successful login. These must match exactly what CMP expects.
:::

#### Step 3 — Enable Registration Settings

Go to **Realm Settings → Login** and enable:

- ✅ User Registration
- ✅ Forgot Password
- ✅ Email as Username
- ✅ Edit Username
- ✅ Verify Email

#### Step 4 — Collect and Share Client Credentials

Gather the following from the Keycloak client you created and share with the StackConsole team:

| Field | Value |
|---|---|
| `KEYCLOAK_CLIENT_ID` | |
| `KEYCLOAK_CLIENT_SECRET` | |
| `KEYCLOAK_REALM_ID` | |

---

## Required API Roles for Keycloak Service Account

To allow CMP to create and manage users via the Keycloak Admin API, the following **realm-management** roles must be assigned to the client's service account:

Navigate to: **Keycloak Admin Console → Clients → `<your-client>` → Service Account Roles**

Assign:
- `query-users`
- `view-realm`
- `query-groups`
- `manage-users`
- `realm-admin`
- `view-users`

These roles allow CMP to create users, reset passwords, and manage user lifecycle via the Keycloak API.

---

## Keycloak Checklist

Complete before enabling SSO integration:

- [ ] Super Admin email exists in Keycloak (with matching email as in CMP)
- [ ] All existing CMP users have been registered in Keycloak with matching emails
- [ ] Keycloak client created with correct redirect URIs
- [ ] Registration settings enabled (User Registration, Forgot Password, Email as Username, etc.)
- [ ] Client credentials (`CLIENT_ID`, `CLIENT_SECRET`, `REALM_ID`) collected
- [ ] Service account roles assigned to the client
- [ ] Keycloak URL accessible from CMP server

**Provide one of:**
- [ ] Admin credentials (Option A), **or**
- [ ] Client credentials `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET`, `KEYCLOAK_REALM_ID` (Option B)

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [Keycloak SSO Integration Setup](/auth/keycloak)
- [2FA Configuration](/auth/2fa)
- [Initial Super Admin Setup](/installation/initial-setup)
