---
meta-title: "Basic React | John Vincent"
meta-description: "John Vincent's discussion on Basic React"
meta-keywords: "React"

title: "Basic React"
subtitle: "Using React"
lead: ""

category: [React]
permalink: /react/basic-react/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# React

[Facebook React](https://facebook.github.io/react/)

Installed React Developer Tools extension into Chrome

## React Docs

[Quick Start](https://facebook.github.io/react/docs/installation.html)

[User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents)

[React Training](https://reacttraining.com/react-router/web/example/basic)

## Basic

To allow your app to render efficiently, React uses a technology called the virtual DOM.

The virtual DOM stores a copy of your current DOM in memory. When your app's data changes, it calculates which parts of the DOM need to be altered, and only updates these elements.

This makes React user interfaces update very quickly, even for large, complex apps.

## Create Hello World Application

```
cd repo-react
mkdir facebook
cd facebook

npm init
npm install -save create-react-app

edit package.json:
    "create-app": "./node_modules/.bin/create-react-app my-app",

npm run create-app
cd my-app
npm start

view in browser:
http://localhost:3000/
```

Or, can install create-react-app globally

```
cd repo-react/facebook/hello-world
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```

edit `my-app/src/index.js`

```
replace:
ReactDOM.render(<App />, document.getElementById('root'));

with:
ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById('root')
);
```

```
http://localhost:3000/

shows Hello World!
```

# React Starter

```
cd /Users/jv/Desktop/MyDevelopment/github/repo-react/thinkful
git clone https://github.com/oampo/thinkful-react-starter thinkful-react-starter 

cd thinkful-react-starter
rm -rf .git
npm install

make the code changes

npm run dev

http://localhost:8080
```

## ESLint

[Mac Visual Studio Code](/visual-studio-code/)

```
cd thinkful-react-starter

edit package.json
"devDependencies": {
"eslint": "^3.19.0",
"eslint-config-airbnb": "^15.0.1",
"eslint-plugin-jsx-a11y": "^5.0.3",
"eslint-plugin-import": "^2.2.0",
"eslint-plugin-react": "^7.0.1"
}

npm install
```

Create `.eslintrc.json` in `thinkful-react-starter`

```
{
  "env": {
    "node": true,
    "browser": false,
    "es6": true
  },
  "globals": {
  },
  "rules": {
    "eqeqeq": 1,
    "no-console": "off"
  },
  "plugins": [
  ],
   "extends": "airbnb"
}
```

## 1.1.3 - React Components

React applications are made up of components. You can think of components as the building blocks of your application.

```
cd /Users/jv/Desktop/MyDevelopment/github/repo-react/thinkful/1.1.3
git clone https://github.com/oampo/thinkful-react-starter react-trello

cd react-trello
rm -rf .git
```

Configure ESLint as in previous section.

```
npm install

make the code changes

npm run dev

http://localhost:8080
```



```
cd repo-react/1.1.3
git clone https://github.com/oampo/thinkful-react-starter react-trello
cd react-trello
npm install
npm run dev
```

* Server is running at http://localhost:8080
* Automatically rebuilds when any of your files change

## Stateless

`index.html`

```
<!doctype HTML>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>React Starter</title>

<link rel="stylesheet" href="css/index.css">

<!-- Your HTML goes here -->

<div id="app"></div>

<script src="js/index.js"></script>
```

`js/index.js`

```
require('babel-polyfill');

import React from 'react';
import ReactDOM  from 'react-dom';

import Board from './components/board';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(<Board />, document.getElementById('app'))
);
```

`js/components/board.js`

```
import React from 'react';
import List from './list';

export default function Board() {
    const list = [];
    for (let i=0; i<3; i++) {
        list.push(<List />);
    }

    return (
        <div className="list">
            {list}
        </div>
    );
}
```

`js/components/list.js`

```
import React from 'react';
import Card from './card';

export default function List() {
    const cards = [];
    for (let i=0; i<3; i++) {
        cards.push(<Card />);
    }
    return (
        <div className="list">
            {cards}
        </div>
    );
}
```

`js/components/card.js`

```
import React from 'react';

export default function Card() {
    return (
        <div>This is a card</div>
    );
}
```

## Props

For example

```
export default function Person(props) {
    return (
        <div className="person">
            <div className="person-name">{props.name}</div>
            <img className="person-img" src={props.imageUrl} />
            <div className="person-job">
                {props.job}
            </div>
        </div>
    );
}
```

```
export default function PersonList() {
    return (
        <div className="person-list">
            <Person name="Derek Zoolander"
                    imageUrl="https://scontent.cdninstagram.com/t51.2885-19/11377856_626372960798542_1396263462_a.jpg"
                    job="Male model" />
            <Person name="Donald Knuth"
                    imageUrl="http://www-cs-faculty.stanford.edu/~uno/don.gif"
                    job="Clever chap" />
        </div>
    );
}
```

## `defaultProps`

Default value that is used if an alternative isn't supplied when rendering the component.

```
defaultProps

Person.defaultProps = {
    imageUrl: 'http://www.gravatar.com/avatar/?d=identicon'
};
```

## State

The state is an object that is stored as part of a component and can be updated by the component itself. As you might have guessed from the name, only stateful components can contain state. Stateless components can only be manipulated by changing the props passed to them.

## 1.1.4 Add Props

`index.html`

```
<!doctype HTML>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>React Starter</title>

<link rel="stylesheet" href="css/index.css">

<!-- Your HTML goes here -->

<div id="app"></div>

<script src="js/index.js"></script>
```

`js/index.js`

```

import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';

require('babel-polyfill');

function createId() {
  return Math.floor(Math.random() * 100000);
}

const data = [
  { id: createId(), title: 'board-title1' },
  { id: createId(), title: 'board-title2' },
  { id: createId(), title: 'board-title3' },
];

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Board title="Board Name from index.js" lists={data} />,
    document.getElementById('app'),
  ),
);
```

`board.js`

```

import React from 'react';
import List from './list';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  createId() {
    return Math.floor(Math.random() * 100000);
  }

  render() {
    const jv = this.props.lists.map((item, idx) => {
      const title=`title-list-${idx + 1}`;
      const cards = [
        { id: this.createId(), text: `${title}-card1` },
        { id: this.createId(), text: `${title}-card2` },
        { id: this.createId(), text: `${title}-card3` },
      ];
      return (
        <div key={this.createId()}>
          <h2>Board title: {item.title}</h2>
          <List title={title} cards={cards} />
        </div>
      );
    });

    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className="list">
          {jv}
        </div>
      </div>
    );
  }
}
```

`list.js`

```

import React from 'react';
import Card from './card';

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  createId() {
    return Math.floor(Math.random() * 100000);
  }

  render() {
    const jv = this.props.cards.map((item, idx) => {
      return (
        <div key={this.createId()}>
          <Card text={item.text} />
        </div>
      );
    });

    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="card-list">
          {jv}
        </div>
      </div>
    );
  }
}
```

`card.js`

```

import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}
```

## 1.1.4 Props - Alternative

`js/index.js`

```
require('babel-polyfill');

import React from 'react';
import ReactDOM  from 'react-dom';

import Board from './components/board';

function createId() {
    return Math.floor(Math.random() * 100000);
}

const data = [
    {
        id: createId(),
        title: 'title-1',
        list: {
            id: createId(),
            title: 'list-title-1',
            cards: [
                {id: createId(), text: '1-card1'},
                {id: createId(), text: '1-card2'},
                {id: createId(), text: '1-card3'},                   
            ]
        }
    },
    {
        id: createId(),
        title: 'title-2',
        list: {
            id: createId(),
            title: 'list-title-2',
            cards: [
                {id: createId(), text: '2-card1'},
                {id: createId(), text: '2-card2'},
                {id: createId(), text: '2-card3'},
                {id: createId(), text: '2-card4'}, 
            ]
        }
    }
];

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(<Board title="Board Name from index.js" lists={data} />, document.getElementById('app'))
);
```

`js/components/board.js`

```
import React from 'react';
import List from './list';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const jv = this.props.lists.map((item, idx) => {
            return (
                <div key={item.id}>
                    <h3 className="each board">Board title: {item.title}</h3>
                    <List title={item.list.title} cards={item.list.cards} />
                </div>
            )
        });
        return (
            <div key={this.props.id}>
                <h2>Board main title: {this.props.title}</h2>
                {jv}
            </div>
        );
    }
}
```

`js/components/list.js`

```
import React from 'react';
import Card from './card';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const jv = this.props.cards.map((item, idx) => {
            return (
                <div key={item.id}>
                    <Card text={item.text}/>
                </div>
            )
        });
        return (
            <div>
                {jv}
            </div>
        );
    }
}
```

`js/components/card.js`

```
import React from 'react';

export default class Card extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.text}</div>
        );
    }
}
```

## 1.1.5 Communicating between Components

It is possible to pass data from a parent component to a child using props. But what if you want to communicate in the other direction? For example, how could a Button component tell its parent that it has been clicked?

The answer is through callbacks, passed through props.

`js/components/list.js`

```

import React from 'react';
import Card from './card';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createId() {
    return Math.floor(Math.random() * 100000);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`A name was submitted: ${this.state.value}`);
  }

  handleChange(event) {
    console.log('handlechange');
    this.setState({ value: event.target.value });
  }

  render() {
    const jv = this.props.cards.map((item) => (
        <div key={this.createId()}>
          <Card text={item.text} />
        </div>
      ));

    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="card-list">
          {jv}
        </div>
        <form id="js--submit" onSubmit={this.handleSubmit}>
          <div className="js--error-msg form-error" />
          <div>
              <input id="card" name="card" type="text" required placeholder="Card" 
                      value={this.state.value} onChange={this.handleChange} />
          </div>
          <button className="submit-button" type="submit">Add Card</button>
        </form>
      </div>
    );
  }
}
```

## 1.1.6 Where State Should Live

Use a `ListContainer`

`js/components/board.js`

```
import React from 'react';
import ListContainer from './list-container';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  createId() {
    return Math.floor(Math.random() * 100000);
  }

  render() {
    const jv = this.props.lists.map((item, idx) => {
      const title=`title-list-${idx + 1}`;
      const cards = [
        { id: this.createId(), text: `${title}-card1` },
        { id: this.createId(), text: `${title}-card2` },
        { id: this.createId(), text: `${title}-card3` },
      ];
      return (
        <div key={this.createId()}>
          <h2>Board title: {item.title}</h2>
          <ListContainer title={title} cards={cards} />
        </div>
      );
    });

    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className="list">
          {jv}
        </div>
      </div>
    );
  }
}
```

`js/components/list-container.js`

```
import React from 'react';
import List from './list';

export default class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log('--- ListContainer(constructor)');
    this.state = {
      value: '',
      cards: ['aaa', 'bbb'],
    };
    this.handleChange = this.onAddInputChanged.bind(this);
    this.handleSubmit = this.onAddSubmit.bind(this);
  }

  onAddSubmit(event) {
    event.preventDefault();
    console.log(`>>> list-container::onAddSubmit; A name was submitted: ${this.state.value}`);
//        this.state.cards.push(this.state.value);
    const tmp = this.state.cards;
    tmp.push(this.state.value);
        // tmp.push('zzz');
    this.setState({ cards: tmp });
    console.log(this.state.cards);
    console.log('<<< list-container::onAddSubmit');
  }

  onAddInputChanged(event) {
    console.log(`(list-container) onAddInputChanged; value ${event.target.value}`);
    this.setState({ value: event.target.value });
//    this.state.value = event.target.value;
  }

  render() {
    console.log('--- list-container:render');
    return (
      <List
        cards={this.state.cards}
        onAddInputChanged={this.handleChange}
        onAddSubmit={this.handleSubmit}
      />
    );
  }
}
```

`js/components/list.js`

```
import React from 'react';
import Card from './card';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.props.onAddInputChanged.bind(this);
    this.handleSubmit = this.props.onAddSubmit.bind(this);
  }

  render() {
    const jv = this.props.cards.map((item, idx) => {
      return (
          <div key={Math.floor(Math.random() * 100000)}>
              <Card text={item} />
          </div>
      );
    });

    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="card-list">
          {jv}
        </div>
        <form id="js--submit" onSubmit={this.handleSubmit}>
          <div className="js--error-msg form-error" />
          <div>
              <input id="card" name="card" type="text" 
                required
                placeholder="Card"
                onBlur={this.handleChange}
              />
          </div>
          <button className="submit-button" type="submit">Add Card</button>
        </form>
      </div>
    );
  }
}
```

## 1.1.7 Finer Points

Tips and tricks

### Life cycle Methods

`getDefaultProps()` - An alternative to setting the `defaultProps` property. Returning an object here will set the default values for any props.

`constructor(props)` - Setting the initial state. Called when the component is initialized.

`componentWillMount()` - Called just before a component renders for the first time. Better to use the constructor.

`componentDidMount()` - Called just after a component renders for the first time. AJAX calls to fetch data for a component are often contained here, as is code to initialize any third-party libraries that the component will use.

`componentWillReceiveProps(nextProps)` - Called before a component receives a new set of props. Can be used making state transitions or making AJAX requests triggered by a changing prop.

`shouldComponentUpdate(nextProps, nextState)` - Allows you to fine-tune when a component will be rerendered. Returning false here will prevent a rerender even if the props or state have changed.

`componentWillUpdate(nextProps, nextState)` - Called when a component is going to update, before the render. Useful for triggering animations before a rerender.

`componentDidUpdate()` - Called when the component has been rerendered.  Useful for triggering third-party libraries that directly manipulate the DOM.

`componentWillUnmount()` - Called when the component will be removed from the DOM. Useful for cleaning up timers and other resources associated with the component.

### Children

```
function List(props) {
    return <ul>{props.children}</ul>;
};

function ListItem(props) {
    return <li>{props.children}</li>;
};

ReactDOM.render((
    <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4</ListItem>
    </List>
), document.getElementById('app'));
```

### Refs

```
class InputWithButton extends React.Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        console.log(this.textInput.value);
    }

    render() {
        return (
            <div>
                <input type="text" ref={element => {
                    this.textInput = element;
                }} />
                <button type="button" onClick={this.onButtonClick}>
                    Click me!
                </button>
            </div>
        )
    }
}
```

### Keys

```
function List(props) {
    const items = props.items.map(item => (
        <li key={item.id}>
            {item.text}
        </li>
    ));

    return (
        <ul>
            {items}
        </ul>
    );
};
```

## 1.1.8 React Router

React Router is a library for React that allows you to render different components depending on which URL you have visited. So for example, if you visited the `/about` route you could render an `AboutMe` component, and if you visited the `/portfolio` route you could render the Portfolio component.

```
cd /Users/jv/Desktop/MyDevelopment/github/repo-react/thinkful/1.1.8
git clone https://github.com/oampo/thinkful-react-starter react-router 

cd react-router
rm -rf .git
```

edit package.json

```
"devDependencies": {
"eslint": "^3.19.0",
"eslint-config-airbnb": "^15.0.1",
"eslint-plugin-jsx-a11y": "^5.0.3",
"eslint-plugin-import": "^2.2.0",
"eslint-plugin-react": "^7.0.1"
}
```

Create `.eslintrc.json` in `react-router`

```
{
  "env": {
    "node": true,
    "browser": false,
    "es6": true
  },
  "globals": {
  },
  "rules": {
    "eqeqeq": 1,
    "no-console": "off"
  },
  "plugins": [
  ],
   "extends": "airbnb"
}
```

```
npm install
npm run dev

http://localhost:8080
```

`index.html`

```
<div id="app"></div>
```

### Router Code

```
npm install --save react-router@3.0.2
```

`js/contacts.js`

```
export default {
  0: {
    id: 0,
    name: 'Sarah Hughes',
    phoneNumber: '01234 567890',
  },
  1: {
    id: 1,
    name: 'Tim Taylor',
    phoneNumber: '02345 678901',
  },
  2: {
    id: 2,
    name: 'Sam Smith',
    phoneNumber: '03456 789012',
  },
};
```

`js/components/contact.js`

```
import React from 'react';

export default function Contact(props) {
  return (
    <div>
      <strong>
        {props.name}
      </strong>
            &nbsp;
      {props.phoneNumber}
    </div>
  );
}
```

`js/components/contact-list.js`

```
import React from 'react';
import Contact from './contact';

export default function ContactList(props) {
  const contacts = Object.keys(props.contacts).map((contactId, index) => {
    const contact = props.contacts[contactId];
    return (
      <li key={index}>
        <Contact
          id={contact.id}
          name={contact.name}
          phoneNumber={contact.phoneNumber}
        />
      </li>
    );
  });

  return (
    <ul>
      {contacts}
    </ul>
  );
}
```

`js/components/contact-list-container.js`

```
import React from 'react';
import CONTACTS from '../contacts';
import ContactList from './contact-list';

export default function ContactListContainer() {
  return (
    <ContactList contacts={CONTACTS} />
  );
}
```

`js/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import ContactListContainer from './components/contact-list-container';

const routes = (
  <Router history={hashHistory}>
    <Route path="/contacts" component={ContactListContainer} />
  </Router>
);

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(routes, document.getElementById('app'))
);
```

Test

```
http://localhost:8080/#/contacts
```

## Nesting Routes

```
cd /Users/jv/Desktop/MyDevelopment/github/repo-react/thinkful/1.1.8/nesting-routes
```

`js/components/app.js`

```
import React from 'react';

export default function App(props) {
  return (
    <div>
      <h1>
        Contacts App
      </h1>
      <div>
        {props.children}
      </div>
    </div>
  );
}
```

`js/index.js`

```
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import ContactListContainer from './components/contact-list-container';
import App from './components/app';

const routes = (
  <Router history={hashHistory}>
    <Route path="/contacts" component={App}>
      <IndexRoute component={ContactListContainer} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(routes, document.getElementById('app')),
);
```

```
http://localhost:8080/#/contacts
```

## Variable Routes

```
cd /Users/jv/Desktop/MyDevelopment/github/repo-react/thinkful/1.1.8/variable-routes
```

`js/components/contact-container.js`

```
import React from 'react';

import CONTACTS from '../contacts';
import Contact from './contact';

export default function ContactContainer(props) {
  const contact = CONTACTS[props.params.contactId];
  return <Contact id={contact.id} name={contact.name}
                    phoneNumber={contact.phoneNumber} />;
}
```

`js/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/app';
import ContactListContainer from './components/contact-list-container';
import ContactContainer from './components/contact-container';

const routes = (
  <Router history={hashHistory}>
      <Route path="/contacts" component={App}>
          <IndexRoute component={ContactListContainer} />
          <Route path=":contactId" component={ContactContainer} />
      </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(routes, document.getElementById('app'))
);
```

```
http://localhost:8080/#/contacts/0

http://localhost:8080/#/contacts
```

## Linking to Routes

React Router has `Link` and `IndexLink` components that allow you to create links to parts of your application. You should use these components rather than \<a\> tags to navigate around your React Router app. 

```
cd /Users/jv/Desktop/MyDevelopment/github/repo-react/thinkful/1.1.8/linking-routes
```

`js/components/contact.js`

```
import React from 'react';
import { Link } from 'react-router';

export default function Contact(props) {
  return (
    <div>
      <strong>
        <Link to={`/contacts/${props.id}`}>
          {props.name}
        </Link>
      </strong>
      &nbsp;
      {props.phoneNumber}
    </div>
  );
}
```

```
shows contacts with the links

http://localhost:8080/#/contacts
```

```
shows 1 contact

http://localhost:8080/#/contacts/1
```

## Higher-Order Components

A higher-order component HOC is a function that takes a component and returns a new component.

For example, Redux’s connect function, is a function that returns a HOC.

```
const hoc = connect(state => state)
const WrappedComponent = hoc(SomeComponent)
```

When we call connect, we get a HOC back that we can use to wrap a component. From here we just pass our component to the HOC and start using the component our HOC returns.

What HOCs allow us to do is abstract shared logic between components into a single overarching component.

Examples are in repository [Github repo-react](https://github.com/johnvincentio/repo-react/tree/master/react-hoc)

<b>Example, using Semantic-UI for easy CSS</b>

```
import React from 'react';

import Button from './button/Button';
import withButton from './button/withButton';

class App extends React.Component {

	onClick = () => {
		console.log('onClick');
	}

	render() {
		const WrappedButton = withButton(Button);
		return (
			<div className="ui container">
				<Button className="ui button negative" />
				<WrappedButton onClick={() => this.onClick()} />
			</div>
		);
	}
}

export default App;
```

`Button.jsx`

```
import React from 'react';

const Button = props => (
	<button {...props}>any button</button>
)

export default Button;
```

`withButton.jsx`, an example of a HOC

```
import React from 'react';

import Button from './Button';

const withButton = Element => props => <Button {...props} className="ui button primary" />

export default withButton;
```

The HOC provides a primary button, as it were, a default. In `App`, the className provides fort a negative button, which overrides the HOC.

The HOC here provides default functionality.

<b>Example, using a Authorization wrapper</b>

`App2.jsx`

```
import React from 'react';

import AuthWrapper from './auth/AuthWrapper';
import RegularComponent from './auth/RegularComponent';
import OtherRegularComponent from './auth/OtherRegularComponent';
import FunctionalComponent from './auth/FunctionalComponent';

const WrappedOne = AuthWrapper(RegularComponent);
const WrappedTwo = AuthWrapper(OtherRegularComponent);
const WrappedThree = AuthWrapper(FunctionalComponent);

class App2 extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false
		}
	}

	toggleAuth = () => {
		this.setState((prevState, props) => ({ isLoggedIn: !prevState.isLoggedIn }))
	}

	render() {
		const { isLoggedIn } = this.state
		return (
			<div>
				<button onClick={this.toggleAuth}>{isLoggedIn ? 'Logout' : 'Login'}</button>
				<WrappedOne isLoggedIn={isLoggedIn} />
				<WrappedTwo isLoggedIn={isLoggedIn} />
				<WrappedThree isLoggedIn={isLoggedIn} />
			</div>
		);
	}
}

export default App2;
```

The wrapper renders the wrapped component if isLoggedIn is true. This code is not needed in each component.

`AuthWrapper`

```
function AuthWrapper(WrappedComponent) {
	return class extends React.Component {
		render() {
			if (this.props.isLoggedIn) {
				return <WrappedComponent {...this.props} />
			}
			return <p>You're not logged in</p>
		}
	}
}

export default AuthWrapper;
```

`RegularComponent`

```
class RegularComponent extends React.Component {
	render() {
		return <p>RegularComponent</p>
	}
}
```

`FunctionalComponent`

```
const FunctionalComponent = () => (<p>FunctionalComponent</p>);
export default FunctionalComponent;
```

## Component State

`setState()` schedules an update to a component’s `state` object. When state changes, the component responds by re-rendering.

`setState` is asynchronous inside event handlers.

Some examples

```
handleChange(event) {
	this.setState({ value: event.target.value });
}

toggleAuth = () => {
		this.setState((prevState, props) => ({ isLoggedIn: !prevState.isLoggedIn }))
}
```

Make changes to a copy

```
completeTodo(id) {
	const newTodos = this.state.todos.map(todo => {
		if (todo.id === id) {
			return { ...todo, done: true };
		}
		return todo;
	});

	this.setState({ todos: newTodos });
}
```

Create a new array and populate with random values.

```
	constructor(props) {
		super(props);
		this.state = {
			balls: this.generateBalls()
		};
	}

	generateBalls = () => {
		return  [ ...Array(this.props.numBalls).keys() ]
			.map(() => Math.floor(Math.random() * this.props.maxNum));
	}

	generate = () => {
		this.setState({ balls: this.generateBalls() });
	}
```

## React Context

React context which is global state for components.

The React context API allows you to create global context objects that can be given to any component you make. This allows you to share data without having to pass props down all the way through the DOM tree.

