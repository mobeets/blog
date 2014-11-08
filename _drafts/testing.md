---
layout: post
title: "testing"
tags: [python]
---
_Adapted from MATLAB code by [George
Mather](http://www.georgemather.com/Model.html)_

{% highlight python %}
%matplotlib inline
{% endhighlight %}

{% highlight python %}
import math
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import convolve2d
from scipy.linalg import toeplitz
{% endhighlight %}

Testing hello $$YOU BUTT$$

# 1. Create component spatiotemporal filters

## a. Define the space axis of the filters

{% highlight python %}
nx = 80;
max_x = 2.0;
sx = 0.5;
sf = 1.1;
dx = (max_x*2)/nx;
{% endhighlight %}

{% highlight python %}
x_filt = np.linspace(-max_x, max_x, nx);
gauss = np.exp(-x_filt**2/sx**2);
even_x = np.cos(2*np.pi*sf*x_filt)*gauss;
odd_x = np.sin(2*np.pi*sf*x_filt)*gauss;
{% endhighlight %}

{% highlight python %}
plt.plot(x_filt, gauss, linestyle='--', label='gauss');
plt.plot(x_filt, even_x, label='even_x');
plt.plot(x_filt, odd_x, label='odd_x');
plt.ylim(None, 1.1)
plt.legend()
plt.title('spatial filters')
{% endhighlight %}




    <matplotlib.text.Text at 0x112bd8150>




![png](/images/ipython/testing_files/testing_8_1.png)


## b. Define the time axis of the filters

{% highlight python %}
nt = 100;
max_t = 0.5;
dt = max_t/nt;
k = 100;
slow_n = 9;
fast_n = 6;
beta = 1.0;
{% endhighlight %}

{% highlight python %}
t_filt = np.linspace(0, max_t, nt);
t_fcn = lambda n: (k*t_filt)**n * np.exp(-k*t_filt) * (1./math.factorial(n) - beta*((k*t_filt)**2)/math.factorial(n+2))
slow_t = t_fcn(slow_n);
fast_t = t_fcn(fast_n);
{% endhighlight %}

{% highlight python %}
plt.plot(t_filt, slow_t, label='slow_t');
plt.plot(t_filt, fast_t, label='fast_t');
plt.legend();
plt.title('temporal filters');
{% endhighlight %}


![png](/images/ipython/testing_files/testing_12_0.png)


## c. Combine space and time to create spatiotemporal filters

{% highlight python %}
e_slow = np.outer(slow_t, even_x);
e_fast = np.outer(fast_t, even_x);
o_slow = np.outer(slow_t, odd_x);
o_fast = np.outer(fast_t, odd_x);
{% endhighlight %}

{% highlight python %}
def plot_imgs(imgs):
    for i, (name, img) in enumerate(imgs.iteritems()):
        plt.subplot(2,2,i)
        plt.imshow(img, cmap=plt.cm.binary);
        plt.gca().axes.get_xaxis().set_ticks([])
        plt.gca().axes.get_yaxis().set_ticks([])
        plt.xlim(nx/4., 3.*nx/4)
        plt.ylim(0, 1.4*nt/3)
        plt.title(name)
{% endhighlight %}

{% highlight python %}
plot_imgs({'e_slow': e_slow, 'e_fast': e_fast, 'o_slow': o_slow, 'o_fast': o_fast})
{% endhighlight %}


![png](/images/ipython/testing_files/testing_16_0.png)


# 2. Create spatiotemporally oriented filters

{% highlight python %}
left_1 = o_fast + e_slow;
left_2 = -o_slow + e_fast;
right_1 = -o_fast + e_slow;
right_2 = o_slow + e_fast;
{% endhighlight %}

{% highlight python %}
plot_imgs({'left_1': left_1, 'left_2': left_2, 'right_1': right_1, 'right_2': right_2})
{% endhighlight %}


![png](/images/ipython/testing_files/testing_19_0.png)


# 3. Convolve the filters with a stimulus

{% highlight python %}
stim_width = 4;
stim_dur = 1.5;
x_stim = np.arange(-stim_width, np.round(stim_width-dx), dx);
t_stim = np.arange(0, np.round(stim_dur-dt), dt);

nl = max(len(x_stim), len(t_stim));
signal = toeplitz(xrange(nl))[:len(x_stim), :len(t_stim)];
noise = (nl/7.)*np.random.random([len(x_stim), len(t_stim)]);
stim = signal + noise;
{% endhighlight %}

{% highlight python %}
plt.figure(figsize=(20,2))
plt.imshow(stim, extent=[x_stim.min(), x_stim.max(), t_stim.min(), t_stim.max()], cmap=plt.cm.binary);
plt.title('stimulus');
plt.xlabel('position');
plt.ylabel('time');
{% endhighlight %}


![png](/images/ipython/testing_files/testing_22_0.png)


{% highlight python %}
resp_right_1 = convolve2d(stim, right_1, 'same');
resp_right_2 = convolve2d(stim, right_2, 'same');
resp_left_1 = convolve2d(stim, left_1, 'same');
resp_left_2 = convolve2d(stim, left_2, 'same');
{% endhighlight %}

# 4. Square the filter output

{% highlight python %}
resp_left_1 = resp_left_1**2;
resp_left_2 = resp_left_2**2;
resp_right_1 = resp_right_1**2;
resp_right_2 = resp_right_2**2;
{% endhighlight %}

# 5. Normalise the filter output

{% highlight python %}
energy_right = resp_right_1 + resp_right_2;
energy_left = resp_left_1 + resp_left_2;
total_energy = sum(sum(energy_right)) + sum(sum(energy_left));

RR1 = sum(sum(resp_right_1)) / total_energy;
RR2 = sum(sum(resp_right_2)) / total_energy;
LR1 = sum(sum(resp_left_1)) / total_energy;
LR2 = sum(sum(resp_left_2)) / total_energy;
{% endhighlight %}

# 6. Sum the paired filters in each direction

{% highlight python %}
right_Total = RR1 + RR2;
left_Total = LR1 + LR2;
{% endhighlight %}

# 7. Calculate net energy as the R-L difference

{% highlight python %}
motion_energy = right_Total - left_Total;
{% endhighlight %}

# 8. Display filter response

{% highlight python %}
energy_opponent = energy_right - energy_left;
xv, yv = energy_left.shape;
energy_flicker = total_energy / (xv * yv);
motion_contrast = energy_opponent / energy_flicker;

mc_min, mc_max = motion_contrast.min(), motion_contrast.max();
peak = abs(mc_max) if abs(mc_max) > abs(mc_min) else abs(mc_min);
{% endhighlight %}

{% highlight python %}
plt.figure(figsize=(20,4));
plt.subplot(2, 1, 1);
plt.imshow(stim, extent=[x_stim.min(), x_stim.max(), t_stim.min(), t_stim.max()], cmap=plt.cm.binary);
plt.title('stimulus');
plt.gca().axes.get_xaxis().set_ticks([]);
plt.subplot(2, 1, 2);
mc = motion_contrast[:-nt/4.+1, nx/4.:-nx/4.+1];
plt.imshow(mc, extent=[x_stim.min(), x_stim.max(), t_stim.min(), t_stim.max()]);
plt.title('response');
plt.xlabel('position');
plt.ylabel('time');
{% endhighlight %}


![png](/images/ipython/testing_files/testing_34_0.png)


{% highlight python %}

{% endhighlight %}
