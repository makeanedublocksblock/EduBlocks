#!/bin/bash

LOCALREPO=$(dirname $(readlink -f $0))

cd $LOCALREPO

git remote update

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date"
elif [ $LOCAL = $BASE ]; then

    echo "Updated detected, fetching latest version..."
    git pull

    echo "Running install script..."
    bash install.sh

elif [ $REMOTE = $BASE ]; then
    echo "Need to push"
else
    echo "Diverged"
fi
