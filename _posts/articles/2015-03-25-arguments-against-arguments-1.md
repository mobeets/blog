---
layout: post
title: "Argument against an argument against open science"
description: ""
categories: articles
tags: [open-science]
---

The most common excuse I've heard for not sharing code, data, and other details about a scienctific project online falls roughly into the category of fear of competition. The argument goes: Given that experimental design and data collection is a very expensive process, both in time and in money, it's too risky to just put all that investment out there for free for anyone else to take advantage of. The idiom "beat me to the punch" is mentioned. Vague enemies are referenced.

This fear of competition is selfish in nature, though it's probably a _reasonable_ selfishness. If, as a scientist, publishing maintains your livelihood, then it seems reasonable to hoard datasets all to yourself if that might let you publish a string of papers over some amount of time.[^1]

So to respond to this argument, that posting code and data online is risky in terms of enabling the competition, we need to think of ways by which we can incentivize these people to still find some value in sharing their data.

But what is the value of data being online for free, no questions asked?[^2] I can think of a few:

* fact-checking: people can make sure what you've done is reasonable
* collaboration: people can use your data to find more cool things
* education/sandboxing: people can play around with cool data from cool scientists, and get a feel for how it all works

The reasons people should post their data online, by the way, is _exactly_ because it is expensive, and because I (and most others) do not want to pay that cost. And for myself, and surely for many others, I have little in publishing science (or even the ability to do so) using free data. All I really want to do most of the time is to play with it, to see if I can make it do something cool, or perhaps to just see if I can do with it what the original science did--to learn how they did it. And this use-case, I think, is harmless enough, and highly beneficial in terms of education.

But what if, in the course of playing around with the data, I did find something useful? What should happen next?

### A compromise: data licensing

Those who fear all their hard work will be put to waste if they post it publically should share it publicly with an open license, one that delineates certain use-cases as legal, things like: You can use this code as long as you don't benefit financially (commercially) or academically (by publishing). And if you do want to benefit, you must be granted permission and, say, share the wealth (e.g., a percent cut, or co-authorship) with the original data collector.

According to the Open Knowledge network[^3], an open license may "require distributions of the work to include attribution of contributors". Presumably this requirement could specify that the original data collector be a co-author on the paper, a position that should also allow the collector to ensure the quality of the research involving his data.

By making sure the original data collector is involved in the process of publishing, for example, the fear-of-competition thing is annihilated (since now you're collaborating, not competing), and so are other more scientific fears, like the data collector needing to provide some sort of contextual, intangible information that might be easily misinterpreted.

Sharing data and code should be mutually beneficial, where both parties (and science as a whole) stand to gain from the exchange. Allowing data to be free to use and to play around with, with zero entry cost, is definitely great from the receiver's standpoint. But what about from that of the original data collector? If that use/play becomes more serious, the original data collector should have the option to be involved, e.g., by being an editor or even a co-author on any published papers using the data. Posting data with the appopriate [data licensing](http://opendefinition.org/licenses/) is a good way to encourage this type of participation.

__Footnotes__

[^1]: But when does this string end? Maybe people could set an expiration data on their data, a sort of [dead-data-device](http://en.wikipedia.org/wiki/Dead_man%27s_switch), where if the data is not used in a project by some amount of time, then it is automatically set free to the public.
[^2]: Of course, there are some downsides to open data, issues that I hope to write blog posts about in the future. For now, though, let's assume that there is a list of benefits and only a single issue, the one currently at hand.
[^3]: In Open Knowledge's ["Open Definition"](http://opendefinition.org/od/), see section 2.2.1 on "Attribution".
