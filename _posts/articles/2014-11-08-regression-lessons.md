---
layout: post
title: "Regression lessons"
description: ""
categories: articles
tags: [math, neuro]
latex: true
---

### 1. Compare models using an intuitive metric.

When fitting multiple models to data you usually want to compare their results to 1) make sure you're not overfitting, and 2) see which model is doing better. [One way](http://en.wikipedia.org/wiki/Cross-validation_(statistics)) of doing this is to divide your data into two sets, one for training (fitting) and the other for testing. After fitting your models to the training set, you see how well each model does at predicting the data in the testing set.

To compare your results you give each model's predictions a score. A score should:

1. assess the performance of the model on new/untrained/test data
2. be easily interpretable

Log-likelihood is a fairly standard score, but it's not very interpretable. (-52345 is a better score than -36545?). [R-squared](http://en.wikipedia.org/wiki/Coefficient_of_determination), on the other hand, is great: higher scores are better scores, and scores have a maximum (1.0).

### 2. Never invert a matrix directly.

#### Use least squares

In python, for example, this means never calling `np.linalg.inv()` on a matrix unless you have to. Instead, use [least squares](http://docs.scipy.org/doc/numpy/reference/generated/numpy.linalg.lstsq.html#numpy.linalg.lstsq) (`np.linalg.solve()` or `np.linalg.lstsq()`).

Examples:

* $$ A^{-1} b \rightarrow $$ `np.linalg.lstsq(A, b)[0]`
* $$ b A^{-1} \rightarrow $$ `np.linalg.lstsq(A.T, b.T)[0].T`

#### Use the Woodbury identity

The [Woodbury identity](http://en.wikipedia.org/wiki/Woodbury_matrix_identity), aka the matrix inversion lemma, lets you avoid inverting your prior covariance matrix ($$C$$ below) during regularization.

Instead of calculating $$ (\frac{ X^T X}{\sigma^2} + C^{-1})^{-1} $$, do this:

$$ C - C(X^T E^{-1} X)C $$

where $$ E = \sigma^2 I + X C X^T $$.

#### Use SVD

It may be that your prior covariance matrix is so big that even Woodbury can't help you. In that case, you can use a similar approach to [principal components regression](http://en.wikipedia.org/wiki/Principal_component_regression) (aka PC regression, or PCR) and use instead a rank-k approximation of your prior covariance matrix. (I'll update this part once I figure it out.)
