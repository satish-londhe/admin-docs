---
sidebar_position: 5
title: "Payouts"
tags: ["platform", "affiliate", "dashboard", "payouts"]
---

# Payouts

**Path:** **Report → Payouts**

Affiliates configure how they receive commission payouts and view payout history.

Configure payout settings after first login — step 9 of the [Affiliate Workflow](/platform-features/affiliate/admin/workflow#post-approval-steps-810). The [Dashboard](/platform-features/affiliate/affiliate-dashboard/dashboard) shows an alert until payout method is set up.

---

## Payout Settings

Open **Payout Settings** from the **Payouts** page or the **Configure** button on the dashboard alert banner.

![Screenshot: Affiliate — Payout Settings](/img/screenshots/cmp-affiliate-dashboard-payout-settings.png)

**Preferred Payout Method**
*Required.* Select how you receive payouts — for example **BANK ACCOUNT**. PayPal and GigPay may be available depending on provider configuration.

### Bank account fields

When **BANK ACCOUNT** is selected:

**Account Holder Name**
*Required.* Name on the bank account.

**Account Type**
*Required.* Select account type from the dropdown.

**Account No.**
*Required.* Bank account number.

**Bank Name**
*Required.* Name of the bank.

**Branch**
*Required.* Branch name or identifier.

**Country**
*Required.* Country where the account is held.

**IFSC code**
*Required* when applicable (for example India). International banking identifier for domestic transfers.

**IBAN**
*Optional or required* depending on country. International Bank Account Number.

**Swift Code**
*Optional or required* for international wire transfers.

Click **Submit** to save payout settings.

:::info[Manual settlement]

CMP does **not** transfer payout funds automatically. After you configure payout details, admins process payouts manually on the program settlement schedule and mark them **paid** — [Payout settlement](/platform-features/affiliate/admin/program-commissions-payouts#payout-settlement).

:::

:::info[Future roadmap]

Automated payout settlement via PayPal, GigPay, or bank gateways is planned for a future release.

:::

---

## Payout history

The **Payouts** page also shows past payout records — amounts, dates, and paid status. Affiliates receive an **email** when an admin marks a payout as **paid**.

Admins manage pending payouts under [Affiliate Payouts (Admin)](/platform-features/affiliate/admin/program-commissions-payouts#affiliate-payouts-platform-view).

---

## Related

* [Dashboard](/platform-features/affiliate/affiliate-dashboard/dashboard)
* [Commissions](/platform-features/affiliate/affiliate-dashboard/commissions)
* [Program, Commissions & Payouts (Admin)](/platform-features/affiliate/admin/program-commissions-payouts)
