---
title: Ostensibly the home page
date: 2019-03-20T21:00:00.000Z
permalink: /
navtitle: Home
tags:
  - nav
---
## You are on a website.
You have been warned. Now that we have that out of the way, I must warn you that this particular website may entertain, inform, delight, or annoy you. It's really not possible to know which at this point, and so I find it only fair to warn you that one or more of these these things may occur.

At this point you should know:

* I don't really know what I'm doing here
* Neither do you
* That's okay

We will just move along as if these words have reason for existence.

## Posts from the frontlines

These are things which compelled me to put the pen to the old proverbial for whatever reason.

<ul class="listing">
{%- for page in collections.post reversed limit:5 -%}
  <li>
    <time datetime="{{ page.date }}">{{ page.date | readableDate }}</time> - 
    <a class="listing" href="{{ page.url | url }}">{{ page.data.title }}</a>
  </li>
{%- endfor -%}
</ul>

## My other projects

These are some other things I am working on. Okay just one for now.

 - [CØASTLINE](https://coastline941.com) - A website I created for a the super rad Pop Punk band I'm in.
