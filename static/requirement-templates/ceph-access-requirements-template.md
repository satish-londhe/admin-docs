# CEPH — Access & Integration Requirements Template

**Instructions:** Fill this template for **each CEPH** object storage deployment. Email with subject `CEPH Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/requirement-templates/cmp-platform-requirements-template.md).

**Reference doc:** CEPH Requirements · Standalone — not tied to compute orchestrator

---

## A. CEPH environment

| Field | Your value |
|---|---|
| **CEPH version** | |
| **Number of zones in CMP** | At least 1 |

---

## B. Access for StackConsole team (CEPH Dashboard)

| Option | Your value |
|---|---|
| **VPN provided to StackConsole?** | Yes / No |
| **OR jump server IP whitelisted?** | `14.192.19.227` — Yes / No |

---

## C. CEPH Dashboard credentials

| Field | Your value |
|---|---|
| **CEPH Dashboard URL** | e.g. `https://ceph.example.com:8443` |
| **Username** | Admin role minimum |
| **Password** | |

---

## D. S3 endpoint (public)

| Field | Your value |
|---|---|
| **Public S3 endpoint URL** | e.g. `https://s3.example.com` |
| **Publicly reachable from internet?** | Yes / No (required) |

---

## E. CMP VM → CEPH connectivity

| Field | Your value |
|---|---|
| **Dashboard API reachable from CMP VMs?** | Yes / No |
| **S3 endpoint tested from outside provider LAN?** | Yes / No |

---

## F. Setup checkpoints

| Check | Verified? |
|---|---|
| RGW / buckets operational | |
| Test bucket create/delete | |

---

## G. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
