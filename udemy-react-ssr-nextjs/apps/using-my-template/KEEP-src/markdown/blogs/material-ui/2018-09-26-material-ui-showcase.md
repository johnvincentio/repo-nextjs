---

meta-title: "Material-UI Showcase | John Vincent"
meta-description: "Getting started with Material-UI Showcase"
meta-keywords: "Material-UI, TaskMuncher"

title: "Material-UI Showcase"
subtitle: "Adding TaskMuncher to the Material-UI Showcase"
lead: ""

category: [Material-UI, Taskmuncher]
permalink: /material-ui/material-ui-showcase/
---

This article describes how to add TaskMuncher to the Material-UI Showcase.

<!-- end -->

# Contributing to Material-UI

[Material-UI](https://material-ui-next.com/)

[Contributing to Material-UI](https://github.com/mui-org/material-ui/blob/next/CONTRIBUTING.md)

[Material-UI Showcase](https://material-ui.com/discover-more/showcase/)

[Material-UI Releases](https://github.com/mui-org/material-ui/releases)

[Github](https://github.com/mui-org/material-ui)

## Getting Started

Review [Contributing to Material-UI](https://github.com/mui-org/material-ui/blob/next/CONTRIBUTING.md) as there are many rules.

### Fork the Material-UI repository on Github

From [Material-UI Github](https://github.com/mui-org/material-ui), ensure you have `next` branch selected. Issue `Fork` (see top right).

This creates repository `https://github.com/johnvincentio/material-ui`

### Clone your fork to your local machine 

```
cd /Users/jv/Desktop/MyDevelopment/github/material-ui
git clone git@github.com:johnvincentio/material-ui.git
```

### Create a branch

```
cd material-ui
git checkout -b my-topic-branch
```

### Fetch packages

```
yarn
```

### Make your changes 

Added to `docs/src/pages/discover-more/showcase/appList.js`

```
{
	title: 'TaskMuncher',
	description:
		'TaskMuncher is a responsive MERN stack Task Management Productivity Web based application.' +
		'TaskMuncher is the easiest way to get it done, whether you’re making a shopping list, ' + 
		'planning a holiday or managing multiple work projects. ' +
		'Use TaskMuncher to organize and keep track of everything so you can get it all done and enjoy more peace of mind.',
	link: 'https://taskmuncher.com',
	image: 'taskmuncher.png',
	index: 30,
},
```

Copied:

calendar image `taskmuncher.png`

from `https://www.johnvincent.io/images/taskmuncher/app/taskmuncher-app.png`

to `static/images/showcase`

### Lint

```
yarn lint
```

### Save 

```
git status
git add .
git commit -m "added to showcase"
```

### Prettier

May want to run prettier and then check what changes were made.

```
yarn prettier
```

If there were any changes, save them before moving on.


### Push to to GitHub 

```
git push --set-upstream origin my-topic-branch
```

Git replies with

```
remote: Create a pull request for 'my-topic-branch' on GitHub by visiting:
remote:      https://github.com/johnvincentio/material-ui/pull/new/my-topic-branch
```

### Make a Pull Request

Open

```
https://github.com/johnvincentio/material-ui/pull/new/my-topic-branch
```

which is a pull request.

Click on `Create pull request`

Pull request is #14687

```
https://github.com/mui-org/material-ui/pull/14687
```

### Fix Errors

A number of checks are made on the request. If any of them fail, the request will fail.

For example, ci/circleci failed. Details of the failure suggest a yarn lint error.

```
yarn lint
```

revealed the problem. I fixed the problem

* fix the problem
* save
* push

Repeat

```
yarn prettier
```

* save
* push

### Successful Pull Request

When the pull request `https://github.com/mui-org/material-ui/pull/14687` passes all tests, it becomes available to be merged.

`Write access` is required to perform a merge.

### Release

View [Material-UI release info](https://github.com/mui-org/material-ui/releases)

Look for the pull request #14687

### Review

Review [Material-UI Showcase](https://material-ui.com/discover-more/showcase/) to ensure that [TaskMuncher](https://www.taskmuncher.com) has been added to showcase.

For more information about [TaskMuncher](https://www.taskmuncher.com) please see 
[TaskMuncher Overview](/taskmuncher/overview/)


