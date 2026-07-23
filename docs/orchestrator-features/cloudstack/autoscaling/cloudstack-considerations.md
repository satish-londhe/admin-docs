---
sidebar_position: 2
title: "CloudStack considerations and practical use cases"
tags: ["orchestrator", "cloudstack", "features", "autoscale"]
---

# CloudStack AutoScale — practical considerations

CloudStack supports **horizontal auto-scaling**: instead of increasing CPU/RAM on an existing VM (vertical scale), it **provisions additional VM instances** when defined thresholds are met (CPU, network traffic, custom metrics, and similar).

Auto-scaling is **not** only an infrastructure feature. The **application must be designed** to support horizontal scaling.

Official reference: [AutoScale with Virtual Router](https://docs.cloudstack.apache.org/en/latest/adminguide/autoscale_with_virtual_router.html).

---

## What CloudStack AutoScale does

| Does | Does not |
|---|---|
| Launch new VMs from a predefined **template** when scale-up policies fire | Make a non-scalable app suddenly work across multiple VMs |
| Attach new VMs to a **load balancer** rule | Synchronize local sessions, local files, or local databases for you |
| Remove excess VMs when scale-down policies fire | Replace the need for shared DB, cache, and shared storage |

:::important[Important limitation]

CloudStack AutoScale **only provisions and removes VMs**. It does **not** automatically make an application horizontally scalable.

Application architecture, shared services, startup automation, and data synchronization must already be designed and tested **before** enabling auto-scaling.

:::

---

## Key requirements

### 1. Application architecture

The application should:

* Run on **multiple VMs** at the same time
* Receive user traffic through a **load balancer**
* Use **shared or synchronized** databases, caches, file storage, and session data across instances

:::warning[Local state breaks scaling]

Applications that store sessions or data **only on a single VM’s local disk** may fail or lose user state when AutoScale adds or removes instances.

:::

### 2. Golden VM template

1. Create and configure a VM with all required software, application code, agents, and startup scripts
2. Verify the application **starts automatically** and joins the existing environment **without manual intervention**
3. Create a **template** from this VM — power off the VM, then use [Create from VM root volume](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume) in CMP (or create from snapshot where that flow is used)

That template becomes the image CloudStack uses for every scale-up instance.

### 3. AutoScale deployment (CloudStack model)

Typical building blocks:

| Building block | Role |
|---|---|
| **Load balancer rule** | Distributes traffic; new VMs are added to / removed from this rule |
| **AutoScale policies and conditions** | Scale-up / scale-down triggers (counters, thresholds, duration) |
| **AutoScale VM profile** | Service offering + **template** (+ related deploy params) used when launching VMs |
| **AutoScale VM group** | Ties min/max members, profile, and policies to the LB rule |

When a **scale-up** policy is triggered, CloudStack launches new VMs from the template and adds them behind the load balancer. When load decreases, **scale-down** policies can remove excess instances.

---

## Practical example — e-commerce sale

Suppose an e-commerce application normally runs on **2 web servers** behind a load balancer.

1. During a sale, **CPU utilization exceeds 80% for 10 minutes**
2. CloudStack AutoScale creates **2 additional** web servers from the predefined template
3. The load balancer sends traffic to all **4** servers
4. Because all servers use the **same database** and **Redis cache**, users experience seamless scaling
5. After traffic returns to normal, CloudStack removes the extra instances according to the **scale-down** policy

```text
Prepare horizontally scalable app
        │
        ▼
Golden VM → Template
        │
        ▼
Load Balancer + AutoScale policies + VM profile
        │
        ▼
Scale-up → new VMs from template → join LB
Scale-down → remove excess VMs
```

---

## Checklist before enabling AutoScale

* [ ] Application runs correctly on **more than one** VM behind a load balancer
* [ ] Sessions / uploads / caches use **shared** services (not VM-local only)
* [ ] Golden image boots and serves traffic **without login or manual steps**
* [ ] Template is tested (launch a VM from it and verify)
* [ ] Load balancer and AutoScale policies are configured and validated in a non-production window first

---

## Related

* [Create autoscaling at CMP](/orchestrator-features/cloudstack/autoscaling/create-at-cmp)
* [Autoscaling](/orchestrator-features/cloudstack/autoscaling/)
* [Create from VM root volume](/orchestrator-features/cloudstack/templates/create-from-vm-root-volume)
* [VM Autoscale packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-autoscale)
* [Load Balancer packages](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template)
