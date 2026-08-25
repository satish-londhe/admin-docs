---
sidebar_position: 1
title: "Orchestrator Features"
tags: ["orchestrator", "features"]
---

# Orchestrator Features

This section documents **product features** customers and admins use for each connected orchestrator — VMs, networks, storage, backups, and related capabilities in CMP.

It is separate from **[Orchestrator Setup](/orchestrators/cloudstack/)** (connecting providers, zones, templates, packages, and other onboarding configuration).

| Section | Purpose |
|---|---|
| **[Orchestrator Setup](/orchestrators/cloudstack/)** | How to connect and configure an orchestrator in CMP |
| **Orchestrator Features** (this section) | How features work after the orchestrator is set up |

:::important[Backup: two different models]

**CloudStack/OpenStack VM backup** = integrated in CMP via orchestrator APIs (no agents).  
**Veeam VSPC** = separate product; customer configures backups manually in Veeam.

See **[Backup and Recovery](/overview/backup-and-recovery)**.

:::

## Orchestrators in this section

| Orchestrator | Feature docs |
|---|---|
| [CloudStack (ACS)](/orchestrator-features/cloudstack/) | Feature list and per-feature pages |
| [OpenStack](/orchestrator-features/openstack/) | Supported features + roadmap; Bandwidth ready |
| [VMware](/orchestrator-features/vmware/) | Feature list — pages coming soon |
| [Proxmox VE](/orchestrator-features/proxmox/) | Feature list; [Networks](/orchestrator-features/proxmox/networks); [IPAM](/orchestrator-features/proxmox/ipam); [Backup](/orchestrator-features/proxmox/backup) (docs in progress); [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap) |
| [OpenNebula](/orchestrator-features/opennebula/) | Feature list — pages coming soon |
| [CEPH](/orchestrator-features/ceph/) | Object storage, buckets, and S3 credentials |
| [Impossible Cloud](/orchestrator-features/impossible-cloud/) | S3 object storage — versioning, Object Lock, retention |
| [Veeam](/orchestrator-features/veeam/) | VSPC plans, credentials, quotas — **manual** backup jobs in VSPC (standalone) |
| [PowerDNS](/orchestrator-features/powerdns/) | DNS domain and record management (customer portal) |

:::info[How this section grows]

Each orchestrator has an **index** with the feature list. Dedicated pages are added as feature documentation is prepared. Prefer linking related setup topics (packages, zones, storage) from the feature page instead of duplicating setup content.

:::

## Related

* [Supported Orchestrators](/overview/supported-orchestrators)
* [Platform Features](/platform-features/) — CMP-level features (APIs, notifications, store)
* [CloudStack Setup](/orchestrators/cloudstack/)
* [Billing Overview](/billing/overview)
