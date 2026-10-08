---
layout: post
title: "Should you correct for multiple comparisons when estimating how many neurons are tuned?"
description: ""
categories: articles
tags: neuro math
---

Let's say you've recorded the spiking activity from multiple neurons in a given brain area during some task. You'd like to report how many neurons are tuned to the stimulus in the task. This is a very standard analysis that often shows up in Figure 1 of many systems neuroscience papers.

The problem is that we don't know how to label neurons as "tuned" vs. "untuned," so the first thing we have to do is fit a model to each neuron in order to give that neuron a _surrogate_ label. The typical approach is to fit a linear model to the neuron's firing activity given the feature of interest (e.g., stimulus presence vs. absence); or equivalently, you might run an ANOVA. So for each neuron, you fit your linear model or you run your ANOVA, and then the model/test outcome tells you whether you will label the neuron as "tuned" (p < 0.05) or "untuned" (p > 0.05). 

The question I want to address here is: __If you need to do this for N different neurons, do you need to correct for multiple comparisons?__ After all, we are running N different significance tests. So it seems like, just by chance, we expect to misclassify 0.05N neurons as tuned.

When we run these analyses, I would argue that the statistical question we are asking is __"What proportion of neurons in brain area Y are tuned to variable X?"__ For this question, __multiple comparisons correction is _not_ necessarily needed, and can even make things worse.__

To see why, let's assume all neurons have the same signal-to-noise ratio. Imagine using the simplest multiple comparisons correction, Bonferroni. That would mean each neuron needs to pass p < 0.05/N to be labeled as "tuned." If we have 10 neurons, each neuron needs p < 0.05/10 = 0.005. But if we have 100 neurons, now each neuron needs to pass p < 0.05/100 = 0.0005. Typically, when we estimate a proportion, we _want_ to have large N (more neurons/samples). But for Bonferroni, as N increases, it will get more and more difficult to label any individual neuron as "tuned".

The problem is that multiple comparisons correction has a specific goal: limiting our Type I error (i.e., mislabeling untuned neurons as tuned). Bonferroni controls the probability of making even _one_ false positive. FDR controls the expected probability of false positives among the neurons labeled as tuned. In both cases, we may reduce false positives at the expense of _increasing_ false negatives. The upshot is that __a multiple comparisons correction can make us under-estimate the proportion of tuned neurons,__ because it increases the false negative rate.

What you could do instead is to compare your estimated proportion of tuned neurons with the proportion expected under a null model, for example using shuffled data. If all neurons were untuned, for example, a p < 0.05 test would label 5% of our neurons as tuned on average. Exceeding this baseline gives us some evidence that there is tuning in our population. (That being said, this still doesn't tell us the true proportion tuned, since that would require us accounting for false negatives.)

In conclusion, multiple comparisons correction is not automatically required when estimating the proportion of neurons that are tuned to some variable.
