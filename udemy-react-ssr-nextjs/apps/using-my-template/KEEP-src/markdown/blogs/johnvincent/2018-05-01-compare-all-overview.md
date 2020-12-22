---
meta-title: "Overview of Utility to Recursively Compare Directories | John Vincent"
meta-description: "John Vincent's discussion on Utility to Recursively Compare Directories"
meta-keywords: "Compare, Java, Swing"

title: "Overview of Utility to Recursively Compare Directories"
subtitle: ""
lead: ""

category: [Java, Swing]
permalink: /johnvincent/compare-all-overview/
---

<img class="post-image" src="/images/applications/diffall/diffall-1.png" alt="Compare Utility" />

<!-- end -->

# Recursively Compare Directories

The purpose of this utility is to provide to a developer the ability to quickly and easily find all differences between 2 directories. The only files remaining are files that are different. These files can then be compared and the differences noted.

## Cleaning Options

The aim is to delete all files that are of interest before performing the actual compare.

## Compare Options

* Allows for a compare to be performed.
* Identical files may be deleted.
* Allows for differences to be shown.

For binary files, compares are performed at the byte level. Otherwise, compares are performed at the character level.

## Log Options

* Messages are logged to the file by default, or the application.

## Statistics Options

* Allows for the creation and display of the statistics of the last comparison.

## Basic Options

* Make all file priveleges read and write. This is probably best performed at the OS level.

## Message Options

* Enable/Disable messages. 

# Technologies

* Java
* Swing
* Drag and Drop

# Usage

To execute app from the command line, use `java-diffall`

or

`/Applications/java-diffall`


Provide two directories you wish to compare.

Cleaning options are for removing files that are not of interest. Thins out the forest so you can see the trees.

The compare options perform the actual compare. Delete if identical allows for more cleaning out of files that are not of interest.

The aim is to end up with a detailed compare log of all differences between the two directories.



<img class="post-image" src="/images/applications/diffall/diffall-2.png" alt="Compare Utility" />

# Development

At Github, create repository `java-diffall`

Repository: https://github.com/johnvincentio/java-diffall

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Utilities
create-repo java-diffall
```

Remove non-relevant files.

## Add `README.md`

```
cd java-diffall
```

Create `README.md`

```
For details, see Diffall/README.md
```

## Start Eclipse

in Finder

* select `/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-diffall`
* Right click, Services
  * eclipse-jee

## Create Java Project

* File, New, Project
* Java Project

Settings

* Project Name: Diffall
* Use default location
* JRE; Use an execution environment JRE: JavaSE-1.8
* Create separate folders for sources and class files

* Default output folder: `Diffall/classes`

## Package

Select `src`

* Right click, New, Package
* `io.johnvincent`

Copy code to this package and change package names.

## Script file

`/Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-diffall/Diffall/diffall.command`


## Create Symbolic Link

```
ln -s /Users/jv/Desktop/MyDevelopment/github/java/Utilities/java-diffall/Diffall/diffall.command /Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-diffall
```

## Save java-diffall as a Mac App

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
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-diffall
```

To save: 

* File, Save:
* Save as: java-diffall
* Where: Applications

saves java-diffall.app in Applications.
