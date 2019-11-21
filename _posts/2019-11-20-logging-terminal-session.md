---
title: 'Logging terminal session'
date: 2019-11-20 23:17
categories: security
tags: oscp hack learn 
featured_image: '/images/posts/netcat_freebsd.jpg'
lead_text: 'Logging and replaying your complete terminal session with script'
---

As a penetration tester you really must log all steps you take to make a
complete and detailed report for the client. Ofcourse you can't help that
once in a while you missed one step. From my [training](/posts/security/2019/11/18/pwk-live-course/)
I got a valuable tip to use script for logging complete terminal 
sessions.

## Using the script command
Logging your complete terminal session with "_script_" records all in and
output from your terminal session.

```
root:~# script log.txt
```

## Displaying the session
The recording contains al formatting and special characters. Simply showing
the log with "_cat_" or "_grep_" won't be very nice.

The less command can remove control characters by using the "_-Rr_"
option: 

```bash
root:~# less -Rr log.txt
```

## Replaying the session
Even better, we can replay the session completely!

First we have to specify that "_script_" needs to record the timings of the
in- and output.

```bash
root:~# script --timing=timing.txt log.txt
```

Now we can replay the session with scriptreplay. Let us speed things up. 
Replaying at 3x speed with "_-d 3.0_" and having the maximum wait of 1 second
with "_-m 1_", so you don't have to relive the moment completely that you were
getting a cup of tea...

```bash
root:~# scriptreplay -d 3.0 -m 1 timing.txt log.txt
```

## Wrap up
Yet another tip! Start "_script_" in your "_.profile_", so you record every session
and are able to look up anything later on. 

You might want to echo the date and time now and then, so you can find your way
in the log-file more easy.


