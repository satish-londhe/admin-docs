---
sidebar_position: 4
title: "Zitadel User Migration"
tags: ["platform", "identity", "sso", "zitadel", "migration"]
---

# Zitadel — User Migration

Migrate existing CMP users into Zitadel so they can sign in through **Login with Zitadel** using the same email address.

:::tip[Recommended workflow]

Confirm central Zitadel settings → confirm PAT permissions → seed email template once → `--dry-run` → live migration with `--send-email` → verify login for a migrated user.

:::

## Prerequisites

* Zitadel Social Login **Active** in CMP central (tenant DBs are skipped when Zitadel is disabled for that tenant)
* Social Login contains **Client ID** and **Base URL**
* [Machine user PAT](/platform-features/identity-providers/zitadel/machine-user-and-pat) with permission to create users
* Set Keycloak **Status** to **Inactive** in **Admin → Settings → Social Login** when Zitadel is the active SSO provider

| Role | Where | Why |
|---|---|---|
| **Org Owner** | Default organization → Managers | Create users in that organization |
| **IAM Owner** | Instance → Managers | Required when CMP creates a new organization per account |

## Migration behavior

* If the CMP user is already linked in `oauth_providers` with `provider = zitadel`, the user is **skipped** unless `--force` is used
* If the email already exists in Zitadel, the existing Zitadel user ID is **linked**; the email is not changed
* If the email does not exist in Zitadel, the command **creates** a human user, stores `oauth_providers.provider_id`, and assigns a Zitadel organization using `{email-local}-{crn}`
* Email matching is **case-insensitive**
* The command migrates identity/links only; with `--send-email` it sends the CMP “sign-in is ready” notification for **newly created** Zitadel users. It does not log the user in

### Password migration

| CMP user password state | What Zitadel receives |
|---|---|
| Usable bcrypt / argon2 / similar hash | Hash imported as `hashedPassword` — same password may work if import succeeds |
| No usable hash (null, SSO-only, password removed) | Random password — user must reset or use SSO flow |

`$2y$` bcrypt hashes are sent as `$2a$` for Zitadel compatibility.

## Seed notification template (once)

From the application server (`~/cmp-app`):

```bash
php artisan db:seed --class=Modules\\EmailTemplates\\Database\\Seeders\\ZitadelAccountCreatedEmailTemplateSeeder
```

## Run the migration

Always preview first:

```bash
php artisan zitadel:migrate-users --dry-run
php artisan zitadel:migrate-users --dry-run --pat=YOUR_PAT
```

Live migration:

```bash
php artisan zitadel:migrate-users --send-email
php artisan zitadel:migrate-users --pat=YOUR_PAT --send-email
php artisan zitadel:migrate-users --email=user@example.com --pat=YOUR_PAT --send-email
```

Single user re-link (e.g. user deleted in Zitadel but CMP still has old link):

```bash
php artisan zitadel:migrate-users --pat=YOUR_PAT --force --email=user@example.com --send-email
```

Optional Zitadel password-reset email in addition to CMP notification:

```bash
php artisan zitadel:migrate-users --pat=YOUR_PAT --send-email --send-reset-link
```

### Command options

| Option | Purpose |
|---|---|
| `--dry-run` | Preview create vs link without writing to Zitadel or CMP |
| `--email=` | Process only the specified CMP email |
| `--force` | Re-link users that already have a Zitadel `oauth_providers` row |
| `--send-email` | Send CMP “sign-in is ready” email for newly created Zitadel users |
| `--send-reset-link` | Send Zitadel password-reset email after successful create/link |
| `--pat=` | Bearer PAT for this run (or use stored Social Login PAT) |
| `--delay=2000` | Milliseconds before each Zitadel call (default **2000**) |
| `--tenants=` | Multi-tenant: process selected tenant IDs only |

:::warning[Rate limits on Zitadel Cloud]

Do **not** lower `--delay` on Zitadel Cloud. The command pauses 20 seconds every 8 users and retries HTTP 429 with backoff (up to 8 attempts, 30–120 s). If 429 persists, wait and rerun — already-linked users are skipped.

:::

## What happens per user (live run)

| Case | Result |
|---|---|
| Already in `oauth_providers` as Zitadel | **Skip** |
| Email already exists in Zitadel | **Link only** — no CMP “account ready” email |
| Email does not exist in Zitadel | **Create**, then send CMP email if `--send-email` |

## Migration summary columns

| Column | Meaning |
|---|---|
| **Created** | New Zitadel users (or dry-run users that would be created) |
| **Linked by email** | Email existed in Zitadel; CMP link updated |
| **Skipped** | No email, already linked without `--force`, or skipped context |
| **Failed** | Create/link failed — review output and logs |
| **Reset links** | Password-reset emails sent by `--send-reset-link` |

Exit code **1** when there is a failure, missing token on a live run, or **AUTHZ-cdgFk** (PAT cannot create users).

## Multi-tenant processing

* Non-regular systems: **central** processed first, then tenant databases
* Context skipped when Zitadel Social Login is not enabled for that tenant
* Users read from current DB; `oauth_providers` uses the central connection
* When already inside a tenant via `tenants:run`, only that tenant is processed

## Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| `client not found` / `invalid_client` | Web Client ID used for API | Use machine-user PAT, not Web app secret |
| **AUTHZ-cdgFk** | PAT lacks create-user permission | Grant **Org Owner** or **IAM Owner** |
| HTTP 429 | Zitadel Cloud rate limit | Keep `--delay=2000` or higher; rerun later |
| Created 0, skipped all | Users already linked | Expected; use `--force` only to re-link intentionally |
| Tenant skipped | Zitadel disabled on tenant | Enable for tenant or migrate central only |
| User created but cannot log in | Random password or hash import failed | `--send-reset-link` or reset in Zitadel Console |
| `WebAuthN.BeginLoginFailed` | Console MFA/passkey policy | Use alternative auth method or adjust Zitadel policy |

## After migration

1. From CMP, choose **Login with Zitadel** and sign in with the migrated email
2. New users created later in CMP are synced automatically when Zitadel is active — this procedure is for **existing** users only

## Related

* [Machine user & PAT](/platform-features/identity-providers/zitadel/machine-user-and-pat)
* [Zitadel setup](/platform-features/identity-providers/zitadel/setup)
