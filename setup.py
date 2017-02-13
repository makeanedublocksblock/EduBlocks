"""
Copyright (c) <2016> <EduBlocks>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"""

from setuptools import setup, find_packages
import os

    
classifiers = [
  'Environment :: Web Environment',
  'Development Status :: 4 - Beta',
  'Intended Audience :: Education',
  'Operating System :: POSIX :: Linux',
  'License :: OSI Approved :: MIT License',
  'Programming Language :: Python :: 3',
  'Programming Language :: Python :: 3'
]

setup(
  name='EduBlocks',
  version='0.0.1',
  description='Making the transition from Scratch to Python easier',
  long_description=open('README.txt').read() + '\n\n' + open('CHANGELOG.txt').read(),
  url='http://edupython.co.uk',
  author='All About Code',
  author_email='info@edupython.co.uk',
  license='MIT', # note the American spelling
  classifiers=classifiers,
  keywords='EduBlocks, Transition, Bottle, Blockly, Minecraft, EduPy', # used when people are searching for a module, keywords separated with a space
  packages=find_packages(),
  install_requires=['edupy'],
  
)                                                                                   


os.system("wget http://edupython.co.uk/blockly.zip")
os.system("unzip blockly.zip -d /home/$SUDO_USER/blockly")
os.system("cp /home/$SUDO_USER/blockly/edublocks.desktop /home/$SUDO_USER/Desktop")
os.system("chmod +x /home/$SUDO_USER/blockly/test.sh")
print("All Done, Enjoy hacking with EduBlocks. Queries: info at edupython dot co dot uk")
