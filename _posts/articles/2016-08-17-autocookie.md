---
layout: post
title: "Creating new cookie recipes with Autocookie"
description: ""
category: articles
tags: [projects]
---

[This post is about [Autocookie](http://www.jehosafet.com/autocookie), a web app for generating new cookie recipes.]

<p style="text-indent: 2.5em;">
Recipes, it turns out, are hard to get ahold of in a machine-readable format. There are tons of recipes on the Internet, of course, but their formatting is totally inconsistent. For example, one recipe might call for "1 cup (2 sticks) butter, softened", while another might simply say "1c butter." A <a href="http://microformats.org/wiki/recipe-formats">few</a> <a href="https://developers.google.com/search/docs/data-types/recipes">efforts</a> have been made at establishing a consistent formatting for sharing recipes online; however, even these schemas fail to make any distinction between an ingredient's name and quantity. The <i>one</i> exception to this rule is The New York Times's <a href="http://cooking.nytimes.com/">Cooking</a> database. They even wrote (and shared!) an <a href="https://github.com/NYTimes/ingredient-phrase-tagger">ingredient phrase tagger</a> that tries to label the parts-of-speech (e.g., "QUANTITY=1, cup=UNIT, butter=NAME") of every ingredient line in every one of their recipes. It's a web scraper's dream.
</p><p>
Still, it's no wonder why computers can defeat the world's greatest chess and Go masters but they couldn't outbake a four year-old: Games of chess and Go are recorded in a consistent notation; recipes are not. That means anyone looking to train a computer to make a recipe from scratch has to first teach a computer that "1c butter" and "2 sticks butter" mean the same thing. That may sound simple enough&mdash;but for most people, it's not worth the effort.
</p><p>
So it should come as no surprise that there aren't many ways of automatically creating entirely new recipes. Most so-called <a href="http://www.nytimes.com/interactive/2013/08/02/magazine/bittman-farmers-market-recipe-generator.html">"recipe generators"</a> are more like librarians than chefs, pointing you to pre-existing recipes given a desired ingredient list. <a href="https://www.ibmchefwatson.com">Chef Watson</a> from IBM suggests novel ingredient pairings but not quantities. <a href="http://www.jehosafet.com/autocookie">Autocookie</a>, then, is a step in a very different direction: It can't generate just any kind of recipe, and it won't generate new pairings or even cooking instructions. Instead, it focuses on a particular type of recipe where pairings and instructions aren't as important as ingredient quantities. Autocookie, in the end, is concerned with something much simpler, but just as critical: What makes a recipe a <i>valid</i> recipe?
</p><p>
Given better data, though, Autocookie could get a lot more interesting. One obvious next step would be to try to find a relationship between ingredient ratios and user ratings. How much salt should you add, for example, to get users to call a recipe "moreish" but not "too salty"? Or, even better, after applying some sort of dimensionality reduction we might find a "moreish" ingredient hyperplane. The next step, in other words, is predicting not just which ingredient ratios will work, but which ones will be loved.
</p>

