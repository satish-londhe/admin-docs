---
sidebar_position: 3
title: "Architecture Overview"
tags: ["overview", "architecture", "deployment", "ha"]
---

import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';

# Architecture Overview

CMP (Cloud Management Platform) provides a unified, API-driven self-service portal for managing multiple infrastructure providers. Providers are reached only through **orchestrator adapters** — CMP never talks to CloudStack, OpenStack, or VMware APIs directly from the presentation layer.

**Primary providers:** Apache CloudStack, OpenStack, VMware vSphere, Proxmox  
**Optional infrastructure services:** Ceph Storage, Veeam VSPC, PowerDNS  
**Extensibility:** New providers follow a standard workflow, but require changes across presentation, application, business services, and orchestrator adapters — not the adapter alone.

This page is organized for different audiences:

| Section | Audience |
|---|---|
| [High-level architecture](#cmp-high-level-architecture) | Business, sales, customers, introductions |
| [Component architecture](#cmp-component-architecture) | Developers, solution architects |
| [Request lifecycle](#cmp-request-lifecycle) | Developers, integrators |
| [Deployment architecture](#cmp-deployment-architecture) | Operations, infrastructure, DevOps |

For **where to host CMP** (single server, multi-server, HA), see [Choosing a Hosting Topology](/installation/hosting-topology).

:::tip[Open full size]

Architecture diagrams can be hard to read inline. Click a diagram, or use **Open full size**, to view it in a new browser tab.

:::

---

## Architecture principles

CMP uses a strict layered model. Traffic and control flow top-down; infrastructure never calls the portal.

| Layer | Name | Responsibility |
|---|---|---|
| **1** | Presentation | Customer Portal (React / Next.js), responsive self-service UI |
| **2** | Application | CMP API — REST, authentication, authorization (RBAC), business logic, validation, audit logging |
| **3** | Business services | Domain modules (billing, VMs, networks, storage, orders, and related services) |
| **4** | Orchestrator adapters | Provider-specific API abstraction (CloudStack, OpenStack, VMware, future providers) |
| **5** | Cloud infrastructure | Provider control planes, zones, and optional services (Ceph, Veeam VSPC, PowerDNS) |

:::important[Adding a new provider]

CMP has a **standard integration workflow**, but onboarding a new cloud provider is **not** limited to the adapter alone.

You typically need coordinated work across:

| Layer | Typical changes |
|---|---|
| **Presentation** | Portal flows, labels, provider-specific options or screens where the UI must expose the new service |
| **Application** | API contracts, auth/permissions, validation, and audit for new operations |
| **Business services** | Packages, quotas, billing rules, orders, and domain logic for the new provider |
| **Orchestrator adapters** | Provider-specific API mapping (required for all infrastructure calls) |

Adapters keep provider APIs behind Layer 4, but the product still needs end-to-end wiring from portal through business services before customers can use the new provider.
:::

---

## CMP High-Level Architecture

### Architecture overview

A simplified view of how customers reach cloud providers through CMP. Suitable for introductions and commercial discussions. Internal business modules are intentionally omitted.

### Diagram

<ArchitectureDiagram
  src="/img/architecture/cmp-high-level-architecture.svg"
  alt="CMP High-Level Architecture — how customers reach cloud providers through CMP"
/>

### Platform architecture (product view)

Portals, core platform capabilities, infrastructure integrations, and technology foundation — useful for stakeholder and onboarding overviews.

<ArchitectureDiagram
  src="/img/architecture/cmp-platform-architecture.png"
  alt="Stack Console Platform Architecture — portals, core platform, integrations, and technology stack"
/>

### Components

| Component | Role |
|---|---|
| **Customer Portal** | White-label self-service UI for end customers |
| **CMP API** | Single application entry for business operations |
| **Cloud Adapters** | Translate CMP operations into provider APIs |
| **Cloud Providers** | CloudStack, OpenStack, VMware control planes and zones |
| **Optional services** | Ceph (storage), Veeam VSPC (backup), PowerDNS (DNS) |

### Data flow

1. Customer actions enter at the **Customer Portal**.
2. The portal calls the **CMP API**.
3. The API selects the correct **adapter** for the customer’s provider and zone.
4. The adapter invokes the **cloud provider** (and may use optional services such as Ceph or Veeam).

### Design considerations

- Keeps commercial messaging simple: one portal, many clouds.
- Hides billing, RBAC, and module detail until the component view.
- Optional services are shown as peer infrastructure, not as primary compute providers.

### Future extensibility

New providers still appear under Cloud Providers and behind a **Future Adapter**, but product delivery also needs portal, API, and business-service work for that provider’s workflows — not adapter wiring alone.

---

## CMP Component Architecture

### Architecture overview

Full logical component map for developers and architects. Shows presentation, application cross-cutting concerns, business services, adapters, and infrastructure.

### Diagram

<ArchitectureDiagram
  src="/img/architecture/cmp-component-architecture.svg"
  alt="CMP Component Architecture — logical component map for developers and solution architects"
/>

### Layered platform architecture

Channels (Customer / Reseller / Admin portals), API gateway, core platform services, integration & orchestration, and connected infrastructure providers — aligns with the layered model in [Architecture principles](#architecture-principles).

<ArchitectureDiagram
  src="/img/architecture/cmp-platform-layered-architecture.png"
  alt="Stack Console CMP Platform Architecture — channels, access, core services, integration, and infrastructure layers"
/>

### Components

| Layer | Components | Responsibility |
|---|---|---|
| **Presentation** | Customer Portal | Self-service UI, branding, responsive experience |
| **Application** | CMP API, Authentication, RBAC, Audit | Request entry, security, validation, audit trail |
| **Business services** | Users, projects, billing, wallet, orders, invoices, VMs, networks, storage, images, snapshots, backups, monitoring, notifications, activity logs | Domain logic and product features |
| **Adapters** | CloudStack, OpenStack, VMware, Future | Provider API translation |
| **Infrastructure** | Providers + Ceph, Veeam VSPC, PowerDNS (optional) | Actual cloud resources and optional services |

### Data flow

1. Portal submits an authenticated request to the **CMP API**.
2. **Authentication** and **RBAC** authorize the action; **audit logging** records it.
3. The matching **business service** executes (for example Virtual Machines or Billing).
4. Infrastructure-affecting actions call the correct **adapter**.
5. The adapter talks to the **provider** (and optional services when required).
6. Results return through the API to the portal.

### Design considerations

- Business modules stay as provider-agnostic as practical; adapters absorb API differences. New providers may still need business and UI changes for packages, quotas, and provider-specific flows.
- Billing, wallet, and invoices sit beside compute modules so commercial state is not locked inside a hypervisor API.
- Backup may use CloudStack-native paths or **Veeam VSPC** depending on configuration.
- PowerDNS remains optional and is not required for core IaaS.

### Future extensibility

Implement a **Future Adapter** and register packages/zones for the new provider. Expect necessary changes in presentation, application, and business services as well — reuse shared modules where possible, but do not assume portal or billing need zero changes.

---

## CMP Request Lifecycle

### Architecture overview

End-to-end path of a typical authenticated customer request (for example create instance) from browser to infrastructure and back.

### Diagram

<ArchitectureDiagram
  src="/img/architecture/cmp-request-lifecycle.svg"
  alt="CMP Request Lifecycle — authenticated request from portal to infrastructure and back"
/>

### Components

| Step | Component | Responsibility |
|---|---|---|
| UI | Customer Portal | Capture intent, display result |
| API | CMP API | Validate payload, orchestrate services |
| Security | Authentication / RBAC | Identity and permission checks |
| Domain | Business service | Quotas, packages, billing hooks, state |
| Adapter | Cloud adapter | Map to CloudStack / OpenStack / VMware APIs |
| Provider | Control plane | Accept native API calls |
| Infrastructure | Hypervisor / storage / network | Apply the change |

### Data flow

Linear top-down then reverse: **User → Portal → API → Auth → Business → Adapter → Provider → Infrastructure**, then response returns along the same path to the portal.

### Design considerations

- Failures should surface at the API with actionable errors; adapters normalize provider-specific messages.
- Billing and quota checks typically run in the business service **before** the adapter call.
- Audit events should be written when authorization succeeds and when infrastructure mutations complete.

### Future Extensibility

The request sequence shape stays the same (portal → API → business → adapter → provider). A new provider still needs adapter work **and** any presentation, application, and business-service changes required for that product’s standard workflows.

---

## CMP Deployment Architecture

### Architecture overview

Runtime topology for operations and DevOps: how CMP processes and supporting services are deployed relative to load balancers and cloud control planes. This is the **logical** deployment view; concrete single-server and HA host layouts are in [Choosing a Hosting Topology](/installation/hosting-topology).

### Diagram

<ArchitectureDiagram
  src="/img/architecture/cmp-deployment-architecture.svg"
  alt="CMP Deployment Architecture — runtime topology with load balancer, API, and control planes"
/>

### Components

| Tier | Components | Responsibility |
|---|---|---|
| **Edge** | Internet, browser, load balancer | TLS termination, routing to frontend/API |
| **Frontend** | Customer Portal | Static/SSR portal delivery |
| **Backend** | CMP API | Application runtime, workers, schedulers |
| **Supporting services** | PostgreSQL, Redis, message broker | Persistence, cache, async jobs |
| **Adapters** | In-process or collocated with API | Provider integration |
| **Control planes** | CloudStack MS, OpenStack controllers, vCenter | Cloud management APIs |
| **Infrastructure services** | Ceph, Veeam VSPC, PowerDNS | Storage, backup portal, DNS |
| **Zones** | Zone A / B | Capacity and failure domains in the cloud |

### Data flow

1. Browser hits the **load balancer**.
2. Portal and API traffic are routed to frontend and backend tiers.
3. API reads/writes **PostgreSQL**, uses **Redis**, and enqueues work on the **message broker** when needed.
4. Adapters call **provider control planes**; zones host customer workloads.
5. Optional services (Ceph, Veeam, PowerDNS) are reached from providers or adapters per product design.

### Design considerations

- Keep databases and brokers on private networks; expose only LB endpoints publicly.
- Message broker and Redis enable async billing, notifications, and long-running orchestrator jobs.
- Multi-zone clouds are represented under the provider; CMP maps packages to **Cloud Provider + Zone**.
- RabbitMQ (or equivalent queue) may be co-located with Redis-backed jobs depending on your CMP build — confirm with your StackConsole deployment package.

### Future extensibility

Scale frontend and API horizontally behind the load balancer; add Redis/DB replicas; register new adapters without changing the edge topology. For host-level HA patterns, see [Choosing a Hosting Topology](/installation/hosting-topology).

---

## Related

* [What is CMP?](/overview/what-is-cmp)
* [Supported Orchestrators](/overview/supported-orchestrators)
* [Choosing a Hosting Topology](/installation/hosting-topology)
* [Prerequisites & System Requirements](/installation/prerequisites)
* [Domain Name / URL](/installation/prerequisites#domain-name--url)
* [CloudStack Setup](/orchestrators/cloudstack/)
* [CEPH Setup](/orchestrators/ceph/)
* [Veeam Setup](/orchestrators/veeam/)
