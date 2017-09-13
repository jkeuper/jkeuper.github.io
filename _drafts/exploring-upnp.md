---
title: 'Explore Universal Plug and Play'
date: 2017-08-25 02:37
categories: security
tags: upnp hack draft
featured_image: '/images/posts/mediaplayer1.png'
lead_text: 'UPnP is a network technology that lets devices on your network set up rules on your router or modem automatically to allow the connections they need. UPnP is a really simple way to make sure you can connect to all kinds of services and is often recommended.'
published: false
---

To me Universal Plug and Play (UPnP) alway was a mysterious protocol. When some cool program required an open port, UPnP made it happen. When some fancy program did not work, someone would ask me: "Did you enable UPnP"? Right, I forgot... I had no clue what magic UPnP did for me.

The problem UPnP solves, in this case, is simple. Almost every home network uses Network Address Translation (NAT), so your internal devices cannot be reached unless you map a port on the external IP interface, to a port of a computer on your internal network.

Quote from wikipedia:
> Universal Plug and Play (UPnP) is a set of networking protocols that permits networked devices [...] to seamlessly discover each other's presence on the network and establish functional network services for data sharing, communications, and entertainment.

Now that's pretty awesome! (For the security minded people: "Uh oh, Houston we have a problem...") Ofcourse it's nice that you can find your printer _automatically_ and your media player shows your media storage device to pick your movies from.

UPnP had its share of flaws. Unintended errors in UPnP software that were exploitable, but for now let's focus on the really awesome features of UPnP. Let's pick our initial case and see how we can use UPnP to make one or more internal unreachable ports, reachable for the world.

The UPnP stack consists of 6 layers:

| Layer        | Description                         
| ------------ | ----------------------------------- 
| Discovery    | finding UPnP devices on the network 
| Description  | Find what services the devices is offering 
| Control      | Ask for an action of that device 
| Eventing     | Subscribe to state changes 
| Presentation | The human controllable interface  
| Adressing    | Of no DHCP is available, the device uses it's on IP-range.

## Discovery
Let's discover some devices! UPnP uses HTTP over UDP (HTTPU) and broadcasts UPD packets on port 1900. The discovery protocol is known as Simple Service Discovery Protocol ([SSDP](https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol)).

From the top, we'll do a M-SEARCH request to the broadcast address 192.168.1.255 on port 1900. We are querying for devices with the InternetGatewayDevice profile:

```python
import socket

# Construct the message
msg = \
    'M-SEARCH * HTTP/1.1\r\n' \
    'HOST:192.168.1.255:1900\r\n' \
    'ST:urn:schemas-upnp-org:device:InternetGatewayDevice:1\r\n' \
    'MX:2\r\n' \
    'MAN:"ssdp:discover"\r\n'

# Set up UDP socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
s.settimeout(2)
s.sendto(msg, ('192.168.1.255', 1900) )

# Listen for data until timeout
try:
    while True:
        data, addr = s.recvfrom(8192)
        print addr, data
except socket.timeout:
    pass
```

## Discovery Response
Running the script gives the response below. What we are interested in is the "LOCATION" value:

```bash
('192.168.1.1', 1900) HTTP/1.1 200 OK
CACHE-CONTROL: max-age=120
ST: urn:schemas-upnp-org:device:InternetGatewayDevice:1
USN: uuid:A37351C5-8521-4c24-A43E-AC22055E489C::urn:schemas-upnp-org:device:InternetGatewayDevice:1
EXT:
SERVER: Compal Broadband Networks, Inc/Linux/2.6.39.3 UPnP/1.1 MiniUPnPd/1.7
LOCATION: http://192.168.1.1:5000/rootDesc.xml
OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01
01-NLS: 1
BOOTID.UPNP.ORG: 1
CONFIGID.UPNP.ORG: 1337
```

## Query description
The desciption xml is a bit long. We'll show the most important part below. From the service information,
we are looking for the controlUrl:

```xml
  ...
  <service>
    <serviceType>urn:schemas-upnp-org:service:WANIPConnection:1</serviceType>
    <serviceId>urn:upnp-org:serviceId:WANIPConn1</serviceId>
    <controlURL>/ctl/IPConn</controlURL>
    <eventSubURL>/evt/IPConn</eventSubURL>
    <SCPDURL>/WANIPCn.xml</SCPDURL>
  </service>
  ...
```

## Open port
We have the address, the port and the path of the control URL. Now let's craft a soap message to open external port 35000 and map it to port 35000 on our internal ip 192.269.1.90.

```python
import urllib2

soap_body = """<?xml version="1.0"?>
<soap-env:envelope soap-env:encodingstyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope">
  <soap-env:body>
    <w:AddPortMapping xmlns:w="urn:schemas-upnp-org:service:WANIPConnection:1">
      <w:NewExternalPort>35000</w:NewExternalPort>
      <w:NewProtocol>TCP</w:NewProtocol>
      <w:NewInternalPort>35000</w:NewInternalPort>
      <w:NewInternalClient>192.168.1.90</w:NewInternalClient>
      <w:NewEnabled>1</w:NewEnabled>
      <w:NewPortMappingDescription>Added port with UPnP</w:NewPortMappingDescription>
      <w:NewLeaseDuration>0</w:NewLeaseDuration>
    </w:AddPortMapping>
   </soap-env:body>
</soap-env:envelope>"""

headers = {
    'SOAPAction': 'urn:schemas-upnp-org:service:WANIPConnection:1#AddPortMapping',
    'Host': '192.168.1.1:5000/',
    'Content-Type': 'text/xml',
    'Content-Length': len(soap_body),
}

ctrl_url = "http://192.168.1.1:5000/ctl/IPConn"

request = urllib2.Request(ctrl_url, soap_body, headers)
response = urllib2.urlopen(request)

print response.read()
```

Now, send this message and show the response:

```bash

```


---
<https://www.electricmonk.nl/log/2016/07/05/exploring-upnp-with-python/>

<http://mattscodecave.com/posts/using-python-and-upnp-to-forward-a-port.html>

