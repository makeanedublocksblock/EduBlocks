#!/bin/bash

# 2>/dev/null 1>&2 sensible-browser file:///home/pi/edublocks/ui/index.html &

cd ~/edublocks/ui
npm start

cd ~
sudo python3 ~/edublocks/server.py
