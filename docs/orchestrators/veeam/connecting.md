---
sidebar_position: 2
title: "Connecting CMP to Veeam"
tags: ["orchestrator", "veeam", "vspc", "setup", "configuration"]
---

# Connecting CMP to Veeam

Connect CMP to **Veeam Service Provider Console (VSPC)** so Stack Console can create companies, assign quotas, and deliver credentials.

:::info[Prerequisites]

Complete [Veeam Requirements](/installation/orchestrator-requirements/veeam) first — **VSPC 9.1**, Company Administrator access, public API and portal URLs, and at least one location.

:::

---

## Access requirements for Stack Console

To integrate Veeam with CMP you need a user with **Company Administrator** permissions so CMP can call VSPC APIs for company account creation and quota management.

| Requirement | Detail |
|---|---|
| **Role** | Company Administrator (API company create + quota) |
| **VSPC API URL** | Must be **publicly reachable** — for example `https://vspc.example.com:1280/` |
| **VSPC web UI URL** | Must be **publicly reachable** over the internet so customers can log in after CMP redirects them to the Veeam dashboard |
| **API key** | REST API key (`API_KEY`) generated in VSPC |

:::warning[Public URLs are mandatory]

Without a public API URL, CMP cannot reliably call VSPC. Without a public VSPC web interface URL, customers **cannot** log in from outside the provider network after account creation. They are redirected to the Veeam dashboard to manage backup operations.

:::

### Generate a REST API key (VSPC 9.1)

1. Log in to **Veeam Service Provider Console** with the **Portal Administrator** role
2. Open **Configuration** (top right)
3. In the left menu, select **REST API Keys**
4. Click **New** → **Simple Key (Recommended)**
5. Enter a description; enable **Read-only access** only if you intentionally need a read-only key (CMP integration needs write access for company and quota APIs — do **not** use read-only for the CMP integration key)
6. Click **Create**
7. **Copy and save** the private API key immediately — it is shown **only at creation time**
8. Click **OK**

For more detail, see **Configuring API Keys** in the official Veeam Service Provider Console documentation.

---

## Cross-check before connecting

Log in to the Veeam dashboard and confirm:

| Check | Requirement |
|---|---|
| **VSPC version** | Stack Console supports the **latest** Veeam Service Provider Console — currently **9.1** |
| **Location** | At least **one location** must exist in VSPC |

---

## Add Veeam Cloud Provider

**CMP path:** Settings → Orchestrator → Provider Setup → Configure (or Add Cloud Provider)

Choose **Provider Type: Veeam**. The wizard has five steps:

1. Provider Setup
2. Provider Config
3. Zone
4. Storage Setting
5. Success

### Wizard Step 1 — Provider Setup

**Provider Name**

*Required.* Display name — for example `Veeam Backup`.

**VSPC API URL**

*Required.* Base API URL — for example `https://vspc.example.com` (include port if required, such as `:1280`).

**Username**

*Required.* API user (Company Administrator–capable account as required by your VSPC setup).

**Password**

*Required.* Password for the API user.

**Default Reseller / Group**

*Optional.* Default reseller or group in VSPC when applicable to your hierarchy.

**API key**

*Required when your deployment uses REST API key auth.* Paste the private Simple API key generated above. Store it securely; CMP uses it for company and quota API calls.

:::tip[Save & Test Connection]

Always test the connection after Provider Setup. Fix URL reachability, credentials, API key, version (9.1), and location before continuing.

:::

### Wizard Step 2 — Provider Config

Additional configuration for how new Veeam tenant accounts are created and which services they can use.

![Screenshot: CMP — Veeam Provider Config (Additional Configuration)](/img/screenshots/cmp-veeam-provider-config.png)

**One GB Multiplier (Gigabyte Definition)**

*Required.* How CMP defines 1 GB: **1024** MB (binary) or **1000** MB (decimal). Match this to how Veeam / your billing treats storage.

**Bandwidth (In MBPS)**

*Required.* Default bandwidth limit for every new Veeam account. Set **-1** for unlimited.

**Enable Remote Services**

*Required.* Enable management of remote backup agents, servers, and Microsoft 365 backups within the tenant’s infrastructure.

**Enable Hosted Services**

*Required.* Allow the tenant to use provider-hosted backup servers, repositories, and Microsoft 365 backup resources.

**Enable Microsoft 365 Backup Services**

*Required.* When enabled, the tenant can use Veeam Backup for Microsoft 365 to protect cloud-based Microsoft workloads.

**Enable Cloud Connect Services**

*Required.* Enable management of cloud-hosted backup resources for the tenant.

**Default Tenant Backup Protection Days**

*Required.* Protect deleted backup files for **N** days.

![Screenshot: CMP — Veeam Provider Config (tenant change options)](/img/screenshots/cmp-veeam-provider-config-tenant-options.png)


Click **Submit & Continue** to proceed to Zone.

### Wizard Step 3 — Zone

Map or create the CMP zone(s) used for Veeam packages (same pattern as other orchestrators). Continue when the zone is **Active**.

### Wizard Step 4 — Storage Setting

Configure storage category / settings required for packaging Veeam plans on the rate card, then continue.

### Wizard Step 5 — Success

Confirm the provider setup is complete, then create [Veeam packages and unit pricing](/orchestrators/veeam/packages).

## Next steps

1. [Create Veeam packages and unit pricing](/orchestrators/veeam/packages)
2. Review [Veeam Features](/orchestrator-features/veeam/) for the customer experience

## Related

* [Veeam (VSPC) overview](/orchestrators/veeam/)
* [Veeam Requirements](/installation/orchestrator-requirements/veeam)
* [Veeam Packages & Unit Pricing](/orchestrators/veeam/packages)
