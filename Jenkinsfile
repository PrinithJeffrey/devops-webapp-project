pipeline {
    agent any

    environment {
        FLY_API_TOKEN = credentials('fly_api_token')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/PrinithJeffrey/devops-webapp-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh 'docker build -t weather-app .'
                }
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir('terraform') {
                    script {
                        echo "Initializing Terraform..."
                        sh 'terraform init -upgrade'
                        echo "Applying Terraform..."
                        sh 'terraform apply -auto-approve'
                    }
                }
            }
        }

        stage('Deploy to Fly.io') {
            steps {
                script {
                    echo "Deploying app to Fly.io..."
                    sh 'flyctl deploy --image weather-app:latest --detach'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete. Cleaning up...'
            sh 'docker system prune -f'
        }
    }
}
