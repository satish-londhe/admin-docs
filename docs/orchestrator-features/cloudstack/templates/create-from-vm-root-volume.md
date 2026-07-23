---
sidebar_position: 2
title: "Create from VM root volume"
tags: ["orchestrator", "cloudstack", "features", "templates", "my-template", "autoscale"]
---

# Create template from VM root volume

Customers can create a **My Template** from an existing virtual machine’s **root volume**. This is the main way to build a **golden image** for [Autoscaling](/orchestrator-features/cloudstack/autoscaling/) and for repeatable app deployments.

:::important[Power off the VM first]

To create a template from the root volume, the VM must be **powered off**. Creating a template from a running root disk is not supported in this flow.

:::

**Customer path:** open the VM (**Virtual Machines → Instances** → select instance) → use the **Create Template** action on the VM overview → complete **Create New Template**.

Templates created with this form appear on **Virtual Machines → Templates**. See [Templates](/orchestrator-features/cloudstack/templates/).

---

## Steps

1. Prepare the VM (install apps, agents, startup scripts) and verify it boots correctly
2. **Power off** the VM
3. On the VM overview, click the **Create Template** action (template / package icon)
4. Complete the **Create New Template** form and click **Create Template**
5. Wait until the template shows as downloaded on **Virtual Machines → Templates**

img/screenshots/cmp-create-template-from-vm.png

![Screenshot: CMP — Create New Template from VM root volume](/img/screenshots/cmp-create-template-from-vm.png)

---

## Create New Template form

Configure the fields below in the order they appear on the form.

:::info

Templates created using this form will appear on the global templates page. See [Templates](/orchestrator-features/cloudstack/templates/).

:::

**Select Image**

*Required.* Select the root volume / disk image to register as a template — for example, **Other Ubuntu (64-bit)**.

**Template Name**

*Required.* Display name for the My Template — for example, `cmp-app-scale-template`.

Use a clear name when the template will be used for [Autoscaling](/orchestrator-features/cloudstack/autoscaling/).

**Description**

*Required.* Short description — for example, `cmp-app-scale-template`.

**Select OS**

*Required.* Operating system family — for example, **Ubuntu**.

**Select OS Version**

*Required.* OS version — for example, **24.04 LTS (Noble Numbat)**.

**Password Enabled**

*Optional.* When checked, the template is registered as password-enabled (CloudStack password / UserData behaviour applies at deploy time).

:::warning[L2 networks]

Password-enabled templates rely on UserData. **L2 networks** in CloudStack do not support UserData, so password-enabled templates cannot be deployed on L2. See [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates).

:::

**Price Summary**

*Read-only.* Shows the Custom Template package rate for storing this template — for example, **$3 / Hour / Per GB**.

Billing continues hourly while the template is retained. See [Custom Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template).

Click **Create Template** to register the My Template from the powered-off VM root volume.

---

## After creation

The new template appears under **Virtual Machines → Templates** with status such as **Downloaded** when ready.


![Screenshot: CMP — Templates list after create from VM](/img/screenshots/cmp-templates-list.png)

### Use on Create Instance — My Templates

Once the template is available (downloaded), it is shown on the **Create Instance** page under **Choose Image → My Templates**, so customers can provision a new VM from that golden image.

**Customer path:** **Virtual Machines → Instances → Create** (or **Create → Instance**) → select zone → **Choose Image → My Templates** → select the template → choose compute offering → **Review & Deploy**.


![Screenshot: CMP — Create Instance Choose Image with My Templates selected](/img/screenshots/cmp-create-instance-my-templates.png)

Also use this template when configuring [Autoscaling](/orchestrator-features/cloudstack/autoscaling/) (VM profile / golden image).

---

## Related

* [Templates](/orchestrator-features/cloudstack/templates/)
* [Autoscaling — CloudStack considerations](/orchestrator-features/cloudstack/autoscaling/cloudstack-considerations)
* [Create autoscaling at CMP](/orchestrator-features/cloudstack/autoscaling/create-at-cmp)
* [Custom Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [Templates (admin setup)](/orchestrators/cloudstack/templates/)
