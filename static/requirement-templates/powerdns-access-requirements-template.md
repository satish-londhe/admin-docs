# PowerDNS — Access & Integration Requirements Template

**Instructions:** Fill this template for **each PowerDNS** deployment used with CMP DNS-as-a-Service. Email with subject `PowerDNS Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/requirement-templates/cmp-platform-requirements-template.md).

**Reference doc:** PowerDNS Requirements · **PowerDNS 4.8.3+** · Standalone integration

:::note

Only the values in sections **C** and **D** below need to be shared with StackConsole. API setup and DNSSEC preparation are your responsibility — see the requirement page for verification steps.

:::

---

## A. PowerDNS environment

| Field | Your value |
|---|---|
| **PowerDNS version** | 4.8.3+ |
| **Authoritative DNS role** | Yes / No |

---

## B. Access for StackConsole team

| Option | Your value |
|---|---|
| **VPN / support access needed?** | Usually not — values below are sufficient |
| **Notes** | |

---

## C. DNS server details (share with StackConsole)

| Field | Your value |
|---|---|
| **API Endpoint (DNS Host)** | e.g. `https://dns.yourcompany.com/api` |
| **API Key** | |
| **Web Server Port** | e.g. `8081` |

---

## D. DNS name servers (share with StackConsole)

| NS hostname | Your value |
|---|---|
| **Primary NS** | e.g. `ns1.yourcompany.com` |
| **Secondary NS** | e.g. `ns2.yourcompany.com` |
| **Additional NS** | |

---

## E. Verification (your side — do not send unless asked)

| Check | Yes / No |
|---|---|
| PowerDNS API enabled in config | |
| API key tested with curl | |
| DNSSEC configured if required | |

---

## F. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
