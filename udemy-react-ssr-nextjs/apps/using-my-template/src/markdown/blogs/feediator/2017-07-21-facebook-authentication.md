---
meta-title: "Feediator Facebook Authentication | John Vincent"
meta-description: "John Vincent discussion about Feediator Facebook Authentication"
meta-keywords: "Feediator, Facebook, Authentication"

title: "Feediator Facebook Authentication"
subtitle: ""
lead: "Facebook Authentication"

category: [Facebook, Authentication, Feediator]
permalink: /feediator/facebook-authentication/
---

There are a multitude of ways of going about this. I have chosen the following as it fits best with the architecture of the NewsReader application.

<!-- end -->

# Facebook Application Authentication

[Facebook Developers](https://developers.facebook.com/)

[Useful reference](https://developers.facebook.com/docs/facebook-login/web)

[Example code](https://developers.facebook.com/docs/facebook-login/web#example)

## Facebook Application Ids

Note that the Facebook `Appid` is tied to a unique URL. Thus, if the application is multiply deployed you will need an `appid` for each of your deployments.

Note that development is a unique URL and thus will also need an `appid`

## Goals

Let's describe a few goals

* Login to the application using Facebook authentication.
* Create an unique application account for each authenticated Facebook user.
* Bypass Facebook login if user is already logged into Facebook.
* Any configuration data must be held server side.
* Any configuration data must be stored outside of the application.

## Required Facebook Application Ids

I need Facebook Application Ids for the following environments:

* development
* heroku
* digital ocean

which have URLs of:

* http://localhost:8080
* https://johnvincentio-news-reader.herokuapp.com
* https://www.newsreader.johnvincent.io/

## Create Facebook Application Ids

[Login to Facebook for Developers](https://developers.facebook.com/)

Select "My Apps" (see top right)

Add a New App

```
Display Name:
newsreader.local

Contact Email:
{my-email}
```

I have chosen a standard for display Name:

```
{application-name}.{environment}
```

Create App Id

which creates a new app and provides the App ID.

Facebook Login, Setup

* Web
	* Site URL: http://localhost:8080
		* save

Settings, Basic

* Category = News
	* Save

Facebook Login, Settings
* Valid OAuth redirect URIs
	* http://localhost:8080
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

## Configure Server Side

#### Add `Appid` to `.env`
 
Add to the `.env` file, or if Heroku, add to `Config Vars`, the following:

```
FACEBOOK_APP_ID={your-app-id}
FACEBOOK_APP_SECRET={your-app-secret}
```

Do this for each deployed environment.

#### Get `Appid`

`config.js`

```
exports.FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
exports.FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
```

#### Render Login Page

`routes.js`

```
const passport = require('passport');

...


const {FACEBOOK_APP_ID} = require('./config');

...

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res, next) {
  logger.info("routes::/login/facebook/return; user.id "+req.user.id);
  return loginFacebook(req, res, next);
});
    
app.get('/login', function(req, res) {
  return res.render('pages/login/login', {
    title: 'Login - News Reader',
    js: 'login/login.js',
    facebook_appid: FACEBOOK_APP_ID
  });
});

app.get('/login', function(req, res) {
	return res.render('pages/login/login', {
		title: 'Login - News Reader',
		js: 'login/login.js',
		facebook_appid: FACEBOOK_APP_ID,
		google_appid: GOOGLE_APP_ID,
		isLogin: 'true',
		head: HEAD_DATA
	});
});
    
```

`login.hbs`

```
<button class="pure-button facebook-button js--facebook-button" data-item-appid="{{facebook_appid}}">
    <span>
    	Log in with Facebook
        <i class="fa fa-facebook-official" aria-hidden="true"></i>
    </span>
</button>
```

#### Handle User Facebook Login Request

`login.js` (browser side)

```
/********************************
Handle facebook login
********************************/

/*
User selected Log in with Facebook
*/
$('.js--facebook-button').click(function() {
    console.log("'click', User selected Log in with Facebook");
    window.location.href = '/login/facebook';
});

/*
Facebook initialization - will be called after Sdk has been retrieved.
*/
window.fbAsyncInit = function() {
    var appId = $('.js--facebook-button').attr('data-item-appid');
    FB.init({
        appId,
        status: true,
        cookie: true,  // enable cookies to allow the server to access the session
        xfbml: false,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
};

/*
Facebook Initialization - get the Facebook Sdk.
This is called after $(function()
*/
(function(d, s, id) {
  var js;
  var fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=324308778026184";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
```

Note `window.fbAsyncInit `

```
var appId = $('.js--facebook-button').attr('data-item-appid');
```

which gets the `appid` and is passed with `FB.init()`

If the user requested to Login with Facebook

```
$('.js--facebook-button').click(function()
```

is invoked, which redirects to a URL on the server which handles Facebook authentication.

```
window.location.href = '/login/facebook';
```


## Server

The request is routed to a controller.

The controller checks whether this Facebook user already exists. If not, the user is added. User info is returned as an encrypted JWT token.

This application flow is much the same as for a user with an account.

### Middleware

Additional code in `config/middleware.express.js`

```
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

...

/*
* In this implementation, the user's Facebook profile is supplied as the user record.
*/
passport.use(new Strategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.HOME_URL}/login/facebook/return`
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    })
);

/*
* Configure Passport authenticated session persistence. Complete Facebook profile is serialized and deserialized.
*/
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

...

app.use(passport.initialize());
```

### Routes

Additional routes are added in `config/routes.js`

```
/* Handle Facebook Login */

    app.get('/login/facebook', passport.authenticate('facebook'));

    app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res, next) {
        logger.info("routes::/login/facebook/return; user.id "+req.user.id);
        return loginFacebook(req, res, next);
    });
```
    
### Controller

Additional method is added to `auth.controller.js`

```
loginFacebook(req, res, next) {
    logger.info("--- auth/auth.controller::loginFacebook");
    const { id } = req.user;
    logger.debug("id "+id);
```

Note the Facebook user profile is `req.user`

This method handles the application internal user requirements and then renders the dashboard page, the start point of the Member section SPA.


```








```





# NOT IN USE - just for reference

## Configure Server Side

#### Add `Appid` to `.env`
 
Add to the `.env` file, or if Heroku, add to `Config Vars`, the following:

```
FACEBOOK_APP_ID={your-app-id}
```

Do this for each deployed environment.

#### Get `Appid`

`config.js`

```
exports.FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
```

#### Render Login Page

`routes.js`

```
const {FACEBOOK_APP_ID} = require('./config');

...

    app.get('/login', function(req, res) {
        return res.render('pages/login/login', {
            title: 'Login - News Reader',
            js: 'login/login.js',
            facebook_appid: FACEBOOK_APP_ID
        });
    });
```

`login.hbs`

```
<button class="pure-button facebook-button js--facebook-button" data-item-appid="{{facebook_appid}}">
    <span>
        <i class="fa fa-facebook-official" aria-hidden="true"></i>
    </span>
</button>
```

#### Handle User Facebook Login Request

`login.js` (browser side)

```
/********************************
Handle facebook login
********************************/

function handleLogin() {
    FB.api('/me', {fields: 'id, first_name, last_name, email'}, function(response) {
        $.ajax({
            url: '/auth/login/facebook',
            method: 'POST',
            data: {
                email: response.email,
                id: response.id
            }
        }).done(function(token) {
            localStorage.setItem('token', token.token);
            window.location.href = '/dashboard';
        }).catch(function(error) {
            var errmsg = 'Error';
            if (error.status === 401) {
                errmsg = 'Error Unauthorized';
            }
            else {
                errmsg = error.responseJSON.message;
            }
            $('.js--error-msg').text(`Error: ${errmsg}`);
        });
    });
}

/*
User selected Log in with Facebook
*/
$('.js--facebook-button').click(function() {
    FB.getLoginStatus(function(response) {
        console.log(response);
        if (response.status === 'connected') {
            console.log("already connected");
            handleLogin();
        }
        else {
            FB.login(function(response) {
                if (response.status === 'connected') {
                    handleLogin();
                }
            });
        }
    });
});

/*
Facebook initialization - will be called after Sdk has been retrieved.
*/
window.fbAsyncInit = function() {
    var appId = $('.js--facebook-button').attr('data-item-appid');
    FB.init({
        appId,
        cookie: true,  // enable cookies to allow the server to access the session
        xfbml: false,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) {
        console.log(response);
        if (response.status === 'connected') {
            $('.js--facebook-button span').contents()[0].textContent = 'Continue with Facebook';
        }
        else {
            $('.js--facebook-button span').contents()[0].textContent = 'Log in with Facebook';
        }
    });
};

/*
Facebook Initialization - get the Facebook Sdk.
This is called after $(function()
*/
(function(d, s, id) {
  var js;
  var fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=324308778026184";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
```

Note `window.fbAsyncInit`

```
var appId = $('.js--facebook-button').attr('data-item-appid');
```

which gets the `appid` and is passed with `FB.init()`

This is followed by 

```
FB.getLoginStatus(function(response)
```

which connects to Facebook and verifies whether the user is already connected. Notice the button text is adjusted accordingly.

If the user requested to Login or Continue with Facebook

```
$('.js--facebook-button').click(function()
```

is invoked, which checks whether user is logged into Facebook.

```
FB.getLoginStatus(function(response)
```

If successful, a call is made to handle the server side responsibilities.

```
handleLogin();
```

If not, a login attempt is made

```
FB.login(function(response)
```

Again, if successful, a call is made to handle the server side responsibilities.

```
handleLogin();
```

which makes a call to Facebook for some details about the user. All this application needs is an id.

```
FB.api('/me', {fields: 'id, first_name, last_name, email'}, function(response) {
        $.ajax({
            url: '/auth/login/facebook',
            method: 'POST',
            data: {
                email: response.email,
                id: response.id
            }
        }).done(function(token) {
            localStorage.setItem('token', token.token);
            window.location.href = '/dashboard';      
```

If the call to Facebook is successful, a call is made to server. If successful, the user is redirected to the user dashboard.

## Server

The request is routed to a controller.

The controller checks whether this Facebook user already exists. If not, the user is added. User info is returned as an encrypted JWT token.

This application flow is much the same as for a user with an account.
