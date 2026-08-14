---
sidebar_position: 4
title: "OpenStack Requirements"
tags: ["installation", "openstack", "requirements", "horizon"]
---

# OpenStack Requirements

This page is the OpenStack onboarding checklist for StackConsole / CMP. Complete the [common prerequisites](/installation/prerequisites) and confirm [hosting topology](/installation/hosting-topology) as well.

CMP’s OpenStack adapter supports **Upstream OpenStack**, **Red Hat OpenStack Platform (RHOSP)**, **Canonical Charmed OpenStack**, and **Virtuozzo Hybrid Infrastructure (VHI)** through the same OpenStack / OpenStack-compatible REST APIs. See [Supported platforms](/orchestrators/openstack/#supported-platforms).

:::info[Bare minimum]

Items marked as **required to begin** in the [checklist](#9-checklist) must be ready before setup can start. Without those prerequisites, installation cannot proceed.

:::

---

## 1. Access for StackConsole Team

To access the Horizon Dashboard UI, use one of:

**Option A — VPN access (preferred)**

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Sushil More | sushil.more@stackconsole.io |

**Option B — IP whitelist**

If VPN is not feasible, whitelist the StackConsole jump server:

```text
14.192.19.227
```

---

## 2. Horizon Dashboard Credentials

This user must have **full admin rights** to manage zones, datastores, users, and projects.

| Field | Value |
|---|---|
| **Horizon Dashboard URL** | |
| **Username** | |
| **Password** | |
| **Domain** | |

---

## 3. CMP VM → OpenStack API connectivity

The CMP backend must reach the OpenStack control plane. **Private access is recommended** for production.

**Method 1 — Private IP + port**

```text
http://10.0.12.10:5000    → Keystone (Identity)
```

**Method 2 — Service domain names**

```text
https://keystone.openstack.example.com
```

### Required OpenStack service ports

| Service | Port | Notes |
|---|---|---|
| Keystone (Identity) | 5000 | Auth and token issuance |
| Nova (Compute) | 8774 | VM operations |
| Placement | 8778 | Resource scheduling |
| Glance (Image) | 9292 | OS image management |
| Neutron (Networking) | 9696 | Network operations |
| Cinder (Block Storage) | 8776 | Volume management |
| Horizon (Dashboard) | 80 / 443 | Optional, for UI access |
| Magnum (Container Infra) | varies | Optional, for Kubernetes |

---

## 4. CMP VM configuration

Shared install inputs:

- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>

---

## 5. Domain, SSL, SMTP, and app logos

Shared install inputs:

- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- <a href="/installation/prerequisites#ssl--tls-certificates" target="_blank" rel="noopener noreferrer">SSL / TLS Certificates</a>
- <a href="/installation/prerequisites#smtp--email-configuration" target="_blank" rel="noopener noreferrer">SMTP / Email Configuration</a>
- <a href="/installation/prerequisites#app-logos" target="_blank" rel="noopener noreferrer">App Logos</a>

---

## 6. Known API issues to validate

Validate the following on your OpenStack environment before installation:

### API version suffixes

For services that support multiple API versions, the **version suffix must be present** in the service endpoint URL:

| Service | Required version suffix | Example |
|---|---|---|
| Nova (Compute) | `/v2.1` | `http://nova.example.com:8774/v2.1` |
| Neutron (Networking) | `/v2.0` | `http://neutron.example.com:9696/v2.0` |
| Cinder (Block Storage) | `/v3` | `http://cinder.example.com:8776/v3` |
| Magnum (ContainerInfra) | `/v1` | `http://magnum.example.com:9511/v1` |

:::warning[Dynamic Cinder project ID]

**Cinder project ID must be dynamic**, not static. The Cinder service endpoint must reference the currently selected project ID — not a hardcoded project UUID. See [OpenStack Cinder API docs](https://docs.openstack.org/api-ref/block-storage/v3/index.html).

:::

### Keystone without version

Keystone must support authentication both with and without the version suffix:

- `https://keystone.openstack.example.com/v3` → must work
- `https://keystone.openstack.example.com` → must also allow auth discovery

### Availability Zone consistency

The **Availability Zone name must be identical** across all services (Nova, Cinder, Neutron). Mismatched AZ names cause silent provisioning failures.

---

## 7. Configuration values required for CMP

Provide these values at configuration time (from your OpenStack environment):

| Variable | Required | Description |
|---|---|---|
| `project_id` | Yes | Admin default project ID |
| `domain_id` | Yes | Domain ID under which users and resources are created |
| `external_network_id` | Yes | Public network ID used for public IP assignment |
| `open_stack_project_user_role` | Yes | Typically `member`; Virtuozzo may need additional roles |
| `open_stack_default_storage_policy` | Optional | Default storage policy UUID (required if multiple storage types: SSD, NVMe, HDD) |
| `one_gb_multiplier` | Optional | Default: `1024` |
| `open_stack_admin_secret` | Optional | Required for Virtuozzo (VHI) with Domain Admin role |
| `open_stack_admin_key` | Optional | Required for Virtuozzo (VHI) |
| `open_stack_admin_domain` | Optional | Required for Virtuozzo (VHI) |
| `open_stack_admin_project` | Optional | Required for Virtuozzo (VHI) |

:::info[Virtuozzo / VHI]

The `open_stack_admin_*` fields are only required for **Virtuozzo (VHI)** deployments where a Domain Admin user must manage projects, users, zones, storage policies, and quotas outside the default project scope.

:::

---

## 8. Storage types

Configure storage type labels in OpenStack to match what you want displayed in the CMP portal (for example **SSD**, **NVMe**, **HDD**). CMP displays storage types as defined in OpenStack.

---

## 9. Checklist

Items needed to **begin** setup (without these, setup cannot proceed):

### Access and OpenStack

- [ ] VPN access to StackConsole team provided **or** jump server IP whitelisted
- [ ] Horizon dashboard URL and admin credentials provided
- [ ] OpenStack service ports reachable from CMP VMs

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

### OpenStack configuration

- [ ] API version suffixes verified on Nova, Neutron, Cinder, Magnum (as used)
- [ ] Keystone works with and without `/v3` suffix
- [ ] Availability Zone names consistent across services
- [ ] `project_id`, `domain_id`, `external_network_id` provided
- [ ] Storage policy UUID provided (if multiple storage types)

### Other

- [ ] SMTP details provided
- [ ] App logos (light + dark) provided when branding is required

---

## 10. OpenStack setup checkpoints

| Check | Notes |
|---|---|
| At least one OS image/template available and bootable | |
| **4–5 flavors** configured and available | |
| Test user and project created; project associated with user | |
| Logging in as that test user and creating configured services works | |
| VM console access works from Horizon | |
| All required OpenStack service endpoints reachable from CMP VMs | |

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- [OpenStack Orchestrator Guide](/orchestrators/openstack/)
- [Preparing CMP-compatible images](/orchestrators/openstack/images/preparing-cmp-compatible-images)
- [Payment Gateways](/billing/payment-gateways/)
