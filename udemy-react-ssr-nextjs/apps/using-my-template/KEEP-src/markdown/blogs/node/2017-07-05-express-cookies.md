---
meta-title: "Express Cookies | John Vincent"
meta-description: "John Vincent's discussion on Express Cookies"
meta-keywords: "Express Cookies"

title: "Express Cookies"
subtitle: "Using Express Cookies"
lead: "Handling Cookies for an Express App"

category: [Express, Cookies]
permalink: /node/express-cookies/
---

Straightforward stuff, so let us begin.

<!-- end -->

# NPM Cookie-parser

[npm cookie-parser](https://www.npmjs.com/package/cookie-parser)

## Configure

Define the name of the application cookie.

`config/config.js`

```
exports.COOKIE_NAME = 'my-app-cookie-name';
```

## Access

I consider this to be middleware. Thus

`config/middleware.express.js`

```
const cookieParser = require('cookie-parser');

...

app.use(cookieParser());
```

### List Cookies

`config/middleware.express.js`

```
const listCookies = (req, res, next) => {
    console.log('Cookies: ', req.cookies);  // Cookies that have not been signed
    console.log('Signed Cookies: ', req.signedCookies); // Cookies that have been signed
    next();
};
```

### List the Request

`config/middleware.express.js`

```
const logRequest = (req, res, next) => {
    const logObj = {
        time: (new Date()).toTimeString(),
        method: req.method,
        hostname: req.hostname,
        path: req.path,
        "content type": req.get('Content-Type'),
        query: JSON.stringify(req.query),
        body: JSON.stringify(req.body)
    };
    Object.keys(logObj).forEach(key => console.log(`request ${key}: ${logObj[key]}`));
    next();
};

...

app.use(cookieParser());

app.all('/', logRequest);
app.all('/', listCookies);
```    

`app.use(cookieParser())`

* parses request cookies, 
* populating `req.cookies`
* when the secret is passed, populates `req.signedCookies`
	* secret is used for signing the cookies.

For a signed cookie

```
app.use(cookieParser('my secret here'));
```

## Create a Cookie

General rule for setting `cookie maxage`

```
maxage = number of days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
```

The application can create a cookie upon successful login.

```
if (remember) {
    const cookie_options = {
        maxAge: 1000 * 60 * 15,      // would expire after 15 minutes
        httpOnly: false,             // The cookie only accessible by the web server
        signed: false                // Indicates if the cookie should be signed
    };
    res.cookie(COOKIE_NAME, email, cookie_options);
}
```

When the response is sent, the cookie will be sent with the response.

For example, here the cookie is sent with a token.

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

Another use case

```
app.get('/', (req, res) => {
    let cookie = req.cookies[cookieName];
    if (req.cookies[cookieName] === undefined) {
        res.cookie(cookieName, 'my-value', cookie_options);
        console.log('cookie created successfully');
    }
    else {
        console.log('Cookie found, value is', cookie);
    }
    res.sendFile(__dirname + '/views/index.html');
});
```

## Delete a Cookie

* `res.clearCookie(COOKIE_NAME);`

During development, I like to use an endpoint to delete a cookie. For example:

```
app.get('/forget-cookie', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.send('cookie cleared');
});
```

## JavaScript Client

There are some packages that make this a little easier, but let's go native.

List Cookies

```
function listCookies() {
    var allcookies = document.cookie;
    var cookiearray  = allcookies.split(';');
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        console.log("Key is : " + name + " and Value is : " + value);
    }
}
```

Get Cookie value. This method requires a cookie name. The value is retrieved and decoded.

```
function getUsernameFromCookie(cookieName) {
    var allcookies = document.cookie;
    var cookiearray = allcookies.split(';');
    for (var i = 0; i < cookiearray.length; i++) {
        var name = cookiearray[i].split('=')[0];
        if (cookieName === name.trim()) {
            return decodeURIComponent(cookiearray[i].split('=')[1]);
        }
    }
    return '';
}
```

## Use the Cookie

Using a real example. A login form should get the username from the cookie, if it exists.

```
$(function() {
    $("#email").focus();

    var cookie_email = getUsernameFromCookie('my-app-cookie');
    $('#email').val(cookie_email);
});
```

When the page loads, get the value of the cookie 'my-app-cookie' and copy it to the email address field.

## Signed Cookie

The signed property is true.

Thus

```
if (remember) {
    const cookie_options = {
        maxAge: 1000 * 60 * 15,
        httpOnly: false,
        signed: true
    };
    res.cookie(COOKIE_NAME, email, cookie_options);
}
```

The cookie will still be visible, but it has a signature, so it can detect if the client modified the cookie.

It works by creating a HMAC of the value (current cookie), and base64 encoded it. When the cookie gets read, it recalculates the signature and makes sure that it matches the signature attached to it.

If it does not match, it will give an error.

To access a signed cookie

```
req.signedCookies['name']
```
