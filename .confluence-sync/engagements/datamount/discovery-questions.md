---
title: "Discovery questions"
---

# Discovery questions and RACI

Use this list in technical workshops before locking the SoW. Answers feed connector design, ownership, and the [Integrations matrix](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396525604).

**Hub:** [DataMount Integration Review](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396722177)

---

## Meeting agenda (prioritized)

1. **VCD vs vCenter** — Confirm native **VCD 10.6** connector.
2. **NSX-T 4.2 + Panorama + F5** — Direct NSX-T API scope; physical PA via Panorama (REST + XML); F5 architecture open items.
3. **StackConsole IPAM** — Capability gap: public pool, private subnet, atomic reservation, VRF-scoped overlap, release/reuse. **Object model / admin UX:** use [CloudStack reference patterns](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396525575) as the template (not the single-vendor architecture).
4. **Odoo** — Version, REST/XML-RPC, outbound-only events; until then CMP remains invoice SoR.
5. **DNS automation depth** — Wire PowerDNS into onboarding/offboarding or keep operational.
6. **Veeam** — Keep subscription + manual VM management vs automate enroll/restore/DR.
7. **Orchestration engine** — Persistence, BGP gate (Phase 5), Panorama serialization, compensation, smoke tests, VPC blueprint plane.
8. **KYC** — OTP + CR upload vs later third-party KYC.
9. **Palo Alto commit/push failure** — Compensating actions on partial push to physical device.
10. **Customer zone creation** — Boundaries for custom zones within VSYS vs provider-restricted zones.
11. **F5 placement** — Physical vs VE; behind Palo Alto vs parallel; partition model.
12. **Development phasing** — Reconcile delivery phases against final workflow (IPAM → VCD → NSX-T → Panorama → BGP gate → F5 → compute).
13. **Timeline** — Reconcile SoW Phase 1 date with v1.4 (June 2026 reference). Detailed task breakdown: [Milestones and timeline](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396754945).

---

## 1. Environment and infrastructure

- Which VCD version? Single instance or multiple?
- How many Organizations today? Will CMP manage one org or many customer orgs?
- Staging / UAT available? Separate API endpoints for dev / UAT / prod?
- Walkthrough coverage: NSX-T, Palo Alto, F5, IPAM, Veeam DR from signup to provisioned resources?

## 2. Authentication and API access

- Auth: API token, OAuth, username/password, SAML?
- Dedicated service account for StackConsole? Permissions? Rate limits? IP allowlist? MFA on API? Credential rotation?

## 3. Organization and tenant management

- Does CMP create Organizations, or do they pre-exist?
- Auto-create Organization, Org Admin, Org VDC on onboarding?
- User management fully via API? SSO already configured?

## 4. Compute provisioning

Confirm which VM operations are in scope via API: create, delete, power, reboot, reset, suspend, resize CPU/RAM, ISO attach/detach, clone, capture template, snapshot, restore.

- Hot CPU/Memory supported?
- Which guest OS templates? Who maintains them?

## 5. Catalogs and templates

- Who manages catalogs? Can CMP upload templates?
- Shared across Organizations? Versioning? Update cadence?

## 6. Storage

- Which storage policies? Can CMP select them?
- Online disk resize? Independent disks? Snapshots counted in usage?

## 7. Networking

- Who creates networks and Edge Gateways?
- Are NSX-T segments pre-created?
- Can CMP create routed / isolated networks? DHCP? DNS? NAT? Firewall? LB? VPN?

## 8. Public IP management

- Confirm **StackConsole Internal IP Manager** as system of record (not Infoblox/NetBox).
- VCD **IP Space** implements CMP allocations — VCD must not independently allocate.
- Reserve / release / list pools from CMP? Atomic reservation across public IP + private subnet + ASN pair?
- VRF-scoped private subnet overlap validation — same CIDR allowed in different VRFs?

## 9. Usage and billing

- Metrics: CPU, RAM, storage, snapshots, public IPs, bandwidth, backup, licenses?
- Which APIs? Real-time or delayed? History available?

## 10. Tasks and async operations

- Which operations are async? Poll vs webhooks? Failure retrieval? Retry?

## 11. Quotas and limits

- CPU, memory, storage, VM count, network, IP — readable/writable from CMP?

## 12. Monitoring

- VM performance, host/storage health, network stats, alarms?

## 13. Backup and DR

- Which backup product? Initiate backup/restore via API? Schedules? Retention?

## 14. User and RBAC

- Native VCD roles? Custom roles? Can CMP assign roles via API?

## 15. Notifications

- Webhooks / events for VM lifecycle and task completion?

## 16. API documentation

Request: OpenAPI/Swagger, Postman, auth guide, samples, error codes.

## 17. Error handling

- Standard error format, retry guidance, rate limits, maintenance mode, timeouts.

## 18. Lifecycle ownership (RACI draft)

| Operation | StackConsole | VMware / NetSec team |
|---|---|---|
| Create Organization | ? | ? |
| Create Org VDC | ? | ? |
| Create / delete / resize VM | ? | ? |
| Snapshot / restore | ? | ? |
| Public IP | ? | ? |
| Firewall / NAT | ? | ? |
| Load balancer | ? | ? |
| VPN | ? | ? |
| Backup | ? | ? |
| Monitoring | ? | ? |

Fill during discovery; publish agreed RACI in the SoW.

## 19. Integration workflow (E2E)

Walk the journey: signup → first API → Organization → Org VDC → quotas → networking → VM → public IP → usage → deletion. Align with [Registration and billing](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396656647) through [Offboarding](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396263426).

## 20. Future roadmap

- Additional VMware products (Aria, Tanzu, etc.)?
- Upcoming API changes, VCD upgrades, deprecations?

---

## High-priority subset (limited time)

1. VCD version and APIs CMP should consume  
2. Authentication method  
3. Resources CMP must provision  
4. Async task model  
5. Usage collection for billing  
6. How Org / VDC / networks are created  
7. NAT / Firewall / VPN / LB via API?  
8. Expected end-to-end provisioning workflow  
9. StackConsole vs VMware team ownership  
