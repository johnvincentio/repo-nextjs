---
meta-title: "Git Tutorial | John Vincent"
meta-description: "John Vincent's Git Tutorial"
meta-keywords: "Git"
title: "Git Tutorial"
subtitle: ""
lead: ""
category: [Git]
permalink: /git/git-tutorial/
---

Git is a distributed version control system (DVCS), also known as decentralized. This means that every developer has a full copy of the repository, which is hosted in the cloud.

<!-- end -->

# Git Options

* [Git Cheat Sheet](/git/git-options/)
* [Git HowTo](https://githowto.com/)
* [Pro Git](https://git-scm.com/book/en/v2)

# Git Tools

[Fork](https://git-fork.com/) and [SourceTree](https://www.sourcetreeapp.com/) are excellent tools. I regularly use them as I prefer a UI app to the command line.

However, it is probably best to first learn how git works before relying on these tools.

## Git Global

Create file `/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/git/config`

```
#!/bin/sh
#
#  script to configure git
#
echo "Script to configure git"
#
NAME=your-github-id
EMAIL=your-github-email
IGNORE_GLOBAL=/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/git/.gitignore_global
#
git config --global user.name $NAME
git config --global user.email $EMAIL
git config --global core.excludesfile $IGNORE_GLOBAL
#
# git merge
#
git config merge.tool vimdiff
git config merge.conflictstyle diff3
git config mergetool.prompt false
#
# aliases
#
git config --global alias.hist1 "log --graph --date-order -C -M --pretty=format:'<%h> %ad [%an] %Cgreen%d%Creset %s' --all --date=short"
git config --global alias.hist2 "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"
git config --global alias.hist3 "git log --all --decorate --oneline --graph"
#
echo "Show configuration"
#
git config --list
```

To show the various branches and their interactions

```
git hist1
```

Note `git config merge.tool opendiff` is also very effective.

`IGNORE_GLOBAL` is used to enable Git to mark this file as a global .gitignore. It will subsequently be used to mark files to ignore in case no local .gitignore is found

Create git global file `/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/.gitignore_global`

```
*~
.DS_Store
.*.swp
.*.swo
*.sass-cache
node_modules/
*.*.bak
.metadata/
RemoteSystemsTempFiles/
Pivotal tc Server Developer Edition v3.1-config/
```

Also may need to add

```
*.class
bin/
```

Set your environment

```
. /Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/git/config
```

### Show Git Global

Show system, global, and (if inside a repository) local configs.

```
git config --list
```

## Create a Repository I

From [Github](https://www.github.com/), Add repository `git-tutorial`

```
echo "# git-tutorial" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:johnvincentio/git-tutorial.git
git push -u origin master
```

## Create a Repository II

The following is my process.

* Create public or private repository at [Github](https://github.com/)
* `cd {my-github-developer-folder}/{subdir}`
* `create-repo remote-repository-name`

This will quickly provide a development environment.

`create-repo` follows

```
#!/bin/sh
#
# script to create a git repository in github
#
echo "Script to create a git repository in github"
echo " "
echo "ENSURE YOU HAVE ALREADY CREATED the REPOSITORY in Github"
echo ""
NEW_REPO=$1
if [ -z "$NEW_REPO" ]; then
    echo "Usage: create-repo repository-name"
    exit 1
fi
#
echo "Creating local repository $NEW_REPO"
#
echo " "
echo "Checking if directory already exists"
if [ ! -d "$NEW_REPO" ]; then
    echo " "
	 echo "Making directory $NEW_REPO"
	 mkdir $NEW_REPO
    touch $NEW_REPO/index.html
#
    mkdir $NEW_REPO/css
    touch $NEW_REPO/css/main.css
#
    mkdir $NEW_REPO/js
    touch $NEW_REPO/js/app.js
fi
#
echo " "
echo "cd to $NEW_REPO"
cd $NEW_REPO
#
if [ ! -d ".git" ]; then
    echo " "
	 echo "Create basic files"
	 touch README.md
	 touch .gitignore
    echo "node_modules" > .gitignore
#
    echo " "
	echo "Create local repository"
	git init
#
    echo " "
	echo "Adding files to repository and commit"
	git add *
	git add .gitignore
	git commit -m "Commit"
fi
#
echo " "
echo "Check status and branch info"
git status
git branch
#
echo " "
echo "Add remote repository reference"
git remote add origin git@github.com:{my-github}/$NEW_REPO.git
#
echo " "
echo "Push files to remote repository"
git push -u origin master
#
echo " "
echo "Verify remote repository"
git remote -v
#
echo " "
echo "Show git log"
git log
#
echo "Completed"
```

To create the repository

```
cd github/projects
create-repo git-tutorial
```

## Create Project

From [git-tutorial projects](https://github.com/johnvincentio/git-tutorial/projects)

Create Project

	* Board Name: git-tutorial
	* Template: Automated kanban

# Git Branching Model

[A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

This is a great starting point.

<img class="post-image-small" src="/images/blogs/git-branches.png" alt="Git branching Model" />

# Tutorial Guidelines

All tasks are a Jira ticket number. Thus the ticket number will always appear in the branch name.

<table class="table-small">
<thead>
<tr>
<th>Task Type</th>
<th>Branch from</th>
<th>New Branch Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>Single Task</td>
<td>develop</td>
<td>feature/{ticket-number}</td>
</tr>
<tr>
<td>User Story</td>
<td>feature</td>
<td>feature/{ticket-number}</td>
</tr>
<tr>
<td>Task in a User Story</td>
<td>feature/{ticket-number}</td>
<td>task/{ticket-number}</td>
</tr>
<tr>
<td>Development Testing Bug</td>
<td>develop</td>
<td>devfix/{ticket-number}</td>
</tr>
<tr>
<td>Release</td>
<td>develop</td>
<td>release/{release-number}</td>
</tr>
<tr>
<td>Post Integration Bug</td>
<td>release/{release-number}</td>
<td>bugfix/{ticket-number}</td>
</tr>
<tr>
<td>Emergency Release</td>
<td>master</td>
<td>hotfix/{ticket-number}</td>
</tr>
</tbody>
</table>

Main branches with an infinite timeline are

* master
* develop
* release

`origin/master` - the main branch where the source code of HEAD always reflects a production-ready state.

`origin/develop` - the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. 

`origin/release` - the main branch where the source code of HEAD always reflects a release-ready state.

* Each time `develop` is merged back into `release`, this is a new release candidate.
* Each time `release` is merged back into master, this is a new production release.

# Git Tutorial

The following is a demonstration of using Git in a project. To aid understanding

* the only file in the project is `README.md`
* commits to remote allow the change to be viewed from [github](https://github.com/johnvincentio/git-tutorial)


The steps will be:

* Initialize `master` branch
* Create `develop` branch from `master`
* Create task branch `feature/1001` from `develop`
	* Merge `feature/1001` into the `develop` branch
* Create a User Story
	* Create a User Story Branch `feature/2000` from `develop`
	* Create Tasks branches from User Story Branch `feature/2000`
	* Merge `task/2001` into the User Story Branch
	* Merge `task/2002` into the User Story Branch
	* Merge `task/2003` into the User Story Branch
* Multiple Developers working on User Story branch `feature/2000`
	* Second developer makes a change to User Story branch `feature/2000`
	* Update Local Branch with changes from Remote Branch `feature/2000`
	* Merge the User Story Branch `feature/2000` into the develop branch `develop`
* Development Testing Bug, create branch `devfix/9001` from `develop`
	* Merge devfix Branch `devfix/9001` into `develop` branch
* Create Release branch `release/1.0` from `develop`
* Post Integration Bug, create branch `bugfix/9101` from `release/1.0`
	* Merge the bugfix branch `bugfix/9101` into the release branch `release/1.0`
* Release to Production, merge branch `release/1.0` to `master`
	* Tag Release 1.0
* Create Task Branch `feature/1002` from `develop`
	* Merge branch `feature/1002` into `develop` branch
* Merge release branch `release/1.0` into the `develop` branch
* Fix an emergency bug in the production system
	* Merge branch `hotfix/9201` into the `master` branch
	* Tag Release 1.0.1
	* Merge branch `hotfix/9201` into the `develop` branch
* Getting specific versions

The following is the SourceTree git graph of the `git-tutorial` repository after these tasks.

<img class="post-image" src="/images/blogs/git-tutorial-sourcetree.png" alt="git-tutorial git graph" />

The following is the command line generated git graph of the `git-tutorial` repository after these tasks.

<img class="post-image" src="/images/blogs/git-tutorial.png" alt="git-tutorial git graph" />

## Initialize master branch

The repository has been created and I have `master` branch only.

```
cd github/projects/git-tutorial
```

Edit `README.md`, only `initial master`

```
git add .
git commit -m "initial"
git push
```

##  Create `develop` branch from `master`

```
git checkout -b develop
git push origin develop
```

## Create task branch `feature/1001` from `develop`

Edit Project `git-tutorial`, add tasks

* `1001; Feature 1001`

For ticket `1001`, create branch `feature/1001` from `develop`

```
git checkout -b feature/1001 develop
```

Edit `README.md`, only `feature/1001` and commit.

```
git add .
git commit -m "feature/1001"
git push origin feature/1001
```

### Merge `feature/1001` into the `develop` branch

```
git checkout develop
git merge --no-ff feature/1001
git push origin develop
```

The --no-ff flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward. This avoids losing information about the historical existence of a feature branch and groups together all commits that together added the feature. Reverting a whole feature (i.e. a group of commits) becomes straightforward.

use commit message

```
Task feature/1001 is complete
```

Optionally, clean up

```
git branch -d feature/1001
```

## Create a User Story

Edit Project `git-tutorial`, add tasks

* `2000; Feature 2000`
* `2001; Task A`
* `2002; Task B`
* `2003; Task C`

### Create a User Story Branch `feature/2000` from `develop`

For ticket `2000`, create branch `feature/2000` from `develop`

```
git checkout -b feature/2000 develop
```

Edit `README.md`, ensure only

```
feature/1001
```

and change to

```
feature/1001
feature/2000
```

Commit

```
git add .
git commit -m "feature/2000"
git push origin feature/2000
```

### Create Tasks branches from User Story Branch `feature/2000`

For ticket `2001`, create branch `task/2001` from `feature/2000`

```
git checkout -b task/2001 feature/2000
```

Edit `README.md`, ensure only

```
feature/1001
feature/2000
```

and change to

```
task/2001
```

and commit.

```
git add .
git commit -m "task/2001"
git push origin task/2001
```

Repeat the above for tickets `2002` and `2003`

### Merge `task/2001` into the User Story Branch

```
git checkout feature/2000
git merge --no-ff task/2001
```

use commit message

```
task/2001 is complete
```

Handle the merge conflicts and then push to remote.

```
git push origin feature/2000
```

### Merge `task/2002` into the User Story Branch

Now handle `task/2002`

```
git merge --no-ff task/2002
```

get error

```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

Either fix the merge issues or abort the merge. Let's abort the merge.

```
git merge --abort
or
git reset --merge ORIG_HEAD
```


This time lets fix the merge conflict. `git status` will show files in confict.

Redo the merge

```
git merge --no-ff task/2002
```

Edit `README.md` ensure only

```
task/2001
task/2002
```

Now commit

```
git add README.md
git commit
```

use commit message

```
task/2002 is complete
```

and push to remote

```
git push origin feature/2000
```

### Merge `task/2003` into the User Story Branch

Now handle `task/2003`

```
git merge --no-ff task/2003
```



get error

```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

Lets fix the merge conflict. `git status` will show files in confict.

Edit README.md

```
task/2001
task/2002
task/2003
```

Now commit

```
git add README.md
git commit
```

using commit message

```
task/2003 is complete
```

and push to remote

```
git push origin feature/2000
```

Optionally, clean up

```
git branch -d task/2001
git branch -d task/2002
git branch -d task/2003
```

## Multiple Developers working on User Story branch `feature/2000`

There are now multiple developers working on the project. The second developer makes a change to `feature/2000`

The first developer needs to get the change. 

### Second developer makes a change to User Story branch `feature/2000`

Copy `feature/2000` branch to `/tmp`

```
git checkout feature/2000
cd ..
cp -R git-tutorial /tmp
cd /tmp/git-tutorial
```

Edit `/tmp/git-tutorial/README.md`, ensure only

```
task/2001
task/2002
task/2003
```

change to

```
task/2001
task/2002
task/2003
feature/2000
```

and commit

```
git add .
git commit -m "feature/2000"
git push origin feature/2000
```

#### Update Local Branch with changes from Remote Branch `feature/2000`

Edit `github/projects/git-tutorial/README.md`, ensure only

```
task/2001
task/2002
task/2003
```

Set tracking information for branch `feature/2000`

```
git checkout feature/2000
git branch -u origin/feature/2000
or
git branch --set-upstream-to origin/feature/2000
```

Perform the update

```
git pull
```

Verify README.md is

```
task/2001
task/2002
task/2003
feature/2000
```

### Merge the User Story Branch `feature/2000` into the develop branch `develop`

Now we have the completed User Story Branch `feature/2000`

```
git checkout develop
git merge --no-ff feature/2000
```

use commit message

```
User story feature/2000 is complete
```

Check `README.md` for branch `develop` in Github repository. Ensure only `feature/1001`

Push to remote

```
git push origin develop
```

ensure `README.md` is

```
task/2001 task/2002 task/2003 feature/2000
```

### Clean up

`git branch -a` to list branches.

Optional, delete local branches

```
git branch -d task/2001
git branch -d task/2002
git branch -d task/2003
```

and delete remote branches

```
git push origin --delete task/2001
git push origin --delete task/2002
git push origin --delete task/2003
```

## Development Testing Bug, create branch `devfix/9001` from `develop`

Bug has been found during development testing. 

Edit Project `git-tutorial`, add tasks

* `9001; Bug 9001`

Create branch `devfix/9001` from `develop`

```
git checkout -b devfix/9001 develop
```

Edit `README.md`, ensure only

```
task/2001
task/2002
task/2003
feature/2000
```

Change to

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
```

and commit.

```
git add .
git commit -m "devfix/9001"
git push origin devfix/9001
```

### Merge devfix Branch `devfix/9001` into `develop` branch

Now the bug has been fixed, we need to merge back into `develop`

```
git checkout develop
git merge --no-ff devfix/9001
```

use commit message

```
Development bug 9001 is complete
```

Check `README.md` for branch `develop` in Github repository. Ensure only

```
task/2001
task/2002
task/2003
feature/2000
```

Push to remote

```
git push origin develop
```

ensure `README.md` is

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
```

### Clean up

`git branch -a` to list branches.

Optional, delete local branches

```
git branch -d devfix/9001
```

and delete remote branches

```
git push origin --delete devfix/9001
```

## Create Release branch `release/1.0` from `develop`

Now the development work and testing are complete a release branch should be built.

Create branch `release/1.0` from `develop`

```
git checkout -b release/1.0 develop
```

Edit `README.md`, ensure only

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
```

and change to

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
```

which mimics the updating of release meta-data.

Commit and push to remote

```
git commit -a -m "Release 1.0 meta-data"
git push origin release/1.0
```

## Post Integration Bug, create branch `bugfix/9101` from `release/1.0`

Bug has been found during post development testing (Qual testing). 

Edit Project `git-tutorial`, add tasks

* `9101; Bug 9101`

Create branch `bugfix/9101` from `release/1.0`

```
git checkout -b bugfix/9101 release/1.0
```

Edit `README.md`, ensure only

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
```

and change to

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
```

which mimics the the fixing of the bug.

Commit and push to remote

```
git commit -a -m "bugfix/9101"
git push origin bugfix/9101
```

### Merge the bugfix Branch `bugfix/9101` into the release branch `release/1.0`

Now the bug has been fixed, we need to merge back into `release/1.0`

```
git checkout release/1.0
git merge --no-ff bugfix/9101
```

use commit message

```
Qual bug 9101 is complete
```

Check `README.md` for branch `release/1.0` in Github repository. Ensure only

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
```

Push to remote

```
git push origin release/1.0
```

ensure `README.md` is

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
```

### Clean up

`git branch -a` to list branches.

Optional, delete local branches

```
git branch -d bugfix/9101
```

and delete remote branches

```
git push origin --delete bugfix/9101
```

## Release to Production, merge branch `release/1.0` to `master`

All development tasks and testing are complete. The release branch `release/1.0` is ready to become a release.

```
git checkout master
```

Edit `README.md`, ensure only `initial master`

```
git merge --no-ff release/1.0
```

use commit message

```
Release 1.0 is complete
```

and then push to remote.

```
git push origin master
```

Check github repository, master branch `README.md` should be

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
```

### Tag Release 1.0

```
git tag -a 1.0
```

use commit message

```
Release 1.0
```

and then push to remote.

```
git push --follow-tags
or
git push origin 1.0
```

To view the tag in Github repository `git-tutorial`

* Select repository `git-tutorial`
* click on `branch` to reveal tags tab.
* select tag `1.0`

`README.md` should be

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
```

## Create Task Branch `feature/1002` from `develop`

While the release 1.0 process was ongoing, the development process had continued.

Edit Project `git-tutorial`, add tasks

* `1002; Feature 1002`

For ticket `1002`, create branch `feature/1002` from `develop`

```
git checkout -b feature/1002 develop
```

Edit `README.md`, only 

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
```

and change to

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
feature/1002
```

and commit.

```
git add .
git commit -m "feature/1002"
git push origin feature/1002
```

### Merge branch `feature/1002` into `develop` branch

```
git checkout develop
git merge --no-ff feature/1002
```

use commit message

```
feature/1002
```

and push to remote

```
git push origin develop
```

To view the branch in Github repository `git-tutorial`

* Select repository `git-tutorial`
* click on `branch` to reveal tags tab.
* select branch `develop`

`README.md` should be

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
feature/1002
```

### Clean up

`git branch -a` to list branches.

Optional, delete local branches

```
git branch -d feature/1002
```

and delete remote branches

```
git push origin --delete feature/1002
```

## Merge release branch `release/1.0` into the `develop` branch

The release branch `release/1.0` now needs to be merged into `develop`. Notice that the `develop` branch already has changes for the future releases.

```
git checkout develop
git merge --no-ff release/1.0
```

which yields the error

```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

To list files in conflict

```
git status
```

which shows `README.md`

Edit `README.md` and resolve the conflicts by changing to

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
feature/1002
release/1.0
bugfix/9101
```

```
git add .
git commit -m "Merge Release 1.0 to develop"
git push origin develop
```

Check `README.md` for branch `develop` in Github repository. Ensure only

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
feature/1002
release/1.0
bugfix/9101
```

### Clean up

`git branch -a` to list branches.

Optional, delete local branches

```
git branch -d release/1.0
```

and keep the remote branch.

## Fix an emergency bug in the production system

Bug has been found in the production system. 

Edit Project `git-tutorial`, add tasks

* `9201; Bug 9201`

Create branch `hotfix/9201` from `master`

```
git checkout -b hotfix/9201 master
```

Edit `README.md`, ensure only

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
```

and change to

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
hotfix/9201
```

which mimics the the fixing of the bug.

Commit and push to remote

```
git commit -a -m "hotfix/9201"
git push origin hotfix/9201
```

### Merge branch `hotfix/9201` into the `master` branch

Now the bug has been fixed, we need to merge back into `master`

```
git checkout master
git merge --no-ff hotfix/9201
```

use commit message

```
hotfix/9201
```

and then push to remote.

```
git push origin master
```

Check github repository, master branch `README.md` should be

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
hotfix/9201
```

### Tag Release 1.0.1

```
git tag -a 1.0.1
```

use commit message

```
Release 1.0.1
```

and then push to remote.

```
git push --follow-tags
or
git push origin 1.0.1
```

To view the tag in Github repository `git-tutorial`

* Select repository `git-tutorial`
* click on `branch` to reveal tags tab.
* select tag `1.0.1`

`README.md` should be

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
hotfix/9201
```

### Merge branch `hotfix/9201` into the `develop` branch

Now the bug has been fixed, we need to merge back into `develop`

```
git checkout develop
git merge --no-ff hotfix/9201
```

use commit message

```
hotfix/9201
```

and then push to remote.

```
git push origin develop
```

Check github repository, master branch `README.md` should be

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
feature/1002
release/1.0
bugfix/9101
hotfix/9201
```

### Clean up

`git branch -a` to list branches.

Optional, delete local branches

```
git branch -d hotfix/9201
```

## Getting specific versions

From history `git hist1`, find the hash for "Release 1.0"

Checkout the code

```
git checkout <hash>
```

and verify `README.md` is

```
task/2001
task/2002
task/2003
feature/2000
devfix/9001
release/1.0
bugfix/9101
```

Checkout another branch resets HEAD

```
git checkout develop
git status
```



