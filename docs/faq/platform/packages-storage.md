---
sidebar_position: 8
title: "VM packages & storage"
tags: ["faq", "platform", "vm", "storage", "packages", "billing"]
---

# VM packages & storage

Override root disk, free OS disk, scheduled stop, and related packaging choices. CloudStack offering mapping: [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine).

## If users run VMs on a schedule, how are usage hours calculated?

When **stoppable services** are enabled and a VM is **stopped**:

* **CPU** and **memory** charges pause  
* **Volume** (disk) and **IP address** (if any) charges **continue**  

Scheduled start/stop does not invent a different meter — it follows stoppable-service rules.

## Can we provide a free 50 GB OS disk to all users at instance create?

**No** dedicated “OS disk only free” feature. Alternatives:

* Coupons / free credits  
* Set storage pricing to **0** on rate cards — note that users can then create **multiple** zero-cost volumes; there is no OS-disk-only restriction  

## If we do not select override root disk during setup, will it cause issues?

No functional break by itself. It is a **one-time commercial/setup decision** (hard to reverse later because of billing).

| Approach | Behaviour |
|---|---|
| **Override disk enabled** (recommended) | Compute and storage priced separately; customer picks OS disk size |
| **Override disk disabled** | Storage bundled inside compute offering; create ACS offerings with disk included, map them in CMP packages |

If storage is **bundled** in compute, pausing CPU/RAM billing on stop **does not** cleanly separate storage — stoppable billing for compute alone works best with override disk enabled.

## Can we include disk size in the compute offering so users only pick the offering?

Yes — disable override root disk and map offerings that already include disk. See above.

## Keep override root disk but separate packages for root disk vs data disk — possible?

Yes. That is the standard scalable-storage model: override disk separates compute from storage packages (root vs additional volumes).
