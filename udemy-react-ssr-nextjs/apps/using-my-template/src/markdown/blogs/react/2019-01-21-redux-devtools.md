---
meta-title: "Redux Dev Tools | John Vincent"
meta-description: "John Vincent's discussion on Redux Dev Tools"
meta-keywords: "React, Redux"

title: "Redux Dev Tools"
subtitle: ""
lead: ""

category: [React, Redux]
permalink: /react/redux-devtools/
---

Converting to use Redux DevTools Extension.

<!-- end -->

# Introduction

[Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

## Chrome Installation

Install Redux DevTools from the [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

An icon should be added to your chrome browser.

## Usage

Use the icon to activate. An in-browser Redux Inspector window is opened. 

In practice, it is best to open a separate window. To do this, click any of the three icons at the bottom left of the panel.

## Debugging

Can store redux state between page refreshes.

For example

```
http://localhost:8002/?debug_session=my1
```

Also can store multiple states, for example

```
http://localhost:8002/?debug_session=my2
```

To return to a saved state, just re-enter the url.

When finished, disable debugging

```
http://localhost:8002
```

## Code

The code now gets much easier

`index.jsx`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './root/Root';

import configureStore from './store/configureStore';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Root />
		</Provider>,
		document.getElementById('root')
	);
});
```

`/store/configureStore.js`

```
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./configureStore.prod');
} else {
	module.exports = require('./configureStore.dev');
}
```

`/store/configureStore.dev.js`

```
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const configureStore = (initialState = {}) => {
	const middleware = [thunk];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;	// eslint-disable-line no-underscore-dangle
	const enhancers = composeEnhancers(
		applyMiddleware(...middleware)
	);
	const store = createStore(rootReducer, initialState, enhancers);
	return store;
};

export default configureStore;
```

`/store/configureStore.prod.js`

```
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../redux/reducers';

const configureStore = (initialState = {}) => {
	const middleware = [thunk];
	const enhancers = [];
	const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
	return store;
};

export default configureStore;
```

`Root.jsx` is now the same for development and production.

## Converting From redux-devtools

Remove packages

```
redux-devtools
redux-devtools-log-monitor
redux-devtools-dock-monitor
```