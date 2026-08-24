---
sidebar_position: 15
title: "Glossary"
tags: ["engagement", "datamount", "glossary"]
---

# Glossary

<div class="no-print">

**Hub:** [DataMount Integration Review](/engagements/datamount/)

</div>

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
| **BGP gate** | BGP validation gate | Hard stop before [Phase 7 compute](/engagements/datamount/phase-7-compute) until peers/routes are healthy |
| **Panorama** | Palo Alto Networks Panorama | Central management for **physical** firewalls; sole API target (REST + XML) |
| **VSYS** | Virtual System | Per-customer firewall isolation domain on physical PA |
| **Internet VSYS** | Shared Palo Alto VSYS | Admin-owned shared VSYS customer VSYS bind to for internet |
| **VR** | Virtual Router | Routing instance inside a VSYS (zones, BGP, NAT) |
| **TRUST / UNTRUST / DMZ** | Security zones | Predefined zones; customer custom zones within VSYS — **Discuss** |
| **F5 BIG-IP** | F5 Application Delivery Controller | Load balancing, SSL, WAF; tenancy model **Discuss** |
| **IPAM** | IP Address Management | **StackConsole Internal IP Manager** — allocate / reserve / release; CMP is SoR |
| **ASN** | Autonomous System Number | BGP identity; allocated **in pairs** per customer for Active-Active |
| **VRF-scoped overlap** | Private subnet validation | Same CIDR allowed in different VRFs; blocked within same VRF |
| **Service ID** | — | CMP key stamped on all infra objects for traceability and teardown |
| **Workflow Instance ID** | — | Durable orchestration run ID bound to Service ID |
| **Plane 1** | Infrastructure plane | Imperative Phases 1–5 (IPAM → VCD → NSX-T → Panorama → BGP gate) |
| **Plane 2** | Workload plane | Declarative VPC blueprint, parallel VM fan-out, self-heal |
| **Set reservation** | CloudStack UX pattern | Optional bind of subnet/ASN/BGP peer to Account or Domain at creation — template for CMP admin screens |
| **Allocation state / Taken** | CloudStack Guest VLAN columns | List-view lifecycle visibility — template for CMP IPAM and `resource_bindings` inventory |
| **Resource bindings** | Cross-system mapping | CMP resource ID ↔ VCD / NSX-T / Panorama objects — [Phase 8](/engagements/datamount/phase-8-reconciliation) |
| **DNS** | Domain Name System | A, PTR, and related records (PowerDNS in CMP today) |
| **Veeam** | Veeam Backup & Replication | Backup, restore, replication, retention |
| **DR** | Disaster Recovery | Restore or failover after failure |
| **Odoo** | Odoo ERP | Formal invoices and financial records; **outbound from CMP only** |

Related walkthrough concepts: Edge VLAN sheets (`/30`, VLAN ID, EBGP AS), Panorama commit-and-push, NSX T0 VRF BGP neighbors.
