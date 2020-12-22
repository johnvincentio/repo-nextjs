---

meta-title: "Jekyll Rouge Highlighter | John Vincent"
meta-description: "Configuring Rouge Highlighter using Jekyll"
meta-keywords: "Jekyll, Rouge"

title: "Jekyll Rouge Highlighter"
subtitle: "Configuring Rouge Highlighter"
lead: "Jekyll Highlighting using Rouge"

category: [Jekyll, Rouge]
permalink: /jekyll/jekyll-rouge/
---

This article describes how to configure Rouge to handle formatting of Highlights.

<!-- end -->

# General

[Jekyll Configuration](https://jekyllrb.com/docs/configuration/)

[Kramdown Options](https://kramdown.gettalong.org/options.html)

[Kramdown parser](https://kramdown.gettalong.org/parser/kramdown.html)

[Kramdown Rouge](https://kramdown.gettalong.org/syntax_highlighter/rouge.html)

[tab-size](https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size)

# Install

Ensure rouge is installed. Need 1.5 or later.

Check `Gemfile.lock`, it should already be there.

## Use Rouge

`_config.yml`

```
markdown: kramdown
highlighter: rouge

kramdown:
  syntax_highlighter: rouge
```

### Line Numbers

```
markdown: kramdown
highlighter: rouge

kramdown:
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    block:
      line_numbers: true
      start_line: 1
```

### Set Tab Size

The default tab size for a browser is 8 spaces. This will not do.

To change this to 2 spaces, add to css

```
pre {
	tab-size: 2;
	-moz-tab-size: 2;
}
```

I am using Sass and so I add to `all.scss`
