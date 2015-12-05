---
layout: post
title: "Settling the Bayesian v. Frequentist debate"
description: ""
categories: articles
tags: [math]
latex: true
---

I think I've finally settled the debate--for myself, at least.

You're trying to estimate a parameter $$\theta$$, and someone hands you a 95% confidence interval for an estimate of that parameter. Someone asks you the probability that the true value $$\theta$$ is contained in that confidence interval.

One example of what you might be tempted to say is "I am 95% confident that the true parameter is in my confidence interval."

But the statistician--the Frequentist--smugs. "The true parameter is either in your confidence interval or it isn't," he says.

Confusion descends. The Frequentist continues:

"What you mean to say is, were this procedure to be repeated on multiple samples, the calculated confidence interval would encompass the true population parameter 95% of the time."

Still, the confusion persists: You don't _have_ multiple samples. You just have the one, and you want to know whether or not the true parameter is in it.

Now I'll get to the distinction that settles the Bayesian/Frequentist debate in my mind. __Basically, the debate is best understood not as competing philosophies__, as it's usually said to be, __but as a conflict of interest between two roles__.

If you're the one who writes statistics packages, theorizes about statistical confidence, etc., you want to make sure that your confidence intervals have some guaranteed success rate for the people who _use_ your procedures. You want to make sure that, for example, 95% of the people who construct confidence intervals in the way you've instructed will actually contain the true parameter.

But if you're the scientist, the one constructing a confidence interval and trying to think about what it means, you've only got the one chance to get things right. After all, if you had "multiple samples" of your data, you wouldn't make multiple confidence intervals: You'd combine them all together and still just make the one confidence interval.

Which leads me to my simplified description of the difference between the perspectives of the Frequentist and the Bayesian.

A Frequentist wants statistics to work for _everyone_, so he needs his probabilities to refer to samples taken by _different_ people. In his view the true parameter is fixed while the sampling is random. A Bayesian, on the other hand, is a little more selfish: He only wants to figure out things for himself, to update his beliefs about the data, and so it's the unknown parameter that's random--because it's unknown.

It makes sense to me now why more statisticians are Frequentists while most applied scientists are Bayesians: They have opposing needs from the theory. How do you resolve this conflict? I have no idea. Both needs seem important.

