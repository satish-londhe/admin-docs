# CMP Platform Requirements — Fillable Template

**Instructions:** Fill this template **once** per CMP deployment. Email the completed file to StackConsole with subject `CMP Platform Requirements — <Your Company>`.

**Do not repeat this file for each orchestrator.** For CloudStack, Proxmox, VMware, and other integrations, use the separate orchestrator access templates.

**Reference docs:** Prerequisites & System Requirements · Hosting Topology

---

## A. Customer / project details

| Field | Your value |
|---|---|
| **Company name** | |
| **Primary contact name** | |
| **Primary contact email** | |
| **Expected go-live date** | |
| **Environment** | Staging / Production / Both |

---

## B. Deployment model

| Field | Your value |
|---|---|
| **Topology** | Single VM (staging/POC) / Three VMs (production) |
| **Notes** | |

---

## C. CMP VM — Staging / POC (if applicable)

| Field | Your value |
|---|---|
| **OS** | Ubuntu 24.04 LTS (required) |
| **Public IP** | |
| **Private IP** | |
| **CPU (cores)** | 16 (minimum) |
| **RAM (GB)** | 32 (minimum) |
| **Storage (GB SSD)** | 200 (minimum) |
| **SSH username** | |
| **SSH password / key delivery method** | |
| **Open ports** | 22, 80, 443, 8081 |

---

## D. CMP VM — Production (if applicable)

### Frontend VM

| Field | Your value |
|---|---|
| **Public IP** | |
| **Private IP** | |
| **CPU / RAM / Storage** | 8 cores / 16 GB / 100 GB SSD |
| **SSH access** | |

### Backend VM

| Field | Your value |
|---|---|
| **Public IP** | |
| **Private IP** | |
| **CPU / RAM / Storage** | 8 cores / 16 GB / 100 GB SSD |
| **SSH access** | |

### Database VM

| Field | Your value |
|---|---|
| **Public IP** | |
| **Private IP** | |
| **CPU / RAM / Storage** | 8 cores / 16 GB / 200 GB SSD |
| **SSH access** | |
| **PostgreSQL port 5432** | Private IP only — not public |

### Inter-VM connectivity verified?

| Check | Yes / No |
|---|---|
| Frontend → Backend (port 80) | |
| Backend → Database (port 5432) | |
| Frontend can reach backend API URL (`curl`) | |

---

## E. Domain names / URLs

### Staging (single URL)

| Field | Your value |
|---|---|
| **Staging portal URL** | e.g. `https://staging.yourcompany.com` |
| **DNS propagated?** | Yes / No |

### Production (portal + API)

| Field | Your value |
|---|---|
| **Frontend (portal) URL** | e.g. `https://portal.yourcompany.com` |
| **Backend (API) URL** | e.g. `https://api.yourcompany.com` |
| **Same public IP for both?** | Yes / No |
| **DNS propagated?** | Yes / No |

---

## F. SSL / TLS certificates

| Field | Your value |
|---|---|
| **How certificates are provided** | Uploaded to `/home/ssl/` on VMs / Emailed separately / Other |
| **Staging certificate** | fullchain.pem + privkey.pem attached? Yes / No / N/A |
| **Production certificate** | fullchain.pem + privkey.pem attached? Yes / No / N/A |
| **Full chain includes intermediates?** | Yes / No |

---

## G. SMTP / email configuration

| Variable | Your value |
|---|---|
| `MAIL_HOST` | |
| `MAIL_PORT` | e.g. 587 |
| `MAIL_USERNAME` | |
| `MAIL_PASSWORD` | |
| `MAIL_ENCRYPTION` | e.g. tls |
| `MAIL_FROM_ADDRESS` | |
| `MAIL_FROM_NAME` | |

---

## H. App logos (if branding required)

| Field | Your value |
|---|---|
| **Light theme logo** | Attached / URL / Not yet |
| **Dark theme logo** | Attached / URL / Not yet |
| **Dimensions** | 160 × 40 px recommended |
| **Formats** | PNG (email/PDF) + SVG (portal) |

---

## I. StackConsole access to CMP VMs

Choose **one**:

### Option A — VPN (preferred)

| Name | Email | VPN provided? |
|---|---|---|
| Satish Londhe | satish.londhe@stackconsole.io | |
| Ganesh Kanade | ganesh.kanade@stackconsole.io | |
| Saurabh Rapatwar | saurabh.rapatwar@stackconsole.io | |

### Option B — IP whitelist

| Field | Your value |
|---|---|
| **Whitelist StackConsole jump server** | `14.192.19.227` |
| **SSH port 22 open to jump server on all CMP VMs?** | Yes / No |

---

## J. Orchestrators / integrations (check all that apply)

Complete the **separate access template** for each checked item:

- [ ] Apache CloudStack — CloudStack access template
- [ ] VMware vSphere — VMware access template
- [ ] OpenStack — OpenStack access template
- [ ] Proxmox VE — Proxmox access template
- [ ] CEPH Object Storage — CEPH access template
- [ ] Veeam VSPC — Veeam access template
- [ ] PowerDNS — PowerDNS access template
- [ ] Keycloak SSO — Keycloak access template
- [ ] DIGIO KYC (India) — DIGIO access template

---

## K. Additional notes

| Notes |
|---|
| |

---

**Submit to:** satish.londhe@stackconsole.io

**Attach:** SSL files (if not on VMs), logo files, and each completed orchestrator access template.
