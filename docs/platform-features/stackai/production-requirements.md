---
sidebar_position: 2
title: "Production Requirements"
tags: ["platform", "stackai", "beta", "admin", "openai", "production"]
---

# Production StackAI Requirements

What cloud provider administrators need before enabling **StackAI** in a production CMP deployment.

:::info[Beta]

StackAI is in **beta**. Confirm with StackConsole which StackAI features are enabled on your deployment and where to enter provider credentials in CMP.

:::

StackAI uses the **OpenAI API** for natural-language planning and replies. For production, use **your own OpenAI organization account** with billing enabled — do not rely on shared or trial keys that can hit limits without warning.

This page covers OpenAI account setup and API key creation. End-user behaviour is documented in the [StackAI User Guide](/platform-features/stackai/user-guide).

---

## Before you begin

| Requirement | Detail |
|---|---|
| **OpenAI account** | Organization owner or admin access at [platform.openai.com](https://platform.openai.com) |
| **Billing** | Payment method on file — pay-as-you-go or prepaid credits |
| **API key** | Secret key created for this deployment (starts with `sk-`) |
| **Usage controls** | Recommended: monthly budget or usage limit in OpenAI billing settings |

:::warning[Production billing]

Without active billing, OpenAI may stop API calls when credits run out. **Prepaid credits** or a **monthly budget alert** reduces the risk of StackAI going offline unexpectedly during customer use.

:::

---

## How to purchase and create an API key

### 1. Create or sign in to an OpenAI account

1. Go to [https://platform.openai.com](https://platform.openai.com).
2. Sign up for a new account or log in with your existing credentials.
3. Complete any organization verification OpenAI requires for your region.

### 2. Set up billing

1. Open **Organization → Billing** (or **Settings → Billing**, depending on the OpenAI UI).
2. **Add a payment method**.
3. Choose one of:
   - **Pay-as-you-go** — billed for actual token usage each cycle.
   - **Prepaid credits** — recommended for production so usage does not stop unexpectedly when a soft limit is reached.
4. **Optional but recommended:** set a **monthly budget** or **usage limit** under billing settings so you get alerts before spend grows beyond plan.

### 3. Create an API key

1. Open **API keys** in the OpenAI platform.
2. Click **Create new secret key**.
3. **Name** the key for this deployment (for example `stackai-production` or `stackai-xyz`).
4. **Copy the key immediately** — OpenAI shows the full secret **only once**. It starts with `sk-`.

:::warning[Store the key securely]

Treat the API key like a password. Do not commit it to git, paste it into chat, or share it in email. Store it only in CMP's designated StackAI / OpenAI configuration (or your approved secrets manager) and restrict access to administrators who need it.

:::

---

## After you have the key

1. **Enter the key in CMP** using the StackAI or OpenAI settings your deployment exposes (confirm the exact path with StackConsole if it is not visible in your admin panel).
2. **Verify in a non-production environment first** when possible — send a simple StackAI request from the customer console and confirm replies stream normally.
3. **Monitor OpenAI usage** under **Organization → Billing → Usage** so production traffic stays within budget.
4. **Rotate the key** if it is exposed or when staff with access leave — create a new key in OpenAI, update CMP, then revoke the old key.

---

## Production checklist

- [ ] OpenAI account created or signed in
- [ ] Payment method added and billing active
- [ ] Prepaid credits or pay-as-you-go selected for production
- [ ] Monthly budget or usage limit configured (optional but recommended)
- [ ] API key created with a clear name (e.g. `stackai-production`)
- [ ] Key copied and stored securely; old drafts discarded
- [ ] Key configured in CMP StackAI / OpenAI settings
- [ ] StackAI tested from the customer console
- [ ] Usage monitoring and alert contacts defined for your team

---

## Related

* [StackAI overview](/platform-features/stackai/)
* [StackAI User Guide](/platform-features/stackai/user-guide) — end-user documentation
* [StackAI Roadmap](/platform-features/stackai/roadmap) — capabilities and planned work
* [Customer Dashboard](/platform-features/customer-dashboard/) — where customers open StackAI
