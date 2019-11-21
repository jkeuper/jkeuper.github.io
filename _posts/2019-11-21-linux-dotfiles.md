---
title: 'Linux dotfiles'
date: 2019-11-21 00:51
categories: other
tags: linux bash
featured_image: '/images/posts/netcat_freebsd.jpg'
lead_text: "Linux personal config files stored on GitHub"
---

While working with Linux on and off for two decades, I never
structurally solved the problem of tweaking a new Linux installation
to my liking, over and over again.

Lately I stumbled on a blog post where the [dotfiles](https://en.wikipedia.org/wiki/Dot-file) were stored in git.
Awesome! But it used symlinks or rsync, not exactly my kind of solution.
While the time has come again to install a fresh Linux copy, so I searched
for a better solution, and behold! The [Atlassian Tutorial](https://www.atlassian.com/git/tutorials/dotfiles)
provided all I needed. Just plain git! No extra tooling neede,
no symlinks. Adding config files directly from the home directory.
You could even use different branches for different computers.

The trick is using a bare git repository from a custom folder, while mapping
the worktree to my home folder. (Hmmm, [worktrees sound familiar]({{ site.baseurl }}{% post_url 2018-02-06-git-worktree %})...)
Using a special alias so commands run against the specific repository
and do not interfere with my regular repositories.

## Starting from GitHub
I'd like to store my dotfiles on GitHub and retrieve them from there
to tweak any Linux installation. Files should be added or changed
easily. Oke, lets start!

First create a empty git repository on GitHub. Now checkout the repo "_bare_":
```bash
git clone --bare git@github.com:jkeuper/dotfiles.git $HOME/.cfg
```

To work with this repository, add an alias:
```bash
alias cfgit='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'
```

Now you can work with git and this repo by using the cfgit command:
```bash
# Add a file
cfgit add .vimrc

# Commit the file
cfgit commit -m "Initial commit"

# Push to origin
cfgit push origin master
```

## Apply dotfiles to New machine
Now we make a script for getting a new machine configured correctly.

Get the dotfiles from git and make backups if files get overwritten.

```bash
#/bin/sh

git clone --bare git@github.com:jkeuper/dotfiles.git $HOME/.cfg

function cfgit {
/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME $@
}

echo "alias cfgit='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'" >> $HOME/.bash_aliases

cfgit config --local status.showUntrackedFiles no
cfgit push --set-upstream origin master

cfgit checkout &> /dev/null
if ! [ $? = 0 ]; then
  mkdir -p .cfg-backup
  cfgit checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | xargs -I{} mv {} .cfg-backup/{}
  echo "Backing up pre-existing dot files to ~/.cfg-backup/";
  cfgit checkout
  # the .bash_aliases is overwritten here with the cfgit alias already present
fi;
```

Running the script gives the following output:
```bash
~# ./.bin/install.sh
Cloning into bare repository '/root/.cfg'...
remote: Enumerating objects: 7, done.
remote: Counting objects: 100% (7/7), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 7 (delta 1), reused 6 (delta 0), pack-reused 0
Receiving objects: 100% (7/7), done.
Resolving deltas: 100% (1/1), done.
Branch 'master' set up to track remote branch 'master' from 'origin'.
Everything up-to-date
Backing up pre-existing dot files to ~/.cfg-backup/
~#
```

## Wrap up
Now I should start adding more dotfiles!

You can try it out and find the repository [here](https://github.com/jkeuper/dotfiles).
I've added the [install script](https://github.com/jkeuper/dotfiles/tree/master/.bin) 
in the "_.bin_" directory. Use curl or wget to retrieve the install script 
and execute it with bash in your home folder. Please note, you need to have
git installed.

```bash
cd ~
curl -s https://raw.githubusercontent.com/jkeuper/dotfiles/master/.bin/install.sh | sh
```