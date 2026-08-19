---
sidebar_position: 4
title: "Program, Commissions & Payouts"
tags: ["platform", "affiliate", "billing", "commissions", "payouts"]
---

# Program, Commissions & Payouts

Configure affiliate programs, commission rules, payout methods, and taxation before and after affiliates register.

**Admin paths:**

* **Affiliates → Affiliate Programs**
* **Affiliates → Affiliate Commissions**
* **Affiliates → Affiliate Payouts**

---

## Affiliate Programs

**Path:** **Affiliates → Affiliate Programs**

Create an affiliate program **before** approving pending affiliates. Assign the program during [approval](/platform-features/affiliate/admin/manage-affiliates#approve-a-pending-affiliate).

![Screenshot: Admin — Affiliate Programs list](/img/screenshots/cmp-affiliate-admin-programs-list.png)

### Programs list

| Column | Description |
|---|---|
| **Name** | Program name — one program may be marked **Default** |
| **Commission Type** | **Percentage** (only option in current release) |
| **Commission Rate** | Percentage value — for example **20.00** (20%) |
| **Minimum Payout Threshold Amount** | Minimum balance before payout |
| **Status** | **Active** or inactive |
| **Created At** | Program creation timestamp |
| **Actions** | Edit or manage program (⋯ menu) |

Click **+ ADD PROGRAM** to create a program. Open **Actions** on a row to edit an existing program.

:::tip[Default program]

Mark one program as **Default** so new affiliates can be assigned a standard scheme quickly during approval. Only one program should be default at a time.

:::

---

### Add or update affiliate program

Open **+ ADD PROGRAM** or **Actions → Update** on a row to open the program form.

![Screenshot: Admin — Update Affiliate Program](/img/screenshots/cmp-affiliate-admin-update-program.png)

**Name**
*Required.* Display name for the program — for example, **Stack Console Affiliate Program** or **Affiliate5**.

**Payout Schedule Frequency**
*Required.* How often payouts are generated. **Only Monthly is supported** in the current release — select **Monthly** on the program form.

**Payout Schedule on Day (Ranges from 1 to 28 days)**
*Required.* Day of the month when payouts are scheduled — for example, **1** schedules payout on the **1st of every month**. Valid range is **1–28**. Applies to the monthly payout schedule.

**Commission Type**
*Required.* **PERCENTAGE** only — CMP calculates commission as a percentage of referred customer revenue. Select **PERCENTAGE** on the program form.

**Commission Rate**
*Required.* Percentage of referred customer revenue. Enter a numeric value where **5.00** = 5% and **20.00** = 20%.

**Minimum Payout Threshold Amount**
*Required.* Minimum payable balance before an affiliate appears in **Affiliate Payouts** — for example, **10.00** or **1000.00**.

**Payout Holding Duration (in days)**
*Required.* Number of days a commission must age before it becomes payable. CMP shows payouts in **Affiliate Payouts** only after this duration is met — see [Payout eligibility](#payout-eligibility). Example: **0** (immediate eligibility after other rules), **30**, or **45**.

**Terms and Conditions**
*Optional.* Rich-text terms affiliates accept during [registration Step 4](/platform-features/affiliate/registration#step-4--user-agreement).

**Status**
*Required.* **Active** or inactive — inactive programs cannot be assigned to new affiliates.

**Commissions on the Renewal of Services**
*Optional.* When checked, affiliates earn commission on service renewals and upgrades. When unchecked, commission applies to the initial purchase only.

**Mark as Default**
*Optional.* Sets this program as the default for quick assignment during affiliate approval.

Click **Submit** to save.

Each program defines:

| Area | Configuration |
|---|---|
| **Terms & Conditions** | Legal terms affiliates accept at registration |
| **Commission settings** | Percentage commission; renewal behaviour |
| **Payout settings** | Threshold, holding period, settlement day |

---

## Commission settings (program-level)

Each affiliate inherits commission rules from the assigned program. In the current release:

| Setting | Current support |
|---|---|
| **Commission type** | **PERCENTAGE** of customer revenue only |
| **Commission rate** | Percentage value — for example **20.00** for 20% |
| **Commission on renewal** | Configurable per program — **Commissions on the Renewal of Services** checkbox |
| **Debits** | Manual commission adjustments — for example chargebacks via **+ Add Commission** on affiliate details |

Example from an active affiliate's **Commission Setting** tab:

* **Commission Type:** Percentage — **20%**
* **Commission on Renewal of Services:** Applicable (or not — per program design)

Percentage commissions on **postpaid** customers are settled **after the customer invoice is marked paid**.

---

## Payout settings

| Setting | Description | Example |
|---|---|---|
| **Payout Schedule Frequency** | How often payouts are generated — **Monthly only** (current release) | **Monthly** |
| **Payout Schedule on Day** | Day of month (1–28) when payouts are generated | **1** (1st of month) or **15** (15th of month) |
| **Minimum payment threshold** | Minimum balance before payout | **USD 100** (program UI may show other values such as 1000) |
| **Payout Holding Duration (in days)** | Commissions must be at least this many days old before they appear as payable | **45 days** (UI examples may show 30 days) |
| **Payout methods** | Bank Account, PayPal, GigPay wallet, etc. | Affiliate configures in dashboard after approval |

**Payout Holding Duration** is set on the **Affiliate Program**. CMP does **not** list a commission in **Affiliate Payouts** until that holding period has elapsed from the commission date. Until then, the commission accrues on the affiliate's account but stays outside the pending payout queue.

Affiliates configure **Bank Account**, **PayPal**, or **GigPay** details in [Payout Settings](/platform-features/affiliate/affiliate-dashboard/payouts) after login — step 9 of the [workflow](/platform-features/affiliate/admin/workflow#post-approval-steps-810).

---

## Payout eligibility

A commission becomes eligible for payout only when **all** of the following are true:

| Criterion | Source |
|---|---|
| **Holding duration met** | Commission age ≥ **Payout Holding Duration (in days)** from the assigned affiliate program |
| **Minimum threshold met** | Total payable balance ≥ **Minimum Payout Threshold Amount** |
| **Customer payment received** | For **postpaid** customers, the referred customer's invoice is **marked paid** (percentage commissions) |
| **Settlement day reached** | Current date is on or after the program **Payout Schedule on Day** (monthly) |

:::info[When payouts appear in CMP]

**Affiliates → Affiliate Payouts** shows pending payouts **only after** the **Payout Holding Duration** from the affiliate program has passed for the underlying commissions. Commissions still within the holding window do not appear in the payout list.

:::

---

## Payout settlement

On the defined **Payout Schedule on Day** each month, CMP **generates payouts** for eligible commissions that have passed the holding duration and meet the minimum threshold. Payout schedule frequency is **Monthly only** in the current release.

All affiliate payouts are **manual**. CMP does not transfer funds automatically — regardless of payout method (Bank Account, PayPal, GigPay, or wire transfer).

| Step | Who | Action |
|---|---|---|
| **1** | System | Generates pending payout records on the settlement day |
| **2** | Admin | Transfers funds externally using the affiliate's **Payout Method** and **Payout Details** |
| **3** | Admin | Marks the payout **paid** in **Affiliates → Affiliate Payouts** |

Affiliate receives an **email** when a payout is marked **paid**.

:::info[Future roadmap]

The following affiliate features are **not available** in the current release:

* **Additional commission types** — flat rate and other commission calculation models beyond **PERCENTAGE**
* **Commission tiers** — tiered rates based on customer count or revenue volume
* **Additional payout schedule frequencies** — weekly, bi-weekly, quarterly, or other cadences beyond **Monthly**
* **Automated payout settlement** — direct integration with PayPal, GigPay, or bank gateways

Document these flows here when the features ship.

:::

---

## Taxation (W-8 / W-9)

Collect **W-9** (US) or **W-8** (non-US) information for commission taxation:

* Optional upload during [registration Step 2](/platform-features/affiliate/registration#step-2--account-details)
* Review on admin **[Tax Documents](/platform-features/affiliate/admin/affiliate-details#tax-documents)** tab

Confirm tax documents before processing payouts if your compliance policy requires it.

---

## Payment & commission rules

| Rule | Detail |
|---|---|
| **Affiliate signup** | **No payment** — CMP customer payment flow is bypassed |
| **Affiliate commission** | Earned on eligible referred customer purchases |
| **Renewals** | Configurable per program — some programs pay initial purchase only |
| **Postpaid customers** | Percentage payouts settle after invoice is **marked paid** |
| **Chargebacks** | Debits can be applied to commission account where supported |

---

## Email notifications

| Event | Recipient | When |
|---|---|---|
| New affiliate registration | **Admin** | Affiliate completes registration (Step 6) |
| Account approved | **Affiliate** | Admin sets status **ACTIVE** |
| Referred customer signup | **Affiliate** | Customer registers via affiliate link |
| Payout marked paid | **Affiliate** | Admin marks payout as paid |

---

## Affiliate Commissions (platform view)

**Path:** **Affiliates → Affiliate Commissions**

Platform-wide list of commission balances across all affiliates. Use for reporting and reconciliation alongside the per-affiliate **Commissions** tab — [Affiliate Details](/platform-features/affiliate/admin/affiliate-details#commissions).

![Screenshot: Admin — Affiliate Commissions list](/img/screenshots/cmp-affiliate-admin-commissions-list.png)

### Status filters

| Tab | Shows |
|---|---|
| **All** | Every affiliate commission record |
| **Paid** | Commissions already settled via payout |
| **Pending** | Commissions not yet paid out |

### Commissions table

| Column | Description |
|---|---|
| **ID** | Affiliate CRN |
| **Name** | Affiliate account name |
| **Email** | Registered email |
| **Mobile** | Contact number (if provided) |
| **Payout Method** | Bank, PayPal, GigPay — from affiliate payout settings |
| **Payout Details** | Account or wallet details |
| **Amount** | Total commission amount for the affiliate |

Use search, filters, and the date picker to narrow results. Click **Refresh** to reload the list.

:::info[Commissions vs payouts]

**Affiliate Commissions** shows accrued commission totals per affiliate. **Affiliate Payouts** shows amounts ready for settlement after [Payout Holding Duration](#payout-eligibility) and other program rules are met.

:::

Per-affiliate commission line items (customer, rate, type, payable amount, status) are on **Affiliates → Manage Affiliates → Active Affiliates → Commissions** — [Affiliate Details](/platform-features/affiliate/admin/affiliate-details#commissions).

---

## Affiliate Payouts (platform view)

**Path:** **Affiliates → Affiliate Payouts**

Lists affiliates with **pending payouts** — amounts that have passed the program **Payout Holding Duration** and meet other eligibility rules. Commissions still within the holding window do **not** appear here.

![Screenshot: Admin — Affiliate Pending Payouts](/img/screenshots/cmp-affiliate-admin-pending-payouts.png)

### Pending Payouts table

| Column | Description |
|---|---|
| **ID** | Affiliate CRN |
| **Name** | Affiliate account name |
| **Email** | Registered email |
| **Mobile** | Contact number (if provided) |
| **Payout Method** | Bank, PayPal, GigPay, etc. — from affiliate payout settings |
| **Payout Details** | Account or wallet details for the selected method |
| **Amount** | Payable amount ready for settlement |

Use search, filters, and the date picker to find specific payout batches.

### Mark as paid

All payouts require manual settlement:

1. Open **Affiliates → Affiliate Payouts**
2. Select the affiliate row(s) with pending payout
3. Transfer funds externally — wire transfer, PayPal, GigPay, or bank transfer per the affiliate's configured **Payout Method** and **Payout Details**
4. Click **Mark As Paid**
5. Confirm in the dialog — **Are you sure to mark selected affiliates as Paid?**
6. Click **Confirm**

Complete the external transfer **before** or **when** marking paid, per your finance process. The affiliate receives a **payout marked paid** email after confirmation.

Paid payouts appear on the affiliate's **[Payout History](/platform-features/affiliate/admin/affiliate-details#payout-history)** tab.

---

## Related

* [Affiliate Workflow](/platform-features/affiliate/admin/workflow)
* [Manage Affiliates (Admin)](/platform-features/affiliate/admin/manage-affiliates)
* [Affiliate Details (Admin)](/platform-features/affiliate/admin/affiliate-details)
* [Affiliate Registration](/platform-features/affiliate/registration)
