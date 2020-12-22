---

meta-title: "Material-UI Styled Components | John Vincent"
meta-description: "Getting started with Material-UI Styled Components"
meta-keywords: "Material-UI, React"

title: "Styling Material-UI components using Styled-Components"
subtitle: "Separating Component and Styling"
lead: ""

category: [Material-UI, React, Styled components]
permalink: /material-ui/material-ui-styled-components/
---

This article describes basic styling of Material-UI components using Styled-Components.

<!-- end -->

# General

[Material-UI](https://material-ui-next.com/)

[Material-UI Styled Components](https://material-ui-next.com/guides/interoperability/#styled-components)

[Styled Components](https://www.styled-components.com/)

## Material-UI Theme

Create a basic theme `themes/themes.js`

```
import { createMuiTheme } from 'material-ui/styles';

import blue from 'material-ui/colors/blue';

const baseTheme = createMuiTheme({
	palette: {
		primary: {
			c100: blue[100],
			c200: blue[200],
			light: blue[300],
			main: blue[500],
			dark: blue[700]
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
	text: {
		home: '#fff',
		main: '#3f5742'
	}
});

export { baseTheme as appTheme };
```

Note the theme is exported as `appTheme`. Thus the theme can be changed without requiring any other changes.

## Component

Example component follows, `Home.jsx`

```
import React from 'react';

import { withStyles } from 'material-ui/styles';

import Any from './Any';
import { HomeStyles, Title, MyButton } from './HomeStyles';

const Home = ({ classes }) => (
	<main className={classes.outer} role="main">
		<Any />
		<Title>App Title</Title>
		<MyButton variant="raised" component={Link} to="/More">
			More...
		</MyButton>
	</main>
);

Home.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(HomeStyles)(Home);
```

## Styling

Styling should be kept separate from the component.

### Using styled-components

Installation

```
npm install styled-components --save
```

Create some styled components, `HomeStyles.jsx`

```
import Button from 'material-ui/Button';

import styled from 'styled-components';

import { appTheme } from '../../themes/themes';

export const Title = styled.h1`
	font-size: 2.3rem;
	font-weight: bold;
	color: ${appTheme.text.home} !important;
	@media screen and (min-width: 580px) {
		font-size: 3.4rem;
	}
`;
```

### Using Material-UI Styles

Style class outer

```
import { appTheme } from '../../themes/themes';

const { topNavLineHeight } = appTheme;

export const HomeStyles = theme => ({
	outer: {
		position: 'relative',
		marginTop: `calc(2 * ${topNavLineHeight}px - 1px)`,
		zIndex: '-100',
		width: '100%',
		margin: '0 auto',
		lineHeight: '1.5em',
		backgroundColor: 'white'
	}
});
```

### Using Material-UI and styled-components

```
import Button from 'material-ui/Button';

import { appTheme } from '../../themes/themes';

const { topNavLineHeight } = appTheme;

export const MyButton = styled(Button)`
	color: ${appTheme.palette.primary.main} !important;
	background-color: ${appTheme.text.home} !important;
	text-transform: uppercase;
	padding: 0.8em 1.7em !important;
	font-size: 1.2em !important;
	font-weight: 700 !important;
	&:hover,
	&:focus {
		cursor: pointer;
		color: ${appTheme.palette.primary.dark} !important;
		background-color: ${appTheme.palette.grey.light} !important;
		boxshadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14),
			0px 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
	}
`;
```
