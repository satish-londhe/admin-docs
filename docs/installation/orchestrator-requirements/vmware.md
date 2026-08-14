---
sidebar_position: 3
title: "VMware vSphere Requirements"
tags: ["installation", "vmware", "vsphere", "vcenter", "requirements"]
---

# VMware vSphere Requirements

This page is the VMware vSphere onboarding checklist for StackConsole / CMP. Complete the [common prerequisites](/installation/prerequisites) and confirm [hosting topology](/installation/hosting-topology) as well.

:::danger[Supported VMware version]

**StackConsole / CMP supports VMware vSphere 8.0.1.0 and above (vSphere 8+).**

Older versions are **not** supported. Confirm your vCenter / ESXi build before integration.

:::

For how CMP uses vSphere after connection, see [VMware vSphere setup](/orchestrators/vmware/).

:::info[Bare minimum]

Items in the [checklist](#9-vmware-checklist) must be ready before setup can start. Without those prerequisites, installation cannot proceed.

:::

---

## 1. Access for StackConsole Team

To access the vCenter UI, use one of:

**Option A — VPN access (preferred)**

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Ganesh Kanade | ganesh.kanade@stackconsole.io |

**Option B — IP whitelist**

If VPN is not feasible, whitelist the StackConsole jump server:

```text
14.192.19.227
```

### vCenter credentials (assessment)

Provide vCenter credentials for the initial assessment. **Read-only** credentials are sufficient for this step.

| Field | Value |
|---|---|
| **vCenter URL** | |
| **vCenter Username** | |
| **vCenter Password** | |

---

## 2. CMP VM → vCenter connectivity

From all CMP VMs, access to vCenter is required. **Private access is recommended** for production.

Communication between the CMP VM and vCenter must be allowed on the configured API ports (typically **TCP 443**).

---

## 3. CMP VM configuration, domain, SSL, SMTP, and logos

Shared install inputs:

- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- <a href="/installation/prerequisites#ssl--tls-certificates" target="_blank" rel="noopener noreferrer">SSL / TLS Certificates</a>
- <a href="/installation/prerequisites#smtp--email-configuration" target="_blank" rel="noopener noreferrer">SMTP / Email Configuration</a>
- <a href="/installation/prerequisites#app-logos" target="_blank" rel="noopener noreferrer">App Logos</a>

---

## 4. Initial vCenter structure (required immediately)

CMP uses the vCenter API for VM operations and requires a specific folder structure **before** configuration begins.

### 4.1 Datacenter and folder structure

Create a **CMP Root Folder** of type **"VM and Template Folder"** at the Datacenter level:

- Folder name: `CMP-ROOT-FOLDER` (or any agreed name — share the exact name with the StackConsole team)
- CMP creates per-customer subfolders inside this root folder at onboarding time

### 4.2 Host cluster

- A **Host Cluster** is required for VM deployment
- Multiple clusters are supported — each can be mapped to a CMP compute category
- **DRS (Distributed Resource Scheduler) must be enabled** on all host clusters used by CMP

### 4.3 Datastore cluster / datastore pod

- A **Datastore Cluster** is required for VM storage
- Multiple clusters are supported — each can be mapped to a CMP storage category
- **Storage DRS must be enabled** on all datastore clusters used by CMP

### 4.4 VM template folder

- All VM templates must be stored in a dedicated folder in vCenter
- Share the template folder path with the StackConsole team

---

## 5. API user roles and permissions

To configure CMP with vCenter, provide **API user credentials** with the roles and permissions below.

CMP typically needs:

| User | Purpose | Access level |
|---|---|---|
| Dashboard / assessment user | UI access for StackConsole during setup | **Read-only** (minimum) — see [Access for StackConsole Team](#1-access-for-stackconsole-team) |
| **API user** | Used by CMP for VM operations | Custom role with the [minimum permissions](#minimum-required-vcenter-permissions) below |

### API user credentials to provide

| Field | Value |
|---|---|
| **vCenter URL** | |
| **vCenter Username** | |
| **vCenter Password** | |

:::tip[Custom role recommended]

Create a **custom role** in vCenter with the permissions below and assign it to the user account used by CMP. This keeps security tight while enabling required functionality. Do not use a full Administrator account for the CMP API user unless agreed with StackConsole.

:::

**Reference:** [VMware Privileges Documentation (vSphere 8.0)](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/vsphere-security-8-0/defined-privileges/virtual-machine-configuration-privileges.html)

### Minimum required vCenter permissions

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

:::note

`VirtualMachine.Config.AddRemoveDevice` is listed once; grant it as part of the custom role (it covers add/remove device operations used by CMP).

:::

---

## 6. VM console access setup requirements

As part of remote console access to VMware ESXi from CMP, confirm the network configuration for the **HTML console** for virtual machines.

vCenter returns **direct URLs to the ESXi host** for console sessions (not proxied only through vCenter). The **CMP backend server** must reach each **ESXi host** used for customer VMs.

### Ports to open (CMP server ↔ ESXi hosts)

| Port / protocol | Purpose |
|---|---|
| **ICMP (ping)** | Basic connectivity checks |
| **Port 80 (TCP)** | HTTP traffic |
| **Port 443 (TCP)** | Secure HTTPS traffic |
| **Port 902 (TCP and UDP)** | Required for VMware console traffic |
| **Port 903 (TCP)** | Additional VMware console port |

### Access method

Provide access from the CMP server to ESXi hosts using **one** of:

- **VPN** access to the ESXi hosts from the CMP server, **or**
- **Whitelisting** the CMP server’s IP address for direct access

These ports and access methods are required for the VM console to work smoothly. With this network path in place, no application-code changes are required for console access.

:::info[Confirm when ready]

Confirm with StackConsole once these configurations are applied, or ask if anything is unclear before go-live.

:::

**References:**

- [VMware vSphere Networking Requirements](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.security.doc/GUID-27A340F5-DE98-41A8-AC73-01ED4949EEF2.html)
- [vSphere Ports and Protocols](https://ports.broadcom.com/home/vSphere)
- [HTML Console SDK Programming Guide for vSphere 8.0](https://docs.vmware.com/en/VMware-vSphere/8.0/html-console-sdk-programming-guide/GUID-E5495E81-DAF4-4BEE-B66A-D3DD94B07596.html)

---

## 7. VM templates

To provision VMs from CMP, OS templates must meet CMP guest-customization requirements (password, SSH where applicable, cloud-init / cloudbase-init as agreed).

Key points:

- Templates must be stored in the dedicated **VM Template Folder** (see [section 4.4](#44-vm-template-folder))
- Templates must support password reset and SSH key injection where those features are offered
- Templates should be cloud-init compatible for Linux where applicable

Confirm the full template checklist with the StackConsole team during onboarding. See also [VMware setup](/orchestrators/vmware/).

---

## 8. Supported features

CMP supports the following VMware vCenter operations (subject to permissions and network access above):

### VM lifecycle

- Create, Start, Stop, Reboot, Reset VM
- VM Console Access (HTML5)
- Change VM Name
- Reset VM Username & Password

### Resource management

- Upgrade CPU, Memory, and Storage

### Snapshot management

- Create, Revert, Delete Snapshots

### Disk management

- Create new disk
- Attach / Detach disk
- Extend disk size
- Delete disk

### Network and IP management

- VLAN management (CMP tracks and manages VLANs per customer)
- Private IP pool management (automatic allocation/release)

### Import

- Import existing VMware VMs into CMP for centralized management

---

## 9. VMware checklist

Items needed to **begin** setup (without these, setup cannot proceed):

### Access and vCenter

- [ ] vSphere / vCenter is **8.0.1.0+** (supported by StackConsole)
- [ ] VPN access granted **or** jump server IP whitelisted
- [ ] Read-only (or equivalent) vCenter credentials provided — URL, username, password
- [ ] API user created with all required permissions (custom role recommended)
- [ ] API user credentials provided — URL, username, password
- [ ] `CMP-ROOT-FOLDER` (or agreed root folder) created in vCenter
- [ ] At least one Host Cluster with **DRS** enabled
- [ ] At least one Datastore Cluster with **Storage DRS** enabled
- [ ] VM Template Folder path confirmed
- [ ] OS templates prepared as agreed with StackConsole
- [ ] ESXi ports **ICMP**, **80**, **443**, **902** (TCP/UDP), **903** (TCP) reachable from the CMP backend
- [ ] VPN to ESXi **or** CMP server IP whitelisted for console access

### Staging / production CMP install inputs

- [ ] CMP VMs provisioned — see <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites</a> and <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Hosting Topology</a>
- [ ] Domain / URLs — see <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- [ ] SSL certificates — see <a href="/installation/prerequisites#ssl--tls-certificates" target="_blank" rel="noopener noreferrer">SSL / TLS</a>
- [ ] SMTP details — see <a href="/installation/prerequisites#smtp--email-configuration" target="_blank" rel="noopener noreferrer">SMTP</a>
- [ ] App logos when branding is required — see <a href="/installation/prerequisites#app-logos" target="_blank" rel="noopener noreferrer">App Logos</a>

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- [VMware vSphere Orchestrator Guide](/orchestrators/vmware/)
- [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
- [Payment Gateways](/billing/payment-gateways/)
