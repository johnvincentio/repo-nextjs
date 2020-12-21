---
meta-title: "Basic React Testing with Jest and Enzyme | John Vincent"
meta-description: "John Vincent's discussion on Basic React Testing with Jest and Enzyme"
meta-keywords: "React, Jest, Enzyme"

title: "Basic React Testing with Jest and Enzyme"
subtitle: ""
lead: ""

category: [React, Jest, Enzyme]
permalink: /react/jest-enzyme/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Introduction

[Jest](https://jestjs.io/)

[Enzyme](https://airbnb.io/enzyme/)

[Github Enzyme](https://github.com/airbnb/enzyme)

```
npm i jest  --save-dev

npm i babel-jest babel-core@^7.0.0-0 --save-dev
npm i react-test-renderer --save-dev
npm i enzyme enzyme-adapter-react-16 --save-dev
```

## Visual Studio Code Debugging

For details, see [Debugging React with Enzyme and Jest](/visual-studio-code/)

## Configuration

Add to `package.json`

```
"jest": {
	"roots": [
		"<rootDir>/src/",
		"<rootDir>/tests/__tests__/"
	],
	"testRegex": "./tests/__tests__/.*.(js|jsx)$",
	"setupTestFrameworkScriptFile": "<rootDir>/tests/setupTests.js",
	"testPathIgnorePatterns": [
		"<rootDir>/tests/__tests__/setup/"
	],
	"moduleNameMapper": {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/fileMock.js",
		"\\.(css|less|scss)$": "<rootDir>/tests/__mocks__/styleMock.js"
	}
}
```

* Mocks images using `src/tests/__mocks__/fileMock.js`
* Mocks css, less, scss with `src/tests/__mocks__/styleMock.js`

Create `src/tests/__mocks__/fileMock.js`

```
module.exports = 'test-file-stub';
```

Create `src/tests/__mocks__/styleMock.js `

```
module.exports = {};
```

Create `src/tests/setupTests.js`

```
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
```

Create Test code in `src/tests/__tests__`

### Alternative Configuration

I prefer all testing code to be separate.

Choose:

* `tests/__tests__` for test code
* `tests/__mocks__` for mock code


Add to `package.json`

```
"jest": {
	"roots": [
		"<rootDir>/src/",
		"<rootDir>/tests/__tests__/"
	],
	"testRegex": "./tests/__tests__/.*.(js|jsx)$",
	"setupTestFrameworkScriptFile": "<rootDir>/src/setupTests.js",
	"testPathIgnorePatterns": [
		"<rootDir>/tests/__tests__/setup/"
	],
	"moduleNameMapper": {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/fileMock.js",
		"\\.(css|less|scss)$": "<rootDir>/tests/__mocks__/styleMock.js"
	}
},
```

## Test Categories

Focus on the following categories

* smoke-test
* content
* properties-state
* callbacks-events

### Simple Template

```
/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Feedback } from '../../../src/components';

describe('<Feedback />', () => {
	const text = 'Almost got it right';

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<Feedback feedback={text} />);
		});
	});

	describe('properties-state', () => {
	});

	describe('callbacks-events', () => {
	});
		
	describe('content', () => {
	});
});
```

## Run Specific Tests

`describe.only` will not limit tests.

To limit tests to a specific `describe`

```
npm test -- -t '<Help />'
```

where '<Help />' is a label for a specific test suite, for example

```
describe('<Help />', () => {
```

To limit tests within a test suite

```
it.only
```

## Create Tests

Create Test code in `/tests/__tests__`

### Simple Example

Component `src/components/Feedback.jsx`

```
import React from 'react';
import PropTypes from 'prop-types';

import './feedback.scss';

const Feedback = props => <h2 className="feedback-title">{props.feedback}</h2>;

Feedback.propTypes = {
	feedback: PropTypes.string.isRequired
};

export default Feedback;
```

Test Suite `tests/__tests__/components/Feedback.jsx`

```
/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Feedback } from '../../../src/components';

describe('<Feedback />', () => {
	const text = 'Almost got it right';

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<Feedback feedback={text} />);
		});
	});

	describe('properties-state', () => {
		it('Renders h2', () => {
			const wrapper = shallow(<Feedback feedback={text} />);
			expect(wrapper.find('h2').text()).toEqual(text);
		});
	});

	describe('content', () => {
		it('Renders classname feedback-title', () => {
			const wrapper = shallow(<Feedback feedback={text} />);
			expect(wrapper.hasClass('feedback-title')).toEqual(true);
		});
	});
});
```

Note

* Use of `find`
	* `expect(wrapper.find('h2').text()).toEqual(text)`
* Use of `hasClass`
	* `expect(wrapper.hasClass('feedback-title')).toEqual(true)`

### Callback

Component `src/components/Navigation`

```
import React from 'react';
import PropTypes from 'prop-types';

import './navigation.scss';

export default function Navigation(props) {
	return (
		<header className="navigation">
			<nav>
				<ul className="clearfix">
					<li>
						<button onClick={props.toggleHelp}>What?</button>
					</li>
					<li>
						<button onClick={props.toggleGame}>+ New Game</button>
					</li>
				</ul>
			</nav>
			<h1>HOT or COLD</h1>
		</header>
	);
}

Navigation.propTypes = {
	toggleHelp: PropTypes.func.isRequired,
	toggleGame: PropTypes.func.isRequired
};
```

Tests

```
describe('callbacks-events', () => {
	describe('help button', () => {
		it('Find the button', () => {
			const wrapper = shallow(<Navigation toggleHelp={toggleHelp} toggleGame={toggleGame} />);
			expect(
				wrapper
					.find('button')
					.first()
					.text()
			).toEqual('What?');
		});
		it('Fire the button', () => {
			const callback = jest.fn();
			const wrapper = shallow(<Navigation toggleHelp={callback} toggleGame={toggleGame} />);
			expect(callback).not.toHaveBeenCalled();
			wrapper
				.find('button')
				.first()
				.simulate('click');
			expect(callback).toHaveBeenCalled();
		});
	});
```


### Useful Syntax

```
expect(wrapper.find('button').first().text()).toEqual('What?');			
```

### Example

Component `src/components/GuessForm.jsx`

```
import React from 'react';
import PropTypes from 'prop-types';

import './guessForm.scss';

export default class GuessForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAnswer: false
		};
	}

	handleGuess = () => {
		const input = this.guessInput.value;
		if (input === '?') {
			this.toggleAnswer();
			return;
		}

		const guess = parseInt(input, 10);
		if (!Number.isNaN(guess)) {
			const num = guess * 1;
			if (num > 0 && num < 100) {
				this.props.handleGuess(num);
			}
		}
		this.guessInput.value = '';
	};

	toggleAnswer() {
		this.setState({ showAnswer: !this.state.showAnswer });
	}

	render() {
		return (
			<div>
				{!this.props.victory && (
					<form className="guessForm" onSubmit={e => e.preventDefault()}>
						<input
							type="text"
							name="userGuess"
							id="userGuess"
							className="text"
							maxLength="3"
							autoComplete="off"
							placeholder="Enter your Guess"
							ref={input => {
								this.guessInput = input;
							}}
							autoFocus
						/>
						<button onClick={this.handleGuess}>Guess</button>
					</form>
				)}
				{this.state.showAnswer && <p>Answer is {this.props.answer}</p>}
			</div>
		);
	}
}

GuessForm.propTypes = {
	handleGuess: PropTypes.func.isRequired,
	answer: PropTypes.number.isRequired,
	victory: PropTypes.bool.isRequired
};
```

Test `__tests__/components/GuessForm.jsx`

```
//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { GuessForm } from '../../../src/components';

describe('<GuessForm />', () => {
	const handleGuess = jest.fn();
	const answer = 79;
	const victory = false;

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />);
		});
	});

	describe('content', () => {
		it('Renders classname guessForm', () => {
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />
			);
			expect(wrapper.find('form').hasClass('guessForm')).toEqual(true);
			expect(wrapper.find('p').exists()).toBeFalsy();
		});
	});

	describe('properties-state', () => {
		it('Check state', () => {
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />
			);
			expect(wrapper.state().showAnswer).toEqual(false);
		});

		it('Victory found', () => {
			const truth = true;
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={truth} />
			);
			expect(wrapper.find('form').exists()).toBeFalsy();
		});

		it('Find the button', () => {
			const wrapper = shallow(
				<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />
			);
			expect(wrapper.find('button').text()).toEqual('Guess');
		});
	});

	describe('callbacks-events', () => {
		it('Find the button', () => {
			const callback = jest.fn();
			mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			expect(callback).not.toHaveBeenCalled();
		});

		it('Fire the button', () => {
			const callback = jest.fn();
			const wrapper = mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			const value = 10;
			wrapper.find('input[type="text"]').instance().value = value;
			expect(wrapper.find('button').text()).toEqual('Guess');
			wrapper.find('button').simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(value);
		});

		it('Should reset input', () => {
			const callback = jest.fn();
			const wrapper = mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			const input = wrapper.find('input[type="text"]');
			input.instance().value = 10;
			wrapper.find('button').simulate('click');
			expect(input.instance().value).toEqual('');
		});

		it('Ask for Help', () => {
			const callback = jest.fn();
			const wrapper = mount(<GuessForm handleGuess={callback} answer={answer} victory={victory} />);
			expect(wrapper.find('p').exists()).toBeFalsy();
			wrapper.find('input[type="text"]').instance().value = '?';
			wrapper.find('button').simulate('click');
			expect(callback).not.toHaveBeenCalled();
			expect(wrapper.state().showAnswer).toEqual(true);
			expect(wrapper.find('p').exists()).toBeTruthy();

			wrapper.find('button').simulate('click');
			expect(callback).not.toHaveBeenCalled();
			expect(wrapper.state().showAnswer).toEqual(false);
			expect(wrapper.find('p').exists()).toBeFalsy();
		});
	});
});
```

Note

* `React.Fragment` was not working
* Properties need to be provided
* Functions can be mocked using `jest.fn()`
