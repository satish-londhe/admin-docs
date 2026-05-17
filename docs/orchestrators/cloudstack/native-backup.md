---
sidebar_position: 10
title: "CloudStack Native Backup (v4.20+)"
tags: ["orchestrator", "cloudstack", "backup"]
---

# CloudStack Native Backup (v4.20+)

CloudStack 4.20 introduced a native backup and recovery framework. CMP integrates with this for setups running ACS 4.20 or later.

## Official reference

https://docs.cloudstack.apache.org/en/4.20.1.0/adminguide/backup\_and\_recovery.html

## Supported backup providers

| Provider | Documentation |
| --- | --- |
| Veeam Backup and Replication | https://docs.cloudstack.apache.org/en/4.22.0.0/adminguide/veeam\_plugin.html |
| DELL EMC Networker | https://docs.cloudstack.apache.org/en/4.22.0.0/adminguide/networker\_plugin.html |
| NAS Backup | https://docs.cloudstack.apache.org/en/4.22.0.0/adminguide/nas\_plugin.html |

## One-time backup

> ❓ **Is there an option to perform a one-time backup?** — To be documented based on current CloudStack native backup capabilities.

## Switching from CMP snapshot-based to CloudStack native backup

### Before you switch

* Understand the differences between CMP automated snapshots (pre-4.20) and CloudStack native backup
* Ensure your backup provider plugin is installed and configured in CloudStack
* Test backup and restore on a non-production VM first

### Recommended migration steps

1. Disable CMP automated backup for existing VMs (this deletes all CMP-managed snapshots)
2. Configure the CloudStack backup provider (Veeam / NAS / Networker)
3. Enable CloudStack native backup for VMs via the CMP or CloudStack admin UI
4. Verify backup jobs run successfully
5. Test restore on a test VM

> ⚠️ **Do not mix** CMP snapshot-based backup and CloudStack native backup on the same VM. Disable one before enabling the other.