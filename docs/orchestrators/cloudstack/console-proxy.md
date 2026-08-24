---
sidebar_position: 6
title: "Console Proxy Setup"
tags: ["orchestrator", "cloudstack", "console", "system-vm"]
---

# Console Proxy Setup

VM console access in CMP depends entirely on **CloudStack's Console Proxy** — a dedicated **System VM** (Console Proxy VM, or CPVM) that is separate from the virtual router and other system VMs. CMP does not host or proxy console traffic itself. When a customer opens a VM console in the CMP portal, CMP requests a console endpoint from CloudStack and **redirects the customer to the CloudStack console proxy URL**.

:::warning[Provider responsibility]

The console proxy URL must be **publicly reachable** from customer browsers over the internet. If DNS, SSL, or public IP routing for the console proxy domain is not configured correctly, VM console access will fail in CMP even though the VM is running.

:::

## How CloudStack Console Proxy works

CloudStack deploys one or more **Console Proxy System VMs** per zone. Each CPVM receives a **public IP address**. When a user opens a console:

1. CloudStack calls the `createConsoleEndpoint` API for the target VM
2. The API returns a console URL pointing at the CPVM's public address
3. The browser connects to the CPVM (noVNC by default since CloudStack 4.15)
4. The CPVM proxies the session to the VNC port on the hypervisor host running the guest VM

```
Customer browser  →  Console Proxy VM (public IP)  →  Hypervisor VNC port  →  Guest VM
```

| Component | Role |
|---|---|
| **Console Proxy VM (CPVM)** | Dedicated system VM — not the virtual router — that terminates the browser session and proxies to VNC |
| **Public IP** | One public IP is allocated per console proxy VM; the console viewer connects to this address |
| **`createConsoleEndpoint` API** | Generates the console URL used by CloudStack UI and CMP |
| **noVNC** | Default web-based console viewer (`novnc.console.default = true`) |

Traffic never goes to the guest VM's virtual IP, and VNC does not need to be enabled inside the guest OS.

:::info[Official reference]

For full CloudStack Console Proxy architecture, SSL configuration, and DNS requirements, see the [CloudStack System VM — Console Proxy](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/systemvm.html#console-proxy) documentation.

:::

## CMP behaviour

CMP does **not** run its own console proxy or embed the VNC viewer. When a customer clicks **Console** on a VM in the CMP portal:

1. CMP calls CloudStack to obtain a console endpoint for that VM
2. CMP **redirects the customer** to the URL returned by CloudStack — the console proxy URL
3. The customer completes the console session directly against the CloudStack CPVM

There is no additional console proxy configuration inside CMP. All prerequisites — CPVM deployment, public IP, DNS, and SSL — must be completed on the **CloudStack side** before console access works for CMP customers.

## Provider setup checklist

Complete these steps on your CloudStack environment so CMP customers can open VM consoles.

### 1. Verify Console Proxy VMs are running

In the CloudStack UI, go to **Infrastructure → System VMs** and confirm **Console Proxy** VMs are in **Running** state for each zone where CMP customers provision VMs.

CloudStack creates and scales CPVMs automatically. If no CPVM is running in a zone, console access will not work.

### 2. Allocate public IPs for Console Proxy VMs

Each console proxy VM requires a **public IP address** reachable from the internet. Confirm CPVMs in customer-facing zones have public IPs assigned and that firewall rules allow inbound traffic on the console proxy ports (8443 for SSL, 8080 if SSL is not enabled).

### 3. Configure DNS for the console proxy domain

CloudStack generates console URLs in the form:

```
aaa-bbb-ccc-ddd.console.yourcompany.com
```

Your DNS must resolve these hostnames to the corresponding public IPv4 address (`aaa.bbb.ccc.ddd`). Options:

* **Wildcard DNS** — `*.console.yourcompany.com` → your console proxy public IP range (recommended)
* **Per-IP records** — populate each public IP as `aaa-bbb-ccc-ddd.console.yourcompany.com`

Use a **dedicated subdomain** (for example `console.yourcompany.com`) rather than your main portal domain. See also [Console Proxy domain (DNS)](/installation/orchestrator-requirements/cloudstack#7-console-proxy-domain-dns).

### 4. Configure SSL on the Console Proxy

Production environments must use SSL for console proxy traffic. In CloudStack:

1. Obtain a **wildcard SSL certificate** for `*.console.yourcompany.com`
2. Upload the certificate and private key in the CloudStack UI (**Update SSL Certificate**)
3. Set the console proxy domain global setting (`consoleproxy.url.domain`)
4. Ensure `consoleproxy.sslEnabled` is `true` and a `CPVMCertificate` record exists in the CloudStack keystore

CloudStack restarts all running CPVMs when the certificate is updated. Customers may see a brief console interruption during this change.

For step-by-step instructions, see [Changing the Console Proxy SSL Certificate and Domains](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/systemvm.html#changing-the-console-proxy-ssl-certificate-and-domains) in the CloudStack documentation.

:::tip[Separate from CMP portal SSL]

The console proxy SSL certificate is configured **in CloudStack**, not in CMP. It is independent of the CMP portal certificate (provided during installation — see [SSL / TLS Certificates](/installation/prerequisites#ssl--tls-certificates)).

:::

### 5. Test console access end-to-end

Before enabling console access for customers:

1. Open a VM console from the **CloudStack UI** using a non-admin test account — confirm the noVNC viewer loads over HTTPS
2. Open the same VM console from the **CMP customer portal** — confirm CMP redirects to the same console proxy URL and the session connects
3. Test from an external network (not the management LAN) to verify public reachability

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Console button in CMP opens a blank page or times out | Console proxy URL not publicly reachable — check DNS and firewall |
| SSL certificate warning in browser | Console proxy SSL not configured, or certificate does not match the `*.console.yourcompany.com` wildcard |
| Console works in CloudStack UI but not in CMP | CMP CloudStack API connectivity issue, or customer account lacks console permission — verify [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) |
| Console works briefly then disconnects | CPVM was restarted by an administrator — CloudStack restarts CPVMs when SSL settings change |
| No console proxy VMs in zone | Zone deployment incomplete — check **Infrastructure → System VMs** in CloudStack |

:::warning[Restarting Console Proxy VMs]

Administrators can restart CPVMs from the CloudStack UI, but this **interrupts all active console sessions** for users in that zone.

:::

## Related

* [CloudStack Requirements — Console Proxy domain](/installation/orchestrator-requirements/cloudstack#7-console-proxy-domain-dns)
* [SSL / TLS Certificates](/installation/prerequisites#ssl--tls-certificates) — CMP portal certificates
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [CloudStack System VM — Console Proxy](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/systemvm.html#console-proxy)
