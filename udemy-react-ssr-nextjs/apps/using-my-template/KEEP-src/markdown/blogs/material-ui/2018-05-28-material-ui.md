---

meta-title: "Material-UI | John Vincent"
meta-description: "Getting started with Material-UI"
meta-keywords: "Material-UI, React, Google"

title: "Material-UI"
subtitle: "Getting started with Material-UI"
lead: ""

category: [Material-UI, React]
permalink: /material-ui/material-ui/
---

This article describes how to configure Material-UI and some basic usage.

<!-- end -->

# General

[Material-UI](https://material-ui-next.com/)

[Typography](https://material-ui-next.com/style/typography/#general)

[Font Icons](https://material-ui-next.com/style/icons/#font-icons)

[Github](https://github.com/mui-org/material-ui)

## Releases

Material-UI is a fast moving ecosystem. For release information

* go to [Github](https://github.com/mui-org/material-ui)
* Releases
* Scan through the releases, there are so many.

# Installation

[Material-UI Installation](https://material-ui-next.com/getting-started/installation/)

Install the package:

```
npm install --save material-ui@next
```

Handle Roboto Font

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

or, not recommended

```
npm install typeface-roboto --save

and

import 'typeface-roboto'
```

Handle Font Icons

```
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

SVG Icons

```
npm install --save material-ui-icons
```

# Quick Start

```
npm install --save material-ui@next
```

`index.html`

```
<!DOCTYPE html>
<html>

<head>
	<title>My App</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
</head>

<body>
	<div id="app"></div>
</body>

</html>
```

```
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';

function App() {
  return (
    <Button variant="raised" color="primary">
      Hello World
    </Button>
  );
}

render(<App />, document.getElementById('app'));
```

## `withStyles`

```
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	card: {
		width: '300px',
		// maxWidth: 400,
		margin: '15px',
		position: 'relative'
	}
});

render() {
	const { classes } = this.props;

<Icon name="register" css={classes.drawerIcon} />

HomeAppBar.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(HomeAppBar);
```

```
export default compose(withStyles(styles), connect(mapStateToProps))(HomeAppBar);
```


## `withStyles`, external Styles

```
import { withStyles } from 'material-ui/styles';

import HomeLayoutStyles from './HomeLayoutStyles';

render() {
	const { classes } = this.props;

<Icon name="register" css={classes.drawerIcon} />

HomeAppBar.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(HomeLayoutStyles)(HomeAppBar);
```

```
export default compose(withStyles(HomeLayoutStyles), connect(mapStateToProps))(HomeAppBar);
```

## `withTheme`

```
render() {
	const { theme } = this.props;
		
TaskDialog.propTypes = {
	theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles, { withTheme: true })(HomeAppBar);
```

```
export default compose(withStyles(HomeLayoutStyles, { withTheme: true }), connect(mapStateToProps))(HomeLayout);
```

## `withWidth`

```
import { compose } from 'redux';

import withWidth from 'material-ui/utils/withWidth';

<Typography variant="subheading">Current width: {this.props.width}</Typography>

HomeLayout.propTypes = {
	width: PropTypes.string.isRequired
};

export default compose(withWidth(), withStyles(HomeLayoutStyles, { withTheme: true }))(HomeLayout);
```

## `withRouter`

Access the location, history and match objects:

```
import { withRouter } from 'react-router-dom';

export default withRouter(compose(withStyles(SidebarStyles), connect(mapStateToProps, mapDispatchToProps))(Sidebar));

render() {
	const { classes, location, history, match } = this.props;
	const pathname = location && location.pathname ? location.pathname : '';

Sidebar.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};
```

Use the history object:

```
handleLink = () => {
	const { id } = this.props;
	this.props.history.push(`/goal/${id}`);
	this.handleClose();
};
```

Use the match object:

```
const { param } = this.props.match.params;

MemberMain.propTypes = {
	match: matchType.isRequired, // eslint-disable-line react/no-typos
};

export const matchType = PropTypes.shape({
	match: PropTypes.any
});
```

or more exactly:

```
export const matchType = PropTypes.shape({
	isExact: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	params: PropTypes.any.isRequired
});
```

## With Redux

Use an action:

```
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import * as actions from '../../actions/';

this.props.actions.moveUserObject(from, to, insertBefore);

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(ListTask);
```

Get object from redux:

```
render() {
	const { goals } = this.props;

HomeMain.propTypes = {
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(HomeMain);

```

### Use `withStyles`

```
export default compose(withStyles(styles), connect(null, mapDispatchToProps))(ProjectCard);
```

### Use `withStyles` and `withTheme`

```
export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(
	TaskDialog
);
```







## classnames

General form

```
import classNames from 'classnames';

<Tag classname=classNames('some className', {
	addThisClassToo: someExpression,
	addThisClassToo: someExpression,
	});
...
</Tag>
```

```
<IconButton
	className={classNames(classes.expand, classes.smallIcon, {
		[classes.expandOpen]: this.state.expanded
	})}
	onClick={() => this.toggleTasks()}
	aria-expanded={this.state.expanded}
	aria-label="Show more"
>
	{this.state.listTasks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
</IconButton>
```

```	
<AppBar
className={classNames(classes.appBar, {
	[classes.appBarShift]: open,
	[classes[`appBarShift-${anchor}`]]: open
	})}
```

```
<IconButton
	color="inherit"
	aria-label="open drawer"
	onClick={this.handleDrawerOpen}
	className={classNames(classes.menuButton, open && classes.hide)}
>
	<MenuIcon />
</IconButton>	
```

```
<Toolbar
	className={classNames(classes.root, {
		[classes.highlight]: numSelected > 0
	})}
>
```

```
const styles = theme => ({
	margin: {
		margin: theme.spacing.unit
	},
	textField: {
		flexBasis: 200
	}
});

className={classNames(classes.margin, classes.textField)}
```
