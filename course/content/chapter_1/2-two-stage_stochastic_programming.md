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
- $\xi \in \Xi$ represent the random variable with support $\Xi$;
- $\brackets{q(\xi), T(\xi), W(\xi), h(\xi)}$ be the random vector containing all the data that is dependent on the random variable $\xi$.

```{admonition} Definition of recourse
:class: note
The [Brittanica dictionary's definition](https://www.britannica.com/dictionary/recourse) of recourse is: "an opportunity or choice to use or do something in order to deal with a problem or situation". 
```

With the above, we can formulate our two-stage stochastic programming (2SSP) model as

```{math}
:label: eq_2SSP_2parts
\begin{aligned}
  \mini & c^\top x + \mathcal{Q}(x) \\
  \st  & Ax = b \\
  & x \ge 0, 
\end{aligned}
```

where $\mathcal{Q}(x) = \mathbb{E}_\xi\brackets{Q(x, \xi)}$ and

```{math}
:label: eq_2stage
  Q(x, \xi) = \braces{\mini q(\xi)^\top y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0}.
```
Let us take a moment to appreciate the structure of {eq}`eq_2SSP_2parts`. First notice how it has two optimisation problems nested within each other. It considers a set of decisions $x$ and associated constraint set $X = \braces{x : Ax = b, x \ge 0}$ that are made with the intention of also minimising the value of $\mathcal{Q}(x)$, which is in itself an expected value among multiple optimisation problems. In turn, $\mathcal{Q}(x)$ is an optimisation problem where, given the decision $x$ and a value for $\xi$, we optimise $Q(x,\xi)$.

In essence, this structure encodes the following decision process
```{math}
  x \rightarrow \xi \rightarrow y(x, \xi)
```

in which $x$ is chosen to minimise the expected value $\mathbb{E}_\xi\brackets{Q(x, \xi)}$ assuming a *known* probability distribution and that $y$ is chosen to minimise $Q(x, \xi)$ for each realisation of $\xi \in \Xi$.

We can combine {eq}`eq_2SSP` and {eq}`eq_2stage` into a single optimisation problem

```{math}
:label: eq_2SSP
\begin{aligned}
  \mini  & c^\top x + \mathbb{E}_\xi\brackets{Q(x, \xi)} \\
  \st & Ax = b, \ x \ge 0 \\
  & T(\xi)x + W(\xi)y(\xi) = h(\xi), \ \forall \xi \in \Xi \\
  & y(\xi) \ge 0, \ \forall \xi \in \Xi.
\end{aligned}
```

```{admonition} (Semi-)infinite programming problems
:class: note
Problems that have a infinite number of variables or constraints. If the problems has either one, but not both, it becomes a semi-infinite programming problem.
```

## Tractable 2SSPs

There are two complicating factors that prevent the solution of {eq}`eq_2SSP`:

1. The evaluation of $\mathbb{E}_\xi\brackets{Q(x, \xi)}$, which requires calculating an $n$-dimensional integral, assuming $x \in \reals^n$;
2. Dealing with an infinite programming problem, as $\forall \xi \in \Xi$ spans an infinite number of variables and constraints.

The standard way to address both issues in stochastic programming is to rely on the notion of *discretisation*. That is, we assume that $\Xi$ is a finite and discrete support. This essentially means that we assume that $\Xi$ can be characterised by the set $S = \braces{1, \dots, |\Xi|}$, where each $s \in S$ is called a scenarios. 

```{admonition} How to generate scenarios
:class: tip
Two main ideas: 

1. assuming that the random variable $\xi$ can be characterised by a discrete set of realisations $\xi_s$, $s \in S$, each with probability $P_s$;
2. assuming that $\xi \in \Xi$ can be sampled via, e.g., Monte Carlo sampling.

Both ideas will be discussed in more details in the later sections.
```
%TODO: Add refernce to scenario generation lecture

Assuming that we are given a set of realisations (or scenarios) $\xi_s$, $\forall s \in S$, means that we are left with a discrete and finite set of parameters, i.e., 

```{math}
\begin{bmatrix}
  q(\xi_1), T(\xi_1), W(\xi_1), h(\xi_1) \\
  q(\xi_2), T(\xi_2), W(\xi_2), h(\xi_2) \\
  \dots  \\
  q(\xi_{|\Xi|}), T(\xi_{|\Xi|}), W(\xi_{|\Xi|}), h(\xi_{|\Xi|})
\end{bmatrix}
~\Rightarrow~ [q_s, T_s, W_s, h_s] = \xi_s, \ \forall s \in S.
```

With that scenario-based representation of the uncertainty, we are ready to state the so-called *deterministic equivalent* formulation of {eq}`eq_2SSP`, which is given by

```{math}
:label: 2SSP
\begin{aligned}
   \mini & c^\top x + \sum_{s\in S} P_s q_s^\top y_s \\
   \st & Ax = b, \ x \ge 0 \\
   & T_sx + W_s y_s = h_s, \ \forall s \in S \\
   & y_s \ge 0, \ \forall s \in S.
\end{aligned}
```

```{admonition} Linearity assumption in stochastic programming
:class: note
Throughout our developments, we have an underlying assumption of linearity in our stochastic programming models. Clearly, that does not need to be the case, and is as such to simplify the presentation. 
```

Notice how the assumption of having a discrete set of scenarios immediately solve the two issues discussed above, that is:

1. the expected value becomes a weighted sum, which is trivial to evaluate. In other words, being $P_s$ the probability associated with scenario $s$ ($P_s = P(\xi = \xi_s)$), we have that $\mathbb{E}_\xi\brackets{Q(x, \xi)} = \sum_{s\in S} P_s q_s^\top y_s$.
2. the number of variables and constraints that depend on $\xi$ are now finite, albeit proportional to $|\Xi|$

````{prf:example} The farmers problem revisited
In the farmers problem, we assumed that $S = \braces{1,2,3}$. Also, not all parameters of the model were assumed to be random, i.e., we had that

```{math}
  T_s = [t_1(s), t_2(2), t_3(s)], \forall s \in S; q_s = q_s', W_s = W_s', \text{ and } h_s = h_s', \forall s,s' \in S : s \ne s'.
```
Thus, we had that $Q(x,\xi) \equiv Q_s(x)$ was given by

```{math}
\begin{aligned}
   Q_s(x) = \mini \ &238y_1(s) -170w_1(s) + 210y_2(s) - 150w_2(s) - 36w_3(s) - 10w_4(s) \\
   \st   \ &t_1(s)x_1 + y_1(s) - w_1(s) \geq 200 \\
   & t_2(s)x_2 + y_2(s) - w_2(s) \geq 240 \\
   & w_3(s) + w_4(s) \leq t_3(s)x_3 \\
   & w_3(s) \leq 6000 \\
   & y_1(s), w_1(s), y_2(s), w_2(s), w_3(s), w_4(s) \geq 0. 
\end{aligned}
```
````
