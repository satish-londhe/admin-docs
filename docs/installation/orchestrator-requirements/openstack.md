---
sidebar_position: 4
title: "OpenStack Requirements"
tags: ["installation", "openstack", "requirements", "horizon"]
---

# OpenStack Requirements

This page covers the OpenStack-specific requirements needed before StackConsole can connect CMP to your OpenStack environment. Complete the [common prerequisites](/installation/prerequisites) first.

---

## 1. Access for StackConsole Team

**Option A — VPN Access (preferred)**

Provide VPN access to:

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Sushil More | sushil.more@stackconsole.io |

**Option B — IP Whitelist**

Whitelist our jump server:
```
14.192.19.227
```

---

## 2. Horizon Dashboard Credentials

🔴 This user must have **full admin rights** to manage zones, datastores, users, and projects.

| Field | Value |
|---|---|
| Horizon Dashboard URL | |
| Username | |
| Password | |
| Domain | |

---

## 3. CMP VM → OpenStack API Connectivity

The CMP backend server must reach the OpenStack control plane. Two access methods are supported:

**Method 1 — Private IP + Port**
```
http://10.0.12.10:5000    → Keystone (Identity)
```

**Method 2 — Service Domain Names**
```
https://keystone.openstack.yourcompany.com
```

### Required OpenStack Service Ports

All of these must be reachable from the CMP VM:

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

## 4. Known API Issues to Validate

Before installation, validate the following on your OpenStack environment:

### 4.1 API Version Suffixes

For services that support multiple API versions, the **version suffix must be present** in the service endpoint URL:

| Service | Required Version Suffix | Example |
|---|---|---|
| Nova (Compute) | `/v2.1` | `http://nova.example.com:8774/v2.1` |
| Neutron (Networking) | `/v2.0` | `http://neutron.example.com:9696/v2.0` |
| Cinder (Block Storage) | `/v3` | `http://cinder.example.com:8776/v3` |
| Magnum (ContainerInfra) | `/v1` | `http://magnum.example.com:9511/v1` |

:::warning
**Cinder project ID must be dynamic**, not static. The Cinder service endpoint must reference the currently selected project ID — not a hardcoded project UUID. Refer to [OpenStack Cinder API Docs](https://docs.openstack.org/api-ref/block-storage/v3/index.html).
:::

### 4.2 Keystone Without Version

Keystone must support authentication both with and without the version suffix:
- `https://keystone.openstack.yourcompany.com/v3` → must work
- `https://keystone.openstack.yourcompany.com` → must also allow auth discovery

### 4.3 Availability Zone Consistency

The **Availability Zone name must be identical** across all services (Nova, Cinder, Neutron). Mismatched AZ names cause silent provisioning failures.

---

## 5. Configuration Values Required for CMP

Provide the following values at the time of configuration. These are retrieved from your OpenStack environment:

| Variable | Required | Description |
|---|---|---|
| `project_id` | 🔴 | Admin default project ID |
| `domain_id` | 🔴 | Domain ID under which users and resources are created |
| `external_network_id` | 🔴 | Public Network ID used for public IP assignment |
| `open_stack_project_user_role` | 🔴 | Typically `member`; for Virtuozzo OpenStack there may be additional roles |
| `open_stack_default_storage_policy` | ⬜ | Default Storage Policy UUID (required if multiple storage types: SSD, NVMe, HDD) |
| `one_gb_multiplier` | ⬜ | Default: `1024` |
| `open_stack_admin_secret` | ⬜ | Required for Virtuozzo (VHI) OpenStack with Domain Admin role |
| `open_stack_admin_key` | ⬜ | Required for Virtuozzo (VHI) OpenStack |
| `open_stack_admin_domain` | ⬜ | Required for Virtuozzo (VHI) OpenStack |
| `open_stack_admin_project` | ⬜ | Required for Virtuozzo (VHI) OpenStack |

:::info
The `open_stack_admin_*` fields are only required for **Virtuozzo (VHI) OpenStack** deployments where a Domain Admin user is needed to manage projects, users, zones, storage policies, and quotas outside of the default project scope.
:::

---

## 6. Storage Types

Configure storage type labels in CloudStack/OpenStack to match what you want displayed in the CMP portal. Options:

- SSD
- NVMe
- HDD

No CMP-level configuration is required for storage type display — it is derived from what is configured in OpenStack.

---

## 7. OpenStack Setup Checkpoints

The StackConsole team will verify the following during installation. Ensure these work before scheduling setup:

- [ ] At least one **OS image/template** is available and bootable
- [ ] **4–5 flavors** are configured and available
- [ ] A test **user and project** have been created and the project is associated with the user
- [ ] Logging in as that test user and **creating all configured services** works
- [ ] **VM console access** works from the Horizon UI
- [ ] All OpenStack service endpoints are reachable from the CMP VM

---

## 8. OpenStack Checklist

Complete before scheduling installation:

- [ ] VPN access granted **or** jump server IP whitelisted
- [ ] Horizon dashboard URL and admin credentials provided
- [ ] All OpenStack service ports reachable from CMP VM
- [ ] API version suffixes verified on Nova, Neutron, Cinder, Magnum
- [ ] Keystone works with and without `/v3` suffix
- [ ] Availability Zone names are consistent across all services
- [ ] `project_id`, `domain_id`, `external_network_id` provided
- [ ] Storage policy UUID provided (if multiple storage types)
- [ ] OS images available and bootable
- [ ] 4–5 flavors configured
- [ ] CMP VMs provisioned (see [common prerequisites](/installation/prerequisites))
- [ ] Domain, SSL, SMTP provided

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [OpenStack Orchestrator Guide](/orchestrators/openstack/)
