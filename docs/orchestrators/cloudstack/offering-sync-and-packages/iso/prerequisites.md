---
sidebar_position: 2
title: "Prerequisites & Architecture"
tags: ["orchestrator", "cloudstack", "packages", "iso", "architecture", "prerequisites", "ssvm", "upload"]
---

# ISO Prerequisites & Architecture Requirements

Before offering custom ISO registration to customers, ensure your CloudStack network, Secondary Storage VM (SSVM), and CMP settings are properly configured.

:::warning[ISO service disabled by default]

The **ISO** service is **disabled by default** in CMP. To offer ISO management and billing to your customers, contact the **StackConsole team** to enable the ISO feature on your platform before configuring packages or global settings.

:::

:::note[Architecture reference — based on CloudStack documentation]

The local upload architecture and reverse-proxy workflow detailed below has been developed with the help of the official Apache CloudStack documentation and architectural guidelines. **This configuration has not been validated practically in a production test environment.**

Administrators must refer to the official CloudStack documentation for their specific CloudStack version (e.g. 4.22+) to test and validate SSVM SSL certificates, upload endpoints, and reverse-proxy load balancing before enabling this in production:

* [Apache CloudStack — Uploading Templates and ISOs from a Local Computer](https://docs.cloudstack.apache.org/en/latest/adminguide/templates.html#uploading-templates-from-a-local-computer)
* [Apache CloudStack — SSL Certificate for Console Proxy and Secondary Storage VMs](https://docs.cloudstack.apache.org/en/latest/adminguide/systemvm.html#ssl-certificate-for-console-proxy-and-secondary-storage-vms)
* [Apache CloudStack — Load Balancing System VMs (SSVM / CPVM)](https://docs.cloudstack.apache.org/en/latest/adminguide/systemvm.html#load-balancing-console-proxy)

:::

## Overview of ISO upload methods

CloudStack supports two methods for registering ISO images:

1. **Upload ISO from URL** (remote download via SSVM)
2. **Upload ISO from Local** (direct browser upload to SSVM over HTTPS)

| Architectural parameter | Upload ISO from URL | Upload ISO from Local |
|---|---|---|
| **Initiator** | CloudStack Secondary Storage VM (SSVM) | Customer web browser |
| **Data flow path** | Remote URL ➔ SSVM ➔ Secondary Storage | Browser ➔ Public Load Balancer / SSVM ➔ Secondary Storage |
| **Public CloudStack endpoint** | **Not required** | **Required** (SSVM HTTPS upload endpoint only) |
| **CMP to CloudStack communication** | Private network (Management Server API) | Private network (Management Server API) |
| **CMP bandwidth consumption** | Negligible (control-plane API only) | Negligible (control-plane API only) |
| **Prerequisites** | SSVM outbound internet reachability | SSVM HTTPS enabled + Reverse Proxy + CA certificate |

---

## Method 1 — Upload ISO from URL

When a customer or admin registers an ISO by URL:

1. The customer enters the image name, zone, and a public HTTP/HTTPS link to the ISO in the CMP customer portal.
2. CMP calls the CloudStack Management Server API (`registerIso`) over the **private network**.
3. The CloudStack Management Server instructs the **Secondary Storage VM (SSVM)** in that zone to download the ISO.
4. The SSVM downloads the ISO directly from the remote URL and saves it to CloudStack Secondary Storage.

```text
┌──────────────┐     API / URL      ┌──────────────────────┐
│ User Browser │ ─────────────────> │ CMP Application      │
└──────────────┘                    └──────────┬───────────┘
                                               │ Private API (8080/8443)
                                               ▼
┌──────────────┐    Pulls ISO Data  ┌──────────────────────┐
│ External URL │ <───────────────── │ CloudStack SSVM      │
└──────────────┘                    └──────────┬───────────┘
                                               │ Stores file
                                               ▼
                                    ┌──────────────────────┐
                                    │ Secondary Storage    │
                                    └──────────────────────┘
```

### Network requirements for URL upload

* **No public CloudStack endpoints needed:** Neither the CloudStack Management Server nor the SSVM needs to accept inbound connections from the public internet.
* **SSVM outbound access:** The SSVM's public network interface must have outbound routing and DNS resolution to fetch files from remote web servers (HTTP ports 80 and 443).
* **CMP overhead:** CMP only transmits metadata (ISO name, URL, zone). Zero ISO payload data passes through the CMP server.

---

## Method 2 — Upload ISO from Local (Browser-to-SSVM)

For local ISO uploads, the customer selects an `.iso` file from their local machine. CloudStack generates an authenticated upload session and returns a specific upload URL in the following format:

```text
https://<SSVM-IP-or-FQDN>/upload/<UUID>
```

For example:
```text
https://10.0.2.32/upload/7bd459af-6268-47fa-887f-e6552a302094
```

The `/upload/<UUID>` endpoint is served directly by CloudStack's **Secondary Storage VM (SSVM)**, **not** by the CloudStack Management Server.

### Architectural parallel to Console Proxy (CPVM)

This architecture is conceptually identical to how CloudStack handles VM console sessions through the Console Proxy VM (CPVM):

```text
CONSOLE ACCESS:
User Browser ────────── Console URL ──────────> CPVM ──────────> Virtual Machine

LOCAL ISO UPLOAD:
User Browser ────────── /upload/<UUID> ───────> SSVM ──────────> Secondary Storage
```

In both cases:
* The system VM (CPVM or SSVM) serves the data-plane traffic directly with the user's browser.
* The **CloudStack Management Server remains completely private**, handling only the control-plane session coordination.

### Why direct browser-to-SSVM upload is essential

CMP must **never** act as a data proxy for local file uploads:

```text
RECOMMENDED (Direct Data Path):
User Browser ────────── 10 GB ISO ──────────> CloudStack SSVM ──> Secondary Storage
     │
     │ Metadata only (few KB)
     ▼
CMP Server

ANTI-PATTERN (Unnecessary Proxying — Avoid):
User Browser ───── 10 GB ISO ─────> CMP Server ───── 10 GB ISO ─────> CloudStack SSVM
```

:::important[Eliminating double bandwidth and server saturation]

If an ISO file were proxied through the CMP server:
* A **10 GB ISO** would consume **20 GB of network transfer** through the CMP (10 GB inbound + 10 GB outbound).
* CMP server CPU, RAM, and disk I/O buffers would be monopolized by large multi-gigabyte streams, risking service degradation for all other portal operations.

By routing the data path directly from the **User Browser to the CloudStack SSVM**, CMP handles only control-plane metadata, keeping CMP resource consumption near zero regardless of ISO file size.

:::

---

## Exposing the SSVM endpoint securely

:::warning[Do NOT expose the CloudStack Management Server API publicly]

Do **not** expose the CloudStack Management Server (ports 8080 or 8443) or the CloudStack admin UI to the public internet to support local ISO uploads.

**Expose only the required HTTPS endpoint for CloudStack's Secondary Storage VM (SSVM)**. All communication between CMP and the CloudStack Management Server must remain strictly on the **private internal network**.

```text
DO NOT EXPOSE:
Internet ────> CloudStack Management Server (8080/8443 API / Admin UI) [DANGEROUS ATTACK SURFACE]

RECOMMENDED ARCHITECTURE:
Internet ────> Public Reverse Proxy / LB (HTTPS 443) ────> SSVM /upload/<UUID> (Port 443)
CMP      ────> Private Network (Port 8080/8443)      ────> CloudStack Management Server
```

:::

### Recommended architecture with Load Balancer / Reverse Proxy

Instead of exposing the SSVM's direct IP address (e.g. `https://10.0.2.32/upload/<UUID>`), route incoming upload requests through a public reverse proxy or load balancer using a dedicated FQDN:

```text
https://iso-upload.example.com/upload/<UUID>
```

```text
                     INTERNET
                         │
                         │ HTTPS (TCP 443)
                         ▼
              https://iso-upload.example.com
                         │
                         │ 443
                         ▼
              ┌─────────────────────┐
              │ Load Balancer /     │
              │ Reverse Proxy       │
              │ (Terminates SSL)    │
              └──────────┬──────────┘
                         │
                         │ Internal HTTPS (TCP 443)
                         ▼
              ┌─────────────────────┐
              │ CloudStack SSVM     │
              │ Private IP (e.g.    │
              │ 10.0.2.32)          │
              └──────────┬──────────┘
                         │
                         ▼
                 Secondary Storage
```

While normal CMP communication remains completely private:

```text
CMP Server
   │
   │ Private network (TCP 8080 or 8443)
   │ CloudStack API
   ▼
CloudStack Management Server
```

---

## CloudStack configuration: `secstorage.ssl.cert.domain`

To ensure CloudStack generates the upload URL using your public FQDN (rather than an internal or dynamic IP), configure the corresponding CloudStack global setting:

### **`secstorage.ssl.cert.domain`**

* **Description:** Defines the domain name / FQDN used for the Secondary Storage VM SSL certificate.
* **Function:** When set (for example, to `iso-upload.example.com` or `*.yourdomain.com`), CloudStack constructs the `/upload/<UUID>` URL using this configured domain.
* **SSVM Port Mapping:** CloudStack's architecture maps external port `443` directly to internal SSVM port `443`.
* **SSL Offloading:** When using a load balancer or reverse proxy with SSL offloading, CloudStack documentation recommends blocking direct public internet access to the raw SSVM IP address so that all uploads are forced through the managed proxy endpoint.

---

## Nginx reverse proxy configuration example

Below is an optimized Nginx configuration for terminating SSL and proxying upload traffic to the CloudStack SSVM:

```nginx
server {
    listen 443 ssl;
    server_name iso-upload.example.com;

    # Valid CA-signed SSL certificate
    ssl_certificate     /etc/ssl/certs/iso-upload.example.com.crt;
    ssl_certificate_key /etc/ssl/private/iso-upload.example.com.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    location /upload/ {
        # Forward to the internal SSVM IP and port
        proxy_pass https://10.0.2.32:443;

        # Disable request buffering to stream directly to SSVM
        proxy_request_buffering off;
        proxy_buffering         off;

        # Extended timeouts for multi-gigabyte ISO uploads
        proxy_connect_timeout   60s;
        proxy_send_timeout      3600s;
        proxy_read_timeout      3600s;
        client_body_timeout     3600s;

        # Allow unlimited upload size (or set to 25G / 50G as needed)
        client_max_body_size    0;

        # Standard proxy headers
        proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        X-Forwarded-Proto $scheme;
    }
}
```

### Key configuration directives explained

| Directive | Recommended value | Purpose |
|---|---|---|
| `proxy_request_buffering` | `off` | Prevents the reverse proxy from buffering the entire 10+ GB ISO to local disk before sending it to the SSVM, streaming payload chunks directly in real time. |
| `client_max_body_size` | `0` (or `25G`) | Disables HTTP payload size limits so operating system ISO images are not rejected with `413 Request Entity Too Large`. |
| `proxy_read_timeout` / `proxy_send_timeout` | `3600s` (1 hour) | Prevents proxy timeout drops while uploading large files over slower client connections. |
| `ssl_certificate` | Valid CA cert | Ensures the client browser accepts the upload request without security warnings or CORS/mixed-content blocks. |

---

## CloudStack 4.22 SSVM HTTPS requirements

CloudStack documentation confirms that local template and ISO uploads require SSVMs to have HTTPS enabled:

* Ensure the CloudStack global setting `secstorage.encrypt.copy` and SSVM certificate configurations are verified.
* Validate that the CloudStack zone's public network / SSVM can serve the secure upload endpoint before enabling the feature in CMP.
* For official CloudStack template and ISO management documentation, see [Apache CloudStack Template & ISO Guide](https://docs.cloudstack.apache.org/en/latest/adminguide/templates.html).

---

## CMP configuration checklist for ISO

Ensure the following CMP settings are in place once the network architecture is verified:

1. **StackConsole Team Enablement:** Confirm with the StackConsole team that the ISO service module is unlocked for your tenant.
2. **Cloud Provider Setup:** Navigate to **Settings → Orchestrator → Cloud Provider Setup**, edit your CloudStack connection, and ensure **ISO** is enabled in **Wizard Step 1**.
3. **Enable Local Upload in Global Settings:**
   * Go to **Admin Panel → Global Settings**.
   * Locate `iso_upload_from_local`.
   * Set to `true` (default is `false`).
   * When set to `true`, the customer portal exposes both the **From URL** and **From Local** tabs in the **Register ISO** dialog.

---

## Related

* [ISO Packages & Billing](/orchestrators/cloudstack/offering-sync-and-packages/iso/packages)
* [ISO Management Overview](/orchestrators/cloudstack/offering-sync-and-packages/iso/)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Custom Template Packages](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [Apache CloudStack — Uploading Templates & ISOs from Local](https://docs.cloudstack.apache.org/en/latest/adminguide/templates.html#uploading-templates-from-a-local-computer)
* [Apache CloudStack — SSVM SSL Certificate Configuration](https://docs.cloudstack.apache.org/en/latest/adminguide/systemvm.html#ssl-certificate-for-console-proxy-and-secondary-storage-vms)
* [Apache CloudStack — Load Balancing System VMs](https://docs.cloudstack.apache.org/en/latest/adminguide/systemvm.html#load-balancing-console-proxy)
