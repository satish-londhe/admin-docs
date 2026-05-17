---
sidebar_position: 6
title: "Load Balancer, VPC & Bandwidth Packages"
tags: ["packages"]
---

# Load Balancer, VPC & Bandwidth Packages

## Load Balancer packages

In CloudStack, load balancers operate at the **network/IP layer**. CMP supports one load balancer package per setup.

**Path:** Admin Panel → Packages → Load Balancer → Add Package

* Create the corresponding network offering in CloudStack first
* Map it to one CMP LB package per cloud provider + zone combination
* Billing: hourly or monthly depending on your configuration

## VPC / Virtual Router packages

Virtual Router (VPC) packages map to CloudStack VPC offerings, which define the virtual router VM size and network throughput.

**Path:** Admin Panel → Packages → VPC / Virtual Router → Add Package

* Create multiple VPC offerings in CloudStack based on virtual router VM configuration (small/medium/large VR) and network speed
* Each offering can map to a separately priced CMP VPC package
* This allows tiered pricing (e.g. Basic VPC vs High-Performance VPC)

## Kubernetes (K8s) packages

**Path:** Admin Panel → Packages → Kubernetes → Add Package

* Define managed cluster configurations (node size, count ranges)
* Map to the orchestrator's K8s cluster template
* Kubernetes services can use hourly billing but **cannot have hourly billing disabled** without impact analysis — see [Billing Models Overview](/billing/overview)

## Bandwidth packages

Bandwidth is a **usage-based service** — no fixed package is provisioned. CMP charges based on actual network traffic data from the orchestrator.

### How it works (CloudStack)

* CloudStack tracks incoming and outgoing traffic at the network level via the usage service
* CMP reads this usage data and applies the bandwidth unit price
* Reference: https://www.shapeblue.com/cloudstack-usage-service-deep-dive/

### Configuration

**Path:** Admin Panel → Packages → Unit Pricing → Bandwidth

| Setting | Description |
| --- | --- |
| **Price per GB / month** | Unit price charged for each GB beyond the free threshold |
| **Free bandwidth (GB/month)** | Set in Cloud Provider setup; usage below this is not charged |

### Free bandwidth threshold

The free bandwidth allowance resets to zero at the start of each month. Usage is tracked cumulatively during the month, and only GB consumed above the threshold are billed.

**Example:**

* Free bandwidth: 1,000 GB/month
* Customer uses 1,200 GB → 200 GB is billed at the bandwidth unit rate

## Related

* [How Packages Work in CMP](/packages/overview)
* [Custom Packages & Unit Pricing](/packages/custom-packages)
* [Pricing Formulas](/packages/pricing-formulas)
* [Billing Models Overview](/billing/overview)
