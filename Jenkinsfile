pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes'
            inheritFrom 'build'
            defaultContainer 'jnlp'
        }
    }

    environment {
        HARBOR="harbor.k8s.codeanchor.eu/codeanchor"
        COSIGN_PASSWORD=credentials('cosign-password')
        COSIGN_PRIVATE_KEY=credentials('cosign-private-key')
    }

    stages {
        stage('Build Frontend') {
            steps {
                container('kaniko') {
                    sh '''
                        /kaniko/executor --context `pwd` \
                            --dockerfile `pwd`/frontend/Dockerfile \
                            --destination=${HARBOR}/frontend:v${BUILD_NUMBER} \
                            --destination=${HARBOR}/frontend:latest
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                container('kaniko') {
                    sh '''
                        /kaniko/executor --context `pwd` \
                            --dockerfile `pwd`/backend/Dockerfile \
                            --destination=${HARBOR}/backend:v${BUILD_NUMBER} \
                            --destination=${HARBOR}/backend:latest 
                    '''
                }
            }
        }

        stage('Sign Frontend & Backend Image') {
            steps {
                container('kaniko') {
                    withCredentials([file(credentialsId: 'cosign-private-key', variable: 'COSIGN_KEY')]) {
                        sh 'cosign version'
                        sh '''cosign sign --key $COSIGN_PRIVATE_KEY ${HARBOR}/frontend:v${BUILD_NUMBER}'''
                        sh '''cosign sign --key $COSIGN_PRIVATE_KEY ${HARBOR}/frontend:latest'''
                        sh '''cosign sign --key $COSIGN_PRIVATE_KEY ${HARBOR}/backend:v${BUILD_NUMBER}'''
                        sh '''cosign sign --key $COSIGN_PRIVATE_KEY ${HARBOR}/backend:latest'''
                    }
                }
            }
        }

        stage('Deploy Frontend & Backend') {
            steps {
                container('kubectl') {
                    withKubeConfig([serverUrl: 'https://kubernetes.default.svc']) {
                        sh '''
                            kubectl set image --namespace nginx-web \
                                deployment/root-frontend \
                                root-frontend=${HARBOR}/frontend:latest '''
                        sh '''
                            kubectl set image --namespace nginx-web \
                                deployment/root-backend \
                                root-backend=${HARBOR}/backend:latest '''
                        sh 'kubectl rollout restart deployment/root-frontend --namespace nginx-web'
                        sh 'kubectl rollout restart deployment/root-backend --namespace nginx-web'
                    }
                }
            }
        }
    }
}
