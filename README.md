# WayneThursby.com
This is the README for my website. Not quite sure who this is for, but here goes.

[![Netlify Status](https://api.netlify.com/api/v1/badges/37b197f7-1cf1-4399-9673-2fcf4368a405/deploy-status)](https://app.netlify.com/sites/waynethursby/deploys)

## Sources
* Uses [Eleventy](https://www.11ty.io/)
* Managed with [Netlify CMS](https://www.netlifycms.org/)
* Deployed on [Netlify](https://www.netlify.com/)
* Started with the wonderful [Eleventy Netlify Boilerplate](https://github.com/danurbanowicz/eleventy-netlify-boilerplate)

It seriously took me longer to look all of that up and type it into this readme than it did to get this website started.

As a reminder to myself:

# Requirements
* Node v8.x
* NPX
* NPM
* Eleventy (via NPM)

# Compiling the static site using Eleventy
First, install Node and NPM for your platform. Google can help if you're lost here.

Then install `nvm`, set it to Node version 8, install `npx`, followed by project dependencies.
```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm use 8
npm install npx
npm install
```

Run the generator with `npx`.
```
npx eleventy

```

