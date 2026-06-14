---
sidebar_position: 2
title: "Preparing CMP-Compatible Templates"
tags: ["cloudstack", "templates", "orchestrator"]
---

# Preparing CMP-Compatible Templates

Before a template can be used for virtual machine provisioning through StackConsole CMP, it must be prepared and registered correctly at the CloudStack level. This page describes the recommended template requirements and best practices for Apache CloudStack.

These recommendations ensure that VM password management, SSH key injection, root disk scaling, startup scripts, and other CMP features work correctly.

For detailed template creation procedures, refer to the [Apache CloudStack Template Guide](https://docs.cloudstack.apache.org/en/4.11.2.0/adminguide/templates.html).

:::info[CloudStack visibility]

Templates at the CloudStack level must be marked **Public** and **Featured**. Only templates with both flags set are available when templates are configured in CMP.

:::

## Template requirements

A template intended for use with CMP should satisfy the following requirements.

| Requirement | Required | Description |
|---|---|---|
| Password enabled | Yes | Required for CloudStack password management via UserData. |
| SSH enabled | Yes | Required for SSH key injection and secure access. |
| Startup script enabled | Yes | Required for UserData and initialization scripts at first boot. |
| Scalable root disk | Yes | Allows the root disk to match the customer-selected package size. |
| Public & Featured | Yes | Required before the template can be configured in CMP. |

## Enable password support

Templates (or ISOs) used for VM provisioning must be registered as **Password Enabled** in CloudStack.

When the template is password-enabled:

* CloudStack automatically generates the VM password during deployment
* CMP does **not** send a password through the `deployVirtualMachine` API — the CloudStack API does not accept a password parameter
* The generated password is returned by CloudStack in the deployment response (`password` and `passwordenabled`)
* CMP stores the password against the VM record and displays it in the user interface

Password must meet CloudStack validation rules (minimum 8 characters where applicable).

Reference: [CloudStack password-enabled templates](https://docs.cloudstack.apache.org/en/4.11.2.0/adminguide/templates/_password.html)

:::tip[Always enable password support]

Use password-enabled templates if you want CMP to manage VM passwords and support password reset operations.

:::

### Password workflow

1. Register the template in CloudStack with **Password Enabled** selected.
2. Re-configure the template manually in CMP (during Cloud Provider setup, or raise a support ticket with StackConsole after setup — CMP has no self-service **Sync** option).
3. Deploy a VM using the template.
4. CloudStack generates the password.
5. CMP retrieves and stores the generated password automatically.

## Configure SSH access

Templates should have the SSH service installed and enabled.

Verify that the guest operating system allows SSH authentication by reviewing the SSH daemon configuration, typically at `/etc/ssh/sshd_config`. Review the following settings according to your operating system security policy:

* `PasswordAuthentication`
* `PermitRootLogin`

Example configuration:

```text
PasswordAuthentication yes
PermitRootLogin yes
```

Or use a default non-root user instead of direct root login — see [Configure a default operating system user](#configure-a-default-operating-system-user).

:::info[SSH key injection]

CMP supports SSH key injection during VM deployment. The template must be prepared to accept SSH keys through the startup process.

:::

## Enable startup script support

Templates should support startup scripts (UserData) so that CMP can initialize the virtual machine during first boot.

Startup scripts are used for features such as:

* SSH key injection
* User account initialization
* Marketplace application deployment
* Environment variable configuration
* Guest customization

:::warning[Marketplace applications]

CMP Marketplace apps rely on startup scripts (UserData) to install and configure software at first boot. If the template does **not** support startup scripts, Marketplace deployments in CMP will **not work as intended**.

:::

Enable startup script / UserData support when registering the template in CloudStack.

## Configure a scalable root disk

Templates should be created with a minimum required root disk size, but the root disk must remain **scalable** at provisioning time.

For example, a template may be created with a default root disk size of 10 GB or 15 GB, while the customer may later select a package with a root disk size of 60 GB, 120 GB, or 500 GB.

:::warning[Fixed root disk size]

If the template does not support root disk scaling, the deployed VM may not match the storage capacity defined by the selected package.

:::

## Configure a default operating system user

CMP supports configuring a default operating system username for each OS type.

Although `root` is commonly used during testing, many cloud providers disable direct root login and instead create a default operating system user.

| Operating System | Recommended Default User |
|---|---|
| Ubuntu | `ubuntu` |
| CentOS | `centos` |
| Debian | `debian` |
| Rocky Linux | `rocky` |
| AlmaLinux | `almalinux` |

Set the username at the operating system level in CMP. It is recommended to use the **same default username across all versions** of the same operating system family.

## L2 network limitations

Apache CloudStack L2 networks do not support UserData services. Since password-enabled templates depend on UserData, they **cannot** be deployed on L2 networks.

:::warning[L2 networks and password-enabled templates]

If you need to deploy VMs on an L2 network, use a template that is **not** password-enabled.

:::

Attempting to deploy a password-enabled template on an L2 network may result in an error similar to:

```text
Unable to deploy VM as template "ubuntu-test" is password enabled,
but there is no support for UserData service in the default network.
```

A full CloudStack error may also include the template ID and network UUID:

```text
Unable to deploy VM as template Template {"format":"OVA","id":219,"name":"ubuntu-test",...}
is password enabled, but there is no support for UserData service in the default network TestL2Network/1450b1fc-5984-42d9-93cc-d3aef8047ced
```

## Best practices

* Enable **Password Enabled** when registering the template in CloudStack
* Ensure the template supports SSH key injection and UserData
* Enable startup script execution
* Create templates with scalable root disks (not fixed size)
* Configure a consistent default username for each operating system family
* Mark CloudStack templates as **Public** and **Featured**
* Validate template functionality before making it available to customers
* Do not use password-enabled templates for L2 network deployments

{/* TODO: add screenshot cmp-template-cloudstack-registration.png */}

## Validation checklist

* Template is password-enabled in CloudStack
* SSH is enabled with correct `sshd_config` settings
* Startup script is enabled
* Root disk is scalable (not fixed size)
* Template is marked **Public** and **Featured** in CloudStack
* Default user is configured (if not using root)
* Template is **not** password-enabled if used with L2 networks

## Related

* [Templates](/orchestrators/cloudstack/templates/)
* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)

## Reference

* [Apache CloudStack Templates — Admin Guide](https://docs.cloudstack.apache.org/en/4.11.2.0/adminguide/templates.html)
* [Password-enabled templates](https://docs.cloudstack.apache.org/en/4.11.2.0/adminguide/templates/_password.html)
