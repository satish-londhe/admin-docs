---
sidebar_position: 4
title: "Zitadel User Migration"
tags: ["platform", "identity", "sso", "zitadel", "migration"]
---

# Zitadel — User Migration

When transitioning to Zitadel, existing CMP accounts can be migrated so that users can seamlessly sign in through **Login with Zitadel** using their registered email addresses.

---

## Migration Responsibility

:::important[Performed by StackConsole Team]

All user migration activities for existing accounts are **performed directly by the StackConsole Engineering & Support Team**.

Cloud provider admins do **not** need to execute CLI commands or manage backend migration scripts manually. If you are enabling Zitadel and have existing customer accounts to migrate, contact the StackConsole team to schedule and execute the migration.

:::

---

## What the StackConsole Team Handles

During the migration process, the StackConsole team takes care of:

1. **Pre-flight & Configuration Validation:**
   * Verifying that Zitadel Social Login settings (Base URL, Client ID, Client Secret, and PAT permissions) are properly configured.
   * Ensuring default organization permissions (**Org Owner** / **IAM Owner**) are active.
2. **Notification Seeding:**
   * Seeding the transactional email templates used to notify users once their account sign-in is ready.
3. **Dry-Run Validation:**
   * Executing a preview migration run (`--dry-run`) to verify user accounts, detect existing links, and validate email matching without writing changes.
4. **Live User Migration:**
   * Linking accounts whose email already exists in Zitadel.
   * Creating new Zitadel user records for unlinked CMP users.
   * Applying rate-limiting delays and backoff handling to prevent API throttling on Zitadel Cloud.
5. **Post-Migration Verification:**
   * Validating that existing users can authenticate via **Login with Zitadel**.

---

## Migration Behavior Overview

For your awareness, the automated migration follows these operational rules:

| Condition | Behavior |
|---|---|
| **User already linked to Zitadel** | **Skipped** — existing links are retained. |
| **Email already registered in Zitadel** | **Linked** — CMP maps the existing Zitadel user ID to the CMP profile. |
| **Email does not exist in Zitadel** | **Created** — a user profile is created in Zitadel under the appropriate organization, and an account-ready email notification is triggered. |
| **Email matching** | **Case-insensitive** match on registered user email addresses. |
| **New signups after enablement** | Any new customers registering in CMP are synced automatically in real time; migration is only required for pre-existing accounts. |

---

## Summary of Admin Tasks

Before the StackConsole team runs the migration:

1. Complete the standard [Zitadel Setup](/platform-features/identity-providers/zitadel/setup) in **Admin → Settings → Social Login → Zitadel**.
2. If requested by the team, configure the [Machine User & PAT](/platform-features/identity-providers/zitadel/machine-user-and-pat) with **Org Owner** role in Zitadel.
3. Coordinate with the StackConsole deployment team to schedule the user migration.

---

## Related

* [Zitadel Overview](/platform-features/identity-providers/zitadel/)
* [Zitadel Setup](/platform-features/identity-providers/zitadel/setup)
* [Machine User & PAT](/platform-features/identity-providers/zitadel/machine-user-and-pat)
* [Identity Providers](/platform-features#identity-providers)
