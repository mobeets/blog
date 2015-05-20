---
layout: post
title: "Bayesian probit regression with ASD"
description: "A gibbs sampler that may or may not work in practice."
tags: [math, neuro]
categories: articles
latex: true
---

When fitting discrete response variables, probit regresssion seems to have some advantages over logistic regression in that you can use [Gibbs sampling](http://en.wikipedia.org/wiki/Probit_model#Gibbs_sampling) to fit your unknown parameters.

In probit regression your likelihood model is:

$$ P(Y = 1 \mid X, \beta) = \Phi(X'\beta) $$

$$ P(Y = 0 \mid X, \beta) = 1 - \Phi(X'\beta) $$

where $$ \Phi $$ is the cdf of the standard normal distribution.

#### Probit regression with automatic smoothness determination

You'd like to make a Bayesian estimate of $$ \beta $$, with a zero-mean gaussian prior on $$ \beta $$ of the form $$ P(\beta) = \mathcal{N}(0, C) $$.

In automatic smoothness determination (ASD), the prior on your weights $$ \beta $$ is set by two hyperparameters $$\rho, \delta$$ determining the shrinkage and smoothness of the weights. In particular, the covariance between any two weights is:

$$ C_{i,j} = exp(-\rho - \frac{\Delta_{i,j}}{2\delta^2} ) $$.

where $$ \Delta_{i,j} $$ is the squared distance between the weights $$ \beta_i $$ and $$ \beta_j $$ in some space.

Here's the full model:

$$ y^*_i \mid x_i, \beta \sim \mathcal{N}(x_i' \beta, 1) $$

$$ y_i = \left\{ \begin{array}{ll}
        0 & \mbox{if $y^*_i < 0$}\\
        1 & \mbox{if $y^*_i \geq 0$}\end{array} \right. $$

$$ \beta \mid \rho, \delta \sim \mathcal{N}(0, C) $$

$$ C_{i,j} = exp(-\rho - \frac{\Delta_{i,j}}{2\delta^2} ) $$

#### Gibbs sampling

Now, to do Gibbs sampling we need to know how to sample each unknown conditional upon knowing every other unknown. Here's the easy part:

$$ \Sigma = (C^{-1} + X'X)^{-1} $$

$$ \beta \mid y^*_i \sim \mathcal{N}(\Sigma X'y^*_i, \Sigma) $$

$$ y^*_i \mid y_i = 0, x_i, \beta \sim \mathcal{N}(x_i'\beta, 1)[y^*_i < 0] $$

$$ y^*_i \mid y_i = 1, x_i, \beta \sim \mathcal{N}(x_i'\beta, 1)[y^*_i \geq 0] $$

where $$[y^*_i < 0]$$ and $$[y^*_i \geq 0]$$ are indicator variables specifying where to truncate the respective normal distributions.

But there's two parts missing! We need to know how to sample $$\rho$$ and $$\delta$$. And this is where things gets tricky. So this might not necessarily work in practice...

We know that the distribution of each of $$\rho$$ and $$\delta$$ depends only on the weights, $$\beta$$, and the other hyperparameter. This distribution [resembles](https://github.com/mobeets/gaborMotionPulses/issues/44) a Gamma with unknown shape and scale parameters, $$k$$ and $$\theta$$[^1]. (Well actually, for $$\rho$$, you need to exponentiate it first to have it look like a Gamma.)

$$ exp(\rho) \mid \beta, \delta \sim Gamma(k_{\rho}, \theta_{\rho}) $$

$$ \delta \mid \beta, \rho \sim Gamma(k_{\delta}, \theta_{\delta}) $$

We can fit $$(k, \theta)$$ for one of these distributions using what we know about a Gamma's mode and mean. Supposing $$ X \sim Gamma(k, \theta) $$, and letting $$A$$ be its mode, and $$B$$ its mean, then we know:

$$ A = \theta (k-1) = \theta k - \theta $$

$$ B = \theta k $$

Solving both of these equations for $$k$$ and setting them equal to one another gives us:

$$ \frac{A + \theta}{\theta} = \frac{B}{\theta} $$

And so:

$$ \theta = B - A $$

$$ k = \frac{B}{B - A} $$

So let's say we're calculating $$k_{\rho}, \delta_{\rho}$$. Then we can find the mode by minimizing the negative log probability of the weights $$\beta$$ coming from a multivariate normal with mean $$0$$ and covariance given by the ASD prior, with respect to varying the $$\rho$$. This mode is $$A$$ above. The mean, $$B$$, can similarly be found by evaluating the probability at a range of valid $$\rho$$ (around $$A$$) and simply calculating the resulting expectation.

In Matlab this might look like:

{% highlight matlab %}
% given: weights (wts), smoothness hyperparameter (delta),
%     and squared distance matrix (Delta)
% estimating the shape and scale parameters of a Gamma distribution for exp(rho)

P = @(rho) mvnpdf(wts, zeros(numel(wts),1), asd.prior(rho, Delta, delta));

% calculate mode of gamma
obj = @(x) -log(P(x)); rho0 = 0; lb = -20; ub = 20;
A = fmincon(obj, rho0, [],[],[],[], lb, ub);

% calculate mean of gamma
rhos = linspace(lb, ub, 1e3);
ps = arrayfun(P, rhos);
ps = ps ./ sum(ps); % normalize
B = (exp(rhos)*ps')/sum(ps); % exp because exp(rho) is gamma

% draw a sample for rho
theta_rho = B - A;
k_rho = B / (B - A);
rho = log(gamrnd(k_rho, theta_rho));

{% endhighlight %}

Now whether this sampling method will actually converge or not...that's another matter.
