
pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.65.1-noble'
            args '--shm-size=1g -e HOME=/tmp -v /var/tmp/npm-cache:/tmp/npm-cache'
        }
    }

    environment {
        CI = 'true'
        NPM_CONFIG_CACHE = '/tmp/npm-cache'
    }

    options {
        timestamps()
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Info') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --prefer-offline'
            }
        }

        stage('Unit Test - Jest') {
            steps {
                sh 'npm test -- --ci'
            }
        }

        stage('Build Next.js') {
            steps {
                sh 'npm run build'
            }
        }

        stage('E2E Test - Playwright') {
            steps {
                sh 'npm run test:e2e'
            }
        }
    }

    post {
        always {
            echo 'Pipeline selesai dijalankan.'
        }

        success {
            echo 'CI berhasil!'
        }

        failure {
            echo 'CI gagal. Periksa log setiap stage.'
        }
    }
}
