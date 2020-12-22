---

meta-title: "Responsive Material-UI | John Vincent"
meta-description: "Getting started with Responsive Material-UI"
meta-keywords: "Material-UI, React, Responsive"

title: "Responsive Material-UI"
subtitle: "Getting started with Responsive Material-UI"
lead: ""

category: [Material-UI, React, Responsive]
permalink: /material-ui/material-ui-responsive/
---

This article describes basic usage of Responsive Material-UI.

<!-- end -->

# General

[Material-UI](https://material-ui-next.com/)

[Responsive UI Guidelines](https://material.io/guidelines/layout/responsive-ui.html)

[Basic Layout](https://material-ui-next.com/layout/basics/)

## Breakpoints

An example of how to access breakpoints from the theme.

```
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';

import HomeLayoutStyles from './HomeLayoutStyles';

class HomeLayout extends React.Component {

	render() {
		const { classes, theme } = this.props;
		...
	}
}

HomeLayout.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	theme: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(HomeLayoutStyles, { withTheme: true })(HomeLayout);
```

For example

```
theme.breakpoints.values =
	{xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}
```

Thus

```
xs, extra-small: 0px or larger
sm, small: 600px or larger
md, medium: 960px or larger
lg, large: 1280px or larger
xl, xlarge: 1920px or larger
```

Also see

```
theme.breakpoints.between
theme.breakpoints.down
theme.breakpoints.up
theme.breakpoints.width
```

### Styles

Basic usage, for example

```
const styles = theme => ({
	contentContainer: {
		width: '100%',
		maxWidth: '70%',
		[theme.breakpoints.down('md')]: {
			maxWidth: '85%'
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '95%'
		}
	},
	logo: {
		justifyContent: 'space-between',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center'
		},
		[theme.breakpoints.up('md')]: {
			display: 'none'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			margin: 25%
		}
		...
	},
	iconSearch: {
		[`${theme.breakpoints.up('sm')} and $			{theme.breakpoints.down('md')}`]: {
				margin: 10%
	}
});
```

```
const md = theme.breakpoints.width('md');
```

## Hidden

The rules follow

```
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show
```


Examples follow

```
<Hidden xsDown>
	<Button color="inherit" component={Link} to="/logout">
		Logout
	</Button>
</Hidden>

<Hidden smUp>
	<div>
		<IconButton
			color="inherit"
			aria-label="open drawer"
			onClick={this.handleDrawerToggle}
			className={classes.navIcon}
		>
			<MenuIcon />
		</IconButton>
	</div>
</Hidden>

<Hidden mdUp>
	<Drawer
		variant="temporary"
		anchor="left"
		open={this.state.mobileOpen}
		onClose={this.handleDrawerToggle}
		classes={ {
			paper: classes.drawerPaper
		} }
		ModalProps={ {
			keepMounted: true
		} }
	>
		{drawer}
	</Drawer>
</Hidden>
```

## Responsive

Get the package

```
npm i react-responsive --save
```

Include the package

```
import Responsive from 'react-responsive';
```

Usage, for example

```
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;

render() {
...
	return (
		<Fragment>
			<Desktop>
				<DesktopMain text="DesktopMain" />
			</Desktop>
			<Tablet>
				<TabletMain text="TabletMain" />
			</Tablet>
			<Mobile>
				<MobileMain text="MobileMain" />
			</Mobile>
		</Fragment>
	);
}
```

## MediaQuery

Get the package

```
npm i react-responsive --save
```

Include the package

```
import Responsive from 'react-responsive';
```

Usage, for example

```
import MediaQuery from 'react-responsive';

<MediaQuery maxWidth={580}>
	<div className="header-grid--icon header-icon-parent">
		{this.state.navOpen ? (
			<ButtonIcon
				svgName="cancel"
				cssIcon="close-menu"
				cssButton="header-icon"
				onClick={this.handleClickMenu}
			/>
		) : (
			<ButtonIcon
				svgName="hamburger"
				cssIcon="open-menu"
				cssButton="header-icon"
				onClick={this.handleClickMenu}
			/>
		)}
	</div>
</MediaQuery>

<MediaQuery maxWidth={580}>
	{this.state.navOpen && (
		<div className="header-grid--nav">
			<HeaderNav loggedin={this.props.loggedin} />
		</div>
	)}
</MediaQuery>

<MediaQuery minWidth={580}>
	<div className="header-grid--nav">
		<HeaderNav loggedin={this.props.loggedin} />
	</div>
</MediaQuery>
</header>
```

## Window

The usual techniques are still available. For example

```
function isDesktop() {
	return window.matchMedia('(max-width: 767px)').matches;
}

function isMdUp() {
	return window.matchMedia('(min-width: 960px)').matches;
}
```

with example usage

```
class MemberLayout extends React.Component {
	state = {
		open: !!isMdUp()
	};
```
