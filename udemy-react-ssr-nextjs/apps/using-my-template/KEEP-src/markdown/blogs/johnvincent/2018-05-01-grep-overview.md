---
meta-title: "Overview of Grep GUI Utility | John Vincent"
meta-description: "John Vincent's discussion on Overview of Grep GUI Utility "
meta-keywords: "Grep, Java, Swing"

title: "Grep GUI Utility "
subtitle: ""
lead: ""

category: [Java, Swing]
permalink: /johnvincent/grep-overview/
---

<img class="post-image" src="/images/applications/grep/grep-1.png" alt="Grep Utility" />

<!-- end -->

# Recursive Grep

The purpose is to be to track down useful code quickly and without the usual fussing around.

* Provide search string(s)
* Directory to be searched.
* File type(s) to be searched.

Lists all occurances.

Drag and Drop file pathname to lower pane to edit the file.

# Technologies

* Java
* Swing
* Drag and Drop

# Usage

To execute app from the command line, use `java-grep`

or

`/Applications/java-grep`

<img class="post-image" src="/images/applications/grep/grep-2.png" alt="Grep Utility" />

# Development

At Github, create repository `java-grep`

repo: https://github.com/johnvincentio/java-grep

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Utilities
create-repo java-grep
```

Remove non-relevant files.

## Add `README.md`

```
cd java-grep
```

Create `README.md`

```
For details, see grep/README.md
```

## Start Eclipse

in Finder

* select `/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-grep`
* Right click, Services
  * eclipse-jee

## Create Java Project

* File, New, Project
* Java Project

Settings

* Project Name: grep
* Use default location
* JRE; Use an execution environment JRE: JavaSE-1.8
* Create separate folders for sources and class files

* Default output folder: `grep/classes`

## Package

Select `src`

* Right click, New, Package
* `io.johnvincent.grep`

Copy code to this package and change package names.

## Script file

Add `/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-grep/grep/grepdir.command`

```
#!/bin/sh
#
# script to run java app grepdirGui
#
DEV_HOME=/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-grep/grep
#
cd $DEV_HOME
#
MYCP=$DEV_HOME/classes:$DEV_HOME/Jars/log4j-1.2.13.jar
#
MY_FILE=/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-grep/grep/grepdir.properties
#
java -cp $MYCP io.johnvincent.grepgui.GrepdirGui $MY_FILE
```

## Create Symbolic Link

```
ln -s /Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-grep/grep/grepdir.command /Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-grep
```


## Save Grep as a Mac App

Execute from Finder

* Go, Applications
* Execute: Automator (or Automator.app)

Select

* Quick Action, or
* Application

and then select `Choose`

From the middle pane, double click Run Shell Script

Shell: /bin/bash
Pass input: as arguments

```
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-grep
```

To save: 

* File, Save:
* Save as: java-grep
* Where: Applications

saves java-grep.app in Applications.

