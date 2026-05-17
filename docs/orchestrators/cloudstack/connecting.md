---
sidebar_position: 2
title: "Connecting CMP to CloudStack"
tags: ["orchestrator", "cloudstack"]
---

# Connecting CMP to CloudStack

CMP communicates with CloudStack using the **DomainAdmin API key and secret**.

* For **new account creation**, CMP uses the parent domain credentials configured during setup.
* For **all subsequent requests** triggered by user-specific actions, CMP uses user-specific credentials.

## Configuration fields

Navigate to **Settings → Orchestrator → Cloud Providers → Add** and fill in:

| Field | Description |
| --- | --- |
| **Cloud Provider** | Select `CloudStack`. Note: *Nimbo* is the internal alias — do not confuse the two. |
| **Credentials Of** | Choose `Domain Admin`. ROOT credentials are reserved for future roadmap features. |
| **API Endpoint** | The CloudStack API endpoint URL. Must be reachable from the CMP server. |
| **Parent Domain ID** | ID of the domain under which all CMP-managed customer domains will be created. |
| **API Key** | Generated under the DomainAdmin user in the parent domain. |
| **Secret** | The secret paired with the API Key above. |
| **Cloud Provider Services** | Services available from CloudStack — controls quota management and frontend visibility. |

## Prerequisites

* CloudStack is installed and accessible from the CMP server
* A subdomain exists inside ROOT (e.g. `CMP-PROD`)
* A DomainAdmin account and user exist inside that subdomain with API keys generated

## Related

* [Domain & Credential Configuration](https://domain-credential-configuration)
* [Zones & Regions](/collection/zones-regions)