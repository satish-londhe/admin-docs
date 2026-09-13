---
sidebar_position: 1
title: "Notifications Overview"
tags: ["platform", "features", "notifications", "email", "system-alerts"]
---

# Notifications Overview

The CMP notification system keeps cloud provider administrators and end customers informed about critical platform events, service lifecycle changes, and financial activities. The system delivers timely alerts across two primary channels: **Email Notifications** and **System Notifications (In-App Alerts)**.

All baseline notification content is pre-generated with the help of AI tools, providing professional, production-ready copy out-of-the-box that administrators can easily fine-tune and localize for every supported language.

---

## Pages in this section

| Page | Description | Status |
|---|---|---|
| **[Email Notifications](/platform-features/notifications/email-notifications)** | Lifecycle email dispatch, AI-generated baseline templates, rich-text customization, and dynamic tags. | Ready |
| **[System Notifications](/platform-features/notifications/system-notifications)** | Real-time in-app alerts, console bell notifications, administrative event logging, and language localization. | Ready |

---

## Key Capabilities

### 1. Dual-Channel Architecture

CMP coordinates messaging across two complementary channels:

* **Email Notifications** — Asynchronous communications sent directly to customer and administrator inboxes. Used for transactional events, service deployment credentials, password resets, invoice issuances, and payment failure warnings.
* **System Notifications (Alerts)** — Real-time in-app messages surfaced directly in the CMP header bar (bell icon `🔔`) and administrative audit views. Used for immediate operational feedback, service lifecycle progress, and financial alerts.

### 2. AI-Generated Baseline Content

All default email templates and system alert messages are generated with the help of advanced AI tools. This ensures:
* Professionally phrased and structured communication across complex cloud lifecycle workflows.
* Accurate dynamic variable placement for parameters like IP addresses, credentials, quotas, and invoice amounts.
* Consistency in tone, clarity, and branding across hundreds of built-in notification events.

### 3. Full Customizability

While AI provides the initial baseline, administrators retain complete control over every message:
* Edit template subjects, headings, body text, tables, and buttons via a built-in WYSIWYG editor or raw HTML source.
* Insert context-aware dynamic tags (e.g. `{{service_name}}`, `{{public_ipv4_address}}`, `{{company_name}}`).
* Enable or disable specific notifications independently for customers and super administrators.

### 4. Multi-Language Localization

For every language enabled on the platform (e.g., English, German, French, Spanish, Arabic, etc.), CMP maintains dedicated localized versions of each email template and system alert:
* Customers receive communications in their saved profile language preference.
* If a recipient has no language preference set, CMP automatically falls back to English (`en`).
* Admins can edit and refine the localized copy for any active language directly from the administration console.

---

## Related

* [Email Notifications](/platform-features/notifications/email-notifications)
* [System Notifications](/platform-features/notifications/system-notifications)
* [Multi-Language Support](/platform-features/multi-language)
* [Low Infra Credit Notifications](/billing/low-infra-credit-notifications)
* [Threshold (Spending Cap)](/billing/threshold)
* [Prerequisites — SMTP Email Configuration](/installation/prerequisites)
