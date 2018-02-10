---
layout: default
title: Tags
permalink: /tags/
---

<div class="title-group" id="titleblock" style="display: none">
    <h1 class="special">
        <span>
            Tagged with <label class="text-muted" id="tagHere"></label>
        </span>
    </h1>
    <p>
	<a class="btn btn-primary" href="#moretags">Discover other tags</a>
    </p>
</div>
<div class="title-group" id="notitleblock" style="display: none">
    <h1 class="special">
        <span>
            Articles by tag
        </span>
    </h1>
</div>

<main>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                {% for post in site.posts %}
                    {% assign classes = 'tags' %}
                    {% for tag in post.tags %}
                        {% assign classes = classes | append: ' tags_' | append: tag %}
                    {% endfor %} 
                    <div class="{{ classes }}" style="display: none">
                    {% include tile.html %}
                    </div>
                {% endfor %}
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h2 id="moretags" style="display: none">All tags</h2>
                {% capture tags %}
                    {% for tag in site.tags %}
                        {{ tag[1].size | plus: 1000 }}#{{ tag[0] }}#{{ tag[1].size }}
                    {% endfor %}
	        {% endcapture %}
	        {% assign sortedtags = tags | split:' ' | sort %}
	        {% for tagitem in sortedtags reversed %}
		    {% assign tagitems = tagitem | split: '#' %}
		    {% assign tag = tagitems[1] %}
		    {% assign size = tagitems[2] %}
                    <a class="btn btn-primary" href="?{{ tag }}">{{ tag }}&nbsp;<sup>{{ size }}</sup></a>
                {% endfor %} 
            </div>
        </div>
    </div>
</main>


<script>
function ShowByTag() {
    var tag = window.location.search;
    if (tag && tag.length > 1)
    {
        tag = tag.substr(1);
        if (new RegExp("^[\.A-Za-z0-9]{2,}$").test(tag))
        {
            var posts = document.getElementsByClassName('tags tags_' + tag);
	    if (posts.length == 0)
	    {
	        window.location.href = '/tags/';
            }
	    else
	    {
                var tagHere = document.getElementById('tagHere');
                tagHere.innerHTML = '#'+tag;
                var titleblock = document.getElementById('titleblock');
                titleblock.style.display = '';
                var moretags = document.getElementById('moretags');
                moretags.style.display = '';

                var i;
                for (i = 0; i < posts.length; i++)
                {
                    posts[i].style.display = ''; 
                }
            }
        }
        else
        {
            window.location.href = '/tags/';
        }
    }
    else
    {
        var notitleblock = document.getElementById('notitleblock');
        notitleblock.style.display = '';
    }
}

ShowByTag();
</script>
