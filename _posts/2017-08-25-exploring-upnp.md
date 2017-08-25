---
layout: inner
title: 'Exploring Universal Plug and Play (UPnP)'
date: 2017-08-25 02:37
categories: security draft
tags: upnp hack draft
featured_image: '/images/posts/mediaplayer1.png'
lead_text: 'UPnP is a network technology that lets devices on your network set up rules on your router or modem automatically to allow the connections they need. UPnP is a really simple way to make sure you can connect to all kinds of services and is often recommended.'
---

To me Universal Plug and Play (UPnP) alway was a mysterious protocol. When some cool program required an open port, UPnP made it happen. When some fancy program did not work, someone would ask me: "Did you enable UPnP"? Right, I forgot... I had no clue what magic UPnP did for me.

The problem UPnP solves, in this case, is simple. Almost every home network uses Network Address Translation (NAT), so your internal devices cannot be reached unless you map a port on the external IP interface, to a port of a computer on your internal network.

Quote from wikipedia:
>> Universal Plug and Play (UPnP) is a set of networking protocols that permits networked devices [...] s to seamlessly discover each other's presence on the network and establish functional network services for data sharing, communications, and entertainment.

Now that's pretty awesome! (For the security minded people: "Uh oh, Houston we have a problem...") Ofcourse it's nice that you can find your printer _automatically_ and your media player shows your media storage device to pick your movies from.

UPnP had its share of flaws. Unintended errors in UPnP software that were exploitable, but for now let's focus on the really awesome features of UPnP. Let's pick our initial case and see how we can use UPnP to make one or more internal unreachable ports, reachable for the world.


{% highlight python %}
import socket

msg = \
    'M-SEARCH * HTTP/1.1\r\n' \
    'HOST:239.255.255.250:1900\r\n' \
    'ST:upnp:rootdevice\r\n' \
    'MX:2\r\n' \
    'MAN:"ssdp:discover"\r\n'

# Set up UDP socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
s.settimeout(2)
s.sendto(msg, ('239.255.255.250', 1900) )

try:
    while True:
        data, addr = s.recvfrom(65507)
        print addr, data
except socket.timeout:
    pass
{% endhighlight %}

OR

{% highlight python %}
import miniupnpc

upnp = miniupnpc.UPnP()
upnp.discoverdelay = 10
upnp.discover()
upnp.selectigd()

port = 4321O

# addportmapping args:
# (external-port, protocol, internal-host, internal-port, description, remote-host)
upnp.addportmapping(port, 'TCP', upnp.lanaddr, port, 'testing', '')
{% endhighlight %}

---
https://www.electricmonk.nl/log/2016/07/05/exploring-upnp-with-python/
http://mattscodecave.com/posts/using-python-and-upnp-to-forward-a-port.html

