---
sidebar_position: 1
title: "CloudStack Features"
tags: ["orchestrator", "cloudstack", "features"]
---

# CloudStack Features

Feature documentation for **Apache CloudStack** in CMP — how compute, network, storage, and related services work for admins and customers after [CloudStack setup](/orchestrators/cloudstack/) is complete.

:::tip[Setup vs features]

Need to connect CloudStack, map zones, templates, or packages? Start with [Orchestrator Setup — CloudStack](/orchestrators/cloudstack/).

:::

## Feature list

| Feature | Status | Page |
|---|---|---|
| Virtual Machines | Partial | [Virtual Machine](/orchestrator-features/cloudstack/virtual-machine/) · [VM Downgrade](/orchestrator-features/cloudstack/virtual-machine/vm-downgrade) · [Monitoring](/orchestrator-features/cloudstack/virtual-machine/monitoring) |
| Sync Resources (Import VM) | In progress | [Sync Resources](/orchestrator-features/cloudstack/sync-resources) — onboard existing CloudStack VMs for management and billing |
| Networks | Partial | [Networks](/orchestrator-features/cloudstack/networks/) — VPC + Isolated ready; L2, Shared stubs |
| Volumes | Stub | [Volumes](/orchestrator-features/cloudstack/volumes) |
| Snapshots | Partial | [Snapshots](/orchestrator-features/cloudstack/snapshots) · [Snapshot schedules](/orchestrator-features/cloudstack/backup/schedules/snapshot-schedules) |
| VM Backup | Ready | [Backup](/orchestrator-features/cloudstack/backup/) · [Schedules](/orchestrator-features/cloudstack/backup/schedules/) · [Manage Backups](/orchestrator-features/cloudstack/backup/manage-backups) |
| Load Balancers | Stub | [Load Balancers](/orchestrator-features/cloudstack/load-balancers) |
| Kubernetes | Ready | [Kubernetes](/orchestrator-features/cloudstack/kubernetes/) — resource-based billing; separate control/worker plans; [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents); [Dashboard access](/orchestrator-features/cloudstack/kubernetes/accessing-dashboard) |
| IP Addresses | Stub | [IP Addresses](/orchestrator-features/cloudstack/ip-addresses) |
| Bandwidth | Ready | [Bandwidth](/orchestrator-features/cloudstack/bandwidth) — outgoing only; network-level (Isolated / VPC); CloudStack limitations |
| Autoscaling | Ready | [Autoscaling](/orchestrator-features/cloudstack/autoscaling/) — considerations + create at CMP |
| Templates | Ready | [Templates](/orchestrator-features/cloudstack/templates/) — My Template; create from VM root volume |
| ISO | Stub | [ISO](/orchestrator-features/cloudstack/iso) |
| Console Access | Stub | [Console Access](/orchestrator-features/cloudstack/console-access) |

:::info[Pages to prepare]

Feature pages marked **Stub** or **Partial** are still expanding. Pages marked **Ready** (for example Bandwidth, Autoscaling, Templates, Kubernetes) have usable admin documentation; refine them as product behaviour changes.

:::

## Related setup docs

| Topic | Link |
|---|---|
| Connect CloudStack | [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) |
| Zones | [Configuring Zones](/orchestrators/cloudstack/zones) |
| Templates (admin setup) | [Templates](/orchestrators/cloudstack/templates/) |
| Packages & offerings | [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) |
| Bandwidth billing | [Bandwidth](/orchestrator-features/cloudstack/bandwidth) |
| Storage settings | [Storage Settings](/orchestrators/cloudstack/storage-settings) |
| Quota (ACS) | [Quota Management (ACS)](/orchestrators/cloudstack/quota-management) |

## Related

* [Orchestrator Features](/orchestrator-features/)
* [CloudStack Setup](/orchestrators/cloudstack/)
