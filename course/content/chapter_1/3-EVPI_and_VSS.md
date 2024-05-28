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
\begin{equation}
  z = \mini_x \braces{\mathbb{E}_\xi\brackets{F(x,\xi)}},
\end{equation}
```

where $F(x,\xi) = \braces{c^\top x + \mathbb{E}_\xi\brackets{Q(x,\xi)} : x \in X}$, $Q(x,\xi)$ is, as before, defined as

```{math}
\begin{equation} 
  Q(x, \xi) = \braces{\mini q(\xi)^\top y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0}.
\end{equation}
```

and $X=\braces{x \in \reals^n : Ax = b, x \ge 0}$.

## Expected value of perfect information (EVPI)

One way to access the performance of a solution obtained from a 2SSP model is via its comparison against a so-called *wait-and-see* (WS) solution.

A WS solution is essentially the best outcome achievable, as it is based on perfect information regarding how the uncertainty will unveil. Making a parallel to farmer's problem, this would be akin to knowing exactly which of the three scenarios $S = \braces{1: \text{-20\%}, 2: \text{avg.}, 3:\text{+20\%}}$ will become true and choosing the respective optimal land allocation. 

%TODO: fix reference to 1-introduction.md

A WS solution can be obtained from a perfect-foresight version of {eq}`eq:2SSP_compact`, which is defined as

```{math}
\begin{equation*}
	z^{\text{WS}} = \mathbb{E}_\xi\brackets{\mini_x \braces{F(x,\xi)}} = \mathbb{E}_\xi\brackets{F(x(\xi), \xi)},
\end{equation*}
```

where $x(\xi) = \arg\min_x \braces{F(x, \xi)}$. In other words, $z^{\text{WS}}$ is the expected value of the objective function value if we could perfectly adapt our solution to the scenario we can predict that will happen. Notice that we cannot control *which* scenario will happen, and as such, our return, albeit based on perfect foresight, is uncertain.

The expected value of perfect information (EVPI) is calculated as

```{math}
 EVPI = z - z^{\text{WS}}.
```

