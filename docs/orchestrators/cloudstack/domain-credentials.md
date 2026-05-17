---
sidebar_position: 3
title: "Domain & Credential Configuration"
tags: ["orchestrator", "cloudstack"]
---

# Domain & Credential Configuration

## Creating the parent domain in CloudStack

To work with CMP, you need one user with the **DomainAdmin** role in CloudStack.

1. Log in to CloudStack as administrator
2. Create a subdomain inside ROOT — for example, `CMP-PROD`
3. Inside this subdomain, create one **account** and one **user**
4. Generate API Key and Secret for that user
5. Use these credentials when configuring the Cloud Provider in CMP

## Domain hierarchy

```
ROOT
└── CMP-PROD  ← parent domain (configured in CMP)
    ├── CustomerABC Domain
    │   └── ABC Account → ABC User
    └── CustomerPQR Domain
        └── PQR Account → PQR User
```

## Why DomainAdmin and not ROOT?

A DomainAdmin role is sufficient for all current CMP operations. ROOT credentials are reserved for planned roadmap features. Using DomainAdmin follows the principle of least privilege.

## API Key generation steps

1. Go to CloudStack → Accounts → select the DomainAdmin account
2. Open the user → Generate Keys
3. Copy the API Key and Secret into the CMP Cloud Provider setup form

> **Security note:** Store these credentials securely. Rotate them if compromised and update the CMP Cloud Provider settings accordingly.