---
meta-title: "CodeSandBox | John Vincent"
meta-description: "Getting started with CodeSandBox"
meta-keywords: "CodeSandBox"

title: "CodeSandBox"
subtitle: "Getting started with CodeSandBox"
lead: ""

category: [CodeSandBox]
permalink: /general/codesandbox/
---

Putting all of this stuff here so it doesn't end up sprayed everywhere.

<!-- end -->

# General

[CodeSandBox](https://codesandbox.io)

## React

* Start with a new Sandbox.
* Select React

A new project is created using create-react-app.

### React and Material-UI

* Add Dependency
* Search: `material-ui`
* Select version required.
	* Note I used `1.0.0-beta.37`


`index.js`

```
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';
import Hello from './Hello';

const App = () => (
  <div>
    <Hello name="CodeSandbox" />
    <Button variant="raised" color="primary">
      Hello World
    </Button>
    <h2>Start editing to see some magic happen</h2>
  </div>
);

render(<App />, document.getElementById('root'));
```




