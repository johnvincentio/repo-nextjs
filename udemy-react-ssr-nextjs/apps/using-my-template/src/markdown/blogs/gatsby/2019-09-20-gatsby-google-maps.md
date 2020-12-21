---
meta-title: "Gatsby Google Maps | John Vincent"
meta-description: "John Vincent's discussion on Gatsby Google Maps"
meta-keywords: "Gatsby, Google Maps"

title: "Gatsby Google Maps"
subtitle: ""
lead: ""

category: [Gatsby, Google Maps]
permalink: /gatsby/google-maps/
---

Let's discuss implementing Google Maps with Gatsby.

<!-- end -->

## Install

```
npm i --save google-map-react
```

## Implementation

`GoogleMaps.jsx`

```
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import GoogleMapReact from 'google-map-react';

const Marker = () => (
	<>
		<div className="pin" />
		<div className="pulse" />
	</>
);

const GoogleMaps = () => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					other {
						googleMapsKey
					}
				}
			}
		}
	`);
	const { googleMapsKey } = data.site.siteMetadata.other;

	const mapConfig = {
		center: {
			lat: 40.757,
			lng: -73.99,
		},
		zoom: 11,
	};

	return (
		<div id="google-map-section" style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: googleMapsKey }}
				defaultCenter={mapConfig.center}
				defaultZoom={mapConfig.zoom}
			>
				<Marker lat={mapConfig.center.lat} lng={mapConfig.center.lng} />
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMaps;
```

