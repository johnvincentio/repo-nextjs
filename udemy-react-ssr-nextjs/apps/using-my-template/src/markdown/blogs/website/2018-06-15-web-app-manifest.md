---
meta-title: "About Web App Manifests | John Vincent"
meta-description: "John Vincent's discussion about Web App Manifests"
meta-keywords: "Web App Manifests"

title: "About Web App Manifests"
subtitle: ""
lead: ""

category: [Favicons, Icons]
permalink: /website/using-web-app-manifests/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Web App Manifests

[Google Web Fundamentals](https://developers.google.com/web/fundamentals/web-app-manifest/)

[Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web/Manifest)

[W3C Working Draft of Web App Manifest](https://w3c.github.io/manifest/)

[Google Sample Manifest](https://googlechrome.github.io/samples/web-application-manifest/manifest.json)

## Create Web App Manifest

In practice, I usually create the manifest when I create the `favicons`. 

For details, see [Using Favicons](/website/using-favicons/)

The key is 

```
<link rel="manifest" href="/manifest.json">
```

### Manual Changes

Check file `favicons/manifest.json`, should look something like

```
{
	"short_name": "John Vincent",
	"name": "John Vincent Portfolio",
	"icons": [
		{
			"src": "\/favicons\/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image\/png"
		},
		{
			"src": "\/favicons\/android-chrome-256x256.png",
			"sizes": "256x256",
			"type": "image\/png"
		}
	],
	"background_color": "#382838",
	"theme_color": "#ffffff",
	"start_url": "index.html",
	"display": "standalone",
	"orientation": "landscape"
}
```

`short_name` should be no more than 12 characters.






