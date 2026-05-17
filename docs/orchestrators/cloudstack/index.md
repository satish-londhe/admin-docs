---
sidebar_position: 1
title: "CloudStack (ACS)"
tags: ["orchestrator", "cloudstack"]
---

# CloudStack (ACS)

Apache CloudStack is CMP's primary supported compute orchestrator. This section covers the complete setup from connecting CMP to CloudStack through to snapshots and backups.

## Pages in this section

* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Domain & Credential Configuration](/orchestrators/cloudstack/domain-credentials)
* [Client Registration Flow](/orchestrators/cloudstack/client-registration)
* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync)
* [Console Proxy Setup](/orchestrators/cloudstack/console-proxy)
* [Quota Management](/orchestrators/cloudstack/quota-management)
* [Template Creation Requirements](/orchestrators/cloudstack/template-requirements)
* [Snapshot & Backup (pre-4.20)](/orchestrators/cloudstack/snapshot-backup)
* [CloudStack Native Backup (v4.20+)](/orchestrators/cloudstack/native-backup)

## CloudStack version compatibility

| CMP Feature | Min ACS Version |
| --- | --- |
| Core VM provisioning | 4.11+ |
| Backup & Recovery (native) | 4.20+ |
| KVM snapshots | 4.11+ (requires `kvm.snapshot.enabled = true`) |
