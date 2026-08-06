---
sidebar_position: 7
title: "Kubernetes"
tags: ["orchestrator", "cloudstack", "features", "kubernetes"]
---

# Kubernetes on CloudStack

Managed Kubernetes (CKS) in CMP for **Apache CloudStack 4.20+**, with admin panel behaviour from **4.21.0** onward: separate control and worker plans, resource-based billing, and cluster management tabs for VMs, volumes, load balancers, and access.

:::tip[Setup vs features]

- **Admin packages** — [Kubernetes Node Packages](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes)
- **Access documents (admin)** — [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents) — Documentation Config on Kubernetes Version
- **Volumes / LB / IP / Networks** — configure related packages so underlying resources can be billed
- **This page** — customer cluster UI, billing model, operations, and sync behaviour

:::

## Pages in this section

| Page | Description |
|---|---|
| [Kubernetes overview](/orchestrator-features/cloudstack/kubernetes/) | Resource-based billing, create form, cluster tabs, scale, sync |
| [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents) | Admin Documentation Config for end-user Access tab guides |

:::info[Version requirement]

New Kubernetes behaviour (separate node plans, resource-based billing, related create/scale options) requires **CloudStack 4.20+**. Older CloudStack versions will not show the full set of changes.

:::

## Cluster overview in CMP

Customers open clusters under **Kubernetes**. The overview shows totals (CPU, RAM, control node count, worker count, network, status) plus general details (project, created time, endpoint, username, region, Kubernetes version, auto scaling, consumption, network, SSH key) and separate **Master Node Config** and **Worker Node Config** cards.


Tabs on the cluster page:

| Tab | Purpose |
|---|---|
| **Overview** | Summary, general details, master/worker plans |
| **Access** | Kubeconfig, download, CLI / dashboard guides |
| **Settings** | Change plan, upgrade version, firewall, port forwarding |
| **Virtual Machines** | Control and worker node VMs |
| **Load Balancer** | Cluster load balancers (for example `api-lb`) |
| **Volumes** | Root / block volumes for nodes |

![Kubernetes cluster details](/img/screenshots/cmp-k8s-cluster-details.png)

---

## Resource-based billing

The billing model for Kubernetes clusters is **resource-based**. The cluster object itself is **not** charged. CMP bills the cloud resources the cluster creates.

### Previous behaviour

| Resource | Billing |
|---|---|
| Kubernetes Cluster (all nodes) | Charged |
| Virtual Machines | Included (not billed separately) |
| Block Storage | Included |
| Networks | Included |
| Load Balancer | Included |
| Public IP | Included |

A recurring charge applied only to the cluster plan; infrastructure under the cluster was not billed as separate subscriptions.

### New behaviour

| Resource | Billing |
|---|---|
| Kubernetes Cluster | Not charged |
| Virtual Machines (control & worker) | Charged — **each** node gets its own subscription |
| Block Storage (root volumes) | Charged — separate subscriptions |
| Networks | Charged when network billing is enabled (**in progress** for full K8s path) |
| Load Balancer | Charged when LB billing is enabled (**in progress** for full K8s path) |
| Public IP | Charged when IP billing is enabled (**in progress** for full K8s path) |

**Why the change**

* Aligns billing with the lifecycle of underlying CloudStack resources
* Supports resize, replace, delete, and other resource-level operations without depending on a single cluster charge
* Matches how other CloudStack resources are billed in Stack Console

:::info[Subscriptions]

* **Master/control compute** — each control node VM → separate billing subscription  
* **Worker compute** — each worker node VM → separate billing subscription  
* **Volumes** — each root (and related) volume → separate subscription  
* **IP / LB / Network** — separate billing where packages and feature flags are enabled; rollout for all K8s paths may still be completing  

:::

---

## Separate plans for control and worker nodes

Administrators configure different [Kubernetes Node Packages](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes) for:

* **Master/Control Node**
* **Worker Node**

Customers can size the control plane differently from workers (for example, 2 vCPU / 2 GB masters and 8 vCPU / 8 GB workers in the same cluster).

![Virtual Machines tab — mixed node sizes](/img/screenshots/cmp-k8s-virtual-machines.png)

:::warning[Compute offering storage]

When configuring the CloudStack compute offering for Kubernetes nodes, do **not** put customer root disk size on the offering. If storage size is set on the compute offering, CloudStack ignores `root_disk_size` / CMP volume selection and uses the offering’s disk size instead. See [Kubernetes packages](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes#cpu-and-memory-only--no-root-disk-in-the-offering).

:::

**Custom plans** are not supported for Kubernetes (CloudStack limitation).

**Root volume plan:** at create, **one** storage plan applies to both control and worker nodes. CloudStack does not accept separate root disk plans for control vs worker on the same create.

---

## Create Kubernetes cluster (customer / portal)

**Customer path:** **Containers → Kubernetes → Create** (breadcrumb: **Home → Kubernetes → Create Kubernetes**)

The create form uses separate **Master Group** and **Worker Group** plans, one shared **disk offering** for all nodes, and optional Cloud Storage (CSI) integration.

![Create Kubernetes](/img/screenshots/cmp-create-kubernetes-cluster.png)

### Form fields

**Choose Project**

*Required.* Select the CMP project that will own the cluster — for example, **Default**.

**Select Location**

*Required.* Zone / region where the cluster is created — for example, **PRODUCTION (India)**. Only zones with active Kubernetes node packages and volume packages appear.

**Select Version**

*Required.* Kubernetes version offered by CloudStack CKS for that zone — for example, `1.28.4`, `1.33.1`, `1.36.0`. Versions depend on what is registered in CloudStack.

**Master Group — Node Plan**

*Required.* Control-plane compute plan from [Kubernetes Node Packages](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes) with **Package For** = **Master/Control Node**. Shows price per node and CPU/memory — for example, `K8s 4Core/4GB`.

**Master Group — Enable High Availability**

*Optional.* Toggle for a multi-control-plane layout. When off, the UI shows **Control Nodes: 1**. When on, CloudStack / CMP provisions additional control nodes for HA (exact count depends on product configuration).

**Worker Group — Node Plan**

*Required.* Worker compute plan from packages with **Package For** = **Worker Node** — for example, `Worker 16Core/32GB`. May differ from the master plan.

**Worker Group — Node Count**

*Required.* Number of worker nodes to create (stepper). Each worker becomes a separate VM subscription under resource-based billing.

**Select Disk Offering**

*Required.* Root / block storage plan for **all** nodes (control and worker share the same selection). Choose a storage tier tab (**SSD**, **HDD**, **NVMe**) and a volume package row — for example, **Standard**, 50 GB.

:::warning[One storage plan for both node types]

Apache CloudStack does not accept separate root disk plans for control vs worker on the same create. Customers pick **one** disk offering; it applies to every node in the cluster. Resize individual volumes later if needed.

:::

**Add SSH Key To Your Instance**

*Required.* Attach an existing SSH key or use **Add now** to register one. Applied to cluster nodes for access where CloudStack/CMP supports it.

**Enable Cloud Storage Integration**

*Optional.* When enabled, configures the **CloudStack CSI Driver** for dynamic storage provisioning in the cluster.

:::note[CSI billing]

CSI / cloud storage integration options do **not** have separate CMP billing yet. Compute and root volume packages still apply; treat extra CSI storage charges as out of band until product support is complete.

:::

**Cluster Name**

*Required.* Display name for the cluster — for example, `test-cluster-03`.

**Billing Cycle**

*Required.* Cycle used for pricing the selected node and disk plans on create — for example, **Hourly** or **Monthly**.

**Price Summary**

*Read-only.* Estimated cost for the selected configuration (node plans × counts + disk offering) before review.

Click **Review & Create Cluster** to confirm and provision.

### Create notes

* **Custom plans** are not available — only predefined master and worker packages.
* CMP does **not** yet let customers pick **separate templates** for control vs worker (CloudStack may support this; CMP does not expose it yet).
* Where the UI offers attaching an **existing network** or **existing load balancer**, those options appear in addition to the fields above.
* After submit, the parent cluster may stay **Starting** for a while before CMP syncs VMs and volumes — see [Sync behaviour](#sync-behaviour-while-status-is-starting).

---

## Cluster services and components

Resources typically associated with a cluster in CMP / CloudStack:

| Component | Notes |
|---|---|
| Control node VMs | Master/control plane instances |
| Worker node VMs | Worker instances |
| Control / worker volumes | Root (and related) block volumes |
| IP addresses | Public IPs used by the cluster path |
| Load balancers | For example API LB (`api-lb`) |
| Firewall | Managed under Settings |
| Port forwarding | Managed under Settings |

![Load Balancer tab](/img/screenshots/cmp-k8s-load-balancer.png)

![Volumes tab](/img/screenshots/cmp-k8s-volumes.png)

---

## Sync behaviour while status is Starting

The Kubernetes **parent** group can stay in **Starting** for a long time. CMP syncs child resources (VMs, volumes, and related objects) when the main Kubernetes group moves from **Starting** to **Running**.

As a CloudStack admin you may already see VMs and services in ACS while CMP still shows the cluster as Starting and has not listed those resources yet.

:::warning[Jobs and delayed sync]

While the parent remains Starting, CMP jobs may **time out**. Background tasks periodically re-check clusters that are still Starting with no VMs synced, then re-query status and sync again. Timing depends on the job schedule — expect a delay, not instant visibility.

:::

A **power-off** option is available while the Kubernetes cluster is in the Starting state (use carefully; prefer waiting for Running unless you intend to stop the create path).

---

## Kubernetes operations

### Change plan / scale cluster

**Settings → Change Plan** lets customers select new **Master Group** and **Worker Group** node plans and a billing cycle, then review price and apply.

![Change Plan — separate master and worker plans](/img/screenshots/cmp-k8s-change-plan.png)

* Scale / change plan upgrades **CPU and memory** for nodes via the selected node packages and updates billing for those offerings.
* CMP does **not** offer **per-VM change plan** from the Kubernetes UI (billing complexity). Use the cluster **Change Plan / Scale** path instead.
* **Individual VMs:** normal operations such as **start**, **stop**, and **delete** are available; **change plan on a single K8s VM** is not provided from this path.

### Volume resize

Customers must **manually resize** volumes (Volumes tab / volume actions). Cluster change plan does not automatically resize root disks.

### Upgrade Kubernetes version

Available under **Settings → Upgrade Version**.

### Access documents

**Access** tab: view kubeconfig, **Download Kubernetes cluster config**, and admin-configured guides (accordion sections such as **Using CLI** and **Kubernetes Dashboard UI**).

Admins author those guides per Kubernetes version under **Settings → Orchestrator → Kubernetes Version → Documentation Config**. See [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents).

![Access — kubeconfig](/img/screenshots/cmp-k8s-access.png)

### In progress

| Capability | Status |
|---|---|
| Autoscaling (Kubernetes) | In progress |
| Edit worker node counts | In progress |
| Full separate billing for IP / LB / Network on all K8s paths | In progress |

---

## Autoscaling (practical note)

Kubernetes and VM autoscaling are **horizontal**: additional VMs are added when policies fire. The application must support multi-instance operation (shared database, cache, session/state, and so on).

Practical pattern (also used for CloudStack VM AutoScale):

1. Create a VM and configure the application for horizontal scaling and shared backends  
2. Create a **template** from that VM’s root volume  
3. Use that template so scale-up instances start ready to take traffic without manual setup  

See [Autoscaling — CloudStack considerations](/orchestrator-features/cloudstack/autoscaling/cloudstack-considerations). Kubernetes-specific autoscaling UX in CMP is still **in progress**.

---

## Admin checklist

1. CloudStack **4.20+** with CKS enabled in target zones  
2. Fixed compute offerings for control and worker — **CPU + memory only**, no fixed customer root disk on the offering  
3. [Kubernetes Node Packages](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes) for **Master/Control** and **Worker** per zone; free trial off  
4. [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes) packages for the shared root disk plan  
5. Network / LB / IP packages as you enable billing for those components  
6. Configure end-user Access guides per version — [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents)  
7. Expect delayed CMP sync until the cluster parent reaches **Running**

## Related

* [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents)
* [Kubernetes Node Packages](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes)
* [Volumes packages](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Load Balancer packages](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [Autoscaling](/orchestrator-features/cloudstack/autoscaling/)
* [CloudStack Features](/orchestrator-features/cloudstack/)
* [CloudStack Setup](/orchestrators/cloudstack/)
