---
meta-title: "Configure Mailgun for Ghost | John Vincent"
meta-description: "John Vincent's discussion on Configure Mailgun for Ghost"
meta-keywords: "Mailgun, Ghost"

title: "Configure Mailgun for Ghost"
subtitle: ""
lead: ""

category: [Mailgun, Ghost, Jekyll Website]
permalink: /johnvincent/v1/configure-mailgun-for-ghost/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/v1/overview/)

<!-- end -->

# Configure Mailgun

[Get Mailgun account](http://www.mailgun.com/)

[Login to Mailgun.com](https://app.mailgun.com/app/dashboard)

* Select Domains (top nav, left)
* See list of domains
* Select your domain

Note:

```
Default SMTP login
Default password
```

## Configure Ghost

```
cd /var/www/ghost
vi config.js:
```

```
production: {
    url: 'http://ghost.johnvincent.io',
    mail: {
        transport: 'SMTP',
              options: {
                  service: 'Mailgun',
                  auth: {
                      user: "{Default SMTP login}",
                      pass: "{Default password}"
                  }
              }
          },
```

## Restart Ghost

```
cd /var/www/ghost
sudo npm start --production
```

## Setup Ghost Account

```
https://www.ghost.johnvincent.io/ghost
```

As no account exists:

```
https://www.ghost.johnvincent.io/ghost/setup/one/
```

Set an account (store this information)

* email:
* password:

## Test Lost Password

```
https://www.ghost.johnvincent.io/ghost/signin
```

* Sign out

* Enter Ghost email address
* Forgot?

Ensure you get an email at the email address of the Mailgun account.

