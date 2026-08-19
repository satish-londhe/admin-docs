---
sidebar_position: 7
title: "Veeam Requirements"
tags: ["installation", "veeam", "vspc", "backup", "requirements"]
---

# Veeam Requirements

Requirements before Stack Console can connect CMP to **Veeam Service Provider Console (VSPC)**. Complete the [common prerequisites](/installation/prerequisites) first.

:::danger[Exact information to share with StackConsole]

To integrate Veeam with CMP you need a user with **Company Administrator** permissions so CMP can call VSPC APIs for company account creation and quota management.

**Send the values below to the StackConsole team** (fill in your real values). Version checks, location setup, and API key generation further down this page are for **you** to prepare and verify so these values work.

| Requirement | Detail | Your value |
|---|---|---|
| **Role** | Company Administrator (API company create + quota) | |
| **VSPC API URL** | Must be **publicly reachable** — for example `https://vspc.example.com:1280/` | |
| **VSPC web UI URL** | Must be **publicly reachable** over the internet so customers can log in after CMP redirects them to the Veeam dashboard | |
| **API key** | REST API key (`API_KEY`) generated in VSPC | |

:::

:::warning[Standalone backup integration]

Veeam VSPC is independent of compute orchestrators. You can run it alongside CloudStack, VMware, or others. This is **not** the CloudStack native Backup & Recovery Veeam plugin.

:::

---

## 1. Requirements to provide

*Required — share with StackConsole.* CMP uses these to connect to VSPC and provision customer companies.

| Requirement | Detail |
|---|---|
| **Role** | Company Administrator (API company create + quota) |
| **VSPC API URL** | Must be **publicly reachable** — for example `https://vspc.example.com:1280/` |
| **VSPC web UI URL** | Must be **publicly reachable** over the internet so customers can log in after CMP redirects them to the Veeam dashboard |
| **API key** | REST API key (`API_KEY`) generated in VSPC |

Without public URLs, API integration and customer self-service login will fail outside the provider network.

---

## 2. Supported version

| Item | Requirement |
|---|---|
| **Veeam Service Provider Console** | **9.1** (latest version supported by Stack Console) |

---

## 3. Access for CMP / Stack Console

| Item | Requirement |
|---|---|
| **Role** | User with **Company Administrator** permissions (company create + quota APIs) |
| **REST API key** | Simple API key (not read-only for CMP write operations). Private key is shown only once at creation — save it securely |
| **Portal Administrator** | Needed in VSPC to create REST API keys under **Configuration → REST API Keys** |

---

## 4. Public connectivity

| Endpoint | Requirement |
|---|---|
| **VSPC API URL** | Publicly reachable from CMP — for example `https://vspc.example.com:1280/` |
| **VSPC web UI** | Publicly reachable on the internet so customers can log in after redirect from Stack Console |

Without public URLs, API integration and customer self-service login will fail outside the provider network.

---

## 5. VSPC configuration checklist

* [ ] **Role**, **VSPC API URL**, **VSPC web UI URL**, and **API key** ready to send to StackConsole — see [Requirements to provide](#1-requirements-to-provide)
* [ ] At least **one location** exists in VSPC
* [ ] Company Administrator account ready for CMP
* [ ] REST API Simple Key created and stored
* [ ] API and portal URLs tested from outside the provider LAN

---

## Checklist

### Requirements to provide (send to StackConsole)

- [ ] **Role** — Company Administrator (API company create + quota)
- [ ] **VSPC API URL** — publicly reachable — for example `https://vspc.example.com:1280/`
- [ ] **VSPC web UI URL** — publicly reachable for customer login after redirect
- [ ] **API key** — REST API key generated in VSPC

### Verification

- [ ] VSPC **9.1** (supported version)
- [ ] At least one **location** in VSPC
- [ ] API and portal URLs reachable from outside the provider LAN

---

## Next steps

* [Connecting CMP to Veeam](/orchestrators/veeam/connecting)
* [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages)

## Related

* <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
* [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
* [Veeam (VSPC) setup](/orchestrators/veeam/)
