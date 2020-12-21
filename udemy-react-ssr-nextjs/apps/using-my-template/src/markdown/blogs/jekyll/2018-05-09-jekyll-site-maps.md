---
meta-title: "Site Maps and Jekyll | John Vincent"
meta-description: "John Vincent's configuring Site Map using Jekyll"
meta-keywords: "Site Map, Jekyll"

title: "Configuring Site Map using Jekyll"
subtitle: ""
lead: "Site maps can be generated using a plug-in but rolling your own is really quite simple"

category: [Jekyll]
permalink: /jekyll/jekyll-site-map/
---

Let's discuss creating `sitemap.xml` with Jekyll

<!-- end -->

# References

Generating a 
[sitemap](http://www.independent-software.com/generating-a-sitemap-xml-with-jekyll-without-a-plugin.html) 
 without a plugin.

## Plugin

Start by disabling the plugin.

Edit `_config.yml`, change

```
gems: [jekyll-sitemap, jekyll-paginate]
```

to

```
gems: [jekyll-paginate]
```

and remove from `Gemfile`

```
# gem 'jekyll-sitemap'
```

## Define some rules

Do not publish this page, exclude from sitemap.xml and exclude from feed.xml

To exclude, add to page yaml

```
sitemap: false
```

## Generate Sitemap.xml

Create file `sitemap.xml`

```
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  {% for post in site.posts %}
		{% if post.sitemap != false %}
			<url>
				<loc>{{ site.url }}{{ post.url }}</loc>
				<lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
				<changefreq>weekly</changefreq>
				<priority>1.0</priority>
			</url>
		{% endif %}
  {% endfor %}



  {% for page in site.pages %}
    {% if page.sitemap != false %}
      <url>
        <loc>{{ site.url }}{{ page.url }}</loc>
        <lastmod>{{ site.time | date_to_xmlschema }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
       </url>
    {% endif %}
  {% endfor %}

</urlset>
```

## Verify

Check `destination/sitemap.xml`

Note that Jekyll regenerating files does not always pick up changes to `md` files.

I have found it sometimes necessary to alter `sitemap.xml` to force a regeneration.
