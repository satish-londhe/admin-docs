---
sidebar_position: 4
title: "Commissions"
tags: ["platform", "affiliate", "dashboard", "commissions"]
---

# Commissions

**Path:** **Report → Commissions**

View commission rows earned from referred customers. Commission type is **PERCENTAGE** only in the current release — see [Commission settings (Admin)](/platform-features/affiliate/admin/program-commissions-payouts#commission-settings-program-level).

---

## Pending Commissions

Shows commissions not yet settled into a payout.

![Screenshot: Affiliate — Pending Commissions](/img/screenshots/cmp-affiliate-dashboard-commissions-pending.png)

---

## Commission History

Shows all commission records including settled and pending rows.

![Screenshot: Affiliate — Commission History](/img/screenshots/cmp-affiliate-dashboard-commissions-history.png)

---

## Table columns

| Column | Description |
|---|---|
| **Customer ID** | Referred customer CRN |
| **Customer Name** | Customer display name |
| **Rate** | Commission percentage — for example **20.00** for 20% |
| **Type** | **Percentage** (only type in current release) |
| **Description** | Source of commission — for example automatic accrual or `Manual Commission From Admin` |
| **Amount** | Commission dollar amount |
| **Status** | For example **Pending** until included in a payout |
| **Settlement Date** | Expected or actual settlement timestamp |
| **Created At** | When the commission was recorded |

Use search, refresh, and table settings to manage the view.

:::info[When commissions pay out]

Commissions appear in **Affiliate Payouts (Admin)** only after the program **Payout Holding Duration** and other eligibility rules are met — [Payout eligibility](/platform-features/affiliate/admin/program-commissions-payouts#payout-eligibility). All payouts are **manual** — admins transfer funds and mark paid.

:::

Admins can also add manual commissions from [Affiliate Details → Commissions](/platform-features/affiliate/admin/affiliate-details#commissions).

---

## Related

* [Referred Signups](/platform-features/affiliate/affiliate-dashboard/referred-signups)
* [Payouts](/platform-features/affiliate/affiliate-dashboard/payouts)
* [Program, Commissions & Payouts (Admin)](/platform-features/affiliate/admin/program-commissions-payouts)
