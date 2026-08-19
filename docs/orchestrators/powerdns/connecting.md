---
sidebar_position: 2
title: "Connecting CMP to PowerDNS"
tags: ["orchestrator", "powerdns", "dns", "setup", "configuration"]
---

# Connecting CMP to PowerDNS

This guide walks through connecting CMP to a **PowerDNS** DNS backend so customers can manage **DNS domains** through the portal.

In CMP the provider appears as **Dns(dns)**. CMP uses the PowerDNS **REST API** for zone and record operations.

:::important[Domain purchase not supported today]

CMP does **not** support **purchasing or registering domain names**. Customers must already own a domain (registered elsewhere) before using CMP DNS.

**Supported today:** DNS **record management** for existing domain names — zones and records on **your** PowerDNS deployment (your infrastructure).

**Roadmap:** Options to **purchase domain names directly from CMP** are planned for a future release.

:::

:::warning[Standalone DNS integration]

PowerDNS is **independent** of compute orchestrators (CloudStack, VMware, and others). You can run it alongside any compute setup to offer DNS-as-a-Service.

:::

:::info[Prerequisites]

Complete [PowerDNS Requirements](/installation/orchestrator-requirements/powerdns) first:

* PowerDNS **4.8.3+**
* API enabled in `pdns.conf` with a strong **API key**
* **Web server port** reachable from the CMP VM (default **8081**)
* Authoritative **name servers** (for example `ns1.yourcompany.com`, `ns2.yourcompany.com`) ready to add in Provider Config

:::

---

## Overview

```
CMP admin wizard
        │
        ▼
Provider Setup  ──▶  API endpoint + API key + port + Dns Domain service
        │
        ▼
Provider Config ──▶  Nameservers added to all customer zones
        │
        ▼
Zone mapping    ──▶  CMP zone ↔ DNS region
        │
        ▼
Customers       ──▶  Manage DNS records for existing domains via CMP
```

| In CMP | On PowerDNS |
|---|---|
| **Dns Domain** service | Zones and records via REST API |
| **Nameservers** (Provider Config) | NS records added to customer-created zones |
| **Zone mapping** | Logical region customers select when creating DNS domains |

Feature documentation for customer DNS flows: [DNS Operations (Customer Portal)](/orchestrator-features/powerdns/dns-operations).

---

## Admin setup overview

| Step | Task | Documentation |
|---|---|---|
| **1** | **Cloud Services** — enable **Dns Domain** | [Step 1 — Cloud Services](#step-1--cloud-services) |
| **2** | **Cloud Provider Setup** — API endpoint, key, port | [Wizard Step 1 — Provider Setup](#wizard-step-1--provider-setup) |
| **3** | **Provider Configuration** — nameservers | [Wizard Step 2 — Provider Config](#wizard-step-2--provider-config) |
| **4** | **Region mapping** — map DNS zone to CMP zone | [Wizard Step 3 — Zone](#wizard-step-3--zone) |
| **5** | **Success** — provider ready | [Wizard Step 5 — Success](#wizard-step-5--success) |

**CMP path:** **Settings → Orchestrator → Cloud Provider Setup** → **Add Cloud Provider** (or open an existing setup → **Configure**)

The Cloud Provider wizard covers **Steps 2–5** above. **Step 1 (Cloud Services)** is configured separately.

:::info[Storage Setting — not applicable]

The wizard may show a **Storage Setting** step between **Zone** and **Success**. **Storage Setting does not apply to DNS** — use **Skip & Continue** on that step. DNS uses the **Dns Domain** service only; there are no storage categories or tiers to configure.

:::

---

## Step 1 — Cloud Services

Enable the **Dns Domain** service so CMP can provision and manage DNS domains.

**Path:** **Settings → Orchestrator → Cloud Services**

Enable **Dns Domain** for the DNS cloud provider. Keep this aligned with **Dns Domain** selected in [Cloud Provider Setup](#wizard-step-1--provider-setup) (Wizard Step 1).

:::warning[Keep services in sync]

If you change DNS services later, confirm **Dns Domain** remains enabled in both **Cloud Services** and **Cloud Provider Setup**.

:::

---

## Cloud Provider wizard

The wizard shows five screens. For DNS, only these apply:

| Wizard screen | Applies to DNS? |
|---|---|
| 1. Provider Setup | Yes |
| 2. Provider Config | Yes |
| 3. Zone | Yes |
| 4. Storage Setting | **No** — skip |
| 5. Success | Yes |

---

## Wizard Step 1 — Provider Setup

Establish the connection from CMP to your PowerDNS API.

![Screenshot: CMP — DNS Step 1 Provider Setup](/img/screenshots/cmp-dns-step1-provider-setup.png)

Configure the fields below in the order shown, then click **Submit & Continue**.

**Cloud Provider**

*Required.* Select **Dns(dns)** from the dropdown.

**Setup Name**

*Required.* A unique name for this DNS connection in CMP — for example, `Dns`.

**Monitoring Provider**

*Required.* Select **NONE** for DNS integrations.

**Timezone**

*Required.* Select the timezone that matches the DNS / PowerDNS environment — for example, **UTC**.

The selected timezone must match the PowerDNS environment timezone.

**API Endpoint**

*Required.* Base URL of the PowerDNS host — for example, `http://14.192.19.208` or `https://dns.yourcompany.com`.

The CMP VM must be able to reach this endpoint over the network. Use **Check Connection** to verify reachability before continuing.

**Is Live**

*Required.* Set to **Yes** when the DNS backend is production-ready, or **No** during staging / testing.

**API Key (Username)**

*Required.* PowerDNS **API key** from `pdns.conf` (`api-key=…`). Must be a valid key provided by the DNS backend.

Generate a strong key on the PowerDNS server — see [Generate a secure API key](/installation/orchestrator-requirements/powerdns#generate-a-secure-api-key).

**Port**

*Required.* PowerDNS **web server port** — default **`8081`** (`webserver-port` in `pdns.conf`).

CMP appends this port when calling the REST API unless your endpoint URL already includes a port.

**Cloud Provider Services**

*Required.* Select **Dns Domain**.

Available services vary by provider. For DNS integration, **Dns Domain** must be enabled.

**Status**

*Required.* Set to **Active** to enable this provider, or **Inactive** to save configuration without making it live.

Click **Submit & Continue** (or **Skip & Continue** only if you intentionally defer saving this step).

---

## Wizard Step 2 — Provider Config

Configure **nameservers** for customer DNS zones.

![Screenshot: CMP — DNS Step 2 Provider Config](/img/screenshots/cmp-dns-step2-provider-config.png)

### Add DNS nameservers

Nameservers entered here are added to **all customer-created zones** in CMP.

1. Enter each nameserver hostname in **Nameserver** — for example, `demo1.stackconsole.io`
2. Click **+ Add**
3. Repeat for every authoritative NS — for example, `demo2.stackconsole.io`

Remove a nameserver with the trash icon on its tag.

These should match the NS hostnames you documented in [PowerDNS Requirements — DNS Name Servers](/installation/orchestrator-requirements/powerdns#2-dns-name-servers).

Click **Submit & Continue** when all nameservers are added.

---

## Wizard Step 3 — Zone

Map DNS regions to CMP zones so domains are provisioned in the correct location.

![Screenshot: CMP — DNS Step 3 Zone mapping](/img/screenshots/cmp-dns-step3-zone.png)

1. Click **+ ADD ZONE**
2. Configure **Zone Name**, **Country**, and **Status** — for example, **Default**, **India**, **Active**
3. Ensure at least one zone is **Active**
4. Click **Submit & Next**

:::info[Region mapping]

Zone mapping ensures DNS domains created through CMP are associated with the correct CMP zone / region label shown to customers.

:::

You can also manage zones later under **Settings → Orchestrator → Zones**.

---

## Storage Setting (skip)

The **Storage Setting** screen appears in the shared Cloud Provider wizard but **does not apply to DNS**.

* DNS provisioning uses **Dns Domain** only — there are no storage categories, tiers, or storage settings to configure.
* Click **Skip & Continue** to proceed to **Success**.

Do **not** add storage settings for the DNS provider unless StackConsole explicitly instructs otherwise for your deployment.

---

## Wizard Step 5 — Success

Confirm the setup completed successfully.

![Screenshot: CMP — DNS provider setup complete](/img/screenshots/cmp-dns-step5-success.png)

The DNS provider is ready for customer DNS domain management.

Click **Continue** to return to provider management, or proceed with any remaining billing / package configuration for your DNS product.

---

## Verify the connection

After the wizard, confirm PowerDNS responds from the CMP VM:

```bash
curl -s -H 'X-API-Key: YOUR_API_KEY' \
  http://<PDNS_HOST>:8081/api/v1/servers | python3 -m json.tool
```

A successful response returns server information in JSON. Full checks: [PowerDNS Requirements — connectivity verification](/installation/orchestrator-requirements/powerdns#cmp-vm--powerdns-connectivity).

---

## Related

* [DNS Pricing](/orchestrators/powerdns/dns-pricing)
* [PowerDNS Requirements](/installation/orchestrator-requirements/powerdns)
* [PowerDNS Setup](/orchestrators/powerdns/)
* [PowerDNS Features](/orchestrator-features/powerdns/)
* [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
