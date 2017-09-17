---
layout: inner
title: 'Wordpress Plugins'
date: 2017-09-26 01:37
categories: security
tags: wordpress hack
featured_image: '/images/posts/wplogo_plugins.png'
lead_text: 'The awesomeness of Wordpress plugins probably will give your website a free backdoor´
---

Recently I was asked to give feedback on a new website. It uses Wordpress, but why? Why not? So I researched a bit and was able to give a well-founded answer about the risk of having plug-ins installed.

Many websites are built using Wordpress, but within the plug-in repository lies a HUGE security risk. Currently there are 51,920 Wordpress plugins available in the directory. Besides these plugins, 29.982 more plugins are available in the plugin source code repository that are not even listed here. Security researcher Pan Vagenas from Wordfence, has researched which abandoned plugins listed in the Wordpress plugin directory contains known vulnerbilities.

At the time of the research:
- there were over 37.300 plugins available in the wordpress repository.
- 17.383 of those plugins have not been updated in the past 2 years.
- 3.990 plugins have not been updated since 2010!

During Pan's analysis 18 abandoned plugins were identified, currently available for installation from the Wordpress plugin repository _and_ have known vulnerabilities which have not been fixed. Now that is worrisome.

When _you_ plan to start a website using Wordpress, please think twice about the use of plugins. Or better yet, learn some other techniques to create your website and blog... Note that disabling plugins simply does not help. The vulnerable files are still on the server and vulnerabilities can still be exploited!

More information at the [Wordfence blog](https://www.wordfence.com/blog/2017/05/22-abandoned-wordpress-plugins-vulnerabilities).
