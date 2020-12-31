---
layout: post
title: "Musical tuning"
description: ""
categories: articles
tags: music
---

In music, when you play two notes together, why do some pairs of notes sound good while others sound dissonant? In theory, two notes sound good when played together if their frequencies are in simple integer relationships. In practice, when you try to extend this idea beyond pairs of notes, this theory falls flat entirely. Below I’ll explain why this happens, and how the present-day approach to musical tuning involves most of our notes being slightly out of tune.

The beginning of the story involves thinking about how we should tune our instruments--say, a piano. Assuming we are playing Western music, we need to know which frequencies the twelve notes of the chromatic scale (known as A, A#, B, C, C#, D, D#, E, F, F#, G, and G#) should be.

Given that we will want to play multiple notes at the same time, one way of answering this question is to understand which frequencies will sound good when played simultaneously. It turns out that the way two notes sound when played together depends on the ratio of their respective frequencies. There are two important ratios, or intervals, that almost everyone agrees are the simplest: the octave, and the perfect fifth. First, the ratio of two notes an octave apart is either 2/1 or 1/2. For example, if we were to play a middle A, tuned at 440 Hz, then doubling that frequency (i.e., 440 Hz * (2/1) = 880 Hz) would also be an octave above, while halving the frequency (i.e., 440 Hz * (1/2) = 220 Hz) would be an octave below. Meanwhile, the ratio of two notes a perfect fifth apart is 3/2 or 2/3 (i.e., 660 Hz or 293.3 Hz). These two intervals are so easy for trained musicians and listeners to recognize that it seems natural to try to tune our instruments to obey these simple ratios.

And we’re in luck, because it turns out that only knowing the ratios of the octave and the perfect fifth can generate all the frequencies we need to tune our instrument. This is because if you start with a given note--say, A--and repeatedly find the note a perfect fifth above it, you would generate a sequence of notes that gradually walks through all 12 notes in the chromatic scale and eventually returns back to the note you started at. For example, the perfect fifth of A is E, the perfect fifth of E is B, …, and you do this all the way until you get to D, at which point the perfect fifth of D is A and so you’re back where you started. Once we know the frequency of our first note--in this case, middle A is 440 Hz--we can find the frequency of all other notes by multiplying by the appropriate ratio, 3/2. So E, for example, would be 440 Hz * (3/2) = 660 Hz. And to get the frequencies for E in any other octave we can simply multiply repeatedly by (2/1) or by (1/2). We can then simply repeat this process for every other note in the scale! For example, the perfect fifth of E is B, so B = 440 Hz * (3/2) * (3/2)...and so on.

This idea, of using the simple ratios of the octave and the fifth to generate the frequencies of all other notes, is called Pythagorean tuning. But this is not the only way we could generate the frequencies of every note! We could also include another ratio, 5/4, which is the ratio of a major third. Using the ratios of the octave (2/1), major third (5/4), and perfect fifth (3/2) together would let us generate a slightly different collection of notes, giving us what’s called five-limit tuning. Both Pythagorean tuning and five-limit tuning are both types of "just intonation," which is where we use different ratios to determine how to tune every note. And this was in fact the preferred way of tuning instruments for most of Western music history.

Unfortunately, there’s a major problem with this approach: It’s not consistent. In other words, we could arrive at slightly different tunings for the same exact note (called a comma), depending on which sequences of ratios we use to generate it. For example, C → G → D → A → E is a sequence of fifths leading us from C to E, giving us the ratio of (3/2)*(3/2)*(3/2)*(3/2) between C and E. But E is also a major third above C, meaning it should have the ratio of (5/4). These ratios both correspond to “E” (albeit one in different octaves), but specify completely different frequencies. This means the process of just intonation is not a consistent way of generating tunings for each note.

The interesting thing is, because ratios of octaves and perfect fifths sound so natural to us, instruments without any fixed tuning, such as the human voice or violins*, will naturally adjust their pitch dynamically within a song to maintain the appropriate ratios of 2/1 and 3/2. (As long as they aren’t playing along with an instrument with fixed tuning, such as a piano.) [* a violin’s strings are tuned, of course, but because there are no frets, the musician must choose precisely the tuning of any fretted notes by ear as he/she is playing] In this sense, the human voice and violins don’t have a tuning at all, as the exact pitch of the notes performed is constantly in flux. In fact, the above problem with commas is not just a theoretical issue with just intonation, but actually an issue for the human performer: When a singer sings a sequence of perfect fifths, they will naturally match the pitch of each note to be approximately 3/2-times that of the previous note. Suppose they begin by singing a C note at 260 Hz. Then following the sequence of fifths listed above (C → G → D → A → E), they will end up at 260*(3/2)4 = 1316 Hz. Then say they go down two successive octaves to a lower and lower E, taking them from 1316 to 1316*(1/2)2 = 329 Hz. Now suppose that instead they had gone directly from (C → E), simply going up a major third. Then that E would have been tuned at 260*(5/4) = 325 Hz--a different tuning for the same E note! Thus in the first case, they ended up singing an E that was slightly too sharp, even though they were singing perfect fifths and octaves every time! For this reason, performances by unaccompanied vocalists or violinists will naturally drift throughout the piece, such that by the end of the song we might find ourselves in a completely different key.

These two examples illustrate that using a tuning system made up of simple ratios either gives you i) inconsistent tunings for the same note, or ii) pitch drift throughout a song.

So what’s the alternative? As I mentioned at the outset, the answer is to be simply out of tune. In so-called equal temperament, we start with the octave and its ratio of 2/1, and simply divide up every note equally in between octaves. For example, in Western music we have twelve notes (named A, A#, B, C, C#, D, D#, E, F, F#, G, G#), so we divide up the notes between octaves into twelve pieces. In this case, rather than choosing a ratio corresponding to other intervals such as major thirds or fifths, we choose a ratio describing the relationship between every pair of adjacent notes. In other words, the ratio between A# and A should be the same as the ratio between B and A#, and C and B, C# and C, etc. Call this ratio p. Because we know that the A an octave above the A an octave below it must have the ratio 2/1, and that we can go from A to A# by multiplying by the ratio p, and from A# to B by multiplying p, and so on 12 different times all the way up to 2, this means that p^(12) = 2, and so p = 2^(1/12). Thus, our equal temperament scale with twelve equally spaced notes (known as 12-tone equal temperament, or “12-TET”) uses the ratio 2^(1/12) between adjacent notes to define all the frequencies. And that’s it!

Importantly, the ratio between perfect fifths will no longer be exactly 3/2 = 1.5. Instead, because a perfect fifth is seven half-steps above the root, the ratio will be 2^(7/12) ≈ 1.4983, which is very close to 3/2 but about 2 cents flat. Similarly, the ratio between major thirds will now be 2^(4/12) ≈ 1.2599, which is very close to 5/4 = 1.25 but about 14 cents sharp--so sharp.

Thus, with equal temperament, we no longer have the issue of consistency or of pitch drift (because every note is uniquely defined using powers of the ratio 2^(1/12)), but at the expense of our new intervals being slightly out of tune! Because we all grow up hearing music tuned to 12-TET, these intervals sound natural enough to us. (Though non-Western listeners are said to perceive the Western major third as being notably out of tune.) Singers and violinists performing with a piano (or any other instrument tuned to 12-TET) will keep themselves in tune with the instrument rather than to just intonation. Voices auto-tuned using DAWs will be tuned to 12-TET.