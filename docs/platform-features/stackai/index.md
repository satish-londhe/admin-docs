---
sidebar_position: 1
title: "StackAI"
tags: ["platform", "stackai", "beta", "customer-portal", "ai"]
---

# StackAI

:::info[Beta]

StackAI is in **beta**. Capabilities, suggested prompts, and enabled tools may vary by tenant. Confirm with StackConsole which features are active on your deployment.

:::

**StackAI** is the cloud operations assistant inside the **customer cloud console**. End users describe what they want in plain language — list VMs, check billing, take a snapshot — and StackAI carries out the work against their live account.

They do not need API calls, deep menus, or command names. Type a request, confirm when asked, and StackAI executes.

## Where customers open it

1. Sign in to the cloud console (same dashboard used for instances, networks, and billing).
2. In the left sidebar, under **General**, click **StackAI**.

![StackAI in the cloud console sidebar](/img/screenshots/stackai/cloud-console-sidebar-stackai.png)

StackAI uses the existing session — there is no separate login.

## Documentation

| Page | Purpose |
|---|---|
| [StackAI User Guide](/platform-features/stackai/user-guide) | Full tutorial — tour, workflow, examples, history, projects, safety, capabilities, FAQ |

## Admin notes

| Topic | Detail |
|---|---|
| **Audience** | End customers (not CMP admin console) |
| **Permissions** | StackAI only lists and changes resources the logged-in user may manage |
| **vs console dashboard** | The [Customer Dashboard](/platform-features/customer-dashboard/) home shows counts, quotas, and product shortcuts; StackAI is the conversational workspace for the same account |
| **Not supported in StackAI** | Kubernetes, DBaaS, load balancers, VPN — use main console menus where the provider offers them |

## Related

* [Customer Dashboard](/platform-features/customer-dashboard/)
* [Platform Features](/platform-features/)
* [APIs](/platform-features/apis)
