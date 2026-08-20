---
sidebar_position: 5
title: "Payouts"
tags: ["platform", "affiliate", "dashboard", "payouts"]
---

# Payouts

**Path:** **Report → Payouts**

Affiliates provide **payout account details** (bank, PayPal, GigPay, etc.) and view payout history.

:::danger[Payout Settings — account details only]

**Payout Settings does not transfer money.** CMP only **collects** the affiliate’s bank account or wallet details so the **admin team** can transfer commission manually when a payout is due.

There is **no automated payout**. After eligible commissions are generated, admins use these saved details to send funds externally (wire transfer, PayPal, GigPay, etc.) and then mark the payout **paid** in the admin console — [Payout settlement](/platform-features/affiliate/admin/program-commissions-payouts#payout-settlement).

:::

Configure payout settings after first login — step 9 of the [Affiliate Workflow](/platform-features/affiliate/admin/workflow#post-approval-steps-810). The [Dashboard](/platform-features/affiliate/affiliate-dashboard/dashboard) shows an alert until payout method is set up.

---

## Payout Settings

Open **Payout Settings** from the **Payouts** page or the **Configure** button on the dashboard alert banner. Use this form to save the account or wallet details admins need for **manual** commission transfers.

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

Click **Submit** to save payout details for the admin team.

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
