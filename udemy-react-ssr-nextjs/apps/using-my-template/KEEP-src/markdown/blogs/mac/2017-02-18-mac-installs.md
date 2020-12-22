---
meta-title: "Install Software on Mac | John Vincent"
meta-description: "John Vincent's discussion on Install Software on Mac"
meta-keywords: "Eclipse, Maven, Android"

title: "Install Software on Mac"
subtitle: ""
lead: ""

category: [Mac, Eclipse, Maven]
permalink: /mac/mac-installs/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# SourceTree

[SourceTree](http://www.sourcetreeapp.com/)

Download and Install.

You may need to configure `~.gitconfig`

## RAR

To install

```
cd tmp
brew install unrar
```

Unarchive a RAR file

```
unrar x <filename>
```

# Eclipse

[Eclipse](https://www.eclipse.org/)

## Eclipse Shortcuts

[11 Shortcuts for Eclipse MacOS](https://shortcutworld.com/Eclipse/mac/Eclipse-Helios_Shortcuts)

[Eclipse Cheat Sheet](https://www.shortcutfoo.com/app/dojos/eclipse-mac/cheatsheet)

## Installation

From [Eclipse Downloads](http://www.eclipse.org/downloads/eclipse-packages/), select 

`Eclipse IDE for Enterprise Java Developers` `Mac Cocoa 64-bit`

which downloads `eclipse-jee-2019-12-R-macosx-cocoa-x86_64.dmg`

Execute the DMG file.

Drag `Eclipse.app` to `Applications`

## Open Eclipse

Execute Eclipse, may get the error

```
“Eclipse.app” is an app downloaded from the Internet. Are you sure you want to open it?
```

Select `Open`


## Eclipse as a Mac Service

For details, see [Eclipse as a Mac Service](/mac/mac-services/)

## Open Eclipse

In Finder

* select Folder
* Right Click, Services
* eclipse-jee


### Remove .DS_Store duplication messages

Will want to change this at the workspace level.

* Eclipse, Preferences
* Java, Compiler, Building
	* Output folder
		* Filtered resources: `*.launch, *DS_Store`

### Eclipse Memory Problem

Out of memory errors.

```
cd /Applications/Eclipse.app/Contents/Eclipse/
```

edit `eclipse.ini`

change `-Xmx512m` to `-Xmx1024m`

Restart Eclipse



# Maven

[Apache Maven](https://maven.apache.org/)

## Installation

[Apache Maven Downloads](https://maven.apache.org/download.cgi)

```
cd /Users/jv/Desktop/OtherTools
mkdir apache-maven-work
cd apache-maven-work
```

Choose `apache-maven-3.6.3-bin.tar.gz` and save to `/Users/jv/Desktop/OtherTools/apache-maven-work`

Get the KEYS

```
https://www.apache.org/dist/maven/KEYS
```

and save to `/Users/jv/Desktop/OtherTools/apache-maven-work/KEYS`

Get the signature `apache-maven-3.6.3-bin.tar.gz.asc` and save to `/Users/jv/Desktop/OtherTools/apache-maven-work/apache-maven-3.6.3-bin.tar.gz.asc`

## Verify Download

```
cd /Users/jv/Desktop/OtherTools/apache-maven-work

gpg --import KEYS
gpg --verify apache-maven-3.6.3-bin.tar.gz.asc apache-maven-3.6.3-bin.tar.gz
```

## Installation

```
tar -zxvf apache-maven-3.6.3-bin.tar.gz
```

and move `apache-maven-3.6.3` to `/Users/jv/Desktop/OtherTools/apache-maven-work/apache-maven/apache-maven`

## Change Environment

```
export M2_HOME=/Users/jv/Desktop/OtherTools/apache-maven
export M2=$M2_HOME/bin
export PATH=$PATH:$M2
```

and for Java

```
export JAVA_HOME=$(/usr/libexec/java_home)
```

# Android File Transfer

Download `AndroidFileTransfer.dmg` and install from [Android File Transfer](https://www.android.com/filetransfer/)

## Install MacVim

Ensure `PATH` includes `/usr/local/bin`

Execute

```
brew update
brew install vim && brew install macvim
brew unlink macvim && brew link macvim
```

Got error message

```
dyld: Library not loaded: /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/libruby.2.0.0.dylib
  Referenced from: /usr/local/bin/vim
```

Try upgrade

```
brew update
brew upgrade macvim
```

Now `vim`, `gvim` and `vimdiff` all work.
