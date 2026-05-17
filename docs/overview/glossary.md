---
sidebar_position: 4
title: "Glossary & Terminology"
tags: ["overview", "reference"]
---

# Glossary & Terminology

Key terms used throughout CMP documentation.

| Term | Definition |
| --- | --- |
| **CMP** | Cloud Management Platform — the platform this documentation covers |
| **Orchestrator** | A cloud backend CMP communicates with (e.g. CloudStack, OpenStack, VMware) |
| **ACS / Nimbo** | Internal names for Apache CloudStack. "Nimbo" is the CMP internal alias — do not confuse with the orchestrator name |
| **Zone** | A datacenter region defined in CMP and mapped to an orchestrator zone |
| **Cloud Provider** | A configured orchestrator instance in CMP (Settings → Orchestrator) |
| **Package** | A predefined resource bundle (CPU, RAM, storage) shown to customers for provisioning |
| **Offering** | The orchestrator-side equivalent of a CMP package (e.g. CloudStack Compute Offering) |
| **Domain Admin** | A CloudStack role used by CMP to manage customer domains and accounts |
| **Parent Domain** | The CloudStack domain under which all CMP-managed customer domains are created |
| **Prepaid** | Billing mode where customers top up a wallet and usage is deducted in real time |
| **Postpaid** | Billing mode where invoices are generated and settled after usage |
| **PAYG** | Pay-as-you-go — hourly billing based on actual resource usage |
| **Quota** | Resource limits (vCPU, RAM, storage, etc.) assigned at global, account, or project level |
| **KYC** | Know Your Customer — verification step required before a customer can provision services |
| **SSO** | Single Sign-On — delegated authentication via Keycloak |
| **2FA** | Two-Factor Authentication |
| **Disciplinary Action** | Automated actions (warnings, suspension) triggered when a customer's wallet is negative beyond the grace period |
| **Stoppable Service** | A service (e.g. VM) where billing pauses for CPU/RAM when stopped; storage billing continues |
| **Override Disk** | A CMP option where root disk size is specified separately from the compute offering |
| **BS** | Block Storage (used in billing service type labels like `BS_SNAPSHOT`) |