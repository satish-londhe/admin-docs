---
sidebar_position: 3
title: "VMware vSphere Requirements"
tags: ["installation", "vmware", "vsphere", "vcenter", "requirements"]
---

# VMware vSphere Requirements

This page covers the VMware-specific requirements needed before StackConsole can connect CMP to your VMware vCenter environment. Complete the [common prerequisites](/installation/prerequisites) first.

:::warning
**CMP supports VMware vSphere version 8.0.1.0 and above.** Older versions are not supported.
:::

---

## 1. Access for StackConsole Team

The StackConsole team needs access to your vCenter Dashboard UI. Choose one:

**Option A — VPN Access (preferred)**

Provide VPN access to:

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Abhishek Burkule | abhishek.burkule@stackconsole.io |

**Option B — IP Whitelist**

Whitelist our jump server:
```
14.192.19.227
```

Additionally, provide at least **read-only** vCenter credentials for the initial assessment:

| Field | Value |
|---|---|
| vCenter URL | |
| Username (read-only) | |
| Password | |

---

## 2. CMP VM → vCenter Connectivity

From all CMP VMs, access to vCenter is required. **Private access is recommended** for production.

Communication between the CMP VM and vCenter must be allowed on the configured API ports (typically 443).

---

## 3. Initial vCenter Structure (Required Immediately)

CMP uses the vCenter API for all VM operations and requires a specific folder structure to exist **before configuration begins**.

### 3.1 Datacenter & Folder Structure

🔴 Create a **CMP Root Folder** of type **"VM and Template Folder"** at the Datacenter level:

- Folder name: `CMP-ROOT-FOLDER` (or any agreed name — share the exact name with the StackConsole team)
- CMP will automatically create per-customer subfolders inside this root folder at onboarding time

### 3.2 Host Cluster

- A **Host Cluster** is required for VM deployment
- Multiple clusters are supported — each can be mapped to a CMP compute category
- 🔴 **DRS (Distributed Resource Scheduler) must be enabled** on all host clusters used by CMP

### 3.3 Datastore Cluster / Datastore Pod

- A **Datastore Cluster** is required for VM storage
- Multiple clusters are supported — each can be mapped to a CMP storage category
- 🔴 **Storage DRS must be enabled** on all datastore clusters used by CMP

### 3.4 VM Template Folder

- All VM templates must be stored in a dedicated folder in vCenter
- Share the template folder path with the StackConsole team

---

## 4. Required vCenter API User & Permissions

CMP requires **two user accounts** for vCenter:

| User | Purpose | Access Level |
|---|---|---|
| Dashboard user | UI access for the StackConsole team during setup | Read-only (minimum) |
| API user | Used by CMP for all VM operations | Custom role with the permissions below |

### Minimum Required vCenter Permissions for the API User

Create a **custom role** in vCenter with the following permissions and assign it to the CMP API user:

**Reference:** [VMware Privileges Documentation (vSphere 8.0)](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/vsphere-security-8-0/defined-privileges/virtual-machine-configuration-privileges.html)

| # | Permission |
|---|---|
| 1 | `Datacenter.View` |
| 2 | `Folder.Browse` |
| 3 | `Folder.Inventory` |
| 4 | `Folder.View` |
| 5 | `Folder.Create` |
| 6 | `System.Read` |
| 7 | `System.View` |
| 8 | `Datastore.FileManagement` |
| 9 | `Datastore.Browse` |
| 10 | `VirtualMachine.Inventory.Create` |
| 11 | `VirtualMachine.Interact.PowerOn` |
| 12 | `VirtualMachine.Interact.PowerOff` |
| 13 | `VirtualMachine.Interact.ConsoleInteract` |
| 14 | `VirtualMachine.Config.AddRemoveDevice` |
| 15 | `VirtualMachine.Config.CPUCount` |
| 16 | `VirtualMachine.Config.Memory` |
| 17 | `VirtualMachine.Config.Rename` |
| 18 | `VirtualMachine.State.CreateSnapshot` |
| 19 | `VirtualMachine.State.RemoveSnapshot` |
| 20 | `VirtualMachine.State.RevertToSnapshot` |
| 21 | `VirtualMachine.Config.RemoveDisk` |
| 22 | `VirtualMachine.Config.AddExistingDisk` |
| 23 | `VirtualMachine.Config.AddNewDisk` |
| 24 | `VirtualMachine.Config.DiskExtend` |
| 25 | `VirtualMachine.Config.ResetGuestInfo` |
| 26 | `Performance.View` |
| 27 | `Performance.Manage` |
| 28 | `Network.View` |
| 29 | `Task.List` |
| 30 | `Task.Read` |

Provide the API user credentials:

| Field | Value |
|---|---|
| vCenter URL | |
| API Username | |
| API Password | |

:::info
We recommend creating a dedicated CMP service account in vCenter with only these permissions. This is a security best practice and ensures CMP cannot perform actions outside its intended scope.
:::

---

## 5. VM Console Access — ESXi Port Requirements

For VM console access via CMP, the **CMP Backend server** must be able to reach each **ESXi host** on the following ports (using ESXi **private IPs**):

| Port | Protocol | Purpose |
|---|---|---|
| ICMP | — | Basic connectivity check (ping) |
| 80 | TCP | HTTP traffic |
| 443 | TCP | HTTPS / secure traffic |
| 902 | TCP + UDP | VMware console traffic (VMRC) |
| 903 | TCP | Additional VMware remote console port |

:::warning
vCenter returns **direct URLs to the ESXi host** for console sessions — not proxied through vCenter. This means the CMP Backend server needs **direct network access** to all ESXi hosts, not just to vCenter.
:::

**Enable access via one of:**
- VPN from CMP server to ESXi hosts, **or**
- Whitelist the CMP server IP on ESXi host firewalls

**References:**
- [VMware vSphere Networking Requirements](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.security.doc/GUID-27A340F5-DE98-41A8-AC73-01ED4949EEF2.html)
- [vSphere Ports and Protocols](https://ports.broadcom.com/home/vSphere)
- [HTML Console SDK Programming Guide for vSphere 8.0](https://docs.vmware.com/en/VMware-vSphere/8.0/html-console-sdk-programming-guide/GUID-E5495E81-DAF4-4BEE-B66A-D3DD94B07596.html)

---

## 6. VM Templates

To provision VMs from CMP, OS templates must meet specific requirements. Refer to the [VMware Template Requirements](https://docs.google.com/document/d/10xSR8VukjunK-0w-pHsyaW_OOdh8hy5_WkWX_33439U/edit?usp=sharing) document for the complete specification.

Key points:
- Templates must be stored in the dedicated **VM Template Folder** (see section 3.4)
- Templates must support password reset and SSH key injection
- Templates must be cloud-init compatible

---

## 7. Supported Features

CMP supports the following VMware vCenter operations:

### VM Lifecycle
- Create, Start, Stop, Reboot, Reset VM
- VM Console Access (VNC/HTML5)
- Change VM Name
- Reset VM Username & Password

### Resource Management
- Upgrade CPU, Memory, and Storage

### Snapshot Management
- Create, Revert, Delete Snapshots

### Disk Management
- Create new disk
- Attach / Detach disk
- Extend disk size
- Delete disk

### Network & IP Management
- VLAN Management (CMP tracks and manages VLANs per customer)
- Private IP Pool Management (automatic allocation/release)

### Import
- Import existing VMware VMs into CMP for centralized management

---

## 8. VMware Checklist

Complete before scheduling the installation:

- [ ] VPN access granted **or** jump server IP whitelisted
- [ ] Read-only vCenter credentials provided
- [ ] API user created with all 30 required permissions
- [ ] API user credentials provided
- [ ] `CMP-ROOT-FOLDER` created in vCenter
- [ ] At least one Host Cluster with DRS enabled
- [ ] At least one Datastore Cluster with Storage DRS enabled
- [ ] VM Template Folder path confirmed
- [ ] OS templates prepared per template requirements
- [ ] ESXi ports 80, 443, 902, 903 accessible from CMP Backend server
- [ ] CMP VMs provisioned with required specs (see [common prerequisites](/installation/prerequisites))
- [ ] Domain, SSL, SMTP provided

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [VMware vSphere Orchestrator Guide](/orchestrators/vmware/)
