---
meta-title: "Node Basic authentication and access control | John Vincent"
meta-description: "Node Basic authentication and access control"
meta-keywords: "Node, Authentication, Access Control, Passport, Bcryptjs"

title: "Node Basic authentication and access control"
subtitle: "Using Passport to protect endpoints"
lead: ""

category: [Node, Authentication, Access Control, Passport, Bcryptjs]
permalink: /node/node-authentication/
---

Build app to demonstrate basic authentication.

<!-- end -->

From Thinkful course Node 3.3.1.

## Final Result

[My Git repository](https://github.com/johnvincentio/node-basic-auth)

## Getting Started

#### Clone repository

```
cd MyDevelopment/github-clones

git clone https://github.com/Thinkful-Ed/node-basic-auth
```

Create Github repository <b>node-basic-auth</b>

#### Copy source files from:

    MyDevelopment/github-clones/node-basic-auth

to:

    MyDevelopment/github/thinkful/node-basic-auth

#### Commit to repository

```
cd MyDevelopment/github/thinkful
create-repo node-basic-auth
```

#### Install dependencies

```
cd node-basic-auth
npm install
```

#### Start app

```
npm start
```

## Test App Using Postman

List users

```
GET localhost:8080/users
```

return no records.

Add a User:

```
POST localhost:8080/users
Headers:
    key: content-type
    value: application/json
Body: raw

{
    "username": "foo",
    "password": "password",
    "firstName": "foo"
}
```

Record is created

```
status: 201
json:
{
  "username": "foo",
  "firstName": "foo",
  "lastName": ""
}
```

Query from database shows record has been created.

List users

```
GET localhost:8080/users
```

## Access Control

Endpoint with access control

```
GET localhost:8080/users/me
```

returns:

```
status: 401 Unauthorized
content: Unauthorized

Headers:
WWW-Authenticate →Basic realm="Users"
```

To authenticate, we need to use the "basic" strategy at realm "Users".


#### Add Authorization Header

Postman

```
GET localhost:8080/users/me
Authorization: Basic Auth

Username: foo
Password: password
```

Update Request which creates a Header.

Send now returns:

```
status: 200
content:
{
  "user": {
    "username": "foo",
    "firstName": "foo",
    "lastName": ""
  }
}
```

### Encrypting Passwords

`models.js`

```
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};
```

### Data validation in `router.js`

```
router.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'No request body'});
    }

    if (!('username' in req.body)) {
        return res.status(422).json({message: 'Missing field: username'});
    }

    let {username, password, firstName, lastName} = req.body;

    if (typeof username !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: username'});
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({message: 'Incorrect field length: username'});
    }

    if (!(password)) {
        return res.status(422).json({message: 'Missing field: password'});
    }

    if (typeof password !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: password'});
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({message: 'Incorrect field length: password'});
    }

    // check for existing user
    return User.find({username})
        .count()
        .exec()
        .then(count => {
            if (count > 0) {
                return res.status(422).json({message: 'username already taken'});
            }
            // if no existing user, hash password
            return User.hashPassword(password);
        })
        .then(hash => {
            return User
                .create({
                    username: username,
                    password: hash,
                    firstName: firstName,
                    lastName: lastName
                });
        })
        .then(user => {
            return res.status(201).json(user.apiRepr());
        })
        .catch(err => {
            res.status(500).json({message: 'Internal server error'});
        });
});
```

### Protecting Endpoints with Passport

`router.js`

```
const passport = require('passport');

...

const basicStrategy = new BasicStrategy((username, password, callback) => {
    let user;
    User.findOne({username: username})
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                return callback(null, false, {message: 'Incorrect username'});
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return callback(null, false, {message: 'Incorrect password'});
            } else {
                return callback(null, user);
            }
        });
});

passport.use(basicStrategy);
router.use(passport.initialize());
```

Protect endpoint

```
router.get('/me',
    passport.authenticate('basic', {session: false}), (req, res) => res.json({
        user: req.user.apiRepr()
    })
);
```

Note:

```
session: true
    authenticate once to make successive requests.

session: false
    supply credentials on each request.
```

