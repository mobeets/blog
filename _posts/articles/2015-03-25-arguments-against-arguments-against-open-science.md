---
layout: post
title: "Argument against an argument against open science"
description: ""
categories: articles
tags: [open-science]
---

The most common excuse I've heard for not sharing code, data, and other details about a scienctific project online falls roughly into the category of fear of competition. The argument goes: Given that designing experiments and collecting data is a very expensive process, both in time and in money, it's just too risky to put all that investment out there for anyone else to take advantage of without investment of their own. The idiom "beat me to the punch" is mentioned. Vague enemies are referenced.

This fear of competition is selfish in nature, though it's probably a _reasonable_ selfishness: If, as a scientist, publishing is your livelihood, then it seems reasonable to expect people to hoard datasets all to themselves.[^1]

So to respond to the claim that posting code and data online is risky in terms of enabling the competition, we need to think of ways by which we can incentivize these people to still find some value in sharing their data.

First, let's step back a bit and ask why having free online datasets is so valuable.[^2] I can think of a few reasons:

* fact-checking: people can make sure what you've done is reasonable
* collaboration: people can use your data to find more cool things
* education/sandboxing: people can play around with your data and get a feel for how the analysis works

The reasons people should post their data online, by the way, is _exactly_ because it is expensive; there are many who are interested in various data and neither can nor will pay that cost. For myself, and surely for many others, most often all I really want to do with free data is to play around with it, to see if I can make it do something cool, or perhaps to just see if I can do with it what the original research did. And this use-case, I think, is harmless enough, and highly beneficial in terms of education.

But what if, in the course of playing around with the data, I find something useful? What should happen next?

### A compromise: data licensing

Those who fear all their hard work will be put to waste if they post it publicly should simply share it with an open license that delineates certain use-cases as legal. For the super paranoid, I'm thinking something like: "You can use this data as long as you don't benefit from it financially or academically (e.g., by publishing) without permission, and/or without the original data collector involved in the publication process."

If we defer to the Open Knowledge network[^3], an open license "_may_ require distributions of the work to include attribution of contributors". Presumably this requirement could specify that the original data collector be a co-author on the paper, a position that should also allow the collector to ensure the quality of the research involving his data.

By specifying that the original data collector be involved in the process of any publications, the gain is twofold: First, the fear-of-competition thing is annihilated (now you're collaborating, not competing); second, the more general scientific fear that data can be taken out of the context in which it was originally collected, resulting in so-called "bad science", can also be avoided[^4].

Sharing data and code should be mutually beneficial, where both parties (and science as a whole) stand to gain from the exchange. Allowing data to be free to use and to play around with is definitely great from the receiver's standpoint. But what about from that of the original data collector? If that use/play becomes more serious, the original data collector should have the option to become involved, e.g., by being an editor or even a co-author on any published papers using the data. Posting data with the appopriate [data licensing](http://opendefinition.org/licenses/) is a good way to encourage this type of participation.

__Footnotes__

[^1]: But when does this hoarding end? Maybe people could set an expiration data on their data, a sort of [dead-data-device](http://en.wikipedia.org/wiki/Dead_man%27s_switch), where if the data is not used in a project by some amount of time, then it is automatically set free to the public.
[^2]: Of course, there are some downsides to open data, issues that I hope to write blog posts about in the future. For now, though, let's assume that there is a list of benefits and only a single issue, the one currently at hand.
[^3]: In Open Knowledge's ["Open Definition"](http://opendefinition.org/od/), see section 2.2.1 on "Attribution".
[^4]: This is a subject for another blog post, but some data may need a sort of contextual, intangible, or experiential data that is not easily shared without the receiver being in direct contact with the original data collector.
