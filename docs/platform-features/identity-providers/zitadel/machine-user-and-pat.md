---
sidebar_position: 3
title: "Zitadel Machine User & PAT"
tags: ["platform", "identity", "sso", "zitadel", "pat", "migration"]
---

# Zitadel — Machine User & PAT

Create a Zitadel **service account (machine user)** and **Personal Access Token (PAT)** so CMP can create or link users during [user migration](/platform-features/identity-providers/zitadel/user-migration).

The Web OIDC application's **Client Secret** and the machine-user **PAT** are different credentials:

| Credential | Purpose |
|---|---|
| Client Secret | End-user OIDC login |
| PAT | Administrative API (create/migrate users) |

## Step 1 — Create service account

**Path:** Zitadel Console → **Users** → **Service Accounts** → **+ New**

Choose a **Machine / Service Account** user (not Human).

| Field | Example / value |
|---|---|
| **User Name** | `cmp-admin` |
| **Name** | `cmp-admin` |
| **Description** | Optional |
| **Access Token Type** | **Bearer** |


![Screenshot: New service account form](/img/screenshots/zitadel/zitadel-service-account-new.png)

![Screenshot: Service account cmp-admin with Bearer token type](/img/screenshots/zitadel/zitadel-service-account-cmp-admin.png)

Click **Create**.

## Step 2 — Generate Personal Access Token

Open the `cmp-admin` service account → **Personal Access Tokens** → **+ New**.

Set an expiration date if your policy requires it. Click **Add/Create** and **copy the token immediately**.


![Screenshot: Generate new Personal Access Token](/img/screenshots/zitadel/zitadel-pat-generate.png)

:::warning[Copy the PAT once]

Treat the PAT as a secret. Do not commit it to source control, logs, tickets, or documentation. Store only in **Admin → Settings → Social Login → Zitadel → PAT**.

:::

## Step 3 — Grant permissions

A PAT without sufficient permission can authenticate but **cannot create users**.

### Option A — Default organization (usual setup)

**Path:** **Organization** → use the **+** administrator control in the organization header.

![Screenshot: Organization — add administrator](/img/screenshots/zitadel/zitadel-org-add-administrator.png)

1. Select the `cmp-admin` machine user
2. Assign **Org Owner**
3. Click **Add**


![Screenshot: Add cmp-admin as Org Owner](/img/screenshots/zitadel/zitadel-org-owner-role.png)

### Option B — Whole instance

**Path:** **Instance → Managers**

1. Add `cmp-admin`
2. Assign **IAM Owner**

Use Option B when CMP must perform instance-level operations, including setups that create a new organization per account.

:::important[Project grants are not enough]

Do not rely only on project-level grants for migration. Use **Org Owner** on the default organization, or **IAM Owner** where instance-wide access is required.

:::

## Step 4 — Save PAT in CMP

**Path:** **Admin → Settings → Social Login → Zitadel → Edit**

Paste the PAT into the **PAT** field and save.

On later edits, **leave PAT blank** if CMP should keep the already stored token.

## PAT setup checklist

- [ ] Service account exists (`cmp-admin` or equivalent)
- [ ] Access token type is **Bearer**
- [ ] PAT generated and copied securely
- [ ] `cmp-admin` has **Org Owner** (default org) or **IAM Owner** (instance-wide)
- [ ] PAT stored in CMP Social Login
- [ ] Web OIDC Client Secret is **not** used as the PAT

## Related

* [User migration](/platform-features/identity-providers/zitadel/user-migration)
* [Zitadel setup](/platform-features/identity-providers/zitadel/setup)
