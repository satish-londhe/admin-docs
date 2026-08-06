---
sidebar_position: 3
title: "Accessing the Kubernetes Dashboard"
tags: ["orchestrator", "cloudstack", "features", "kubernetes", "dashboard"]
---

# Accessing the Kubernetes Dashboard

How end users (and admins verifying a cluster) open the **Kubernetes Dashboard** with `kubectl` and a kubeconfig from CMP.

Admins can also publish similar steps on the cluster **Access** tab via [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents) (Documentation Config on each Kubernetes version).

## Prerequisites

* A valid Kubernetes cluster in CMP (status **Running**)
* `kubectl` installed on the local machine
* A valid **kubeconfig** file with cluster access (download from the cluster **Access** tab — often saved as `kube.conf`)
* Kubernetes Dashboard installed in the `kubernetes-dashboard` namespace

:::tip[Kubeconfig path]

Examples below use `kube.conf` in the current directory. Replace with your path — for example the sample `{{kubeconfigPath}}` value from Documentation Config (`/custom/path/kube.conf`).

:::

## Verify cluster connectivity

Before opening the dashboard, confirm the kubeconfig can reach the cluster:

```bash
kubectl --kubeconfig kube.conf cluster-info
```

Expected output (example):

```text
Kubernetes control plane is running at https://<cluster-ip>:6443
CoreDNS is running...
```

## Verify Dashboard installation

Check that the Dashboard namespace exists:

```bash
kubectl --kubeconfig kube.conf get ns
```

Verify the service accounts:

```bash
kubectl --kubeconfig kube.conf get sa -n kubernetes-dashboard
```

Example:

```text
NAME                   SECRETS   AGE
default                0         ...
kubernetes-dashboard   0         ...
```

Verify dashboard secrets:

```bash
kubectl --kubeconfig kube.conf get secrets -n kubernetes-dashboard
```

Example secret names:

* `kubernetes-dashboard-certs`
* `kubernetes-dashboard-csrf`
* `kubernetes-dashboard-key-holder`

:::note[Dashboard v7+ tokens]

Newer Kubernetes Dashboard versions (**v7+**) no longer create a `kubernetes-dashboard-token` secret. Authentication tokens are generated dynamically with `kubectl create token`.

:::

## Generate login token

Generate a login token for the Dashboard service account:

```bash
kubectl --kubeconfig kube.conf -n kubernetes-dashboard create token kubernetes-dashboard
```

The command prints a JWT token similar to:

```text
eyJhbGciOiJSUzI1NiIsImtpZCI6...
```

Copy this token.

## Login to Kubernetes Dashboard

1. Open the Kubernetes Dashboard URL in your browser  
2. Select **Token** authentication  
3. Paste the generated token  
4. Click **Sign In**

You should now have access to the Kubernetes Dashboard.

## Creating an administrator user (optional)

If the default Dashboard service account does not have enough permissions, create a dedicated administrator account.

### Create service account

```bash
kubectl --kubeconfig kube.conf create serviceaccount admin-user -n kubernetes-dashboard
```

### Grant cluster administrator permissions

```bash
kubectl --kubeconfig kube.conf create clusterrolebinding admin-user \
  --clusterrole=cluster-admin \
  --serviceaccount=kubernetes-dashboard:admin-user
```

### Generate administrator token

```bash
kubectl --kubeconfig kube.conf -n kubernetes-dashboard create token admin-user
```

Use this token to log in to the Dashboard.

:::warning[Cluster-admin scope]

`cluster-admin` grants full cluster access. Use only when required, and follow your organisation’s security policy.

:::

## Common issues

### `grep` is not recognized

Windows Command Prompt does not support Linux utilities such as `grep` or `awk`.

Instead of searching for a token secret, generate a token directly:

```bash
kubectl --kubeconfig kube.conf -n kubernetes-dashboard create token kubernetes-dashboard
```

### Connection refused on `localhost:8080`

Example error:

```text
dial tcp [::1]:8080: connectex: No connection could be made
```

**Cause:** `kubectl` is using the default configuration instead of your cluster kubeconfig.

**Solution:** Always pass the kubeconfig file:

```bash
kubectl --kubeconfig kube.conf ...
```

### Service account not found

Example error:

```text
serviceaccounts "my-account" not found
```

**Cause:** The service account does not exist.

**Solution:** Use the existing `kubernetes-dashboard` service account, or [create an administrator user](#creating-an-administrator-user-optional) before generating a token.

## Useful commands

| Task | Command |
|---|---|
| Verify connectivity | `kubectl --kubeconfig kube.conf cluster-info` |
| List namespaces | `kubectl --kubeconfig kube.conf get ns` |
| List Dashboard service accounts | `kubectl --kubeconfig kube.conf get sa -n kubernetes-dashboard` |
| List Dashboard secrets | `kubectl --kubeconfig kube.conf get secrets -n kubernetes-dashboard` |
| Generate Dashboard token | `kubectl --kubeconfig kube.conf -n kubernetes-dashboard create token kubernetes-dashboard` |
| Generate administrator token | `kubectl --kubeconfig kube.conf -n kubernetes-dashboard create token admin-user` |

## Related

* [Kubernetes overview](/orchestrator-features/cloudstack/kubernetes/)
* [Access documents](/orchestrator-features/cloudstack/kubernetes/access-documents) — admin-authored Access tab guides
* [CloudStack Features](/orchestrator-features/cloudstack/)
