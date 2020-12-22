---
meta-title: "Configuring Meta Tags | John Vincent"
meta-description: "John Vincent's discussion on Configuring Meta Tags"
meta-keywords: "Configuring Meta Tags"

title: "Configuring Meta Tags"
subtitle: ""
lead: ""

category: [Taskmuncher, Google, Twitter, Facebook, Open Graph]
permalink: /taskmuncher/deploy/configuring-meta-tags/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Configuring Meta Tags

Basic meta tags

```
<meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    
  <meta name="description" content="TaskMuncher by John Vincent">
  <meta name="keywords" content="TaskMuncher, Task Management">
  <title>TaskMuncher</title>

  <meta name="author" content="John Vincent">
  <link rel="author" href="https://plus.google.com/107711732062970686024"/>
```

## Meta tags for search engines

Check the meta tags for all URLs 

```
meta-description
meta-keywords
```

Ensure they:

* describe the page
* refer to words on the page
* description should be a sentence that on its own would make sense to the reader
* are unique for the page

These tags will not add value with regards to search engines but poorly chosen values could negatively impact search engine page value.

## Open Graph Protocol

[Open Graph](http://ogp.me/)

[Open Graph Standard](https://developers.facebook.com/docs/sharing/best-practices)

[Open Graph Validate meta tags](https://developers.facebook.com/tools/debug)

Choice of meta tags is based on this document.

```
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="website" />
<meta property="og:title" content="TaskMuncher"/>
<meta property="og:description" content="TaskMuncher by John Vincent"/>
    
<meta property="og:url" content="https://www.taskmuncher.com">
<meta property="og:image" content="https://www.taskmuncher.com/images/john-vincent.jpg">
<meta property="og:image:alt" content="John Vincent">
<meta property="og:image:width" content="449" />
<meta property="og:image:height" content="449"  />
```

## Meta Tags

These tags do change.

[Twitter Developer](https://dev.twitter.com/cards/markup)

[Twitter Standard](https://dev.twitter.com/cards/overview)

[Validate meta tags](https://cards-dev.twitter.com/validator)

```
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="TaskMuncher"/>
<meta name="twitter:description" content="TaskMuncher by John Vincent"/>
<meta name="twitter:site" content="@johnvincentio"/>
<meta name="twitter:image" content="https://www.taskmuncher.com/images/john-vincent.jpg"/>
<meta name="twitter:creator" content="@johnvincentio"/>
```

### Facebook Meta Tags

```
<meta property="fb:app_id" content="{{ head.facebook_app_id }}">
```

This is the Facebook App Id. For details regarding obtaining a Facebook Id, see:

* [Facebook Authentication](/feediator/facebook-authentication/) 
* [TaskMuncher Facebook Authentication](/taskmuncher/deploy/facebook-applicationid/) 


### Facebook Tool

[Facebook checker](https://developers.facebook.com/tools/debug)

* Provide the site URL

Checks a bunch of meta tags.

### Twitter and Google Image

Note

```
<meta property="og:image" content="https://www.taskmuncher.com/images/john-vincent.jpg">

<meta name="twitter:image" content="https://www.taskmuncher.com/images/john-vincent.jpg"/>
```

Ensure that file exists and is accessible.

