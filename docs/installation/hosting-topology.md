---
sidebar_position: 1
title: "Choosing a Hosting Topology"
tags: ["installation", "architecture", "deployment", "ha", "hosting"]
---

import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';

# Choosing a Hosting Topology

How you **host CMP itself** (POC vs production vs HA) is separate from the logical [CMP architecture](/overview/architecture-overview). Use this page for capacity planning before you provision VMs.

CloudStack’s own guide for *cloud* infrastructure scale is [Choosing a Deployment Architecture](https://docs.cloudstack.apache.org/projects/archived-cloudstack-installation/en/latest/choosing_deployment_architecture.html) — that document is about zones/pods, not CMP VMs.

| Topology | Typical use | Footprint |
|---|---|---|
| **[Single server](#single-server-deployment)** | POC, staging | 1 VM — all roles co-located |
| **[Multi-server](#multi-server-deployment)** | Standard production | Separate frontend, backend, database |
| **[HA multi-tier](#ha-multi-tier-deployment)** | Large production | **18 servers** — redundant web, proxy, app, cache, database |

:::tip

Validate on single server, go live on multi-server, adopt HA when you need redundant load balancers and database failover.

:::

:::tip[Open full size]

Click a diagram, or use **Open full size**, to view it in a new browser tab.

:::

---

## Single-server deployment

One host runs NGINX, frontend, backend, PostgreSQL, Redis, and the scheduler.

<ArchitectureDiagram
  src="/img/architecture/cmp-single-server.svg"
  alt="Diagram: CMP single-server deployment"
/>

| Topic | Behaviour |
|---|---|
| **Complexity** | Lowest |
| **Availability** | Single point of failure |
| **Specs** | [Staging / Single VM — full requirements](/installation/prerequisites#staging--single-vm--full-requirements) |

:::warning

Do not keep a busy production cloud on single-server long term.

:::

---

## Multi-server deployment

Standard production split:

| VM | Role |
|---|---|
| **Frontend** | NGINX + Customer Portal |
| **Backend** | CMP API, workers, scheduler |
| **Database** | PostgreSQL (Redis often on backend or dedicated cache) |

<ArchitectureDiagram
  src="/img/architecture/multi-server-installation.svg"
  alt="Diagram: CMP single-server deployment"
/>

See [Production — three-VM requirements](/installation/prerequisites#production--three-vm-requirements).

---

## HA multi-tier deployment

Redundant edge, web, proxy, application, Redis, DB proxy, and database tiers. A full HA layout requires **18 servers** in total.

:::important

Per-role sizing and the exact server breakdown are confirmed with the StackConsole team. See [HA — Server Requirements](/installation/prerequisites#ha--server-requirements).

:::

img/architecture/cmp-ha-multi-server.png

<ArchitectureDiagram
  src="/img/architecture/cmp-ha-multi-server.svg"
  alt="Diagram: CMP HA / multi-tier deployment"
/>

| Tier | Notes |
|---|---|
| Edge | Cloudflare / Akamai-style global LB |
| Web | Multiple NGINX + portal nodes (public subnet) |
| Proxy | HAProxy / Keepalived pairs |
| Application | Multiple API / worker nodes (private subnet), shared filesystem |
| Cache | Redis cluster |
| Database | Primary + replicas behind HA DB proxies |

:::important

HA requires ownership of TLS, health checks, shared storage, Redis topology, PostgreSQL failover, and backup drills. Engage StackConsole when designing this layout for the first time.

:::

---

## How to choose

| Question | Prefer |
|---|---|
| First install / training? | Single server |
| Live customers, moderate load? | Multi-server |
| Strict uptime / high traffic? | HA multi-tier |

For the logical CMP runtime view (load balancer, API, providers), see [CMP Deployment Architecture](/overview/architecture-overview#cmp-high-level-architecture).

---

## Next steps

* [Prerequisites & System Requirements](/installation/prerequisites) — VM sizing for your chosen topology
* [Architecture Overview](/overview/architecture-overview) — product layers and request flow
