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
| **Status** | For example **Pending** until included in a payout batch and marked paid by admin |
| **Settlement Date** | When the **Payout Holding Duration** ends — commission becomes eligible for the **next monthly payout run**. **Not** the date money is sent. See [Settlement Date](#settlement-date) below |
| **Created At** | When the commission was recorded |

Use search, refresh, and table settings to manage the view.

---

## Settlement Date

**Settlement Date** answers: *“When does this commission finish the holding period?”*

```
Settlement Date ≈ Created At + Payout Holding Duration (days)
```

![Screenshot: Affiliate — Settlement Date examples](/img/screenshots/cmp-affiliate-dashboard-commissions-settlement-date.png)

| Example | Created At | Holding | Settlement Date |
|---|---|---|---|
| **30-day hold** | 08/19/2026 04:04 PM | 30 days | **09/18/2026 04:04 PM** |
| **0-day hold** | 08/19/2026 04:21 PM | 0 days | **08/19/2026 04:21 PM** (same as created) |

:::important[Settlement Date ≠ payment date]

**Settlement Date** is when the commission becomes **eligible** for the provider’s next **monthly payout batch** (on the program **Payout Schedule on Day**), if your balance meets the **Minimum Payout Threshold**.

You are paid only after an admin **manually transfers** funds and marks the payout **paid**. CMP does not send money automatically.

Full timeline and examples: [When does the affiliate get paid?](/platform-features/affiliate/admin/program-commissions-payouts#when-does-the-affiliate-get-paid)

:::

:::info[When commissions pay out]

Commissions appear in **Affiliate Payouts (Admin)** only after the program **Payout Holding Duration** and other eligibility rules are met — [Payout eligibility](/platform-features/affiliate/admin/program-commissions-payouts#payout-eligibility). All payouts are **manual** — admins transfer funds and mark paid.

:::

Admins can also add manual commissions from [Affiliate Details → Commissions](/platform-features/affiliate/admin/affiliate-details#commissions).

---

## Related

* [Referred Signups](/platform-features/affiliate/affiliate-dashboard/referred-signups)
* [Payouts](/platform-features/affiliate/affiliate-dashboard/payouts)
* [Program, Commissions & Payouts (Admin)](/platform-features/affiliate/admin/program-commissions-payouts)
