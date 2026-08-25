---
sidebar_position: 1
title: "Impossible Cloud (Object Storage)"
tags: ["orchestrator", "impossible-cloud", "object-storage", "s3"]
---

# Impossible Cloud (Object Storage)

This section covers integrating CMP with **Impossible Cloud** as a **standalone S3-compatible object storage** provider.

:::warning[Standalone object storage]

Impossible Cloud is independent of compute orchestrators (CloudStack, VMware, and others). You can run it alongside any compute setup so customers can provision object storage, buckets, and S3 credentials through CMP.

:::

:::info[Prerequisites]

Complete [Impossible Cloud Requirements](/installation/orchestrator-requirements/impossible-cloud) before connecting in CMP — Partner API key (Bearer token), Beta and V1 API endpoints, S3 region mapping, and at least one zone.

:::

## When to use Impossible Cloud vs CEPH

Impossible Cloud offers fewer CMP features than CEPH but **much lower operational overhead** — no cluster to deploy or run. See [Why use Impossible Cloud despite fewer features?](/orchestrator-features/impossible-cloud/#why-use-impossible-cloud-despite-fewer-features) for a full comparison.

## Pages in this section

| Page | Description |
|---|---|
| [Connecting CMP to Impossible Cloud](/orchestrators/impossible-cloud/connecting) | Admin setup: Cloud Provider wizard (credentials, ICMC endpoint, zone, storage settings), rate cards |
| [Object Storage Packages](/orchestrators/impossible-cloud/packages) | Rate card packages: storage quota, zone, storage category, and pricing |

## After setup

| Topic | Link |
|---|---|
| Customer object storage, buckets, retention, and S3 credentials | [Impossible Cloud Features](/orchestrator-features/impossible-cloud/) |
| Installation requirements and limitations | [Impossible Cloud Requirements](/installation/orchestrator-requirements/impossible-cloud) |

## Related

* [Supported Orchestrators](/overview/supported-orchestrators)
* [Orchestrator Features — Impossible Cloud](/orchestrator-features/impossible-cloud/)
* [CEPH Setup](/orchestrators/ceph/) — alternative object storage provider
