---
title: Wayne Thursby - The Website
date: 2019-03-20T21:00:00.000Z
permalink: /
navtitle: Home
tags:
  - nav
---
Here you are. But should you have come?

## This site might entertain or inform you
It's impossible to know which, really, and so I will only warn you that either or both of these things may occur.

At this point you should know:

- I don't really know what I'm doing here
- Neither do you
- That's okay

We will just move along as if these words have reason for existence.

## Post pages

The pages found in in the posts

<ul class="listing">
{%- for page in collections.post -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay("LLL d, y") }}</time>
  </li>
{%- endfor -%}
</ul>

## My other projects

These are some other things I am working on. Okay just one for now.

 - [CØASTLINE](https://coastline941.com) - A website I created for a the super rad Pop Punk band I'm in.
