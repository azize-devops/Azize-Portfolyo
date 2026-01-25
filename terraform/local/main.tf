# Terraform configuration for local Kubernetes development
# Uses kind (Kubernetes IN Docker) for local cluster

terraform {
  required_version = ">= 1.0.0"

  required_providers {
    kind = {
      source  = "tehcyx/kind"
      version = "~> 0.2"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
}

# Kind cluster configuration
resource "kind_cluster" "devops_journey" {
  name           = var.cluster_name
  wait_for_ready = true

  kind_config {
    kind        = "Cluster"
    api_version = "kind.x-k8s.io/v1alpha4"

    node {
      role = "control-plane"

      kubeadm_config_patches = [
        <<-EOF
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
        EOF
      ]

      extra_port_mappings {
        container_port = 80
        host_port      = 80
        protocol       = "TCP"
      }

      extra_port_mappings {
        container_port = 443
        host_port      = 443
        protocol       = "TCP"
      }
    }

    node {
      role = "worker"
    }
  }
}

# Kubernetes provider configuration
provider "kubernetes" {
  host                   = kind_cluster.devops_journey.endpoint
  cluster_ca_certificate = kind_cluster.devops_journey.cluster_ca_certificate
  client_certificate     = kind_cluster.devops_journey.client_certificate
  client_key             = kind_cluster.devops_journey.client_key
}

# Helm provider configuration
provider "helm" {
  kubernetes {
    host                   = kind_cluster.devops_journey.endpoint
    cluster_ca_certificate = kind_cluster.devops_journey.cluster_ca_certificate
    client_certificate     = kind_cluster.devops_journey.client_certificate
    client_key             = kind_cluster.devops_journey.client_key
  }
}

# Install NGINX Ingress Controller
resource "helm_release" "nginx_ingress" {
  name             = "ingress-nginx"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  namespace        = "ingress-nginx"
  create_namespace = true
  version          = "4.8.3"

  set {
    name  = "controller.hostPort.enabled"
    value = "true"
  }

  set {
    name  = "controller.service.type"
    value = "NodePort"
  }

  set {
    name  = "controller.nodeSelector.ingress-ready"
    value = "true"
  }

  set {
    name  = "controller.tolerations[0].key"
    value = "node-role.kubernetes.io/control-plane"
  }

  set {
    name  = "controller.tolerations[0].operator"
    value = "Equal"
  }

  set {
    name  = "controller.tolerations[0].effect"
    value = "NoSchedule"
  }

  depends_on = [kind_cluster.devops_journey]
}

# Create namespace for application
resource "kubernetes_namespace" "devops_journey" {
  metadata {
    name = "devops-journey"
    labels = {
      "app.kubernetes.io/name"       = "devops-journey"
      "app.kubernetes.io/managed-by" = "terraform"
    }
  }

  depends_on = [kind_cluster.devops_journey]
}

# Output kubeconfig for kubectl access
resource "null_resource" "kubeconfig" {
  provisioner "local-exec" {
    command = "kind get kubeconfig --name ${var.cluster_name} > ${var.kubeconfig_path}"
  }

  depends_on = [kind_cluster.devops_journey]
}
