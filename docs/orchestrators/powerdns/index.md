---
sidebar_position: 1
title: "PowerDNS"
tags: ["orchestrator", "powerdns", "dns"]
---

# PowerDNS

This section covers integrating CMP with **PowerDNS** for DNS-as-a-Service.

:::important[Domain purchase not supported today]

CMP does **not** sell or register domain names. Customers can manage **DNS records** for domains they **already own**, using PowerDNS on **your** infrastructure.

Purchasing domains from CMP is on the **roadmap** for a future release.

:::

:::warning[Standalone DNS integration]

PowerDNS works **independently** of compute orchestrators. Customers manage DNS domains through CMP while zones and records are stored on your PowerDNS backend.

:::

:::info[Prerequisites]

Complete [PowerDNS Requirements](/installation/orchestrator-requirements/powerdns) before connecting — API endpoint, API key, web server port, and authoritative name servers.

:::

## Pages in this section

| Page | Description |
|---|---|
| [Connecting CMP to PowerDNS](/orchestrators/powerdns/connecting) | Cloud Provider wizard — Provider Setup, Provider Config, zone mapping, success |
| [DNS Pricing](/orchestrators/powerdns/dns-pricing) | Optional billing — module setting, rate card packages, free trial not supported |
| Customer DNS (portal) | [DNS Operations (Customer Portal)](/orchestrator-features/powerdns/dns-operations) |

## After setup

| Topic | Link |
|---|---|
| Installation checklist | [PowerDNS Requirements](/installation/orchestrator-requirements/powerdns) |
| DNS billing (optional) | [DNS Pricing](/orchestrators/powerdns/dns-pricing) |
| Customer DNS features | [DNS Operations (Customer Portal)](/orchestrator-features/powerdns/dns-operations) |

## Related

* [Supported Orchestrators](/overview/supported-orchestrators)
* [Orchestrator Features — PowerDNS](/orchestrator-features/powerdns/)
* [Orchestrator Requirements — PowerDNS](/installation/orchestrator-requirements/powerdns)
