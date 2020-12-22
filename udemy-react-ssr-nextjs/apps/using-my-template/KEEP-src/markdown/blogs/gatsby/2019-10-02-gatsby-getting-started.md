---
meta-title: "Gatsby Getting Started | John Vincent"
meta-description: "John Vincent's discussion on Gatsby Getting Started"
meta-keywords: "Gatsby, React"

title: "Gatsby Getting Started"
subtitle: ""
lead: ""

category: [Gatsby, React]
permalink: /gatsby/getting-started/
---

Let's get started with Gatsby.

<!-- end -->

# Gatsby

Gatsby is a huge topic, so let's start with some useful links.

## Useful Gatsby Links

[Gatsby](https://www.gatsbyjs.org/)

[Commands (Gatsby CLI)](https://www.gatsbyjs.org/docs/gatsby-cli/)

[Gatsby Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog)

[Gatsby Plugin Library](https://www.gatsbyjs.org/plugins/)

[Querying data in components with the useStaticQuery hook](https://www.gatsbyjs.org/docs/use-static-query/)

[Creating and Modifying Pages](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/)

[gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)

[gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)

[Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/)

[Create Pages](https://www.gatsbyjs.org/docs/node-apis/#createPages)

[Create Page](https://www.gatsbyjs.org/docs/node-apis/#createPage)

[Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)

[dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

[NodeJs Path](https://nodejs.org/api/path.html)

[styled-components](https://www.npmjs.com/package/styled-components)

[gatsby-plugin-styled-components](https://www.npmjs.com/package/gatsby-plugin-styled-components)

[babel-plugin-styled-components](https://www.npmjs.com/package/babel-plugin-styled-components)

[Migrate from Jekyll to Gatsby](https://www.gatsbyjs.org/blog/2017-11-08-migrate-from-jekyll-to-gatsby/)

[Netlify](https://www.netlify.com/)


### Debugging the Gatsby process

[Debugging the build process](https://www.gatsbyjs.org/docs/debugging-the-build-process/)

[Debugging HTML Builds](https://www.gatsbyjs.org/docs/debugging-html-builds/)

[Visual Studio Code](https://github.com/microsoft/vscode-recipes/tree/master/Gatsby-js)

### Useful

[Yaml Converter](https://codebeautify.org/yaml-to-json-xml-csv)

## Start a Gatsby Project

```
cd repo-gatsby
mkdir t2
cd t2
npx gatsby new gatsby-blog
```

To run

```
cd gatsby-blog
npm run develop
```

From a browser

```
http://localhost:8000/
```

## GraphQL

View GraphiQL, an in-browser IDE, to explore your site's data and schema.

```⠀
http://localhost:8000/___graphql
```

Enter

```
query MyQuery {
  allSitePage {
    nodes {
      path
      componentPath
    }
  }
}
```

## Deploy to Netlify

```
git remote add origin git@github.com:johnvincentio/new-gatsby-blog.git
git push origin master
```

Create github repo `new-gatsby-blog`

```
git@github.com:johnvincentio/new-gatsby-blog.git
```

- New Site from Git \* Github

Only Selected repositories

- new-gatsby-blog
- install

If deploy fails, try clear cache and try again.

Browser

```
https://bad-housetail-ce3d42.netlify.com/
```

# Gatsby Visual Studio Code Workspace

[Gatsby Eslint](https://www.gatsbyjs.org/packages/gatsby-plugin-eslint/)

```
npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

`.eslintrc.json`

```
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "globals": {},
  "rules": {
    "no-console": 0,
    "max-len": [
      "error",
      {
        "code": 120,
        "tabWidth": 2,
        "comments": 120,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignorePattern": "^import\\s.+\\sfrom\\s.+;$"
      }
    ],
    "indent": [2, "tab", { "SwitchCase": 1 }],
    "no-tabs": 0,
    "react/jsx-indent": [2, "tab"],
    "react/jsx-indent-props": [2, "tab"],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to"]
      }
    ],
    "react/destructuring-assignment": ["off", "always"]
  },
  "plugins": []
}
```

`.eslintignore`

```
node_modules
```

`.prettierignore`

```
.cache
package.json
package-lock.json
public

node_modules
*.md
project.todo
```

`.prettierrc`

```
{
  "singleQuote": true
}
```

```
cd repo-gatsby/t2/gatsby-blog
mkdir .vscode
```

`.vscode/settings.json`

```
{
  "editor.formatOnSave": true
}
```

## Open Workspace

Now open Visual Studio Code for `repo-gatsby/t2/gatsby-blog`

Change the `.js` files to `.jsx`.

Open `index.jsx` and save. The file should have been reformatted according to `AirBnb` rules.

# package.json

```
npm i --save-dev rimraf
```

Replace `scripts` section with

```
  "scripts": {
    "start": "npm run develop",
    "clean": "rimraf .cache public",
    "build": "npm run clean && gatsby build",
    "develop": "npm run clean && gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
		"serve": "gatsby serve",
		"spelling": "./md-spell-checker",
    "debugger": "node --inspect-brk --no-lazy node_modules/gatsby/dist/bin/gatsby develop",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing \""
  },
```

## Development Build

```
npm start
```

will run the Gatsby development system.

Notice that both development and production builds first remove `.cache`. I have found this to be wise as `.cache` can create some real problems.

## Production Build

```
npm run build
```

Run production server

```
npm run serve
```

Browser

```
http://localhost:9000
```

## Gatsby Styled Components

```
npm i gatsby-plugin-styled-components styled-components babel-plugin-styled-components --save
```


