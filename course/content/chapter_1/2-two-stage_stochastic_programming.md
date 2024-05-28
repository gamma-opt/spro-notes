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

# Two-stage stochastic programming

## What is a two-stage stochastic programming (2SSP) model?

Let us define more formally the structure behind the farmer's problem decision making. That is, let

- $x$ represent the *first-stage* decisions, i.e., those that are made before the uncertainty is revealed and as such, cannot be scenario dependent;
- $y$ be the *second-stage* decisions, which have a *corrective* nature to them. These are our recourse decisions;
- $\xi$ represent the random variable;
- $\brackets{q(\xi), T(\xi), W(\xi), h(\xi)}$ be the random vector containing all the data that is dependent on the random variable $\xi$.

```{admonition} Definition of recourse
:class: note
The [Brittanica dictionary's definition](https://www.britannica.com/dictionary/recourse) of recourse is: "an opportunity or choice to use or do something in order to deal with a problem or situation". 
```

With the above, we can formulate our two-stage stochastic programming (2SSP) model as

```{math}
:label: eq_2SSP
\begin{aligned}
  \mini & c^\top x + \mathcal{Q}(x) \\
  \st  & Ax = b \\
  & x \ge 0, 
\end{aligned}
```

where $\mathcal{Q}(x) = \mathbb{E}_\xi\brackets{Q(x, \xi)}$ and

```{math}
:label: eq_2stage
\begin{equation} 
  Q(x, \xi) = \braces{\mini q(\xi)^\top y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0}.
\end{equation}
```
Let us take a moment to appreciate the structure of {eq}`eq_2SSP`. First notice how it has two optimisation problems nested within each other. It considers a set of decisions $x$ and associated constraint set $X = \braces{x : Ax = b, x \ge 0}$ that are made with the intention of also minimising the value of $\mathcal{Q}(x)$, which is in itself an expected value among multiple optimisation problems. In turn, $\mathcal{Q}(x)$ is an optimisation problem where, given the decision $x$ and a value for $\xi$, we optimise $Q(x,\xi)$.

In essence, this structure encodes the following decision process
```{math}

```
