---
sidebar_position: 5
title: "Orchestrator-Side Quota Sync"
tags: ["quota"]
---

# Orchestrator-Side Quota Sync

CMP manages quotas at its own application level, but **the orchestrator enforces limits independently** at the domain, account, and project layers. These two systems are not automatically synced.

## The mismatch problem

```
CMP allows: 20 vCPUs for Customer A
CloudStack account limit: 10 vCPUs (default or outdated)

Result: Customer hits orchestrator limit before CMP limit
        → Provisioning fails with a CloudStack error
        → Customer sees a confusing error despite having CMP quota available
```

Always keep orchestrator limits **equal to or greater than** CMP quota values.

## CloudStack quota sync

CloudStack enforces limits at three levels: Domain, Account, and Project.

**Recommended settings in CloudStack:**

* Set Domain-level limits to `unlimited` or a very high value
* Set Account and Project limits to match or exceed the CMP account quota for each customer

See [Quota Management (ACS)](/orchestrators/cloudstack/quota-management) for the full CloudStack `max.*` settings reference and default values.

| CloudStack Setting | Set to |
| --- | --- |
| `max.account.user.vms` | ≥ CMP VM quota |
| `max.account.cpus` | ≥ CMP vCPU quota |
| `max.account.memory` | ≥ CMP RAM quota (in MiB) |
| `max.account.primary.storage` | ≥ CMP storage quota (in GiB) |
| `max.account.snapshots` | ≥ CMP snapshot quota |
| `max.account.public.ips` | ≥ CMP IP quota |
| `max.domain.user.vms` | Set high or `-1` (unlimited) |
| `max.domain.cpus` | Set high or `-1` |
| `max.project.user.vms` | ≥ CMP project VM quota |

### After approving a CMP quota request

When you approve a customer's quota increase in CMP, remember to also update the corresponding account limits in CloudStack for that customer's domain and account.

## OpenStack quota sync

OpenStack uses Neutron, Nova, and Cinder quota settings per project. After updating CMP account quotas, update the corresponding OpenStack project quotas:

```
openstack quota set --instances <n> --cores <n> --ram <n> <project_id>
openstack quota set --gigabytes <n> --volumes <n> <project_id>
```

## General best practice

> Keep a simple rule: set orchestrator limits to **2× the max CMP quota** you plan to ever assign. This prevents orchestrator limits from ever being the bottleneck during normal operations.

## Related

* [Global Resource Quotas](/quota/global-quotas)
* [Account-Level Quotas](/quota/account-quotas)
* [Quota Requests & Approvals](/quota/quota-requests)
* [Quota Management — ACS](/orchestrators/cloudstack/quota-management)
