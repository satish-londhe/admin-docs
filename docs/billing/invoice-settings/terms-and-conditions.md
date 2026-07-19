---
sidebar_position: 6
title: "Terms and conditions"
tags: ["billing", "invoice", "terms"]
---

# Terms and conditions

Define the **Terms and Conditions** shown to customers for a branch (Configure wizard **Step 5: Terms and Conditions for Customers**).

**CMP path:** **Settings → System → Branch → [branch] → Configure → Terms and Conditions**

img/screenshots/cmp-branch-terms-and-conditions.png

![Screenshot: CMP — Configure Branch Step 5 Terms and Conditions](/img/screenshots/cmp-branch-terms-and-conditions.png)

This is separate from the optional **Invoice Terms & Conditions** rich text on [Invoice settings](/billing/invoice-settings/invoice-details) (Step 2), which prints terms on the invoice PDF. Step 5 configures the customer-facing terms document for the branch / subsidiary.

## Form fields

**Name**

*Required.* Name of this terms record (for example a version or policy title).

**Subsidiary**

*Required.* Branch / subsidiary this terms set belongs to (for example **Stack Console**). Often pre-selected for the branch you are configuring.

**Status**

*Required.* **Active** or inactive. Only active terms are shown to customers.

**Description**

*Required.* Full terms and conditions body. Use the rich-text editor (bold, lists, links, alignment, source HTML). Insert dynamic placeholders with **Select Tag** or by typing `{{`.

:::info[Placeholders]

Placeholders are filled automatically with the customer’s details when the Terms and Conditions page is shown.

| Tag | Typical use |
|---|---|
| `{{company_name}}` | Customer company name |
| `{{name}}` | Customer / contact name |
| `{{country}}` | Country |
| `{{address}}` | Address |
| `{{state}}` | State / province |
| `{{city}}` | City |
| `{{postal_code}}` | Postal / ZIP code |
| `{{VAT}}` | VAT / tax id |

To insert a placeholder, type `{{` and select from the suggestions, or use **Select Tag** in the editor toolbar.

:::

Click **Submit & Continue** to finish the wizard (**Step 6: Success**).

## Related

* [Branches](/billing/invoice-settings/branches)
* [Invoice settings](/billing/invoice-settings/invoice-details) — invoice PDF terms field
* [Invoice number settings](/billing/invoice-settings/invoice-number)
* [Taxation](/billing/invoice-settings/taxation)
* [Invoice Settings hub](/billing/invoice-settings/)
