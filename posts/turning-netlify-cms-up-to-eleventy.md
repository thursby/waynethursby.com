---
title: Turning Netlify CMS Up to Eleventy
date: 2019-06-30T00:57:07.118Z
summary: >-
  Static sites are too hard to edit for normal people, right? What if creating a
  post on a static site was more like using WordPress?
tags:
  - post
---
<link rel="stylesheet" href="/_includes/assets/css/prism.css">
<script src="/_includes/assets/js/prism.js"></script>

This guide will help you get started using Netlify CMS with Eleventy. This will set up a very basic blog site and is intended as a demonstration of the concepts.

If you just want to get up and running quickly, a vastly superior site can be had in just a few seconds by using the [Eleventy Netlify Boilerplate](https://github.com/danurbanowicz/eleventy-netlify-boilerplate) project. The **Deploy to Netlify** button does what it says, and quite literally couldn't be easier. This guide borrows heavily from that work, but is simplified for illustrative purposes.

## Objectives
* Create a functional website following the pattern of a blog.
* The site should have Pages and Posts.
* Features such as tags and contact forms are beyond the scope of this article.

## Create a basic Eleventy site
First, install Eleventy as usual. See the [Eleventy Getting Started guide](https://www.11ty.io/docs/getting-started/) for more information.

 Create directories for resources.
```bash
mkdir -p admin pages posts static/img _includes/layouts
```
For this site we simply want the ability to use Netlify CMS to edit Pages if necessary, and add Posts regularly. One of the pages will need to feature the available posts.

To keep things simple, we will not be using other basic features of Eleventy to do things like include headers or footers.

### Create the base layout
The base layout will be the general HTML structure used by the entire site, and should be as content-agnostic as possible. Typically several includes would be used, but this is a simple example.

#### _includes/layouts/base.njk
{% raw %}
```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{ title or renderData.title or metadata.title }}</title>
<script async src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
	<header>
		<em>
			<a href="{{ '/' | url }}">Awesome Blog</a>
		</em>
	</header>
	<main>
		{{ layoutContent | safe }}
	</main>
</body>
</html>
```
Now that the basic HTML has been defined, let's create a few quick variations for our Home page, other Pages, as well as our blog Posts. These will all inherit from other layouts, so they will be simple to create.

#### _includes/layouts/home.njk
```
---
layout: layouts/base.njk
section: home
---
{{ layoutContent | safe }}
```

#### _includes/layouts/page.njk
```html
---
layout: layouts/base.njk
section: page
---
<h1>{{ title }}</h1>
{{ layoutContent | safe }}
```
The Posts layout is slightly more complex, but that's because this is where the content is being displayed.

#### _includes/layouts/post.njk
```html
---
layout: layouts/base.njk
section: post
---
<article>
  <h1>{{ title }}</h1>
  <p>
    <small><time datetime="{{ date | machineDate }}">{{ date | readableDate }}</time> by {{ metadata.author.name }}</small>  
  </p>
{{ layoutContent | safe }}
</article>
<nav>
  <a href="{{ '/blog/' | url }}">← Blog index</a>
</nav>
```
{% endraw %}
### One last thing
We can't expect our end users to set all of the fields required to publish content. Any fields we want to set for a directory may be specified in a JSON file in each directory.
#### pages/pages.json
```js
{
  "layout": "layouts/page.njk"
}
```
#### posts/posts.json
```js
{
  "layout": "layouts/post.njk",
  "permalink": "posts/{{ title | slug }}/index.html",
  "tags": "post"
}
```
### Welcome Home
You're all set to create your new home! Posts will be able to be created from within Netlify CMS, but Pages will be created manually. After they're created you can edit them from within the CMS.

#### pages/home.md
```markdown
---
layout: layouts/home.njk
title: Home
date: 2019-06-29T00:00:00.000Z
permalink: /
navtitle: Home
tags:
  - nav
---
# Welcome to Home
This is my home page. Welcome.
```
### See it in action
You can run Eleventy to generate our site locally.  It's still rather impressive, but this will just make sure it all works. 
```
npx eleventy
```
If you're getting any errors at this point, check to make sure you've not upset the JSON deities with an errant comma.

## Wire up NetlifyCMS
The NetlifyCMS admin interface is a React app, and therefore may be as a simple as a single HTML file which loads from a CDN. We are also using the Netlify Identity service, so that resource should also be loaded here as well as everywhere else on the site.

#### admin/index.html
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```
Now create a **config.yml** that reflects the layout of our files, as well as the fields we want to show from the frontmatter. This can look complex, but if you look closely, you'll see it's actually a fairly simple description of what fields you want to edit.

#### admin/config.yml
```yaml
backend:
  name: git-gateway
  branch: master # Branch to update (optional; defaults to master)

# Uncomment below to enable drafts
# publish_mode: editorial_workflow

media_folder: "static/img" # Media files will be stored in the repo under images/uploads

collections:
  # Our blog posts
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Post" # Used in the UI
    folder: "posts" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Summary", name: "summary", widget: "text" }
      - { label: "Tags", name: "tags", widget: "list", default: ["post"] }
      - { label: "Body", name: "body", widget: "markdown" }
  # Our pages e.g. About
  - name: "pages"
    label: "Page"
    folder: "pages"
    create: false # Change to true to allow editors to create new pages
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Permalink", name: "permalink", widget: "string" }
      - { label: "Navigation Title", name: "navtitle", widget: "string" }
      - { label: "Tags", name: "tags", widget: "hidden", default: "nav" }
      - { label: "Body", name: "body", widget: "markdown" }
```
### Set up a repository
Saving your code in a repository is a nice recommendation for most projects, but for this one it is essential. The repository will be the data store as well as the start of the build process. 

The easiest to use is GitHub, so start by creating a GitHub repository and checking it out to your dev environment.

Next, create a new site on Netlify using the newly created repository.

### Provide editor access
Netlify's Identity service acts as a proxy between your repository and any of several identity sites. This means you can invite users through Google and other identity providers without giving them access to the repository.

To configure this feature. Enable the Netlify identity service and Git Gateway on the deployment.
1.  **Settings > Identity**
2.  Select  **Enable Identity service**
3.  Scroll down to  **Services > Git Gateway**, and click  **Enable Git Gateway**
4. Accept the defaults and proceed. See the  [Netlify Identity documentation](https://www.netlify.com/docs/identity/) for more info.

Now log in at **/admin/** and create some posts!
