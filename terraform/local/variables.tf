variable "cluster_name" {
  description = "Name of the kind cluster"
  type        = string
  default     = "devops-journey-local"
}

variable "kubeconfig_path" {
  description = "Path to save the kubeconfig file"
  type        = string
  default     = "./kubeconfig"
}

variable "kubernetes_version" {
  description = "Kubernetes version for the kind cluster"
  type        = string
  default     = "v1.28.0"
}
