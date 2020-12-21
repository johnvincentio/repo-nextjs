---
meta-title: "Feediator Google authentication | John Vincent"
meta-description: "John Vincent discussion about Feediator Google authentication"
meta-keywords: "Feediator, Google, Authentication"

title: "Feediator Google Authentication"
subtitle: ""
lead: "Google Authentication"

category: [Google, Authentication, Feediator]
permalink: /feediator/google-authentication/
---

There are a multitude of ways of going about this. I have chosen the following as it fits best with the architecture of the NewsReader application.

<!-- end -->

# Google Application Authentication

[Google Sign-in for Websites](https://developers.google.com/identity/sign-in/web/devconsole-project)

[Send Token to your Server](https://developers.google.com/identity/sign-in/web/backend-auth)

[Google Sign-In JavaScript client reference](https://developers.google.com/identity/sign-in/web/reference#top_of_page)

[Example code](https://github.com/google/google-api-javascript-client/issues/232)

## Goals

Let's describe a few goals

* Login to the application using Google authentication.
* Create an unique application account for each authenticated Google user.
* Bypass Google login if user is already logged into Google.
* Any configuration data must be held server side.
* Any configuration data must be stored outside of the application.

I need a client ID for the following environments:

* development
* heroku
* digital ocean

which have URLs of:

* http://localhost:8080
* https://johnvincentio-news-reader.herokuapp.com
* https://www.newsreader.johnvincent.io/

## Create Google Client Id

Go to [Google API Console](https://console.developers.google.com/projectselector/apis/library)

From Project Drop-down, either select an existing project or create a new project.

In the sidebar under "API Manager"

* select Credentials
* then select the OAuth consent screen tab.
* Choose an Email Address
* specify a Product Name
* press Save.

In the Credentials tab 

* select the New credentials drop-down list
* choose OAuth client ID.

Under Application type

* select Web application.

```
Note.
Register the origins from which your app is allowed to access the Google APIs, as follows. An origin is a unique combination of protocol, hostname, and port.
You can enter multiple origins to allow for your app to run on different protocols, domains, or subdomains. You cannot use wildcards. In the example below, the second URL could be a production URL.
http://localhost:8080
https://myproductionurl.example.com
```

In the Authorized JavaScript origins field

Name

```
Newsreader Authentication
```

Authorized JavaScript origins

```
http://localhost:8080
https://johnvincentio-news-reader.herokuapp.com
https://www.newsreader.johnvincent.io
```

The Authorized redirect URI field does not require a value. Redirect URIs are not used with JavaScript APIs.
Press the Create button.

From the resulting OAuth client dialog box, copy the Client ID . The Client ID lets your app access enabled Google APIs.

## Configure Server Side

Need an additional library

```
npm install google-auth-library --save
```

#### Add `Appid` to `.env`
 
Add to the `.env` file, or if Heroku, add to `Config Vars`, the following:

```
GOOGLE_APP_ID={your-app-id}
```

Do this for each deployed environment.

#### Get `Appid`

`config.js`

```
exports.GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
```

#### Render Login Page

`routes.js`

```
const {GOOGLE_APP_ID} = require('./config');

...

    app.get('/login', function(req, res) {
        return res.render('pages/login/login', {
            title: 'Login - News Reader',
            js: 'login/login.js',
            facebook_appid: FACEBOOK_APP_ID,
            google_appid: GOOGLE_APP_ID,
            isLogin: 'true'
        });
    });
```

`login.hbs`

```
<button class="pure-button google-button js--google-button" data-item-appid="{{google_appid}}">
    <span>
        <i class="fa fa-google" aria-hidden="true"></i>
    </span>
</button>
```

`main.hbs`

```
<script src="//code.jquery.com/jquery-3.1.1.min.js"></script>

<script src="/assets/js/{{ js }}"></script>

{{#if isLogin}}
{{> login/login }}
{{/if}}
```

`partials/login/login.hbs`

```
<script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleGoogleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">
</script>
```

#### Handle User Google Login Request

`login.js` (browser side)

```
/********************************
Handle Google login
********************************/

function setGoogleStatus() {
    var auth = window.gapi.auth2.getAuthInstance();
    var bool = auth.isSignedIn.get();
    if (bool) {
        $('.js--google-button span').contents()[0].textContent = 'Continue with Google';
    }
    else {
        $('.js--google-button span').contents()[0].textContent = 'Log in with Google';
    }
}

function handleGoogleLogin() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    var googleUser = auth2.currentUser.get();
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: '/auth/login/google',
        method: 'POST',
        data: {
            email: profile.getEmail(),
            id: id_token
        }
    }).done(function(token) {
        setGoogleStatus();
        localStorage.setItem('token', token.token);
        window.location.href = '/dashboard';
    }).catch(function(error) {
        setGoogleStatus();
        var errmsg = 'Error';
        if (error.status === 401) {
            errmsg = 'Error Unauthorized';
        }
        else {
            errmsg = error.responseJSON.message;
        }
        $('.js--error-msg').text(`Error: ${errmsg}`);
    });
}

/*
User selected Log in with Google
*/
$('.js--google-button').click(function() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    var bool = auth2.isSignedIn.get();
    if (bool) {
        handleGoogleLogin();
    }
    else {
        window.gapi.auth2.getAuthInstance().signIn()
        .then(function() {
            var bool = auth2.isSignedIn.get();
            if (bool) {
                handleGoogleLogin();
            }
        });
    }
});

function handleGoogleClientLoad() {
    var appId = $('.js--google-button').attr('data-item-appid');
    window.gapi.load('auth2', function() {
        window.gapi.auth2.init({client_id: appId})
        .then(function() {
            setGoogleStatus();
        });
    });
}
```



Note `handleGoogleClientLoad()`

```
var appId = $('.js--google-button').attr('data-item-appid');
window.gapi.load('auth2', function() {
    window.gapi.auth2.init({client_id: appId})
    .then(function() {
        setGoogleStatus();
    });
});
```

which gets the `appid`, loads Google Apis and initializes using the `Appid,` and then connects to Google and verifies whether the user is already connected. Notice the button text is adjusted accordingly.

If the user requested to Login or Continue with Google

```
$('.js--google-button').click(function()
```

is invoked, which checks whether user is logged into Google.

```
var auth2 = window.gapi.auth2.getAuthInstance();
var bool = auth2.isSignedIn.get();
```

If successful, a call is made to handle the server side responsibilities.

```
handleGoogleLogin();
```

If not, a login attempt is made

```
window.gapi.auth2.getAuthInstance().signIn()
```

Again, if successful, a call is made to handle the server side responsibilities.

```
handleGoogleLogin();
```

which makes a call to Google for some details about the user. All this application needs is an id.

```
var auth2 = window.gapi.auth2.getAuthInstance();
var googleUser = auth2.currentUser.get();
var profile = googleUser.getBasicProfile();
var id_token = googleUser.getAuthResponse().id_token;
    
$.ajax({
    url: '/auth/login/google',
    method: 'POST',
    data: {
        email: profile.getEmail(),
        id: id_token
    }
}).done(function(token) {
    setGoogleStatus();
    localStorage.setItem('token', token.token);
    window.location.href = '/dashboard';    
```

If the call to Google is successful, a call is made to server. If successful, the user is redirected to the user dashboard.

## Server

The request is routed to a controller.

The controller checks whether the token passed to the controller is valid.

```
var auth = new GoogleAuth();
var client = new auth.OAuth2(GOOGLE_APP_ID, '', '');
client.verifyIdToken(
    id,
    GOOGLE_APP_ID,
    function(e, login) {
        var payload = login.getPayload();
        var userid = payload.sub;
```
If not valid, the request is rejected with an error.

Else the controller checks whether this Google user already exists. If not, the user is added. User info is returned as an encrypted JWT token.

This application flow is much the same as for a user with an account.
