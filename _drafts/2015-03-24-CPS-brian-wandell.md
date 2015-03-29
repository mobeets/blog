---
layout: post
title: "Brian Wandell at UT Austin CPS Colloquium"
description: ""
categories: talk
tags: [neuro, talk]
---

Talk titled "Neuroimaging tools for reproducible research" was less philosophical than I'd anticipated, but it was still exciting to think about.

## Things said of interest

* The idea of "computational reproducibility", as opposed to complete scientific reproducibility.
* This quote: "An article about computational science in a scientific publication is not the scholarship itself, it is merely advertising of the scholarship. The actual scholarship is the complete software development environment and the complete set of instructions which generated the figures." (from [wavelab.com](http://statweb.stanford.edu/~wavelab/))

## Things I thought while watching

* Idea of blog post (or even blog) called "Arguments against arguments against open science", featuring discussion of common reasons for _not_ sharing all data and code.

### Popular concerns against posting code online

* Competition
    - You do all the work, someone zooms in and just uses your data
* Data lacking important experiential/contextual/intangible knowledge
    - e.g., Byron Yu on neural data from monkey work
    - Data without context is just asking to be potentially misinterpreted, e.g., people just fitting models to data blindly and making poor assumptions given the context of how that data was gathered.
    - Perhaps this is a fear that this would bring on a flood of "bad science", and that there would be no way to separate wheat from chaff

### Types of computational reproducibility

* Data shared
    - raw data actually collected
    - preprocessed data
    - fitted data
    - data actually used in figures, e.g., just enough to reproduce the figures
* Models
    - parameters used
    - method for choosing those parameters
    - supplemental models not shown in paper, but used to sanity-check certain things
* Figures
    - data used to make the figures
    - automated process to regenerate the same exact figures
