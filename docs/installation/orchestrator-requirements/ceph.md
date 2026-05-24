---
sidebar_position: 6
title: "CEPH Requirements"
tags: ["installation", "ceph", "object-storage", "s3", "requirements"]
---

# CEPH Requirements

This page covers the CEPH-specific requirements needed before StackConsole can connect CMP to your CEPH cluster. Complete the [common prerequisites](/installation/prerequisites) first.

:::info
CEPH is a **standalone integration** in CMP — it is an independent object storage provider and is not tied to any specific compute orchestrator (CloudStack, VMware, etc.). It can be used alongside any orchestrator.
:::

---

## 1. Access for StackConsole Team

**Option A — VPN Access (preferred)**

Provide VPN access to:

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Abhishek Burkule | abhishek.burkule@stackconsole.io |

**Option B — IP Whitelist**

Whitelist our jump server:
```
14.192.19.227
```

---

## 2. CEPH Dashboard Credentials

🔴 An **Admin-level** CEPH user is required for CMP to manage pools, RBD images, and object storage.

| Field | Value |
|---|---|
| CEPH Dashboard URL | _(e.g., `https://ceph.yourcompany.com:8443`)_ |
| Username _(Admin role)_ | |
| Password | |

---

## 3. S3 Endpoint

CMP exposes CEPH as an S3-compatible object storage service to customers. The S3 endpoint must have **public access** because:
- Large file transfers (ISO uploads, backups) use S3 presigned URLs
- Customers may access storage via S3 CLI tools

| Field | Value |
|---|---|
| S3 Endpoint URL _(public access)_ | _(e.g., `https://s3.yourcompany.com`)_ |

:::warning
The S3 endpoint must be publicly accessible. Private-only S3 endpoints will prevent customers from uploading/downloading large files and using S3-compatible clients.
:::

---

## 4. CMP VM → CEPH Connectivity

From all CMP VMs, the CEPH API and S3 endpoint must be reachable. **Private access is recommended** for the CEPH dashboard; the S3 endpoint requires public access.

**Verify from the CMP VM:**
```bash
# CEPH Dashboard API
curl https://ceph.yourcompany.com:8443/api/health/minimal

# S3 Endpoint
curl https://s3.yourcompany.com
```

---

## 5. CEPH Zone Configuration

Before CMP integration, the CEPH environment must have at least one zone configured:

- **One zone** must be configured and active in CEPH
- The zone must be associated with a realm and zone group
- The S3 endpoint must be bound to this zone

---

## 6. CEPH Setup Checkpoints

The StackConsole team will verify the following during installation:

- [ ] At least **one zone** is configured in CEPH
- [ ] **S3 endpoint is publicly accessible** (test with an S3 client or `curl`)
- [ ] CEPH Dashboard is accessible from the StackConsole team's access method (VPN/whitelist)
- [ ] Admin credentials allow management of pools, users, and object storage

---

## 7. CEPH Checklist

Complete before scheduling installation:

- [ ] VPN access granted **or** jump server IP whitelisted
- [ ] CEPH Dashboard URL and admin credentials provided
- [ ] S3 endpoint URL provided and publicly accessible
- [ ] At least one zone configured in CEPH
- [ ] CEPH API reachable from CMP VM
- [ ] CMP VMs provisioned (see [common prerequisites](/installation/prerequisites))
- [ ] Domain, SSL, SMTP provided

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [CEPH Orchestrator Guide](/orchestrators/ceph/)
