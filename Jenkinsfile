pipeline {
    agent any

    tools {
        // This must match the name you gave in Jenkins Tools
        allure 'allure'
    }

    environment {
        BASE_URL  = credentials('NinzaCRMBaseURL')
        USERNAME = credentials('NinzaCRMUsername')
        PASSWORD = credentials('NinzaCRMPassword')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                //sh 'npx playwright install'
            }
        }
       
        stage('Clean Reports') {
            steps {
                sh 'rm -rf allure-results || true'
                sh 'rm -rf playwright-report || true'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'

            // Publish Playwright HTML report
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
                allowMissing: true
            ])

            // Publish Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
                reportBuildPolicy: 'ALWAYS'
            ])
        }
        success {
            echo 'Tests Passed ✅'
        }
        failure {
            echo 'Tests Failed ❌'
        }
    }
}