# indenter

`indenter` command inserts indent or removes indents from text on the clipboard.

[日本語 README](./README-jp.md)

<!-- TOC depthFrom:1 -->

- [indenter](#indenter)
  - [How to use - delete indent](#how-to-use---delete-indent)
  - [How to use - insert indent](#how-to-use---insert-indent)
  - [How to use - change the number of indented spaces (tab size)](#how-to-use---change-the-number-of-indented-spaces-tab-size)
  - [How to use - replace tabs and spaces at the beginning of a line](#how-to-use---replace-tabs-and-spaces-at-the-beginning-of-a-line)
  - [Install](#install)
    - [For Windows](#for-windows)
    - [For mac](#for-mac)
  - [(for developers) How to build the development environment](#for-developers-how-to-build-the-development-environment)
    - [For Windows](#for-windows-1)
    - [For mac](#for-mac-1)
  - [(for developers) Test](#for-developers-test)
    - [Test using Jest](#test-using-jest)
    - [Test without Jest](#test-without-jest)

<!-- /TOC -->


## How to use - delete indent

1. (First time only) Install indenter
2. Copy the text you want to edit to the clipboard

               Section 1:   
               Section 2:
                 Section 2-1:

3. Run indenter
4. The deleted indent text is copied to the clipboard

       Section 1:   
       Section 2:
         Section 2-1:

If there is no line of indent that is shallower than
the first line of text, indenter removes the indent.


## How to use - insert indent

1. (First time only) Install indenter
2. Copy the text you want to edit to the clipboard.
   Insert indent at the first line of text.
   The length is the length to insert the second and other lines.

               Section 1:   
       Section 2:
         Section 2-1:

3. Run indenter
4. The indented text is copied to the clipboard

               Section 1:   
               Section 2:
                 Section 2-1:

If there was lines of indent that is shallower than
the first line of text, indenter inserts the indent.


## How to use - change the number of indented spaces (tab size)

Specify the value before changing the tab size and the value after changing it.
When changing from 2 to 4:

    indenter 24

When changing from 4 to 2:

    indenter 42

If there was lines of indent that is shallower than
the first line of text, indenter inserts the indent.

If there is no line of indent that is shallower than
the first line of text, indenter removes the indent.


## How to use - replace tabs and spaces at the beginning of a line

When changing from a tab to a space, specify t and the number of spaces (1 to 9).
For 4 spaces:

    indenter t4

When changing from spaces to tabs, specify the number of spaces (1-9) and t.
For 4 spaces:

    indenter 4t

If there was lines of indent that is shallower than
the first line of text, indenter inserts the indent.

If there is no line of indent that is shallower than
the first line of text, indenter removes the indent.


## Install

To use indenter, you must install Node.js.

### For Windows

    Install Node.js:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0-x64.exe)
        - Installation options are defaults

    If there is your Windows in the LAN with the proxy in the company and so on:
        Windows Start >> (Input) PowerShell :
            - npm config -g set proxy "http://___.___.___.___:____"
            - npm config -g set https-proxy "http://___.___.___.___:____"

    Download and expand indenter and install Node.js packages used by indenter:
        Windows Start >> (Input) PowerShell :
            cd  ${env:USERPROFILE}\Downloads
            Invoke-WebRequest  https://github.com/Takakiriy/indenter/archive/refs/heads/master.zip -OutFile indenter.zip
            rm -r -fo  "indenter-master"  #// When you are updating
            Expand-Archive -Path indenter.zip -DestinationPath "."
            cd  "indenter-master"

            npm install --only=production

    If you use cmd.exe:
        Create a batch file that launches indenter into the folder where PATH:
            Windows Start >> (Input) cmd >> Command Prompt :
                cd  %USERPROFILE%\Downloads\indenter-master
                set script=%USERPROFILE%\AppData\Local\Microsoft\WindowsApps\indenter.bat

                echo @echo off> %script%
                echo set NODE_PATH=%cd%\node_modules>> %script%
                echo node  %cd%\build\indenter.js>> %script%

    If you use PowerShell:
        Create a PS1 script file that launches indenter into the folder where PATH:
            Windows Start >> (Input) PowerShell :
                cd  ${env:USERPROFILE}\Downloads\indenter-master
                ${current_folder} = Convert-Path "."
                ${script} = "${env:USERPROFILE}\AppData\Local\Microsoft\WindowsApps\indenter.ps1"

                echo  "`${env:NODE_PATH} = `"${current_folder}\node_modules`"" > ${script}
                echo  "node  ${current_folder}\build\indenter.js `$PsBoundParameters.Values `$args" >> ${script}

                Set-ExecutionPolicy  RemoteSigned  -Scope CurrentUser  #// Make the script run

    If you use Git bash:
        Install Git for Windows:
            - https://git-scm.com/ >> Downloads >> Windows
            - Open the downloaded file (e.g. Git-2.31.1-64-bit.exe)
            - Press Next button 8 times
            - Configuring the line ending conversions: Checkout as-is, commit as-is
            - Other installation options are defaults
        Create a bash script file that launches indenter into the folder where PATH passed:
            Right click at any folder >> Git bash :
                cd  ${HOME}/Downloads/indenter-master
                current_folder="$(pwd)"
                script="${HOME}/bin/indenter"
                mkdir -p "${HOME}/bin"

                echo  "export NODE_PATH=\"${HOME}/AppData/Roaming/npm/node_modules\"" > ${script}
                echo  "node  ${current_folder}/build/indenter.js \"\$@\"" >> ${script}

    Check to use indenter command:
        Open new PowerShell or new Git bash:
            indenter --version

### For mac

    Install Node.js:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0.pkg)
        - Installation options are defaults

    Download and expand indenter and install Node.js packages used by indenter:
        #// Launchpad >> Terminal
        cd  ~/Downloads
        setopt interactivecomments
            #// enables comment symbol (#)
        curl -o indenter.zip -kL https://github.com/Takakiriy/indenter/archive/refs/heads/master.zip 
        rm -rf  indenter-old  &&  mv  indenter  indenter-old  #// When you are updating
        unzip -o indenter.zip
        mv  indenter-master  indenter  #// The folder extracted from the Zip file
        cd  indenter

        npm install --only=production

    Make the script file in the PATH folder to start indenter:
        cd indenter  #// The folder extracted from the Zip file
        script="$HOME/bin/indenter"
        rm -f "${script}"  #// When you are updating
        echo "export  NODE_PATH=$(pwd)/node_modules" >> "${script}"
        echo "node  $(pwd)/build/indenter.js \"\$@\"" >> "${script}"
        chmod +x "${script}"
        unset script

    Check to use indenter command:
        indenter --version


## (for developers) How to build the development environment

### For Windows

Install Node.js:

    - https://nodejs.org/en/download/ >> Windows Installer (.msi) >> 64-bit
    - Open the downloaded file (e.g. node-v14.16.0-x64.exe)
    - Installation options are defaults

Install Git for Windows:

    - https://git-scm.com/ >> Downloads >> Windows
    - Open the downloaded file (e.g. Git-2.31.1-64-bit.exe)
    - Press Next button 8 times
    - Configuring the line ending conversions: Checkout as-is, commit as-is
    - Other installation options are defaults

Install Visual Studio Code:

    - https://code.visualstudio.com/
    - Open the downloaded file (e.g. VSCodeUserSetup-x64-1.54.3.exe)
    - Installation options are defaults
    - VSCode >> Terminal >> New Terminal
    - If you see powershell in the top right corner of the open shell, click there and 
        [ Select Default Shell >> Git bash ]
    - (recommend) Pin Visual Studio Code to the taskbar
    - (recommend) Set to save all files when Ctrl+S is pressed: |
        File >> Preferences >> Keyboard Shortcuts >> (input) save all >>
            (double click) File: Save All >> Ctrl + S key >> Enter key
    - Close Visual Studio Code

Double click `cmd menu.bat` and select `1. open_VisualStudioCode`:

To run the first test, press F5 key:


### For mac

Install Node.js:

    - https://nodejs.org/en/download/ >> macOS Installer (.pkg)
    - Open the downloaded file (e.g. node-v14.16.0.pkg)
    - Installation options are defaults

Install Visual Studio Code:

    - https://code.visualstudio.com/
    - Open the downloaded file (e.g. Visual Studio Code.app)
    - (recommend) Pin Visual Studio Code to the taskbar
    - (recommend) Set to save all files when Ctrl+S is pressed: |
        File >> Preferences >> Keyboard Shortcuts >> (input) save all >>
            (double click) File: Save All >> Ctrl + S key >> Enter key
    - Close Visual Studio Code

Add `cmd menu.command` file executable permission:

    - Double click `bin/chmod+x.command.zip` file
    - Right click at the expanded `chmod+x.command` file >> Open >> Open
    - Drag and drop `cmd menu.command` file to the opened window, push Enter key and close the window
    - Right click at `cmd menu.command` file >> Open >> Open
    - Close the opened window

Double click `cmd menu.command` file and select `1. open_VisualStudioCode`:

To run the first test, press fn + F5 key:


## (for developers) Test

There are the test using Jest and the test without Jest.
You can set the break point, click at the left of line number of the source file.

### Test using Jest

- Visual Studio Code >> Terminal >> New Terminal >> (1:__shell__ at the left of +) >> Create JavaScript Debug Terminal
- npm test
- Restart the test:
    - Continue button:  #// Run to the end of program
    - Press `f` key in the terminal running `npm test`
- (When you finish,) Terminal tab (bottom) >> Recycle box icon (right)

### Test without Jest

- Visual Studio Code >> F5 key
