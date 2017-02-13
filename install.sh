#!/bin/bash

#Edu_blocks install script
#Les Pounder September 17 2016
#Modified by Joshua Lowe February 4 2017
#V1.1 SLATE UI (BETA RELEASE CHANNEL)
# If you cannot understand this, read Bash_Shell_Scripting#if_statements again.
if (whiptail --title "EduBlocks Installer" --yesno "Welcome to the EduBlocks installer. THIS INSTALLS BETA SOFTWARE, IT MAY HAVE BUGS AND IS NOT 100% TESTED! NOT FOR THE FAINT HEARTED. Do you want to continue?" 12 60) then
    echo "Downloading the package"
    sudo wget http://edupython.co.uk/beta.zip
    echo "Extracting the package to /home/pi/edublocks"
    sudo unzip beta.zip -d ./edublocks 
    echo "Downloading NPM"
    sudo apt-get install npm -y
    echo "Download Electron"
    sudo npm install -g electron
    echo "Copying the icon."
    sudo cp ./edublocks/ui/logo.png /usr/share/icons/hicolor/scalable/apps/logo.png
    echo "Copying the desktop shortcut to your desktop"
    sudo cp ./edublocks/edublocks.desktop ./Desktop
    echo "Making the program visable in the menu."
    sudo cp ./edublocks/edublocks.desktop /usr/share/applications
    echo "Downloading the edupy library"
    sudo pip3 install edupy
else
    echo "Sorry to hear you won't be installing EduPython today! If you want to install from the main release channel type: wget http://edupython.co.uk/install.sh && sudo bash install.sh"
fi

whiptail --title "EduBlocks Installer" --msgbox "Congratulations! EduBlocks has successfully installed. To get coding double click on the EduBlocks desktop icon." 8 78



