---
sidebar_position: 4
title: "SSL / TLS Setup"
tags: ["installation"]
---

# SSL / TLS Setup

HTTPS is required for CMP in production. This page covers obtaining and configuring SSL certificates.

## Option 1 — Let's Encrypt (recommended for most setups)

Free, auto-renewing certificates via Certbot.

```
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d portal.yourcompany.com -d api.yourcompany.com
```

Certbot automatically modifies your Nginx config to enable HTTPS and sets up auto-renewal via a systemd timer or cron.

**Verify auto-renewal:**

```
sudo certbot renew --dry-run
```

## Option 2 — Commercial / wildcard certificate

Use this if you need a wildcard cert (e.g. `*.yourcompany.com`) or if your CA requires DNS validation.

1. Generate a CSR:

```
openssl req -new -newkey rsa:2048 -nodes \
  -keyout portal.yourcompany.com.key \
  -out portal.yourcompany.com.csr
```

2. Submit the CSR to your CA and obtain the certificate bundle
3. Place the cert and key on the server, then configure Nginx:

```
server {
    listen 443 ssl;
    server_name portal.yourcompany.com;

    ssl_certificate     /etc/ssl/certs/portal.yourcompany.com.crt;
    ssl_certificate_key /etc/ssl/private/portal.yourcompany.com.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ...
}
```

## HTTP → HTTPS redirect

Always redirect HTTP to HTTPS:

```
server {
    listen 80;
    server_name portal.yourcompany.com;
    return 301 https://$host$request_uri;
}
```

## CloudStack Console Proxy SSL

If using CloudStack, the console proxy domain requires its own SSL certificate configured in CloudStack global settings — separate from the CMP portal certificate.

See [Console Proxy Setup](/orchestrators/cloudstack/console-proxy).

## Verification

```
curl -I https://portal.yourcompany.com
openssl s_client -connect portal.yourcompany.com:443 -brief
```

## Related

* [Domain & DNS Configuration](/installation/domain-dns)
* [CMP Server Installation](/installation/server-installation)
* [Console Proxy Setup](/orchestrators/cloudstack/console-proxy)
