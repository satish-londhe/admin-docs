---
sidebar_position: 2
title: "Preparing CMP-compatible images"
tags: ["orchestrator", "openstack", "images", "glance", "cloud-init"]
---

# Preparing CMP-compatible images

Requirements for Glance images so CMP can provision VMs reliably (login, networking, disk resize, metadata).

:::danger[Documentation in progress]

This page is a **stub**. Document guest agents, cloud-init / config-drive, SSH keys vs password, Virtuozzo differences, and minimum disk size rules.

:::

## Topics to cover

* Supported OS families  
* cloud-init / metadata service  
* SSH and password injection  
* Root disk / flavor disk sizing  
* Image visibility (public / shared / community)  
* Test boot checklist from Horizon before CMP sync

## Related

* [Configuring images in CMP](/orchestrators/openstack/images/configuring-images-at-cmp)
* [OpenStack Requirements](/installation/orchestrator-requirements/openstack)
* [Preparing CMP-compatible templates (CloudStack)](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates) — reference
