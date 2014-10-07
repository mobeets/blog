---
layout: post
title: "Inferring input nonlinearities in neural encoding models: an overview"
description: "An overview of the methods in Ahrens et. al (2008)."
tags: [math, neuro]
categories: articles
latex: true
---

__Source__: Ahrens et al.'s ["Inferring input nonlinearities in neural encoding models"](http://www.ncbi.nlm.nih.gov/pubmed/18300178) (2008)

## Intro

Linear models of how neurons produce spikes in response to stimuli are convenient, but they aren't very accurate. Adding nonlinearities into these models is a good idea.

Most models augment the linear model with _output_ nonlinearities; that is, the spike rate is a linear weighting of the stimulus value followed by a nonlinear output function (e.g., a rectifying nonlinearity, or an exponential). For example, the GLM or LNP models.

However, here we focus on _input_ nonlinearities, applied to the stimulus prior to the linear weighting. Input nonlinearities can represent nonlinearities applied to the stimulus input before arriving at the cell in question, perhaps by afferent neurons.

Two methods for fitting models with input nonlinearities are covered in the source paper by Ahrens et al.:

__bilinear model__: a single estimated nonlinear function is applied to stimulus prior to linear weighting

- fewer parameters -> requires less data
- more difficult to fit algorithmically
- simpler interpretation

__full-rank__: a separate estimated nonlinear function is estimated for each input to the linear weighting stage

- more parameters -> requires more data
- easier to fit algorithmically
- tougher interpretation

Here, I'm just going to focus on the bilinear model.

## Bilinear model

### Specification

Let the stimulus at any point in time be $$ X := s(t) $$, and the predicted spike rate at that time be $$ Y := r(t) $$.

Linear model, with base spike rate rate $$c$$:

$$ Y = k X + c $$

Linear model with input nonlinearity:

$$ Y = k f(X) + c $$

Typically we parameterize $$f$$, whose form is an unknown, with a set of fixed basis functions and unknown linear weights:

$$ f(.) = b F(.) $$

where $$F$$ is the vector of fixed basis functions (e.g., cosine bumps) and $$b$$ is a vector of scalars (the linear weights).

Now, the model looks like this:

$$ Y = k b F(X) + c $$

where $$F(X)$$ is a matrix, the mapping of each stimulus value by each basis function.

WLOG, you can define a matrix $$M$$ in block form, and augment $$k, w$$ to contain the additional unknown constant $$c$$ as follows:

$$ M=\left[
\begin{array}{c c}
1 &0\\
0 &F(X) \\
\end{array}\right] $$

$$ k = [k_c \enspace k] $$, $$ b = [b_c \enspace b] $$

Now the model can be written as:

$$ Y = k b M $$

where $$M$$ is a tensor (i.e., 3D), and $$k_c b_c$$ is the base spike rate $$c$$.

### Fitting

We want to minimize the squared error between predicted $$Y$$ and observed $$Y'$$:

$$ \epsilon = (Y - Y')^T (Y - Y') $$

Suppose we know $$b$$. Then the model becomes:

$$ Y = k M_b $$

where $$M_b := bM $$ is a 2D matrix.

There is a closed form solution to this problem, with this error function, using OLS:

$$ k = (M_b^T M_b)^{-1} (M_b^T Y) $$

Likewise if we know $$k$$:

$$ b = (M_k^T M_k)^{-1} (M_k^T Y) $$

So we can use the alternating least squares (ALS) algorithm to fit $$k$$ and $$b$$, choosing starting values for $$b$$ or $$k$$ and then fitting them in alternation:

{% highlight python %}
b = ones(nb) # initialize to some guess
for i = 1:niters
    # update k, using OLS given fixed b
    Mb = b*M
    k = inv(Mb.T * Mb) * (Mb.T * Y)
    # update b, using OLS given fixed k
    Mk = k*M
    b = inv(Mk.T * Mk) * (Mk.T * Y)
{% endhighlight %}

This method is not guaranteed to find a unique solution for $$k$$ and $$b$$, but it is guaranteed to converge at a local minimum of $$\epsilon$$.

### Regularization

A method like this one tends to overfit parameters when the observed data is noisy or limited. If you use your estimated parameters to then predict spike rates to a new set of stimuli, your model will do poorly.

One option for preventing this overfitting is to place a prior on your parameters. Note that by minimizing $$\epsilon$$ we're implicitly finding the maximum likelihood (MLE) solution to the model:

$$ Y' = Y + N(0, \sigma^2) $$

However, if we specify prior probability distributions on our expectations for $$k$$ and $$b$$ (for example, you might expect $$k$$ to be "smooth", i.e., $$k$$ should have a small first derivative) then we can obtain what's called a regularized estimate of our parameters, i.e., the maximum a posteriori (MAP) estimate.

Since the likelihood in the above case is Gaussian, if we choose a Gaussian prior then our posterior will also be Gaussian [^1], allowing us to find an analytical solution [^2] for our MAP estimate.

Let our priors on $$k$$ and $$b$$ be:

$$ P(k) = N(0, S_k) $$

$$ P(b) = N(0, S_b) $$

where $$S_k$$ and $$S_b$$ are called the prior covariance matrices of $$k$$ and $$b$$, respectively.

Once you've chosen $$S_k$$ and $$S_b$$, the regularized least squares solution for $$k$$, the MAP estimate, is as follows:

$$ k = (M_b^T M_b + S_k^{-1})^{-1} (M_b^T Y) $$

and similarly for $$b$$.

Now our ALS algorithm above for fitting the bilinear model can take into account prior expectations for $$k$$ and $$b$$, resulting in more robust estimates of these parameters.

### Choosing the regularizer

Regularizing sounds good, but how do we go about choosing the prior covariance matrices $$S_k$$ and $$S_b$$? These matrices can take on a variety of forms, and because they are covariance matrices we know they must be symmetric and positive semi-definite. But then what?

Methods for specifying the form of the prior covariance include ridge, lasso, automatic smoothness determination (ASD), and automatic relevance determination (ARD). These methods all penalize different aspects of the weights you're trying to fit, hoping to push the MAP estimate to be more smooth or sparse, for example. They also usually introduce a set of _hyperparameters_, additional parameters that control the strength of the regularizer or the parameterization of the prior covariance itself.

For example, a ridge prior on $$k$$ defines $$ S_k^{-1} = \lambda I $$, where $$I$$ is the identity matrix of the appropriate size, and $$ \lambda $$ is a hyperparameter controlling the influence of the prior on the regularized solution. Ridge regularization in this case would penalize high-derivatives of $$k$$, i.e., it would try to keep $$ (k_{i+1} - k_i)^2 $$ small for all $$i$$.

But how should we specify a prior on $$b$$? Our input nonlinearity $$f$$ has been parameterized as a linear weighting of basis functions, so a prior on $$b$$ isn't the same as placing a prior on $$f$$. For example, a prior for small derivatives in $$b$$ isn't the same thing as a prior for small derivatives of $$f$$. For this reason, choosing $$ S_b $$ is a bit more complicated than $$ S_k $$. It is still doable, though! (See, for example, Appendix C of the source text.)

### Choosing the hyperparameters

Again, once you've chosen your regularization method you still have to choose the hyperparameters somehow in order to fully specify the prior covariance matrices. [^3] In ridge regression, for example, your hyperparameter is $$ \lambda $$.

You have three basic options for choosing your hyperparameters, from worse to best, least difficult to most difficult:

__manually__: just pick a number and call it a day, e.g., $$ \lambda = 1 $$.

__cross-validation__: e.g., find the hyperparameters that minimize the prediction error $$\epsilon$$ by searching through the domain of valid hyperparameters.

__empirical Bayes__, aka: evidence optimization, Type II maximum likelihood, and maximum marginal likelihood.

Of these, empirical Bayes is the most exciting. The is the strategy taken by automatic regularization methods like ASD and ARD. [^4]

<hr>

__Footnotes__

[^1]: For Gaussian likelihoods, the _conjugate prior_ is a Gaussian. [Here](https://en.wikipedia.org/wiki/Conjugate_prior#Table_of_conjugate_distributions) is a useful table for conjugates of other likelihood distributions.

[^2]: If you don't want to choose a Gaussian prior, you can use an [MCMC](https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo) sampling method to approximate your posterior, and then your MAP estimate would be the mode of the resulting distribution.

[^3]: Of course, you could now set a hyperprior on your hyperparameters and then deal with fitting hyper-hyperparameters, and then a hyper-hyperprior on those hyper-hyperparameters, and so on ad infinitum. But then you'd never find a solution.

[^4]: Sahani & Linden's ["Evidence optimization techniques for estimating stimulus-response functions"](http://papers.nips.cc/paper/2294-evidence-optimization-techniques-for-estimating-stimulus-response-functions) (2002)
