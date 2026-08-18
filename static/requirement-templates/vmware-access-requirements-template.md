# VMware vSphere — Access & Integration Requirements Template

**Instructions:** Fill this template for **each vCenter** you connect to CMP. Email with subject `VMware Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/requirement-templates/cmp-platform-requirements-template.md).

**Reference doc:** VMware vSphere Requirements · **vSphere 8.0.1.0+ required**

---

## A. VMware environment

| Field | Your value |
|---|---|
| **vCenter version** | Must be 8.0.1.0+ |
| **ESXi version(s)** | |
| **Datacenter name** | |

---

## B. Access for StackConsole team (vCenter UI)

| Option | Your value |
|---|---|
| **VPN provided to StackConsole?** | Yes / No |
| **OR jump server IP whitelisted?** | `14.192.19.227` — Yes / No |

### vCenter credentials (assessment — read-only OK)

| Field | Your value |
|---|---|
| **vCenter URL** | |
| **Username** | |
| **Password** | |

---

## C. CMP VM → vCenter connectivity

| Field | Your value |
|---|---|
| **vCenter API (TCP 443) reachable from CMP VMs?** | Yes / No |
| **Private or public access?** | |

---

## D. vCenter structure (required before CMP setup)

| Item | Your value |
|---|---|
| **CMP root folder name** | e.g. `CMP-ROOT-FOLDER` |
| **Host cluster name(s)** | |
| **DRS enabled on clusters used by CMP?** | Yes / No |
| **Datastore cluster / pod name** | |

---

## E. API user for CMP (production integration)

| Field | Your value |
|---|---|
| **Service account username** | |
| **Custom role name** | |
| **Permissions scope** | Datacenter / folder / cluster |

---

## F. VM console access

| Field | Your value |
|---|---|
| **ESXi console ports open** | 902, 903 (and related) — Yes / No |
| **Console proxy / firewall notes** | |

---

## G. Templates and features

| Check | Yes / No / Planned |
|---|---|
| At least one VM template for CMP | |
| Features: VM create, snapshot, console | |

---

## H. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
