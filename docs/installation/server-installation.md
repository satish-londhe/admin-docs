---
sidebar_position: 2
title: "CMP Server Installation"
tags: ["installation"]
---

# CMP Server Installation

This page covers the server-side installation of CMP. Complete [Prerequisites & System Requirements](https://prerequisites-system-requirements) before proceeding.

## Installation overview

```
1. Prepare server (OS, dependencies)
        ↓
2. Clone / extract CMP codebase
        ↓
3. Configure environment (.env)
        ↓
4. Run database migrations
        ↓
5. Set up queue workers & scheduler
        ↓
6. Configure web server (Nginx/Apache)
        ↓
7. Initial super admin setup
```

## Step 1 — Prepare the server

```
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mysql-server redis-server php8.1-fpm \
  php8.1-mysql php8.1-redis php8.1-mbstring php8.1-xml \
  php8.1-curl php8.1-zip php8.1-bcmath composer nodejs npm
```

## Step 2 — Database setup

```
CREATE DATABASE cmp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cmp_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON cmp_db.* TO 'cmp_user'@'localhost';
FLUSH PRIVILEGES;
```

## Step 3 — Environment configuration

Copy the example environment file and fill in your values:

```
cp .env.example .env
```

Key variables to configure:

| Variable | Description |
| --- | --- |
| `APP_URL` | Full URL of your CMP frontend (e.g. `https://portal.yourcompany.com`) |
| `API_URL` | Full URL of the API (same as APP\_URL for single-domain, else separate) |
| `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | Database credentials |
| `REDIS_HOST` | Redis server host |
| `MAIL_*` | SMTP / mail configuration for notifications |
| `QUEUE_CONNECTION` | Set to `redis` for production |

See [Environment Variables Reference](https://environment-variables-reference) for the full list.

## Step 4 — Install dependencies & migrate

```
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan db:seed --class=InitialDataSeeder
php artisan storage:link
```

## Step 5 — Queue workers & scheduler

Add to crontab (`crontab -e`):

```
* * * * * cd /var/www/cmp && php artisan schedule:run >> /dev/null 2>&1
```

Set up Supervisor for queue workers:

```
[program:cmp-worker]
command=php /var/www/cmp/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
numprocs=2
```

## Step 6 — Nginx configuration

```
server {
    listen 80;
    server_name portal.yourcompany.com;
    root /var/www/cmp/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

> After setup, configure SSL — see [SSL / TLS Setup](https://ssl-tls-setup).

## Step 7 — Verify installation

* Visit `https://portal.yourcompany.com` — the setup wizard or login page should appear
* Proceed to [Initial Super Admin Setup](https://initial-super-admin-setup)

## Related

* [Domain & DNS Configuration](https://domain-dns-configuration)
* [SSL / TLS Setup](https://ssl-tls-setup)
* [Initial Super Admin Setup](https://initial-super-admin-setup)
* [Environment Variables Reference](https://environment-variables-reference)