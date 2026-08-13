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

:::important[What you must provide]

For CMP setup, the **requirements** StackConsole needs from you are only:

1. [DNS Server Details](#1-dns-server-details-to-provide) (API endpoint, API key, web server port)
2. [DNS Name Servers](#2-dns-name-servers) (authoritative NS list for customer zones)

The sections after that (API enablement, `pdns.conf`, DNSSEC, connectivity checks, zone test, checklist) are **verification and preparation** steps so those details work — not separate items to invent beyond the two requirement blocks above.

:::

---

## 1. DNS Server Details to Provide

*Required.* Share these with the StackConsole team so CMP can connect to PowerDNS:

| Field | Value |
|---|---|
| **API Endpoint (DNS Host)** | _(for example `https://dns.yourcompany.com/api`)_ |
| **API Key** | _(generated via `openssl rand -hex 32` — see [Generate a secure API key](#generate-a-secure-api-key))_ |
| **Web Server Port** | _(default: `8081`)_ |

---

## 2. DNS Name Servers

*Required.* Provide your authoritative name server list. These NS records are added to all customer-created zones:

| Name Server | Example |
|---|---|
| **Primary NS** | `ns1.yourcompany.com` |
| **Secondary NS** | `ns2.yourcompany.com` |

---

## Verification and preparation

Use the steps below to prepare PowerDNS and confirm the [DNS Server Details](#1-dns-server-details-to-provide) and [Name Servers](#2-dns-name-servers) above are ready before installation.

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

### Requirements to provide

- [ ] DNS Server details ready — API endpoint, API key, web server port
- [ ] Name server list prepared (ns1, ns2, etc.)

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
