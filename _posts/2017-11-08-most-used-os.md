---
title: 'The most used OS by far'
date: 2017-11-08 23:32
categories: security
tags: minix hack os intel 
featured_image: '/images/posts/minix.jpg'
lead_text: "Intel's Management Engine is based on MINIX3, so it is the most widely used OS in the world."
---

Every modern Intel CPU has [Intel's Management Engine](https://www.eff.org/deeplinks/2017/05/intels-management-engine-security-hazard-and-users-need-way-disable-it) (ME) built in. You actually get another OS completely _free_ with your CPU: [MINIX](http://www.minix3.org).

[Static analysis](http://blog.ptsecurity.com/2017/04/intel-me-way-of-static-analysis.html)
of Intel's ME by [Positive Technologies](http://blog.ptsecurity.com) has dicovered some
strings that clearly originate from MINIX3 code. This strongly suggests
that the ME is based on MINIX3, developed by [Andrew Tanenbaum](http://www.cs.vu.nl/~ast/).
In an [open letter to Intel](http://www.cs.vu.nl/~ast/intel/) Andrew
Tanenbaum expressed his surprise to find out that MINIX was used in Intel's
ME and that it would make MINIX the most widely used OS in the world. 
The open letter contains a few confirming facts that Intel has been 
working with MINIX for several years and even requested some changes to 
MINIX, for example, reducing the memory footprint.

## MINIX
MINIX is a OS with a microkernel. A tiny kernel, responsible only for the
utmost core functions of the OS. Device drivers and file and process servers
are actually running in separate user-mode processes, making it virtually 
imposible to crash the OS. Monolithic kernels, like Windows and Linux, are
likely to crash when an issue with a driver occurs.

The creator of MINIX, Andrew Tanenbaum, is a great professor. As teaching a
course on operating systems, a conflict with AT&T restricted him to teach any
of the UNIX internals. This made him decide to write a minimal UNIX clone and 
MINIX was born! The full source code was even published as an appendix to the book: 
"[Operating Systems: Design and Implementation](https://archive.org/details/OperatingSystemsDesignImplementation)"

I was fortunate enough to have attended a few of his lectures. You might know him from the
[~~flamefest~~ debate](http://www.oreilly.com/openbook/opensources/book/appa.html)
with Linus Torvalds, calling Linux obsolete...

> Be thankful you are not my student. You would not get a high grade for such a design :-)
>
> -- Andrew Tanenbaum

## CPU Protection Rings
A CPU has a [protection ring](https://en.wikipedia.org/wiki/Protection_ring)
architecture to restrict what programs in different levels can do. Each ring is
restricted by its lower level ring and cannot do anything that is not allowed
by any lower level ring. This mechanism protects three main resources:
memory, I/O ports, and the ability to execute certain machine instructions.
Ring 3 typically executes programs in so called user mode. The operating
system executes in ring 0, formerly thought of as the most privileged level.

## Deeper than ring 0
Some things are so important that even programs running in ring 0 should
not have access to them. So ring -1 was added for virtual machine
hypervisors. This allows the virtual machine hypervisor to control what
the OS sees and can do. The hypervisor actually multiplex several OSs
and control what each OS can see and do.

... but still, there are things that even the hypervisor should not be
able to access.

## Deepest depth of the CPU
MINIX is running on "Ring -3", ie. "negative 3". That is even untouchable
by your computers kernel. [Research](https://schd.ws/hosted_files/osseu17/84/Replace%20UEFI%20with%20Linux.pdf)
shows that some features of ring 3 are:
- Full networking stack
- File systems
- Many drivers (including USB, networking, etc.)
- ... a web server 

What on earth does ring -3 need a web server for?! I'll leave the rest as
an exercise for the reader.

## Wrap up
Ring -3 actually reminds me of [The Matrix](https://www.youtube.com/watch?v=z_KmNZNT5xw).
It is a bit frightning to know that some people are able to control your Intel
powered device like they see fit, without anyone knowing or seeing...

A great presentation on Black Hat 2015 about [running your own code in more
privileged rings](https://www.youtube.com/watch?v=lR0nh-TdpVg), so it is hidden
from everything, i.e. the OS/kernel/AV.

