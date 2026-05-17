---
sidebar_position: 6
title: "Console Proxy Setup"
tags: ["orchestrator", "cloudstack"]
---

# Console Proxy Setup

To make VM consoles accessible to end customers publicly, you must configure the CloudStack Console Proxy SSL certificate and domain.

## Official reference

Follow the CloudStack documentation for Console Proxy SSL configuration: https://docs.cloudstack.apache.org/en/4.14.1.0/adminguide/systemvm.html#changing-the-console-proxy-ssl-certificate-and-domain

## Steps overview

1. Obtain an SSL certificate for your console proxy domain
2. Configure the certificate in CloudStack global settings
3. Ensure the console proxy domain is publicly resolvable
4. Test VM console access from a customer account

## Notes

* The console proxy domain must be reachable from the public internet for end customers to access VM consoles
* Without this setup, VM console access is only available within the CloudStack management network