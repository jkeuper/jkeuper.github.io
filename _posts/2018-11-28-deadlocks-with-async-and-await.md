---
title: 'Deadlocks with async and await explained'
date: 2018-11-28 23:45
categories: development
tags: .net csharp async_await 
featured_image: '/images/posts/async-await-1.jpg'
lead_text: "Preventing deadlocks with async and await"
---

Back in 2012 the .NET Framework 4.5 introduced asynchronous programming 
with async and await. Nowadays I regularly see it being used, but I can 
see that it just isn't understood well.

Let me first say that async and await seems extremely simple when you
look at it at a glance, but it really is not that easy. There are many 
things about async and await, that I could write about. View the 
async/await series [here](/tags/?async_await).

## A sample deadlock
The following code is a example for Windows Forms, but the same 
principles apply to _any_ UI application and to _any_ ASP.NET 
application. 

This simple example below retrieves a string from a website, and
displays the returned string in a textbox. This will result in a 
deadlock.

```cs
private static async Task<string> GetTextAsync()
{
    using (var client = new HttpClient())
    {
        Task<string> getStringTask = client.GetStringAsync("https://example.com");  

        // Do some work that doesn't rely on the string from GetStringAsync.  
        DoSomeOtherWork(); 

        return await getStringTask;
    }
}

public void Button1_Click(...)
{
    var textTask = GetTextAsync();
    textBox1.Text = textTask.Result;
}
```

## The deadlock explained
The "_async_" and "_await_" keywords do not create any additional 
threads. Async methods are intended to be non-blocking operations.
The method runs on the current "_synchronization context_" and uses 
time on the thread only when the method is active. You should use 
"_Task.Run_" to execute CPU-bound work in a background thread, but
you don't need any background thread to wait for results, e.g. a 
http-request. It's like time-sharing a single thread.

Simply put, a "_synchronization context_" represents a location 
"where" code might be executed. Every thread can have a 
"_synchronization context_" instance associated with it.

What the current "_synchronization context_" is, can vary.

  * On a UI thread, it is a UI context.
  * In an ASP.NET request, it is an ASP.NET request context.
  * Otherwise, it is usually a thread pool context.

When you await an async method or, to be more precise, _any_ awaitable, 
the awaitable will capture the current "_synchronization context_". 
Later when awaitable completes, the remainder of the async method will
be executed on the "_context_" that was captured before the "_await_"
returned.

The problem occurs when you have a __single__ "_synchronization context_",
like in our Winforms example above. But the same would apply to any ASP.NET
application. Let me explain what happens from the top-level method.

  1. The top-level method calls the GetTextAsync with the UI/ASP.NET context.
  2. GetTextAsync starts the http-request by calling GetStringAsync.
  3. GetStringAsync returns a started but uncompleted task.
  4. GetTextAsync awaits the task returned by GetStringAsync.
  5. GetTextAsync returns a started but uncompleted task.
  6. The top-level method keeps the "_synchronization context_" locked while waiting on the task returned by GetTextAsync.
  7. After a while, the http-request will complete and the task returned by GetStringAsync will complete.
  8. Now the remainder of the GetTextAsync is now ready to run, and **it waits for the context to be available** so it can execute in the context.
  9. ... and it waits, and waits, and waits. While we realize that the "_synchronization context_" will never become available. 
  10. **Deadlock**: The top-level method is blocking the "_synchronization context_", waiting for GetTextAsync to complete, while the GetTextAsync is waiting for the context to be free so it can complete.

## The solutions
The solution is simple, use async all the way down. Never block on tasks yourself.

```cs
public async void Button1_Click(...)
{
    var textTask = GetTextAsync();
    textBox1.Text = textTask.Result;
}
```

Another solution is to call "_ConfigureAwait(false)_" on the task of the 
underlying method, to prevent the continuation of the task on the original
context captured.

```cs
private static async Task<string> GetTextAsync()
{
    using (var client = new HttpClient())
    {
        Task<string> getStringTask = client.GetStringAsync("https://example.com");  

        // Do some work that doesn't rely on the string from GetStringAsync.  
        DoSomeOtherWork(); 

        return await getStringTask.ConfigureAwait(false);
    }
}
```

If you really cannot use async all the way, then you could use "_Task.Run(...)_" to
execute the async method in a separate thread.

```cs
public async void Button1_Click(...)
{
    Task<string> textTask = Task.Run(() => GetTextAsync());
    textBox1.Text = textTask.Result;
}
```

## Wrap up
Like in my previous [article]({{ site.baseurl }}{% post_url 2018-11-22-waiting-for-async %}):
Never force a wait on an async method. You should use async all the way down. 
Alternatively, either use "_ConfigureAwait(false)_" in your underlying
methods/libraries or use a separate thread to execute the async method.

I think async and await is really great. It makes writing asynchronous
code relatively easy. The construction improves the readability of code
and the code becomes easy to follow, because the compiler hides all complicated
stuff from you. But don't forget, asynchronous code is not simple and you
should really understand what async and await actually do.

Check out the complete async/await series [here](/tags/?async_await).