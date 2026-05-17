---
sidebar_position: 6
title: "Environment Variables Reference"
tags: ["installation", "reference"]
---

# Environment Variables Reference

Complete reference for CMP `.env` configuration variables. Copy `.env.example` as a starting point and fill in values for your environment.

## Application

| Variable | Description | Example |
| --- | --- | --- |
| `APP_NAME` | Display name for the application | `My Cloud` |
| `APP_ENV` | Environment mode | `production` |
| `APP_KEY` | Laravel application key (auto-generated) | `base64:...` |
| `APP_DEBUG` | Enable debug mode — **set** `false` **in production** | `false` |
| `APP_URL` | Full public URL of the frontend | `https://portal.yourcompany.com` |
| `API_URL` | Full URL of the backend API | `https://api.yourcompany.com` |

## Database

| Variable | Description | Example |
| --- | --- | --- |
| `DB_CONNECTION` | Database driver | `mysql` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_PORT` | Database port | `3306` |
| `DB_DATABASE` | Database name | `cmp_db` |
| `DB_USERNAME` | Database user | `cmp_user` |
| `DB_PASSWORD` | Database password | `strong_password` |

## Cache & Queue

| Variable | Description | Example |
| --- | --- | --- |
| `CACHE_DRIVER` | Cache backend | `redis` |
| `QUEUE_CONNECTION` | Queue backend — use `redis` in production | `redis` |
| `REDIS_HOST` | Redis server host | `127.0.0.1` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis auth (if set) | `null` |

## Mail / Notifications

| Variable | Description | Example |
| --- | --- | --- |
| `MAIL_MAILER` | Mail driver | `smtp` |
| `MAIL_HOST` | SMTP host | `smtp.mailgun.org` |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_USERNAME` | SMTP username |  |
| `MAIL_PASSWORD` | SMTP password |  |
| `MAIL_ENCRYPTION` | Encryption method | `tls` |
| `MAIL_FROM_ADDRESS` | Sender email address | `noreply@yourcompany.com` |
| `MAIL_FROM_NAME` | Sender display name | `My Cloud` |

## Keycloak SSO (optional)

| Variable | Description |
| --- | --- |
| `KEYCLOAK_CLIENT_ID` | Client ID from Keycloak |
| `KEYCLOAK_CLIENT_SECRET` | Client secret from Keycloak |
| `KEYCLOAK_REALM_ID` | Realm name in Keycloak |
| `KEYCLOAK_BASE_URL` | Base URL of your Keycloak server |

See [Keycloak Integration Setup](/doc/keycloak-integration-setup) for how to generate these values.

## Payment Gateways (optional)

| Variable | Description |
| --- | --- |
| `STRIPE_KEY` | Stripe publishable key |
| `STRIPE_SECRET` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

## Storage

| Variable | Description | Example |
| --- | --- | --- |
| `FILESYSTEM_DISK` | Default storage disk | `local` |
| `AWS_ACCESS_KEY_ID` | S3-compatible storage key (if applicable) |  |
| `AWS_SECRET_ACCESS_KEY` | S3-compatible storage secret |  |
| `AWS_DEFAULT_REGION` | Storage region |  |
| `AWS_BUCKET` | S3 bucket name |  |

## Related

* [CMP Server Installation](https://cmp-server-installation)
* [Keycloak Integration Setup](/doc/keycloak-integration-setup)
* [Global Settings Reference](/collection/global-settings-reference)