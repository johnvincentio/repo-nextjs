---
meta-title: "Basic React Redux | John Vincent"
meta-description: "John Vincent's discussion on Basic React Redux"
meta-keywords: "React, Redux"

title: "Basic React Redux"
subtitle: "Using React Redux"
lead: ""

category: [React, Redux]
permalink: /react/basic-react-redux/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# React Redux

[Redux](http://redux.js.org/)

[npm react-redux](https://www.npmjs.com/package/react-redux)

[npm redux](https://www.npmjs.com/package/redux)

[npm redux-thunk](https://www.npmjs.com/package/redux-thunk)

[redux-thunk](https://github.com/gaearon/redux-thunk)

[npm http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)

[npm isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch)

[Fetch](https://github.github.io/fetch/)

[Webpack Dev Server Proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy)

[Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)

## React Redux Docs

[React Training](https://reacttraining.com/react-router/web/example/basic)

[React In-Depth](https://developmentarc.gitbooks.io/react-indepth/content/)

[Dan Abramov](https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions)

## Prestudy

This article requires some know-how. Please see:

[React/Redux Node/Express Ecosystem](/react/react-redux-node-express-ecosystem/)

[Basic React](/react/basic-react/)

## Hot Cold Application

Previous articles describe the setup and the ecosystem. This article discusses some key features.

`client/src/index.jsx`

In particular, notice the store.

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './store';

// eslint-disable-next-line import/no-named-as-default
import Game from './components/Game';

const initialState = {};
const store = createStore(initialState);

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Game />
		</Provider>,
		document.getElementById('root'),
	);
});
```

`client/src/store.js`

Notice the reducers and the middleware.

```
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import makeRootReducer from './reducers/';

export default (initialState = {}) => {
	const middleware = [thunk];
	const enhancers = [];
	const store = createStore(
		makeRootReducer,
		initialState,
		compose(
			applyMiddleware(...middleware),
			...enhancers,
		),
	);
	return store;
};
```

### Combine Reducers

`client/src/reducers/index.js`

Notice the reducers are combined.

```
import { combineReducers } from 'redux';

import help from './help.reducer';
import board from './board.reducer';
import fetchTopScore from './fetchTopScore.reducer';

const rootReducer = combineReducers({
	helpReducer: help,
	boardReducer: board,
	fetchTopScoreReducer: fetchTopScore,
});

export default rootReducer;
```

### Combine Actions

`client/src/actions/index.js`

```
export * from './board.actions';
export * from './help.actions';
export * from './sendGameScore.actions';
export * from './fetchTopScore.actions';
```

### Help Action and Reducer

Notice how the action defines the method and its signature.

`client/src/actions/help.actions.js`

```
import {
	HELP,
	DISMISS_HELP,
} from '../constants/action.types';

export const handleHelp = () => ({
	type: HELP,
});

export const handleDismissHelp = () => ({
	type: DISMISS_HELP,
});
```

Notice how the reducer handles the state of the help property.

`client/src/reducers/help.reducer.js`

```
import {
	HELP,
	DISMISS_HELP,
} from '../constants/action.types';

const initialState = {
	help: false,
};

function help(state = initialState, action) {
	switch (action.type) {
	case HELP: {
		return { help: true };
	}
	case DISMISS_HELP: {
		return { help: false };
	}
	default:
		return state;
	}
}

export default help;
```

### Board Action and Reducer

`client/src/actions/board.actions.js`

```
import {
	NEW_GAME,
	USER_GUESSED_NUMBER,
} from '../constants/action.types';

export const handleNewGame = () => ({
	type: NEW_GAME,
});

export const userGuessedNumber = guess => ({
	type: USER_GUESSED_NUMBER,
	guess,
});
```

Notice the various patterns for altering state.

```
import {
	USER_GUESSED_NUMBER,
	NEW_GAME,
} from '../constants/action.types';

import Utils from '../utils';

// eslint-disable-next-line no-mixed-operators
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialState = {
	guessed: [],
	comment: 'Make your Guess!',
	random: 0,
	completed: false,
};

function board(state = initialState, action) {
	switch (action.type) {
	case USER_GUESSED_NUMBER: {
		const comment = Utils.handleComment(state.random, action.guess);
		const completed = state.random === action.guess;
		if (action.guess > 0 && action.guess < 101) {
			return Object.assign({}, state, {
				guessed: [...state.guessed, action.guess],
				comment,
				completed,
			});
		}
		return Object.assign({}, state, {
			comment,
		});
	}
	case NEW_GAME: {
		return Object.assign({}, initialState, {
			random: randomInteger(1, 100),
		});
	}

	default: {
		return state;
	}
	}
}

export default board;
```

### Fetch Top Score Action and Reducer

`client/src/actions/fetchTopScore.actions.js`

Notice:

* `fetchScore` will issue the asynchronous request to `/api/score/get`
* the error handling
* `fetchScoreSuccess` and `fetchScoreError` are both defined as actions.

```
import {
	FETCH_SCORE_SUCCESS,
	FETCH_SCORE_ERROR,
} from '../constants/action.types';

export const fetchScoreSuccess = score => ({
	type: FETCH_SCORE_SUCCESS,
	score,
});

export const fetchScoreError = error => ({
	type: FETCH_SCORE_ERROR,
	error,
});

export const fetchScore = () => (dispatch) => {
	const url = '/api/score/get';
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response;
		})
		.then(response => response.json())
		.then(data => dispatch(fetchScoreSuccess(data.score)))
		.catch(error => dispatch(fetchScoreError(error)));
};
```

`client/src/reducers/fetchTopScore.reducer.js`

Notice:

* initial state = 999
* error state = 99
* success sets the state from the server.

```
import {
	FETCH_SCORE_SUCCESS,
	FETCH_SCORE_ERROR,
} from '../constants/action.types';

const initialState = {
	best: 999,
};

function fetchTopScore(state = initialState, action) {
	switch (action.type) {
	case FETCH_SCORE_SUCCESS: {
		return Object.assign({}, state, {
			best: action.score,
		});
	}

	case FETCH_SCORE_ERROR: {
		return Object.assign({}, state, {
			best: 99,
		});
	}
	default: {
		return state;
	}
	}
}

export default fetchTopScore;
```

### Send Score Action

`client/src/actions/sendGameScoreScore.actions.js`

Notice:

* there is no reducer.
* post Json data using `body: JSON.stringify({ score })`
* no real error handling as the error is not important.

```
/* eslint-disable import/prefer-default-export */
export const sendScore = score => () => {
	// console.log(`sendScore, score = ${score}`);
	const data = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
		method: 'POST',
		body: JSON.stringify({ score }),
	};
	// console.log(data);
	const url = '/api/score/send';
	return fetch(url, data)
		.then((response) => {
			if (!response.ok) {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response;
		})
		/* eslint-disable no-console */
		.then((success) => { console.log(success); })
		.catch(error => console.log(error));
};
```


