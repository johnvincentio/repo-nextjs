---
meta-title: "Basic Homebrew | John Vincent"
meta-description: "John Vincent's discussion on Basic Homebrew"
meta-keywords: "Homebrew"

title: "Basic Homebrew"
subtitle: "Homebrew on Mac"
lead: ""

category: [Mac, Homebrew, Gradle, Markdown]
permalink: /mac/basic-brew/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Homebrew

[Homebrew](https://brew.sh/)

## Install / Update

Using `/usr/bin/ruby`, installed as part of MacOS

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

installs to `/usr/local/bin/brew`

Check version

```
brew -v
```

## Checks

```
brew doctor
brew missing
```

## Path

Ensure `/usr/local/bin` is in your `PATH`

## Commands

Update: `brew update`

Install

```
brew update
brew install <application-name>
```

Remove

```
brew update
brew remove <application-name>
```

List: `brew list`

Help: `man brew`

Search

```
brew search
brew search <string>
```

## Installed

Homebrew installs stuff to the Cellar `/usr/local/Cellar`


## MacDown - Markdown Editor

```
brew update
brew cask install macdown
```

To uninstall

```
brew cask uninstall macdown
```

## Vim and MacVim

```
brew update

brew install vim && brew install macvim
brew linkapps macvim
```

Links MacVim to /Applications

## Gradle

[Gradle](https://www.gradle.org)

```
brew update
brew install gradle
```

`gradle -v`

```
Gradle 2.11

Build time:   2016-02-08 07:59:16 UTC
Build number: none
Revision:     584db1c7c90bdd1de1d1c4c51271c665bfcba978
Groovy:       2.4.4
Ant:          Apache Ant(TM) version 1.9.3 compiled on December 23 2013
JVM:          1.8.0_45 (Oracle Corporation 25.45-b02)
OS:           Mac OS X 10.11.3 x86_64
```

## Other

```
brew install wget
```

Install Tree
brew install tree
Install nmap
brew install nmap

## MacOS Upgrade to Sierra Problem

[MacOS Upgrade to Sierra broke brew update](https://digitizor.com/fix-homebrew-permissions-osx-el-capitan/)

To fix the problem

```
sudo chown $(whoami):admin /usr/local && sudo chown -R $(whoami):admin /usr/local
```

	
	
	
	