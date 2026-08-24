---
sidebar_position: 1
title: "CloudStack (ACS)"
tags: ["orchestrator", "cloudstack"]
---

# CloudStack (ACS)

Apache CloudStack is CMP's primary supported compute orchestrator. This section covers the complete **setup** from connecting CMP to CloudStack through to snapshots and backups.

For customer/admin **feature** docs (VMs, networks, volumes, backup, and so on), see [CloudStack Features](/orchestrator-features/cloudstack/) — including [Backup](/orchestrator-features/cloudstack/backup/).

## Pages in this section

* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Configuring Zones in CMP](/orchestrators/cloudstack/zones) — map CloudStack zones for customer provisioning
* [Templates](/orchestrators/cloudstack/templates/) — prepare and configure OS templates in CMP
* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) — map offerings to CMP rate card packages
* [Quota Management (ACS)](/orchestrators/cloudstack/quota-management) — set CloudStack-level quota limits
* [Storage Settings](/orchestrators/cloudstack/storage-settings) — map disk offerings to CMP storage categories

* [Client Registration Flow](/orchestrators/cloudstack/client-registration)
* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Console Proxy Setup](/orchestrators/cloudstack/console-proxy)
* [Backup](/orchestrator-features/cloudstack/backup/) — concepts; Automated VM Snapshot as Backup vs B&R-Based Backup
* [Automated VM Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-vm-snapshot-as-backup)
* [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup)

## CloudStack version compatibility

| CMP Feature | Min ACS Version |
| --- | --- |
| Core VM provisioning | 4.11+ |
| Backup & Recovery (native) | 4.20+ |
| KVM snapshots | 4.11+ (requires `kvm.snapshot.enabled = true`) |
