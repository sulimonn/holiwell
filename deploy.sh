echo 'Building...'
npm run build

echo 'Deploying to server...'
scp -r build/* root@154.194.52.246:/var/www/html/

echo 'Done!'
