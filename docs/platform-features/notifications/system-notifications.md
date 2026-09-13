---
sidebar_position: 3
title: "System Notifications"
tags: ["platform", "features", "notifications", "system-alerts", "in-app", "multi-language"]
---

# System Notifications

**System Notifications (System Alerts)** provide real-time, in-app notifications and operational alerts directly within the CMP administration console and customer portal. Unlike asynchronous email messages, system notifications surface immediately in the web interface to inform users of high-priority events, background job completions, and security or billing notices.

---

## In-App Alert Channels

Users receive system notifications across two primary UI elements:

1. **Header Notification Center (`🔔`)** — A notification bell located in the top navigation bar with a live unread badge counter (e.g. `209`). Clicking the bell opens a dropdown of recent events with direct links to affected services or invoices.
2. **Contextual In-App Banners** — Prominent warning and error banners displayed at the top of specific screens (such as threshold limit alerts on the dashboard or frozen invoice notifications on billing pages).

---

## Common System Notification Events

System alerts trigger across several core platform operations:

| Category | Typical Events | Recipient |
|---|---|---|
| **Billing & Finance** | • Threshold limit breached (service creation restricted)<br/>• Low infra credit warning<br/>• Auto-charge card payment failure<br/>• Invoice marked Frozen after retry exhaustion | Customer & Admin |
| **Service Lifecycle** | • Virtual Machine provisioning completed<br/>• Disk volume snapshot completed<br/>• VM power state changes (stop, start, restart)<br/>• Marketplace application deployment finished | Customer |
| **Quota & Approvals** | • New quota increase request submitted<br/>• Quota request approved or rejected | Customer & Admin |
| **Security & Access** | • Password reset or OTP generated<br/>• 2FA authentication method changed<br/>• Account unblocked or disciplinary status updated | Customer & Admin |

---

## Future Enhancements

The following notification features are currently not available in CMP and are planned for future releases:

* **Platform & Infrastructure Health:**
  * Orchestrator resource synchronization warnings
  * Storage pool and compute node capacity threshold alerts
* **Advanced Access & Security Alerts:**
  * New device login notifications
  * Unrecognized IP address access alerts

---

## Configuring System Alerts

Platform administrators can view and customize system alert messages and their localized wording.

**CMP path:** **Settings → System → System Alerts**

Admins can:
* Review system alert templates mapped to specific trigger events.
* Customize alert message content, severity levels (Info, Warning, Critical), and status.
* Update language-specific alert copies so users see system messages in their preferred interface language.

---

## Multi-Language System Alerts

System alerts adapt dynamically to each user's language settings:

* If a customer chooses German (`de`), Spanish (`es`), or French (`fr`) in **Profile → Account Preferences → App Language**, in-app alert banners and bell notifications render in that language.
* For each enabled platform language, administrators can customize the exact wording under **Settings → System → System Alerts**.
* If a translation is not configured for a newly enabled language, the platform defaults to English (`en`).

---

## Notification Delivery Comparison

| Characteristic | Email Notifications | System Notifications (Alerts) |
|---|---|---|
| **Delivery Medium** | External SMTP dispatch to inbox | In-app console bell (`🔔`) and banners |
| **User Presence** | Delivered whether user is online or offline | Surfaces while actively browsing the portal |
| **Urgency** | Formal transactional records & receipts | Immediate operational feedback & live warnings |
| **Customization** | **Settings → System → Email Templates** | **Settings → System → System Alerts** |
| **Baseline Content** | Pre-generated with AI tools; fully editable | Pre-configured in platform; multi-language editable |
| **Dynamic Tags** | Rich variable tags (`{{service_name}}`, `{{public_ipv4_address}}`) | Contextual dynamic links to specific resources |

---

## Related

* [Notifications Overview](/platform-features/notifications/)
* [Email Notifications](/platform-features/notifications/email-notifications)
* [Multi-Language Support](/platform-features/multi-language)
* [Low Infra Credit Notifications](/billing/low-infra-credit-notifications)
* [Threshold (Spending Cap)](/billing/threshold)
