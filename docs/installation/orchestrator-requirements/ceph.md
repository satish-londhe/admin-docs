---
sidebar_position: 6
title: "CEPH Requirements"
tags: ["installation", "ceph", "object-storage", "s3", "requirements"]
---

# CEPH Requirements

This page is the CEPH onboarding checklist for StackConsole / CMP. Complete the [common prerequisites](/installation/prerequisites) and confirm [hosting topology](/installation/hosting-topology) as well.

:::warning[Standalone object storage]

CEPH is independent of compute orchestrators (CloudStack, VMware, and others). You can run it alongside any compute setup so customers can provision buckets, credentials, and object storage plans through CMP. See also [ceph.io](https://ceph.io/en/).

:::

:::info[Bare minimum]

Items marked as **required to begin** in the [checklist](#7-checklist) must be ready before setup can start. Without those prerequisites, installation cannot proceed.

:::

---

## 1. Access for StackConsole Team

To access the CEPH Dashboard UI, use one of:

**Option A — VPN access (preferred)**

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Ganesh Kanade | ganesh.kanade@stackconsole.io |

**Option B — IP whitelist**

If VPN is not feasible, whitelist the StackConsole jump server:

```text
14.192.19.227
```

---

## 2. CEPH Dashboard Credentials

CMP needs a CEPH user with at least the **Admin** role (for RGW users, buckets, and related S3 operations).

| Field | Value |
|---|---|
| **CEPH URL** | _(for example `https://ceph.example.com:8443`)_ |
| **Username** | _(minimum **Admin** role)_ |
| **Password** | |

---

## 3. S3 Endpoint

CMP exposes CEPH as S3-compatible object storage. The S3 endpoint must have **public access** because:

- Large file transfers (ISO uploads, backups) use S3 presigned URLs
- Customers may access storage via S3 CLI tools

| Field | Value |
|---|---|
| **S3 Endpoint URL** _(public access)_ | _(for example `https://s3.example.com`)_ |

:::warning[Public S3 required]

Private-only S3 endpoints prevent customers from uploading/downloading large files and using S3-compatible clients.

:::

---

## 4. CMP VM → CEPH connectivity

From all CMP VMs, the CEPH API must be reachable. **Private access is recommended** for the CEPH dashboard; the S3 endpoint requires public access.

Communication between the CMP VM and CEPH must be allowed on the configured ports.

```bash
# CEPH Dashboard API — replace with your URL
curl https://ceph.example.com:8443/api/health/minimal

# S3 Endpoint
curl https://s3.example.com
```

---

## 5. CMP VM configuration

Shared install inputs:

- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>

---

## 6. Domain, SSL, SMTP, and app logos

Shared install inputs:

- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- <a href="/installation/prerequisites#ssl--tls-certificates" target="_blank" rel="noopener noreferrer">SSL / TLS Certificates</a>
- <a href="/installation/prerequisites#smtp--email-configuration" target="_blank" rel="noopener noreferrer">SMTP / Email Configuration</a>
- <a href="/installation/prerequisites#app-logos" target="_blank" rel="noopener noreferrer">App Logos</a>

---

## 7. Checklist

Items needed to **begin** setup (without these, setup cannot proceed):

### Access and CEPH

- [ ] VPN access to StackConsole team provided **or** jump server IP whitelisted
- [ ] CEPH access — at least **Admin** user credentials (URL, username, password)
- [ ] S3 endpoint URL provided and publicly accessible

### Staging VM

- [ ] Staging VM and credentials provided
- [ ] Staging URL provided
- [ ] Staging SSL certificates provided

### Production VM

- [ ] Frontend VM and credentials provided
- [ ] Backend VM and credentials provided
- [ ] Database VM and credentials provided

### Production URL and SSL

- [ ] Frontend URL provided
- [ ] Backend URL provided
- [ ] Frontend VM can reach backend API URL (`curl` / connectivity tested)
- [ ] Production SSL certificates provided

### Other

- [ ] SMTP details provided
- [ ] App logos (light + dark) provided when branding is required

---

## 8. CEPH setup checkpoints

| Check | Notes |
|---|---|
| At least **one zone** configured and active | Zone associated with a realm and zone group |
| **S3 endpoint** publicly accessible | Test with an S3 client or `curl` |
| CEPH Dashboard accessible | Via VPN or whitelisted jump IP |
| Admin credentials can manage pools, users, and object storage | |

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- [CEPH Orchestrator Guide](/orchestrators/ceph/)
- [Payment Gateways](/billing/payment-gateways/)
