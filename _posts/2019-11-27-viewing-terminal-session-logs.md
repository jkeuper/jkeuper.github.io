---
title: 'Logging terminal session - continued'
date: 2019-11-27 21:47
categories: security
tags: hack learn bash
featured_image: '/images/posts/netcat_freebsd.jpg'
lead_text: 'Viewing the logs of your saved terminal session'
---

As mentioned in my previous article about [logging the terminal session]({{ site.baseurl }}{% post_url 2019-11-20-logging-terminal-session %}),
it would be very nice to have the date time echo-ed regularly, to be
able to find your way in the log-file.

Ofcourse we won't be doing the `date -I` command ourselfs. I'll show
you an automated way of doing it and show you how to retrieve a list
of commands from the log-files with the time you executed them.

## Customize Bash Prompt
In Bash, we can customize the prompt as you want by changing the value
of `PS1` environment variable.

Usually, the BASH prompt will look something like this.

```bash
root@kali:~$
```

Here `root` is the username, and `kali` is the hostname. The `~` is the
current path, where `~` stands for the home directory of the user.

> ## NOTE1:
> Please make a copy of your `.bashrc` file now.
> `$ cp ~/.bashrc ~/.bashrc.bak`

> ## NOTE2:
> When you test your result, start a new bash shell and leave your
> current shell running to recover any mistakes.

Show your current bash prompt:
```
echo $PS1
```

Bash has many options for your prompt:

|----|------------------|
| \u | username-aligned |
| \h | hostname         |
| \H | FQDN             |
| \s | shell name       |
| \v | shell version    |

The bash prompt even supports colors, date and time and more.

|----|------------------------------------------|
| \t | current time in 24-hour HH:MM:SS format  |
| \T | current time in 12-hour HH:MM:SS format  |
| \@ | current time in 12-hour am/pm format     |
| \A | current time in 24-hour HH:MM format     |


## Add the time to your prompt
Adding the current time to the bash prompt, would solve our problem.
After each command the prompt is shown with the current time. With 
some bash-fu, we will be able to extract the executed command and
the time it was executed.

So, to prefix the current prompt with the current time in 24 hour
format, you can add `\A` in front of the `PS1` variable. Let's 
separate the time from the original prompt with the '=' character.
At the bottom of your `.bashrc` file you can add the following:

```
export PS1 = '\A=' + $PS1
```

## Retrieve commands from logfile
Now, retrieving the command and time from the logfile, becomes
really easy.

```
sed -n -e '/^[0-9]*:[0-9]*/p' logfile
```

## Hide the time
Okay, we've archieved our goal, but I really loved my old prompt.
Can't we fix this, without changing the prompt.

Ofcourse we can, sort of... We could print the time, and then print
a bunch of backspace characters, so the time _is_ printed, but doesn't 
show... Printing a backspace, can be done with `\010`.

```
export PS1="\A=\010\010\010\010\010\010$PS1"
```

When we try to filter out only the time and command, we will use a space 
as separator and some extra characters to get the layout exactely right.

```
export PS1="\A= \010\010\010\010\010\010\010 \010$PS1"
```

Now we can use `sed` and `cut` to get an overview of which commands are
executed at what time:
```
root@kali:~# sed -n -e '/^[0-9]*:[0-9]*/p' logfile | cut -d' ' -f1,3-
21:06=root@kali:~# xload --help
21:07=root@kali:~# xload -update 1 -bg black -fg yellow -hl blue -geometry 200x60
21:08=root@kali:~# exit
root@kali:~# 

```

## Wrap up
So now we can easily check what commands a logfile contains and at what 
time the commands are executed. Perfectly for writing a detailed report.