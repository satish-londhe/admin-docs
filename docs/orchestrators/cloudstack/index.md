---
sidebar_position: 1
title: "CloudStack (ACS)"
tags: ["orchestrator", "cloudstack"]
---

# CloudStack (ACS)

Apache CloudStack is CMP's primary supported compute orchestrator. This section covers the complete setup from connecting CMP to CloudStack through to snapshots and backups.

## Pages in this section

* [Connecting CMP to CloudStack](https://connecting-cmp-to-cloudstack)
* [Domain & Credential Configuration](https://domain-credential-configuration)
* [Client Registration Flow](https://client-registration-flow)
* [Offering Sync & Packages](https://offering-sync-packages)
* [Console Proxy Setup](https://console-proxy-setup)
* [Quota Management](https://quota-management-acs)
* [Template Creation Requirements](https://template-creation-requirements)
* [Snapshot & Backup (pre-4.20)](https://snapshot-backup-pre-420)
* [CloudStack Native Backup (v4.20+)](https://cloudstack-native-backup-420)

## CloudStack version compatibility

| CMP Feature | Min ACS Version |
| --- | --- |
| Core VM provisioning | 4.11+ |
| Backup & Recovery (native) | 4.20+ |
| KVM snapshots | 4.11+ (requires `kvm.snapshot.enabled = true`) |