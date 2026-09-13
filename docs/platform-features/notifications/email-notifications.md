---
sidebar_position: 2
title: "Email Notifications"
tags: ["platform", "features", "notifications", "email", "templates", "multi-language", "ai"]
---

# Email Notifications

CMP includes an automated email dispatch engine that triggers transactional messages for critical user and infrastructure events — such as account onboarding, service provisioning, VM lifecycle operations, invoice generation, payment failures, and security notices.

All default email templates are pre-generated with the help of AI tools to provide complete, professionally written baseline content out-of-the-box. Administrators can fully customize any template’s subject line, copy, layout, and localized translations for each supported language.

---

## Email Template Management

Administrators can view, search, filter, and edit all platform email templates from the admin console.

**CMP path:** **Settings → System → Email Templates**

![Screenshot: Settings — System — Email Templates list](/img/screenshots/cmp-email-templates-list.png)

### Template Inventory Overview

The Email Templates list provides a searchable inventory of all system email notifications (over 400+ built-in templates covering diverse platform events):

| Column | Description |
|---|---|
| **Name** | System name of the email notification event (e.g. *Payment Failure Customer Email*, *VM Created*, *Invoice Cancelled Email*). |
| **Type** | The intended recipient audience: **`customer`** (end user) or **`super_admin`** (cloud provider staff). |
| **Category** | Functional classification of the email (e.g. **`Billing`**, **`Services`**, **`Other`**). |
| **Language** | The two-letter locale code for this template copy (e.g. **`en`**, **`de`**, **`es`**, **`fr`**). |
| **Summary** | Optional admin description or notes regarding this template version. |
| **Status** | Operational state: **`Active`** (system will send this template) or **`Inactive`** (email dispatch suppressed). |
| **Action** | Action menu (`...`) to edit template contents and parameters. |

---

## AI-Generated Baseline Templates

To accelerate cloud deployment and maintain high-quality communications:
* All baseline email template bodies, subjects, and layouts are created with the help of **AI tools**.
* Templates include structured data tables (e.g. IP addresses, compute specs, OS details, billing totals) formatted cleanly for desktop and mobile email clients.
* Default messaging maintains professional cloud provider tone, clear instructions, and standard security notices.

Administrators do not need to build email templates from scratch, but retain full freedom to modify every word, style, or structure.

---

## Customizing an Email Template

To customize any email message:
1. Navigate to **Settings → System → Email Templates**.
2. Locate the desired template family using the search bar (e.g. `VM Created` or `Payment Failure`).
3. Click the Action menu (`...`) on the specific language row and select **Edit**.

**CMP path:** **Settings → System → Templates → Edit Email Template**

![Screenshot: Settings — System — Edit Email Template form](/img/screenshots/cmp-email-templates-edit.png)

### Form Fields

**Template Name**

*Required.* Display name of the email template family (e.g. `VM Created`).

**Template Summary**

*Optional.* Internal administrative summary or description explaining the context of this email.

**Category**

*Required.* Functional grouping for the email. Select **`Services`**, **`Billing`**, or **`Other`**.

**Status**

*Required.* Select **`Active`** to enable dispatch, or **`Inactive`** to disable sending this email notification.

**User Type**

*Required.* Identifies whether the email is targeted at **`Customer`** accounts or **`Admin`** / **`Super Admin`** staff.

**Subject**

*Required.* The email subject line displayed in recipient inboxes. Dynamic tags can be embedded directly within the subject (e.g. `{{service_name}} Created Successfully`).

**Template**

*Required.* The visual body of the email. Supports:
* **WYSIWYG Rich-Text Editor:** Format headings, bold/italic text, numbered/bulleted lists, text alignment, and tables directly.
* **HTML Source View (`</>`):** Toggle into raw HTML mode to fine-tune custom CSS styles, branded logos, or responsive layouts.
* **Dynamic Variable Tags:** Insert contextual platform variables using the double-curly bracket syntax `{{ tag_name }}`.

### Dynamic Variable Tags

Dynamic variable tags use double curly braces (e.g. `{{ tag_name }}`) to automatically inject real-time platform data into an email when triggered.

:::info[Context-dependent tags]
**Available tags vary based on the specific template context.** Each email event only has access to parameters provided by the triggering action. For example, instance IP addresses and root passwords exist only in VM lifecycle emails, while invoice numbers and failure reasons exist only in billing emails.
:::

#### How to Find and Insert Tags in a Template

1. **Toolbar Dropdown (`Select Tag`):** Click the **Select Tag** dropdown in the WYSIWYG editor toolbar to insert supported variables directly at your cursor position.
2. **Available Tags Reference:** Review the **Available Tags** section displayed immediately beneath the editor box. It dynamically renders the exact list of variables supported for that specific template.

#### Tags by Template Context

While each template exposes its own specific variable set, typical categories include:

| Context / Template Family | Common Available Tags | Injected Data |
|---|---|---|
| **Global / All Templates** | `{{name}}`, `{{first_name}}`<br/>`{{email}}`<br/>`{{company_name}}`, `{{app_name}}` | Recipient customer or contact name<br/>Recipient email address<br/>Cloud provider brand / platform display name |
| **Compute & VM Operations**<br/>*(e.g. VM Created, VM Deleted, Backups)* | `{{service_name}}`<br/>`{{vmName}}`<br/>`{{public_ipv4_address}}`<br/>`{{private_ipv4_address}}`<br/>`{{cpu}}`, `{{memory}}`, `{{storage}}`<br/>`{{os}}`, `{{os_version}}`<br/>`{{location}}`<br/>`{{label}}`<br/>`{{vm_password}}`<br/>`{{project}}` | Provisioned service or package name<br/>Internal VM identifier / hostname<br/>Allocated public IPv4 address<br/>Private subnet IP address<br/>vCPU, RAM, and disk storage specifications<br/>Operating system template details<br/>Datacenter zone / region<br/>User-assigned instance label<br/>Initial temporary root/admin password<br/>Associated customer project |
| **Billing & Invoices**<br/>*(e.g. Invoice Created, Payment Failure, Threshold)* | `{{invoice_number}}`<br/>`{{total_amount}}` / `{{amount}}`<br/>`{{currency}}`<br/>`{{invoice_date}}`, `{{due_date}}`<br/>`{{payment_method}}`<br/>`{{threshold_limit}}` | Generated invoice reference number<br/>Total billed or due amount<br/>Currency code or symbol (e.g. USD, EUR)<br/>Invoice generation and due dates<br/>Payment method used (e.g. Credit Card, Offline)<br/>Configured customer spending cap |
| **Account & Authentication**<br/>*(e.g. Set Password OTP, User Registered)* | `{{otp}}`<br/>`{{reset_link}}` / `{{login_url}}`<br/>`{{username}}`<br/>`{{ip_address}}` | One-time password code<br/>Action link to reset password or login<br/>Account username or handle<br/>Client IP address associated with the event |
| **Quota & Support**<br/>*(e.g. Quota Request Approved, Tickets)* | `{{quota_name}}`<br/>`{{requested_limit}}`<br/>`{{ticket_id}}`, `{{subject}}` | Name of the compute or network quota resource<br/>Requested resource capacity limit<br/>Support ticket identifier and subject |

:::warning[Context validity]
Always verify tags against the **Available Tags** list shown for that template. Inserting a tag from an unrelated context (e.g. placing `{{public_ipv4_address}}` in an invoice payment reminder) will resolve to blank text because the billing event does not pass VM networking metadata.
:::

### Saving Changes

* Click **Submit** to save changes and remain on the editing screen.
* Click **Submit and go to listing** to save changes and return to the Email Templates overview table.

---

## Multi-Language Email Delivery

CMP natively synchronizes email templates with the platform's multi-language system:

1. **Per-Language Copies:** When a language is enabled in CMP (such as German `de`, French `fr`, or Uzbek `uz`), CMP automatically generates a localized copy of every template for that language.
2. **Recipient Language Preference:** When an event occurs (e.g. invoice created or VM deployed), CMP checks the recipient's saved **App Language** in their profile (**Profile → Account Preferences → App Language**).
3. **Dispatch Resolution:**
   * If a template exists for the customer's selected language and is **Active**, CMP dispatches that localized version.
   * If the customer has not selected a language, or if the template for that locale is inactive, CMP automatically falls back to **English (`en`)**.
4. **Independent Customization:** Admins can edit each language version independently without altering the templates of other languages.

---

## Related

* [Notifications Overview](/platform-features/notifications/)
* [System Notifications](/platform-features/notifications/system-notifications)
* [Multi-Language Support](/platform-features/multi-language)
* [Prerequisites — SMTP Email Configuration](/installation/prerequisites)
* [Low Infra Credit Notifications](/billing/low-infra-credit-notifications)
* [Threshold (Spending Cap)](/billing/threshold)
