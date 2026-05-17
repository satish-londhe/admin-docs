---
sidebar_position: 3
title: "Domain & DNS Configuration"
tags: ["installation"]
---

# Domain & DNS Configuration

CMP requires DNS records pointing to your server before the portal is accessible. This page covers both single-domain and multi-domain setups.

## Setup types

| Type | Description | Use case |
| --- | --- | --- |
| **Single-domain** | Frontend and API share one domain | Simple / small deployments |
| **Multi-domain** | Separate domains for frontend and API | Recommended for production |

## Single-domain setup

Point one A record to your CMP server:

```
portal.yourcompany.com  →  A  →  <CMP server IP>
```

Both the customer portal and API run on this domain with path-based routing.

## Multi-domain setup (recommended)

```
portal.yourcompany.com  →  A  →  <CMP server IP>   # Frontend
api.yourcompany.com     →  A  →  <CMP server IP>   # Backend API
```

Update your `.env` accordingly:

```
APP_URL=https://portal.yourcompany.com
API_URL=https://api.yourcompany.com
```

Also update Keycloak redirect URIs if SSO is enabled — see [Keycloak Integration Setup](/auth/keycloak).

## Console Proxy domain (CloudStack)

If using CloudStack with VM console access, you need an additional domain:

```
console.yourcompany.com  →  A  →  <CloudStack console proxy IP>
```

See [Console Proxy Setup](/orchestrators/cloudstack/console-proxy) for full configuration.

## DNS propagation

After creating records, verify propagation:

```
dig portal.yourcompany.com
nslookup portal.yourcompany.com
```

Allow up to 24 hours for full propagation across all resolvers, though typically completes within minutes.

## Related

* [SSL / TLS Setup](/installation/ssl-tls)
* [CMP Server Installation](/installation/server-installation)
* [Keycloak Integration Setup](/auth/keycloak)
* [Console Proxy Setup](/orchestrators/cloudstack/console-proxy)
