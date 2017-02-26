#!/bin/bash

LOCALREPO=$(dirname $(readlink -f $0))

cd $LOCALREPO
bash check.sh

cd $LOCALREPO/ui
2>/dev/null 1>&2 npm start &

cd $LOCALREPO/server
npm start
