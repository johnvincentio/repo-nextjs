---
meta-title: "Chrome Bookmarks | John Vincent"
meta-description: "Chrome Bookmarks"
meta-keywords: "Chrome"

title: "Chrome Bookmarks"
subtitle: "Chrome Bookmarks went missing"
lead: "It is a real pest when these go missing."

category: [Chrome]
permalink: /general/chrome-notes/
---

This appears to be a standard solution

<!-- end -->

### Checking

Bookmarks should be stored in:

   `/Users/jv/Library/Application Support/Google/Chrome/Default`

This directory no longer existed.

However, two new directories had been created:

    `/Users/jv/Library/Application Support/Google/Chrome/Profile 2`
    `/Users/jv/Library/Application Support/Google/Chrome/profile 3`

Thus my Bookmarks had been deleted.

### Solution

First retrieve Bookmarks from backup.

Then, reconfigure Chrome:
* Closed all Chrome windows
* Killed all Chrome tasks `(ps -ef \| grep -i chrome)`
* Start chrome
    * sign in
    * OK, Got it
* Close chrome and all chrome processes.
* Copy Bookmark to /Users/jv/Library/Application Support/Google/Chrome/Default/Bookmark
* Start chrome
* sign in, if needed

Browser has the correct bookmarks.
