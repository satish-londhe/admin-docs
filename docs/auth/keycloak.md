---
sidebar_position: 1
title: "Keycloak Integration Setup"
tags: ["auth", "sso"]
---

# Keycloak Integration Setup

CMP supports Keycloak as an external identity provider for SSO, social login (Google, GitHub), and 2FA.

## When to use Keycloak

* You want customers to use SSO instead of CMP-native passwords
* You need social login (Google, GitHub)
* You want centralized identity management

## Important migration notes

### Enabling Keycloak for existing CMP customers

* All existing customers must be **manually registered in Keycloak**
* The Keycloak email address must **exactly match** the CMP email address
* Social logins (Google, GitHub) must be reconfigured in Keycloak by each customer

### Disabling Keycloak for existing customers

* CMP does not store passwords, so all customers will need to use "Forgot Password" after disabling
* Social logins must be reconfigured back in CMP by customers

### Super admin registration

* If the super admin email exists in CMP but not in Keycloak, create an admin user in Keycloak manually using the same email

## Option 1: Share admin credentials

If you can share Keycloak admin credentials with the SC Team:

| Field | Value |
| --- | --- |
| Keycloak URL |  |
| Admin Username |  |
| Admin Password |  |

## Option 2: Create API Key and Secret

If sharing admin credentials is not possible, create a client and share credentials:

### Step 1: Log in to Keycloak Admin Console and Create Realm

### Step 2: Create a Client (OpenID type)

| Setting | Value |
| --- | --- |
| Root URL | Frontend CMP URL (e.g. `https://example.com`) |
| Home URL | Same as Root URL |
| Valid Redirect URIs | Backend API URL (e.g. `https://api.example.com/socialite/keycloak/callback` and `/handle-callback`) |
| Valid Post Logout Redirect URI | Frontend URL + `/*` |

### Step 3: Enable Registration settings

Go to **Realm Settings → Login** and enable:

* User Registration
* Forgot Password
* Email as Username
* Edit Username
* Verify Email

### Step 4: Share these credentials with SC Team

| Field | Value |
| --- | --- |
| `KEYCLOAK_CLIENT_ID` |  |
| `KEYCLOAK_CLIENT_SECRET` |  |
| `KEYCLOAK_REALM_ID` |  |

## Required API roles for the service account

Go to **Clients →** `<your client>` **→ Service Account Roles** and assign:

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