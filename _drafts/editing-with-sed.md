---
title: 'Editing with sed'
date: 2017-09-17 22:20
categories: security
tags: sed learn hack
featured_image: '/images/posts/sed.png'
lead_text: 'Editing files in a non-interactive reverse shell can be done easily with sed'
---

At times I find myself in situations in which I can not rely on my favorite commandline text editor VIM.
But of course editing files is a must. Writing my own non-interactive line editor actually _did_ cross my mind,
but hold on... What about my old time friend sed?!

Sed is short for "stream editor", which is used to perform filtering and text transformations on an input stream. There have been times
that I've been using sed very much. Together with another line based editing called awk, you can do almost anything with text files.
So, let's see what sed command we can use to do simple operations in our restricted shell environment.

# Commands
_Delete line #5_
```bash
$ sed -e '5d' readme.txt
```

_Replace AAA with BBB in line #5_
```bash
$ sed -e '5s/AAA/BBB/' readme.txt
```

_Replace line #5 with XXX_
```bash
$ sed -e 'Ns/.*/XXX/' readme.txt
```

_Replace AAA with BBB once in each line_
```bash
$ sed -e 's/AAA/BBB/' readme.txt
```

_Replace AAA with BBB for all occurances in each line_
```bash
$ sed -e 's/AAA/BBB/g' readme.txt
```

_Insert XXX at line 5_
```bash
$ sed -e '5iXXX' readme.txt
```

_Appending to files is even easier without sed_
```bash
$ echo XXX >> readme.txt
```

# Output vs in-place editing
This should cover the basics of editing files.
The following commands give the result to the standard output, which we can redirect to the file itself. Or a new file when you prefer.
Most versions of support the -i option to edit files in-place instead of printing to the standard output.

For example, to delete line 5 from a file:
```bash
$ sed -e '5d' readme.txt > readme.txt
```

But with -i you can write:
```bash
$ sed -i '5d' readme.txt
```

# Some sed basics
To execute the command for the first, second and third line.
```bash
$ sed -e '1,3 command' file.txt
```

To execute the command just for lines that match the pattern.
```bash
$ sed -e '/PATTERN/ command' file.txt
```

To execute the command starting in the line that matches BEGIN, until the lines that matches END
```bash
$ sed -e '/BEGIN/,/END/ command' file.txt
```

You can execute multiple operations in one statement. For example delete each line containing foobar and replace each occurance of AAA in each line with BBB.
```bash
$ sed -e '/foobar/d
```

s/AAA/BBB/g' file.txt
You can execute multiple operations on one match. For example replace each occurance of AAA in each line with BBB and add a new line after that containing "Append this!".
```bash
$ sed -e 's/AAA/BBB/g
a\
Append this!' file.txt
```

Of course there are more possibilities when you combine sed with other tools. Delete all lines containing "read" from all text files found in the current directory and it subfolders.
```bash
$ find . -name *.txt -exec sed -i '/read/d' {} \;
```

Another nifty tool is xargs, which let you execute commands on the input you provide:
```bash
$ find . -name 'readme.*' | xargs sed -e '/read/d'
```

Or find files containing a specific string and replace that string:
```bash
$ grep -rl fubar ./ | xargs sed -i 's/fubar/foobar/g'
```

You might want to check first what files contain the word you are looking for.
```bash
$ grep -rnw ./ -e fubar
```

Sed is a really powerful tool, but it is difficult to remember the syntax besides al thos other tools. I guess the only solution is to use it more often and maybe come visit this article to freshen up your memory! More details and samples can be found [here](https://www.computerhope.com/unix/used.htm).

