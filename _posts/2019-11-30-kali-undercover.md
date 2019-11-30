---
title: 'Going undercover with Kali'
date: 2019-11-30 09:55
categories: security
tags: hack learn kali
featured_image: '/images/posts/kali-header.jpg'
lead_text: 'Going undercover - make Kali look like Windows 10'
---

With the new Kali 2019.4 release, Kali comes with an '_undercover_'
mode which make the Kali desktop look like Windows 10.

<img src="/images/posts/kali_undercover_org.png" 
     alt="Kali Undercover"
     class="media pull-right img-thumbnail">
## Going undercover
At my recent [PWK]({{ site.baseurl }}{% post_url 2019-11-18-pwk-live-course %})
training, we gathered with a group of students in the hotel bar or lobby
to spend the evening training what we had learnt that day.

I noticed some strange looks while we were running Kali Linux, instead
of some familliar OS like Windows or MacOS. (Or maybe because of our
wildy blinking Alfa Wifi adapters, hanging from out laptops...?)

## Improving our cover
While this solution is already great, we can just make it a bit better
by replacing the undercover background by the original background
from Windows 10.

The undercover background can be found at
`/usr/share/kali-undercover/backgrounds`. A quick look shows us the 
dimensions of 3840x2160.
```bash
root@kali:/usr/share/kali-undercover/backgrounds# file Windows-10.jpg 
Windows-10_org.jpg: JPEG image data, progressive, precision 8, 3840x2160, components 3
root@kali:/usr/share/kali-undercover/backgrounds# 
```

The Windows 10 background can be found at
`C:\Windows\Web\4K\Wallpaper\Windows`.
```dos
C:\Windows\Web\4K\Wallpaper\Windows>dir
 Volume in drive C is Windows8_OS
 Volume Serial Number is 405A-7B73

 Directory of C:\Windows\Web\4K\Wallpaper\Windows

12-04-2018  00:38    <DIR>          .
12-04-2018  00:38    <DIR>          ..
12-04-2018  00:33            83.978 img0_1024x768.jpg
12-04-2018  00:33           259.862 img0_1200x1920.jpg
12-04-2018  00:33           117.392 img0_1366x768.jpg
12-04-2018  00:33           358.721 img0_1600x2560.jpg
12-04-2018  00:33           822.292 img0_2160x3840.jpg
12-04-2018  00:33           310.974 img0_2560x1600.jpg
12-04-2018  00:33           692.503 `**`img0_3840x2160.jpg`**`
12-04-2018  00:33            92.428 img0_768x1024.jpg
12-04-2018  00:33           122.982 img0_768x1366.jpg
               9 File(s)      2.861.132 bytes
               2 Dir(s)  113.285.505.024 bytes free

C:\Windows\Web\4K\Wallpaper\Windows>
```

Now just replace the `Windows-10.jpg` file with out new background
and let's go undercover.
```bash
root@kali:~# kali-undercover
root@kali:~#
```

<img src="/images/posts/kali_undercover_win.png" 
     alt="Kali Undercover Improved"
     class="media pull-right img-thumbnail">
## Wrap up
That's it! The undercover look now is very close to Windows 10. I 
even get confused running Kali in undercover mode as virtual machine.

I guess we should checkout the new powershell next. Powershell is 
currently available in Kali with the new 2019.4 release.




