---
sidebar_position: 7
title: "Client Registration Flow"
tags: ["orchestrator", "openstack", "registration", "projects", "setup"]
---

# Client Registration Flow

When a customer is registered in CMP (admin onboarding or self-registration, depending on your payment mode), CMP registers them in OpenStack using the **admin** connector, then switches to the customer's own credentials for all later API calls.

## What happens at registration

CMP uses the **admin** project application credential to:

1. Create the OpenStack **user**  
2. Create the OpenStack **project**  
3. Associate setup resources as required (**zones**, **images**, **flavors**)

Details and diagram: [Why the admin project is required](/orchestrators/openstack/connecting#why-the-admin-project-is-required).

## After registration

All subsequent operations for that customer (VM creation, security groups, volumes, networks, and so on) use the customer's OpenStack **user ID and password** — not the admin application credential.

See [Projects & Credentials](/orchestrators/openstack/projects-and-credentials).

:::danger[Documentation in progress]

Additional detail (exact timing vs first service create, domain placement, failure retry, admin vs self-registration differences) will be expanded here.

:::

## Related

* [Projects & Credentials](/orchestrators/openstack/projects-and-credentials)
* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting)
* [Payment Modes](/billing/payment-modes/)
