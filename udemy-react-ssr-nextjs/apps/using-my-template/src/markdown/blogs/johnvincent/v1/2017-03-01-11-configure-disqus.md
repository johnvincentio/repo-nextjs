---
meta-title: "Adding Disqus to Ghost | John Vincent"
meta-description: "John Vincent's discussion on Adding Disqus to Ghost"
meta-keywords: "Adding Disqus to Ghost"

title: "Adding Disqus to Ghost"
subtitle: ""
lead: ""

category: [Disqus, Ghost, Jekyll Website]
permalink: /johnvincent/v1/adding-disqus-to-ghost/
---

This is part of a series of discussions regarding Deploying to a Digital Ocean Droplet. For more details, please see
[Overview of johnvincent.io website](/johnvincent/v1/overview/)

<!-- end -->

# Adding Disqus to Ghost

[Useful reference](http://academy.ghost.org/adding-disqus-to-your-ghost-blog/)

### Create and Configure Disqus Account

www.disqus.com

Sign up for an account.

Create a new site

* Website name: `ghost.johnvincent.io`
* Category: Tech
* Create Site>

Got it. Let's get started.

* Ghost

## Ghost install instructions:

* View the Universal Embed Code.

```
Paste the Disqus script anywhere between the opening {{#post}} and closing {{/post}} - where you'd like the Disqus comments to load. May need to remove any already existing code.
```

```
vi {ghost-install}/content/themes/Masonry-Ghost-Theme-master/post.hbs

- Remove the /* and the */ bits of code.
- Replace this.page.url = PAGE_URL;, with this.page.url = '{{url absolute="true"}}’;
- Replace this.page.identifier = PAGE_IDENTIFIER; with this.page.identifier = 'ghost-{{id}}';

```

became

```
var disqus_config = function () {
this.page.url = '{{url absolute="true"}}';
this.page.identifier = 'ghost-{{id}}';
};
```

### Adding a Comment Count

[Useful reference](http://academy.ghost.org/adding-a-comment-count-to-your-blog-with-disqus/)

```
vi {ghost-install}/content/themes/Masonry-Ghost-Theme-master/default.hbs

Place the following code before your site's closing </body> tag.

Inserted after footer tag and before script tags.

<script id="dsq-count-scr" src="//ghost-johnvincent-io.disqus.com/count.js" async></script>

```

## Update your post-meta details

Next, you'll need to open and locate the post-meta information that displays on the homepage of your theme.

In the Casper theme, the post-meta information is located in the <footer> block of code on the `loop.hbs file` (located in the partials directory of the theme.

For my theme, the post-meta information is located in `post.hbs` and `partials/loop.hbs`

```
vi {ghost-install}/content/themes/Masonry-Ghost-Theme-master/post.hbs

Insert the following code after time tag and before /footer tag:
<a href="{{url}}#disqus_thread”>Comments</a>

```


```
vi {ghost-install}/content/themes/Masonry-Ghost-Theme-master/partials/loop.hbs

Insert the following code after time tag and before /footer tag:
<a href="{{url}}#disqus_thread”>Comments</a>

```

### Restart Ghost

The comments and counts should now be appearing.

### Backup

Backup the useful files.
