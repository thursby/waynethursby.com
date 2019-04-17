---
title: Ostensibly the home page
date: 2019-03-20T21:00:00.000Z
permalink: /
navtitle: Home
tags:
  - nav
---
## You are on a website.
You have been warned. Now that we have that out of the way, I must also warn you that this particular website may entertain, inform, delight, or annoy you. It's really not possible to know which at this point, and so I find it only fair let you know one or more of these these things may occur.

At this point it may be clear that:

* I don't really know what I'm doing here
* Neither do you
* That's okay

We will just move along as if these words have reason for existence.

## Posts from the frontlines

These are things which compelled me to put the pen to the  proverbial.

<ul class="listing">
{%- for post in collections.posts reversed -%}
  <li>
    <time datetime="{{ post.date }}">{{ post.date | readableDate }}</time> - 
    <a class="listing" href="{{ post.url | url }}">{{ post.data.title }}</a>
  </li>
{%- endfor -%}
</ul>

## My other projects

These are some other things I am working on. Okay just one for now.

 - [CØASTLINE](https://coastline941.com) - A website I created for a the super rad Pop Punk band I'm in.
