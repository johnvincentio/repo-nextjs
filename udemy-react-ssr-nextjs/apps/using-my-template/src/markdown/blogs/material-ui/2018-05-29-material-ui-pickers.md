---
meta-title: "Material-UI Pickers | John Vincent"
meta-description: "Getting started with Material-UI Pickers"
meta-keywords: "Material-UI, React"

title: "Material-UI Pickers"
subtitle: "Getting started with Material-UI Pickers"
lead: ""

category: [Material-UI, React]
permalink: /material-ui/material-ui-pickers/
---

This article describes basic usage of Material-UI Pickers.

<!-- end -->

# General

[Material-UI](https://material-ui-next.com/)

[Material-UI Pickers](https://material-ui-next.com/demos/pickers/)

[Pickers](https://github.com/dmtrKovalenko/material-ui-pickers)

Install the package

```
npm i material-ui-pickers --save
```

## Date and Time Pickers

An example of using the `DateTime` Picker using the Moment package.

```
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

class TaskDateTimePicker extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectedMoment: this.props.value
		};
	}

	handleDateChange = moment => {
		this.setState({ selectedMoment: moment });
		this.props.onSubmit(moment);
	};

	render() {
		return (
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<DateTimePicker value={this.state.selectedMoment} onChange={this.handleDateChange} />
			</MuiPickersUtilsProvider>
		);
	}
}

TaskDateTimePicker.propTypes = {
	value: PropTypes.instanceOf(Moment),
	onSubmit: PropTypes.func.isRequired
};

TaskDateTimePicker.defaultProps = {
	value: null
};

export default TaskDateTimePicker;
```

called by

```
import React from 'react';
import PropTypes from 'prop-types';

import { TaskDateTimePicker } from './';

handleEndDate = moment => {
	this.setState({
		workingEnd: moment
	});
};

<FormControl className={classes.FormControl}>
	<InputLabel>Due Date</InputLabel>
	<TaskDateTimePicker value={this.state.workingEnd} onSubmit={this.handleEndDate} />
</FormControl>
```
