#!/bin/sh
#If all changed are committed, compile js and deploy to github static page

checkStatus () {
  if [ $? != 0 ]
  then
    echo $1
    exit 1
  fi
}

DIRTYMESSAGE="Dirty working directory: please resolve and try again"
BUILDMESSAGE="Something wrong with the build step: please resolve and try again"

PRODUCTION_BRANCH="r3-go/production"
#check for modified files and error out the deploy
git diff --exit-code > /dev/null
checkStatus "$DIRTYMESSAGE"

#check for modified cached files and error out the deploy
git diff --cached --exit-code > /dev/null
checkStatus "$DIRTYMESSAGE"

# Complile js in client directory
CURRBRANCH=`git branch | grep \* | cut -d ' ' -f2`
cd client
git branch -D "$PRODUCTION_BRANCH" 
git checkout -b "$PRODUCTION_BRANCH"
checkStatus "$BUILDMESSAGE"

npm run build
checkStatus "$BUILDMESSAGE"
git add build
git commit --amend -C HEAD --no-verify
git push --force origin "$PRODUCTION_BRANCH"
git checkout $CURRBRANCH

echo "FINISHED!"
