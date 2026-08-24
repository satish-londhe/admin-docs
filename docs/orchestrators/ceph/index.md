---
sidebar_position: 1
title: "CEPH (Object Storage)"
tags: ["orchestrator", "ceph", "object-storage", "s3"]
---

# CEPH (Object Storage)

This section covers integrating CMP with **CEPH** as a **standalone S3-compatible object storage** provider.

:::warning[Standalone object storage]

CEPH is independent of compute orchestrators (CloudStack, VMware, and others). You can run it alongside any compute setup so customers can provision buckets, credentials, and object storage plans through CMP.

:::

:::info[Prerequisites]

Complete [CEPH Requirements](/installation/orchestrator-requirements/ceph) before connecting CEPH in CMP — Dashboard API access, public S3 endpoint, and at least one CEPH zone.

:::

## Pages in this section

| Page | Description |
|---|---|
| [Connecting CMP to CEPH](/orchestrators/ceph/connecting) | Admin setup: Cloud Services, Cloud Provider wizard (credentials, S3 endpoints, zone, storage settings), rate cards |
| [Object Storage Packages](/orchestrators/ceph/packages) | Rate card packages: storage quota, bucket limit, zone, storage category, and pricing |

## After setup

| Topic | Link |
|---|---|
| Customer object storage, buckets, and S3 credentials | [CEPH Features](/orchestrator-features/ceph/) |
| Installation requirements checklist | [CEPH Requirements](/installation/orchestrator-requirements/ceph) |

## Related

* [Supported Orchestrators](/overview/supported-orchestrators)
* [Orchestrator Features — CEPH](/orchestrator-features/ceph/)
