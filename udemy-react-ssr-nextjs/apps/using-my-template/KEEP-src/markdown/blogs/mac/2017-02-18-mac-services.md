---
meta-title: "Mac Services | John Vincent"
meta-description: "John Vincent's discussion on Mac Services"
meta-keywords: "Mac Services"

title: "Mac Services"
subtitle: ""
lead: ""

category: [Mac, Services]
permalink: /mac/mac-services/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

## Eclipse as a Mac Service

Wish to be able to start Eclipse instance from any folder in finder.

### Start the Automator

Start `Finder`

* Go, Applications
* Automator (or Automator.app)

Select

* Quick Action, or
* Service (for earlier versions of MacOS)

and then select `Choose`

Ensure the following options are set:

* Workflow (or Service) receives selected: folders
* in: Finder.app
* Image: Action
* Color: Black

From the middle pane, double click `Run Shell Script`

* Shell: `/bin/bash`
* Pass input: `as arguments`

Enter the following script

```
cd "$1"
/Applications/Eclipse.app/Contents/MacOS/Eclipse -data "$1" -showLocation "$1"
```

To save: `Cmd-S`

Save as: `eclipse-jee`

## Open Eclipse

In Finder

* select Folder
* Right Click, Services
* eclipse-jee

# Mac Services

Services are stored in `/Users/jv/Library/Services`

## Edit Service

* Select service to be changed
* Open With, Automator.app

Changed

```
cd $1
/Users/jv/Desktop/OtherTools/eclipse-jee/eclipse -data $1 -showLocation $1
```

to

```
cd $1
/Applications/Eclipse.app/Contents/MacOS/eclipse -data $1 -showLocation $1
```

## Delete a Mac Service

In Finder

* cd /Users/jv/Library/Services
* Delete unwanted services


# Sublime

[Sublime](https://www.sublimetext.com/)

* Download for Mac
* Install the DMG file.

## Install Sublime Packages

* Cmd Shift P
* Install Package

Install packages

* Emmet
* JSBeautify
* Vintageous (vi)

## Sublime as a Service

For details regarding adding as a Service, see [Eclipse as a Mac Service](/mac/mac-services/#service)

Particular changes are

```
cd "$1"
"/Applications/Sublime Text.app/Contents/MacOS/Sublime Text" "$1"
```

save as

`sublime`

# draw.io

[draw.io](https://about.draw.io/)

Can use the browser version but I chose to download the Desktop version.

See [Integrations](https://about.draw.io/integrations-ecosystem/), scroll down to `draw.io Desktop`

Leads to [Desktop version](https://about.draw.io/integrations-ecosystem/)

Download `draw.io-12.5.3.dmg` and install.

## draw.io Service

For details regarding adding as a Service, see [Eclipse as a Mac Service](/mac/mac-services/#service)

Start `Finder`

* Go, Applications
* Automator (or Automator.app)

Select

* Quick Action, or
* Service (for earlier versions of MacOS)

and then select `Choose`

Ensure the following options are set:

* Workflow (or Service) receives selected: folders
* in: Finder.app
* Image: Action
* Color: Black

From the middle pane, double click `Run Shell Script`

* Shell: `/bin/bash`
* Pass input: `as arguments`

Enter the following script

```
"/Applications/draw.io.app/Contents/MacOS/draw.io" "$1"
```

To save: `Cmd-S`

Save as: `Draw.io`


# Visual Studio Code as a Service

For details regarding adding as a Service, see [Eclipse as a Mac Service](/mac/mac-services/#service)

```
cd "$1"
"/Applications/Visual Studio Code.app/Contents/MacOS/Electron" "$1"
```

save as: `Visual Studio Code`

# Spring Tool Suite as a Service

```
cd $1
"/Applications/SpringToolSuite4.app/Contents/MacOS/SpringToolSuite4" -data $1 -showLocation $1
```

Save as: `spring-tool-suite`
