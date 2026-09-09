---
sidebar_position: 1
title: "Security"
tags: ["platform", "security", "cmp"]
---

# Security & Fraud Prevention

StackConsole implements multiple layers of security and fraud prevention across the application, authentication, API, network, billing, and infrastructure layers.

These protections work alongside [Identity Providers](/platform-features#identity-providers) and [CAPTCHA](/platform-features/captcha/) to protect cloud provider infrastructure, customer workloads, and financial operations.

---

## 1. What security protocols are already in place on the site(s)?

StackConsole implements comprehensive security controls across presentation, authentication, application, API, network, and hosting infrastructure:

| Security Control | Implementation & Details | Relevant Documentation & Settings |
|---|---|---|
| **HTTPS / TLS Encryption** | All public access to the StackConsole portal is served over HTTPS through a provider-configured edge layer (reverse proxy like NGINX / aaPanel, or a load balancer with hardware firewall). TLS encryption is enforced at the edge/ingress using modern SSL/TLS certificates configured for the application domain. Unencrypted HTTP traffic is automatically redirected to HTTPS. | [Hosting Topology](/installation/hosting-topology#multi-server-deployment) |
| **Authentication & Authorization (RBAC)** | Strict Role-Based Access Control (RBAC) separates Super Admin, Admin, Customer, and Sub-user roles. Users can only perform operations and view resources explicitly permitted by their assigned roles and project permissions. | [Keycloak](/platform-features/identity-providers/keycloak) • [Zitadel](/platform-features/identity-providers/zitadel/) |
| **Two-Factor Authentication (2FA)** | Time-based One-Time Password (TOTP) two-factor authentication can be enforced platform-wide or activated individually per user account. Enforcing 2FA adds an essential second authentication factor that mitigates the risk of credential compromise. | Setting: `enforce_2fa_to_all`<br/>[Two-Factor Authentication](/platform-features/identity-providers/2fa) • [Auth & 2FA FAQ](/faq/platform/auth-2fa) |
| **API Token Security** | Global API token protection includes **idle expiration**, **controlled token renewal (sliding window)**, and **maximum session lifetime**. Stolen or abandoned tokens expire automatically, while active users remain seamlessly authenticated. | Settings: `token_default_expiry_minutes`, `token_sliding_renewal_threshold_minutes`, `token_max_lifetime_minutes`<br/>[Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration) |
| **Login Attempt Protection & Account Lockout** | Failed login attempts are tracked per account. When repeated unsuccessful authentication attempts reach the configured threshold, the account is temporarily blocked. Retrying during the block period does not extend the lockout timer, and a successful login resets the attempt counter. | Settings: `login_attempt_limit`, `login_block_duration`<br/>[User Enumeration Protection](/platform-features/security/user-enumeration#login-rate-limiting) |
| **Login Rate Limiting** | Authentication-related requests are throttled to defend against automated dictionary attacks, credential stuffing, and brute-force guessing. | [User Enumeration Protection](/platform-features/security/user-enumeration) |
| **User Enumeration Protection** | Login and password-recovery endpoints return generic responses (for example, "Invalid credentials" or generic confirmation messages) regardless of whether an email address or account exists in the database. Attackers cannot probe for registered user addresses. | [User Enumeration Protection](/platform-features/security/user-enumeration) |
| **Forgot Password Protection** | Password-reset requests are subject to strict rate limiting to prevent email flooding, abuse, and resource exhaustion attacks. | Settings: `rate_limit_to_send_link_otp`, `rate_limit_to_send_link_otp_block_minutes`<br/>[Forgot Password Rate Limiting](/platform-features/security/user-enumeration#forgot-password-rate-limiting) |
| **Secure Password Reset Links** | Password-reset links are cryptographically signed, expire automatically after **24 hours**, and are invalidated after a single use. Reset links cannot be reused. | [Reset Link Security](/platform-features/security/user-enumeration#reset-link-security) |
| **CAPTCHA / reCAPTCHA Protection** | Google reCAPTCHA (v2 / v3) can be enabled on sensitive entry points, including registration, login, and Forgot Password workflows, effectively blocking automated bot traffic and scripted attacks. | [CAPTCHA](/platform-features/captcha/) • [reCAPTCHA Protection](/platform-features/security/user-enumeration#recaptcha-protection-forgot-password-security-enhancement) |
| **API & Input Validation** | All incoming API requests undergo schema validation, payload sanitization, and strict authorization checks prior to hitting backend orchestrator adapters or database services. Common vectors such as SQL injection, XSS, and parameter tampering are blocked at the application layer. | [User Enumeration Protection](/platform-features/security/user-enumeration#security-inputs-handled) • [Architecture Overview](/overview/architecture-overview#architecture-principles) |
| **Application Rate Limiting** | Dedicated rate-limiting controls safeguard operational endpoints — such as support ticket creation and user feedback submissions — against automated spamming and denial-of-service attempts. | Settings: `ticket_rate_limit`, `feedback_rate_limit`<br/>[Tickets and Rate Limiting](/platform-features/security/tickets-rate-limiting) |
| **Email Verification** | Mandatory email verification via One-Time Password (OTP) or verification link validates ownership of customer email addresses upon account registration before platform access is granted. | [Enforce Mobile & Email Verification](/platform-features/global-settings/enforce-mobile-verification) |
| **KYC / Account Approval** | Identity verification (automated via DIGIO in supported regions, or manual document upload review) ensures that customer identities are vetted and approved prior to service provisioning. | [DIGIO KYC Requirements](/installation/orchestrator-requirements/digio) • [Client Registration](/orchestrators/cloudstack/client-registration) |
| **Audit & Activity Logging** | Administrative actions, user sessions, authentication events, and resource modifications are immutably logged with timestamps, IP addresses, and user identifiers, supporting forensic audits and compliance monitoring. | [Architecture Overview](/overview/architecture-overview#architecture-principles) |
| **Network & Firewall Controls** | Network-level firewalls and security groups isolate platform tiers. Management interfaces, databases, cache layers, and internal services are restricted to private subnets and never directly exposed to the public internet. | [Choosing a Hosting Topology](/installation/hosting-topology) |
| **Three-Server Deployment Architecture** | Production deployments typically follow a multi-tier split (Frontend, Backend API/Workers, Database/Cache) or multi-tier HA topology based on provider infrastructure. A provider-managed edge layer (such as a reverse proxy, aaPanel, edge CDN, or hardware firewall/load balancer) handles public ingress, while backend application and persistence tiers remain isolated in private segments. | [Multi-Server Deployment](/installation/hosting-topology#multi-server-deployment) • [HA Multi-Tier Deployment](/installation/hosting-topology#ha-multi-tier-deployment) |
| **Controlled Cloud Infrastructure Access** | StackConsole communicates with underlying hypervisors and orchestrators (CloudStack, OpenStack, VMware, Proxmox) exclusively through backend orchestrator adapters. End customers and portal clients never have direct network or API access to underlying hypervisor control planes. | [Architecture Principles](/overview/architecture-overview#architecture-principles) |

---

## 2. What fraud prevention techniques are implemented on your website?

StackConsole incorporates multi-layered fraud prevention mechanisms designed to block fraudulent signups, automated bot activity, payment abuse, unauthorized account access, and uncontrolled resource consumption:

### A. Authentication and Account Creation Abuse Prevention

* **Brute-Force & Credential Attack Defense:** Configurable failed-attempt thresholds (`login_attempt_limit`) and automatic cooldown lockouts (`login_block_duration`) stop automated credential stuffing. Retry attempts during a block do not extend the timer, and success resets the counter.
* **Account Enumeration Prevention:** Generic responses on login and password-recovery forms prevent malicious actors from harvesting valid customer lists or email addresses.
* **Single-Use, Time-Limited Password Resets:** Reset tokens expire in 24 hours, are single-use, and are throttled by `forgot_password_rate_limit` to prevent automated mailbox flooding.
* **CAPTCHA / Bot Filtering:** Optional Google reCAPTCHA on public forms (signup, login, forgot-password) filters out automated registration scripts and bot farms.
* **Mandatory Email & Mobile Verification:** Customers must prove ownership of their contact information before account activation, stopping burner email signups and spam registrations.
* **KYC & Administrator Approval Gates:** In high-risk environments, platforms can require KYC verification (automated identity lookup or manual document submission) or require manual administrator approval before a client can order infrastructure.

### B. API and Application Endpoint Safeguards

* **API Token Lifetime Enforcement:** Idle timeouts (`token_default_expiry_minutes`) and absolute maximum session limits (`token_max_lifetime_minutes`) ensure tokens abandoned by users or leaked via client machines become invalid quickly.
* **Endpoint Rate Limiting:** Non-financial endpoints susceptible to abuse — such as support ticket creation (`ticket_rate_limit`) and feedback submission (`feedback_rate_limit`) — prevent denial-of-service or script-driven flooding.
* **Role-Based Access Control (RBAC):** Restricts users strictly to authorized tenant workspaces and API actions, preventing horizontal or vertical privilege escalation.

### C. Resource and Billing Abuse Mitigation

* **Resource Quotas & Allocation Limits:** Providers set granular CPU, RAM, storage, network, and IP quotas per customer or project. Users cannot spin up excessive infrastructure without prior administrative limit increases, protecting against compute theft and cryptomining spikes.
* **Prepaid Balance Controls:** In prepaid billing mode, resources are provisioned strictly against available wallet balances. Automated hourly deductions ensure services freeze or suspend if the balance turns negative.
* **Postpaid Spending Thresholds:** Postpaid customers can be assigned an automated **spending threshold (cap)**. When usage reaches this threshold during the billing cycle:
  1. CMP **immediately generates an interim invoice** without waiting for the month end.
  2. An **automated payment charge** is initiated against the customer's saved credit card.
  3. The threshold counter resets to zero upon settlement, allowing continued service usage.
  This mechanism limits financial exposure and protects against runaway or fraudulent consumption.
* **Automated Account Restrictions for Overdue Invoices:** Configurable disciplinary policies automatically **freeze**, **suspend**, or **terminate** services when overdue invoices or negative balances exceed grace periods, preventing uncollectible debts.
* **Audit & Activity Tracking:** Every billing adjustment, service launch, and admin action leaves an audit trail, facilitating rapid detection and investigation of irregular or fraudulent patterns.

---

## Detailed Guides & Reference

| Guide | Description |
|---|---|
| [User Enumeration Protection](/platform-features/security/user-enumeration) | Configuration of login attempt limits, block duration, Forgot Password rate limits, and admin unblock workflows. |
| [Tickets and Rate Limiting](/platform-features/security/tickets-rate-limiting) | Configuration of `ticket_rate_limit` and `feedback_rate_limit` using fixed or rolling time windows. |
| [Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration) | Global API token lifecycle: idle expiry, sliding renewals, and maximum session lifetime. |
| [Two-Factor Authentication (2FA)](/platform-features/identity-providers/2fa) | Setting up TOTP two-factor authentication and enforcing it platform-wide. |
| [Postpaid Billing & Thresholds](/billing/payment-modes/postpaid#threshold-spending-cap) | Spending cap thresholds, auto-charge requirements, and overdue invoice handling. |
| [Disciplinary Actions](/billing/disciplinary-actions/) | Automated freeze, suspension, and termination workflows for unpaid accounts. |
| [Architecture Overview](/overview/architecture-overview) | Multi-layered platform architecture, API isolation, and orchestrator adapters. |
| [Choosing a Hosting Topology](/installation/hosting-topology) | Multi-server and HA 18-server production topologies, edge proxies, and network firewalls. |

