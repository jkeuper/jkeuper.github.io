---
title: 'Equifax hack'
date: 2017-09-27 21:20
categories: security
tags: hack
featured_image: '/images/posts/facepalm.jpg'
lead_text: 'When your credit rating firm gets hacked'
---

Equifax is a consumer credit reporting agency and last week it got hacked. Now
the information of **143 milion US citizens**, about 45% of the population, has
been compromised by hackers. The hackers got access to names, birth dates,
addresses but also social sercurity numbers and drivers license numbers. Now
that is _really_ bad! This got me thinking and I just had to write about it.

With this kind of information it is possible to impersonate people at banks,
credit card companies, etc and even the government. And what about your privacy,
the hackers even know your credit information.

## How did this happen?
Well, Equifax was using Apache Struts which contained a
vulnerability ([CVE-2017-5638](http://www.cvedetails.com/cve/cve-2017-5638)).
This vulnerability was fixed on March 6. Equifax did not patch the vulnerability
for more than **two months**!

Luckily for me I am not living in the US, but could this also happen to us in
the Netherlands? Of course the average credit reporting agency will state that
_their_ security is the best of the best and up-to-date. But as the Equifax hack
shows, missing out on _one_ security update has some very serious consequences.

## How to prevent this?
Companies handling personal information must be strictly regulated. Only
information that is really necessary should be stored. Is it necessary to store
the social security number? Companies often think it is to identify the person
uniquely, but most likely storing a one-way hash of the social security number
will be sufficient. This way the social security number can not be
reconstructed, but the person can still be identified as a unique person.
Another issue is, how long does specific information need to be stored?
Information is valuable. Valuable as such that companies make profit selling
or using information about you.

Unfortunately there is not a whole lot you can do about this. Information will
be stored everywhere. People do not choose to get registered at a credit
reporting agency but this are goverments regulations. Eventually it is the task
of the government to protect us and our data. In Europe we have the
[95/46/EC](http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A31995L0046)
directive whichs forces EU countries to protect us by law, but the question
remains: **How safe is our sensitive personal data at all those organizations?**


