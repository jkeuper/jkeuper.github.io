---
title: 'Patching with Git'
date: 2017-08-27 22:50
categories: development
tags: git learn
featured_image: '/images/posts/git.jpg'
lead_text: 'Send commits to your coworkers or some other location without pushing them to a repository yet'
---

I am working on a windows laptop, so getting jekyll to work correctly seems
to be troublesome. So before pushing changes to my repository, I would like
to check them on a jekyll docker image running on my NAS. Using the
"_git format-patch_" command, we export out commits and apply them on our
jekyll docker image to build and html-proof our site.

First of all start with a new branch:

```console
$ git checkout -b test_build
Switched to a new branch 'test_build'
```

In the "test_build" branch, we've made some minor fixes and add a new article.

```console
$ git log --pretty=oneline -2
ea88d654638714c54ede324244ce17bc456365ef Fixed highlighting code
9afa570100bd49b992e636f0d530fa4125d8c507 Fixed links in carousel
```

Create a single patch file, instead of patches per commit:

```console
$ git format-patch master --stdout > small_fixes.patch
```

Or make a patch containing the last two commits:

```console
$ git format-patch -2 --stdout > small_fixes.patch
```

To apply the patch, first check what is in the patch:

```console
$ git apply --stat small_fixes.patch
 _includes/carousel.html               |    4 ++--
 _posts/2017-08-25-exploring-upnp.md   |    8 ++++----
 _posts/2017-08-26-netcat-without-e.md |    8 ++++----
 3 files changed, 10 insertions(+), 10 deletions(-)
```

Then check whether the patch gives any problems when applying:

```console
$ git apply --check small_fixes.patch
```

Now apply the patch for real. Use "_git apply_" to apply the patch as single
item and have all applied changes as unstaged changes. Use "_git am_" to apply
every commit in the patch also on the target location. This way history is
preserved and this is usually the preferred approach. With "_git am_" you can
use the "_\--signoff_" option to add "Signed-off-by:" line to the commit
message, so it is clear who is responsible for adding the commits to the
code. For now, we don't need the "_\--signoff_" option.

```console
$ git am < small_fixes.patch
Applying: Fixed links in carousel
Applying: Fixed highlighting code
```

All commits are applied successfully. Now test whether everything works fine and the changes can be pushed to the repository.
