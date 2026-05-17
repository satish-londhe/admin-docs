---
sidebar_position: 2
title: "Supported Orchestrators"
tags: ["overview"]
---

# Supported Orchestrators

CMP supports the following cloud orchestrators and infrastructure backends. Each has a dedicated setup guide under the [Orchestrator Setup](/collection/orchestrator-setup) collection.

| Orchestrator | Type | Status | Setup Guide |
| --- | --- | --- | --- |
| Apache CloudStack (ACS) | Compute | ✅ Production | [CloudStack Setup](/doc/cloudstack-acs) |
| OpenStack | Compute | ✅ Production | [OpenStack Setup](/doc/openstack) |
| VMware vSphere | Compute | ✅ Production | [VMware Setup](/doc/vmware-vsphere) |
| Proxmox VE | Compute | ✅ Production | [Proxmox Setup](/doc/proxmox) |
| OpenNebula | Compute | ✅ Production | [OpenNebula Setup](/doc/opennebula) |
| CEPH | Storage | ✅ Production | [CEPH Setup](/doc/ceph-storage) |
| PowerDNS | DNS | ✅ Production | [PowerDNS Setup](/doc/powerdns) |

## Notes on multi-orchestrator setups

CMP can manage multiple orchestrators simultaneously. Each orchestrator is configured as a separate **Cloud Provider** under Settings → Orchestrator. Zones are then mapped to specific Cloud Provider setups.

> **Important:** Packages, quotas, and zones are always tied to a specific Cloud Provider + Zone combination. Ensure each is configured correctly before onboarding customers.