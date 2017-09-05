---
layout: default
title: Search
permalink: /search/
---
<!-- see https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/ -->
<div class="title-group">
    <h1 class="special">
        <span>
            {{ page.title }}
        </span>
    </h1>
</div>
<div class="container">
    <div class="page-header">
        <form action="/search/" method="get">
          <input type="text" id="search-box" name="query">
          <input type="submit" value="search">
      </form>
    </div>
  
    <article>
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <ul id="search-results" class="list-unstyled"></ul>
                </div>
            </div>
        </div>
    </article>
</div>
<script>
  window.store = {
    {% assign skip_pages = "/atom.xml|/feed.xml|/search/|/assets/css/style.css" | split: "|" %}
    {% for node in site.pages %}
    {% unless skip_pages contains node.url %}
    "{{ node.url | slugify }}": {
        "title": "{{ node.title | xml_escape }}",
        "category": "{{ node.categories | xml_escape }}",
        "content": {{ node.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ node.url | xml_escape }}"
    },
    {% endunless %}
    {% endfor %}
    {% for post in site.posts %}
    "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
    }
    {% unless forloop.last %},{% endunless %}
    {% endfor %}
};
</script>
<script src="/js/lunr.js"></script>
<script src="/js/search.js"></script>
