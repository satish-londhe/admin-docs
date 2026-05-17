---
sidebar_position: 1
title: "Prerequisites & System Requirements"
tags: ["installation"]
---

# Prerequisites & System Requirements

Before installing CMP, ensure your infrastructure meets the following requirements.

## Server requirements

| Component | Minimum | Recommended |
| --- | --- | --- |
| CPU | 4 vCPUs | 8 vCPUs |
| RAM | 8 GB | 16 GB |
| Disk | 50 GB SSD | 100 GB SSD |
| OS | Ubuntu 20.04 LTS | Ubuntu 22.04 LTS |

## Network requirements

* CMP server must have **outbound access** to all configured orchestrator API endpoints
* CMP server must be reachable on **port 80/443** from the public internet (for the customer portal)
* If using Keycloak SSO, the Keycloak server must be reachable from CMP
* Console Proxy domain (for VM console access) must be publicly resolvable — see [Console Proxy Setup](/doc/console-proxy-setup)

## Software dependencies

| Dependency | Notes |
| --- | --- |
| PHP 8.x | Required for CMP backend API |
| MySQL / MariaDB | Primary database |
| Redis | Queue and cache |
| Node.js | Frontend build |
| Nginx / Apache | Web server |
| Composer | PHP dependency manager |

## DNS requirements

* A domain or subdomain pointing to the CMP server (e.g. `portal.yourcompany.com`)
* A wildcard or dedicated SSL certificate for that domain
* If multi-URL setup: separate domains for frontend (`portal.yourcompany.com`) and API (`api.yourcompany.com`)

## Orchestrator connectivity

Each orchestrator must be reachable from the CMP server before configuring the Cloud Provider:

| Orchestrator | Endpoint to verify |
| --- | --- |
| CloudStack | `http(s)://<acs-host>:<port>/client/api` |
| OpenStack | Keystone endpoint |
| VMware vSphere | vCenter API endpoint |
| Proxmox | PVE API (`https://<host>:8006`) |

## Related

* [CMP Server Installation](https://cmp-server-installation)
* [Domain & DNS Configuration](https://domain-dns-configuration)
* [SSL / TLS Setup](https://ssl-tls-setup)