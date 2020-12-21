---
meta-title: "Update TaskMuncher for Lighthouse Findings | John Vincent"
meta-description: "John Vincent's Update TaskMuncher for Lighthouse Findings"
meta-keywords: "Taskmuncher, React"

title: "Update TaskMuncher for Lighthouse Findings"
subtitle: ""
lead: ""

category: [Taskmuncher, React]
permalink: /taskmuncher/taskmuncher-lighthouse-findings-1/
---

Let's discuss updating TaskMuncher to address some Lighthouse findings.

<!-- end -->

# TaskMuncher

For extensive discussions regarding TaskMuncher, please see [TaskMuncher Overview](/taskmuncher/overview/)

Lighthouse Scores after the work is complete

```
www.taskmuncher.com

90: Performance
100: Accessibility
100: Best Practices
100: SEO
```

## Lighthouse Findings

Lighthouse suggestions follow

### Best Practices

```
Does not use HTTP/2 for all of its resources
```

One request not served via HTTP/2

```
/site.webmanifest
```

This doesn't make sense. Let's check.

Verify `ngxinx` version

```
nginx -v
nginx version: nginx/1.10.3 (Ubuntu)
```

which supports HTTP2

Check server block

```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    include snippets/ssl-taskmuncher.com.conf;
    include snippets/ssl-params.conf;
    include h5bp/basic.conf;
```

which looks good.

```
curl -I -k --http2 https://www.taskmuncher.com/site.webmanifest
```

```
curl -I -k --http2 https://www.taskmuncher.com/site.webmanifest
HTTP/2 200 
server: nginx
```

which also looks good.

### Probable problem

The nginx mimetype is not known for file type `.webmanifest`

### Solution

So rename `site.webmanifest` to `app-manifest.json`

and change `index.hbs`

```
<link rel="manifest" href="/app-manifest.json">
```

which still failed.

Refreshed and tested again and the problem appears to be fixed.

## Accessibility

Contrast problem.

Background and foreground colors do not have a sufficient contrast ratio.

```
Failing Elements
<a class="jss46 jss63 jss75 jss72 jss3" href="/"><svg class="jss81" aria-hidden="true"><use xlink:href="/assets/icons.svg#icon-monster"></use></svg>TaskMuncher</a>
<span class="jss87">Terms of Service</span>
<span class="jss87">Privacy Policy</span>
<span class="jss87">Contact</span>
<a href="https://www.taskmuncher.com" target="_blank" class="sc-bwzfXH cZRhpi">© 2019 TaskMuncher</a>
```

The only way to solve this is to darken the background.

`HomeLayoutStyles.jsx` added

```
backgroundColor: theme.palette.primary.dark
```

```
appBar: {
	display: 'flex',
	minHeight: `calc(2 * ${topNavLineHeight}px)`,
	justifyContent: 'space-between',
	backgroundColor: theme.palette.primary.dark
},
```

`MemberLayoutStyles.jsx` added 

```
backgroundColor: theme.palette.primary.dark
```

```
appBar: {
	position: 'absolute',
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	backgroundColor: theme.palette.primary.dark
},
```
	
	
`FooterStyles.jsx` changed color to `dark` from `main`

```
export const Container = styled.footer`
	background-color: ${appTheme.palette.primary.dark};
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 10px 0px;
`;
```
