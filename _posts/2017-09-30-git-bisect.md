---
title: 'Finding errors with git'
date: 2017-09-30 00:23
categories: development
tags: git learn
featured_image: '/images/posts/git-bisect.png'
lead_text: 'The good, the bad and the faulty. Git bisect to the rescue!'
---

A while ago someone notified me that my website had broken by a change I made.
"I got a tip for you! You should check it out with _git bisect_" and so I did.
It was great to learn such a nifty feature of git. I shared my experience with
some other git users but none of them knew about _git bisect_.

## Git bisect
Git bisect does a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm)
through your commit history. This way you can identify the commit which introduced
the faulty behavior as quickly as possible.

Let's start! First tell git the current situation is not OK. Next you should 
specify which commit you know for sure the faulty behaviour was not yet present.

```console
$ git bisect start
$ git bisect bad
$ git bisect good bb2285b
Bisecting: 36 revisions left to test after this (roughly 5 steps)
[67abff81ba56541f8d4576ee8690fa34fb68517f] Fixed progress spinner on comment submit
$ 
```

Git has jumped back in time and updated your workspace accordingly. Git
is using a binary search, so it picked a commit in the middle. Right
between the known good and bad commits.

Now we check the current situation and tell git whether it contains the bad
behaviour or not. So we build our website and check our browser to check
for the faulty behaviour. For this example we say the current situation is
still bad, so git moves further back in time.

```console
$ git bisect bad
Bisecting: 21 revisions left to test after this (roughly 4 steps)
[21e5f098dd2fe3c2e8933436b71c0439fc1d242b] Small text update
$ 
```

Repeat this with good and bad until git found the commit that caused
the faulty behaviour.

```console
$ git bisect bad
Bisecting: 21 revisions left to test after this (roughly 4 steps)
[21e5f098dd2fe3c2e8933436b71c0439fc1d242b] Small text update
$ git bisect good
Bisecting: 10 revisions left to test after this (roughly 4 steps)
[e4416eea04aef0da4e6b8bf967a8235cfa870e51] Fixed pulls url.
$ git bisect good
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[61cbe1f37e89403ab162830681969d9b56cf4e28] Merge pull request #7 from jkeuper/staticman_b063ca60-98b2-11e7-93d6-bd7012684e93
$ git bisect bad
Bisecting: 2 revisions left to test after this (roughly 1 step)
[8b1e4c9fd3ab80a3f34c4b248b0908694e17b361] Updated comment to be reply.
$ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[2caf60918daae5fb7711e7fd2070359f0ed29bf9] Added alt tag to gravatar.
$ git bisect bad
2caf60918daae5fb7711e7fd2070359f0ed29bf9 is the first bad commit
commit 2caf60918daae5fb7711e7fd2070359f0ed29bf9
Author: Jasper Keuper <jkeuper@gmail.com>
Date:   Wed Sep 13 02:14:08 2017 +0200

    Added alt tag to gravatar.

:040000 040000 fe128573da2dea5f4070c99b35280cb0fea724ad 41bf79fbf7742d729ab40ca01e95a296d7dec00f M	_includes
$ 
```

And there we have it, the commit that caused all that misery. Now that
was easy! No effort at all compared to other version control
systems and trying to track that faulty commit.

Our HEAD is still pointing to that faulty commit. Use _git bisect reset_
to restore your workspace to the situation before you started with
_git bisect_.

```console
$ git bisect reset
Previous HEAD position was 2caf609... Added alt tag to gravatar.
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
$
```

## Wrap up
For the really lazy people, you can use a script to tell git whether
the current situation is good or bad. Returning 0 from the script
means good, any non-0 return value means bad. You can run this
script after telling git the first good and bad commit. In short,
you can use _git bisect start <<bad>> <<good>>_, listing the bad
commit first and the good commit second.

```console
$ git bisect start HEAD bb2285b
$ git bisect run test.sh
```

This way _test.sh_ runs on each commit until git finds the first 
faulty commit. You can also create a script to run your automated
tests here, to check for the broken functionality.

