---
title: 'Captive portal workaround'
date: 2020-01-07 22:07
categories: security
tags: hack learn dns
featured_image: '/images/posts/tunnel.jpg'
lead_text: "Accessing internet via Wi-Fi - circumventing captive portals"
---

On many trips and holidays I find public Wi-Fi hotspots, e.g. in 
hotels or bars, which use a "captive portal" where you have to 
authenticate before you are allowed to access the internet.

On many occasions these captive portals are not completely blocking
internet access. I'll show you a way you can access the internet, 
circumventing the captive portal.

## How captive portals work
Captive portals redirect HTTP-traffic to a login page, where you have
to press an "Accept" button, or enter some kind of code. From there
the MAC address of your device is allowed to access the internet.
You could try to find some MAC address which is already authenticated
and change your devices MAC to that MAC address. But that might bother
the owner of the device you are impersonating.

When your device detects it cannot reach a certain page, i.e.:
  * https://www.google.com/generate_204
  * http://connectivitycheck.gstatic.com/generate_204
  * http://www.google.com/gen_204

Then your device knows it should show the login page of the captive 
portal. The location is given by the 302 response of that request.

## The opportunity
Captive portals often have incomplete firewall rule sets. Some 
configurations will route DNS requests from unauthenticated clients
to the internet. This allows unlimited DNS traffic, which we can use
to tunnel our internet traffic.

Our IP traffic is encoded in bogus DNS requests to our own DNS server,
which decodes the requested domain names and forwards the traffic to
its intended destination. The DNS response contains the encoded IP 
traffic from the destination back to us. Et voila, we have a working
internet connection. Please note, it is kind of slow, but hey, we are
online!

This requires the following:
  * your client pc, which desperately requires internet access
  * a domain of which you can edit DNS entries
  * a server reachable from the internet
  * a tool called "iodine", a DNS client and server component.
  * a ssh server
  * and a tool calld sshuttle

Let's do this!

## DNS Setup
First setup your DNS entries. First the nameserver (NS) entry and next
the A record for the DNS server.

| Name           | &nbsp; &nbsp; &nbsp; | Type  | &nbsp; &nbsp; &nbsp; | Value            |
| -------------- | - | ----- | - | ---------------- |
| t.example.com  |   | NS    |   | ns.example.com   |
| ns.example.com |   | A     |   | [your server IP] |

Please note that your domain name should be as short as possible, to
allow the maximum possible amount of data to be encoded in one request.

If you use a service like DynDns have a domain name for your dynamic IP
adress, you can use that. For example "myserver.dyndns.org":

| Name           | &nbsp; &nbsp; &nbsp; | Type  | &nbsp; &nbsp; &nbsp; | Value            |
| -------------- | - | ----- | - | ---------------- |
| t.example.com  |   | NS    |   | myserver.dyndns.org |


## Server Setup
Next, install iodine on the server and allow port 53 to be reachable from
the internet. Your router should redirect UDP traffic on the external port 
53 to the server port which iodine is running on. 

Please do not use port 5353 to run iodine on. This port is used for 
broadcasted DNS requests and [will give vague errors in iodine](https://github.com/spritsail/iodine/issues/6).
I used port 5300 here.

Some routers, like mine, do not allow some ports to be redirected. I found
a way around it using UPNP. Read more about this [here]({{ site.baseurl }}{% post_url 2017-10-10-exploring-upnp %}).
To map port 53 to 5300 on my server:
```
upnpc -e 'Added port via upnp for DNS tunnel' -r 5300 53 UDP
```

Also make sure SSH is installed and reachable from the internet.

Let's start iodine on the server. Login with SSH and run the following:
```
root@home:~# iodined -c -p 5300 -P mypassword -d tap0 10.0.0.1 t.example.com
ALERT! Other dns servers expect you to run on port 53.
You must manually forward port 53 to port 5300 for things to work.
Requests for domains outside of t.keuperict.nl will be forwarded to port 53
Opened tap0
Setting IP of tap0 to 10.0.0.1
Setting MTU of tap0 to 1130
Opened IPv4 UDP socket
Opened IPv4 UDP socket
Listening to dns for domain t.example.com
Detaching from terminal...
root@home:~#
```

Options for iodined:

  * -p : the port to listen on
  * -P : password to use for the tunnel
  * -d : virtual network adapter name 
  * 10.0.0.1 : the tunnel IP
  * t.example.com : the name server 

Extra options I used:

  * -c : do not validate the client IP of incoming requests.
  * -b 53 : forward DNS requests to the local port 53, when you run your own DNS.
  * -f : keep the program running in the foreground

To test your setup, you can use [this site](https://code.kryo.se/iodine/check-it/) 
provided by the authors of iodine.

## Client Setup
Now we can start iodine on our client machine:
```
$ iodine -f -P mypassword t.example.com
Opened dns0
Opened IPv4 UDP socket
Sending DNS queries for t.example.com to XX.XX.XX.XX
Autodetecting DNS query type (use -T to override).
Using DNS type NULL queries
Version ok, both using protocol v 0x00000502. You are user #1
Setting IP of dns0 to 10.0.0.3
Setting MTU of dns0 to 1130
Server tunnel IP is 10.0.0.1
Testing raw UDP data to the server (skip with -r)
Server is at 192.168.0.111, trying raw login: ....failed
Using EDNS0 extension
DNS queries get changed to lowercase, keeping upstream codec Base32
No alternative downstream codec available, using default (Raw)
Switching to lazy mode for low-latency
Server switched to lazy mode
Autoprobing max downstream fragment size... (skip with -m fragsize)
768 ok.. 1152 ok.. ...1344 not ok.. ...1248 not ok.. ...1200 not ok.. ...1176 not ok.. ...1164 not ok.. will use 1152-2=1150
Setting downstream fragment size to max 1150...
Connection setup complete, transmitting data.
...
```

Now we first try to ping the tunnel IP, in our example 10.0.0.1. 
We also can see a new network interface by running `ifconfig`:
```
$ ifconfig
dns0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1130
        inet 10.0.0.2  netmask 255.255.255.0  destination 10.0.0.2
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 500  (UNSPEC)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1  bytes 48 (48.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
...
```

## Securing our connection
Please be aware that our connection over the DNS tunnel is not secure!
To solve that, use ssh over the tunnel. 

The easiest way is to use `sshuttle`. This tool uses a SSH connection, 
and redirects traffic over that tunnel. We want to redirect all traffic,
except for the traffic that is already redirected to that tunnel.
```
sshuttle --dns -r root@10.0.0.1 0.0.0.0/0 -x 10.0.0.1
```

Sshuttle options:
  * --dns : forward local DNS requests to the remote DNS server
  * -r root@10.0.0.1 : SSH server to connect to and the username
  * 0.0.0.0/0 : redirect all traffic through the SSH connection
  * -x 10.0.0.1 : except the 10.0.0.1 IP

To test, I suggest you check it with a small, very small website. Or
better yet, use `curl`. In this example `www.example.com` is actually
a existing small website to retrieve:
```
curl www.example.com
```

## Wrap up
Now we got a working internet connection! Although slow, very slow...

You can use [iperf](https://github.com/esnet/iperf) to see what the
actual speed is.

```
------------------------------------------------------------
Server listening on TCP port 5001
TCP window size: 85.3 KByte (default)
------------------------------------------------------------
[  4] local 10.0.0.1 port 5001 connected with 10.0.0.3 port 33032
[ ID] Interval       Transfer     Bandwidth
[  4]  0.0-22.6 sec   640 KBytes   231 Kbits/sec
[  5] local 10.0.0.1 port 5001 connected with 10.0.0.3 port 33034
[  5]  0.0-25.7 sec   768 KBytes   245 Kbits/sec
```

As alternative for sshuttle, you can use the `-D` options of SSH to
have an SOCKS proxy hosted at port 8080, so you can access the internet
via that proxy:
```
ssh -D 8080 root@10.0.0.1
```

Please note: DNS tunneling is also used by botnets, to contact their
command and control server. So using this, might alarm some system 
administrator.
