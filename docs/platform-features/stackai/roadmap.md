---
sidebar_position: 4
title: "StackAI Roadmap"
tags: ["platform", "stackai", "beta", "roadmap", "customer-portal", "ai"]
---

# StackAI Roadmap

What's live today, what we're building now, and what's planned next.

:::info[Living document]

This page is a companion to the [StackAI User Guide](/platform-features/stackai/user-guide). It is updated as features ship or priorities change.

:::

---

## How to read this page

| Status | Meaning |
|---|---|
| **Available now** | Live in your console today. |
| **In progress** | Actively being built or polished; may appear in staging before production. |
| **Planned** | On the roadmap with a defined direction; timing may shift. |
| **Under exploration** | We are evaluating design and feasibility; not committed to a date. |

---

## Available now

StackAI is an operational assistant inside the cloud console. You describe work in plain language; StackAI plans steps, asks for missing details, shows a preview for risky actions, and executes against your account.

### Core experience

| Feature | What you get |
|---|---|
| **Natural-language chat** | Ask for work in everyday English — no API or menu expertise required. |
| **Streaming replies** | Answers stream in as StackAI works (including short “thinking” previews when planning). |
| **Confirmation before changes** | Creates, deletes, and other risky actions show a summary first; nothing runs until you approve. |
| **Chat history** | Reopen past conversations from the sidebar. |
| **Saved prompts** | Save phrases you use often and run them with one click. |
| **StackAI projects** | Group chats and suggested prompts around a task or team workstream. |
| **Resource cards & deep links** | List/create results include cards that link back into the main console. |

### Cloud operations (by area)

| Area | Examples of what you can ask |
|---|---|
| **Virtual machines** | List, create, start/stop/reboot/reset, delete, resize, reinstall OS, change hostname, attach network, power schedules |
| **Block storage** | List volumes, create, attach/detach, grow disk, delete |
| **Object storage & buckets** | Create stores, list buckets, create/share/delete buckets, public/private access |
| **Snapshots & backups** | Manual VM/volume snapshots, on-demand backups, backup & snapshot schedules, archives |
| **Networking** | Isolated networks, public IPs, inbound firewall, outbound egress, port forwarding |
| **VPCs** | Create/list/delete VPCs and subnets, ACL lists and rules |
| **Billing** | Balance, summary, usage, costs, credit limit, invoices, active/inactive services |
| **Projects & regions** | List/create cloud projects, show regions |

For step-by-step usage, see the [User Guide](/platform-features/stackai/user-guide).

---

## In progress

Work actively underway. Items may land in stages.

### Console experience

| Feature | Description | Target |
|---|---|---|
| **Floating chat widget** | Open StackAI from a launcher on any console page (popup panel), not only the full StackAI tab. | Near term |

---

## Planned

Committed direction; order and dates may change.

### Near term (next releases)

| Feature | Description |
|---|---|
| **Richer streaming UI** | Clearer status while tools run (step labels, progress for multi-step plans). |
| **Expanded saved prompts** | Team-shared prompt libraries and better organization (folders/tags). |
| **More billing insights** | Additional “ask in English” views for usage anomalies and cost breakdowns where the platform exposes data. |

### Medium term

| Feature | Description |
|---|---|
| **Problem-solver mode** | Move from “do what I ask” to “fix this problem” — e.g. “my VM is unreachable”, “backups failed last night”. StackAI would gather evidence, suggest a plan, and act within your approval policy. |
| **Read-only diagnostics** | CPU, disk, reachability checks, and recent change history before suggesting fixes (foundation for problem-solver mode). |
| **Guided remediation** | Multi-step fix plans with rollback and verification (“did the issue go away?”). |
| **Autonomy levels** | Tenant-controlled rules for what StackAI may do automatically vs. what always needs confirmation. |

### Platform coverage

StackAI will add matching chat capabilities as the underlying cloud platform exposes them:

| Capability | Status |
|---|---|
| **Kubernetes clusters** | Planned — use console menus until supported in StackAI |
| **Managed databases (DBaaS)** | Planned |
| **Load balancers** | Planned |
| **Remote-access VPN / VPN users** | Planned |
| **Hybrid / external cloud connections** (AWS, Azure, GCP, etc.) | Under exploration |

Until then, those products remain available in the main console where your provider offers them.

### Operations & scale (mostly behind the scenes)

| Feature | Description |
|---|---|
| **Per-tenant tool controls** | Enable or disable specific StackAI capabilities per customer where needed. |
| **Tool health & analytics** | Usage and reliability dashboards for administrators. |

---

## Under exploration

Ideas we are researching; not yet scheduled.

| Theme | Why it matters |
|---|---|
| **Cost optimization assistant** | Proactive suggestions to reduce spend without breaking production workloads. |
| **Security posture reviews** | Highlight risky firewall rules, public exposure, and ACL gaps. |
| **Incident memory** | Learn from past fixes so similar issues resolve faster next time. |
| **Async long-running jobs** | Background remediation with notifications when work takes many minutes. |
| **Voice / mobile app** | Hands-free or on-the-go operations for NOC-style workflows. |

---

## What we are not building (for now)

To set expectations:

- **Replacing the full console** — StackAI complements dashboards and detail pages; it does not duplicate every screen.
- **Unsupervised destructive automation** — High-risk deletes and production changes stay behind explicit confirmation (and future policy gates).
- **Generic third-party SRE** — Scope stays on resources and workloads your Stack Console tenant manages.
- **Inventing capabilities** — If StackAI cannot map your request to a supported action, it says so rather than guessing.

---

## How we prioritize

1. **Safety & clarity** — Confirmations, permissions, and honest limits come first.
2. **Daily operations** — VM, network, storage, and billing tasks customers run every week.
3. **Wizard quality** — Fewer loops and clearer questions on multi-step creates.
4. **Reach** — Widget/embed so StackAI is available where you already work.
5. **Autonomous problem-solving** — Diagnostics and remediation after the operational assistant is dependable.

---

## Feedback

If a capability you need is missing or stuck in a confusing loop:

1. Note the exact phrase you used and what StackAI replied.
2. Say whether you were in **field collection** or **confirmation** (see the User Guide — [Confirmation and safety](/platform-features/stackai/user-guide#9-confirmation-and-safety)).
3. Share with your account team or support channel so we can tune prompts, tools, or roadmap order.

---

## Related documents

| Document | Audience |
|---|---|
| [Production Requirements](/platform-features/stackai/production-requirements) | Admins — OpenAI billing and API key for production |
| [StackAI User Guide](/platform-features/stackai/user-guide) | End users — how to use StackAI today |
| [StackAI overview](/platform-features/stackai/) | What StackAI is and where customers open it |
| [Customer Dashboard](/platform-features/customer-dashboard/) | Console home vs StackAI workspace |

---

*Last updated: August 2026*
