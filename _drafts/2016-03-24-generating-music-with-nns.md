---
layout: post
title: "Somehow generating music with NNs"
description: ""
categories: articles
---

I decided I wanted to understand autoencoders. I also want to generate music, so I was browsing GitXiv.

Found [this](http://web.mit.edu/felixsun/www/neural-music.html) blog post, using autoencoders to generate harmonies. Cool!

Realized that the reason autoencoders seem cool, in a general sense, is because they're _generative_ models. (Also found this Annual Review on ["Learning Deep Generative Models"](http://www.cs.toronto.edu/~rsalakhu/papers/annrev.pdf) that I should read at some point.) They're an unsupervised model, so it's like dimensionality reduction on complex data.

Then, at the end of that blog post was a link to [this](https://www.youtube.com/watch?v=_Gpk64QC22E) video where this guy is using a Restricted Boltzmann Machine (RBM) to make music by providing input to a (trained) network using mouse coordinates. Holy shit! This is cool: Dimensionality reduction = new way to control high-dimensional data with low-dimensional input.

But instead of autoencoders, what about RNNs? [This](http://www.hexahedria.com/2015/08/03/composing-music-with-recurrent-neural-networks/) one in particular looks cool. But I must admit I'm a bit confused about how you're training the networks here...You're giving it music, and it's predicting what? The next input given the previous ones? I'm going to assume yes. So then it generates new music by just starting with some random seed.

The problem with this route, of course, is there's no low-d control port like there could be with this autoencoder approach.

And then finally, of course, there's [Deep Dream](https://github.com/google/deepdream/blob/master/dream.ipynb). Deep Dream appears generative, but really what you're doing is, you train a network to do classification (for example), and then you feed the network an image. Now, pick a layer to now treat as your output, and try to maximize its output starting with the current image's activations on it, and make tiny adjustments to it to try to make that layer fire even more. So this is generative, but it seems slow.

[Note: It seems like Felix's autoencoder approach also uses this same idea to do harmonizing; you provide it with a melody, which is an imcomplete sample, and you then search through input space so as the maximize the activations of later layers. So maybe this approach is not necessarily slow...But the autoencoder idea still seems best because we want a low-d representation.]

Here's my idea though, inspired by the cursor-control of music thing: Imagine you're playing a part on guitar, and your friend hears it, and then he/she says "That's cool, but now play it angrier." You can see how we have a separation of style and content.

So the autoencoder thing is cool because you have 2d output that you can control with a mouse. But it's not not perfect because it's unclear how movement in that 2d space affects the music. I'd like to be able to say: moving the cursor to the right makes it angrier, moving it up makes it faster, for example. The Deep Dream approach would have you build a classifier for angrier/faster music, and then you modify the inputs to make it fit that goal, but then, as mentioned, it's slower.

Enter...[Adversarial Autoencoders](http://gitxiv.com/posts/eFw3ArCyvhaFJ6bzb/adversarial-autoencoders). Basically it's just an autoencoder, but now you have two objectives: One "reconstruction" objective to make sure you can reconstruct the data well (a generative model), but then there's also an "adversarial" objective that wants to classify things (a discriminative model). Both of these models are fit in tandem; as the paper puts it, it's like the reconstruction objective wants to fool the discriminative objective, but the discriminative objective will try to keep up as the reconstruction tries to gets better.

[Note: After some more reading of this Adversarial Autoencoders paper, I realize now that the way they disentangle style and content is by setting some of the latent variables to be the true label, so that the other latent variables must encode other aspects of the input data. The real function of the adversarial component seems to be keeping the prior distribution continuous and not full of holes, so that "generating from any part prior space results results in meaningful samples."]

Alternatively, I guess you could imagine that once you have a decoder network (low-d to high-d), you could also have a classifier for the resulting image (the high-d you produce) that classifies it as "happy" or "sad" or whatever. And so you then train a network to find the best low-d input to this network to produce the emotion you're looking for. If that makes sense.

Idea: Implement Felix's autoencoder network, but combine it with the Adversarial network idea where you give the latent variables some class information. So if you train the autoencoder on music by four different musicians, have four latent bits (a 4d "one-hot" vector) that marks each musician. Then maybe the other latents will still generalize how to make music, but you can generate music in the distinct styles of each musician.

Weakness of a non-RNN is that there's no time, so you can only generate independent snippets of music, snippets as long as your input snippets.

### Resources

* [RNN](http://deeplearning.net/tutorial/rnnrbm.html) for music example.
* [music samples as pickle files](http://www-etud.iro.umontreal.ca/~boulanni/icml2012)

