---
sidebar_position: 5
title: "Startup script size (CloudStack)"
tags: ["platform", "marketplace", "cloudstack", "userdata", "global-settings"]
---

# Startup script size — CloudStack and CMP

Marketplace Apps usually rely on an **administrator startup script** on the template. Customers may also enter their **own** startup script at deploy time. Both are combined into UserData sent to CloudStack, so size limits must be aligned.

## CloudStack limit

CloudStack defines the maximum UserData / startup script size with the global setting:

| Setting | Scope |
|---|---|
| `vm.userdata.max.length` | CloudStack global configuration |

Raise this value in CloudStack if your Marketplace scripts (plus any customer script) exceed the default.

See the [CloudStack configuration / global settings](https://docs.cloudstack.apache.org/en/latest/adminguide/management.html) documentation for how to change global parameters.

## CMP limit (user-entered script)

CMP validates the **customer-entered** startup script with:

| Setting | Scope |
|---|---|
| `max_startup_script_size_in_bytes` | CMP **Global Settings** |

This caps how large a script the end user may paste on Create Instance.

## Combined size at deploy

At deployment, CMP combines:

* The **administrator** script (typically on the Marketplace template)
* The **user-entered** script (if any)

```text
Total UserData size ≈ administrator script size + user-entered script size
```

Requirements:

1. **User-entered script size** ≤ CMP `max_startup_script_size_in_bytes`
2. **Total UserData size** ≤ CloudStack `vm.userdata.max.length`

:::warning[Keep limits in sync]

If CMP allows a large user script but CloudStack’s `vm.userdata.max.length` is smaller than **admin script + user script**, deploy fails at the orchestrator. Set CloudStack’s limit **above** the worst-case total you expect for Marketplace Apps.

:::

## Related

* [Environment variables](/platform-features/marketplace-apps/environment-variables)
* [Preparing CMP-Compatible Templates — startup scripts](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates#enable-startup-script-support)
* [Configuring Templates in CMP — Startup script](/orchestrators/cloudstack/templates/configuring-templates-at-cmp#startup-script-cloudstack-only)
* [Virtual Router / VPC — User Data](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#user-data--required-for-templates-marketplace-and-startup-scripts)
