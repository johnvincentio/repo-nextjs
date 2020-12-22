---

meta-title: "Using React Advanced Language Features | John Vincent"
meta-description: "Using React Advanced Language Features"
meta-keywords: "React, Babel, Eslint"

title: "Upgrading Babel and ESLint to use React Advanced Language Features"
subtitle: "Upgrading Babel and ESLint"
lead: ""

category: [React, Babel, Eslint]
permalink: /react/react-babel-eslint/
---

This article describes how to upgrade Babel and ESLint
to allow React environment to support advanced language features, for example fat arrow class methods.

<!-- end -->

# General

[Preset-env](https://babeljs.io/docs/plugins/preset-env)

[Class properties transform](https://babeljs.io/docs/plugins/transform-class-properties/)

Fat arrow class methods.

```
handleClick = (evt) => {
  ...
}
```

[Object rest spread transform](https://babeljs.io/docs/plugins/transform-object-rest-spread/)

Transform rest properties for object destructuring assignment and spread properties for object literals

Rest Properties

```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

Spread Properties

```
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```


## Upgrade

```
npm install babel-eslint --save-dev

npm i babel-plugin-transform-class-properties --save-dev
npm i babel-plugin-transform-object-rest-spread --save-dev
```

`.eslintrc`

```
"parser": "babel-eslint"
```

`.babelrc`

```
{
	"presets": ["env", "react"],
	"plugins": [
		"transform-object-rest-spread",
		"transform-class-properties"
	]
}
```
