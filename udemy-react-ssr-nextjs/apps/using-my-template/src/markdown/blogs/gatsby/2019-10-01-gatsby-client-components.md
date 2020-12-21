---
meta-title: "Gatsby and Client Only Components | John Vincent"
meta-description: "John Vincent's discussion on Gatsby and Client Only Components"
meta-keywords: "Gatsby, React"

title: "Gatsby and Client Only Components"
subtitle: ""
lead: ""

category: [Gatsby, React]
permalink: /gatsby/client-components/
---

Any component referencing `window` cannot be rendered server-side.

<!-- end -->

# Error

The error will be

```
"window" is not available during server side rendering.
```

[Debugging HTML Builds](https://www.gatsbyjs.org/docs/debugging-html-builds/)

# Cause

Using

```
import InfiniteCarousel from 'react-leaf-carousel';

<InfiniteCarousel
```

which references `window` for window sizing and re-sizing. 

# Solution

Dynamically load the component.

```
import Loadable from 'react-loadable';
// import InfiniteCarousel from 'react-leaf-carousel';
import Loading from './Loading';

const LoadableComponent = Loadable({
	loader: () => import('react-leaf-carousel'),
	loading: Loading,
});

<LoadableComponent
```

`Loading.jsx`

```
import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
	const { pastDelay } = props;
	return <span>{pastDelay ? <h3>Loading...</h3> : null}</span>;
};

Loading.propTypes = {
	pastDelay: PropTypes.bool.isRequired,
};

export default Loading;
```