---
sidebar_position: 4
title: "Quota Requests & Approvals"
tags: ["quota"]
---

# Quota Requests & Approvals

When a customer reaches their allocated quota limit, they can submit a **Quota Increase Request** through the customer portal. The admin reviews and approves or rejects the request.

## Customer flow

```
Customer reaches quota limit
        ↓
Customer submits Quota Request from portal
        ↓
Admin receives notification
        ↓
Admin reviews → Approve or Reject
        ↓
If approved: Account quota is updated immediately
        ↓
Customer can now provision additional resources
```

## Admin: reviewing quota requests

**Path:** Admin Panel → Quota Requests

The Quota Requests section lists all pending requests with:

* Customer name and account
* Requested resource type and amount
* Current quota vs requested quota
* Date submitted

### Approving a request

1. Open the request
2. Review the customer's current usage and existing quota
3. Set the new approved quota value
4. Click **Approve** — the account quota is updated immediately and the customer is notified

### Rejecting a request

1. Open the request
2. Optionally add a rejection reason
3. Click **Reject** — the customer is notified and their quota remains unchanged

## Customer: submitting a quota request

**Path:** Customer Portal → Account → Quota → Request Increase

Customers fill in:

* Resource type (vCPU, RAM, storage, etc.)
* Requested new limit
* Reason for the request (optional)

## Best practices for admins

* Review requests promptly to avoid blocking customer workflows
* Check the customer's current usage before approving — avoid allocating far more than needed
* After approving, also update the orchestrator-side limits if applicable — see [Orchestrator-Side Quota Sync](/quota/orchestrator-sync)

## Related

* [Global Resource Quotas](/quota/global-quotas)
* [Account-Level Quotas](/quota/account-quotas)
* [Orchestrator-Side Quota Sync](/quota/orchestrator-sync)
