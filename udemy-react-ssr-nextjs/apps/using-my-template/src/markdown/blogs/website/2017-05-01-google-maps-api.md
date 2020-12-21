---
meta-title: "Google Maps APIs | John Vincent"
meta-description: "Google Maps API Console"
meta-keywords: "google, maps"

title: "Google Maps APIs"
subtitle: ""
lead: "Use Google Maps API for application mapping needs."

category: [Google Maps]
permalink: /website/google-maps-api/
---

Making Maps is easy using the Google Maps APIs.

<!-- end -->

## Google API

[Google API Manager](https://console.developers.google.com/)

Select Project.

### Create Credentials

Credentials, Create Credentials, API Key

Select the API Key

Key restriction: http referrers
Accept requests from:

```
www.<domain>/*
<domain>/*
use ip if you wish
```

save>

## Use Google Maps API

HTML code

```
<div class="google-map">
    <div id="map"></div>
</div>
```

Use following JavaScript

```
<script>
    function initMap() {
        var nyc = {lat: 40.757, lng: -73.99};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            scrollwheel: false,
            center: nyc,
styles: [
    {"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]},
    {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility":"simplified"}]},
    {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]},
    {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]},
    {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]},
    {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]},
    {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]},
    {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]},
    {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}
]
        });
        var marker = new google.maps.Marker({
            position: nyc,
            map: map
        });
    }
</script>
```

For production, use

```
<script async defer
src="https://maps.googleapis.com/maps/api/js?key=<your-api-key>&callback=initMap" type="text/javascript">
</script>
```

For development, use

```
<script async defer
src="https://maps.googleapis.com/maps/api/js?callback=initMap" type="text/javascript">
</script>
```





