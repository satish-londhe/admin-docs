---
sidebar_position: 3
title: "Node Selection Algorithm"
tags: ["orchestrator", "proxmox", "nodes", "placement", "drs"]
---

# Node Selection Algorithm (Proxmox)

When a customer creates a VM (or similar compute resource) on **Proxmox VE**, CMP must choose **which node** receives that workload.

Unlike some other orchestrators, **Proxmox does not provide DRS**. CMP therefore uses its own **runtime node selection algorithm** for multi-node clusters.

---

## What is DRS?

**DRS (Distributed Resource Scheduler)** is an orchestrator feature that automatically places and balances workloads across hosts based on capacity and health.

| Orchestrator | Typical behaviour |
|---|---|
| **VMware vSphere** | Cluster **DRS** (and Storage DRS) can choose hosts/datastores and balance load |
| **Apache CloudStack** | Deployment planners / affinity and capacity rules guide host and storage placement |
| **Proxmox VE** | **No DRS equivalent** — Proxmox does not automatically pick the “best” node for CMP the way DRS would |

Without DRS, a multi-node Proxmox cluster needs an external decision: which node should get the next VM? That decision is what CMP’s **Node Selection Algorithm** provides.

---

## When this applies

| Cluster | Behaviour |
|---|---|
| **Single node** | All resources land on that node — the algorithm is not needed for placement choice |
| **More than one node** | CMP evaluates node health at **runtime** and provisions on the highest-scoring node |

:::important[Shared templates and storage]

On multi-node Proxmox, templates and other resources the guest needs must be **available on (or shared with) the nodes** that can receive VMs.

If a template or storage backend exists only on one node, CMP cannot usefully place workloads on other nodes even if those nodes score higher. Prefer **shared storage** and replicate or share templates across nodes as required by your Proxmox design.

:::

---

## How CMP selects a node

### Step 1 — Collect node stats

CMP reads Proxmox API data (for example `/nodes` and `/nodes/{node}/status`) and derives, per node:

| Metric | Meaning |
|---|---|
| **CPU usage %** | Load relative to `maxcpu` |
| **Memory usage %** | `mem` / `maxmem` |
| **Storage usage %** | Used / total per storage backend used for placement |

From usage, CMP treats **availability** as the free fraction (**0–1**):

* CPU free = `1 − CPU used`
* Memory free = `1 − memory used`
* Storage free = `1 − storage used`

Example: CPU used **60%** → CPU free **0.4** (40% free).

### Step 2 — Weighted scoring

Not all resources matter equally:

* If **CPU** is saturated, the VM performs poorly even with free RAM
* If **memory** is exhausted, VM creation can fail
* If **storage** is full, VM creation fails

CMP combines free fractions with **weights** (adjustable for your infrastructure). A common default weighting is:

| Resource | Weight | Meaning |
|---|---|---|
| **CPU free** | **0.4** (40%) | How strongly free CPU affects the score |
| **Memory free** | **0.4** (40%) | How strongly free RAM affects the score |
| **Storage free** | **0.2** (20%) | How strongly free storage affects the score |

Weights should sum to **1.0**. Higher weight = that resource influences the ranking more.

### Step 3 — Score formula

```text
Score = (CPU_free × 0.4) + (Memory_free × 0.4) + (Storage_free × 0.2)
```

* Each `*_free` value is a fraction between **0** and **1**
* The **higher** the score, the **better** the node for the next deployment
* CMP provisions on the node with the best score at that moment

---

## Example

Two nodes:

| Node | CPU used | RAM used | Storage used | CPU free | Memory free | Storage free |
|---|---|---|---|---|---|---|
| **A** | 60% | 50% | 70% | 0.4 | 0.5 | 0.3 |
| **B** | 30% | 70% | 50% | 0.7 | 0.3 | 0.5 |

Scores (weights 0.4 / 0.4 / 0.2):

```text
Node A = (0.4 × 0.4) + (0.5 × 0.4) + (0.3 × 0.2) = 0.16 + 0.20 + 0.06 = 0.42
Node B = (0.7 × 0.4) + (0.3 × 0.4) + (0.5 × 0.2) = 0.28 + 0.12 + 0.10 = 0.50
```

**Node B** wins (0.50 > 0.42) — the next VM is provisioned on **Node B**.

---

## Why CMP uses a weighted score

* Nodes often look “good” on one metric and poor on another
* A single score makes comparison simple at provision time
* Weights reduce the chance of picking a node that is free on RAM but CPU-bound (or free on CPU but out of storage)

:::tip[Operational note]

Scores are evaluated **at runtime** for each provisioning request. Capacity changes after other VMs start or stop, so the preferred node can change over time.

:::

---

## Related

* [Proxmox VE](/orchestrators/proxmox/)
* [Proxmox Requirements](/installation/orchestrator-requirements/proxmox)
* [Preparing CMP-compatible templates](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates) — templates must be available where nodes can clone them
* [VMware Requirements — DRS](/installation/orchestrator-requirements/vmware#42-host-cluster) — DRS is required on VMware clusters used by CMP
