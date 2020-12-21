---
meta-title: "Sending Emails from Express Application | John Vincent"
meta-description: "John Vincent's discussion on Sending Emails in an Express Application"
meta-keywords: "Node, Email, Express, Gmail"

title: "Sending Emails from Express Application"
subtitle: "Using Nodemailer and Gmail"
lead: "This is not a trivial task. Let's discuss."

category: [Node, Email, Nodemailer, Gmail]
permalink: /node/express-emails-gmail/
---

Sending emails from an Express Application is a standard requirement.

<!-- end -->

# Nodemailer

Npm package [Nodemailer](https://www.npmjs.com/package/nodemailer) is the standard.

```
npm install nodemailer --save
```

Gmail variables are defined in the environment. Thus, to access

`email.js`

```
const {
    GMAIL_SERVICE, GMAIL_AUTH_TYPE, GMAIL_AUTH_USER, GMAIL_AUTH_CLIENT_ID, GMAIL_AUTH_CLIENT_SECRET,
    GMAIL_AUTH_REFRESH_TOKEN, GMAIL_AUTH_ACCESS_TOKEN, GMAIL_FROM_EMAIL, GMAIL_SUPPORT_EMAIL
} = process.env;
```

All email tasks are performed in class `EmailUtils`, `email.js`

```
const nodemailer = require('nodemailer');
```

The actual sending of the email

```
sendEmail(emailData) {

    let auth = {
        "type": GMAIL_AUTH_TYPE,
        "user": GMAIL_AUTH_USER,
        "clientId": GMAIL_AUTH_CLIENT_ID,
        "clientSecret": GMAIL_AUTH_CLIENT_SECRET,
        "refreshToken": GMAIL_AUTH_REFRESH_TOKEN,
        "accessToken": GMAIL_AUTH_ACCESS_TOKEN
    };

    const transporter = nodemailer.createTransport({
        service: GMAIL_SERVICE,
        auth
    });

    logger.info(`Attempting to send email from ${emailData.from}`);
    transporter
        .sendMail(emailData)
        .then(info => console.log(`Email sent: ${info.response}`))
        .catch(err => console.log(`Problem sending email: ${err}`));
}
```

`emailData` has a specific structure

```
const subject = 'Subject';
const text = template.replace('{{email_url}}', email_url);
const html = `<p>Html email </p><ul><li>Name: abcd</li><li>Email:  abc@def.com</li><li>Message: Hi</li></ul>`;
var mailOptions = {
    from: '"My Title"' + GMAIL_FROM_EMAIL,
    to,
    subject,
    text
};
```

Note that Html is optional, if it is not defined the text variable will be used.

## Nodemailer Configuration

[Nodemailer OAuth2](https://nodemailer.com/smtp/oauth2/) document is a good reference. I will configure using  [3. Set up 3LO authentication](https://nodemailer.com/smtp/oauth2/#example-3)

# Gmail Configuration

This [YouTube video](https://www.youtube.com/watch?v=JJ44WA_eV8E) was nearly there.

This is [slightly useful](https://developers.google.com/gmail/api/quickstart/nodejs)

The Gmail variables are stored in the environment

```
GMAIL_SERVICE=Gmail
GMAIL_AUTH_TYPE=OAuth2
GMAIL_AUTH_USER=<gmail address used for the authentication, see below>

GMAIL_FROM_EMAIL=email@johnvincent.io
GMAIL_SUPPORT_EMAIL=support@johnvincent.io

GMAIL_AUTH_CLIENT_ID
GMAIL_AUTH_CLIENT_SECRET
GMAIL_AUTH_REFRESH_TOKEN
GMAIL_AUTH_ACCESS_TOKEN
```

1. [Google API Manager](https://console.developers.google.com)
2. Select or add a project, `Project = johnvincentio`
3. Gmail API
	4. Enable
4. Credentials
5. OAuth consent Screen.
	6. Product name: your Project
	7. Save
8. Credentials
9. Create Credentials
	10. OAuth client id
	11. Web Application, `name = johnvincentio`
		12. or maybe: Other, `name = johnvincentio`
	12. Authorized redirect URIs: 
		13. https://developers.google.com/oauthplayground/
		14. Create>
		15. Copy the `clientId` to `GMAIL_AUTH_CLIENT_ID`
		16. Copy `clientSecret` to `GMAIL_AUTH_CLIENT_SECRET`
12. [Google Developers OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
13. Click gear icon (top right)
14. Check: Use your own OAuth credentials
15. Enter the client id and Client Secret fields from OAuth Client id (same as above).
16. Left pane, input your own scopes
	17. https://mail.google.com
	18. Authorize APIs
		19. Allow my email address to access my email.
		20. Exchange authorization code for tokens.
		21. Check: Auto-refresh the token before it expires
		22. Copy refresh token to `GMAIL_AUTH_REFRESH_TOKEN`

## Extra Gmail Addresses using G Suite

[This Google doc helps](https://productforums.google.com/forum/#!topic/gmail/mlYq_mB6NGw)
 
1. Login to Gmail
2. Settings
3. Accounts
4. Add another email address
	5. support@johnvincent.io
		6. Check: treat as an alias
		7. Specify a different “reply-to” address
		8. Reply to address:
			9. support@johnvincent.io 
		10. next step>>>
		11. send verification>
	12. Email will arrive. Click on the link
		13. Confirm>
	14. Refresh Gmail
		15. Settings
		16. Accounts

Repeat for email@johnvincent.io

### Random Strings

`email.js`

```
const randomstring = require('randomstring');
```

To create the URL

```
userTaskEmail(id, req, to) {
    let random = randomstring.generate({
        length: 20,
        charset: 'alphanumeric'
    });

    let email_url = `${req.protocol}://${req.get('host')}/user/a/b/${id}/${random}`;
     
```




