---
meta-title: "Google Youtube APIs | John Vincent"
meta-description: "Google Youtube API Console"
meta-keywords: "Google, Youtube"

title: "Google Youtube APIs"
subtitle: ""
lead: "Use Google Youtube API for accessing Youtube"

category: [Google, Youtube]
permalink: /website/google-youtube-api/
---

Making YouTube is easy using the Google YouTube APIs. 

A good starting point is [Add YouTube functionality to your app](
https://developers.google.com/youtube/v3/)

<!-- end -->

## Google YouTube API

[Google API Manager](https://console.developers.google.com/)

Select Project or Create a New Project.

Library (from left nav)

* YouTube APIs
	* YouTube Data APIs

Click "Enable"

	* Click "Go to Credentials"
	* Leave the first dropdown as it is
	* Change the second to "Web Browser (JavaScript)"
	* select "Public Data"
	* click the blue button.

Provides an API key, note this.

Restrict key

	* HTTP referrers (web sites)

List of HTTP referrers

	* localhost/*

	


## Getting Started

### Get a Google YouTube API key
```
https://console.developers.google.com/apis/library
YoutubeData APIs
Create a Project
Web Browser

Copy the API key.

```

### Get YouTube Channel Id

```
www.youtube.com
Icon to left of Youtube.com icon
My Channel
Notice the url.
Channel Id is everything after www.youtube.com/channel/
```

## Get My Own Videos

```
https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=<my-channel-id>&key=<my-key>&maxResults=20
```

## Get Videos

Look for up to 20 videos for query string `niagara falls`

```
https://www.googleapis.com/youtube/v3/activities?part=snippet&channelId=<my-channel-id>&q=niagara%20falls&key=<my-key>&maxResults=20
```




## Use Google YouTube API

For details, see implementation in 

```
/Users/jv/Desktop/MyDevelopment/github/thinkful/ajax/search-youtube
```

```
APP.model.getDataFromApiByChannel(idx);

APP.model.getDataFromApiForPage(false);
APP.model.getDataFromApiForPage(true);

APP.model.getDataFromApiForSearch(query);
```

```
var YOUTUBE_SEARCH_APIS_URL = 'https://www.googleapis.com/youtube/v3/search';
var YOUTUBE_PLAY_VIDEO_URL= 'https://www.youtube.com/watch';

var APP = APP || {};

APP.model = {
    storage : [],

    getOptions: function() {
        var options = {};
        options.part = 'snippet';
        options.key = '<enter your api key here>';
        options.maxResults = '9';
        return options;
    },
    getDataFromApi : function(options) {
        console.log(">>> getDataFromApi; options"+JSON.stringify(options));
        var that = this;
        var request = $.ajax({
            url: YOUTUBE_SEARCH_APIS_URL,
            data: options,
            dataType: 'json',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            that.storage = data;
            $('main').trigger('model-changed');
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getDataFromApi");
    },
/*
Get YouTube videos by Search term
*/
    getDataFromApiForSearch : function(searchTerm) {
        console.log(">>> getDataFromApiForSearch");
        var options = this.getOptions();
        options.q = searchTerm;
        this.getDataFromApi(options);
        console.log("<<< getDataFromApiForSearch");
    },
/*
Get YouTube videos by channel id
*/
    getDataFromApiByChannel : function(idx) {
        console.log(">>> getDataFromApiByChannel");
        var item = this.getItem(idx);
        var options = this.getOptions();
        options.channelId = item.snippet.channelId;
        this.getDataFromApi(options);
        console.log("<<< getDataFromApiByChannel");
    },
/*
Get YouTube videos by pageToken
*/
    getDataFromApiForPage: function(next) {
        console.log(">>> getDataFromApiForPage");
        var options = this.getOptions();
        options.pageToken = next ? this.storage.nextPageToken : this.storage.prevPageToken;
        this.getDataFromApi(options);
        console.log("<<< getDataFromApiForPage");
    },

    getItem: function(idx) {
        return this.storage.items[idx];
    },
    getPlayVideoUrl: function(idx) {
        var item = this.getItem(idx);
        return YOUTUBE_PLAY_VIDEO_URL + "?v=" + item.id.videoId;
    }
};
```
