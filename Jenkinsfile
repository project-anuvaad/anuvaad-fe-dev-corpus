#!groovy
node('server_build_slave') {

try {

   stage('Checkout'){

      checkout scm
   }
stage('compress build folder')
withCredentials([usernamePassword(credentialsId: 'anuvaad-docker-hub-credentials', passwordVariable: 'dockerhub_pass', usernameVariable: 'dockerhub_user')])
{
sh '''
if [ -f "$(pwd)/build" ]
then
  rm -f $(pwd)/build
fi

if [  $( docker ps -q -f status=exited --filter "name=$JOB_BASE_NAME" ) ]
then
docker rm "$JOB_BASE_NAME"
fi

docker run --env REACT_APP_BASE_URL=$base_url --env REACT_APP_APIGW_BASE_URL=$apigw_url --env REACT_APP_CLIENT_ID=$client_id -v $(pwd):/opt --name "$JOB_BASE_NAME" sivaprakash123/anuvaad-fe-client-base:1 /bin/bash -c "cd /opt &&  npm run build"
docker rm "$JOB_BASE_NAME"
commit_id=$(git rev-parse --short HEAD)
echo $commit_id> commit_id.txt
docker build -t gohila/$image_name:$commit_id .
docker login -u $dockerhub_user -p $dockerhub_pass
docker push gohila/$image_name:$commit_id

'''

        }


}

catch (err) {
    currentBuild.result = "FAILURE"
    throw err
 }



}


