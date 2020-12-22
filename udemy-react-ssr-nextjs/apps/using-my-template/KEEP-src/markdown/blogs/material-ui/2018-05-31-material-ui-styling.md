---
meta-title: "Material-UI Styling | John Vincent"
meta-description: "Getting started with Material-UI Styling"
meta-keywords: "Material-UI, React"

title: "Material-UI Styling"
subtitle: "Getting started with Material-UI Styling"
lead: ""

category: [Material-UI, React]
permalink: /material-ui/material-ui-styling/
---

This article describes basic usage of Material-UI Styling.

<!-- end -->

# General

[Material-UI](https://material-ui-next.com/)

[Styled Components](https://www.styled-components.com/)

## Getting Started with Themes

A standard `index.jsx`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import { baseTheme } from './themes/themes';

import Root from './root/Root'; // your app

import configureStore from './store/configureStore'; // redux
const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={baseTheme}>
			<CssBaseline /> {/* initialize css */}
			<Provider store={store}>
				<Root />
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});
```

`themes/themes.js`

```
import { createMuiTheme } from 'material-ui/styles';

import deepOrange from 'material-ui/colors/deepOrange';
import blue from 'material-ui/colors/blue';

export const baseTheme = createMuiTheme({
	palette: {
		primary: {
			c100: blue[100],
			c200: blue[200],
			light: blue[300],
			main: blue[500],
			dark: blue[700]
		},
		secondary: {
			light: deepOrange[300],
			main: deepOrange[500],
			dark: deepOrange[700]
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500
	},
	anchor: {
		main: blue[500],
		selected: blue[700]
	},
});
```

## Simple Styled Component

Simple example

```
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	anchor: {
		color: theme.anchor.main,
		textDecoration: 'none',
		'&:hover': {
			color: theme.anchor.selected,
			cursor: 'pointer'
		}
	}
});

function Anchor(props) {
	const { classes, theme } = props; // example
	return (
		<a className={props.classes.anchor} href={props.href}>
			{props.text}
		</a>
	);
}

Anchor.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	href: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Anchor);
```

Note that

```
withStyles(styles, { withTheme: true }
```

puts

* styles as classes into props
* theme into props

## `withTheme`

If do not need the styles but only the theme

```
import { withTheme } from 'material-ui/styles'

export default withTheme(MyComponent);
```

will make theme available as a property.

## Using Variables

Styling usually requires common variables, for example a `navbar` line height or a drawer width.

Add them to the theme.

```
...
	anchor: {
		main: blue[500],
		selected: blue[700]
	},
	text: {
		home: '#fff',
		main: '#3f5742'
	},
	drawerWidth: 240,
	topNavLineHeight: 32
});
```

Use these variables, for example

```
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Icon from '../../toolbox/Icon';

import { appTheme } from '../../themes/themes';

const { topNavLineHeight } = appTheme;

const styles = theme => ({
	logo: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center'
		},
		fill: theme.palette.common.white,
		height: `${topNavLineHeight}px`,
		width: `${topNavLineHeight}px`,
		margin: '0 0.5em'
	}
});

function LogoIcon(props) {
	return <Icon name="any" css={props.classes.logo} />;
}

LogoIcon.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles, { withTheme: true })(LogoIcon);
```

## Separating Components and Styles

Styling code in the component code can quickly become unreadable. Let's recode the above example, a simple example to illustrate the point.

`LogoIconStyles.jsx`

```
import { appTheme } from '../../themes/themes';

const { topNavLineHeight } = appTheme;

const LogoIconStyles = theme => ({
	logo: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center'
		},
		fill: theme.palette.common.white,
		height: `${topNavLineHeight}px`,
		width: `${topNavLineHeight}px`,
		margin: '0 0.5em'
	}
});

export default LogoIconStyles;
```

`LogoIcon.jsx`

```
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Icon from '../../toolbox/Icon';
import LogoIconStyles from './LogoIconStyles';

function LogoIcon(props) {
	return <Icon name="any" css={props.classes.logo} />;
}

LogoIcon.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(LogoIconStyles, { withTheme: true })(LogoIcon);
```

## Css Styles

For example

```
import React from 'react';
import PropTypes from 'prop-types';

import './app.css';

const App = () => (
	<div className="main">Hello</div>
);

export default App;
```

`app.css`

```
.main {
  background-color: red;
  height: 300px;
}
```


## Scss Styles

Basic usage, for example

```
import React from 'react';
import PropTypes from 'prop-types';

import './app.scss';

const App = () => (
	<div className="main">Hello</div>
);

export default App;
```

`app.scss`

```
@import '../scss/mixins';

@import '../scss/variables';

@import '../scss/base';

.main {
  background-color: red;
  height: 300px;
}
```

## Styled Components

Installation

```
npm install styled-components --save
```

Basic usage, for example

```
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Title = styled.h2`
	text-align: center;
	margin: 25px 0;
	font-weight: bold;
	font-size: 1.5em;
	line-height: 1.5em;
`;

const Header = styled.h3`
	margin: 20px 0;
`;

const App = ({ classes }) => (

...
```