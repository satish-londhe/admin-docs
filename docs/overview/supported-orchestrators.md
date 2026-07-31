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
| OpenStack | Compute | ✅ Production | [OpenStack Setup](/orchestrators/openstack/) — Upstream **2025.1+**, **RHOSP**, **Canonical Charmed OpenStack**, and **VHI** via one OpenStack REST API adapter |
| VMware vSphere | Compute | ✅ Production | [VMware Setup](/orchestrators/vmware/) |
| Proxmox VE | Compute | ✅ Production | [Proxmox Setup](/orchestrators/proxmox/) |
| OpenNebula | Compute | ✅ Production | [OpenNebula Setup](/orchestrators/opennebula/) |
| CEPH | Storage | ✅ Production | [CEPH Setup](/orchestrators/ceph/) |
| Veeam (VSPC) | Backup | ✅ Production | [Veeam Setup](/orchestrators/veeam/) |
| PowerDNS | DNS | ✅ Production | [PowerDNS Setup](/orchestrators/powerdns/) |

### OpenStack distributions

CMP does **not** treat these as separate orchestrator types. One OpenStack integration covers:

| Platform | Method |
|---|---|
| Upstream OpenStack (2025.1 / Epoxy+) | OpenStack REST APIs |
| Red Hat OpenStack Platform (RHOSP) | OpenStack REST APIs |
| Canonical Charmed OpenStack | OpenStack REST APIs |
| Virtuozzo Hybrid Infrastructure (VHI) | OpenStack-compatible REST APIs |

Details: [OpenStack — Supported platforms](/orchestrators/openstack/#supported-platforms).

## Notes on multi-orchestrator setups

CMP can manage multiple orchestrators simultaneously. Each orchestrator is configured as a separate **Cloud Provider** under Settings → Orchestrator. Zones are then mapped to specific Cloud Provider setups.

> **Important:** Packages, quotas, and zones are always tied to a specific Cloud Provider + Zone combination. Ensure each is configured correctly before onboarding customers.
