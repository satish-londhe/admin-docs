---
sidebar_position: 3
title: "Projects & Credentials"
tags: ["orchestrator", "openstack", "projects", "keystone", "setup"]
---

# Projects & Credentials

How CMP uses OpenStack **projects** and **credentials** for the cloud connector and for each customer.

:::info[Related setup]

Full Horizon steps for the admin application credential: [Connecting CMP to OpenStack](/orchestrators/openstack/connecting).

:::

## Two credential scopes

| Scope | What CMP uses | When |
|---|---|---|
| **Admin connector** | Application credential on the **admin** project (**admin** role + **Unrestricted**) | Connecting OpenStack to CMP; registering a customer (create OpenStack **user** and **project**; zones / images / flavors as required) |
| **Customer user** | That customer's OpenStack **user ID and password** | All later API calls — VM create, security groups, volumes, networks, and other day-to-day operations |

CMP does **not** keep using the admin application credential for customer workload APIs after the user and project exist.

With Provider Config **Project Setting = Under Project** (the only supported mode for OpenStack), each CMP customer project maps **one-to-one** to an OpenStack project — creating a project in CMP creates the same project in OpenStack. See [Connecting — Project Setting](/orchestrators/openstack/connecting#wizard-step-2--provider-config).

## Why admin project only

Admin-level APIs for user and project creation (and related setup) require the connector to be created under the **admin** project. See [Why the admin project is required](/orchestrators/openstack/connecting#why-the-admin-project-is-required).

## Customer role

After CMP creates the project and user, CMP assigns the roles configured in **Open Stack Project User Role** (Provider Config) — typically including **`member`**, plus service-specific roles (for example load balancer or Heat) for services you offer. See [Connecting — Open Stack Project User Role](/orchestrators/openstack/connecting#wizard-step-2--provider-config).

Virtuozzo (VHI) may need additional Domain Admin settings; those are covered with the VHI connection steps.

## Related

* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting)
* [Client Registration Flow](/orchestrators/openstack/client-registration)
* [OpenStack Requirements](/installation/orchestrator-requirements/openstack)
