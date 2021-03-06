# indenter
<!-- Character Encoding: "WHITE SQUARE" U+25A1 is □. -->

`indenter` コマンドは、クリップボードにあるテキストにインデントを入れたり、インデントを削除したりします。

<!-- TOC depthFrom:1 -->

- [indenter](#indenter)
  - [使い方 - インデントを削除します](#使い方---インデントを削除します)
  - [使い方 - インデントを入れます](#使い方---インデントを入れます)
  - [使い方 - インデントのスペースの数（タブサイズ）を変更します](#使い方---インデントのスペースの数タブサイズを変更します)
  - [使い方 - 行頭のタブとスペースを置き換えます](#使い方---行頭のタブとスペースを置き換えます)
  - [インストール](#インストール)
    - [Windows の場合](#windows-の場合)
    - [mac の場合](#mac-の場合)
  - [（開発者用） 開発環境の構築手順](#開発者用-開発環境の構築手順)
    - [Windows の場合](#windows-の場合-1)
    - [mac の場合](#mac-の場合-1)
  - [（開発者用） テスト](#開発者用-テスト)
    - [Jest を使うテスト](#jest-を使うテスト)
    - [Jest を使わないテスト](#jest-を使わないテスト)

<!-- /TOC -->


## 使い方 - インデントを削除します

1. （初回のみ）indenter をインストールします
2. クリップボードに編集するテキストをコピーします

               Section 1:   
               Section 2:
                 Section 2-1:

3. indenter を実行します
4. クリップボードにインデントが無くなったテキストがコピーされます

       Section 1:   
       Section 2:
         Section 2-1:

テキストの 1行目のインデントより浅いインデントの行がないと、
インデントを削除します。


## 使い方 - インデントを入れます

1. （初回のみ）indenter をインストールします
2. クリップボードに編集するテキストをコピーします。
   ただし、テキストの 1行目は、2行目以降に入れるインデントを入れてください

               Section 1:   
       Section 2:
         Section 2-1:

3. indenter を実行します
4. クリップボードにインデントが入ったテキストがコピーされます

               Section 1:   
               Section 2:
                 Section 2-1:

テキストの 1行目のインデントより浅いインデントの行があると、
インデントを入れます。


## 使い方 - インデントのスペースの数（タブサイズ）を変更します

タブサイズを変える前の値と変えた後の値を指定します。
2 から 4 に変える場合:

    indenter 24

4 から 2 に変える場合:

    indenter 42

テキストの 1行目のインデントより浅いインデントの行があると、
インデントを入れます。
ただし、第2引数にインデントの数を指定した場合、1行目のインデントは無視されます。

タブサイズを 4 から 2 に変えて全体のインデントを空白16文字入れる場合:
    indenter 42 16

テキストの 1行目のインデントより浅いインデントの行がないと、
インデントを削除します。


## 使い方 - 行頭のタブとスペースを置き換えます

タブからスペースに変えるときは t とスペースの数（1〜9）を指定します。
4 つのスペースの場合:

    indenter t4

スペースからタブに変えるときはスペースの数（1〜9）と t を指定します。
4 つのスペースの場合:

    indenter 4t

テキストの 1行目のインデントより浅いインデントの行があると、
インデントを入れます。

テキストの 1行目のインデントより浅いインデントの行がないと、
インデントを削除します。


## インストール

indenter を使うには Node.js のインストールが必要です。

### Windows の場合

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0-x64.exe）を開きます
        - インストール オプションはデフォルトを使用

    社内など、プロキシがある LAN に Windows がある場合:
        Windows スタート >> PowerShell（と入力）:
            npm config -g set proxy "http://___.___.___.___:____"
            npm config -g set https-proxy "http://___.___.___.___:____"

    indenter をダウンロードして展開し、indenter が使う Node.js パッケージをインストールします:
        Windows スタート >> PowerShell（と入力）:
            cd  ${env:USERPROFILE}\Downloads
            Invoke-WebRequest  https://github.com/Takakiriy/indenter/archive/refs/heads/master.zip -OutFile indenter.zip
            rm -r -fo  "indenter-master"  #// 更新するとき
            Expand-Archive -Path indenter.zip -DestinationPath "."
            cd  "indenter-master"

            npm install --only=production

    cmd.exe を使う場合:
        PATH が通ったフォルダーに indenter を起動する バッチ ファイル を作ります:
            Windows スタート >> cmd（と入力）>> コマンド プロンプト :
                cd  %USERPROFILE%\Downloads\indenter-master
                set script=%USERPROFILE%\AppData\Local\Microsoft\WindowsApps\indenter.bat

                echo @echo off> %script%
                echo set NODE_PATH=%cd%\node_modules>> %script%
                echo node  %cd%\build\indenter.js %*>> %script%

    PowerShell を使う場合:
        PATH が通ったフォルダーに indenter を起動する PS1 スクリプト ファイル を作ります:
            Windows スタート >> PowerShell（と入力） :
                cd  ${env:USERPROFILE}\Downloads\indenter-master
                ${current_folder} = Convert-Path "."
                ${script} = "${env:USERPROFILE}\AppData\Local\Microsoft\WindowsApps\indenter.ps1"

                echo  "`${env:NODE_PATH} = `"${current_folder}\node_modules`"" > ${script}
                echo  "node  ${current_folder}\build\indenter.js `$PsBoundParameters.Values `$args" >> ${script}

                Set-ExecutionPolicy  RemoteSigned  -Scope CurrentUser  #// スクリプトを実行できるようにします

    Git bash を使う場合:
        Git for Windows をインストールします:
            - https://git-scm.com/ >> Downloads >> Windows
            - ダウンロードしたファイル（例：Git-2.31.1-64-bit.exe）を開く
            - Next を8回押す
            - Configuring the line ending conversions: Checkout as-is, commit as-is
            - 他のインストール オプションはデフォルトを使用
        PATH が通ったフォルダーに indenter を起動する bash スクリプト ファイル を作ります:
            フォルダーを右クリック >> Git bash :
                cd  ${HOME}/Downloads/indenter-master
                current_folder="$(pwd)"
                script="${HOME}/bin/indenter"
                mkdir -p "${HOME}/bin"

                echo  "export NODE_PATH=\"${HOME}/AppData/Roaming/npm/node_modules\"" > ${script}
                echo  "node  ${current_folder}/build/indenter.js \"\$@\"" >> ${script}

    indenter が使えることを確認します:
        PowerShell または Git bash を新しく開いて:
            indenter --version

### mac の場合

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0.pkg）を開きます
        - インストール オプションはデフォルトを使用

    indenter をダウンロードして展開し、indenter が使う Node.js パッケージをインストールします:
        #// Launchpad >> Terminal
        cd  ~/Downloads
        setopt interactivecomments
            #// enables comment symbol (#)
        curl -o indenter.zip -kL https://github.com/Takakiriy/indenter/archive/refs/heads/master.zip 
        rm -rf  indenter-old  &&  mv  indenter  indenter-old  #// 更新するとき
        unzip -o indenter.zip
        mv  indenter-master  indenter
            #// Zip ファイルを展開したフォルダー
        cd  indenter

        npm install --only=production

    PATH が通ったフォルダーに indenter を起動する スクリプト ファイル を作ります:
        cd indenter  #// Zip ファイルを展開したフォルダー
        script="$HOME/bin/indenter"
        rm -f "${script}"  #// 更新するとき
        echo "export  NODE_PATH=$(pwd)/node_modules" >> "${script}"
        echo "node  $(pwd)/build/indenter.js \"\$@\"" >> "${script}"
        chmod +x "${script}"
        unset script

    indenter が使えることを確認します:
        indenter --version


## （開発者用） 開発環境の構築手順

### Windows の場合

Node.js をインストールします:

    - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
    - ダウンロードしたファイル（例：node-v14.16.0-x64.exe）を開きます
    - インストール オプションはデフォルトを使用

Git for Windows をインストールします:

    - https://git-scm.com/ >> Downloads >> Windows
    - ダウンロードしたファイル（例：Git-2.31.1-64-bit.exe）を開く
    - Next を8回押す
    - Configuring the line ending conversions: Checkout as-is, commit as-is
    - 他のインストール オプションはデフォルトを使用

Visual Studio Code をインストールします:

    - https://code.visualstudio.com/
    - ダウンロードしたファイル（例：VSCodeUserSetup-x64-1.54.3.exe）を開きます
    - インストール オプションはデフォルトを使用
    - VSCode >> Terminal >> New Terminal
    - 開いたシェルの右上に 1:powershell が表示されていたら、そこをクリックして Select Default Shell >> Git bash
    - （推奨）Visual Studio Code をタスクバーにピン止めします:
    - （推奨）Ctrl + S キーを押したときに全てのファイルを保存するように設定します: |
        File >> Preferences >> Keyboard Shortcuts >> save all （と入力） >>
            File: Save All （をダブルクリック） >> Ctrl + S キー >> Enter キー
    - Visual Studio Code を閉じます

`cmd menu.bat` をダブルクリックして、`1. open_VisualStudioCode` を選びます:

F5 キーを押すと、最初のテストが動きます:


### mac の場合

Node.js をインストールします:

    - https://nodejs.org/ja/download/ >> macOS Installer (.pkg)
    - ダウンロードしたファイル（例：node-v14.16.0.pkg）を開きます
    - インストール オプションはデフォルトを使用

Visual Studio Code をインストールします:

    - https://code.visualstudio.com/
    - ダウンロードしたファイル（例：Visual Studio Code.app）をダブルクリックします
    - （推奨）Visual Studio Code を Dock に移動します:
    - （推奨）Ctrl + S キーを押したときに全てのファイルを保存するように設定します: |
        Code >> Preferences >> Keyboard Shortcuts >> save all （と入力） >>
            File: Save All （をダブルクリック） >> Command + S キー >> Enter キー
    - Visual Studio Code を閉じます

`cmd menu.command` ファイルに実行権限を追加します:

    - `bin/chmod+x.command.zip` ファイルをダブルクリックします
    - 解凍してできた `chmod+x.command` ファイルを右クリック >> 開く >> 開く
    - `cmd menu.command` ファイルを開いたウィンドウにドラッグ＆ドロップして、Enter キーを押し、ウィンドウを閉じます
    - `cmd menu.command` ファイルを右クリック >> 開く >> 開く
    - 開いたウィンドウを閉じます

`cmd menu.command` ファイルをダブルクリックして、`1. open_VisualStudioCode` を選びます:

fn + F5 キーを押すと、最初のテストが動きます:


## （開発者用） テスト

Jest を使うテストと Jest を使わないテストがあります。
ソース ファイルの行番号の左をクリックして、ブレークポイントを設定できます。

### Jest を使うテスト

- Visual Studio Code >> Terminal >> New Terminal >>（＋の左の 1:__shell__）>> Create JavaScript Debug Terminal
- npm test
- テストを再起動します:
    - Continue ボタン:  #// 最後まで実行します
    - npm test が動いている Terminal で f キーを押します
- （終了するときは）Terminal タブ（下）>> ゴミ箱アイコン（右）

### Jest を使わないテスト

- Visual Studio Code >> F5 キー
