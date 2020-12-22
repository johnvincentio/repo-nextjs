---
meta-title: "Google authentication | John Vincent"
meta-description: "John Vincent discussion about Google authentication"
meta-keywords: "Google, Authentication, React"

title: "Google Authentication"
subtitle: ""
lead: "Google Authentication"

category: [Taskmuncher, Google, OAuth2]
permalink: /taskmuncher/deploy/google-authentication/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet.

For more details, please see 
[Deploy TaskMuncher](/taskmuncher/overview/#deploy)

There are a multitude of ways of going about this. I have chosen the following as it fits best with the architecture of the TaskMuncher React application.

<!-- end -->

# Google TaskMuncher Authentication

[Google GAPI Documentation](https://developers.google.com/api-client-library/javascript/reference/referencedocs)

[Also see Feediator Google Authentication](/feediator/google-authentication/)

## Goals

Let's describe a few goals

* Login to the application using Google authentication.
* Create an unique application account for each authenticated Google user.
* Bypass Google login if user is already logged into Google.
* Any configuration data must be held server side.
* Any configuration data must be stored outside of the application.

I need a client ID for the following environments:

* Development
* Heroku (not needed)
* Digital Ocean

which have URLs of:

* http://localhost:8055

* https://www.taskmuncher.com/

## Application Authentication vs Google Authentication

The application will not affect the User's Google state. Thus, if the user is already logged into Google, logging out of the application will log the user out the application but not log the user out of Google.

To test the application's Google authentication feature, it will be necessary to log into and out of Google.

To log out of Google, select the Google User icon and sign out.

## Create Google Client Id

Go to [Google API Console](https://console.developers.google.com/projectselector/apis/library)

From `Project Dropdown`, either select an existing project or create a new project.

```
taskmuncher
```

In the sidebar under "API Manager"

* select Credentials
* then select the OAuth consent screen tab.
* Choose an Email Address
* specify a Product Name `(taskmuncher)`
* press Save.

In the Credentials tab 

* select the New credentials drop-down list
* choose OAuth client ID.

Under Application type

* select Web application.


In the Authorized JavaScript origins field

Name

```
TaskMuncher Authentication
```

Authorized JavaScript origins

```
http://localhost:8055
https://www.taskmuncher.com
```

The Authorized redirect URI field 

```
https://developers.google.com/oauthplayground
```

Press the Save button.

From the resulting OAuth client dialog box, copy the Client ID . The Client ID lets your app access enabled Google APIs.




## Client

### `index.html`

Add the following

```
<!-- Google authentication -->
<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
<script>
	var gapiPromise = (function () {
		return new Promise(function (resolve, reject) {
			window.onLoadCallback = function () {
				resolve();
			};
		});
	}());
	window.app = window.app || {};
	window.app.gapiPromise = gapiPromise;
</script>
```

### Login React Component

I prefer to render my own Google button as this gives me complete control.

A snippet from render()

```
return this.state.ready ? (
	<Fragment>
		<Error text={this.state.error_text} />

		<Button
			className={classNames(classes.button, classes.googleButton)}
			variant="raised"
			onClick={this.handleGoogleSubmit}
		>
			{this.state.google_auth ? <span>Continue with Google</span> : <span>Log in with Google</span>}
			<Icon name="google" css={classNames(classes.svg, classes.googleSvg)} />
		</Button>
	</Fragment>
) : (
	''
);
```

Which suggests state

```
this.state = {
	ready: false,
	google_auth: false,
	error_text: ''
};
```

Notice that the Google login button will be rendered when `state.ready` is set to true.

Load Google Library and set Google Button state

```
const GOOGLE_CLIENT_ID = 'your-client-id';

componentDidMount() {
	this.initClient();
}

initClient = () => {
	window.app.gapiPromise.then(() => {
		window.gapi.load('auth2', () => {
			window.gapi.auth2.init({ client_id: GOOGLE_CLIENT_ID }).then(() => {
				this.setGoogleStatus();
			});
		});
	});
};

setGoogleStatus = () => {
	const auth2 = window.gapi.auth2.getAuthInstance();
	const signedin = auth2.isSignedIn.get();
	this.setState({ google_auth: signedin, ready: true });
};
```

Click button invokes

```
handleGoogleSubmit = () => {
	const auth2 = window.gapi.auth2.getAuthInstance();
	const signedIn = auth2.isSignedIn.get();
	if (signedIn) {
		this.handleGoogleLogin();
	} else {
		window.gapi.auth2
			.getAuthInstance()
			.signIn()
			.then(() => {
				const bool = auth2.isSignedIn.get();
				if (bool) {
					this.handleGoogleLogin();
				}
			});
	}
};
```

which attempts to Google sign in the user.

If successful, a call is made to handle the server side responsibilities.

```
handleGoogleLogin = () => {
	const auth2 = window.gapi.auth2.getAuthInstance();
	const googleUser = auth2.currentUser.get();
	const profile = googleUser.getBasicProfile();
	const idToken = googleUser.getAuthResponse().id_token;

	this.props.actions
		.signinGoogleUser({
			email: profile.getEmail(),
			id: idToken
		})
		.catch(error => {
			this.setState({ error_text: error.message });
			this.setGoogleStatus();
		});
};
```

Sent to the server are

* Google User's email address
* A Google Auth token

If the server request is successful, the user is redirected to the user dashboard.

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

## Server

The request is routed to a controller.

The controller checks whether the token passed to the controller is valid.

```
const auth = new GoogleAuth();
const client = new auth.OAuth2(GOOGLE_APP_ID, '', '');
client.verifyIdToken(
    id,
    GOOGLE_APP_ID,
    (e, login) => {
        const payload = login.getPayload();
        const userid = payload.sub;
```
If not valid, the request is rejected with an error.

Else the controller checks whether this Google user already exists. If not, the user is added. User info is returned as an encrypted JWT token.

This application flow is much the same as for a user with an account.
