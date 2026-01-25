output "cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = module.eks.cluster_security_group_id
}

output "cluster_arn" {
  description = "EKS cluster ARN"
  value       = module.eks.cluster_arn
}

output "cluster_certificate_authority_data" {
  description = "Base64 encoded certificate data"
  value       = module.eks.cluster_certificate_authority_data
  sensitive   = true
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnets
}

output "rds_endpoint" {
  description = "RDS endpoint (if created)"
  value       = var.use_rds ? module.rds[0].db_instance_endpoint : "PostgreSQL running in Kubernetes"
}

output "configure_kubectl" {
  description = "Command to configure kubectl"
  value       = "aws eks update-kubeconfig --name ${module.eks.cluster_name} --region ${var.aws_region}"
}

output "instructions" {
  description = "Next steps after cluster creation"
  value       = <<-EOF

    ====================================
    EKS Cluster Created Successfully!
    ====================================

    1. Configure kubectl:
       ${module.eks.cluster_name}

    2. Verify cluster:
       kubectl cluster-info
       kubectl get nodes

    3. Build and push images to ECR:
       # Create ECR repositories first
       aws ecr create-repository --repository-name devops-journey-backend
       aws ecr create-repository --repository-name devops-journey-frontend

       # Login to ECR
       aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin <account-id>.dkr.ecr.${var.aws_region}.amazonaws.com

       # Build and push
       docker build -t devops-journey-backend ./backend
       docker tag devops-journey-backend:latest <account-id>.dkr.ecr.${var.aws_region}.amazonaws.com/devops-journey-backend:latest
       docker push <account-id>.dkr.ecr.${var.aws_region}.amazonaws.com/devops-journey-backend:latest

    4. Apply Kubernetes manifests:
       kubectl apply -k k8s/overlays/production

    5. Get Load Balancer URL:
       kubectl get svc -n ingress-nginx

  EOF
}
