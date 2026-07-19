---
sidebar_position: 3
title: "CloudStack"
tags: ["faq", "cloudstack", "vm", "networking", "isolated", "packages", "deployment", "capacity"]
---

# CloudStack Q&A

Questions tied to **Apache CloudStack** behaviour and how CMP uses ACS APIs. Feature guides: [CloudStack features](/orchestrator-features/cloudstack/), [Networks](/orchestrator-features/cloudstack/networks/).

## Can clients set their own password on instance create or password reset?

**No** — not through a native CloudStack parameter that CMP can pass.

CloudStack does **not** support end-user-chosen passwords for:

* VM **deploy**  
* **Reset password**  

Standard ACS workflow:

1. CloudStack **generates** a random password  
2. Password is **injected** into the guest (password-enabled template + User Data / VR services)  
3. Generated password is returned via API and shown in CMP  

CMP therefore displays the **auto-generated** password from CloudStack. There is no supported ACS API field to supply a custom password at deploy or reset time.

Ensure templates are password-enabled and network offerings include **User Data** — see [Virtual Router/VPC — User Data](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#user-data--required-for-templates-marketplace-and-startup-scripts).

## Plans are in the admin panel but missing on Create Instance. Why?

Check all of the following:

1. **Package status** — must be **Active**  
2. **Zone and OS family** — Create Instance filters by selected zone and OS; Windows/Linux-restricted packages only appear for the matching family  
3. **Plan categories** — if plan categories are enabled, **every** visible package must have a plan category; packages without one are hidden  
4. **Compute categories** — if compute categories are configured, packages must be assigned; unassigned packages stay hidden  

See [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine).

## We changed the rate card offering (40 GB → 60 GB disk, same price). Do existing VMs upgrade?

**No.** Updating the rate card package / offering only affects **new** orders.

Existing VMs keep the offering they were provisioned with. To grow disk on running VMs, use the **VM upgrade** (or resize) flow per instance so ACS and CMP update the associated offering and disk.

## Why is no IP listed under Isolated Network → IP Addresses?

Expected when the VM only has a **private** IP and CMP is reusing **Source NAT**.

* The first public IP of an isolated network is the **Source NAT** IP  
* CMP reuses it with **port forwarding** for the first public-access VM  
* That SNAT IP is **not** listed as a separately acquired IP under **IP Addresses** in that empty/private-only case  

When the customer requests public IP on create:

* If SNAT is free → reuse SNAT + port forwarding  
* If SNAT is already tied to a VM → acquire a **new** public IP  

Details: [Isolated Network — Source NAT reuse](/orchestrator-features/cloudstack/networks/isolated-network#source-nat-ip-reuse--cmp-workflow).

## What does “No destination found for a deployment” mean?

Example error from CloudStack (also shown in CMP when start/deploy fails):

```text
No destination found for a deployment for VM instance
{"id":871,"instanceName":"i-2-871-QA","state":"Stopped",...}
```

**Meaning:** CloudStack’s **deployment planner** could not find any host that meets all placement rules for that VM. It evaluated candidates in the cluster/zone and rejected every one — so start, deploy, or migrate fails.

This is almost always an **infrastructure / placement** problem in CloudStack, not a CMP package misconfiguration (unless tags on the service/disk offering do not match any host or storage).

### Common causes

| # | Cause | What to check |
|---|---|---|
| 1 | **Host capacity exhausted** (most common) | CPU / memory / storage allocation on hosts — look for `InsufficientServerCapacityException` in logs |
| 2 | **Primary storage unavailable** | Primary storage **Up**, connected, not in maintenance; pool reachable from candidate hosts |
| 3 | **Host or cluster maintenance / down** | Host status **Up** + **Enabled** — not Maintenance, Disconnected, or Alert |
| 4 | **Hypervisor cannot see the disk pool** | KVM: `virsh pool-list`, NFS mounts, local disk space |
| 5 | **Affinity / anti-affinity** | Affinity groups blocking co-location or separation |
| 6 | **Dedicated resources** | Dedicated account / domain / cluster / host limits where the VM can run |
| 7 | **Host tags** | Service offering **Host tags** must match at least one eligible host (for example `gpu=true`) |
| 8 | **Storage tags** | Disk offering **Storage tags** must match a primary pool (for example `ssd` vs `nvme`) |
| 9 | **Local storage + original host gone** | Root disk on **Local** storage only exists on one host — if that host is down, no destination exists |
| 10 | **Agent disconnected** | `cloudstack-agent` running; host shows **Up** in CloudStack |

For a **Stopped** VM that fails to start, start with capacity, host/storage tags, storage accessibility, maintenance, and (if used) local storage on a missing host.

### How to debug

**1. Confirm host and storage health (UI)**

* **Infrastructure → Hosts** — capacity, status, tags  
* **Infrastructure → Primary Storage** — Up, not in maintenance  
* **Infrastructure → Dedicated Resources** / **Compute → Affinity Groups** if used  

Or via API / CloudMonkey: `list hosts`, `list storagepools`.

**2. Read why each host was skipped (best step)**

On the management server:

```bash
grep -i -A50 -B50 "No destination found for a deployment" \
  /var/log/cloudstack/management/management-server.log
```

Useful related searches:

```bash
grep -i "Insufficient" /var/log/cloudstack/management/management-server.log
grep -i "DeploymentPlanner" /var/log/cloudstack/management/management-server.log
grep -A20 -B20 "871" /var/log/cloudstack/management/management-server.log   # use your VM id
```

A few lines **above** `No destination found`, CloudStack usually logs why hosts were rejected, for example:

* insufficient memory / CPU  
* host tag mismatch  
* storage inaccessible  
* affinity / dedication constraints  

That line is the real root cause.

**3. Optional DB checks**

```sql
SELECT id, name, state, host_id, last_host_id
FROM vm_instance
WHERE id = 871;

SELECT id, name, pool_type FROM storage_pool;
```

If the VM’s root volume is on `pool_type = Local` and `last_host_id` is unavailable, placement will fail until that host returns or the disk is on shared storage.

**4. KVM host (if applicable)**

```bash
systemctl status cloudstack-agent
virsh pool-list
mount | grep nfs
df -h
```

### How to resolve

Fix the underlying rejection reason from the logs, then retry start/deploy from CMP or CloudStack:

| If logs show… | Typical fix |
|---|---|
| Insufficient CPU/memory | Free capacity, add hosts, or use a smaller offering |
| Tag mismatch | Align service/disk offering tags with host/storage tags, or clear unnecessary tags |
| Storage down / inaccessible | Repair primary storage connectivity; take pool out of maintenance |
| Host in maintenance | Cancel maintenance or enable another host in the cluster |
| Local disk + dead host | Restore the original host, or restore/migrate data per your DR process (local disks do not float to other hosts) |
| Affinity / dedication | Adjust affinity groups or dedicated resource scope |

:::tip[CMP operators]

When customers see this on **Start Instance**, treat it as CloudStack capacity/placement. Check ACS first; changing CMP rate cards will not fix a full cluster or a tag mismatch.

:::

## How to change the region (zone) name?

Same as other orchestrators in CMP: **Settings → Orchestrator → Zones**. See [All orchestrators — region name](/faq/orchestrators/all-orchestrators#how-to-change-the-region-name).
