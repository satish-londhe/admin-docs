---
sidebar_position: 3
title: "Environment variables"
tags: ["platform", "marketplace", "userdata", "startup-script"]
---

# Environment variables

During Marketplace App deployment, some application settings must be configured **dynamically** — for example username, password, database name, or site URL for a WordPress or PostgreSQL image.

## Role in Marketplace Apps

Admins define **environment variables** on the Marketplace App in CMP. Each variable is a placeholder for a value the **end user** enters at deployment.

1. Admin defines variables (name, type, required) under **Apps Marketplace → Environment Variables**.
2. Admin writes a **startup script** on the linked template that reads those placeholders and applies them inside the guest (configure the app, create DB users, and so on).
3. On Create Instance, CMP **renders input fields** for those variables.
4. At deploy time, CMP replaces placeholders with the user’s values and sends the combined UserData / startup script to CloudStack.

:::important[Admin responsibility]

It is the **admin’s** responsibility to:

* Prepare the image with the application installed
* Define the correct environment variables
* Write a startup script that safely consumes those values
* Keep script size within CloudStack and CMP limits — see [Startup script size](/platform-features/marketplace-apps/startup-script-limits)

:::

## Example

For a PostgreSQL Marketplace App, variables might include:

| Name | Type | Purpose |
|---|---|---|
| Database Name | `text` | Initial database name |
| Psql Username | `text` | DB user |
| PSQL Password | `password` | DB password |
| URL / URI | `url` | Connection or app URL the user must save |

The customer fills these on Create Instance; the startup script applies them inside the VM.

See the admin and customer screens on [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp#3-define-environment-variables).

## Using variables in the startup script

On the linked template (**Settings → Orchestrator → Templates**), open **Start up Script**. CMP lists **Placeholder** buttons for the Marketplace App’s environment variables (for example `PORT`, `HOST`, `ODOO_RC`). Click a placeholder to insert it into the script.

In the script, use the placeholder form such as `{{port}}`. At deploy time CMP substitutes the value the customer entered for that variable.

![Screenshot: Template Start up Script with Placeholder buttons and port variable in script](/img/screenshots/cmp-template-startup-script-placeholders.png)

Example pattern:

```bash
#!/bin/bash
# allow the port
ufw allow {{port}}
```

## Related

* [Configure in CMP](/platform-features/marketplace-apps/configure-in-cmp)
* [Automation limitations — deployment parameters](/platform-features/marketplace-apps/automation-limitations#1-deployment-parameters-marketplace-configuration-parameters)
* [Configuring Templates in CMP — Startup script](/orchestrators/cloudstack/templates/configuring-templates-at-cmp#startup-script-cloudstack-only)
