---
layout: post
title: "Why musical tuning must be either inconsistent or out of tune"
description: ""
categories: articles
tags: music math
latex: true
---

In music, why do some pairs of notes sound good when played together, while others sound dissonant? One common explanation is that two notes sound good when played together if their frequencies are in simple integer relationships. For example, a perfect fifth occurs when two frequencies with a ratio of 3:2 are played together, while an octave is the ratio of 2:1.

Surprisingly, when you try to extend this theory of "simple integer relationships = sounds good" beyond pairs of notes, it falls flat entirely. Below I'll explain why this happens, and how the present-day approach to musical tuning involves most of our notes being slightly out of tune.

### How to tune your piano like a Pythagorean

Let's say we'd like to tune our piano. This means choosing what the frequencies the twelve notes of the chromatic scale (known as A, A#, B, C, C#, D, D#, E, F, F#, G, and G#) should be. As musicians dating back to the ancient Greeks have noted, considering the ratio of pairs of frequencies is a good starting point. For example, the two ratios I mentioned earlier are the ones almost everyone agrees on: the octave, and the perfect fifth. As I mentioned, the ratio of two notes an octave apart is either 2:1 or 1:2. So if we were to play a middle A, tuned at 440 Hz, then doubling that frequency (i.e., 440 Hz * (2/1) = 880 Hz) would be an octave above, while halving the frequency (i.e., 440 Hz * (1/2) = 220 Hz) would be an octave below. Meanwhile, the ratio of two notes a perfect fifth apart is 3:2 or 2:3 (i.e., 660 Hz or 293.3 Hz). These two intervals are so easy for trained musicians and listeners to recognize that it seems natural to try to tune our instruments to obey these simple ratios.

And we're in luck, because it turns out that only knowing the ratios of the octave and the perfect fifth can generate all the frequencies we need to tune our piano. This is because if you start with a given note---say, A---and repeatedly find the note a perfect fifth above it, you will generate a sequence of notes that gradually generates all 12 notes in the chromatic scale and then returns back to the note you started at. For example, the perfect fifth of A is E, the perfect fifth of E is B, …, and so on until we loop back to A. So once we choose the frequency of our first note---in this case, middle A is usually 440 Hz---we can find the frequency of all our other notes by multiplying by the appropriate ratio, 3:2. For example, E (a perfect fifth above A) would be 440 Hz * (3/2) = 660 Hz. Next, to get the frequencies for E in any other octave we can simply multiply repeatedly by 2 or by 1/2. We then simply repeat this process for every other note in the scale. For example, the perfect fifth of E is B, so B = 440 Hz * (3/2) * (3/2)...and so on.

This idea, of using only the ratios of the octave and the fifth to generate the frequencies of all other notes, is called _Pythagorean tuning_.

### Why just intonation is inconsistent

Importantly, Pythaogrean tuning is not the only way we could generate the frequencies of every note. Instead, let's include another ratio, 5:4, which is the ratio of a major third. Using the ratios of the octave (2:1), major third (5:4), and perfect fifth (3:2) together would actually lead us to generate a slightly _different_ collection of notes, giving us what's called _five-limit tuning_. Both Pythagorean tuning and five-limit tuning are both types of "just intonation," which is where we use different ratios to determine how to tune every note. Just intonation was the preferred way of tuning instruments for most of Western music history.

Unfortunately, there's a major problem with this approach: It's not consistent. In other words, we can arrive at slightly different tunings for the same exact note (called a _comma_), depending on which sequences of ratios we use to generate it. For example, A → E → B → Gb → Db is a sequence of fifths leading us from A to Db, giving us the ratio of $$ \frac{3}{2} \frac{3}{2} \frac{3}{2} \frac{3}{2} = \left(\frac{3}{2}\right)^4 $$ between A and Db. This means the ratio between Db and middle A is $$ \left(\frac{3}{2}\right)^4 \left(\frac{1}{2}\right)^2 = 1.265625 $$. But Db is a major third above A, meaning the ratio between A and Db should be (5:4) = 1.25. So we now have two different definitions for the tuning of Db under just intonation: one using perfect fifths and octaves, the other using a major third. This means just intonation is not a consistent way of generating tunings for each note.

### Why perfect singers drift in pitch over time

The interesting thing is, because ratios of octaves and perfect fifths sound so natural to us, musicians playing instruments without any fixed tuning (such as the human voice or violins [^1]) will naturally adjust their pitch dynamically within a song to maintain the appropriate ratios of 2:1 and 3:2---almost as if they are trying to sing in just intonation. Because just intonation has "commas" (see above), the exact pitches performed by unaccompanied singers and violinists will be constantly in flux. For this reason, performances by unaccompanied vocalists or violinists will naturally drift throughout a piece, such that by the end of the song they might find themselves playing in a completely different key. In other words, commas are not just a theoretical issue with just intonation, but can actually occur in live music performances.

These examples illustrate how using a tuning system made up of simple ratios (like just intonation) gives you both i) inconsistent tunings for the same note, and ii) pitch drift throughout a song.

### Why modern tuning is intentionally out of tune

So what's the alternative? As I mentioned at the outset, the answer is simply to be slightly out of tune. In so-called _equal temperament_ tuning, our goal is to make sure that each successive pair of notes has the same ratio $$ p $$, while also ensuring that octaves are still a ratio of 2:1. For example, in Western music we have twelve notes (named A, A#, B, C, C#, D, D#, E, F, F#, G, G#). So we want the ratio of A# to A to be $$ p $$, the ratio of B to A# to also be $$ p $$, and so on. But we also want the ratio of a high A and low A to be 2:1. Because it takes twelve steps to get from A to A# to B and so on up to the A an octave above, this means we need $$ p^{12} = 2 $$. In other words, $$ p = 2^{1/12} $$. Thus, our equal temperament scale with twelve equally spaced notes (known as 12-tone equal temperament, or "12-TET") uses the ratio $$ 2^{1/12} $$ to tune every pair of adjacent notes. This is the rule used to tune probably every piano you've ever played.

Importantly, under equal temperament, the ratio between perfect fifths will no longer be exactly 3:2 = 1.5. Instead, because a perfect fifth is seven notes above the root, the ratio will be $$2^{7/12}$$ ≈ 1.4983, which is very close to 3:2 but about 2 cents flat. Similarly, the ratio between major thirds will now be $$2^{4/12}$$ ≈ 1.2599, which is very close to 5:4 = 1.25 but about 14 cents sharp [^2], and noticeable to even the untrained ear when played side-by-side.

With equal temperament, we no longer have the issue of inconsistency or of pitch drift, because every note is uniquely defined using powers of the ratio $$2^{1/12}$$. But the cost we must pay is that our new intervals are now slightly out of tune with respect to our ears, which prefer simple integer ratios. Because we all grow up hearing music tuned to 12-TET, these intervals sound natural enough to us now. Singers and violinists performing with a piano (or any other instrument tuned to 12-TET) will keep themselves in tune with the instrument rather than to just intonation. Voices auto-tuned using DAWs will be tuned to 12-TET. In the end, we just get used to it.

<hr>
__Notes__

[^1]: A violin's strings are tuned, of course, but because there are no frets, the musician must choose precisely the tuning of any fretted notes by ear as he/she is playing

[^2]: So sharp, in fact, that non-Western listeners are said to perceive the Western major third as being notably out of tune.
