---
meta-title: "Update TaskMuncher to use React BrowserRouter | John Vincent"
meta-description: "John Vincent's discussion on Update TaskMuncher to use React BrowserRouter"
meta-keywords: "TaskMuncher, React"

title: "Update TaskMuncher to use React BrowserRouter"
subtitle: "Using BrowserRouter rather than HashRouter"
lead: ""

category: [Taskmuncher, React]
permalink: /taskmuncher/update-taskmuncher-v3/
---

Let's discuss updating TaskMuncher to use BrowserRouter rather than HashRouter.

<!-- end -->

# TaskMuncher v3

TaskMuncher V3 also has some changes to address various eslint problems.

For extensive discussions regarding TaskMuncher, please see [TaskMuncher Overview](/taskmuncher/overview/)

## React HashRouter

HashRouter works great. It produces urls with, well, hashes, which some people love and which others love not quite so much. For example

```
https://www.taskmuncher.com/#/starred
```

## Replace with BrowserRouter

Routes will now be of the form

```
https://www.taskmuncher.com/starred
```

which is probably what most users will expect to see.


### Update TaskMuncher

All routes are in `/routes/index.jsx`, which allows for 

* Simple application architecture
* Code that is easy to build and maintain
* Provides for simple code splitting
* Easily allows for components that extend the behavior of routing. For example PrivateRoute and SignedInRoute

To replace HashRouter with BrowserRouter, change

```
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
```

to

```
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
```

#### Anchor

Use of anchor tag now has to refer only to external urls. All else must use the `Link` tag from 'react-router-dom'

For example, changed 

```
<a href="#join">Sign up here</a>
```

to

```
<Link to="/join">Sign up here</Link>
```

#### Node Server

Several emails contained TaskMuncher Urls. `config/email.js` was changed to create Urls without the hash tag.



#### Dev Server

Update `webpack.config.js`, added `publicPath: '/',`

```
if (!PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		publicPath: '/',
		chunkFilename: '[name].bundle.js',
		filename: '[name].bundle.js'
	};
```

Update `webpack.config.js`, added `historyApiFallback: true,`

```
config.devServer = {
		contentBase: DIST_FOLDER,
		compress: false,
		// inline: true,
		port: 8065,
		clientLogLevel: 'info',
		historyApiFallback: true,
		proxy: {
			'/api/**': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				secure: false
			}
		}
	};
```

#### Production Server

The switch to BrowserRouter revealed a basic weakness.

An attempt to access a non-existent endpoint would cause a 404.

Let's fix that.

TaskMuncher nginx config, add 

```
   location / {
      try_files $uri /index.html;
    }
```

after `server_name`, thus

```
    server_name www.taskmuncher.com;

   location / {
      try_files $uri /index.html;
    }
```

# Sidebar

The sidebar menu options are now dynamic and only display if there is data related to the menu option.

# Admin Subsystem

Added delete user for an Admin user.

# Encrypted Passwords

A late change in V2 regarding encrypted passwords caused a problem with Change Password. This was fixed in `api/reset/reset.controller.js`


# Eslint changes

Added to `package.json` scripts section

```
"lint": "eslint 'src/**/*.{js,jsx}' --quiet",
```

Running the command revealed some problems.

## Toggling state

A common problem. Although not causing any problems, the original code is not strictly correct.

For example `MemberMain.jsx`

```
toggleAddGoalDialog = () => this.setState({ addGoalDialogOpen: !this.state.addGoalDialogOpen });
```

should use a callback, thus was changed to

```
toggleAddGoalDialog = () => this.setState(prevState => ({ addGoalDialogOpen: !prevState.addGoalDialogOpen }));
```

or more simply, `HomeLayout.jsx`

```
this.setState({ mobileOpen: !this.state.mobileOpen });
```

was changed to

```
this.setState(prevState => ({ mobileOpen: !prevState.mobileOpen }));
```		

`Contact.jsx`

```
this.setState({	...this.state, ...errors });
```

was changed to

```
this.setState(prevState => ({ ...prevState, ...errors }));
```

## Vulnerability

`npm install` shows

```
found 1 high severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
```

`npm audit` shows

```
Package: webpack-dev-server
High: Missing Origin Validation
More Info: https://nodesecurity.io/advisories/725
```

Advisories are now to be found at `npm`, for example

```
https://www.npmjs.com/advisories/725
```

### Overview

Versions of webpack-dev-server before 3.1.10 are missing origin validation on the websocket server. This vulnerability allows a remote attacker to steal a developer's source code because the origin of requests to the websocket server that is used for Hot Module Replacement (HMR) are not validated.

### Remediation

Update to version 3.1.11 or later.

### The Fix

```
npm install --save-dev webpack-dev-server@3.1.14 
```

## Vulnerability

`npm audit` shows

```
Package: morgan
High: Missing Origin Validation
More Info: https://nodesecurity.io/advisories/736
```

### Overview

Versions of morgan before 1.9.1 are vulnerable to code injection when user input is allowed into the filter or combined with a prototype pollution attack.

### Remediation

Update to version 1.9.1 or later.

### The Fix

```
npm install morgan@1.9.1 
```

## Calendar

Update `react-big-calendar` to the latest version.

```
npm install --save react-big-calendar@0.20.3 
```

Copy the css from 

```
react-big-calendar/lib/css/react-big-calendar.css
```

to

```
components/calendar/react-big-calendar.scss
```

## Material-UI Pickers

`material-ui-pickers` issuing warnings about material-ui deprecations.

Update `material-ui-pickers` to the latest version.

```
npm install --save material-ui-pickers@2.1.2
```

the later version now requires

```
npm install --save @date-io/moment
```

The date pickers require a change from

```
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
```

to

```
import MomentUtils from '@date-io/moment';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
```

