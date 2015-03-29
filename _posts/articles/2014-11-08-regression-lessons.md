---
layout: post
title: "Regression tips"
description: ""
categories: articles
tags: [math, neuro]
latex: true
---

### 1. Write unit tests.

If you're writing your own regresson code, writing and regularly running [unit tests](http://en.wikipedia.org/wiki/Unit_testing) will prevent much pain in the future. Simply getting _an_ answer for your regression means nothing--you want the correct answer. Unit tests will give yourself and others evidence to believe your resulting fits, and writing them takes no time at all.

### 2. Compare models using an intuitive metric.

When fitting multiple models to data you usually want to compare their results to 1) make sure you're not overfitting, and 2) see which model is doing better. [One way](http://en.wikipedia.org/wiki/Cross-validation_(statistics)) of doing this is to divide your data into two sets, one for training (fitting) and the other for testing. After fitting your models to the training set, you see how well each model does at predicting the data in the testing set.

To compare your results you give each model's predictions a score. A score should:

1. assess the performance of the model on new/untrained/test data
2. be easily interpretable

Log-likelihood is a fairly standard score, but it's not very interpretable. (-52345 is a better score than -36545?). [R-squared](http://en.wikipedia.org/wiki/Coefficient_of_determination), on the other hand, is great: higher scores are better scores, and scores have a maximum (1.0).

### 3. Never invert a matrix directly.

#### Use least squares

In python, for example, this means never calling `np.linalg.inv()` on a matrix unless you have to. Instead, use [least squares](http://docs.scipy.org/doc/numpy/reference/generated/numpy.linalg.lstsq.html#numpy.linalg.lstsq) (`np.linalg.solve()` or `np.linalg.lstsq()`).

Examples:

* $$ A^{-1} b \rightarrow $$ `np.linalg.lstsq(A, b)[0]`
* $$ b A^{-1} \rightarrow $$ `np.linalg.lstsq(A.T, b.T)[0].T`

#### Use the Woodbury identity

The [Woodbury identity](http://en.wikipedia.org/wiki/Woodbury_matrix_identity), aka the matrix inversion lemma, lets you avoid inverting certain matrices ($$C$$ below) in certain cases.

Instead of calculating $$ (\frac{ X^T X}{\sigma^2} + C^{-1})^{-1} $$, do this:

$$ C - C(X^T E^{-1} X)C $$

where $$ E = \sigma^2 I + X C X^T $$.

Note, however, that inverting $$E$$ is not always any easier than inverting $$C$$. For the Woodbury identity to help, you'll probably want $$X$$ to have fewer rows than it has columns.

#### Use SVD

Sometimes the above tricks won't apply, but you still need to invert $$C$$. Then guess what else sucks? Sometimes $$C$$ will be singular, meaning it is un-invertible. In this case, you can use a similar approach to [principal components regression](http://en.wikipedia.org/wiki/Principal_component_regression) (aka PC regression, or PCR) to find a rank-k approximation of $$C$$.

Let $$ C = U S U^T $$. (You can get $$U, S$$ from calling `svd(C)` in python or MATLAB.) $$S$$ contains your eigenvalues, and to get your rank-k approximation of $$ C $$ you will take the first $$k$$ largest eigenvalues in $$S$$ and ignore all of the others. Now, let $$U = U_k$$ be the matrix where you take the $$k$$ columns of $$U$$ corresponding to those $$k$$ largest eigenvalues. ($$U$$ will be $$n \times n$$, so $$ k < n $$.)

Your rank-k approximation of $$C$$ is now $$C_k = U_k^T C U_k$$, which will be a $$k \times k$$ matrix. Hooray! Now if you have any other matrices or vectors with dimension $$n$$ you should also multiply them by $$U_k$$, or $$U_k^T$$--treat these like puzzle pieces and just play with the shapes until you turn the $$n$$ into $$k$$.

Now continue to solve your problem with these new $$k$$ shaped things. Whenever you're done, convert the things with dimension $$k$$ back into dimension $$n$$ using the reverse of whatever you did before. For example, $$C = U_k C_k U_k^T$$. (This works because $$U$$ is a unitary matrix.)
