//

import React from 'react';

import GoogleMapReact from 'google-map-react';

const Marker = () => (
	<>
		<div className="pin" />
		<div className="pulse" />
	</>
);

const GoogleMaps = ({ site }) => {
	// console.log('GoogleMaps; site ', site);
	const { googleMapsKey } = site.siteMetadata.other;

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
