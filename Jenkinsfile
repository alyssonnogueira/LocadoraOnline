#!groovy

node ('master') {

    def VERSAO = "1.0.0-RELEASE"

    try {

        def nodeHome = tool name: 'node-8.1.3', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "$nodeHome/bin:$env.PATH"

        stage 'Validando dependências do projeto'
            sh "node -v"
            sh "npm -v"

        stage 'Baixando projeto'
            checkout scm

        stage 'Instalando dependências'
            sh "npm install"

        stage 'Build gulp'
            sh 'gulp env-test'

        stage 'Executa testes'
            sh "npm test"

        stage 'Contruindo imagem docker'
            sh "docker build --build-arg HTTP_PROXY=http://192.168.0.20:8080 -t alysson/locadora-backend:$VERSAO ."

        stage 'Enviando imagem docker para o nexus'
            withCredentials([usernamePassword(credentialsId: 'nexus_docker', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
                sh "docker tag alysson/locadora-backend:$VERSAO $DOCKER_RELEASE_REPO/alysson/locadora-backend:$VERSAO"
                sh "docker login -p '$DOCKER_PASSWORD' -u $DOCKER_USER $DOCKER_RELEASE_REPO"
                sh "docker push $DOCKER_RELEASE_REPO/alysson/locadora-backend:$VERSAO"
            }

        stage 'Deploy kubernetes'
            withCredentials([usernamePassword(credentialsId: 'nexus_docker', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
	            def replicas = 1
	            def app = 'locadora-backend'
	            def image = "$DOCKER_RELEASE_REPO/alysson/locadora-backend:$VERSAO"
	            def nameSpace = 'credito'
	            def profile = 'test'
	            def context = 'cluster-dev'

	            sh "/var/lib/jenkins/scripts/kubernetes_deploy.sh $replicas $app $image $nameSpace $WORKSPACE $profile $context"
	        }

        stage 'Migrate database'
            sh "NODE_ENV=production && npm run migrate | echo 'Trying migrate database'"

    } catch (err) {
        throw err
    }
}
