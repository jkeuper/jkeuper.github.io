---
title: 'My Journey to OSCP'
date: 2020-02-18 21:27
categories: security
tags: oscp hack learn 
featured_image: '/images/posts/oscp.png'
lead_text: "OSCP is about being skilled, persistent, creative, and perceptive"
---

Just received _the_ email this morning that I passed the Penetration
Testing with Kali Linux exam and obtained my Offensive Security
Certified Professional (OSCP) certification. Hooray!

## The Journey to OSCP
Since my first time behind a computer I'm trying to make the computer
do things it's not supposed to do. At my first job as a software engineer
I got the time to discover many computer technologies. Starting with
C/C++ programming, I quickly wrote my first buffer overflow exploit
for a small test program I wrote. Experimenting with assembly, playing
with networks, getting to know all kinds of tools and script languages.

That's where my journey started, more than two decades ago. As a software
engineer, security and hacking was only my hobby. I never got enough
experience to apply for a security related job. Although security
during software development projects was something that I tried to
focus on, because that's where many problems can be avoided quite
easily.

<img src="/images/posts/oscp-acclaim.png" 
     alt="OSCP Badge"
     class="media pull-right"
     style="width: 30%" />

## PWK Online Course
Two and a half years ago, I started the Penetration Testing with
Kali (PWK) course with ninety days of lab time. I reserved six weeks
between two assignments to work on PWK. When my lab time ended, I
scheduled my first try on the exam. Not quite smart to schedule it
after a full working day. I was pretty confident I could do it, but
I failed pretty hard. After my first try I knew I had to change something
dramatically to succeed at the exam, but could not figure out what.

## PWK Live Course
A little over one year after my failed attempt, I stumbled across
the live PWK course provided by Offensive Security in my home country,
the Netherlands. Wow, that is it! A live five day hands-on training,
including a capture the flag event on one evening, given by two trainers 
from Offensive Security, that should prepare me for the exam pretty good.

The training was awesome! With fifteen students and guidance of two
trainers from Offensive Security answering every question. One capture
the flag evening until midnight, which by the way earned our team a two
week lab extension! Finally people around me who could provide little
tips and tricks to make hacking easier. Really great to get some help
with subjects I found really hard.

## Preparing for the Exam
After the training still 30 days of lab time and a hard earned 15 day
extension to further evolve my methodology and plan of attack.

This time I scheduled my exam as soon as could and I was able to select
a convenient time. To prepare for the exam, I took a few days off from
work, spend a few hours every weekend and with two students from the 
live course we had an awesome PWK hack weekend! I still had not spend
as much time as I wanted to on the labs, but this was it. Let's do this! 

## The Exam
The assignment is simple: twenty-four hours, five machines to hack and 
write a report about it in the next twenty-four hours.

The first two machines are 20 points, the third is 25 points, the
fourth is the buffer overflow machine and also 25 points, and the last
machine is 10 points. I did not wonder about what order I should
approach the machines. Beforehand I decided to follow the order in
which I got the machine, so I did. 

## First Machine
Sunday morning after a good night rest, I started my exam at 9
o'clock. Just started scanning the first machine, quite easy to get
in. Getting administrator access should not be a problem, but the
obvious way to do privilege escalation simply wouldn't work. Looked
around for more options, but this was really the way to go. Still
there was something messing with me...

## Second Machine
Time to move to the second machine!  Again a quick scan and some
service with version jumps out. I quickly google the service and seems
vulnerable and provide me a way to copy files around on the system.
Another interesting service allowed me to view files and with some
personal notes and some twiddling I could get access to the machine.
Locally enumerating for hours, but did not find any way to obtain
root. Let's put this one aside too.

## Third Machine
The third machine, 25 points, this could be even a harder nut to
crack... Oh, stop whining, let's do this! Starting with a scan and
gathering some info, I start poking at the webserver. It's a quite
interesting app running there, quickly finding it vulnerable providing
me a reverse shell. Now enumerating the machine, not finding anything
out of the ordinary, but iterating the services I see something strange,
funny even, that is obviously the way to go. Now the story goes on for
hours and hours, getting a connection back exactly once, but not able
to send or receive commands. Trying all kinds of payloads, but nothing.
How, what the... Why? I can't get this to work too? Oh well, try harder
we must, moving on to the next machine!

## Fourth Machine
Now the buffer overflow machine, I practiced it many times, prepped my
notes and it worked. Just followed my notes step by step, and the
magic happened. Got a working exploit on the debugging machine.
Executing the exploit on the real machine was great, got a reverse
shell and got the proof in no-time!

## Fifth Machine
I'm sixteen hours into my exam. Got to stay focused, still eight hours
to go and anything is possible. I'll skip my nap for sure and start
with the last machine. Again a quick scan, finding a service that
really stands out, giggle, google, exploit, root, BAM! That took me
only ten minutes.

## Final Stretch
I decided not to sleep, but to take a proper break. Got some rest and
prepped for the final eight hours. The last final eight hours I spend on
all three machines, but with a focus on the 25 point machine. It was
not funny anymore, but no progress. Found some small things like folders
to write to, some folders to read with some elevated permissions and
more, but nothing helped me to root any of the three machines. This went
on all night, until the last minute. No more progress. Doing a bit of
math, I could have made it. Getting local access on machines does get
you some points, although not clear how much.

## Writing the Report
Jumping under the shower to warm up, I went to bed immediately. After
five hours I woke up, relaxed a bit and starting on my course and lab
report. I already wrote it for my first exam try. I only had to
review it and brush it up. Writing good reports takes time, a lot of
time. Writing the exam report went pretty smooth. I copied the style
from the lab report. Scrolling through the some output of the second
machine, one line (in the output of 1300 lines) popped out. Damn, that
must be the vulnerability I should have used. A quick search confirmed
a really easy way to get root on that machine. Oh well, I fucked up,
but let's document it properly and we might get some points for it.

Eventually got local access on all machines, rooted two machines
including the buffer overflow machine, got the lab and course report
and I know how to get root on the other 3 machines, but I could not
make it work. That might be enough for the required 70 points.

## The Result
Exactly one week after submitting my report, I received the email
from Offensive Security congratulating me on obtaining my Offensive
Security Certified Professional (OSCP) certification!

My take-aways:
* Consider taking notes in simple markdown files with a good editor
  e.g. Sublime, which can show the folder structure as a tree structure.
  (I've heard multiple cases where CherryTree files corrupted and people
  lost a good deal of work...)
* Now you can store your markdown file in git (e.g. GitHub)
* Continuously improve your working environment. Write scripts,
  automate things you do often.
* Work on your methodology, not only your skills
* Gather some friends/colleagues to do PWK with, having someone
  to talk with about PWK really helps
* When you're able to, do the live course, it's awesome!
* Book your exam early to get the start time you want
* Make enough screenshots during your exam! Maybe you should have 
  a screen recorder running so you don't miss anything?
* Write a step by step approach, test it out on a machine. If it does
  not work, find out what misses and update your approach. Repeat!
* Know yourself! You must always be alert, when your attention drops, 
  take a break. If you miss a clear hint in a 1300 line output file,
  it could ruin your exam. 
* TRY HARDER!

## Wrap Up
Obtaining your OSCP is a very technical challenge, but Offensive
Security also teaches all students a mindset of being persistent,
creative and perceptive. That is what the journey to OSCP is about — 
[Try harder](https://www.offensive-security.com/offsec/say-try-harder/)!

