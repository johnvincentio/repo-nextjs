---
meta-title: "Microdata | John Vincent"
meta-description: "John Vincent's discussion on Microdata"
meta-keywords: "Html, Microdata"

title: "HTML Microdata"
subtitle: "Creating HTML Microdata"
lead: "Microdata is a WHATWG HTML specification used to nest metadata within existing content on web pages."

category: [Microdata, Html]
permalink: /website/html-microdata/
---

Search engines, web crawlers, and browsers can extract and process Microdata from a web page and use it to provide a richer browsing experience for users.

Search engines benefit greatly from direct access to this structured data because it allows them to understand the information on web pages and provide more relevant results to users.

Microdata uses a supporting vocabulary to describe an item and name-value pairs to assign values to its properties.

Microdata is an attempt to provide a simpler way of annotating HTML elements with machine-readable tags than the similar approaches of using RDFa and microformats.

<!-- end -->

# Microdata (HTML)

[HTML Microdata](https://www.w3.org/TR/microdata/)

[Mozilla Microdata](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata)

[Schema.org](http://schema.org/)

[Organization of Schemas](http://schema.org/docs/schemas.html)

[Schema.org Documentation](http://schema.org/docs/documents.html)

[Vocabularies or Full Schema Hierarchy](http://schema.org/docs/full.html)

## Microdata Overview

Microdata defines five HTML attributes that can be applied to any HTML5 tag. Most developers will only ever use:

* itemscope
* itemtype
* itemprop

`Itemref` and `itemid` aren’t necessary to get up and running with microdata and aren’t needed by the most common formats.

* Itemscope - Indicates the element is a microdata element and its child elements are part of its microdata format.
* Itemtype - Defines the vocabulary to be used by the microdata format.
* Itemid - The unique identifier of the item, if defined by the microdata vocabulary.
* Itemprop - An individual data element.
* Itemref - Allows a microdata element to reference another element on the page to define it by either HTML id or by itemid.

## Microdata Schema Testers

[Google’s Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/u/0/)

## Microdata Example 1

A simple example from [Wikipedia](https://en.wikipedia.org/wiki/Microdata_(HTML))

```
<section> Hello, my name is John Doe, I am a graduate research assistant at
the University of Dreams.
My friends call me Johnny. 
You can visit my homepage at <a href="http://www.JohnnyD.com">www.JohnnyD.com</a>.
I live at 1234 Peach Drive, Warner Robins, Georgia.
</section>
```

Here is the same markup with added Microdata:

```
<section itemscope itemtype="http://schema.org/Person"> 
	Hello, my name is 
	<span itemprop="name">John Doe</span>, 
	I am a 
	<span itemprop="jobTitle">graduate research assistant</span> 
	at the 
	<span itemprop="affiliation">University of Dreams</span>. 
	My friends call me 
	<span itemprop="additionalName">Johnny</span>. 
	You can visit my homepage at 
	<a href="http://www.JohnnyD.com" itemprop="url">www.JohnnyD.com</a>. 
	<section itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
		I live at 
		<span itemprop="streetAddress">1234 Peach Drive</span>,
		<span itemprop="addressLocality">Warner Robins</span>,
		<span itemprop="addressRegion">Georgia</span>.
	</section>
</section>
```

## Microdata Example 2

```
<div itemscope itemtype="http://schema.org/SoftwareApplication">
  <span itemprop="name">Angry Birds</span> -

  REQUIRES <span itemprop="operatingSystem">ANDROID</span><br>
  <link itemprop="applicationCategory" href="http://schema.org/GameApplication"/>

  <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
    RATING:
    <span itemprop="ratingValue">4.6</span> (
    <span itemprop="ratingCount">8864</span> ratings )
  </div>

  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    Price: $<span itemprop="price">1.00</span>
    <meta itemprop="priceCurrency" content="USD" />
  </div>
</div>
```


## Getting Started

[Getting Started](http://schema.org/docs/gs.html) is a good place to start.


## Global Attributes

Global attributes

[`itemid`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemid) – The unique, global identifier of an item.

[`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) – Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair.

[`itemref`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemref) – Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. `Itemref` provides a list of element ids (not `itemids`) with additional properties elsewhere in the document.

[`itemscope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemscope) – `Itemscope` (usually) works along with `itemtype` to specify that the HTML contained in a block is about a particular item. `Itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `Itemtype` is a valid URL of a vocabulary (such as Schema.org) that describes the item and its properties context.

[`itemtype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemtype) – Specifies the URL of the vocabulary that will be used to define `itemprop` (item properties) in the data structure. `Itemscope` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active.



## More Examples

```
<div itemscope itemtype="http://schema.org/Person">
  <a href="alice.html" itemprop="url">Alice Jones</a>
</div>
<div itemscope itemtype="http://schema.org/Person">
  <a href="bob.html" itemprop="url">Bob Smith</a>
</div>
```

```
<div itemscope itemtype ="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <div itemprop="director" itemscope itemtype="http://schema.org/Person">
  Director: <span itemprop="name">James Cameron</span> (born <span itemprop="birthDate">August 16, 1954</span>)
  </div>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html" itemprop="trailer">Trailer</a>
</div>
```

```
<div itemscope itemtype="http://schema.org/Event">
  <div itemprop="name">Spinal Tap</div>
  <span itemprop="description">One of the loudest bands ever
  reunites for an unforgettable two-day show.</span>
  Event date:
  <time itemprop="startDate" datetime="2011-05-08T19:30">May 8, 7:30pm</time>
</div>
```

`link` and `href` to unambiguously specify the availability

```
<div itemscope itemtype="http://schema.org/Offer">
  <span itemprop="name">Blend-O-Matic</span>
  <span itemprop="price">$19.95</span>
  <link itemprop="availability" href="http://schema.org/InStock"/>Available today!
</div>
```

* `itemtype="http://schema.org/Book"`
* `itemprop="url"`

```
<div itemscope itemtype="http://schema.org/Book">
  <span itemprop="name">The Catcher in the Rye</span>—
  by <span itemprop="author">J.D. Salinger</span>
  Here is the book's <a itemprop="url" href="http://en.wikipedia.org/wiki/The_Catcher_in_the_Rye">Wikipedia page</a>.
</div>
```

## More Examples

```
<div class="col-12">
    <itemscope itemtype="http://schema.org/Movie" />
    <h1><span itemprop="name">Search YouTube</span></h1>
</div>

<section role="contentinfo" itemscope itemtype="http://schema.org/CreativeWork">
    <div class="row clearfix">
        <div class="col-4">
            <figure class="box">
                <img src="images/rey_square.png" alt="Ray - Protagonist, from Tatooine">
                <figcaption>
                    <p itemprop="character">Ray</p>Protagonist, from Tatooine
                </figcaption>
            </figure>
        </div>
        <div class="col-4">
            <figure class="box">
                <img src="images/finn_square.png" alt="Finn - Storm Trooper, befriends Ray">
                <figcaption>
                    <p itemprop="character">Finn</p>Storm Trooper, befriends Ray
                </figcaption>
            </figure>
        </div>
        <div class="col-4">
            <figure class="box">
                <img src="images/kylo_square.png" alt="Kylo - Main Villain, or is he?">
                <figcaption>
                    <p itemprop="character">Kylo</p>Main Villain, or is he?
                </figcaption>
            </figure>
        </div>
    </div>

    <div class="row clearfix">
        <div class="col-4">
            <figure class="box">
                <img src="images/poe_square.png" alt="Poe - Neutral Pilot">
                <figcaption>
                    <p itemprop="character">Poe</p>Neutral Pilot
                </figcaption>
            </figure>
        </div>
        <div class="col-4">
            <figure class="box">
                <img src="images/chewbacca_square.png" alt="Chewbacca - A great first mate">
                <figcaption>
                    <p itemprop="character">Chewbacca</p>A great first mate
                </figcaption>
            </figure>
        </div>
        <div class="col-4">
            <figure class="box">
                <img src="images/yoda_square.png" alt="Yoda - Wise old Jedi master">
                <figcaption>
                    <p itemprop="character">Yoda</p>Wise old Jedi master
                </figcaption>
            </figure>
        </div>
    </div>
</section>
```

```
<main role="main">
    <article role="contentinfo" itemscope itemtype="http://schema.org/Person">
        <section id="contact-info">
            <header>
                <h1>Contact Information</h1>
            </header>
            <h2 itemprop="name">Sally Duck</h2>
            <figure>
                <img role="presentation" itemprop="image" height="250px" alt="Sally Duck"
                src="http://images.clipartpanda.com/donald-duck-clip-art-thumbs_donald-duck-vectors11.jpg">
                <figcaption>Sally at Duck Theatre</figcaption>
            </figure>
            <address itemprop="address">
                Website:
                <a itemprop="url" href="www.sally-duck.com">
                    www.sally-duck.com
                </a>
                <br/>
                Email:
                <a itemprop="email" href="mailto:jv2351mf@gmail.com?Subject=Please contact me" target="_blank">
                    jv2351mf@gmail.com
                </a>
                <br/>
                Telephone:
                <a itemprop="telephone" href="tel:+12016394170">
                    201-639-4170
                </a>
            </address>
        </section>
        <section id="education">
            <hgroup>
                <h1>Education</h1>
                <h2 itemprop="alumniOf">
                    <a itemprop="url" href="www.cartoon-college.com">
                        Cartoon College
                    </a>
                </h2>
            </hgroup>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, adipisci modi voluptas, labore praesentium quis autem deserunt, alias architecto est ad magni debitis voluptatibus! Enim.
            </p>
        </section>
        <section id="employment">
            <h1>Employment</h1>
            <hgroup>
                <h2 itemprop="worksFor">
                    <a itemprop="url" href="www.united-ducks.com">
                        United Ducks
                    </a>
                </h2>
                <h3 itemprop="jobTitle">Chief Duck</h3>
            </hgroup>
            <p>April 2001 to the present</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem recusandae in esse praesentium. Earum velit dicta architecto aperiam at pariatur, excepturi, nisi est perspiciatis nobis, similique alias aliquid, quis sit?
            </p>
            <hgroup>
                <h2 itemprop="worksFor">
                    <a itemprop="url" href="www.c21-duck.com">
                        21st Century Duck
                    </a>
                </h2>
                <h3 itemprop="jobTitle">Senior Duck</h3>
            </hgroup>
            <p>Jan 1998 - April 2001</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit adipisci modi ratione deserunt, necessitatibus numquam a nostrum assumenda non quasi sit esse incidunt itaque placeat facilis!
            </p>
        </section>

        <section id="volunteer">
            <h1>Sally Volunteering</h1>
            <p>
               Sally is a founder member of the
                <a itemprop="memberOf" href="www.sally-duck-foundation.net">
                    Sally Duck Foundation
                </a>
                offering children's entertainment in hospitals and schools. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi reprehenderit, quae qui.
            </p>
            <address itemprop="address">
                For more information, please
                email:
                <a itemprop="email" href="mailto:sally-duck@gmail.com?Subject=Sally Duck Foundation" target="_blank">
                    sally-duck@gmail.com
                </a>
            </address>
            <figure aria-labelledby="duck-trio" role="group">
                <img height="250px" src="http://www.hdwallpapersfreedownload.com/uploads/large/cartoons/mickey-mouse-donald-duck-hd-wall-paper.jpg" alt="Sally and Friends Singing Trio">
                <figcaption id="duck-trio">
                    Sally and Friends Singing Trio singing <cite>Duck Soup</cite>
                </figcaption>
            </figure>
        </section>
    </article>
</main>

``` 

```
<main role="main">
    <section id="jobs-list" role="contentinfo" itemscope itemtype="http://schema.org/JobPosting">
        <ul>
            <li>
                <span class="before-a" itemprop="datePosted">June 22</span>
                <a href="#" itemprop="title">Technical Project Manager</a>
                <span class="after-a" itemprop="jobLocation">Midtown East</span>
            </li>
            <li>
                <span class="before-a" itemprop="datePosted">June 21</span>
                <a href="#" itemprop="title">Frontend Developer</a>
                <span class="after-a" itemprop="jobLocation">SoHo</span>
            </li>
            <li>
                <span class="before-a" itemprop="datePosted">June 20</span>
                <a href="#" itemprop="title">Senior Python Developer / Co-founder</a>
                <span class="after-a" itemprop="jobLocation">Flatiron</span>
            </li>
        </ul>
    </section>
</main>
```

```
<div>
    <input id="email" name="email" type="email" required placeholder="Email Address"
        itemprop="email" itemscope itemtype="http://schema.org/Person"/>
</div>

<div>
    <input id="password" name="password" type="password" required placeholder="Password"
        itemprop="accessCode" itemscope itemtype="http://schema.org/Thing"/>
</div>
```

`header.hbs`

```
<div class="header-logo" role="presentation" itemscope itemtype="http://schema.org/Product">
    <h1>
        <a href="/">
            <svg>
                <use xlink:href="#greek-1"></use>
            </svg>
            <span itemprop="name"><span class="logo">Feed</span>iator</span>
        </a>
    </h1>
</div>
```

`home.hbs`

```
<ul class="features container" role="contentinfo" itemscope itemtype="http://schema.org/Product">

...

<p itemprop="description">
    Subscribe to your favorite feeds, keep up-to-date with the latest stories.
    Follow any one on the web.
</p>

<p itemprop="description">
    <span itemprop="name">Feediator</span> features a clean, simple reading experience.
Read the content in context, the way it was meant to be seen.
</p>
```
