---

meta-title: "React PropTypes | John Vincent"
meta-description: "Getting started with React PropTypes"
meta-keywords: "React"

title: "React PropTypes"
subtitle: "Getting started with React PropTypes"
lead: ""

category: [React]
permalink: /react/react-prop-types/
---

This article describes how to configure React PropTypes.

<!-- end -->

# General

[Type checking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

# Installation

Install the package:

```
npm install --save prop-types
```

# General Usage

```
import React from 'react';
import PropTypes from 'prop-types';
```

## Basic Types

If not required, add `.isRequired`

```
PropTypes.string.isRequired,
PropTypes.number,
PropTypes.bool

PropTypes.func

PropTypes.instanceOf(Date)

PropTypes.instanceOf(Moment)

PropTypes.shape({
	add: PropTypes.func
}).isRequired

PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired

PropTypes.arrayOf(PropTypes.object).isRequired

```

## Parameters

```
class Tag extends React.Component {

	render() {
		const { name, age } = this.props;
		...
		return (
			<div>{name} is {age}</div>
		);
	}
}
	
Tag.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number.isRequired,
	male: PropTypes.bool.isRequired
};
```

## Function passed as a parameter

```
class GoalDialog extends React.Component {

	closeDialog = () => {
		this.props.close();
	};
}
	
GoalDialog.propTypes = {
	close: PropTypes.func.isRequired
};
```


## Redux Actions

```
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import * as actions from '../../actions';
```

Use the action

```

class GoalDialog extends React.Component {
...

handleSubmit = () => {
	...
	this.props.actions.updateUserGoal(id, update);
}
```

Notice how the functions are defined in actions

```
GoalDialog.propTypes = {
	actions: PropTypes.shape({
		addUserGoal: PropTypes.func.isRequired,
		updateUserGoal: PropTypes.func.isRequired
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(GoalDialog);
```

## Date

```
import React from 'react';
import PropTypes from 'prop-types';

ViewCalendar.propTypes = {
	start: PropTypes.instanceOf(Date).isRequired,
	end: PropTypes.instanceOf(Date).isRequired
};
```

## Moment

```
import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

value: PropTypes.instanceOf(Moment),

TaskDateTimePicker.propTypes = {
	value: PropTypes.instanceOf(Moment)
};

TaskDateTimePicker.defaultProps = {
	value: null
};

export default TaskDateTimePicker;
```

## Children

```
import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
	render() (
		<div>
			{this.props.children}
		</div>
	);
}
	
Tag.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

getDefaultProps: function() {
	return {		// choose
		children: null
		children: []
	};
},

```

## Array

```
Table.propTypes = {
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
	myObject: PropTypes.shape({
		text: PropTypes.string,
		numbers: PropTypes.arrayOf(React.PropTypes.number)
	}),
	myShape PropTypes.shape({
    one: PropTypes.string.isRequired,
    two: PropTypes.number.isRequired,
    three: PropTypes.bool
	})
};
```

# Types as Constants

Types are often re-used throughout an application. Declaring them repeatedly is poor practice.

Instead, use the following pattern. Declare in `types/index.js`

```
import PropTypes from 'prop-types';
```

For example

```
export const taskType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired
});

export const tasksType = PropTypes.arrayOf(taskType.isRequired);
```

And use

```
ListTask.propTypes = {
	task: taskType.isRequired, // eslint-disable-line react/no-typos
};
```

The type can also use a type, for example

```
export const dateTimeType = PropTypes.shape({
	date: PropTypes.string,
	time: PropTypes.string
});

export const taskType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	start: dateTimeType
});
```

It is possible to declare a hierarchy

```
export const projectType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	status: PropTypes.number.isRequired,
	tasks: tasksType
});

export const projectsType = PropTypes.arrayOf(projectType.isRequired);
```

## Material-UI

```
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import HomeStyles from './HomeStyles';

const Home = props => (
	<div className={classes.root}>Hello</div>
);

Home.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(HomeStyles)(Home);
```

### `withRouter`

```
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	smallIcon: {
		width: 24,
		height: 24,
		color: theme.palette.common.white
	}
});

const { id } = this.props;
this.props.history.push(`/app/${id}`);
		
Tag.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default withRouter(withStyles(styles)(Tag));
```

# Default Props

If a property is marked as not required. it is necessary to declare a default. For example

```
Icon.propTypes = {
	name: PropTypes.string.isRequired,
	css: PropTypes.string,
	count: PropTypes.number,
	repeat: PropType.bool
};

Icon.defaultProps = {
	css: '',
	count: 0,
	repeat: false
};
```

```
export const projectType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	description: PropTypes.string
});

ProjectDialog.propTypes = {
	project: projectType, // eslint-disable-line react/no-typos
};

ProjectDialog.defaultProps = {
	project: {
		description: ''
	}
};
```

Can set default value to null

```
TaskDateTimePicker.propTypes = {
	value: PropTypes.instanceOf(Moment)
};

TaskDateTimePicker.defaultProps = {
	value: null
};
```


# End