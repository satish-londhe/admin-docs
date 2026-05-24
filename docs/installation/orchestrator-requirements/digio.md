---
sidebar_position: 9
title: "DIGIO KYC Requirements"
tags: ["installation", "digio", "kyc", "identity-verification", "india"]
---

# DIGIO KYC Requirements

This page covers the DIGIO integration requirements for enabling automated KYC (Know Your Customer) verification in CMP.

:::warning
**DIGIO automated KYC is supported for India only.** If you are outside India, use the Manual KYC module instead.
:::

---

## KYC Module Options

CMP supports two KYC modes:

| Mode | Description | Availability |
|---|---|---|
| **Manual KYC** | Admin reviews uploaded documents manually | All regions |
| **Automated KYC (DIGIO)** | Automated identity verification via DIGIO | India only |

:::warning
**Important:** If automated KYC is enabled and made **compulsory**, only users who have a DIGIO-registered account with a matching email will be able to register on CMP. Plan your user migration accordingly before enabling this.
:::

---

## DIGIO Account Setup

### 1. Create a DIGIO Account

Sign up at [digio.in](https://www.digio.in/).

**Important:** When communicating with the DIGIO team, **specifically request a Sandbox account for testing**. Sandbox accounts are not provided by default.

### 2. Prepare Data for DIGIO Submission

When registering with DIGIO, you need the following URLs from your CMP deployment:

| Field | Value |
|---|---|
| Logo URL | `https://{YOUR_SITE_URL}/api/light-theme-logo` |
| Terms of Service URL | Add from Admin Panel → Settings → System → Branding Preferences |
| Refund Policy URL | Add under Legal Disclaimer URL in Branding Preferences |

---

## DIGIO Credentials

### Sandbox (Testing)

| Field | Value |
|---|---|
| `DIGIO_CLIENT_ID` / `API_KEY` | |
| `DIGIO_CLIENT_SECRET` / `API_SECRET` | |

### Production

| Field | Value |
|---|---|
| `DIGIO_CLIENT_ID` / `API_KEY` | |
| `DIGIO_CLIENT_SECRET` / `API_SECRET` | |

### DIGIO Portal Access

| Field | Value |
|---|---|
| Dashboard URL | `https://app.digio.in/` |
| Username | |
| Password | |

---

## DIGIO Workflow Configuration

CMP requires two KYC workflows to be created in the DIGIO portal — one for individual users and one for organizational users. We recommend getting a walkthrough from the DIGIO team, as their platform evolves regularly.

| Workflow | Purpose |
|---|---|
| **Individual User Workflow** | Used for individual customer identity verification |
| **Organization User Workflow** | Used for company/business customer verification |

Provide the workflow names once created:

| Field | Value |
|---|---|
| Individual User Workflow Name | |
| Organization User Workflow Name | |

---

## Creating a KYC Workflow in DIGIO

Follow these steps in the DIGIO portal to create each workflow:

**Step 1** — Log in to DIGIO → Click **Workflows** → Click **Create KYC Workflow**

**Step 2** — Enter a unique workflow name → Click **Next**

**Step 3** — Click the **Select Step** dropdown → Select **DigiLocker** → Click **Next**

**Step 4** — Select the **required documents** for KYC verification from customers

**Step 5** — Click **Skip** on the Add-ons screen

**Step 6** — Select **Auto Approval Rules** → Click **Next**

**Step 7** — Review and save the workflow

---

## DIGIO Checklist

Complete before enabling DIGIO KYC:

- [ ] DIGIO account created at [digio.in](https://www.digio.in/)
- [ ] Sandbox account requested from DIGIO team
- [ ] Sandbox credentials obtained and shared (`CLIENT_ID`, `CLIENT_SECRET`)
- [ ] Logo URL, Terms of Service URL, and Refund Policy URL prepared
- [ ] Individual KYC workflow created in DIGIO portal
- [ ] Organization KYC workflow created in DIGIO portal
- [ ] Workflow names provided to StackConsole team
- [ ] Production credentials obtained (after sandbox testing is complete)

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [Initial Super Admin Setup](/installation/initial-setup)
