---
title: 'Find lost commits with git reflog'
date: 2018-01-25 21:23
categories: development
tags: git learn
featured_image: '/images/posts/git-reflog.png'
lead_text: 'Whoops!? Where did my commit go? Git reflog to the rescue!'
---

Sometimes I get a very worried person at my desk, thinking he just screwed
up bigtime and lost some important commit he made. When you think your work
has been lost for good due to some git commands you executed, think again! 
Git tracks everything and actually never really loses a commit...

## Git reflog
Reference logs (reflogs) record changes made to the head of branches in your
local repository. The git reflog command will show you a detailed history of
what has been happening on the head of your branches. Reviewing the git reflog
output will give you a good idea where things went wrong for you.

```console
$ git reflog
ae89cc8 HEAD@{0}: commit: Fixed build, escaping Jekyll code
2cf30a0 HEAD@{1}: commit: Added post about tags in Jekyll
d0ac36d HEAD@{2}: rebase finished: returning to refs/heads/master
d0ac36d HEAD@{3}: pull --rebase: checkout d0ac36dbe4070b845f80bca4cb6031a8e80c2248
b5a0b09 HEAD@{4}: commit: Updated VS image in post, added draft for related posts.
5be1391 HEAD@{5}: pull: Fast-forward
13faf6b HEAD@{6}: commit: Updated git patching image
d8e8c3c HEAD@{7}: reset: moving to origin/master
a433fa2 HEAD@{8}: reset: moving to HEAD
```

When you compare it to your regular _git log_, you can see it looks
completely different.

```console
ae89cc8a70993a9c660b2917ba4d9f73d28937a5 Fixed build, escaping Jekyll code
2cf30a038b54a9c818f52c60983be5625e9c4833 Added post about tags in Jekyll
d0ac36dbe4070b845f80bca4cb6031a8e80c2248 Fixed link
6206b1075daf20ea459fafc9ffcdb331d7bf98d5 Published WordPress article
e6ee308c5d8ab1911e4fb97ece5785129c56986f Added some minix/Tanenbaum background info
1fc46de2df73239795014f11de1692ba34b941cd Finalized wordpress acticle
4f7983eddca9c9c4031cc0bc1437f9e2173d1a13 Added post on Intels ME
c12eb70933fe4e25706b8ae6df7716ac3aefe4ad Fixed horizontal scroll for code blocks.
```

## Getting changes back
With _git reset --hard &lt;commit hash&gt;_, you can restore the head of 
your current branch back to the commit you specify.

Another option I find easy to use is to create a new branch and use
_git cherry-pick_ to specify the commit you want to restore upon your
new branch. Keep in mind, this could result in merge conflicts, which
you need to handle in a typical merge. Or you could even view the commit
with _git show &lt;commit hash&gt;_ and manually copy the lines you need.

A nice view of your reflog in the regular log can be seen with _git log --walk-reflogs_.

## Wrap up
When fixing things in a tricky situation, I find it good practice to start
off with a new branch. The messed up branch remains intact and the mess at
least won't get any worse.

Some situations I've used _git reflog_ to rescue some commits are, deleted
branches with local commits, a reset --hard on a wrong branch and even
commits on a local branch while doing a [_git bisect_]({{ site.baseurl }}{% post_url /_posts/2017-09-30-git-bisect %})
and I forgot to do a _git bisect reset_ to return to the original HEAD.

---

Disclaimer: Of course you _can_ mess things beyond repair with git! Git is
a really powerful tool, but with powerful tools comes great responsibility.
(E.g. You could have been playing with expire options of the reflog, or 
deleted the reflog completely. Then you really have abandoned your safety net.)
