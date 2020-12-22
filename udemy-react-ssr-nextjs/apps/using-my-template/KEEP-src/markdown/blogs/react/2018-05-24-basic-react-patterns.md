---
meta-title: "Basic React Patterns | John Vincent"
meta-description: "John Vincent's discussion on Basic React Patterns"
meta-keywords: "React, Patterns"

title: "Basic React Patterns"
subtitle: "Using React Patterns"
lead: ""

category: [React]
permalink: /react/basic-react-patterns/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Patterns

[React Patterns](https://reactpatterns.com/)

Starting snippet

```
import React from 'react';
import PropTypes from 'prop-types';
```

### Stateless function

Highly reusable components. They do not hold state.

```
const Game = () => (
	<div>Hello</div>
);
```

or

```
const Game = () => <div>Hello</div>
```

or

```
const Game = function() {
  return <div>Hello</div>;
}

```

or

```
function Game() {
 	return (
		<div>Hello</div>
	);
}
```

### Stateless with properties

Notice that property types are validated. This is a required part of the pattern.

```
import React from 'react';
import PropTypes from 'prop-types';

function GuessItem(props) {
	return <div>{props.guess}</div>;
}

GuessItem.propTypes = {
	guess: PropTypes.number.isRequired,
};

export default GuessItem;
```

### Class

Basic structure

```
import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			workingTags: []
		};

		this.something = this.props.something.bind(this);

		this.handleAdd = this.handleAdd.bind(this);		
	}
	
	handleAdd(tag) {
		const { workingTags } = this.state;
		workingTags.push({
			id: tag,
			text: tag
		});
		this.setState({ workingTags });
		
	}

	render() {
		const { myvar } = this.props;
		this.props.something();
		return (
			<MyTags
				handleAdd={this.handleAdd}
			/>
		);
	}
}

Tag.propTypes = {
	...
	something: PropTypes.func.isRequired,
};

Tag.defaultProps = {
	...
};

const mapStateToProps = state => ({
	data: state.dataReducer.data
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default Tag;

export default connect(mapStateToProps, mapDispatchToProps)(Tag);

```

or

```
import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
	state = { search: '' };

	handleSearchChange = e => {
		this.setState({ search: e.target.value });
	};

	handleKeyPressed = event => {
		if (event.keyCode === 13) {
			this.handleSubmit();
		}
	};

	handleSubmit = () => {
		this.props.actions.searchUserData(this.state.search, this.props.goals);
	};
	
	render() {
		const { myvar } = this.props;
		this.props.something();
		return (
			<Input
				id="search"
				variant="text"
				value={this.state.search}
				onChange={this.handleSearchChange}
				onKeyDown={this.handleKeyPressed}
				tabIndex="0"
				endAdornment={
					<InputAdornment position="start">
						<IconButton onClick={this.handleSubmit}>
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		);
	}
}

Tag.propTypes = {
	...
	something: PropTypes.func.isRequired,
	actions: PropTypes.shape({
		searchUserData: PropTypes.func.isRequired
	}).isRequired,
};

Tag.defaultProps = {
	...
};

const mapStateToProps = state => ({
	data: state.dataReducer.data
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default Tag;

export default connect(null, mapDispatchToProps)(Tag);

export default connect(mapStateToProps, mapDispatchToProps)(Tag);

```

### Destructuring arguments

Pass object's properties as JSX attributes.

```
const Tag = ({ name }) => <div>{name}</div>
```

is the same as 

```
const Tag = props => <div>{props.name}</div>
```

#### Rest Parameter

Collect remaining properties into a new object

```
const Tag = ({ name, ...props }) =>
	<div {...props}>{name}</div>
```

### Conditional Rendering

Use the ternary operator

if

```
{condition && <span>Rendered when `truthy`</span> }
```

if-else (tidy one-liners)

```
{condition
  ? <span>Rendered when `truthy`</span>
  : <span>Rendered when `falsey`</span>
}
```

if-else (big blocks)

```
{condition ? (
  <span>
    Rendered when `truthy`
  </span>
) : (
  <span>
    Rendered when `falsey`
  </span>
)}
```


### Callback

Allow the parent to handle the task.

```
class ListProjects extends React.Component {
	constructor(props) {
		super(props);
		this.add = this.props.add.bind(this);
	}

	render() {
		this.add();
	}
}
ListProjects.propTypes = {
	add: PropTypes.func.isRequired
};
```

or using arrow functions

```
class GoalDialog extends React.Component {
	handleSubmit = () => {
		this.add();
	};

<Button onClick={this.handleSubmit}>
```

### Array as Children

A common pattern

```
	render() {
		const div = projects.map((project, idx) => {
			return (
				<ListProject
					key={`key_${project.id}`}
					project={project}
					idx={idx}
				/>
			);
		});
		return <div>{div}</div>;
	}
}
```

or

```
<div>
	{[projects.map((project, idx) => (
		<ListProject
			key={`key_${project.id}`}
			project={project}
			idx={idx}
		/>
	))}
</div>
```

### Events

Notice the usage, to add

```
<GoalDialog />
```

to edit, passing the data object

```
<GoalDialog goal={goal} />}

```

Put properties into state. 

```
class GoalDialog extends React.Component {
	state = { ...this.props.goal };
```

The default properties are used if the goal object is null,
but not if the goal object is not null, or in edit mode.

```
const goalType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	status: PropTypes.number.isRequired,
});

GoalDialog.propTypes = {
	goal: goalType // eslint-disable-line react/no-typos
};

GoalDialog.defaultProps = {
	goal: {
		id: 0,
		title: '',
		description: '',
		status: 0
	}
};
```

Use the following for all fields, for example

```
<TextField
	required
	label="Title"
	value={this.state.title}
	onChange={this.handleChange('title')}
/>
```

will all invoke

```
handleChange = name => ({ target: { value } }) => {
	this.setState({
		[name]: value
	});
};
```

Then the submit

```
<Button className={classes.button} color="primary" variant="raised" onClick={this.handleSubmit}>
	Done
</Button>
```

will call

```
handleSubmit = () => {
	if (this.state.title.length < 1) {
		this.setState({ errorTitle: true });
		return;
	}

	const { id, title, description, status } = this.state;
...
};
```

### Container Component

A container does data fetching and then renders its corresponding subcomponent.

A reusable component

```
const projectList = ({ projects }) =>
  <ul>
    {projects.map(project =>
      <li>{project.id} {project.title}</li>
    )}
  </ul>
```

Fetch data and render the stateless component

```
class ProjectListContainer extends React.Component {
  constructor() {
    super()
    this.state = { projects: [] }
  }

  componentDidMount() {
    $.ajax({
      url: "/app-projects.json",
      dataType: 'json',
      success: projects =>
        this.setState({projects: projects});
    })
  }

  render() {
    return <ProjectList projects={this.state.projects} />
  }
}
```

### State Hoisting

Pass a callback from a parent container component to a stateless component.

```
const Name = ({ onChange }) =>
  <input onChange={e => onChange(e.target.value)} />

class NameContainer extends React.Component {
  constructor() {
    super()
    this.state = {name: ""}
  }

  render() {
    return <Name onChange={newName => this.setState({name: newName})} />
  }
}
```

### Uncontrolled Input

Notice use of `Ref`

```
<input type="text" ref={element => {
    this.textInput = element;
}} />
```

and accessing the value of the text input field

```
onButtonClick() {
    console.log(this.textInput.value);
}
```
    
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

### Controlled Input

```
class ControlledNameInput extends React.Component {
  constructor() {
    super()
    this.state = {name: ""}
	}

	render() {
		return (
			<input type="text" 
				value={this.state.name}
				onChange={e => this.setState({ name: e.target.value })}
			/>
		);
	}
}
```

or

```
class ControlledNameInput extends React.Component {
	state = { name: ''};

	handleChange = name => ({ target: { value } }) => {
		this.setState({
			[name]: value
		});
	};

  render() {
    return (
    	<input type="text" 
    		value={this.state.name}
    		onChange={this.handleChange('name')}
    	/>
    );
  }
}
```

```
onSubmit(event) {
    event.preventDefault();
    const text = this.state.text;
    console.log(text);
    // TODO: Add the card or list
    this.setState({
        text: ''
    });
}
```

or

```
handleChange = name => ({ target: { value } }) => {
	this.setState({
		[name]: value
	});
};
```

which is based on, for example

```
const key = 12345;
const obj = { [key]: `Some value` };
console.log('obj ', obj);
```

which yields

```
obj  { '12345': 'Some value' }
```
