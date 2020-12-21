---
meta-title: "Git Cheat Sheet | John Vincent"
meta-description: "John Vincent's Git Cheat Sheet"
meta-keywords: "Git"
title: "Git Cheat Sheet"
subtitle: "Quick Git Reference"
lead: "Put in one place those pesky Git options."
category: [Git]
permalink: /git/git-options/
---

Git is a distributed version control system (DVCS), also known as decentralized. This means that every developer has a full copy of the repository, which is hosted in the cloud.

<!-- end -->

# Git Options

* [Git Tutorial](/git/git-tutorial/)
* [Git](https://git-scm.com/)
* [Git Docs](https://git-scm.com/docs)

Other guides:

* [Getting git right](https://www.atlassian.com/git)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)

# Git commands

Some very common requirements

## Create local repository

```
git init
git add .
git commit -m "Message"

git status
git branch
git remote add origin git@github.com:{my-github}/{new-repo}.git
git push -u origin master
git remote -v
git log
```

## Usual edit cycle

```
git add .
git commit -m "Message"
git push
```

## git log

```
git log
git log --pretty=oneline
git log --graph --date-order -C -M --pretty=format:"<%h> %ad [%an] %Cgreen%d%Creset %s" --all --date=short
git log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
git log --all --decorate --oneline --graph
git log --graph --abbrev-commit --decorate --date=relative --all
git log --author="johnvincentio"
```

### Clone repository

`git clone url` - Clone repository

Add remote repository reference

```
git remote add origin git@github.com:{my-github}/{NEW_REPO}.git
```

Push files to remote repository

```
git push -u origin master
```

Verify remote repository

```
git remote -v
```

change to new remote:

```
git remote set-url origin https://github.com/{github-user}/{github-project}
```

Show the origin file of each config item.

```
git config --list --show-origin
```

### Clone Branch

Clone master

```
git clone git@github.com:{github-user}/{github-project}
```

Clone branch

```
git clone -b feature_1 git@github.com:{github-user}/{github-project}
```

### Create Feature Branch

Choose a feature branch name that is descriptive, for example:

```
feature/saved-user
```

Create a feature branch

```
cd {git-project-directory}
git checkout -b feature_1
```

Push to remote

```
git push origin feature_1
```

### Edit on Feature Branch

* Create your feature branch (git checkout -b feature_1)
* Commit your changes (git commit -am 'Add some feature')
* Push to the branch (git push origin feature_1)
* Merge or Create a new Pull Request

### Pull Request


### Merge Feature Branch

Ensure feature branch is committed.

```
cd {git-project-directory}
git status
```

Switch to master branch

```
git checkout master
```

Merge feature branch into master

```
git merge feature_1
```

Push to remote master

```
git push origin master
```

Delete the feature branch

```
git branch -d feature_1
```

## git diff

Compare local with remote

```
git difftool
git diff develop:README.md feature1001:README.md
git diff develop feature1001
```

`git diff` - Show differences

`git diff HEAD` - Show difference between working directory and last commit.

`git diff --cached` - Show difference between staged changes and last commit

`git push origin HEAD` - A handy way to push the current branch to the same name on the remote.

`git push origin HEAD --dry-run` - used to try push, do everything except actually send the updates.

## git reset

`git reset` - Reset staging area to match most recent commit, but leave the
working directory unchanged.

`git reset --hard` - Reset staging area and working directory to match most recent
commit and overwrites all changes in the working directory.

`git reset <commit>` - Move the current branch tip backward to <commit>, reset the
staging area to match, but leave the working directory alone.

`git reset --hard <commit>` - Same as previous, but resets both the staging area & working directory to
match. Deletes uncommitted changes, and all commits after <commit>.

## git rebase

`git rebase -i <base>` - Interactively rebase current branch onto <base>. Launches editor to enter
commands for how each commit will be transferred to the new base.

## git pull

`git pull --rebase <remote>` - Fetch the remote’s copy of current branch and rebases it into the local
copy. Uses git rebase instead of merge to integrate the branches.

## git push

`git push <remote> --force` - Forces the git push even if it results in a non-fast-forward merge. Do not use
the --force flag unless you’re absolutely sure you know what you’re doing.

`git push <remote> --all` - Push all of your local branches to the specified remote.

`git push <remote> --tags` - Tags aren’t automatically pushed when you push a branch or use the
--all flag. The --tags flag sends all of your local tags to the remote repo.

## General

`git branch -a` - List branches

`git tag` - view local tags

`git ls-remote --tags origin` - view remote tags

`git checkout -- README.md` - undo changes you made to specific files

`git remote show origin` - show details of repository

# Heroku

For notes regarding git and Heroku, please see [Heroku Notes](/general/heroku-notes/)

## .gitignore

```
node_modules
```

# Trouble

## Remove .DS_Store from git

Ensure `.DS_Store` is in global ignore (see above).

Then remove from git:

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

## Remove .DS_Store

```
find . -name '.DS_Store' -type f -delete
```
