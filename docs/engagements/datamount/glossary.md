---
sidebar_position: 15
title: "Glossary"
tags: ["engagement", "datamount", "glossary"]
---

# Glossary

:::warning[Engagement-only — confidential]

Internal / vendor–client review. Not general product documentation.

:::

**Hub:** [DataMount Integration Review](/engagements/datamount/)

| Term | Full form | Purpose / use |
|---|---|---|
| **VCD** | VMware Cloud Director | Multi-tenant cloud platform: Organizations, VDCs, VMs, catalogs, networking |
| **vCenter** | VMware vCenter Server | Underlying virtualization: ESXi hosts, clusters, storage, VMs |
| **Org** | Organization | Tenant boundary in VCD |
| **VDC** / **Org VDC** | Virtual Data Center | Logical pool of compute, storage, and networking for a tenant |
| **Edge Gateway** | VCD Edge Gateway | Tenant edge for routed networks, NAT, and related services (NSX-backed) |
| **NSX-T** | VMware NSX-T Data Center | SDN: virtual networks, routing, NAT, firewalls, VPNs, isolation |
| **T0** | Tier-0 Gateway | Provider / fabric router; hosts per-customer **VRFs** |
| **T1** | Tier-1 Gateway | Per-customer gateway linked to T0 VRF; attaches segments |
| **VRF** | Virtual Routing and Forwarding | Isolated routing instance on T0 per customer |
| **Segment** | NSX-T segment | L2 network for customer workloads |
| **BGP** | Border Gateway Protocol | Routing between NSX-T T0 VRF and Palo Alto VSYS |
| **BGP gate** | BGP validation gate | Hard stop before VCD until peers/routes are healthy |
| **Panorama** | Palo Alto Networks Panorama | Central management for firewalls; sole API target for PA changes |
| **VSYS** | Virtual System | Per-customer firewall isolation domain |
| **VR** | Virtual Router | Routing instance inside a VSYS (zones, BGP, NAT) |
| **TRUST / UNTRUST** | Security zones | TRUST = VDC/NSX-facing; UNTRUST = internet-facing |
| **F5 BIG-IP** | F5 Application Delivery Controller | Load balancing, SSL, WAF; per-customer **partition** |
| **IPAM** | IP Address Management | Allocate / reserve / release public IPs and private subnets |
| **ASN** | Autonomous System Number | BGP identity; DataMount uses a pair per customer for Active-Active |
| **DNS** | Domain Name System | A, PTR, and related records (PowerDNS in CMP today) |
| **Veeam** | Veeam Backup & Replication | Backup, restore, replication, retention |
| **DR** | Disaster Recovery | Restore or failover after failure |
| **Odoo** | Odoo ERP | Formal invoices and financial records; **outbound from CMP only** |
| **Service ID** | — | CMP key stamped on all infra objects for traceability and teardown |
| **Workflow Instance ID** | — | Durable orchestration run ID bound to Service ID |
| **Plane 1** | Infrastructure plane | Imperative Phases 1–4 (network → security → BGP → VCD) |
| **Plane 2** | Workload plane | Declarative VPC blueprint, parallel VM fan-out, self-heal |

Related walkthrough concepts: Edge VLAN sheets (`/30`, VLAN ID, EBGP AS), Panorama commit-and-push, NSX T0 VRF BGP neighbors.
