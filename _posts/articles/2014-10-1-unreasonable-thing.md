---
layout: post
title: "An unreasonable thing that I want."
description: ""
categories: articles
tags: tetrahedron
comments: true
share: true
---

__tl;dr__: _We should be able to get rid of things but schedule their return, and reminder apps with smart triggers could help. It'd also be cool if those reminder apps could ask us for input._
<hr>

Here's a fun game to play that never actually works out that well: Each day, look out for themes. If you're good at two-shot learning, this should be easy. Did you hear two people mention [baby hippos](http://worstcats.tumblr.com/)? Good: Then today is deemed Baby Hippo Day--now write it down!

The problem, I think, is that experiencing a good theme day is rare, and so the calendar idea quickly becomes yet another abandoned tab left open in my Sublime Text window. But this issue extends beyond this dumb game idea, and actually has even more to do with all the browser tabs I keep open[^1]. __Someone needs to help me with all of these open browser tabs.__

The only solution to all your open tabs, as you've probably discovered, is an accident: Your laptop somehow reboots, and you realize (a few days later, when you first notice their absence) that you don't actually miss them at all.

So closing the tabs is a good start, but it's not ideal: After all, you kept each tab open for a reason! You wanted to do something, or remember to read something, or maybe it was just there as a reminder. Closing those tabs wasn't as upsetting as you thought it would be, but why say goodbye forever? Human activity, say our browser windows, might just be too messy and unorganized and aspirational. But there are solutions.

## You can forget things once you know someone will remind you of them later...

Clive Thompson recently wrote about how people have started using different devices for different activities, e.g., reading web articles only on your phone, doing internet work on your laptop, coding on your desktop, etc. Doing so, as I can personally attest, does wonders for the open tab problem: Once you establish the right sorts of habits, figuring out where you're most likely to do a certain thing, you don't need that tab open any more: You delegate it. The next time you open your phone's Pocket app, for example, you see all the articles you saved. Voila! Articles unforgotten, but also no longer constantly taunting you.

We have a few apps that help us do things like this:

* calendars: For events you want to go to.
* _Pocket_, _Instapaper_, _Readability_, etc.: For things you want to eventually read.
* bookmark folders: For every other thing you keep tabs open for. You name the subject.

But the problem with these things is that usually you forget to check back in! You have to be in the habit of checking your calendar, for example, for adding an event to your calendar to be useful. So the natural extension is to have apps do the reminding:

* crontab[^2]: "Run this script every day at 10pm."
* Google's calendar reminders: "Send me an email when this event is one day away."
* iPhone location-based reminders: "Tell me this when I leave my house."
* [Spaced repetition](https://www.google.com/#q=spaced+repetition+software) apps: "Tell me something whenever I'm most likely to remember it."
* [IFTTT](https://ifttt.com/wtf): "Send me an email in the morning if there's rain in the forecast."

## But there are too many solutions.

Do we really need a different app for every different job? God, I hope not. Surely there's a more general app that can do all these things at once.

Basically, what I want is something that allows __{manual/scheduled} prompts + {manual/scheduled} reminders__. Such a system, paired with a good categorization system, would be general enough to replace all the above examples. Here's how some of those examples look in these terms:

* Pocket/Instapaper/Readability = manual prompts ("Save this article for later.") + manual reminders ([check your app to see all the articles you saved.])
* Google Calendar = manual prompts ("Dinner at Tom's") + scheduled reminders ("The event Dinner at Tom's is scheduled for tomorrow.")
* lifelogging = manual prompts ("I just drank 1 glass of water.") + scheduled reminders ("Today you drank 8 glasses of water!")

## What I want instead:

We should be able to get rid of things but schedule their return, and reminder apps with smart triggers could help. It'd also be cool if those reminder apps could ask us for input.

I want an app that lets you set general reminders that something exists. It might be a general reminder to answer a certain question, like "What's your theme today?", or it might be something more like "Hey! You wanted to watch this movie. Remember?" Finding ways to integrate these reminders in ways that maximize the chances of you actually _doing_ whatever it was you thought you'd want to be doing is definitely a tough problem. But if you combine IFTTT's idea of triggers with intelligent reminders like spaced repetition, and apply it to basically everything, I think the world could be both fun and less tab-ridden.[^3]

<hr>
_Footnotes_:

[^1]: Pro-tip: Never start using multiple browser windows to categorize all the tabs you have open. It's a downward spiral.
[^2]: Crontab is the general purpose tool for scheduling things to happen on Unix-based systems; it's how your Dropbox always knows exactly when you've changed a file in your Dropbox.
[^3]: Last but not least: this system should let you own your own data. It should also somehow be on all your devices at once, and yet completely private.
