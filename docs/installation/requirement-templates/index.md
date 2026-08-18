---
sidebar_position: 1
title: "Requirement Templates"
tags: ["installation", "requirements", "templates", "onboarding"]
---

# Requirement Templates

Fillable templates to collect CMP installation requirements and email them to StackConsole. Use these **alongside** the detailed docs — they reduce confusion when you connect **multiple orchestrators** because platform requirements are captured **once**, and each orchestrator has its **own** access template.

:::tip[Why two template types?]

| Template | Fill how many times? | What it covers |
|---|---|---|
| **[CMP Platform Requirements](/installation/requirement-templates/cmp-platform-requirements)** | **Once** per CMP deployment | CMP VMs, domain names, SSL, SMTP, logos, StackConsole access to CMP VMs |
| **Orchestrator access templates** | **Once per orchestrator / integration** | Credentials, connectivity, and orchestrator-specific values only — **not** CMP VMs or SSL again |

Example: CloudStack + Proxmox + CEPH → **1** platform template + **3** orchestrator templates.

:::

---

## How to use

1. **Download** the Word template (`.docx`) from the link on each template page below.
2. Open in **Microsoft Word** or **Google Docs** (File → Open → upload).
3. Fill every **Your value** cell in the tables.
4. Email the completed file to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io) with subject `CMP Platform Requirements — Your Company` (or the orchestrator name for access templates).
5. Attach SSL certificates separately if they are not on the CMP VMs — see [SSL / TLS](/installation/prerequisites#ssl--tls-certificates).

:::info[Google Docs upload]

In Google Docs: **File → Open → Upload** and select the downloaded `.docx`. Edit and share the same way as a native Google Doc.

:::

### After the platform template

Fill **one orchestrator access template per** CloudStack, Proxmox, VMware, OpenStack, CEPH, etc. — section 2 below. Read [Prerequisites](/installation/prerequisites) and [Orchestrator Requirements](/installation/orchestrator-requirements/) if you need detail behind a field.

---

## 1. CMP Platform Requirements (fill once)

Covers everything shared across all orchestrators:

* Hosting topology (staging / production)
* CMP VM specifications and SSH access
* Domain names (portal + API URLs)
* SSL / TLS certificates
* SMTP / email
* App logos (light + dark)
* StackConsole access to CMP infrastructure (VPN or IP whitelist)

**Download Word:** <a href="/requirement-templates/cmp-platform-requirements-template.docx" download="CMP-Platform-Requirements.docx">CMP Platform Requirements (.docx)</a>

**View online:** [CMP Platform Requirements](/installation/requirement-templates/cmp-platform-requirements)

**Detailed docs:** [Prerequisites & System Requirements](/installation/prerequisites) · [Hosting Topology](/installation/hosting-topology)

---

## 2. Orchestrator & integration access (fill per item)

Use **only** the templates for orchestrators and integrations you will connect. Do **not** repeat CMP VM, domain, or SSL fields here — those belong in the platform template above.

| Orchestrator / integration | Download Word | View online | Detailed requirement page |
|---|---|---|---|
| **Apache CloudStack** | <a href="/requirement-templates/cloudstack-access-requirements-template.docx" download="CloudStack-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/cloudstack-access-requirements) | [CloudStack Requirements](/installation/orchestrator-requirements/cloudstack) |
| **VMware vSphere** | <a href="/requirement-templates/vmware-access-requirements-template.docx" download="VMware-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/vmware-access-requirements) | [VMware Requirements](/installation/orchestrator-requirements/vmware) |
| **OpenStack** | <a href="/requirement-templates/openstack-access-requirements-template.docx" download="OpenStack-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/openstack-access-requirements) | [OpenStack Requirements](/installation/orchestrator-requirements/openstack) |
| **Proxmox VE** | <a href="/requirement-templates/proxmox-access-requirements-template.docx" download="Proxmox-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/proxmox-access-requirements) | [Proxmox Requirements](/installation/orchestrator-requirements/proxmox) |
| **CEPH (Object Storage)** | <a href="/requirement-templates/ceph-access-requirements-template.docx" download="CEPH-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/ceph-access-requirements) | [CEPH Requirements](/installation/orchestrator-requirements/ceph) |
| **Veeam (VSPC)** | <a href="/requirement-templates/veeam-access-requirements-template.docx" download="Veeam-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/veeam-access-requirements) | [Veeam Requirements](/installation/orchestrator-requirements/veeam) |
| **PowerDNS** | <a href="/requirement-templates/powerdns-access-requirements-template.docx" download="PowerDNS-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/powerdns-access-requirements) | [PowerDNS Requirements](/installation/orchestrator-requirements/powerdns) |
| **Keycloak SSO** *(optional)* | <a href="/requirement-templates/keycloak-access-requirements-template.docx" download="Keycloak-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/keycloak-access-requirements) | [Keycloak Requirements](/installation/orchestrator-requirements/keycloak) |
| **DIGIO KYC** *(optional, India)* | <a href="/requirement-templates/digio-access-requirements-template.docx" download="DIGIO-Access-Requirements.docx">.docx</a> | [Page](/installation/requirement-templates/digio-access-requirements) | [DIGIO Requirements](/installation/orchestrator-requirements/digio) |

:::info[Standalone integrations]

CEPH, Veeam, and PowerDNS are **not** tied to a compute orchestrator. Use the platform template once plus each integration template you need.

:::

---

## Multi-orchestrator example

**Provider offers:** CloudStack compute + Proxmox compute + CEPH object storage

| Send to StackConsole | Count |
|---|---|
| CMP Platform Requirements | 1 |
| CloudStack access requirements | 1 |
| Proxmox access requirements | 1 |
| CEPH access requirements | 1 |
| **Total templates** | **4** |

VM sizing, `portal.example.com`, `api.example.com`, and SSL certificates appear **only** in the platform template.

---

## Related

* [Prerequisites & System Requirements](/installation/prerequisites)
* [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
* [Choosing a Hosting Topology](/installation/hosting-topology)
