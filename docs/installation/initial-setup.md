---
sidebar_position: 5
title: "Initial Super Admin Setup"
tags: ["installation"]
---

# Initial Super Admin Setup

After CMP is installed and accessible, the first task is creating the super admin account and completing the initial platform configuration.

## Step 1 — Create the super admin account

On first launch, CMP presents a setup wizard or a registration form for the super admin.

* Use a **valid, accessible email address** — this is critical for 2FA enforcement and password recovery
* Set a strong password
* Save these credentials securely

> ⚠️ If you plan to enable Keycloak SSO later, the super admin must be manually created in Keycloak using this same email address before enabling SSO. See [Keycloak Integration Setup](/auth/keycloak).

## Step 2 — Configure branding

Go to **Admin Panel → Branding Settings** to set:

* Company name and logo
* Theme selection (Theme1, Theme2, or Theme3 for image customization)
* Login / register page background images (Theme1/2/3 only)
* Knowledge Base URL (appears in the left menu and dashboard)

## Step 3 — Configure global settings

Go to **Admin Panel → Global Settings** and review key defaults:

| Setting | Recommended action |
| --- | --- |
| `default_date_time_format` | Set your preferred date/time format for new accounts |
| `enforce_2fa_to_all` | Enable if 2FA is mandatory across all users |
| `plan_ip_billing` | Set `true` to charge for IP addresses separately from VM packages |
| `backup_limit` | Set maximum snapshot retention count |
| Free bandwidth | Set the free bandwidth threshold (GB/month) per cloud provider |

See [Environment Variables Reference](/installation/env-variables) for related configuration.

## Step 4 — Add your first Cloud Provider (Orchestrator)

Go to **Settings → Orchestrator → Cloud Providers → Add** and configure your first orchestrator.

* [CloudStack setup guide](/orchestrators/cloudstack/connecting)
* [OpenStack setup guide](/orchestrators/openstack/)
* [VMware setup guide](/orchestrators/vmware/)

## Step 5 — Configure Zones

After adding a Cloud Provider, map your zones.

Go to **Settings → Orchestrator → Zones → Add Zone**.

See [Configuring Zones in CMP](/orchestrators/cloudstack/zones).

## Step 6 — Create packages

With zones configured, create your first packages (VM, storage, etc.).

See [Packages & Offerings](/packages/overview).

## Setup completion checklist

* Super admin account created with a valid email
* Branding configured
* Global settings reviewed
* At least one Cloud Provider configured
* At least one Zone created and mapped
* Packages created
* Test customer account created and service provisioned end-to-end
