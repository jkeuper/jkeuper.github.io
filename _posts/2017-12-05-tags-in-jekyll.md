---
title: 'Tag in my posts'
date: 2017-12-05 21:37
categories: other
tags: website jekyll
featured_image: '/images/posts/tags-jekyll.png'
lead_text: 'Having index pages for each tag on my posts would be nice.'
---

Jekyll does support tags, but what about determining related posts based on
tags of the post? Jekyll does not support tags very well. There is no support
for a tag archive page, neither does it support listing related posts. Let's
make this work!

Having added [categories](/posts/other/2017/08/21/new-website/) to my
website, I already discovered the limits of what Jekyll is able to do
for me. For those few categories, which remain fairly static, it is no
problem to create a few placeholder pages. (Like [1](/posts/development/), [2](/posts/security/) and [3](/posts/other/))
But the list of tags is dynamic. Now my site has {{ site.tags | size }}
tags but hopefully will grow with each posting.

Of course you can use plugins to do some custom Jekyll magic, but custom 
plugins are not supported by Github Pages. Charlie Park wrote a nice
[post](http://charliepark.org/tags-in-jekyll/) about generating tag list 
pages with a custom plugin. To solve this github restriction you could run
a script for generating tag pages, only when new tags have been added.

## Posts by tag
I have chosen for a client side solution. One page with all posts summaries
is generated and based on the selected tag, the posts with that tag are
displayed using javascript. That's easy and always up-to-date.

Every post is generated with a css class for each tag. To make sure
it does not conflict with our regular css classes, we have prepended
them with "tags_".

```html{% raw %}
{% for post in site.posts %}
    {% assign classes = 'tags' %}
    {% for tag in post.tags %}
        {% assign classes = classes | append: ' tags_' | append: tag %}
    {% endfor %} 
    <div class="{{ classes }}" style="display: none">
    {% include post.html %}
    </div>
{% endfor %}{% endraw %}
```

For example, when we have 3 posts, the first with "example1" tag, the 
second with "example2" tag and the third with both tags, we get the 
following html.

```html
<div class="tags tags_example1" style="display: none">
<!-- content of post 1 -->
</div>

<div class="tags tags_example2" style="display: none">
<!-- content of post 2 -->
</div>

<div class="tags tags_example1 tags_example2" style="display: none">
<!-- content of post 3 -->
</div>
```

With some javascript we can select all elements by css class name and 
display them. Selecting tag "example1" will show the first two posts
and tag "example2" will show the last two posts. You can simply 
navigate to http://example.com/tags/?example1 for tag "example1".

```html
<script>
function ShowByTag() {
    var tag = window.location.search;
    tag = tag.substr(1); // remove '?'

    var posts = document.getElementsByClassName('tags tags_' + tag);
    if (posts.length == 0)
    {
        window.location.href = '/tags/';
    }
    else
    {
        // set tagname in the header of this page
        var tagHere = document.getElementById('tagHere');
        tagHere.innerHTML = '#'+tag;
   
        // display posts
        var i;
        for (i = 0; i < posts.length; i++)
        {
            // reset display: none
            posts[i].style.display = ''; 
        }
    }
}

ShowByTag();
</script>
```

## Wrap up
Now that's pretty cool, provided that the list of all posts does not become
very large. Good enough for now...

Another feature I added is a list of related posts, by matching tags. Post with 
the most tags in common, are the most related.

Liquid is not a programming language, it is a template engine. So the solution is 
not very elegant, but works fine. Not quite suitable to write it up in another post,
but you can find the magical code [here](https://github.com/jkeuper/jkeuper.github.io/blob/master/_includes/related-posts.html).
The idea is as follows: In Liquid, loop through each post, counting all
matching tags. When you found enough matching tags, stop and render the post, 
continue to next untill either you have enough posts or went through all posts.
