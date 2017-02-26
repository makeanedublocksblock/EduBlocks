#!/bin/bash

LOCALREPO=$(dirname $(readlink -f $0))

#Edu_blocks install script
#Les Pounder September 17 2016
#Modified by Joshua Lowe February 13 2017
#V1.2 SLATE UI (BETA RELEASE CHANNEL)
# If you cannot understand this, read Bash_Shell_Scripting#if_statements again.
if (whiptail --title "EduBlocks Installer" --yesno "Welcome to the EduBlocks installer. This will install EduBlocks and all the packages required. Do you want to continue?" 8 78) then
    cd $LOCALREPO

    echo "Copying the desktop shortcut to your desktop"
    sudo cp edublocks.desktop ~/Desktop
    echo "Copying the icon."
    sudo cp ui/logo.png /usr/share/icons/hicolor/scalable/apps/logo.png
    echo "Making the program visable in the menu."
    sudo cp edublocks.desktop /usr/share/applications
    echo "Downloading the edupy library"
    sudo pip3 install edupy
    echo "Install Node.JS"
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
    sudo apt install nodejs
    cd $LOCALREPO/ui
    npm install
    cd $LOCALREPO/server
    npm install
    cd $LOCALREPO
    whiptail --title "EduBlocks Installer" --msgbox "Congratulations! EduBlocks has successfully installed. To get coding double click on the EduBlocks desktop icon." 8 78
else
    echo "Sorry to hear you won't be installing EduPython today! If you want to install from the main release channel type: wget http://edupython.co.uk/install.sh && sudo bash install.sh"
fi





