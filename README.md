# My company website

Based on an Open-Source Bootstrap 3 Jekyll Theme by Scotch
https://github.com/scotch-io/scotch-io.github.io

See demo:
http://scotch-io.github.io/

## Development

Requires Ruby 2.3 and Make. Only tested on Mac OS. 
Windows is known to behave badly with jekyll, 
although workarounds do exist.

Should work on Linux. 
Easily verifyable by running a ci server instance travisCI

First time use

```
make bootstrap
make serve
```

Local website available at http://localhost:4000

Run test:

```
make cibuild
```

## Continuous integration

Serra's CI build:
[![Build Status](https://travis-ci.org/serra/jkeuper.github.io.svg?branch=master)](https://travis-ci.org/serra/jkeuper.github.io)
