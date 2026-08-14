---
sidebar_position: 7
title: "PowerDNS Requirements"
tags: ["installation", "powerdns", "dns", "pdns", "requirements"]
---

# PowerDNS Requirements

This page covers PowerDNS-specific requirements for DNS-as-a-Service in CMP. Complete the [common prerequisites](/installation/prerequisites) first.

:::info

PowerDNS is a **standalone integration** in CMP — it works independently of any compute orchestrator and provides DNS management for customer domains.

:::

:::warning

**Supported PowerDNS version: 4.8.3+**

:::

:::danger[Exact information to share with StackConsole]

For PowerDNS, StackConsole only needs the values below. Send this list to the StackConsole team (fill in your real values).

**Nothing else is required as “requirements to share”** — API setup, `pdns.conf`, DNSSEC, and connectivity checks further down this page are for **you** to prepare and verify so these values work.

### 1. DNS Server Details

| Field | What to send (example) | Your value |
|---|---|---|
| **API Endpoint (DNS Host)** | `https://dns.yourcompany.com/api` | |
| **API Key** | Long secret from `openssl rand -hex 32` | |
| **Web Server Port** | `8081` (default) | |

### 2. DNS Name Servers

| Field | What to send (example) | Your value |
|---|---|---|
| **Primary NS** | `ns1.yourcompany.com` | |
| **Secondary NS** | `ns2.yourcompany.com` | |

You may add more NS hostnames if you have them. These NS records are added to all customer-created zones in CMP.

:::

---

## 1. DNS Server Details to Provide

*Required — share with StackConsole.* CMP uses these to connect to your PowerDNS API.

| Field | Value |
|---|---|
| **API Endpoint (DNS Host)** | _(for example `https://dns.yourcompany.com/api`)_ |
| **API Key** | _(generated via `openssl rand -hex 32` — see [Generate a secure API key](#generate-a-secure-api-key))_ |
| **Web Server Port** | _(default: `8081`)_ |

---

## 2. DNS Name Servers

*Required — share with StackConsole.* Provide your authoritative name server list. These NS records are added to all customer-created zones:

| Name Server | Example |
|---|---|
| **Primary NS** | `ns1.yourcompany.com` |
| **Secondary NS** | `ns2.yourcompany.com` |

---

## Verification and preparation (do not confuse with “what to share”)

The steps below are **not** additional items to invent for StackConsole. Use them only to **prepare** PowerDNS and confirm the [DNS Server Details](#1-dns-server-details-to-provide) and [Name Servers](#2-dns-name-servers) above are correct and reachable.

### Enable the PowerDNS API

CMP integrates with PowerDNS via its REST API. The API must be enabled in your PowerDNS configuration.

Reference: [PowerDNS HTTP API Documentation](https://doc.powerdns.com/authoritative/http-api/index.html#enabling-the-api)

### Configure `/etc/powerdns/pdns.conf`

Update your `pdns.conf` to enable the web server and API. Below is a recommended configuration:

```bash
sudo tee /etc/powerdns/pdns.conf > /dev/null << 'EOF'
# Network settings
local-address=0.0.0.0
local-port=53

# Backend
launch=gsqlite3
gsqlite3-database=/var/lib/powerdns/pdns.sqlite3
gsqlite3-dnssec=yes

# Security
setuid=pdns
setgid=pdns

# Logging
log-dns-queries=yes
log-dns-details=yes
loglevel=5

# Performance
cache-ttl=60
negquery-cache-ttl=60
query-cache-ttl=20

# REST API & Web UI
api=yes
api-key=YOUR_STRONG_API_KEY_HERE
webserver=yes
webserver-address=0.0.0.0
webserver-port=8081
webserver-allow-from=127.0.0.1,::1,<CMP_SERVER_IP>
EOF
```

:::warning

Change `webserver-allow-from` to include the **CMP server's IP address** so CMP can reach the PowerDNS API. Replace `<CMP_SERVER_IP>` with the actual IP.

:::

### Generate a secure API key

```bash
openssl rand -hex 32
```

Use this output as your `api-key` value in `pdns.conf`, and provide the same value in [DNS Server Details](#1-dns-server-details-to-provide). Store it securely.

### Enable DNSSEC

DNSSEC must be enabled in PowerDNS. CMP creates DNS records with **DNSSEC-secured zones** by default.

Verify this line is present in your `pdns.conf`:

```text
gsqlite3-dnssec=yes
```

### CMP VM → PowerDNS connectivity

From the CMP server, access is needed to the PowerDNS web server on the configured `webserver-port` (default: **8081**).

**Verify API access from the DNS server itself:**

```bash
curl -s -H 'X-API-Key: YOUR_API_KEY' \
  http://127.0.0.1:8081/api/v1/servers | python3 -m json.tool
```

**Verify API access from the CMP server:**

```bash
curl -s -H 'X-API-Key: YOUR_API_KEY' \
  http://<PDNS_SERVER_IP>:8081/api/v1/servers | python3 -m json.tool
```

A successful response returns a JSON array with server information.

### Verify zone creation (optional pre-check)

You can verify PowerDNS is working correctly by creating a test zone from the command line:

```bash
# Create zone
sudo pdnsutil create-zone example.com

# Add SOA record
sudo pdnsutil add-record example.com '' SOA \
  'ns1.example.com. hostmaster.example.com. 2024041301 10800 3600 604800 3600'

# Add NS records
sudo pdnsutil add-record example.com '' NS 'ns1.example.com.'

# Add A records
sudo pdnsutil add-record example.com 'ns1' A '192.168.1.1'
sudo pdnsutil add-record example.com 'www' A '192.168.1.10'

# Rectify the zone
sudo pdnsutil rectify-zone example.com
```

**Verify the zone:**

```bash
sudo pdnsutil list-zone example.com
sudo pdnsutil check-zone example.com

# Test DNS resolution
dig @127.0.0.1 www.example.com A +short
```

Reference: [PowerDNS Zone API](https://doc.powerdns.com/authoritative/http-api/zone.html)

---

## Checklist

Confirm the **requirements** and verification steps before scheduling installation:

### Requirements to provide (send to StackConsole)

- [ ] **API Endpoint (DNS Host)** — for example `https://dns.yourcompany.com/api`
- [ ] **API Key**
- [ ] **Web Server Port** — usually `8081`
- [ ] **Primary NS** — for example `ns1.yourcompany.com`
- [ ] **Secondary NS** — for example `ns2.yourcompany.com` (and any additional NS)

### Verification

- [ ] PowerDNS version 4.8.3+ installed
- [ ] API enabled in `pdns.conf`
- [ ] Strong API key generated and set in `pdns.conf`
- [ ] DNSSEC enabled (`gsqlite3-dnssec=yes`)
- [ ] Web server configured with CMP server IP in `webserver-allow-from`
- [ ] API accessible from CMP server (verified with `curl`)

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- [PowerDNS Orchestrator Guide](/orchestrators/powerdns/)
- [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
