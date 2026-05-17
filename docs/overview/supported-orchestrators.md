---
sidebar_position: 2
title: "Supported Orchestrators"
tags: ["overview"]
---

# Supported Orchestrators

CMP supports the following cloud orchestrators and infrastructure backends. Each has a dedicated setup guide under the [Orchestrator Setup](/orchestrators/cloudstack/) section.

| Orchestrator | Type | Status | Setup Guide |
| --- | --- | --- | --- |
| Apache CloudStack (ACS) | Compute | ✅ Production | [CloudStack Setup](/orchestrators/cloudstack/) |
| OpenStack | Compute | ✅ Production | [OpenStack Setup](/orchestrators/openstack/) |
| VMware vSphere | Compute | ✅ Production | [VMware Setup](/orchestrators/vmware/) |
| Proxmox VE | Compute | ✅ Production | [Proxmox Setup](/orchestrators/proxmox/) |
| OpenNebula | Compute | ✅ Production | [OpenNebula Setup](/orchestrators/opennebula/) |
| CEPH | Storage | ✅ Production | [CEPH Setup](/orchestrators/ceph/) |
| PowerDNS | DNS | ✅ Production | [PowerDNS Setup](/orchestrators/powerdns/) |

## Notes on multi-orchestrator setups

CMP can manage multiple orchestrators simultaneously. Each orchestrator is configured as a separate **Cloud Provider** under Settings → Orchestrator. Zones are then mapped to specific Cloud Provider setups.

> **Important:** Packages, quotas, and zones are always tied to a specific Cloud Provider + Zone combination. Ensure each is configured correctly before onboarding customers.
