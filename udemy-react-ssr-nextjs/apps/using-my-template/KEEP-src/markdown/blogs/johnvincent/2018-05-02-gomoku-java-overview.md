---
meta-title: "Overview of Gomoku Game | John Vincent"
meta-description: "John Vincent's discussion on Overview of Gomoku Game"
meta-keywords: "Gomoku, Java, Swing"

title: "Overview of Gomoku"
subtitle: ""
lead: ""

category: [Java, Swing]
permalink: /johnvincent/gomoku-java-overview/
---

<img class="post-image" src="/images/applications/gomoku/gomoku.png" alt="Play Gomoku" />

<!-- end -->

# Gomoku (Five In A Row)

The application has everything you need for hours of Gomoku playing enjoyment:

* Play the computer or with another player.
* Variable size board.
* Scores are displayed during the game.
* Undo is supported.
* Save a game.
* Load a game.

# Technologies

* Java
* Swing
* Drag and Drop

# Usage

To execute app from the command line, use `java-gomoku`

or

`/Applications/java-gomoku`

Optionally a `.gomoku` file may be passed as a parameter. The saved game will be loaded so the game may recommence.

For example:

`game_1.gomoku`

```
-- 
-- players,isPlayerComputer(1),isPlayerComputer(2) --
-- 
players,true,true

-- 
-- board,board.getRows(),board.getColumns() --
-- 
board,9,9

-- 
-- initialize --
-- 
initialize

-- 
-- move,move_number,player,row,column --
-- 
move,0,1,4,4
move,1,2,3,3
move,2,1,3,4
move,3,2,4,3
move,4,1,5,4
move,5,2,2,4
move,6,1,6,4
move,7,2,7,4
move,8,1,5,3
move,9,2,4,2
move,10,1,1,5
move,11,2,5,1
move,12,1,6,0
move,13,2,3,5
move,14,1,5,5
move,15,2,5,6
move,16,1,4,6
move,17,2,7,3
move,18,1,3,7
move,19,2,2,8
move,20,1,2,6
move,21,2,6,5
move,22,1,4,7
move,23,2,6,2
move,24,1,4,5
move,25,2,4,8
move,26,1,3,6
move,27,2,2,7
move,28,1,1,6
move,29,2,0,6
move,30,1,6,3

-- 
-- end --
-- 
```

# Gomoku Web Sites

* [Gomoku at Wikipedia](https://en.wikipedia.org/wiki/Gomoku)

# Development

At Github, create repository `java-gomoku`

Repository: https://github.com/johnvincentio/java-gomoku

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games
create-repo java-gomoku
```

Remove non-relevant files.

## Add `README.md`

```
cd java-gomoku
```

Create `README.md`

```
For details, see Gomoku/README.md
```

## Start Eclipse

in Finder

* select `/Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku`
* Right click, Services
  * eclipse-jee

### Create Java Project

* File, New, Project
* Java Project

Settings

* Project Name: Gomoku
* Use default location
* JRE; Use an execution environment JRE: JavaSE-1.8
* Create separate folders for sources and class files

* Default output folder: `Gomoku/classes`

### Package

Select `src`

* Right click, New, Package
* `io.johnvincent`

Copy code to this package and change package names.


## Setup

See `log4j.xml`. It requires `/tmp/gomoku.log`

## Two Players Game

To execute app, use `app.command`

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/TwoPlayer
./app.command
```

## Script File

`/Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku/app.command`

```
#!/bin/sh
#
# script to run java app Gomoku
#
PARAMS="$*"
echo "PARAMS are $PARAMS"
#
DEV_HOME=/Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku
#
cd $DEV_HOME
#
MYCP=$DEV_HOME/classes:$DEV_HOME/Jars/log4j-1.2.13.jar
#
MY_FILE=$PARAMS
#
java -cp $MYCP -Xdock:name="Gomoku" io.johnvincent.gomoku.App $MY_FILE
#
```

## Create Symbolic Link

```
ln -s /Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku/app.command /Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-gomoku
```

# Save Gomoku as a Mac App

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
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-gomoku $1
```

To save: 

* File, Save:
* Save as: gomoku
* Where: Applications

saves gomoku.app in Applications.

## Make Gomoku default app for `*.gomoku`

In Finder

* select folder `cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku/saved-games`
* select any `.gomoku` file
* right click, Get Info

* Open with:
	* Select: gomoku.app
	* Select: Change All

## Start Gomoku with Game Imported

```
java-gomoku file.gomoku
```

where:

* file.gomoku is an optional parameter, the filename of a saved Gomoku game.

For example:

```
java-gomoku /Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku/saved-games/save-1.gomoku
```

Verify

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku
./app.command saved-games/save-1.gomoku
```

and

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku
/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts/bin/java-gomoku saved-games/save-1.gomoku
```

and

```
cd /Users/jv/Desktop/MyDevelopment/github/java/Games/java-gomoku/Gomoku
open -a gomoku.app --args saved-games/save-1.gomoku
```


