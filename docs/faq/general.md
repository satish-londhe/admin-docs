---
sidebar_position: 2
title: "General & Feature FAQs"
tags: ["faq"]
---

# General & Feature FAQs

## Can we migrate an instance from one region to another?

This feature is currently **not available in CMP**. For specific VMs, migration can be performed directly via the orchestrator (e.g. CloudStack or OpenStack).

If you need this in CMP, share how migration is handled at the provider level so feasibility can be reviewed for the roadmap.

---

## Where can I find client feedback when a VM is destroyed?

Go to **Admin → Cancellation Requests**. The "Request to Destroy service" details are listed there.

---

## How can a provider add an external documentation URL?

As an admin, add the **Knowledge Base URL** in **Branding Settings**.

Once configured, the link appears:

* In the left menu bar
* On the dashboard page

Clicking it redirects users to your external documentation site.

---

## How can I change images for Login, Register, Forgot Password, Logout, and 2FA pages?

Image customization is supported only for **Theme1, Theme2, and Theme3**.

**Path:** Admin Panel → Branding Settings → Theme Configuration → Select Theme1/2/3 → Apply → Edit theme → Upload images

---

## What happens if a user schedules VM start/stop — how is usage calculated?

When stoppable services are enabled and a VM is stopped:

* **CPU and Memory charges stop**
* **Volume and IP Address** charges continue

---

## Can I provide a free 50 GB OS disk to all users?

No — keeping only the OS disk free is not currently supported. Alternatives:

* Use coupons
* Set storage pricing to 0 in rate cards (note: this applies to all volumes, not just OS disks — users could create unlimited free volumes)

---

## If I don't select "override root disk" at instance creation, will it cause issues?

No issues, but this is a **one-time setup decision** that cannot be changed after production due to billing limitations.

**Option A — Storage as a separate component (override disk enabled):**

* Customer selects root disk size at instance creation
* Storage billed separately from compute

**Option B — Storage included in compute offering:**

* Disable override root disk in cloud provider settings
* Create compute offerings in CloudStack with storage included
* Update rate cards accordingly
* Note: Stoppable-service billing pause for CPU/RAM will not work if storage is bundled

---

## Is it possible to include disk size in the compute offering so users only select the offering?

Yes — see the override disk option above. When override disk is disabled, storage is included in the compute offering.

---

## Can I offer a free Public IP when bundled with an instance and charge only for reserved IPs?

This specific option is not currently available. The system has a global setting to either charge for Public IPs or keep them free — but not a conditional model based on bundling vs reserved.

---

## Can I permanently delete an account?

* Accounts with **pending email verification** can be deleted from the Client Listing page while in Pending status
* Accounts in other states cannot currently be permanently deleted

---

## What if we want to include storage in the compute offering? Can pricing be defined separately?

If storage is bundled in compute offerings, separating pricing becomes complex. The recommended approach is to use the override disk option to keep compute and storage pricing independent.