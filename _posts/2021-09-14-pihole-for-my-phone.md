---
title: 'Pi-hole for my phone'
date: 2021-09-14 21:47
categories: security
tags: dns network
featured_image: '/images/posts/ddns.jpg'
lead_text: "Blocking ads on your phone using your Pi-hole at home"
---

After years of having been bothered by ads, specifically targeted at my
latest search topic, I installed Pi-hole on a Raspberry PI I had laying
around. Now I take the Pi-hole to my phone!

## Using Pi-hole
Using Pi-hole to block ads is a great relief. Not being spammed with ads 
on every page I visit on the web, but more importantly, not being tracked
everywhere I surf!

Only when I'm on my phone, not on my own wi-fi, I still see ads. Fortunately
I found a feature on my android phone called "Private DNS". This allows me 
to specify my own DNS. The only thing I have to do, is to run my own DNS
server.

## DNS over HTTPS
Android requires DNS over HTTPS (or DNS over TLS). I found that the easiest
way to run DNS over HTTPS is dnsdist. With their comprehensive [documentation](https://dnsdist.org/guides/dns-over-https.html)
it is a breeze to get it running.

The only annoying part is that DNS over HTTPS requires a valid certificate. But hey, you want to keep things private, right?

## Let's Encrypt
You could buy a SSL certificate somewhere, but if you're more adventurous you
can get one for free with [Let's Encrypt](https://letsencrypt.org/)!

Actually obtaining a certificate from Let's Encrypt is really simple, but 
requires you to run a webserver at port 80 on the host you are trying to
get a certificate for. (Some routers don't allow manual port forwards for
ports below 1024 or for reserved port numbers, but allow forwards done with
[UPnP](/posts/security/2017/10/10/exploring-upnp/)!!!)

My dnsdist.conf:
```
-- allow all
addACL('0.0.0.0/0')

-- path for certs and listen address for DoT ipv4,
addTLSLocal("0.0.0.0", "/etc/letsencrypt/live/dns.keuperict.nl/fullchain.pem", "/etc/letsencrypt/live/dns.keuperict.nl/privkey.pem", { doTCP=true, reusePort=true, tcpFastOpenSize=64 })

-- path for certs and listen address for DoH ipv4,
addDOHLocal("0.0.0.0", "/etc/letsencrypt/live/dns.keuperict.nl/fullchain.pem", "/etc/letsencrypt/live/dns.keuperict.nl/privkey.pem", "/dns-query", { doTCP=true, reusePort=true, tcpFastOpenSize=64 })

-- set X(int) number of queries to be allowed per second from a IP
addAction(MaxQPSIPRule(50), DropAction())

--  drop ANY queries sent over udp
addAction(AndRule({QTypeRule(DNSQType.ANY), TCPRule(false)}), DropAction())

-- set X number of entries to be in dnsdist cache by default
-- memory will be preallocated based on the X number
pc = newPacketCache(10000, {maxTTL=86400})
getPool(""):setCache(pc)

-- server policy to choose the downstream servers for recursion
setServerPolicy(leastOutstanding)

-- Here we define our backend, the pihole dns server
newServer({address="192.168.1.10:53", name="192.168.1.10:53"})

setMaxTCPConnectionsPerClient(1000)    -- set X(int) for number of tcp connections from a single client. Useful for rate limiting the concurrent connections.
setMaxTCPQueriesPerConnection(100)    -- set X(int) , similiar to addAction(MaxQPSIPRule(X), DropAction())
```

Run dnsdist:
```
/usr/bin/dnsdist --uid dnsdist --gid dnsdist --supervised --disable-syslog
```

## Wrap Up
[Try harder](https://www.offensive-security.com/offsec/say-try-harder/)!

