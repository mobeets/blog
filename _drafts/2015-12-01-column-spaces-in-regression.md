---
layout: post
title: "Column spaces and linear regression"
description: "Things that may or may not be true."
tags: [math]
categories: articles
latex: true
---

1) "In linear algebra, the rank of a general (not necessarily symmetric) matrix is defined to be the dimension of its column space. For a symmetric matrix, this is the same as the number of nonzero eigenvalues." [[source](http://www.stat.umn.edu/geyer/s06/5102/notes/reg.pdf)]

2) In linear regression with OLS the MLE solution is $$\beta = (X^TX)^{-1}X^Ty$$.

In other words, $$\beta$$ is in the column space of the inverse covariance matrix $$(X^TX)^{-1}$$.

3) In Bayesian linear regression with a zero-mean Gaussian prior on $$\beta$$, the MAP solution is $$\beta = (X^TX + C^{-1})^{-1}X^Ty$$, where $$C$$ is the prior covariance matrix.

Question 1: Does this mean $$\beta$$ is in the column space of $$C$$?

Question 2: If $$C$$ is singular, i.e., if $$C$$ has eigenvalues $$\lambda = 0$$, does that mean $$\beta$$ must be sparse in some basis?

In particular, I'm trying to understand a quote regarding automatic smoothness determination, or ASD. From Park & Pillow's "Receptive Field Inference with Localized Priors" (2011) ([pdf](http://pillowlab.princeton.edu/pubs/Park_Pillow_PLoSCB2011.pdf)):

> "Note that for smooth RFs, the ASD prior covariance matrix becomes ill-conditioned, as some of its eigenvalues are very close to zero. This implies that the ASD estimate is sparse, but (unlike ARD) it is not sparse in the pixel basis. Rather, the ASD estimate is sparse in a basis that depends on the hyperparameters (since the eigenvectors of the ASD prior covariance vary with the hyperparameters). The small-eigenvalue eigenvectors tend to have high-frequency oscillations, meaning that the ASD estimate is sparse in a Fourier-like basis, with the prior variance of high-frequency modes set near to zero."

With ARD, for example, the eigenvalues of $$C$$ are exactly the diagonal entries $$\lambda_i$$. If one of the $$\lambda_j = 0$$, then $$C$$ is clearly singular and thus has a non-trivial null space; in particular, we will have $$\beta_j = 0$$.

Anyway, ASD aside, suppose you want to regress in a linear subspace of $$X$$, i.e., you regress $$y$$ on $$XB$$ where $$X$$ is n-by-m and $$B$$ is m-by-k. You get back $$\beta_B$$, and your final solution for a weighting of $$X$$ is $$\beta = B\beta_B = B(B^TX^TXB)^{-1}BXy$$. $$\beta$$ is in the column space of $$B$$.

Question 3: But how does $$B^TB$$ relate to our solution $$\beta$$? (Does it?) Clearly if $$k < m$$ there will be some smoothing going on--we're no longer considering the full range of $$\beta$$. But how so?

This last question is what I'm really after...If you're doing RBF regression, where each column of $$B$$ is a Gaussian blob, I noticed that $$B^TB$$ looks a lot like the $$C$$ used in ASD. Is this just a coincidence?

