#!/bin/bash
sudo epiphany --new-tab  file:///home/$SUDO_USER/EduBlocks/ui/index.html > /dev/null 2>&1 &

sudo python3 ./EduBlocks/server.py 



