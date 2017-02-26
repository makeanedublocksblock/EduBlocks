#!/bin/bash

LOCALREPO=$(dirname $(readlink -f $0))

# Make sure node isnt running somewhere...
pkill node

cd $LOCALREPO
bash check.sh

cd $LOCALREPO/server
npm start &

cd $LOCALREPO/ui
2>/dev/null 1>&2 npm start
