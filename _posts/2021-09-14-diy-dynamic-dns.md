---
title: 'DIY Dynamic DNS'
date: 2021-09-14 21:47
categories: other
tags: dns hosting 
featured_image: '/images/posts/ddns.png'
lead_text: "Making my own DDNS Service"
---

Dynamic DNS (DDNS), the way to access your network devices at home 
from remote locations without static IP. But what if you already own
a domain?

## Dynamic DNS
In the past I worked with a few DDNS services. They all work by running
a script on your home server/network device that determines the external
IP address and sends it to the DDNS service.

In my case I already have a domain name registered at 
[TransIP](https://www.transip.nl/) which happens to have an API to 
automate tasks like managing DNS entries.

So Dynamic DNS is nothing more than updating a specific DNS entry with
your current IP address... I wrote a little script which does exactly that.
You can check the spectacular results [here at github](https://github.com/jkeuper/transip_dyndns).

# Requirements
This script uses the python REST API module for TransIP, which can be found here:
[https://github.com/reinoud/transip_rest_client]

To get this to work, you should have the following:
 - have an account at TransIP
 - have an domain name at TransIP
 - on the [API page](https://www.transip.nl/cp/account/api/):
   - turn API on 
   - generate a keypair and copy the Private Key that is _shown once_
   - save it in a file called privatekey.txt
 - convert the private key to an RSA private key (you need openssl tools installed):
 ```
 openssl rsa -in privatekey.txt -out rsaprivatekey.txt
 ```

## Usage
For example, when you own the `example.com` domain and you want to have 
`home.example.com` point to your home server. Let's assume your TransIP
username is `myusername`.

Run the `dyndns.py` script as follows:
```
./dyndns.py -u myusername -k rsaprivatekey.txt -n home -d example.com
```

## Wrap-up
I have this script running as a cron job on my server.
When your dynamic IP address changes, it takes some time to update
the DNS records. So your server should be unreachable for a little while.

Always nice not to depend on DDNS services, but provide my own solution!
