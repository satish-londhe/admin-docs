---
sidebar_position: 7
title: "PowerDNS Requirements"
tags: ["installation", "powerdns", "dns", "pdns", "requirements"]
---

# PowerDNS Requirements

This page covers the PowerDNS-specific requirements needed before StackConsole can connect CMP to your PowerDNS server for DNS-as-a-Service. Complete the [common prerequisites](/installation/prerequisites) first.

:::info
PowerDNS is a **standalone integration** in CMP — it works independently of any compute orchestrator and provides DNS management for customer domains.
:::

:::warning
**Supported PowerDNS version: 4.8.3+**
:::

---

## 1. Enable the PowerDNS API

CMP integrates with PowerDNS via its REST API. The API must be enabled in your PowerDNS configuration.

📄 Reference: [PowerDNS HTTP API Documentation](https://doc.powerdns.com/authoritative/http-api/index.html#enabling-the-api)

---

## 2. Configure `/etc/powerdns/pdns.conf`

Update your `pdns.conf` to enable the web server and API. Below is the recommended configuration:

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

---

## 3. Generate a Secure API Key

```bash
openssl rand -hex 32
```

Use this output as your `api-key` value in `pdns.conf`. Store it securely.

---

## 4. Enable DNSSEC

🔴 DNSSEC must be enabled in PowerDNS. CMP creates DNS records with **DNSSEC-secured zones** by default.

Verify this line is present in your `pdns.conf`:
```
gsqlite3-dnssec=yes
```

---

## 5. CMP VM → PowerDNS Connectivity

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

---

## 6. DNS Server Details to Provide

| Field | Value |
|---|---|
| API Endpoint (DNS Host) | _(e.g., `https://dns.yourcompany.com/api`)_ |
| API Key | _(generated via `openssl rand -hex 32`)_ |
| Web Server Port | _(default: `8081`)_ |

---

## 7. DNS Name Servers

Provide your authoritative name server list. These are the NS records that will be added to all customer-created zones:

| Name Server | Example |
|---|---|
| Primary NS | `ns1.yourcompany.com` |
| Secondary NS | `ns2.yourcompany.com` |

---

## 8. Verify Zone Creation (Optional Pre-Check)

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

📄 Reference: [PowerDNS Zone API](https://doc.powerdns.com/authoritative/http-api/zone.html)

---

## 9. PowerDNS Checklist

Complete before scheduling installation:

- [ ] PowerDNS version 4.8.3+ installed
- [ ] API enabled in `pdns.conf`
- [ ] Strong API key generated and set in `pdns.conf`
- [ ] DNSSEC enabled (`gsqlite3-dnssec=yes`)
- [ ] Web server configured with CMP server IP in `webserver-allow-from`
- [ ] API accessible from CMP server (verified with `curl`)
- [ ] DNS Server details (endpoint, API key, port) ready to share
- [ ] Name server list prepared (ns1, ns2, etc.)

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [PowerDNS Orchestrator Guide](/orchestrators/powerdns/)
