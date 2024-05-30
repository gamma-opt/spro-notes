---
jupytext:
  cell_metadata_filter: -all
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.1
kernelspec:
  display_name: Julia 1.10.3
  language: julia
  name: julia-1.10
---

# Measuring the quality of 2SSP solutions

There are two well-established metrics that can be used to measure average performance gains reaped from employment of stochastic programming models. These are useful in that they allow one to measure whether dealing with a much more sophisticated, computationally demanding model is worth in terms of added value to the decision process.

First, let us define a more compact notation, which will help us to precisely define said metrics. For that, let our 2SSP be represented as

```{math}
:label: eq:2SSP_compact
  z = \mini_x \braces{\mathbb{E}_\xi\brackets{F(x,\xi)}},
```

where $F(x,\xi) = \braces{c^\top x + \mathbb{E}_\xi\brackets{Q(x,\xi)} : x \in X}$, $Q(x,\xi)$ is, as before, defined as

```{math}
Q(x, \xi) = \braces{\mini q(\xi)^\top y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0}.
```

and $X=\braces{x \in \reals^n : Ax = b, x \ge 0}$.

## Expected value of perfect information (EVPI)

One way to access the performance of a solution obtained from a 2SSP model is via its comparison against a so-called *wait-and-see* (WS) solution.

A WS solution is essentially the best outcome achievable, as it is based on perfect information regarding how the uncertainty will unveil. Making a parallel to farmer's problem, this would be akin to knowing exactly which of the three scenarios $S = \braces{1: \text{-20\%}, 2: \text{avg.}, 3:\text{+20\%}}$ will become true and choosing the respective optimal land allocation. 

%TODO: fix reference to 1-introduction.md

A WS solution can be obtained from a perfect-foresight version of {eq}`eq:2SSP_compact`, which is defined as

```{math}
	z^{\text{WS}} = \mathbb{E}_\xi\brackets{\mini_x \braces{F(x,\xi)}} = \mathbb{E}_\xi\brackets{F(x(\xi), \xi)},
```

where $x(\xi) = \arg\min_x \braces{F(x, \xi)}$. In other words, $z^{\text{WS}}$ is the expected value of the objective function value if we could perfectly adapt our solution to the scenario we can predict that will happen. Notice that we cannot control *which* scenario will happen, and as such, our return, albeit based on perfect foresight, is uncertain.

The expected value of perfect information (EVPI) is calculated as

```{math}
 EVPI = z - z^{\text{WS}}.
```

````{prf:example} The farmer's problem EVPI

For the farmers problem (see {ref}`section:the_farmers_problem`), we have that $z = -108,390$, and that 

1. For $s=1$, $z^{\text{EV}}_1 = \mini_x \braces{F(x,1)} = -59,950$ (the -20% yield scenario),
2. for $s=2$, $z^{\text{EV}}_2 = \mini_x \braces{F(x,2)} = -118,600$ (the average yield scenario), and
3. for $s=3$, $z^{\text{EV}}_3 = \mini_x \braces{F(x,3)} = -167,667$ (the +20% yield scenario).

Therefore, we have that 
```{math}
z^{\text{EV}} = \frac{1}{3} z^{\text{EV}}_1 + \frac{1}{3} z^{\text{EV}}_2 + \frac{1}{3} z^{\text{EV}}_3 \approx \$115,406
```

making $EVPI = -108,390 - (-115,406) = \$7016$. 
````

## Value of the stochastic solution (VSS)

Another way of quantifying th quality of the solution obtained from a 2SSP model is to compare it against the expected performance of a (first-stage) solution obtained considering a single reference scenario. Typically, this reference scenario is set to be the average value of the uncertain parameter.

Let $\overline{\xi}$ be such a realisation (or scenario). Then, let

```{math}
  x(\overline{\xi}) = \arg\min F(x, \overline{\xi}).
```

Notice that $x(\overline{\xi})$ represents the optimal solution obtained when the realisation $\overline{\xi}$ is anticipated. Then, we proceed to calculate the performance of $x(\overline{\xi})$ against all $\xi \in \Xi$, which leads us to

```{math}
z^{\text{EV}} = \mathbb{E}_\xi\brackets{F(x(\overline{\xi}), \xi)}.
```

By making $\overline{\xi} = \mathbb{E}\brackets{\xi}$, we obtain the value of the stochastic solution (VSS) by calculating
```{math}
VSS = z^{\text{EV}} - z.
```

%TODO: calculate these values
````{prf:example} The farmer's problem VSS

For the farmers problem, $\overline{\xi}$ is equivalent to $s=2$, which represented our average yield. Therefore, the solution of the deterministic model is our $x(s=2)$ using the above notation. Then, we have that 

1. For $s=1$, $z^{\text{EV}}_1 = \mini_x \braces{F(x(s=2),1)} = -$ (the -20% yield scenario),
2. for $s=2$, $z^{\text{EV}}_2 = \mini_x \braces{F(x(s=2),2)} = -$ (the average yield scenario), and
3. for $s=3$, $z^{\text{EV}}_3 = \mini_x \braces{F(x(s=2),3)} = -$ (the +20% yield scenario).

Therefore, we have that 
```{math}
z^{\text{EV}} = \frac{1}{3} z^{\text{EV}}_1 + \frac{1}{3} z^{\text{EV}}_2 + \frac{1}{3} z^{\text{EV}}_3 \approx \$-107,240
```

making $EVPI = -107,240 - (-108,390) = \$1150$. 
````

## Comparing VSS and EVPI

In possession with both indicators, we can use then to position how well our stochastic model is performing against two extremes: being completely ignoring the uncertaitny and optimising against expected values (VSS) and optimising with perfect information or foresight (VSS). In other words, assuming minimisation as the reference, we have that

```{math}
z^{\text{WS}}  \le z\le z^{\text{EV}}
```

It is not hard to see that this implies that $VSS \ge 0$ and $EVPI \ge 0$. Moreover, if you think of these values as some sort of distance, it is natural to think that you would like your model's objective value $z$ to be as further away as possible from the $z^{\text{EV}}$, thus preferring *higher* values of VSS. Likewise, we would like to be as close as possible to $z^{\text{WS}}$, and thus prefer *lower* values of $EVPI$.

```{warning}
Although these metrics are useful, they must be interpreted with some caution. For example, if one is relying on scenarios $s \in S$ that are an approximation of a random variable $\xi \in \Xi$, the metric will be dependent on that representation. that being the case, they must ideally be evaluated in a different set of scenarios than $S$as well. These ideas will be discussed further in later sections.
```
