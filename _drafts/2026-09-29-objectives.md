---
layout: post
title: "Objective functions say nothing about intention"
description: ""
categories: articles
tags: neuro
---

There is a common fallacy that I have noticed people often have about objective functions. The fallacy is, whenever someone posits that a system (an animal, an agent, a person) has a certain objective---say, maximize reward---it is common to assume that this statement implies conscious intent on the part of the actor. The fallacy is most common when the actor is human, but that isn't always the case.

## Cars

To give some concrete examples: soap bubbles are thought to be spheres because a sphere is the 3D shape with a given volume that minimizes surface area (and thus surface tension). This doesn't mean that soap bubbles are "trying" to be spheres. Instead, the objective is a way of explaining why the bubble is a sphere.

## Motor adaptation

Even more concretely: In motor neuroscience there is a phenomenon called motor adaptation, where the motor system is assumed to reduce any errors between intended and actual ovements. For example, imagine you are instructed to reach toward a target. But every time you reach, something silently pushes your arm to the right. Given many such trials, your arm will begin pushing slightly to the left, to cancel out the expected push to the right. However, this does _not_ imply that you are consciously or intentionally doing so! In other words, the idea is not that you are cognitively aware of what you are doing. Studies of motor adaptation have distinguished between "implicit" versus "explicit" adaptation. Implicit adaptation happens "automatically," whereas explicit adaptation is cognitively controlled. And in fact, many studies have found that if you instruct people to explicitly resist the perturbation by pushing to the left, people's behavior ends up being worse longer because now you have both explicit and implicit adaptation happening simultaneously.

The point is that the motor system has _implicit_ objectives (in this case, to minimize error) that does not involve (and is even interfered with by) conscious intent.

But not every subfield of neuroscience where people posit objectives has made this explicit vs implicit distinction, and I think as a result people tend to assume (as a default) that objectives are explicit.

## Emotions

When we think about someone acting hyper-rationally, like a Vulcan, we think of this as being counter to someone who acts based on intuitions or how something "feels". The choices of either could be described in terms of objective function.

emotion as counter to rationality, or vulcans, who supposedly operate according to objective functions.
Instead, Vulcans are those who _consciously_ make decisions based on calculations.


## Economic value/choice

Using the language of objective functions and constraints is just a way to quantitatively describe a system's behavior. But I think that quantification can unintentionally imply that the system is _actively, intentionally_ quantifying things. For example, when I choose which candy bars I want to buy at the store, it's not like I'm checking historical notes on my preferences and their impact on my recent sleep quality. I just make a gut choice. But it is still possible that, if you were to have me repeat these choices many many times, there still might be some quantitative way of predicting my choice based on their impact on my sleep quality. Even if I had absolutely no idea that that was what I was doing.

## Emergence and objectives

Even if an objective function is a good way of describing the problem a system is solving, the way the system solves that problem may be almost entirely unrelated.

Similarly, ant colonies are thought to find the shortest path between a nest and a new food source not because this is their conscious goal; rather, each ant follows local rules, and the colony's shortest-path-solution _emerges_ out of these local rules.

A system that actively tries to estimate a bayesian posteriors versus, say, a system that uses recurrence to maximize rewards in a POMDP, which leads to the sytem having bayesian-posterior-like representations

