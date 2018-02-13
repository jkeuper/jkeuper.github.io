---
title: 'The game of DDOS attacks: Game over'
date: 2018-02-10 22:53
categories: security
tags: ddos hack attack realworld
featured_image: '/images/posts/ddos-game-over.png'
lead_text: 'Some insights in what drives an attacker behind a DDOS attack.' 
---

The Netherlands was plagued by numerous DDOS attacks lately. The tax
authorities, Bunq bank and many other banks and government agencies.
The attacker was careless and left some traces and was even arrogant
enough to seek contact with the sysadmin of Tweakers.net, one of the
targeted sites.

## Background
Tweakers.net published a very nice
[article](http://translate.google.com/translate?js=n&sl=nl&tl=en&u=https://tweakers.net/reviews/6031/een-ddoser-betrapt-hoe-de-aanvaller-tegen-de-lamp-liep.html)
([original in dutch](https://tweakers.net/reviews/6031/een-ddoser-betrapt-hoe-de-aanvaller-tegen-de-lamp-liep.html))
describing the complete timeline of the attack and investigation from
their perspective.

The attacker, Jelle S., an 18 year old male from Oosterhout, had been
caught by the Bunq bank before. In September 2017, Jelle executed several
DDOS attacks on the Bunq bank. After extensive research, Bunq discovered
that Jelle was behind the attacks. They did not press charges, because
Jelle showed remorse. How wrong could they be... 

The second wave of attacks on Bunq started in November 2017. Bunq
immediately reported it to the police and the police started an
extensive investigation. The third wave of attacks started at the end
of January 2018 and targeted many more sites. Eventually Jelle was
arrested the first of Februari.

## The attacker
<img src="/images/posts/ddos-forum-post-en.png" alt="Forum post" class="media pull-right img-thumbnail" />
Coincidentally, at the end of December, I stumbled upon a
[forum post](http://translate.google.com/translate?js=n&sl=nl&tl=en&u=https://gathering.tweakers.net/forum/list_messages/1820361)
on Tweakers.net ([original in dutch](https://gathering.tweakers.net/forum/list_messages/1820361)).
An 18 year old male was seeking help for his _small_ problem (how he 
described it himself) of being addicted to DDOS attacks on banks,
government agencies, school networks and hosting providers. I guess
Jelle just does not see the seriousness if his actions. It seems
like a game to him. The forum thread was soon closed, simply because
Tweakers.net has strict rules and does not allow discussion about
criminal activities. 

## DDOS - DNS amplification attack
Executing a DDOS is not very complicated. In this case Jelle had bought
40 euro of capacity at a _stresser_. A service to test your own infrastructure
for its DOS handling capabilities. Ofcourse you can also target other sites
with it.

The technique used was a DNS amplification attack. Simply said, having
very many clients (e.g. a botnet) send as many DNS requests possible to
many DNS servers. The request has spoofed the source address to be the 
victims address and it queries all known information of a DNS zone in
one simple and small request. This results in an extreme amount of data
being sent at the same time to the victims address.

## Wrap up
The attacker reminds me of the behavior of some aronists, mingle in the crowd,
watching the fire do its job.

He is simply not aware of the severity of his actions. Seeking recogition
for his actions, submitting news items, contacting the sysadmin, hanging
around to see his results. This all got him caugth. Worst of all, he did
not learn from his first offence, where he was very lucky not to be
prosecuted. The only fortunate thing is that he is aware of his addiction...

