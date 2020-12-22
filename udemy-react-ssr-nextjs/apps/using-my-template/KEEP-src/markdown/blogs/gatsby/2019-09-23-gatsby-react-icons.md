---
meta-title: "Gatsby React Icons | John Vincent"
meta-description: "John Vincent's discussion on Gatsby React Icons"
meta-keywords: "Gatsby, React Icons"

title: "Gatsby React Icons"
subtitle: ""
lead: ""

category: [Gatsby, React]
permalink: /gatsby/react-icons/
---

Let's discuss using React icons in a Gatsby environment.

<!-- end -->

# Install

```
npm i --save react-icons
```

## Implementation

For example, `SocialIcons.jsx`

```
import React from 'react';

import {
	FaRegEnvelope, FaGoogle, FaLinkedinIn, FaTwitter, FaFacebookF, FaAngellist, FaRss,
} from 'react-icons/fa';

import { siteType } from '../types';

const SocialIcons = ({ site }) => {
	console.log('SocialIcons; site ', site);
	const {
		siteMetadata: { config },
	} = site;

	const mailToUrl = `mailto:${config.email}?Subject=Hello`;
	const twitterUrl = `https://twitter.com/${config.twitterUsername}`;
	const facebookURL = `https://facebook.com/${config.facebookUsername}`;
	const angelUrl = `https://www.angel.co/${config.angelUsername}`;
	const rssFeed = `${config.siteUrl}/feed.xml`;
	return (
		<div className="social-icons">
			<ul>
				<li>
					<a href={mailToUrl} target="_top" title="Email John Vincent">
						<FaRegEnvelope />
					</a>
				</li>
				<li>
					<a
						href={config.googleProfile}
						target="_blank"
						title="Contact John Vincent at Google"
						rel="noopener noreferrer"
					>
						<FaGoogle />
					</a>
				</li>
				<li>
					<a
						href={config.linkedinUrl}
						target="_blank"
						title="Contact John Vincent at Linkedin"
						rel="noopener noreferrer"
					>
						<FaLinkedinIn />
					</a>
				</li>
				<li>
					<a href={twitterUrl} target="_blank" title="Contact John Vincent at Twitter" rel="noopener noreferrer">
						<FaTwitter />
					</a>
				</li>
				<li>
					<a href={facebookURL} target="_blank" title="Contact John Vincent at Facebook" rel="noopener noreferrer">
						<FaFacebookF />
					</a>
				</li>
				<li>
					<a href={angelUrl} target="_blank" title="Contact John Vincent at AngelList" rel="noopener noreferrer">
						<FaAngellist />
					</a>
				</li>
				<li>
					<a href={rssFeed} target="_blank" title="RSS Feed" rel="noopener noreferrer">
						<FaRss />
					</a>
				</li>
			</ul>
		</div>
	);
};

SocialIcons.propTypes = {
	site: siteType.isRequired,
};

export default SocialIcons;
```

Notice:

* Only import the icons you use.
* Anchor tags are used as the links are to external urls.

## Styling

The icons are actually just `svg` tags.

Thus `_social-icons.scss`

```
.social-icons {
  font-size: 22px;

  ul {
    text-align: center;
    margin-bottom: 30px;
    padding: 0;
    li {
      display: inline-block;
      a {
        svg {
          color: #4a4656;
          &:hover {
            color: #000;
          }
        }
      }
    }
    li:not(:last-child) {
      margin-right: 40px;
    }
  }
}
```
