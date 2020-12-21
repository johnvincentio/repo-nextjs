---
meta-title: "Json Web Tokens | John Vincent"
meta-description: "John Vincent's discussion on Json Web Tokens"
meta-keywords: "Json Web Tokens, Jwt, Express, Node"

title: "Json Web Tokens"
subtitle: "Installing and Configuring Express application using Json Web Tokens"
lead: "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties."

category: [Json Web Tokens, Jwt, Express, Node]
permalink: /node/json-web-tokens/
---

Express application needed a middleware layer to handle authentication and access control.

<!-- end -->

# Json Web Tokens - JWT

[Json Web Tokens](https://jwt.io/)

## JWT for Express

[express-jwt](https://www.npmjs.com/package/express-jwt)

## Express App

```
npm install jsonwebtoken --save
npm install express-jwt --save
```

### `server.js`

```
require('./config/middleware.express')(app);
console.log('Application middleware is configured');

require('./config/routes')(app);
console.log('Application routes have been loaded');

module.exports = {app, runServer, closeServer};
console.log('Application is exported');
```

### `routes.js`

```
const jwt = require('express-jwt');
```

Use Jwt for the following routes, for example

```
app.use(jwt({ secret: AUTHENTICATION_KEY }).unless(function(req) {
let ok = [
	'/',       // home page
	'/dashboard',
	
	'/assets', // css, js, images, fonts
	
	'/login', '/auth/login',
	'/register', '/user/register',
	'/register/request-confirmation'
];
if (ok.indexOf(req.url) > -1) {
    return true;
}
if (req.url.startsWith('/user/register/')) {
    return true;
}
if (req.url.startsWith('/user/reset/update/')) {
    return true;
}
return false;
}));
``` 

When user logs in, the user credentials are validated. If they are correct, then create a token and return it.

```
const filtered_user = {
    id: user.id,
    username: user.username
};

const token = jwt.sign(filtered_user, AUTHENTICATION_KEY, { 
    expiresIn: 60 * 60
});
return res.status(200).json({ token });
```

The client code login code may be

```
$('#js--submit').submit(function(event) {
    event.preventDefault();
    var remember = $('#remember').is(':checked');
    $.ajax({
        url: '/auth/login',
        method: 'POST',
        data: {
            email: $(this).find('#email').val(),
            password: $(this).find('#password').val(),
            remember: remember
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
```

Notice the use of `localStorage`.


Subsequent requests to a protected end point must pass this token, thus the following

```
$.ajaxSetup({
    beforeSend: function (xhr) {   //Include the bearer token in header
        xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('token'));
    }
});
```

If an endpoint request returns a 401, unauthorized access, trigger a forced log out, for example

```
var request = $.ajax({
    url: APP.keys.SUBSCRIPTION_URL + '/items',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    type: 'POST'
});
request.fail(function(jqXHR, status) {
    if (jqXHR.status === 401) {
        APP.$DOM.main.trigger('force-sign-out');
    }
});
request.done(function(data) {
    APP.$DOM.main.trigger('retrieve-subscription-complete', [url, data]);
});
```

The forced log out and a user log out uses the same code

```
APP.$DOM.sign_out.click(function(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
});

APP.$DOM.main.on('force-sign-out', function() {
    localStorage.removeItem('token');
    window.location.href = '/';
});
```

```
function signOut() {
    localStorage.removeItem('token');
    window.location.href = '/';
}
   
document.getElementById('js--sign-out').addEventListener('click', function (e) {
    signOut();
    e.preventDefault();
});
```

Notice the token is removed from `localStorage`

Useful for changing menu items based on logged in status

```
function menuItems() {
    const token = localStorage.getItem('token');
    if (token) {
        var list = document.querySelectorAll('header .pure-menu-list li:not(.nohide)');
        for (var i = 0; i < list.length; i++) {
            list[i].classList.toggle('hide');
        }
    }
}
menuItems();
```








