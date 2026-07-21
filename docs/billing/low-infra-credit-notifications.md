---
sidebar_position: 3
title: "Low Infra Credit Notifications"
tags: ["billing", "prepaid", "wallet", "notifications", "infra-credit"]
---

# Low Infra Credit Notifications

The **Low Infra Credit Notification** alerts **prepaid** customers when their available infra-credit (wallet) balance falls below a configured amount. That helps customers top up before services are affected by low or negative balance.

:::important[Prepaid only]

This feature works **only for prepaid** customer accounts. Postpaid and manual payment modes do not use infra-credit wallets for this alert.

:::

**Customer path:** **Profile → Notifications → Billing Notifications**

![Screenshot: CMP — Billing Notifications / Low Credit Notifications](/img/screenshots/cmp-low-infra-credit-notifications.png)

---

## Who can use this feature?

| Account type | Supported? |
|---|---|
| **Prepaid** customer accounts | Yes |
| Postpaid | No |
| Manual | No |

---

## Configure low credit alerts

Customers configure alerts from **User Profile → Notifications** (Billing Notifications / Low Credit Notifications).

### Settings

**Enable / Disable Alert**

*Optional.* Turn low credit notifications on or off. When disabled, no low-credit emails or in-app alerts are sent for this threshold.

Status on the page shows **Active** when alerts are enabled.

**Threshold Amount**

*Required when alerts are enabled.* Balance amount that triggers a notification.

Example: if the threshold is `$100` (or `$1000` as in the screenshot), a notification is sent when available balance is **equal to or below** that amount.

The page may also show **Current Wallet Balance**, whether the balance is below threshold, and how far below it is.

**Notification Channels**

| Channel | Default |
|---|---|
| **Email** | Enabled by default |
| **In-app notifications** | Enabled by default |

Both channels are enabled by default.

---

## When will a notification be sent?

A notification is sent when **all** of the following are true:

* Low credit alerts are **enabled**
* The account is **prepaid**
* Available balance is **equal to or below** the configured threshold

:::note[Hourly check — one email per day]

Low infra credit checks run **every hour**. If the available balance is at or below the threshold, a notification email is sent.

To avoid duplicate alerts, **only one notification email is sent per day** while the balance remains below the threshold.

:::

When the alert triggers, CMP sends email to the configured account contact (as shown under “What happens when the alert triggers?” on the Billing Notifications page).

**Alert History** on the same page lists past alerts (when available).

---

## Related prepaid behaviour

Low credit alerts help customers top up before disciplinary or provisioning impacts. Related prepaid docs:

* [Prepaid](/billing/payment-modes/prepaid) — wallet, insufficient infra credit, renewals
* [Disciplinary Actions](/billing/disciplinary-actions/) — freeze / suspend / terminate when prepaid balance goes negative

---

## Related

* [Prepaid](/billing/payment-modes/prepaid)
* [Payment Modes](/billing/payment-modes/)
* [Notifications](/platform-features/notifications)
* [Billing Overview](/billing/overview)
