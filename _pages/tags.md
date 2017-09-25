---
layout: default
title: Tags
permalink: /tags/
---

<div class="title-group">
    <h1 class="special" id="titleblock" style="display: none">
        <span>
            Tagged with <span class="text-muted" id="tagHere"></span>
        </span>
    </h1>
    <h1 class="special" id="notitleblock" style="display: none">
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
                <h2>Tags</h2>
                {% if site.tags.first[0] == null %} 
                    {% for tag in site.tags %}  
                        <a class="btn btn-primary" href="?{{ tag }}">{{ tag }} <span>{{ site.tags[tag].size }}</span></a>
                    {% endfor %} 
                {% else %} 
                    {% for tag in site.tags %}  
                        <a class="btn btn-primary" href="?{{ tag[0] }}">{{ tag[0] }}&nbsp;<sup>{{ tag[1].size }}</sup></a> 
                    {% endfor %} 
                {% endif %}
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
