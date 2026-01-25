output "cluster_name" {
  description = "Name of the kind cluster"
  value       = kind_cluster.devops_journey.name
}

output "cluster_endpoint" {
  description = "Kubernetes API endpoint"
  value       = kind_cluster.devops_journey.endpoint
}

output "kubeconfig_path" {
  description = "Path to the kubeconfig file"
  value       = var.kubeconfig_path
}

output "namespace" {
  description = "Application namespace"
  value       = kubernetes_namespace.devops_journey.metadata[0].name
}

output "instructions" {
  description = "Next steps after cluster creation"
  value       = <<-EOF

    ====================================
    Kind Cluster Created Successfully!
    ====================================

    1. Set KUBECONFIG:
       export KUBECONFIG=${var.kubeconfig_path}

    2. Verify cluster:
       kubectl cluster-info
       kubectl get nodes

    3. Add hosts entries (Windows: C:\Windows\System32\drivers\etc\hosts):
       127.0.0.1 devops.local
       127.0.0.1 api.devops.local

    4. Build and load images:
       docker build -t devops-journey-backend:local ./backend
       docker build -t devops-journey-frontend:local ./frontend
       kind load docker-image devops-journey-backend:local --name ${var.cluster_name}
       kind load docker-image devops-journey-frontend:local --name ${var.cluster_name}

    5. Apply Kubernetes manifests:
       kubectl apply -k k8s/overlays/local

    6. Access the application:
       Frontend: http://devops.local
       Backend:  http://api.devops.local

  EOF
}
