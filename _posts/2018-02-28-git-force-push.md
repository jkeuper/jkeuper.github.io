---
title: 'The only way to force push with git'
date: 2018-02-28 22:23
categories: development
tags: git learn
featured_image: '/images/posts/git-force.jpg'
lead_text: 'Using git push --force can lead to missing commits, so make sure you force push safely.'
---

Using "_git push \--force_" is really evil. You force your current state of
a local branch upon the remote branch, no matter what. Even if some commit
got pushed right before your force push, it would be overwritten without
any notice at all! Unfortunately with a rebasing strategy you can not avoid it.

## Git rebase
In an ultimate attempt to keep the commit history of our main branch clean,
all our feature teams rebase regularly to keep the history a single straight
line. This has great advantages! There are no merge commits for every time
upstream changes are incorporated. Merging can make it harder to understand
the history of the project.

While rebasing and force pushes are very common, I wondered how integrators
prevent losing commits that were pushed after the last fetch and force push?

It seemed that they simply didn't. "Just be really, really fast...", some
people said jokingly.

## Git push \--force-with-lease
If something happens at the remote branch you are force pushing to, since you
last fetched it, you may lose other people's commits. 

Developers who are unaware of the decision to rebase the branch, may attempt
to push to the branch between the time you fetched to rebase it and the time
you pushed to replace it with the result of the rebase action.

Fortunately git added the option to force push safely with \--force-with-lease!

The "_git push \--force-with-lease_" command pushes, based on the assumption
that the state of the branch is still at the same state as currently known
at the last fetch. If that is not the case, i.e. something happened to the
branch since preparing for this push, then this push is not executed and fails.

## Wrap up
It seems that too many people are still using "_git push \--force_", possibly 
not even knowing that the \--force-with-lease option exists. I think the
\--force option should be removed from git completely.

Please spread the word about \--force-with-lease!


