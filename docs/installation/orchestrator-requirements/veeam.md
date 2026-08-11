---
sidebar_position: 7
title: "Veeam Requirements"
tags: ["installation", "veeam", "vspc", "backup", "requirements"]
---

# Veeam Requirements

Requirements before Stack Console can connect CMP to **Veeam Service Provider Console (VSPC)**. Complete the [common prerequisites](/installation/prerequisites) first.

:::warning[Standalone backup integration]

Veeam VSPC is independent of compute orchestrators. You can run it alongside CloudStack, VMware, or others. This is **not** the CloudStack native Backup & Recovery Veeam plugin.

:::

---

## 1. Supported version

| Item | Requirement |
|---|---|
| **Veeam Service Provider Console** | **9.1** (latest version supported by Stack Console) |

---

## 2. Access for CMP / Stack Console

| Item | Requirement |
|---|---|
| **Role** | User with **Company Administrator** permissions (company create + quota APIs) |
| **REST API key** | Simple API key (not read-only for CMP write operations). Private key is shown only once at creation — save it securely |
| **Portal Administrator** | Needed in VSPC to create REST API keys under **Configuration → REST API Keys** |

---

## 3. Public connectivity

| Endpoint | Requirement |
|---|---|
| **VSPC API URL** | Publicly reachable from CMP — for example `https://vspc.example.com:1280/` |
| **VSPC web UI** | Publicly reachable on the internet so customers can log in after redirect from Stack Console |

Without public URLs, API integration and customer self-service login will fail outside the provider network.

---

## 4. VSPC configuration checklist

* [ ] At least **one location** exists in VSPC
* [ ] Company Administrator account ready for CMP
* [ ] REST API Simple Key created and stored
* [ ] API and portal URLs tested from outside the provider LAN

---

## Next steps

* [Connecting CMP to Veeam](/orchestrators/veeam/connecting)
* [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages)

## Related

* <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
* [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
* [Veeam (VSPC) setup](/orchestrators/veeam/)
