---
layout: posts
title: Articles
permalink: /posts/
description: 'Articles on software development, ethical hacking, security and other technical stuff.'
---

<main>
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                {% for post in site.posts %}
                    {% include tile.html %}
                {% endfor %}

                <!-- include pagination.html -->
            </div>
        </div>
    </div>
</main>
