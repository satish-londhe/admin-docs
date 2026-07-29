---
sidebar_position: 5
title: "Automation limitations"
tags: ["platform", "marketplace", "limitations"]
---

# Marketplace application automation limitations

CMP automates **infrastructure** provisioning — virtual machines, storage, and networking. **Application-level** automation depends on what runs inside the guest OS and what the orchestrator APIs can see.

## Technical limitation

CloudStack, OpenStack, and similar platforms provision and manage VMs. They do **not** have access to applications running inside the guest operating system.

Therefore CMP **cannot** automatically retrieve application-specific information such as:

* Administrator username or password generated inside the app
* Generated credentials or API keys
* Database credentials created by the installer
* Application configuration stored only in the guest
* Installation status of software inside the VM

That data is created **inside** the virtual machine and is **not** exposed through orchestrator APIs, so generic application-level automation is not possible.

:::info

Infrastructure (VM running, IP assigned, disk attached) is visible in CMP. Application login details are not, unless you collect them from the user or surface them inside the guest (see below).

:::

## Recommended approaches

### 1. Deployment parameters (Marketplace configuration parameters)

Let users provide application configuration (username, password, database settings, URL, and so on) **during deployment** using [environment variables](/platform-features/marketplace-apps/environment-variables).

Because the customer supplies the values, they already know the credentials after provisioning. The startup script applies those values inside the image.

See [Configure environment variables](/platform-features/marketplace-apps/configure-in-cmp#3-define-environment-variables).

### 2. Application information and documentation

Each Marketplace App should link to clear documentation:

* App **URL** on the Marketplace App form
* Template **Documentation Label** and **Documentation URL**

Customers can open setup guides from the CMP Marketplace / VM details without CMP needing to scrape the guest. See [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp) and [Documentation Label and URL](/orchestrators/cloudstack/templates/configuring-templates-at-cmp#documentation-label-and-url).

### 3. Display application information on the virtual machine

Show useful application information **after login** using guest mechanisms such as:

* `/etc/motd`
* Welcome / login banner
* A `README` in a well-known path
* First-login message printed by your startup script

Bake this into the Marketplace image or generate it from the startup script using the same environment variables the customer entered.

**Example:** After SSH login (and often after `sudo -i`), a one-time banner confirms Marketplace deploy success, points to passwords under `/root/`, and prints an app credential (for example MySQL root password). The message can note that it will be removed on the next login.

![Screenshot: SSH login banner after Marketplace App deploy — success message and MySQL password](/img/screenshots/cmp-marketplace-vm-login-banner.png)

## Related

* [Marketplace Apps overview](/platform-features/marketplace-apps/)
* [Environment variables](/platform-features/marketplace-apps/environment-variables)
* [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp)
