---
title: 'Installing Hardware Backdoors In The Supply Chain'
date: 2018-10-08 12:23
categories: security
tags: hack attack vulnerability realworld hardware
featured_image: '/images/posts/chinese-hack.png'
lead_text: 'Backdooring hardware by compromising the manufacturer supply chain'
---

Bloomberg release a very detailed [report](https://www.bloomberg.com/news/features/2018-10-04/the-big-hack-how-china-used-a-tiny-chip-to-infiltrate-america-s-top-companies) on how Amazon discovered a hardware backdoor the size of a single grain of rice in servers manufactured by Elemental Technologies.

During the manufacturing of Supermicro servers, hackers from the Chinese People's Liberation Army have added tiny microchips to motherboard of these servers. With these microchips in place, the hackers could completely control those servers while many large customers of Supermicro were using them.

In 2015 Amazon began to evaluate a company called Elemental Technologies for a potential acquisition to expand their streaming video service. While researching the security of Elemental Technologies, the third-party security company responsible for the research, discovered a tiny chip on motherboard of servers provided by Supermicro. This tiny chip, even smaller than a single grain of rice, was not part of the actual motherboard design and allows access to servers, circumventing all security.

Backdooring hardware is [nothing new](http://www.toucan-system.com/research/blackhat2012_brossard_hardware_backdooring.pdf), thanks to Edward Snowden we now know the U.S. has been [doing](https://www.infoworld.com/article/2608141/internet-privacy/snowden--the-nsa-planted-backdoors-in-cisco-products.html) so for many years. But now China has been caught red-handed executing the most significant supply chain attack known to date.
