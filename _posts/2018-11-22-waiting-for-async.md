---
title: 'Waiting for async'
date: 2018-11-22 22:33
categories: development
tags: .net csharp async_await 
featured_image: '/images/posts/async-await.jpg'
lead_text: "Waiting for a async method should be done right"
---

Back in 2012 the .NET Framework 4.5 introduced asynchronous programming 
with async and await. Nowadays I regularly see it being used, but I can 
see that it just isn't understood well.

Let me first say that async and await seems extremely simple when you
look at it at a glance, but it really is not that easy. There are many 
things about async and await, that I could write about.

## Calling an async method from non-async method
When you want to call an "_async_" method from your non-async code, let's 
say a console application, it would seem that you can simple do the following.

```cs
static void Main(string[] args)
{
    var result = SomeAsyncCode().Result;
}

private static async Task<string> SomeAsyncCode()
{
    await Task.Delay(10);
}
```

That _seems_ about right! BUT, what happens the async method _could_ 
throw an exception?

```cs
static void Main(string[] args)
{
    try
    {
        var result = SomeAsyncCode().Result;
    }
    catch (ArgumentException ex)
    {
        Console.WriteLine($"Caught ArgumentException: {ex.Message}");
    }
}

private static async Task<string> SomeAsyncCode()
{
    await Task.Delay(10);
    throw new ArgumentException("No argument given!");
}
```

And here your application will **CRASH and BURN** violently with an
unhandled "_AggregateException_".

## The problem
As I stated before, async and await is not trivial. The syntactic sugar
of async and wait is actualy a serious amount of sugar! It's like 
realizing that a 500ml/16oz bottle of soda contains a whopping 53 grams
of sugar.

What many people do not realize is, that the compiler generates a state
machine to handle toe async code. The code could potentially result in 
multiple exceptions. Those exceptions are wrapped in an AggregateException.

Nobody did see the "_AggregateException_" coming and normally you
wouldn't either. When you are using "_await_", the compiler handles 
the "_AggregateException_" for you and throws the first exception it
sees. If you choose to block an async call with "_Result_" or "_Wait()_"
instead of "_await_", you must deal with the "_AggregateException_"
yourself.

## How should you call an async method synchronously?
Instead of calling "_Result_", you should call "_GetAwaiter().GetResult()_".

```cs
static void Main(string[] args)
{
    try
    {
        var result = SomeAsyncCode().GetAwaiter().GetResult();
    }
    catch (ArgumentException ex)
    {
        Console.WriteLine($"Caught ArgumentException: {ex.Message}");
    }
}
```

This way your code works as expected and the "_ArgumentException_" 
will be caught. Not as intuitive as it should be. The _syntactic sugar_
of async and await, just is not as trivial as the construction seems to be.

## Wrap up
Never force a wait on an async method, but when you must use "_GetAwaiter().GetResult()_".

I think async and await is really great. It makes writing asynchronous
code relatively easy. The construction improves the readability of code
and the code becomes easy to follow, because the compiler hides all complicated
stuff from you. But don't forget, asynchronous code is not simple and you
should really understand what async and await actually do.