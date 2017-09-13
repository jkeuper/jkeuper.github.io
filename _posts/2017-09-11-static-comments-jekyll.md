---
title: 'Comments with Jekyll'
date: 2017-09-11 22:22
categories: other
tags: website jekyll
featured_image: '/images/posts/comments-jekyll.png'
lead_text: 'Get comments on your Jekyll website hosted at Github using Staticman.'
---

Static sites are just static html files, right? Not quite these days. I've added comments to my static generated site hosted with Github pages.

[Jekyll](https://jekyllrb.com/) and [Github pages](https://pages.github.com/) is a real winning combination, but now with [Staticman](https://staticman.net/) providing a nice way of adding comments to the static generated content it almost magic!

In short, you put your source files of your Jekyll website in Github, Github detects it is Jekyll and you get your website. Now with Staticman you can post your comment- or contact form to the Staticman API and Staticman adds the message to your Github repository. Github rebuilds your website and _voila_... You have a new comment, even in your static webpage!

Google can easily index the comments because they are really there. All other comment providers are based on Javascript, so the comments a only loaded when the browser loads them.

I've added comments to my articles with the help from this [blog post](https://mademistakes.com/articles/improving-jekyll-static-comments/). One improvement I made is to reference parent
comments of a reply, by its ID instead of its index in the list of comments. This prevents errors when you ever mix the order of comments up, e.g. delete/modify/insert/sort comments. 

