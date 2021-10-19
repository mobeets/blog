---
layout: post
title: "Nonlinearities and bases in linear regression"
description: "Just trying to clear things up."
tags: [math]
categories: articles
latex: true
---

Okay, so you're regressing $$y$$ on $$X$$, and you want a set of weights $$\beta$$ so that $$y = X\beta$$. Other than a simple linear regression of $$y$$ on $$X$$, what are your options? I'll go through a few.

| $$X$$ | $$n \times m$$ |
| $$\beta$$ | $$m \times 1$$ |
| $$y$$ | $$n \times 1$$ |

__Linear subspace regression__

Alternatively, maybe you'd call this "regressing after a change of basis" or something like that. PCA regression would fall into this camp, for example.

Here, you pick some linear transformation $$B$$ and find $$\omega$$ so that $$XB\omega = y$$. (The columns of $$B$$ should be linearly independent.) Your final solution is then $$\beta = B\omega$$.

_Question_: How does $$BB^T$$ determine your set of possible solutions $$\beta$$? In PCA regression, for example, $$BB^T$$ is diagonal. But if $$BB^T$$ is not diagonal, I suspect this will always result in a "smoothed" estimate of $$\beta$$. Just a hunch though.

Often, $$B$$ is written using functions, where you pick functions $$f_1, ..., f_b$$ and apply each one to the integers $$1, ..., m$$. In other words, $$B_{j,k} = f_k(j)$$, so that the $$k^{th}$$ column of $$B$$ is the response of $$f_k$$ to all numbers between $$1$$ and $$m$$.

Summary:

* $$B_{jk} = f_k(j)$$ for $$j = 1, ..., m$$ and $$k = 1, ..., b$$
* $$Z = XB$$, and regress $$y$$ on $$Z$$ to get $$\omega$$
* $$\beta = B\omega$$,

__Modeling input/output nonlinearities__

Rather than writing out words, I'm just going to summarize!

Input nonlinearity:

* $$Z_{i,j,k} = f_k(X_{i,j})$$ for $$i = 1, ..., n$$; $$j = 1, ..., m$$; and $$k = 1, ..., b$$.
* Regress $$y$$ on $$Z$$ to get $$\omega$$
* Full rank: $$\beta_k = \omega_{:,k}$$ (note that there are now $$b$$ distinct weights $$\beta_k$$)
* Bilinear: $$\beta$$ is part of the outer product $$\omega = \beta \eta$$

Output nonlinearity:

* Regress $$y$$ on $$X$$ to get $$\beta$$, then set $$\hat{y} = X\beta$$
* $$Z_{i,k} = f_k(\hat{y}_{i})$$ for $$i = 1, ..., n$$ and $$k = 1, ..., b$$
* Regress $$y$$ on $$Z$$ to get $$\omega$$
* The output nonlinearity $$g(y) = \sum_k \omega_k f_k(y)$$


