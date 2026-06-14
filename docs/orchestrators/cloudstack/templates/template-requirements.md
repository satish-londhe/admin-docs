---
sidebar_position: 2
title: "Template Creation Requirements"
tags: ["orchestrator", "cloudstack"]
---

# Template Creation Requirements

Templates (or ISOs) used for VM provisioning in CMP must meet the following requirements before registration in CloudStack.

## Required template properties

### 1. Password enabled

* Templates must be **password-enabled** when registered in CloudStack
* CMP does **not** send a password in the `deployVirtualMachine` request — CloudStack generates it automatically when the template is password-enabled
* After deployment, CloudStack returns the password and `passwordenabled` flag; CMP stores it on the VM record for display in the UI

Reference: https://docs.cloudstack.apache.org/en/4.11.2.0/adminguide/templates/\_password.html

### 2. SSH enabled

Configure in `/etc/ssh/sshd_config`:

* `PasswordAuthentication yes`
* `PermitRootLogin yes` (or use a default user — see below)

### 3. Startup script enabled

Required for automated configuration on first boot.

### 4. Scalable root disk

* Set a minimum root disk size in the template (e.g. 10 GB or 15 GB)
* The disk must be **scalable** at provisioning time — customers may select 60 GB, 120 GB, 500 GB, etc.

### 5. Default user (optional but recommended)

* Most providers disable direct root login
* Create a default OS user (e.g. `ubuntu` for Ubuntu, `centos` for CentOS)
* Set the username at the operating system level in CMP
* Use a consistent username across all versions of the same OS type

## L2 Networks and templates

> ⚠️ **L2 networks do not support UserData in CloudStack.** Password-enabled templates cannot be deployed on L2 networks.

If you try to deploy a password-enabled template on an L2 network, CloudStack will throw:

```
Unable to deploy VM as template ... is password enabled, but there is no support 
for UserData service in the default network
```

For L2 network provisioning, use a **non-password-enabled** template.

## Validation checklist

* Template is password-enabled in CloudStack
* SSH is enabled with correct `sshd_config` settings
* Startup script is enabled
* Root disk is scalable (not fixed size)
* Default user is configured (if not using root)
* Template is **not** password-enabled if used with L2 networks

## Reference

https://docs.cloudstack.apache.org/en/4.11.2.0/adminguide/templates.html