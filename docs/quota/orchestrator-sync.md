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

### Finding CloudStack quota settings

1. Go to CloudStack Admin → Global Settings
2. Search for `max`
3. Set pagination to 200 rows
4. Update the following key settings:

| CloudStack Setting | Set to |
| --- | --- |
| `max.account.vms` | ≥ CMP VM quota |
| `max.account.cpus` | ≥ CMP vCPU quota |
| `max.account.memory` | ≥ CMP RAM quota (in MB) |
| `max.account.primarystorage` | ≥ CMP storage quota (in GB) |
| `max.account.snapshots` | ≥ CMP snapshot quota |
| `max.account.publicips` | ≥ CMP IP quota |
| `max.domain.vms` | Set high or `-1` (unlimited) |
| `max.domain.cpus` | Set high or `-1` |
| `max.project.vms` | ≥ CMP project VM quota |

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

* [Global Resource Quotas](https://global-resource-quotas)
* [Account-Level Quotas](https://account-level-quotas)
* [Quota Requests & Approvals](https://quota-requests-approvals)
* [Quota Management — ACS](/doc/quota-management-acs)