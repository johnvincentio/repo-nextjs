---
meta-title: "Google Custom Search | John Vincent"
meta-description: "John Vincent's configuring Google Custom Search"
meta-keywords: "Google, Google Custom Search, Jekyll"

title: "Google Custom Search and Jekyll"
subtitle: "Configuring Google Custom Search and implementing into Jekyll"
lead: "A simple way to add Search Capability to the blog."

category: [Google, Google Search, Jekyll]
permalink: /website/google-custom-search/
---

Configuring Google Custom Search with Jekyll is straightforward. Let us begin.

<!-- end -->

## Simple Search 

Open Google tab and enter search string of:

```
site:www.johnvincent.io mongodb
```

Simple yet effective. However, it looks like a Google search page and so let's try something else.

## Configuring Google

Open [Google Custom Search](https://cse.google.com/cse/all)

Add Search Engine

Sites to Search: `*.johnvincent.io`

which is the domain.

Name of search engine: `*.johnvincent.io`

Create

Get code>

Insert the code into your Html.

## Configuring Jekyll

The search is required for the blogs page, implemented within a 'well' class.

``` 
<!-- Google Custom Search, Side Widget Well -->
<div class="well google-search">
    {% include google-search.html %}
</div>
```

`google-search.html` contains only the code from google custom search.

Test the page and see how it looks. Yuk, let's do something about it.

### Colors

The google custom search will be embedded into:

```
.well
	Border color: #e3e3e3
	Background-color: #f5f5f5
```

The site uses the following for buttons

```
.btn-primary
	Border color: #2e6da4
	Background-color: #337ab7

hover:
	background-color: #23527c;
```

The button colors probably would work better here.

## Refining Google Code

From Google Custom Search, edit the search engine.

Look and Feel, Customize

Let's note the defaults:

```
Defaults:
General
	font: arial, sans-serif
	border-color: #ffffff
	background-color: #ffffff

Search Box
	Border color: #D9D9D9

Search Button:
	Border color: #666666
	Background-color: #CECECE

Refinement
Normal:
	Border color: #E9E9E9
	Background-color: #E9E9E9
Selected:
	Border color: #FF9900
	Background-color: #FFFFFF
```

Let's change to:

```
General
	font: arial, sans-serif
	Border color: #e3e3e3
	Background-color: #f5f5f5

Search Button:
	Border color: #2e6da4
	Background-color: #337ab7

Search box:
	Border color: #f5f5f5
```

Save and Get code, plug it into `google-search.html`

## Image

The search icon is not appearing.

The code to render the search icon:

```
<input type="image" src="https://www.google.com/uds/css/v2/search_box_icon.png" class="gsc-search-button gsc-search-button-v2" title="search">
```

To determine the image size:

* Save the image to disk and finder.
* Get info

revealing image is `13x13`


## SASS Adjustments

Still looks rather horrible. Let's make some changes.

```
.google-search {
    padding-left: 15px;
    padding-right: 15px;

    .gsc-control-cse {
        padding: 0px;
        border: none;
    }

    .gsc-input-box {
        height: 25px;
    }

    .gsc-search-button {

        input {        /* image is 13x13 */
            width: 50px;
            height: 25px;
            background-color: #337ab7;
            border-color: #2e6da4;
            border-radius: 4px;
            padding: 6px 18px;
            margin: 0;
            margin-left: 5px;

            &:hover {
                background-color: #23527c;
                input {
                    background-color: #23527c;
                }
            }
            &:active {
                @include opacity(0.3);
            }
        }
    }
}
```

Much better. To see the results, visit [my blog page](/blog/)
