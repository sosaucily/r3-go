#!/bin/sh
#If all changed are committed, compile js and deploy to github static page

DIRTYMESSAGE="dirty working directory: please resolve and try again"

#check for modified files and error out the deploy
git diff --exit-code > /dev/null

if [ $? -eq 1 ]
then
  echo $DIRTYMESSAGE
  exit 1
fi

#check for modified cached files and error out the deploy
git diff --cached --exit-code > /dev/null
if [ $? -eq 1 ]
then
  echo $DIRTYMESSAGE
  exit 1
fi

# Complile js in client directory
(cd client && npm run deploy:prod)

# Build the client code, and push the dist dir to the github pages system for hosting
git add client/dist
git commit -m'compile js client for deploy'

git push --force ghp `git subtree split --prefix client/dist HEAD`:master
git reset --hard head~1
