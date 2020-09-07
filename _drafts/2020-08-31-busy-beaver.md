---
layout: post
title: "Busy Beavers"
description: ""
categories: articles
tags: math
latex: true
---

Let's say I list out the following series of numbers, and you guess what comes next:

$$ 1, 6, 21, 107, ... $$

Surprisingly, the next item is larger than 47 million, and the number after that is greater than the number of atoms in the known universe. The seventh number in the sequence is at least as big as $$10^{10^{10^{10^{18,705,353}}}}$$, while the later numbers get _hopelessly_ larger. (It's been shown that the [8000th number](https://www.scottaaronson.com/blog/?p=2725) in the sequence can never be found using mathematics as we know it.)

This sequence, called the _Busy Beaver_ function, is a solid strategy for winning a "who can name the biggest number" competition.[^1] The funny thing is, __while we know how to define the numbers in this sequence, we don't actually know how to compute them.__ All we know is that they are really, really big. Even the fifth number in the sequence, which we _think_ is 47,176,870, isn't yet certain. How is this possible? To explain, first we have to talk about...

## Turing Machines

A Turing Machine is a sort of prototypical computer, invented by Alan Turing in 1936.[^2] Conceptually, a Turing Machine can "compute" anything we can write out an algorithm for: addition and multiplication, for example, but really anything we consider a "computer" to do, such as running the Windows 95 operating system, or anything your smart phone does.

Imagine you have an infinitely long strip of paper (or "tape") divided into squares, and in each square is written either a zero or a one. The Turing Machine has a program that tells it how to interact with this tape. It reads one square at a time, and based on its program it decides whether to replace the number in the square with a different one (e.g., replace a zero with a one, or vice-versa), and whether to move next to the left or right square. For example, a simple Turing Machine might have a single rule:

- if you currently see a 0, replace it with a 1, then move to the right
- if you currently see a 1, keep it, then move to the left

We might call such a rule ONE_OBSESSED, as the machine will always write a 1 in whatever square it visits.

### A 2-state Turing machine

A Turing Machine can actually have multiple rules, called "states". For example, we might have a 2-state Turing Machine with a ONE_OBSESSED state and another completely different one. We can also give our Turing Machine an extra state (called HALT) where it can stop running. Finally, we need to specify how to transition between these states. Pseudo-code for our final 2-state Turing machine (we don't count the HALT state) might look like this:

- if in the ONE_OBSESSED state:
	- if you currently see a 0, replace it with a 1; then move to the right and become OPTIMISTIC
	- if you currently see a 1, replace it with a 0; then move to the left and become OPTIMISTIC
- otherwise, if in the OPTIMISTIC state:
	- if you currently see a 0, replace it with a 1; then move to the left and become ONE_OBSESSED
	- if you currently see a 1, keep it; then move to the right and HALT
- if in the HALT state:
	- quit

We'll imagine for the sake of personification that the above machine is committed to changing every zero it encounters into a one. Most of the time, it fulfills its duty and changes every zero to a one. But whenever it is OPTIMISTIC and encounters a one, it imagines (incorrectly) that it is finished with its work, and so it halts.

### Counting our steps

How many steps would our machine take if we ran it on a tape filled with zeros? Let's pretend we're the machine and count out our steps. We'll suppose our state is initially ONE_OBSESSED, and that we are placed on "Square 1".

1. Square 1: First, we replace the 0 with a 1, move to the right to Square 2, and become OPTIMISTIC.
2. Square 2: We see a 0, which we replace with a 1, and then move back to the left to Square 1 and become ONE_OBSESSED again.
3. Square 1: Now we see a 1 again, so we keep it and move to the left, and become OPTIMISTIC.
4. Square 0: We change the 0 to a 1, move to the right and become ONE_OBSESSED.
5. Square 1: We see a 1 yet again, so we keep it and move to the left, and become OPTIMISTIC.
6. Square 0: We see a 1. Optimistically, we decide that our work here is done. We now HALT.

## Busy Beavers

Not every Turing Machine will always halt. For example, some machines' programs get them stuck in a loop, dooming them to repeat the same sequence of moves over and over again. Others simply never bother transitioning to a HALT state. In that sense, our program is a little special, because it does halt. But how special, exactly? Let's say we considered every possible 2-state Turing Machine that _does_ halt when run on a tape filled with zeros. One might wonder: _Which machine takes the most steps before halting?_

Now we can finally explain (well, somewhat) the sequence of numbers at the beginning of the post: __The Busy Beaver function, $$BB(n)$$, tells us the maximum number of steps a Turing Machine with $$n$$ states can take before halting.__

The Turing Machine we described above is in fact a 2-state busy beaver. In other words, there is no 2-state Turing Machine that runs longer than $$BB(2) = 6$$ steps.

### Why finding busy beavers is so difficult

How do we know that $$BB(2) = 6$$? To verify this, we would have to program up every possible 2-state Turing machine and run each one on an imaginary row of squares all filled with zeros. We could then check that none of the machines that _did_ halt ran longer than 6 steps, confirming that $$BB(2) = 6$$. To find $$BB(3)$$ we might consider using a similar process. But by the time we get to $$BB(5)$$, two big problems arise:

1. Even with only two states, there are already 100,000,000 possible Turing machines to consider. In general, there are $$(4n + 4)^{2n}$$ n-state Turing machines. That's a _lot_ of machines to run.

2. Remember that $$BB(n)$$ is the most steps a Turing machine with $$n$$ states can take _before_ halting. But as Turing himself showed [^3], there is no way to decide in general whether a machine will eventually halt or if it will run forever!

This second problem is really the key one. Let's say we've run one of our 2-state machines for 5,000 steps and it still hasn't halted. Can we assume that it never will? Luckily, we already know that $$BB(2) < 5000$$, which means this machine _must_ run forever. But if we _don't_ know $$BB(n)$$, then we don't know how long we have to run a machine until we can be confident that it will never stop.[^4] Another way of putting it is that to compute $$BB(n)$$, you'll have to run all of your machines at least $$BB(n)$$ steps to know whether your machines will halt or not. It's like the joke where you're on a bus, and you ask the passenger next to you if he knows which stop to get off at for the grocery store. "Sure," he tells you. "Just get off one stop before I do."

So now hopefully it's a little clearer why we don't even know $$BB(5)$$ yet. We _think_ it's 47,176,870. But there are genuinely still some 5-state Turing machines out there being simulated on someone's computer that have yet to halt. And we don't yet know how to prove that they never will.

<!-- ## Universal Turing Machines

A Turing machine is just a set of instructions to carry out given whatever state you're in, and what square you're reading. Specifically: what letter to write in the square, which direction to move in next, and which internal state to move to next. The Turing machine is placed in a starting position on a piece of tape, and each square in the tape has either a 0 or a 1 in it. The "input" is whatever you write on the tape at the start. The output is whatever the numbers are after the machine stops moving. Let $$M_1(x)$$ be the output of a particular machine, M1, when being given $$x$$.

Every Turing machine can be described by some number. So what happens if you run another Turing machine, $$M_2$$, on an input that describes how to run $$M_1$$ on the input $$x$$? (Meaning something like $$M_2(y)$$, where $$y = [M_1~ x]$$.) It turns out there are in fact Turing machines that can tell you what _any_ Turing machine would return when given _any_ input. These are called "universal Turing machines."

There's a universal Turing machine with only 6 states and 4 letters. The crazy this is that this Turing machine could tell you the output of _any_ other Turing machine--even one with 1,390,233 states--applied to any input. In general the set of universal Turing machines forms a sort of frontier when plotted in letter-vs-state space.

These tiny universal Turing machines give us a hint that the set of things we can "compute" is in fact quite limited. (Turing machines were in fact the first theoretical definition of what a computer even _is_.) -->

<hr>
__Notes__

[^1]: ["Who Can Name the Bigger Number?"](https://www.scottaaronson.com/writings/bignumbers.html) by Scott Aaronson.

[^2]: ["On Computable Numbers, with an Application to the Entscheidungsproblem."](https://sci-hub.tw/10.1112/plms/s2-42.1.230) by Alan Turing (1936)

[^3]: In the paper where he introduces the Turing Machine, Turing shows that the "halting problem" (which is to determine whether an arbitrary Turing Machine will ever halt when given a particular input sequence), is impossible to solve with a general-purpose algorithm.

[^4]: The halting problem says that there is no algorithm that can tell us whether _any_ program (e.g., a Turing machine) will halt when given a particular input. You [_can_](https://wpmedia.wolfram.com/uploads/sites/13/2019/03/19-1-2.pdf) tell whether an arbitrary 2- or 3-state Turing machine will halt. But for the other ones, we're on our own; people have to use a mix of procedures and heuristics to decide if a program is stuck in a loop.

[^5]: ["The Busy Beaver Frontier"](https://www.scottaaronson.com/papers/bb.pdf) by Scott Aaronson

[^6]: https://catonmat.net/busy-beaver
