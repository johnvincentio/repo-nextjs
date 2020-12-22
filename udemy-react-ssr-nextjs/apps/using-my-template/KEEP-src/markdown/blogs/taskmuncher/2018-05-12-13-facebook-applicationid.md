---
meta-title: "Facebook Application Id | John Vincent"
meta-description: "John Vincent discussion about Facebook Application Id"
meta-keywords: "Facebook"

title: "Facebook Application Id"
subtitle: ""
lead: "Facebook Application Id"

category: [Taskmuncher, Facebook]
permalink: /taskmuncher/deploy/facebook-applicationid/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

There are a multitude of ways of going about this. I have chosen the following as it fits best with the architecture of the TaskMuncher application.

<!-- end -->

# Facebook Application Ids

Note that the `Facebook Appid` is tied to a unique URL. Thus, if the application is multiply deployed you will need an `appid` for each of your deployments.

Note that development is a unique URL and thus will also need an `appid`.

## Goals

Let's describe a few goals

* Login to the application using Facebook authentication.
* Create an unique application account for each authenticated Facebook user.
* Bypass Facebook login if user is already logged into Facebook.
* Any configuration data must be held server side.
* Any configuration data must be stored outside of the application.

## Required Facebook Application Ids

I need Application Ids for the following environments:

* Development
* Heroku
* Digital Ocean

which have URLs of:

* http://localhost:8055
* https://www.taskmuncher.com/

Application was not deployed to Heroku.

Facebook app names:

* `taskmuncher.local`
* `taskmuncher.heroku (not needed)`
* `taskmuncher.com`

## Create Facebook Application Ids

[Login to Facebook for Developers](https://developers.facebook.com/)

Select "My Apps" (see top right)

Add a New App

```
Display Name:
taskmuncher.local

Contact Email:
{my-email}
```

I have chosen a standard for display Name:

```
{application-name}.{environment}
```

Create App Id

which creates a new app and provides the App ID.

Add a Product

Facebook Login, Setup

* Web
	* Site URL: http://localhost:8055
		* save

Settings, Basic

* Category = News
	* Save

Facebook Login, Settings
* Valid OAuth redirect URLs
	* http://localhost:8055
	  * Save

Dashboard

Notice

```
This app is in development mode and can only be used by app admins, developers and testers
```

Click on the following question mark icon.

* Make public?
	* Change to Yes and confirm


Repeat the above steps for each environment.

## Delete Facebook Application Id

This is for reference.

Settings, Advanced

At the very bottom is a red button Delete App

* Press Delete App
	* Confirm
