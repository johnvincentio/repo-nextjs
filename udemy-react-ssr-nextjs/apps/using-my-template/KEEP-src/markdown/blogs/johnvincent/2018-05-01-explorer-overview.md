---
meta-title: "Overview of Explorer Utility | John Vincent"
meta-description: "John Vincent's discussion on Overview of Explorer Utility"
meta-keywords: "Explorer, Java, Swing"

title: "Overview of Explorer Utility"
subtitle: ""
lead: ""

category: [Java, Swing]
permalink: /johnvincent/explorer-overview/
---

<img class="post-image" src="/images/applications/explorer/explorer.png" alt="Explorer Utility" />

<!-- end -->

# File Explorer

Explore the contents of a file. 

* Open a file or Drag and Drop a file onto the application.
* The file will be explored, directories recursively displayed.
* Jar, Zip etc files are opened and their contents displayed.
* Any file can be opened in the editor.
* Java files can be decompiled and the Java displayed.


# Technologies

* Java
* Swing
* Drag and Drop

# Usage from Finder

From `Finder.app`

* select a file (for example a Jar file)
* right click
* select: `java-explorer`

# Usage from Command Line

`java-explorer file`

For example:

`java-explorer toolbox.jar`

img class="post-image" src="/images/applications/diffall/diffall-2.png" alt="Compare Utility" />

## Notes

Log files will be written to files in the directory `/tmp/explorer`. Ensure this directory exists. 

Decompiler files will be written to files in the directory `/tmp/jdec`. Ensure this directory exists.

# Development

At Github, create repository `java-explorer`

repo: https://github.com/johnvincentio/java-explorer

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Utilities
create-repo java-explorer
```

Remove non-relevant files.

## Add `README.md`

```
cd java-explorer
```

Create `README.md`

```
For details, see Explorer/README.md
```

## Start Eclipse

in Finder

* select `/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-explorer`
* Right click, Services
  * eclipse-jee

## Create Java Project

* File, New, Project
* Java Project

Settings

* Project Name: Explorer
* Use default location
* JRE; Use an execution environment JRE: JavaSE-1.8
* Create separate folders for sources and class files

* Default output folder: `Explorer/classes`

## Package

Select `src`

* Right click, New, Package
* `io.johnvincent.explorer`

Copy code to this package and change package names.

## Script file

`/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-explorer/Explorer/explorer.command`

## Create Symbolic Link

```
ln -s /Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-explorer/Explorer/explorer.command /Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-explorer
```

## Explorer as a Service

Wish to be able to start Explorer instance from any file or folder in finder.

Start Finder

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

From the middle pane, double click Run Shell Script

* Shell: /bin/bash
* Pass input: as arguments

Enter the following script

```
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-explorer $1
```

To save: Cmd-S

Save as: java-explorer

## Save java-explorer as a Mac App

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
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-explorer $1
```

To save: 

* File, Save:
* Save as: java-explorer
* Where: Applications

saves java-explorer.app in Applications.
