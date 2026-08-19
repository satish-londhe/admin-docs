---
sidebar_position: 3
title: "Affiliate Details (Admin)"
tags: ["platform", "affiliate", "admin"]
---

# Affiliate Details (Admin)

Open an active affiliate from **Affiliates → Manage Affiliates → Active Affiliates** to manage account data, referrals, commissions, and settings.

**Path:** **Affiliates → Manage Affiliates → Active Affiliates** → **View** (eye icon)

---

## Affiliate header

The header shows summary information and quick actions for the selected affiliate:

| Area | Examples |
|---|---|
| **Profile** | Name, email, CRN, contact number, address |
| **Status** | **ACTIVE** |
| **State** | **ONBOARDING_COMPLETE** |
| **Signup date** | Registration timestamp |
| **Affiliate for** | Duration since approval |
| **Last login** | Last affiliate portal login |

Quick actions may include **login as affiliate**, **reset password**, **send message**, and **manage profile**.

---

## Detail tabs

| Tab | Purpose |
|---|---|
| [Summary](#summary) | Performance stats and referral link |
| [Account Details](#account-details) | Edit name, address, currency, status |
| [Tax Documents](#tax-documents) | W8 / W9 uploads from registration |
| [Referred Signups](#referred-signups) | Customers who registered via this affiliate |
| [Commissions](#commissions) | Earned commissions per referred customer |
| [Payout History](#payout-history) | Past payout records |
| [Commission Setting](#commission-setting) | Program and commission rules for this affiliate |
| [Activity Logs](#activity-logs) | Login and general activity |
| [Authentication](#authentication) | Security and login settings |

---

## Summary

![Screenshot: Admin — Affiliate Summary tab](/img/screenshots/cmp-affiliate-admin-summary.png)

**Performance stats**

| Metric | Description |
|---|---|
| **Total Clicks** | Referral link clicks |
| **Today Sign Up** | Signups today |
| **Conversions** | Conversion rate |

**Referral information**

| Item | Description |
|---|---|
| **Your Unique Referral Link** | Full URL — copy or open in new tab |
| **Your Unique Referral code** | Short code customers can use at signup |
| **Social sharing** | Share link on Facebook, Twitter, LinkedIn |

Affiliates see the same referral information on their dashboard after login.

---

## Account Details

![Screenshot: Admin — Affiliate Account Details tab](/img/screenshots/cmp-affiliate-admin-account-details.png)

Admins can update affiliate account fields:

| Field | Description |
|---|---|
| **Name** | Affiliate display name |
| **Email** | Registered email |
| **Address** | Billing address lines |
| **Country / State / City** | Location dropdowns |
| **Postal Code** | ZIP or postal code |
| **Status** | For example **ACTIVE** |
| **Billing Details — Currency** | Payout currency — for example **USD** |

Click **Submit** to save changes.

---

## Tax Documents

Review **W8** and **W9** documents uploaded during [registration Step 2](/platform-features/affiliate/registration#step-2--account-details) (optional at signup).

Use this tab to confirm tax information before payouts — see [Taxation](/platform-features/affiliate/admin/program-commissions-payouts#taxation-w-8--w-9).

---

## Referred Signups

Lists customers who registered using this affiliate's link or code.

![Screenshot: Admin — Referred Signups (empty)](/img/screenshots/cmp-affiliate-admin-referred-signups-empty.png)

![Screenshot: Admin — Referred Signups with data](/img/screenshots/cmp-affiliate-admin-referred-signups.png)

| Column | Description |
|---|---|
| **CRN** | Customer reference number |
| **Name** | Customer name |
| **Commission** | Commission attributed to this referral |
| **Status** | Customer account status — for example **ACTIVE** |
| **Created At** | Signup timestamp |

CMP stores the affiliate–customer relationship when the customer registers via the referral link.

---

## Commissions

![Screenshot: Admin — Affiliate Commissions tab](/img/screenshots/cmp-affiliate-admin-commissions.png)

View commission rows for referred customers.

| Column | Description |
|---|---|
| **Customer ID** | Referred customer |
| **Customer Name** | Customer display name |
| **Rate** | Commission rate value |
| **Type** | **Percentage** (only commission type in current release) |
| **Amount** | Calculated commission |
| **Payable Amount** | Amount eligible for payout after holding duration and other program rules |
| **Status** | For example **Pending** |
| **Created At** | When commission was recorded |

### Add custom commission

Admins can add a **manual commission** from the **+ Add Commission** button.

![Screenshot: Admin — Add Custom Commission](/img/screenshots/cmp-affiliate-admin-add-commission.png)

| Field | Description |
|---|---|
| **Select Customer** | Referred customer for this commission |
| **Amount ($)** | Manual commission amount |
| **Description** | For example `Manual Commission From Admin` |

Use manual commissions for adjustments or special cases — including **debits** for chargebacks where your process supports assigning debits to the commission account.

Click **Submit** to save.

---

## Payout History

Shows past payouts for this affiliate — amounts, settlement dates, and paid status.

Pending amounts do **not** appear here until they pass the program **Payout Holding Duration** and are generated on a settlement day — see [Payout eligibility](/platform-features/affiliate/admin/program-commissions-payouts#payout-eligibility).

Admins transfer funds externally and mark payouts as **paid** in **Affiliates → Affiliate Payouts** — [Mark as paid](/platform-features/affiliate/admin/program-commissions-payouts#mark-as-paid). All payouts are manual; CMP does not automate fund transfer.

---

## Commission Setting

![Screenshot: Admin — Affiliate Commission Setting tab](/img/screenshots/cmp-affiliate-admin-commission-setting.png)

Shows the **Affiliate Program** and commission rules assigned to this affiliate. Use **+ CHANGE PROGRAM** to assign a different program.

Typical fields (from assigned program):

| Field | Example |
|---|---|
| **Program Name** | Stack Console Affiliate Program |
| **Commission Type** | **Percentage** (only option in current release) |
| **Payout Schedule Frequency** | **Monthly** (only option in current release) |
| **Minimum Payout Threshold Amount** | 1000 (program-specific; example programs may use USD 100) |
| **Payout Holding Duration (in days)** | 30 (example; programs may use 45 days) — commissions do not appear in **Affiliate Payouts** until this many days have passed |
| **Commission on Renewal of Services** | Applicable or not |

Full program configuration: [Program, Commissions & Payouts](/platform-features/affiliate/admin/program-commissions-payouts).

---

## Activity Logs

![Screenshot: Admin — Affiliate Activity Logs tab](/img/screenshots/cmp-affiliate-admin-activity-logs.png)

**Sub-tabs:** **Login Activity** · **General Activity**

| Column | Description |
|---|---|
| **Action** | For example `USER.LOGOUT` |
| **Description** | Event detail |
| **Email** | Affiliate email |
| **IP Address** | Client IP |
| **Created At** | Timestamp |
| **Status** | Success or failure |

---

## Authentication

Manage affiliate login and security settings (password reset, authentication policy) from this tab.

---

## Related

* [Manage Affiliates (Admin)](/platform-features/affiliate/admin/manage-affiliates)
* [Affiliate Workflow](/platform-features/affiliate/admin/workflow)
* [Program, Commissions & Payouts](/platform-features/affiliate/admin/program-commissions-payouts)
