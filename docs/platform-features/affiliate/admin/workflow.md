---
sidebar_position: 1
title: "Affiliate Workflow"
tags: ["platform", "affiliate", "workflow", "onboarding"]
---

# Affiliate Workflow

End-to-end flow from affiliate registration through customer referral, commission, and payout.

:::info[Program must exist first]

An admin must create an **[Affiliate Program](/platform-features/affiliate/admin/program-commissions-payouts#affiliate-programs)** before approving affiliates. Assign the program when approving a pending registration.

:::

---

## Overview

```
Affiliate registers  →  Admin approves  →  Affiliate configures payout
        │                      │                      │
        ▼                      ▼                      ▼
   Pending list          Account ACTIVE         Shares referral link/code
        │                      │                      │
        └──────────────────────┴──────────────────────┘
                               │
                               ▼
                    Customer registers via affiliate link
                               │
                               ▼
                    Commissions tracked → Payout on settlement day
```

| Stage | Who | What happens |
|---|---|---|
| **Registration** | Affiliate | Multi-step signup at `/affiliate/register` — no payment required |
| **Approval** | Admin | Review in **Pending Affiliates**, assign program, set **ACTIVE** |
| **Activation email** | System | Affiliate notified when account is approved |
| **Payout setup** | Affiliate | Bank / PayPal / GigPay (from affiliate dashboard) |
| **Referral** | Affiliate | Shares unique link or referral code |
| **Customer signup** | Customer | Registers using affiliate link — relationship stored in CMP |
| **Commission & payout** | System + Admin | Commissions accrue; payouts appear in **Affiliate Payouts** after holding duration — admin transfers funds manually and marks **paid** |

Full registration steps: [Affiliate Registration](/platform-features/affiliate/registration).  
Admin steps: [Manage Affiliates (Admin)](/platform-features/affiliate/admin/manage-affiliates).

---

## Registration workflow (steps 1–6)

| Step | Action | Detail |
|---|---|---|
| **1** | Register | Open `<BASE_URL>/affiliate/register` — name, email, phone, password |
| **2** | Verify email | Enter OTP sent to registered email |
| **3** | Account details | Billing address, currency; optional **W8/W9** documents |
| **4** | Additional details | Promotion channels, URLs, partner-fit questions |
| **5** | Accept terms | Affiliate program terms, privacy, consents |
| **6** | Registration complete | Request submitted — **pending admin approval** |

Affiliates **do not pay** anything during registration. The standard CMP customer payment flow is **bypassed** for affiliate signup.

---

## Admin approval (step 7)

| Step | Action | Detail |
|---|---|---|
| **7** | Approve account | Admin receives email for new registration → **Affiliates → Manage Affiliates → Pending Affiliates** → approve and assign program |

Affiliate receives a **confirmation email** when the account is approved and activated.

Procedure: [Manage Affiliates (Admin)](/platform-features/affiliate/admin/manage-affiliates#approve-a-pending-affiliate).

---

## Post-approval (steps 8–10)

| Step | Action | Detail |
|---|---|---|
| **8** | Affiliate login | `<BASE_URL>/affiliate/login` |
| **9** | Configure payout | Affiliate sets payout method — Bank Account, PayPal, GigPay, etc. |
| **10** | Share referral | Affiliate shares **unique referral link** or **referral code** with customers |

---

## Tracking link (affiliate link)

An affiliate link lets CMP:

* **Recognize** which affiliate referred the customer
* **Track** whether the visitor signs up or purchases
* **Validate** conversion for commission

Affiliates find their link and code on the [Affiliate Dashboard](/platform-features/affiliate/affiliate-dashboard/dashboard) after login.

Example referral URL pattern: `<BASE_URL>/r/<referral-code>`

---

## What affiliates can do

| Capability | Description |
|---|---|
| Opt into an affiliate program | Join after admin approval |
| Get affiliate links | Unique referral link and referral code |
| Track performance | Clicks, signups, conversions on dashboard |
| Receive commission payouts | Per program rules — [Program, Commissions & Payouts](/platform-features/affiliate/admin/program-commissions-payouts) |
| Raise support tickets | Via affiliate dashboard support |

---

## What affiliates cannot do

| Restriction | Detail |
|---|---|
| **Create services** | Affiliates cannot provision VMs, storage, or other cloud services |
| **Create customers** | Affiliates cannot manually create customer accounts — customers must register via referral link |

---

## Customer relationship

When a customer registers using an affiliate link or code, CMP stores the **affiliate–customer relationship** in the database. Admins view referred customers under each affiliate — [Referred Signups](/platform-features/affiliate/admin/affiliate-details#referred-signups).

---

## Email notifications

| Event | Recipient |
|---|---|
| New affiliate registration | Admin |
| Affiliate account approved | Affiliate |
| Affiliate's customer signs up | Affiliate |
| Payout marked paid by admin | Affiliate |

Details: [Program, Commissions & Payouts — Email notifications](/platform-features/affiliate/admin/program-commissions-payouts#email-notifications).

---

## Affiliate dashboard

After login, affiliates use the portal documented under [Affiliate Dashboard](/platform-features/affiliate/affiliate-dashboard/):

| Area | Page |
|---|---|
| **Dashboard** | [Dashboard](/platform-features/affiliate/affiliate-dashboard/dashboard) — metrics and referral link |
| **Referred Signups** | [Referred Signups](/platform-features/affiliate/affiliate-dashboard/referred-signups) |
| **Commissions** | [Commissions](/platform-features/affiliate/affiliate-dashboard/commissions) |
| **Payouts** | [Payouts](/platform-features/affiliate/affiliate-dashboard/payouts) — bank / PayPal / GigPay settings |
| **Support** | Open tickets from dashboard widgets or **Support** menu |
| **Profile** | Account and security settings |

---

## Related

* [Affiliate Registration](/platform-features/affiliate/registration)
* [Affiliate Dashboard](/platform-features/affiliate/affiliate-dashboard/)
* [Manage Affiliates (Admin)](/platform-features/affiliate/admin/manage-affiliates)
* [Affiliate Details (Admin)](/platform-features/affiliate/admin/affiliate-details)
* [Program, Commissions & Payouts](/platform-features/affiliate/admin/program-commissions-payouts)
