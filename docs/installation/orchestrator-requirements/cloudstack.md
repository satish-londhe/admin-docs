---
sidebar_position: 2
title: "Apache CloudStack Requirements"
tags: ["installation", "cloudstack", "requirements", "acs"]
---

# Apache CloudStack Requirements

This page covers the CloudStack-specific requirements needed before StackConsole can connect CMP to your Apache CloudStack environment. Complete the [common prerequisites](/installation/prerequisites) first.

:::info
CMP supports both **full production deployments** and **POC/staging** setups for CloudStack. The requirements below apply to both unless noted otherwise.
:::

---

## 1. Access for StackConsole Team

The StackConsole team needs access to your CloudStack Dashboard to configure and validate the integration. Choose one:

**Option A — VPN Access (preferred)**

Provide VPN access to:

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Ganesh Kanade | ganesh.kanade@stackconsole.io |

**Option B — IP Whitelist**

Whitelist our jump server:
```
14.192.19.227
```

---

## 2. CloudStack Dashboard Credentials

🔴 **Minimum role: Domain Admin.** CMP uses DomainAdmin-level credentials for all API operations. ROOT admin is not required, but DomainAdmin is the **minimum**.

| Field | Value |
|---|---|
| CloudStack URL | _(e.g., `http://cloudstack.yourcompany.com:8080/client`)_ |
| Username | _(min. **Domain Admin** role)_ |
| Password | |
| CloudStack User Domain | _(the domain this admin user belongs to)_ |

:::warning
CMP does not use ROOT-level admin credentials. The DomainAdmin user must have full control over the domain it will manage — including creating users, VMs, networks, and quotas.
:::

---

## 3. CMP VM → CloudStack Connectivity

From all CMP VMs (staging or production), the CloudStack API endpoint must be reachable. Private access is recommended for production.

**Verify from each CMP VM:**
```bash
# Replace with your CloudStack API URL
curl http://cloudstack.yourcompany.com:8080/client/api
```

The response should be a JSON error (not a connection refused), confirming the API is reachable.

---

## 5. VM Templates

Templates are how CMP provisions operating system images for customer VMs.

**Requirements for all templates:**
- ✅ Marked as **Featured** in CloudStack
- ✅ Marked as **Public** in CloudStack
- ✅ Password-enabled (`password-enabled = true`)
- ✅ SSH key injection enabled
- ✅ Contains the CloudStack startup script (cloud-init or ACS native)
- ✅ Scalable root disk (supports disk resize)

:::warning
CMP **only fetches templates that are both Featured and Public**. Templates that are not marked as both will not appear in the customer portal.
:::

:::warning
**L2 networks do not support UserData.** Do not use password-enabled templates on L2 networks — password injection will silently fail.
:::

Refer to the [CloudStack Template Requirements](/orchestrators/cloudstack/templates/template-requirements) page for the complete template preparation guide.

---

## 6. CloudStack Global Settings (Required Before Setup)

Before connecting CMP, the following CloudStack global settings must be configured:

| Setting | Required Value | Purpose |
|---|---|---|
| `kvm.snapshot.enabled` | `true` | Enable VM snapshots on KVM hypervisors |
| Quota limits (CPU, RAM, IP) | Raise to appropriate values | CloudStack defaults are very low and will cause provisioning failures |

:::warning
CloudStack quota settings default to very low limits (e.g., 10 VMs per domain). These **must** be raised before customers start provisioning, or service creation will fail with quota errors.
:::

---

## 7. Network Verification

Verify the following before installation:

| Check | Command |
|---|---|
| Isolated network creation | Create a test isolated network from CloudStack UI |
| VPC creation | Create a test VPC |
| VM creation | Deploy a test VM on an isolated network |
| Public IP | Assign a public IP to the test VM and verify external access |
| VM console | Open VM console from CloudStack UI |

---

## 8. CloudStack Setup Checkpoints

The StackConsole team will verify the following during installation. Confirm these are working before scheduling the setup session:

- [ ] At least one **OS template** is available, featured, public, and working
- [ ] **Isolated networks** can be created and VMs deployed inside them
- [ ] **VPC networks** are working
- [ ] **VM creation** is functional (test by creating a VM manually)
- [ ] **Public IP** can be associated with a VM and accessed from external networks
- [ ] **VM console access** works from the CloudStack UI

---

## 9. Customer Registration Behavior

:::info
CMP uses **deferred customer registration** on CloudStack. A customer account is **not** created in CloudStack at the time of CMP registration. The CloudStack account is created only when the customer provisions their **first service** (e.g., creates a VM).
:::

---

## POC / Staging Notes

For a POC setup, a single VM with the staging URL is sufficient. The StackConsole team will configure the domain, SSL, and SMTP initially, so **public internet access on the staging VM is recommended**.

If you wish to configure your own domain for staging, provide:
- Staging URL (e.g., `staging.example.com`)
- Staging SSL certificates

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [CloudStack Connecting & Initial Setup](/orchestrators/cloudstack/)
- [CloudStack Templates Guide](/orchestrators/cloudstack/templates/template-requirements)
- [CloudStack Console Proxy Setup](/orchestrators/cloudstack/console-proxy)
- [Quota Management](/quota/global-quotas)
