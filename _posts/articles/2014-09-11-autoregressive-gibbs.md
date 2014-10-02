---
layout: post
title: "Gibbs sampling to estimate AR(1) model parameters"
description: "Gibbs sampling to estimate AR(1) model parameters"
categories: articles
tags: [math, neuro]
latex: true
---

__Source__: [SSC 389: AR(1) + noise](http://faculty.mccombs.utexas.edu/carlos.carvalho/teaching/Section4SSC389.pdf)

## Definitions

* \\(X_t\\) is hidden state at time t
* \\(Y_t\\) is observed state at time t
* \\(D_t\\) is information known at time t, i.e. \\( \\{ Y_1, \cdots, Y_t \\} \\)
* \\(T\\) is length of \\(X, Y, D\\)

## Model

__Hidden__:
    \\[ X_t = \alpha + \beta X_{t-1} + \epsilon \\]

* n.b. X is stationary

__Observed__:
    \\[ Y_t = X_t + v \\]

\\[ v \propto N(0, \sigma^2), \epsilon \propto N(0, \omega^2) \\]

* \\( v, \epsilon \\) independent

## The Goal

__Goal__: Describe a gibbs sampler for viewing the posterior of all unknowns given only the observed Y:
\\[ P( X, \alpha, \beta, \omega^2, \sigma^2 \mid D_T) \\]

1. Draw
\\( (\alpha, \beta, \omega^2, \sigma^2) \\) from
\\( P( \alpha, \beta, \omega^2, \sigma^2 \mid X, D_T) \\)

2. Draw X from
\\( P(X \mid \alpha, \beta, \omega^2, \sigma^2, D_T) \\)

### Step 1: AR(1) without noise ("Should be easy, right?")

We want to sample from the posterior of the AR(1) without noise case, i.e. the posterior in bayesian linear regression of Y on X:

\\[ Y = X \theta + \epsilon \\]

where \\( X = X\_{0:t-1} \\), \\( Y = Y\_{1:t} \\), \\( \theta = \\{ \alpha, \beta \\} \\), and \\( \epsilon \propto N(0, \omega^2 + \sigma^2) \\).

After setting conjugate priors on your hyperparamers \\( ( \theta, \omega^2 + \sigma^2 ) \\), you will need to find the full conditional distributions and then gibbs sample to draw from the posterior:

a.

\\[ P( \theta \mid \omega^2 + \sigma^2, X, Y) \\]

b.

\\[ P( \omega^2 + \sigma^2 \mid \theta, X, Y ) \\]

### Step 2: FFBS

Let \\( A:= \\{ \alpha, \beta, \omega^2, \sigma^2 \\} \\)

\\( P( X \mid A, D_T) \\)
is the product of
\\( P( X_T \mid A, D_T) \\)
and
\\( P( X_t \mid X_{t+1:T}, A, D_T) \\)
for all t<T

a.

\\[ P( X_T \mid A, D_T) \propto N(m_t, C_t) \\]

b.

\\[ P( X_t \mid X_{t+1:T}, A, D_T ) \\]

\\[ P( X_t \mid X_{t+1}, A, D_T ) = N(h_t, B_t) \\]

So to draw from this distribution, first we draw \\( X_T \\) from \\( P( X_T \mid A, D_T ) \\) , then for each i<T we should be able to sample \\( X_{T-i} \\) from

\\( P( X\_{T-i} \mid X\_{T-i+1}, A, D\_{T-i} ) \\)

giving us a draw from the joint distribution of \\( P( X \mid A, D_T ) \\) .

#### Step 2a: Forward probabilities

First we want to find the posterior at the last time point T:

\\[ P( X_T \mid D_T) \propto N( m_t, C_t) \\]

What is \\( (m_t, C_t) \\)?

__Posterior at t-1__:

\\[ X\_{t-1} \mid D\_{t-1} \propto N( m\_{t-1}, C\_{t-1} ) \\]

* \\( m_0, C_0 \\) are known (?).

__Prior at t-1__:

\\[ X_t \mid D_{t-1} \propto N(a_t, R_t) \\]

* \\( a_t := \alpha + \beta m_{t−1} \\)
* \\( R_t := \beta^2 C_t + \omega^2 \\)

__Predictive at t-1__:

\\[ Y_t \mid D_{t-1} \propto N(f_t, Q_t) \\]

* \\( f_t := a_t \\)
* \\( Q_t := R_t + \sigma^2 \\)

__Posterior at t__:

\\[ X_t \mid D_t \propto N(m_t, C_t) \\]

* \\( m_t := a_t + A_t e_t \\)
* \\( C_t := R_t − R_t A_t \\)
* \\( A_t := R_t/Q_t \\)
* \\( e_t := y_t − f_t \\)

Thus to calculate \\( (m_t, C_t) \\) we need to calculate the forward probabilities by beginning at t=0 and going up until we get to t=T. Then we draw \\( X_T \\) from \\( N(m_t, C_t) \\).

#### Step 2b: Backward probabilities

At this point we already know \\( X_T \\), so we now want to draw from \\( P( X\_{T-1} \mid X_T, A, D\_{T-1} ) = N( h\_{t-1}, B\_{t-1} ) \\), where:

* \\( h\_{t-i} := m\_{t-i} + \beta C\_{t-i} / Y\_{t-i+1} ( X\_{t-i+1} − a\_{t-i} ) \\)

* \\( B\_{t-i} := C\_{t-i} − \beta^2 C\_{t-i}^2 / Y\_{t-i+1} \\)

We just calculated all these things in the previous step. So we simply need to start at i=T-1 and go until i=1.
