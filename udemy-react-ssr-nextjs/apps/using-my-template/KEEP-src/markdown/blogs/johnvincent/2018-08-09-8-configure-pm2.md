---
meta-title: "Configure PM2 | John Vincent"
meta-description: "John Vincent's discussion on Configure PM2"
meta-keywords: "Configure PM2"

title: "Configure PM2"
subtitle: ""
lead: ""

category: [Ubuntu, Nginx, Johnvincent.io]
permalink: /johnvincent/configure-pm2/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/overview/)

<!-- end -->

# Install PM2

For details, please see [Install PM2](/website/pm2-overview/))

Please see section `Start PM2 on System Startup`. This ensures that PM2 will be automatically restarted on system start.

# Configure PM2

`~/bin/handle-pm2`

```
#!/bin/bash
#
# script to add task to pm2 if not already added, or to restart
# the task if it has already been added.
#
echo "Current PM2 status"
pm2 list
#
echo "Check status of task"
pm2 describe server > /dev/null
RUNNING=$? 
if [ "${RUNNING}" -ne 0 ]; then
  echo "Adding task to PM2"
  cd /var/www/music/server
  pm2 start server.js
else
  echo "Restarting task"
  pm2 restart server
fi;

#
echo "Show current pm2 status"
pm2 list

echo "Restarting PM2"
pm2 restart all
```

This file is invoked from the deploy scripts.
