---
sidebar_position: 1
title: "Affiliate"
tags: ["platform", "affiliate", "partners"]
---

# Affiliate

:::warning[Documentation in progress]

Affiliate documentation is **still in progress**. Pages may be incomplete or updated as the module evolves.

:::

CMP supports an **Affiliate** program so providers can onboard partners who refer customers and earn commission.

:::info[Module must be enabled]

The **Affiliate** module must be enabled on your CMP deployment before affiliates can register or use affiliate features. Contact StackConsole if the module is not available on your portal.

:::

## Documentation sections

### Registration

| Page | Purpose |
|---|---|
| [Affiliate Registration](/platform-features/affiliate/registration) | Public signup at `/affiliate/register` |

### Admin

| Page | Purpose |
|---|---|
| [Affiliate Workflow](/platform-features/affiliate/admin/workflow) | End-to-end flow — registration, approval, referral, commission, payout |
| [Manage Affiliates (Admin)](/platform-features/affiliate/admin/manage-affiliates) | Pending and active affiliate lists, approval |
| [Affiliate Details (Admin)](/platform-features/affiliate/admin/affiliate-details) | Per-affiliate tabs — summary, referrals, commissions, logs |
| [Program, Commissions & Payouts](/platform-features/affiliate/admin/program-commissions-payouts) | Programs, commission rules, payout settlement, emails |

### Affiliate Dashboard

| Page | Purpose |
|---|---|
| [Affiliate Dashboard](/platform-features/affiliate/affiliate-dashboard/) | Portal overview after login at `/affiliate/login` |
| [Dashboard](/platform-features/affiliate/affiliate-dashboard/dashboard) | Performance metrics and referral link |
| [Referred Signups](/platform-features/affiliate/affiliate-dashboard/referred-signups) | Customers registered via referral |
| [Commissions](/platform-features/affiliate/affiliate-dashboard/commissions) | Pending and historical commissions |
| [Payouts](/platform-features/affiliate/affiliate-dashboard/payouts) | Payout settings and history |

## Key URLs

| URL | Purpose |
|---|---|
| `<BASE_URL>/affiliate/register` | Affiliate registration |
| `<BASE_URL>/affiliate/login` | Affiliate portal login |
| `<BASE_URL>/r/<referral-code>` | Customer referral link (pattern) |

## Admin navigation

**Affiliates** sidebar in the admin console:

* **Manage Affiliates** — Pending Affiliates · Active Affiliates
* **Affiliate Programs**
* **Affiliate Commissions**
* **Affiliate Payouts**

## Related

* [Reseller](/platform-features/reseller/)
* [Platform Features](/platform-features/)
