---
sidebar_position: 7
title: "Veeam Requirements"
tags: ["installation", "veeam", "vspc", "backup", "requirements"]
---

# Veeam Requirements

Requirements before Stack Console can connect CMP to **Veeam Service Provider Console (VSPC)**. Complete the [common prerequisites](/installation/prerequisites) first.

:::danger[Exact information to share with StackConsole]

To integrate Veeam with CMP you need a user with **Company Administrator**, **Portal Administrator**, or **Service Provider Administrator** permissions so CMP can call VSPC APIs for company account creation, quota management, and Infrastructure Site discovery.

**Send the values below to the StackConsole team** (fill in your real values). Version checks, Infrastructure Site setup, and API key generation further down this page are for **you** to prepare and verify so these values work.

| Requirement | Detail | Your value |
|---|---|---|
| **Role** | Company Administrator / Portal Administrator / Service Provider Administrator (API company create, quota, and Infrastructure Site visibility) | |
| **VSPC API URL** | Must be **publicly reachable** — for example `https://vspc.example.com:1280/` | |
| **VSPC web UI URL** | Must be **publicly reachable** over the internet so customers can log in after CMP redirects them to the Veeam dashboard | |
| **API key** | Make sure you are logged in as Portal Administrator. REST API key (`API_KEY`) generated in VSPC — see [Configuring API Keys (Veeam)](https://helpcenter.veeam.com/docs/vac/provider_admin/api_keys.html?ver=9.3) | |

:::

:::warning[Standalone backup integration]

Veeam VSPC is independent of compute orchestrators. You can run it alongside CloudStack, OpenStack, or others. This is **not** CloudStack native VM backup or the CloudStack **Veeam B&R plugin** path.

Read **[Backup and Recovery](/overview/backup-and-recovery)** before connecting VSPC or explaining CloudStack VM backup to customers.

:::

---

## 1. Requirements to provide

*Required — share with StackConsole.* CMP uses these to connect to VSPC and provision customer companies.

| Requirement | Detail |
|---|---|
| **Role** | Company Administrator / Portal Administrator / Service Provider Administrator (API company create, quota, and Infrastructure Site visibility) |
| **VSPC API URL** | Must be **publicly reachable** — for example `https://vspc.example.com:1280/` |
| **VSPC web UI URL** | Must be **publicly reachable** over the internet so customers can log in after CMP redirects them to the Veeam dashboard |
| **API key** | Make sure you are logged in as Portal Administrator. REST API key (`API_KEY`) generated in VSPC. Official steps: [Configuring API Keys (Veeam)](https://helpcenter.veeam.com/docs/vac/provider_admin/api_keys.html?ver=9.3) |

Without public URLs, API integration and customer self-service login will fail outside the provider network.

---

## Generate REST API key

Create a **Simple Key** in VSPC with **Portal Administrator** access. CMP integration requires **write** access (not read-only) for company create and quota APIs.

| Step | Action |
|---|---|
| **1** | Log in to VSPC as **Portal Administrator** |
| **2** | Open **Configuration** → **REST API Keys** |
| **3** | Click **New** → **Simple Key (Recommended)** |
| **4** | Save the private key immediately — it is shown **only at creation time** |

Full procedure: [Configuring API Keys — Veeam Service Provider Console](https://helpcenter.veeam.com/docs/vac/provider_admin/api_keys.html?ver=9.3)

Step-by-step with CMP context: [Connecting CMP to Veeam — Generate REST API key](/orchestrators/veeam/connecting#generate-a-rest-api-key-vspc-91).

---

## 2. Supported version

| Item | Requirement |
|---|---|
| **Veeam Service Provider Console** | **9.1** (latest version supported by Stack Console) |

---

## 3. Access for CMP / Stack Console

| Item | Requirement |
|---|---|
| **Role** | User with **Company Administrator**, **Portal Administrator**, or **Service Provider Administrator** permissions (company create, quota, and Infrastructure Site APIs) |
| **REST API key** | Simple API key (not read-only for CMP write operations). Private key is shown only once at creation — save it securely. See [Configuring API Keys (Veeam)](https://helpcenter.veeam.com/docs/vac/provider_admin/api_keys.html?ver=9.3) |
| **Portal Administrator** | Needed in VSPC to create REST API keys under **Configuration → REST API Keys** |

---

## 4. Public connectivity

| Endpoint | Requirement |
|---|---|
| **VSPC API URL** | Publicly reachable from CMP — for example `https://vspc.example.com:1280/` |
| **VSPC web UI** | Publicly reachable on the internet so customers can log in after redirect from Stack Console |

Without public URLs, API integration and customer self-service login will fail outside the provider network.

---

## 5. Veeam Cloud Connect and Infrastructure Sites

For the Stack Console VSPC integration to work, **Veeam Cloud Connect** must be configured in VSPC, and **at least one Infrastructure Site** must be available.

### How Stack Console uses Infrastructure Sites

| VSPC concept | Stack Console mapping |
|---|---|
| **Infrastructure Site** | Mapped directly to a **Zone (Location)** in Stack Console |
| **Site UID** | Required when provisioning a tenant via VSPC API |

Tenant provisioning uses:

```http
POST /api/v3/infrastructure/sites/{siteUid}/tenants
```

During CMP setup, Stack Console discovers Infrastructure Sites from VSPC and uses them for **Zone** mapping in the Cloud Provider wizard. Without at least one site, Veeam backup service cannot be provisioned correctly.

### Verify sites are visible to the API

Call the VSPC Infrastructure Sites API with the same credentials configured in Stack Console:

```http
GET /api/v3/infrastructure/sites
```

**Healthy response** — `data` contains one or more sites, for example:

```json
{
  "meta": {
    "pagingInfo": {
      "total": 1,
      "count": 1,
      "offset": 0
    }
  },
  "data": [
    {
      "siteUid": "…",
      "name": "…"
    }
  ]
}
```

**Problem response** — empty list (Stack Console cannot map a Veeam zone):

```json
{
  "meta": {
    "pagingInfo": {
      "total": 0,
      "count": 0,
      "offset": 0
    }
  },
  "data": []
}
```

When `data` is empty, Stack Console cannot discover or map the required Veeam Zone/Location, and **Veeam backup service provisioning will fail**.

:::warning[Symptom: empty Infrastructure Sites API]

If `GET /api/v3/infrastructure/sites` returns `"data": []`, do not proceed with Zone mapping in CMP until VSPC returns at least one Infrastructure Site with the API credentials you plan to use.

:::

### VSPC checks before connecting CMP

Confirm the following in your VSPC environment:

1. **Veeam Cloud Connect** and **Infrastructure Sites** are configured and **online** in VSPC.
2. The **API user** configured in Stack Console has permission to view Infrastructure Sites — for example **Portal Administrator** or **Service Provider Administrator** (in addition to company-create / quota APIs where required).
3. The **Infrastructure Site** is **enabled** and accessible using the **same API credentials** you enter in Stack Console.

Once at least one Infrastructure Site is returned by the VSPC API, complete **Zone** mapping in the [Veeam Cloud Provider wizard](/orchestrators/veeam/connecting#wizard-step-3--zone) and proceed with [Veeam packages](/orchestrators/veeam/packages).

---

## 6. VSPC configuration checklist

* [ ] **Role**, **VSPC API URL**, **VSPC web UI URL**, and **API key** ready to send to StackConsole — see [Requirements to provide](#1-requirements-to-provide)
* [ ] **Veeam Cloud Connect** configured in VSPC
* [ ] At least **one Infrastructure Site** exists, is online, and appears in `GET /api/v3/infrastructure/sites`
* [ ] API user can list Infrastructure Sites (Portal Administrator / Service Provider Administrator as required)
* [ ] Company Administrator/Portal Administrator account ready for CMP
* [ ] REST API Simple Key created and stored
* [ ] API and portal URLs tested from outside the provider LAN

---

## Checklist

### Requirements to provide (send to StackConsole)

- [ ] **Role** — Company Administrator / Portal Administrator / Service Provider Administrator (API company create, quota, Infrastructure Sites)
- [ ] **VSPC API URL** — publicly reachable — for example `https://vspc.example.com:1280/`
- [ ] **VSPC web UI URL** — publicly reachable for customer login after redirect
- [ ] **API key** — REST API key generated in VSPC — [Configuring API Keys (Veeam)](https://helpcenter.veeam.com/docs/vac/provider_admin/api_keys.html?ver=9.3)

### Verification

- [ ] VSPC **9.1** (supported version)
- [ ] **Veeam Cloud Connect** configured; at least one **Infrastructure Site** online in VSPC
- [ ] `GET /api/v3/infrastructure/sites` returns at least one site with your API credentials
- [ ] API and portal URLs reachable from outside the provider LAN

---

## Next steps

* [Connecting CMP to Veeam](/orchestrators/veeam/connecting)
* [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages)

## Related

* <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
* [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
* [Veeam (VSPC) setup](/orchestrators/veeam/)
