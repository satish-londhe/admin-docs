---
sidebar_position: 1
title: "PowerDNS Features"
tags: ["orchestrator", "powerdns", "features"]
---

# PowerDNS Features

Feature documentation for **PowerDNS** in CMP — customer and admin capabilities after the orchestrator is connected.

:::important[What customers can do today]

| Supported | Not supported (today) |
|---|---|
| Manage **DNS records** (zones, A, CNAME, and similar) for **existing** domain names | **Purchase** or **register** new domain names through CMP |

DNS runs on **your** PowerDNS deployment. Customers must register domains with a registrar separately, then point NS records to your authoritative name servers.

**Roadmap:** Domain name **purchase from CMP** is planned for a future release.

:::

## Feature list

| Feature | Status | Page |
|---|---|---|
| DNS operations (customer portal) | Ready | [DNS Operations](/orchestrator-features/powerdns/dns-operations) — create domain, nameservers, manage records |

Billing is optional — see admin [DNS Pricing](/orchestrators/powerdns/dns-pricing).

## Related setup

| Topic | Link |
|---|---|
| Connect PowerDNS | [Connecting CMP to PowerDNS](/orchestrators/powerdns/connecting) |
| Installation requirements | [PowerDNS Requirements](/installation/orchestrator-requirements/powerdns) |
| Admin setup hub | [PowerDNS Setup](/orchestrators/powerdns/) |
| DNS billing (optional) | [DNS Pricing](/orchestrators/powerdns/dns-pricing) |

## Related

* [Orchestrator Features](/orchestrator-features/)
* [Connecting CMP to PowerDNS](/orchestrators/powerdns/connecting)
* [PowerDNS Setup](/orchestrators/powerdns/)
