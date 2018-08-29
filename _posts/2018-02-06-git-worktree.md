---
title: 'Working in parallel with git worktree'
date: 2018-02-06 22:03
categories: development
tags: git learn
featured_image: '/images/posts/git-worktree.png'
lead_text: 'Doing things on other branches without interrupting your current work, i.e. switching branches.'
---

Frequently I am working on a large commit having many changed files or running
a precarious debug session or time consuming test. But some other urgent task
comes by forcing me to switch branches. Today I was running a time consuming
test so I had enough time to investigate out how I could update another
branch and push a commit to origin.

## Git worktree
Today I came across "_git worktree_" which allows you to checkout another
branch to a separate directory. No longer any need for stashing changes
or waiting for your test run to complete!

When working with worktrees I put them in a TEMP folder next to the folder
containing the branch, so it is clear where your worktrees live. To work 
on a new branch 'patch', you can do the following.

```console
$ git worktree add -b patch ../TEMP/patch origin/master
Branch patch set up to track remote branch master from origin.
Preparing ../TEMP/patch (identifier patch)
HEAD is now at 5a941cd Fixed markdown typo
$ cd ../TEMP/patch/
$ git status
On branch patch
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
$ 
```

Or when you want to work on an existing branch 'patch'...


```console
$ git worktree add ../TEMP/patch patch
Preparing ../TEMP/patch (identifier patch)
HEAD is now at 5a941cd Fixed markdown typo
$ cd ../TEMP/patch/
$ git status
On branch patch
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
$ 
```

When you have finished working on your patch and you want to clean up your
worktree, you can simply delete the directory and prune your worktrees and
everything is back to normal.

```console
$ cd -
$ git worktree list
/home/jkeuper/Projects/jkeuper.github.io  5a941cd [master]
/home/jkeuper/Projects/TEMP/patch         5a941cd [patch]
$ rm -rf ../TEMP/patch/
$ git worktree prune
$ git worktree list
/home/jkeuper/Projects/jkeuper.github.io  5a941cd [master]
$ 
```

Cleaning up your worktree does not remove your branch, only the worktree
is deleted. You later can continue work on your branch and see the local
commits you made while working with your worktree.

```console
$ git branch
* master
  patch
$ 
```

## Wrap up
Working on multiple branches in separate directories simultaneously
really is awesome! I really needed this feature... Although I think
it is good I did not find this earlier. I now am used to commit more
often than I initially used to, otherwise I probably wouldn't have 
been committing that often.

I personally would not use it for any large tasks,
but for quick and easy tasks next to my main task. In practice pushing
around commits for review, pushing them to origin when the review has
been finished and quick fixes to process review comments.

