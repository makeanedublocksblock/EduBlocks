#!/bin/bash

echo "Downloading the package"

REPOSRC=https://github.com/AllAboutCode/edublocks
LOCALREPO=~/edublocks

# We do it this way so that we can abstract if from just git later on
LOCALREPO_VC_DIR=$LOCALREPO/.git

if [ ! -d $LOCALREPO_VC_DIR ]
then
    git clone $REPOSRC $LOCALREPO
else
    cd $LOCALREPO
    git pull $REPOSRC
fi

cd $LOCALREPO
bash ./install.sh

