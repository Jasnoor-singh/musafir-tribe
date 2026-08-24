pipeline {
    agent any

    tools {
        // Name must match the NodeJS installation configured in
        // Manage Jenkins -> Tools -> NodeJS installations
        nodejs 'node20'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend — install & verify') {
            steps {
                dir('backend') {
                    sh 'npm ci || npm install'
                    // Catch syntax errors in every backend JS file
                    sh 'for f in $(find . -name "*.js" -not -path "./node_modules/*"); do node --check "$f"; done'
                }
            }
        }

        stage('Frontend — install & build') {
            steps {
                dir('frontend') {
                    sh 'npm ci || npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Admin — install & build') {
            steps {
                dir('admin') {
                    sh 'npm ci || npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Archive builds') {
            steps {
                archiveArtifacts artifacts: 'frontend/dist/**, admin/dist/**', fingerprint: true
            }
        }
    }

    post {
        success { echo '✅ Build passed — frontend & admin bundles archived.' }
        failure { echo '❌ Build failed — check the stage logs above.' }
    }
}
