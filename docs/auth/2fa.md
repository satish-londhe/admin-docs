---
sidebar_position: 2
title: "Two-Factor Authentication (2FA)"
tags: ["auth"]
---

# Two-Factor Authentication (2FA)

## Enforcing 2FA for all users

To make 2FA mandatory for all users (admins, customers, and sub-users):

1. Go to **Admin Panel → Global Settings**
2. Set `enforce_2fa_to_all` to **true**

> ⚠️ **Before enabling:** Ensure the **Super Admin email is valid and accessible**. If the super admin cannot receive the 2FA email, they will be locked out after enforcement.

## Enforcing 2FA for a specific account only

If you want 2FA for just one account rather than all users:

1. Go to the user's **Profile section**
2. Enable 2FA from there — it applies only to that account

## 2FA and Keycloak

If Keycloak is enabled, 2FA is managed within Keycloak rather than CMP directly. Configure 2FA policies in **Keycloak Realm Settings → Authentication**.