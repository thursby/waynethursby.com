---
title: Counting to Eleventy
date: 2019-04-03T17:59:49.131Z
summary: >-
  Static site generators are a thing now. If I was using them back when they
  were just called "websites" does that make me hip? .. or old?
tags:
  - post
  - tech
---
## A rose by any other name

I still remember the first time I encountered HTML. Programs like [Netscape Composer](https://en.wikipedia.org/wiki/Netscape_Composer) made the leap between markup and visual representation easy to comprehend.

After only playing with this new layout I was already imagining the headaches involved with making anything more than a trivial layout. I wanted to use works from the Gutenberg project and format them into easy-to-read HTML documents. The very first hurdle I encountered was a basic one -- the Table of Contents.

Immediately it was apparent that keeping the ToC in sync with the content as I was writing it was going to be a chore. Very quickly that chore began to get in the way of making other changes in the pre-CSS HTML days.

## A Calculated Response

My 6th grade math book -- quite inexplicably -- included an occasional sidebar where the math concepts were outlined in an ancient language known as ~~Sanskrit~~ BASIC.

Now, this was public school, in Florida, so as you can imagine this part of our textbook was treated as if it didn't exist. We went back to doing long division on the chalkboard and precisely 0 attention was paid to the bizarre, monospaced sidebars.

Being the ... inventive ... type, I was quick to realize that the book had some simple BASIC programs which outlined whatever math problem was being taught in that lesson.

```basic
10 PRINT "Dividend:"
20 INPUT X
30 PRINT "Divisor:"
40 INPUT Y
50 PRINT "Quotient:"
60 PRINT INT(X / Y)
70 PRINT "Remainder:"
80 PRINT X MOD Y
```

Very soon I realized this was my ticket to a homework-free existence. This led to a love of making the machines do the work for me.

## Make the Robots Work

Very quickly I realized that QBASIC could be used to simplify creating those menus. Little scripts I built that never saw the light of day kept me from having to update my ol and li tags any time a chapter heading was updated.

This first crude attempt in QBASIC was later followed by Visual Basic Script (VBS) and in its final incarnation, a full XML / XSLT text transformation environment written in Pascal.

Taking a layout and injecting structured data to make a fully functioning website was basically a given. The "limitations" of not having a dynamic website didn't occur to me, as the primary purpose for all of this was of course to present information.

It was here that I learned about optimizing for the wrong thing, and even if the website took a little while longer to change and build, that repeatable process gave me a way to explore new designs and concepts in a way that hand editing would have never allowed -- even to the extent of making a mini-IDE to make ebooks out of XML documents.

## Insert clever montage here

After that I discovered Dreamweaver and WordPress and dynamic content took over. Stepping back from editing HTML was so refreshing it felt certain that using such crude tools to produce content was a thing of the past.

These applications required specific versions of PHP and MySQL to be up and running at all times in order to serve pages that maybe changed once a day. These CMSes all try to step around the very inefficiency they create by introducing caching -- an even more complex piece to heal a self-inflicted wound.

Making a website easy to change for its users inevitably makes it easier to change for people you don't want in the editing room. WordPress -- and other CMSes to a greater or lesser degree -- make it so easy to make edits to the platform that sometimes the miscreants find a way that they too can play.

## I have been hacked, and so have you

I've always been diligent with monitoring and backups, and so thankfully the damage from any compromises I've experienced have been minimal. However, it's pretty safe to say that if you run any kind of non-trivial website, you _will_ get hacked. It's not a matter of if, but when.

I'm not trying to employ scare tactics, this is just a true statement. It's not that it's impossible to run WordPress securely, it's just that doing so means giving up so many of its advantages that you really have to start asking if it's even worth it at some point.

For me, it's not.

## Nine, Ten, Eleventy.

The main problem with traditional static site generators is that they either lock you into doing things "their way" or they are so difficult to use in practice that they get in the way of the real work of making a website with content.

One of the newer Static Site Generators on the scene -- [Eleventy](https://www.11ty.io/) -- seems to have a great combination of both. Plus, since it's not tied to any specific toolchain, you can use it anywhere.

One of the best parts is that it has a built in server, which solves a lot of problems with "Where do I keep my dev environment?" With Eleventy, the answer is simple: wherever you are.

## Up and running
- First, install [Node and NPM](https://nodejs.org/) for your platform.
- Next, install Eleventy with npm, create a Markdown file, and generate the website
```bash
npm install -g @11ty/eleventy
echo '# Page header' > README.md
eleventy --serve
```
- Then just open up http://localhost:8080/README/ in your web browser of choice to see the output. 

From here you can just start hacking on README.md in your favorite editor and save as usual. Every time the file is updated, BrowserRefresh takes care of refreshing your browser. In less than a second, any CSS or HTML updates are reflected.

It really doesn't get much easier than that. If you can learn a basic templating language you can use Eleventy to generate any layout you can imagine achieving with a traditional website.

In a future post I'll cover where to store the code and how you can have a fully functional CMS with world-class hosting for literally $0. For now, go play with Eleventy on your own. 

As a rapid development platform that runs everywhere, it's got everything you'd need and nothing you don't.
