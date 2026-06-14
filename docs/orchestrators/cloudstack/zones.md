---
sidebar_position: 9
title: "Zones Configuration"
tags: ["orchestrator", "cloudstack"]
---

# Zones Configuration


To work with CMP, you need one user with the **DomainAdmin** role in CloudStack.

1. Log in to CloudStack as administrator
2. Create a subdomain inside ROOT — for example, `CMP-PROD`
3. Inside this subdomain, create one **account** and one **user**
4. Generate API Key and Secret for that user
5. Use these credentials when configuring the Cloud Provider in CMP

> **Security note:** Store these credentials securely. Rotate them if compromised and update the CMP Cloud Provider settings accordingly.