---
meta-title: "Google Analytics for Ghost | John Vincent"
meta-description: "John Vincent's discussion on Google Analytics for Ghost"
meta-keywords: "Google Analytics for Ghost"

title: "Google Analytics for Ghost"
subtitle: ""
lead: ""

category: [Google Analytics, Ghost, Jekyll Website]
permalink: /johnvincent/v1/google-analytics-for-ghost/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/v1/overview/)

<!-- end -->

# Google Analytics for Ghost

```
https://analytics.google.com
```

* Add Account
* Login
* Admin

* Account (list with a drop-down)

From drop-down

	* Create new account.

```
Account name: ghost
Website name: Ghost Blog
Website url: www.ghost.johnvincent.io
```

* Get Tracking Id
	* Shows Website Tracking Code:
	* Copy the code

### Add to Ghost Theme

For your active theme:

```
cd /var/www/ghost/content/themes/{your-theme}
```

* Edit `default.hbs`
	* Paste the code before the closing body tag and before the script includes.
	* Save.

```
Restart Nginx
sudo systemctl restart nginx

Restart Ghost.
pm2 restart all
```

# Delete Google Analytics Account

Login.

Admin

* Account (list with a drop-down)
* Select Account to be deleted.
* Account Settings

* Middle, far right, see:
	* Move to Trash Can

# Review Google Analytics Data

* Login
* List Accounts
* Select All Web Site Data

