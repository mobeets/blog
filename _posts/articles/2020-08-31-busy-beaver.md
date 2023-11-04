---
layout: post
title: "Busy Beavers"
description: ""
categories: articles
tags: math computation
p5js: true
latex: true
image:
    thumb: "busy-beaver.png"
---

Let's say I list out the following series of numbers. Can you guess what comes next?

$$ 1, 6, 21, 107, ... $$

Surprisingly, the next item is larger than 47 million, and the number after that is greater than the number of atoms in the known universe. The seventh number in the sequence is at least as big as $$10^{10^{10^{10^{18,705,353}}}}$$, while the later numbers get hopelessly larger. In fact, it's been shown that the [8000th number](https://www.scottaaronson.com/blog/?p=2725) in the sequence can never be found using mathematics as we know it.

This sequence is known as the _Busy Beaver_ function. In other words, $$BB(1) = 1$$, $$BB(2) = 6$$, $$BB(3) = 21$$, and so on. (If for whatever reason you find yourself in a "who can name the biggest number" competition [^1], writing something like $$BB(10)$$ is probably a good place to start.)

Weirdly enough, while we know how to _define_ this sequence, __we don't actually know how to compute $$BB(n)$$ for any $$n > 4$$__. Even the fifth number, $$BB(5)$$, which we _think_ is 47,176,870, isn't yet certain. How is this possible? To explain, first we have to talk about...

## Turing machines

A Turing machine is a sort of prototypical computer, invented by Alan Turing in 1936.[^2] Conceptually, a Turing machine can "compute" anything we can write out an algorithm for. This includes things like addition and multiplication, for example, but also anything we consider a "computer" to do, like running the Windows 95 operating system, or anything your smart phone does.

To understand what a Turing machine is, imagine you have an infinitely long strip of paper (or "tape") divided into squares, and each square has a different color (say, white or orange). We'll assume for now that initially, the squares are all white. In pseudo-code, let's write this as follows:


```python
square_colors = ["white", "white", ..., "white"]
```

A Turing machine has a program that tells it how to interact with this tape. It reads one square at a time, and based on its program it decides whether to change the color of the square (e.g., make a white square orange), and whether to move next to the left or right. For example, consider the Turing machine below:

```python
position = 5 # arbitrary start position
while True:
	if square_colors[position] == "white":
		square_colors[position] = "orange"
		position += 1 # move right
	elif square_colors[position] == "orange":
		square_colors[position] = "orange"
		position -= 1 # move left
```

We might call such a program "orange obsessed", as the machine will color every square it visits orange.

### A 2-state Turing machine

A Turing machine can have multiple rules, called "states". For example, the program above has a single state that we called "orange obsessed." To make a 2-state Turing machine, let's take our "orange obsessed" state along with another completely different state, plus some instructions for how to transition between our two states. We will also give our Turing machine an extra state (called HALT) which tells it when to stop running. Pseudo-code for our final 2-state Turing machine might look like this:

```python
square_colors = ["white", "white", ..., "white"]
position = 5 # arbitrary start position
state = "orange obsessed" # initial state

while state != "HALT":
	if state == "orange obsessed":
		if square_colors[position] == "white":
			square_colors[position] = "orange"
			position += 1 # move right
			state = "optimistic"
		elif square_colors[position] == "orange":
			square_colors[position] = "orange"
			position -= 1 # move left
			state = "optimistic"
	elif state == "optimistic":
		if square_colors[position] == "white":
			square_colors[position] = "orange"
			position -= 1 # move left
			state = "orange obsessed"
		elif square_colors[position] == "orange":
			square_colors[position] = "orange"
			position += 1 # move right
			state = "HALT"
```

For the sake of personification, we can imagine that the above machine is committed to changing every white square it encounters into an orange one. When it turns a white square orange, it becomes "optimistic." If it then encounters another orange square, it optimistically assumes that it must be finished with its work, and so it halts.

### Counting our steps

What happens if we run the machine above on a tape filled with white squares? Play the animation below to see a simulation of this process. (The black circle indicates which square the machine is currently reading.) After you do that, click the button that says "Play next machine" to simulate one of the 20,736 different possible 2-state Turing machines.

<div id="sketch-holder"></div>
<button class="restart-sim">Play</button>
<button class="random-sim">Play next machine</button>
<script src="{{ site.url }}/assets/js/articles/busybeaver2.js" type="text/javascript"></script>
<br/>

## Busy Beavers

As you might have noticed above when simulating random Turing machines, not every Turing machine will always halt. For example, some machines' programs get them stuck in a loop, dooming them to repeat the same sequence of moves over and over again. Others simply never bother transitioning to a HALT state. In that sense, the program we described above is a little special, because it does halt. But how special, exactly? Let's say we considered every possible 2-state Turing machine that _does_ halt when run on an empty tape. One might wonder: _Which machine takes the most steps before halting?_

Now we can finally explain (well, somewhat) the sequence of numbers at the beginning of the post: __The Busy Beaver function, $$BB(n)$$, tells us the maximum number of steps a Turing machine with $$n$$ states can take before halting.__

The Turing machine we described above is in fact a 2-state busy beaver. In other words, there is no 2-state Turing machine that runs longer than $$BB(2) = 6$$ steps. If you don't believe me, try pressing the button above 20,736 different times and see for yourself :)

### Why finding busy beavers is so difficult

How do we know that $$BB(2) = 6$$? To verify this, we must simulate every possible 2-state Turing machine and run each one on an imaginary row of empty squares. We could then check that none of the machines that _did_ halt ran longer than 6 steps, confirming that $$BB(2) = 6$$. To find $$BB(3)$$ and $$BB(4)$$ we might consider using a similar process. But by the time we get to $$BB(5)$$, two big problems arise:

1. As I mentioned, there are 20,736 different 2-state Turing machines to consider. In general, there are $$(4n + 4)^{2n}$$ n-state Turing machines. That means for $$n=5$$, there are more than 63 trillion different machines to run.

2. Remember that $$BB(n)$$ is the most steps a Turing machine with $$n$$ states can take _before_ halting. But as Turing himself showed [^3], there is no way to decide in general whether a machine will eventually halt or if it will run forever!

This second problem is really the key one. Let's say we've run one of our 2-state machines for 5,000 steps and it still hasn't halted. Can we assume that it never will? Luckily, we already know that $$BB(2) < 5000$$, which means this machine _must_ run forever. But if we _don't_ know $$BB(n)$$, then we don't know how long we have to run a machine until we can be confident that it will never stop.[^4] Another way of putting it is that to compute $$BB(n)$$, you'll have to run all of your machines at least $$BB(n)$$ steps to know whether your machines will halt or not. It's like the joke where you're on a bus, and you ask the passenger next to you if he knows which stop to get off at for the grocery store. "Sure," he tells you. "Just get off one stop before I do."

So now hopefully it's a little clearer why we don't even know $$BB(5)$$ yet. We _think_ it's 47,176,870. But there are genuinely still some 5-state Turing machines out there being simulated on someone's computer that have yet to halt. And we don't yet know how to prove that they never will.

<!-- ## Universal Turing machines

A Turing machine is just a set of instructions to carry out given whatever state you're in, and what square you're reading. Specifically: what letter to write in the square, which direction to move in next, and which internal state to move to next. The Turing machine is placed in a starting position on a piece of tape, and each square in the tape has either a 0 or a 1 in it. The "input" is whatever you write on the tape at the start. The output is whatever the numbers are after the machine stops moving. Let $$M_1(x)$$ be the output of a particular machine, M1, when being given $$x$$.

Every Turing machine can be described by some number. So what happens if you run another Turing machine, $$M_2$$, on an input that describes how to run $$M_1$$ on the input $$x$$? (Meaning something like $$M_2(y)$$, where $$y = [M_1~ x]$$.) It turns out there are in fact Turing machines that can tell you what _any_ Turing machine would return when given _any_ input. These are called "universal Turing machines."

There's a universal Turing machine with only 6 states and 4 letters. The crazy thing is that this Turing machine could tell you the output of _any_ other Turing machine--even one with 1,390,233 states--applied to any input. In general the set of universal Turing machines forms a sort of frontier when plotted in letter-vs-state space.

These tiny universal Turing machines give us a hint that the set of things we can "compute" is in fact quite limited. (Turing machines were in fact the first theoretical definition of what a computer even _is_.) -->

<hr>
__Notes and links__

[^1]: ["Who Can Name the Bigger Number?"](https://www.scottaaronson.com/writings/bignumbers.html) by Scott Aaronson is a fantastic read.

[^2]: ["On Computable Numbers, with an Application to the Entscheidungsproblem."](https://sci-hub.tw/10.1112/plms/s2-42.1.230) by Alan Turing (1936)

[^3]: In the paper where he introduces the Turing machine, Turing shows that the "halting problem" (which is to determine whether an arbitrary Turing machine will ever halt when given a particular input sequence), is impossible to solve with a general-purpose algorithm.

[^4]: The halting problem says that there is no algorithm that can tell us whether _any_ program (e.g., a Turing machine) will halt when given a particular input. You [_can_](https://wpmedia.wolfram.com/uploads/sites/13/2019/03/19-1-2.pdf) tell whether an arbitrary 2- or 3-state Turing machine will halt. But for the other ones, we're on our own; people have to use a mix of procedures and heuristics to decide if a program is stuck in a loop.

[^5]: ["The Busy Beaver Frontier"](https://www.scottaaronson.com/papers/bb.pdf) by Scott Aaronson

- [Fun visualizations](https://catonmat.net/busy-beaver) of Turing Machines

- Wolfram Alpha's Turing machine simulator is [intense](https://www.wolframalpha.com/examples/science-and-technology/computational-sciences/turing-machines/)
