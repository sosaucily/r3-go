#!/bin/sh

git push --force heroku `git subtree split --prefix server HEAD`:master
