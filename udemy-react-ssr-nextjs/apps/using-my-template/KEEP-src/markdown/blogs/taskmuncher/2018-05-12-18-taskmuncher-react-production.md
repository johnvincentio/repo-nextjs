---
meta-title: "TaskMuncher React Production Issues | John Vincent"
meta-description: "John Vincent's discussion on React Production Issues"
meta-keywords: "TaskMuncher, React"

title: "React Production Issues"
subtitle: ""
lead: ""

category: [Taskmuncher, React]
permalink: /taskmuncher/deploy/taskmuncher-react-production/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# TaskMuncher React Production Issues


## Webpack Production Build

[Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build)

Ensure production code has been optimized. 

Add [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to Chrome

This adds React Icon. 

If the code is not Production ready, the Icon will be red.

If code is Production ready, the icon is blue.

### Fix

`package.json`

```
	"scripts": {

		"build": "webpack -p",
		"prod": "NODE_ENV=production npm run build",

	}
```

To create the production version

```
npm run prod
```

## Cannot have two HTML5 back ends at the same time

Problem only shows up in Production on Production servers. Cannot reproduce on a Mac.

Problem is caused by using in 2 places. 

Add calendar boolean to `CalendarEvent.js`

```
<TaskDialog
	calendar
	goalId={event.goalId}
	projectId={event.projectId}
	task={event.task}
	close={this.closeEditTaskDialog}
/>
```

Using package react-tag-input, component `TaskDialog` references

```
import { WithContext as ReactTags } from 'react-tag-input';
```

which would work fine if it were the only access to package `react-dnd`

To solve the problem

```
import { WithOutContext as ReactTagsWithOutContext, WithContext as ReactTagsWithContext } from 'react-tag-input';
```

and toggle based on boolean calendar

```
{this.props.calendar ? (
	<ReactTagsWithOutContext
		id="tags"
		inline={false}
		tags={this.state.workingTags}
		suggestions={suggestions}
		minQueryLength={2}
		autocomplete
		handleDelete={this.handleTagDelete}
		handleAddition={this.handleTagAddition}
		handleDrag={this.handleTagDrag}
	/>
) : (
	<ReactTagsWithContext
		id="tags"
		inline={false}
		tags={this.state.workingTags}
		suggestions={suggestions}
		minQueryLength={2}
		autocomplete
		handleDelete={this.handleTagDelete}
		handleAddition={this.handleTagAddition}
		handleDrag={this.handleTagDrag}
	/>
)}
```

Problem is addressed in

```
node_modules/react-tag-input/example/main.js
```

## Run React Production in Development

Being able to reproduce a production problem in development is a requirement. The production bundle needs to be accessed by the Node/Express app.

### Server

`middleware.express.js`

```
app.use(express.static(path.resolve(__dirname, '../dist'))); // for testing react prod in dev
```

### Client

Create the production build

```
npm run prod
```

which produces the production build in ~/dist

Copy the folder to the server and restart the server.

```
localhost:3001
```

to test the app.




