git checkout -b deploy

npm install
npm run build:production

git add .
git commit -m "deploy"
git push origin deploy

git push heroku deploy:master -f

git checkout master

git push origin --delete deploy
git branch -D deploy