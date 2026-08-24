---
sidebar_position: 8
title: "Products changelog"
tags: ["platform", "store", "products", "changelog", "customer"]
---

# Products changelog

This page lists what is **new** in **Products / Store**. Most of the [Store & Products](/platform-features/store/) documentation describes capabilities that were **not available before** this release.

:::important[Not yet rolled out on every deployment]

These improvements may not be enabled on all CMP deployments yet. Contact StackConsole if you need Products / Store turned on or updated.

:::

## New capabilities (overview)

| Area | What changed |
|---|---|
| **Admin Products workflow** | Full admin setup path under **Settings → Products** — previously not available as documented today |
| **Product-specific billing cycles** | Each product can enable Monthly / Quarterly / Yearly independently (not a global Store setting) |
| **Categories & vendors** | Catalogue organisation and required product vendors |
| **Orders** | Admin order list, status updates, Send Email |
| **Contract billing** | Can be enabled **per product** (was not available) |
| **Customer Store UI** | Redesigned Store browse and purchase experience (see table below) |

### Admin workflow (new)

Configure and fulfil products end to end:

1. [Categories](/platform-features/store/categories)
2. [Product Vendors](/platform-features/store/product-vendors)
3. [Add Products](/platform-features/store/add-products) — including **per-product billing cycles**
4. [Product Billing](/platform-features/store/product-billing) — rate card prices
5. [Orders](/platform-features/store/orders) — fulfil, update status, email, or place orders for customers

Billing behaviour when an order is placed: [Billing behaviour](/platform-features/store/billing-behavior).

### Product-specific billing cycles (new)

At product creation, admins choose which billing cycles that product offers. Customers only see those cycles in the Store side panel.

- Cycles are **per product**, not shared across the whole Store
- Rate card price grids may still show all cycle columns — set unused cycles to **0** if needed

Details: [Add Products — per-product billing cycles](/platform-features/store/add-products#billing-rules-matrix-prepaid--postpaid--manual).

## Customer Store UI changes

These are the customer-facing UI differences only. They sit on top of the new admin and billing capabilities above.

| Area | Before | After |
|---|---|---|
| **Contract billing** | Not available | Can be **enabled per product** |
| **Page title** | Purchase Products | **Store** |
| **Subtitle** | Products are universal and not tied to any specific project. | Discover and deploy the right products for your infrastructure. |
| **Category selection** | Left sidebar list (All, VOIP, Security, Productivity, etc.) | **Horizontal category chips** with product counts |
| **Search** | Not available | **Search bar** added |
| **Product display** | List view with quantity selector (+/−) | **Card view** with product details |
| **Product image / icon** | Not available | Product **icon / logo** displayed |
| **Product selection** | Quantity selected directly from the product list | Click **Buy Now** to open a **side panel** |
| **Product details** | Limited information | Description, category, product type, payment type, reference code, product vendor details, and **contract billing** |
| **Billing cycle** | Billing cycle selector at the bottom of the page | Billing cycle selector **inside the side panel** |
| **Quantity selection** | Quantity controls on each product card | Quantity selector **inside the side panel** |
| **Price calculation** | Price summary shown at the bottom | **Total price** updates within the side panel |
| **Product information** | Not displayed | Dedicated **Overview** section |

How customers use the Store today: [Customer Store](/platform-features/store/customer-store).

## Related

* [Store & Products overview](/platform-features/store/)
* [Add Products](/platform-features/store/add-products)
* [Product Billing](/platform-features/store/product-billing)
* [Orders](/platform-features/store/orders)
* [Customer Store](/platform-features/store/customer-store)
* [Billing behaviour](/platform-features/store/billing-behavior)
* [Release Notes & Changelog](/overview/release-notes)
