---
meta-title: "Google Analytics for TaskMuncher | John Vincent"
meta-description: "John Vincent's discussion on Google Analytics for TaskMuncher"
meta-keywords: "Google Analytics, TaskMuncher"

title: "Google Analytics for TaskMuncher"
subtitle: ""
lead: ""

category: [Google Analytics, Taskmuncher]
permalink: /taskmuncher/deploy/google-analytics/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

<!-- end -->

# Google Analytics for TaskMuncher

```
https://analytics.google.com
```

* Admin
* Create Account
* Login
* Admin

* Account (list with a drop-down)

From drop-down

	* Create new account.

```
Track: Website
Account name: taskmuncher
Website name: taskmuncher
Website url: 
https
www.taskmuncher.com
```

* Get Tracking Id
	* Shows Website Tracking Code:
	* Copy the code

### Add to Google Analytics Template

Two choices

#### Global Site Tag

Copy the Website Tracking code and paste into

```
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-xxxxxxxxxx"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }
	gtag('js', new Date());

	gtag('config', 'UA-118266911-1');
</script>
```

Paste this code into head tag before any other script or CSS tags


#### JavaScript tracking snippet

Copy the Website Tracking code and paste into

```
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
```

Change

```
https://www.google-analytics.com/analytics.js

to

https://www.taskmuncher.com/analytics.js
```


Paste this code into head tag before any other script or CSS tags

Restart Nginx

```
sudo systemctl restart nginx

pm2 restart all
```

## Review Google Analytics Data

* Login
* List Accounts
* Select All Web Site Data

	
