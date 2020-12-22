---
meta-title: "Overview of Sudoku Game and Solver | John Vincent"
meta-description: "John Vincent's discussion on Overview of Sudoku Game and Solver"
meta-keywords: "Sudoku, Java, Swing"

title: "Overview of Sudoku Game"
subtitle: "Sudoku Solver and Generator"
lead: "Ever looked for a Sudoku Application that will help you solve your Sudoku puzzles?"

category: [Java, Swing]
permalink: /johnvincent/sudoku-overview/
---

<img class="post-image" src="/images/applications/sudoku/sudoku-1.png" alt="Play Sudoku" />

<!-- end -->

# Sudoku Game Solver and Generator Application

The application has everything you need for hours of Sudoku playing enjoyment:

* Generate a puzzle
* Insert a puzzle, the application will help you solve the puzzle.
* Walk through a puzzle.
* Computer moves.
* Undo is supported.
* Ask the computer to solve the puzzle. 
* Save a puzzle.
* Load a puzzle.

# Technologies

* Java
* Swing
* Drag and Drop

# Usage

To execute app from the command line, use `java-sudoku`

or

`/Applications/java-sudoku`

Optionally a `.sudoku` file may be passed as a parameter. The saved game will be loaded so the game may recommence.

For example:

`game_1.sudoku`

```
010000780
820010509
900005020
003950000
000703000
000086300
070500003
604070095
059000010
```

where:

* Zero => not set
* 1-9 => initial value


<img class="post-image" src="/images/applications/sudoku/sudoku-2.png" alt="Play Sudoku" />

# Sudoku Web Sites

Many websites allow for Sudoku playing. Start a game and insert the game into the Sudoku Application for help with the puzzle.

* [sudoku.game](https://sudoku.game/)
* [sudoku.com](https://sudoku.com/)
* [websudoku.com](http://www.websudoku.com/)


## Script File

`/Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku/Sudoku/app.command`

```
#!/bin/sh
#
# script to run java app Sudoku
#
PARAMS="$*"
echo "PARAMS are $PARAMS"
#
DEV_HOME=/Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku/Sudoku
#
cd $DEV_HOME
#
MYCP=$DEV_HOME/classes:$DEV_HOME/Jars/log4j-1.2.13.jar
#
MY_FILE=$PARS
#
java -cp $MYCP io.johnvincent.sudoku.gui.Appgui $MY_FILE
```

## Create Symbolic Link

```
ln -s /Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku/Sudoku/app.command /Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/sudoku
```

## Save Sudoku as a Mac App

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
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/sudoku $1
```

To save: 

* File, Save:
* Save as: sudoku
* Where: Applications

saves sudoku.app in Applications.


## Start Sudoku with Game Imported

Verify

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku/Sudoku
./app.command games/game_1.sudoku
```

and

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku/Sudoku
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/sudoku games/game_1.sudoku
```

and

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku/Sudoku
open -a sudoku.app --args games/game_1.sudoku
```

## Make Sudoku the default app for `*.sudoku`

In Finder

* select folder `cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku/Sudoku/games`
* select any `.sudoku` file
* right click, Get Info

* Open with:
	* Select: sudoku.app
	* Select: Change All


<img class="post-image" src="/images/applications/sudoku/sudoku-3.png" alt="Play Sudoku" />


# Development

At Github, create repository `java-sudoku`

Repository: https://github.com/johnvincentio/java-sudoku

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games
create-repo java-sudoku
```

Remove non-relevant files.

## Add `README.md`

```
cd java-sudoku
```

Create `README.md`

```
For details, see Sudoku/README.md
```

## Start Eclipse

in Finder

* select `/Users/jv/Desktop/MyDevelopment/github/java/Games/java-sudoku`
* Right click, Services
  * eclipse-jee

## Create Java Project

* File, New, Project
* Java Project

Settings

* Project Name: Sudoku
* Use default location
* JRE; Use an execution environment JRE: JavaSE-1.8
* Create separate folders for sources and class files

* Default output folder: `Sudoku/classes`

## Package

Select `src`

* Right click, New, Package
* `io.johnvincent`

Copy code to this package and change package names.
