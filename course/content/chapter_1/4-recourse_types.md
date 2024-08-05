# Types of recourse

When we consider the nature of the second-stage problem, we notice that they might have particular structural features which may be used to our benefit or help us infer properties that will aid with, for example, designing specialised solution algorithms.

Specifically, let $x$ be our first-stage decision and $\xi \in \Xi$ our random variable. Then, recall that our 2SSP is given by

```{math}
\begin{aligned}
  \mini & c^\top x + \mathcal{Q}(x) \\
  \st  & x \in X, 
\end{aligned}
```

where $X = \braces{x : Ax = b, x \ge 0 }$ and $\mathcal{Q}(x) = \mathbb{E}_\xi\brackets{Q(x, \xi)}$. The second-stage, that is, *recourse problem*, is defined as

```{math}
Q(x, \xi) = \mini_y \braces{q(\xi)^\top y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0}.
```

## Fixed recourse

We say that the problem has a *fixed recourse* if the coefficients associated with the recourse variables $y$ do are not uncertain, i.e., are not dependent on $\xi$. Thus, if $Q(x, \xi)$ is of fixed recourse, it has the form

```{math}
Q(x, \xi) = \mini_y \braces{q(\xi)^\top y : Wy = h(\xi) - T(\xi)x, \ y \ge 0}.
```

which is equivalent to say that $W(\xi) = W, \forall \xi \in \Xi$.

## Simple recourse

As a special case of having fixed recourse, a problem is said to have simple recourse if $W(\xi) = I$. This fact has important implications in some settings since it reduces the feasibility condition of the second-stage problem to

```{math}
y = h(\xi) - T(\xi)x
```

Notice that this essentially means that each component of the variable vector $y$ has its value fully determined once $x$ is fixed, meaning that evaluating $Q(x, \xi)$ does not require solving an optimisation problem as before. 

%TODO: Add here the newsvendor problem to illustrate simple recourse

## Complete recourse

The notion of recourse completeness is related to whether once $x$ is decided, one can find a feasible solution $y$ for all possible realisations of the random variable $\xi$. It is convenient from an analysis standpoint to define that $Q(x,\xi) = \infty$ if the second-stage problem is not feasible.

More precisely, we say that a 2SSP has complete recourse, then it holds that

```{math}
:label: eq:complete_recourse
Q(x,\xi) < \infty, \ \forall \xi \in \Xi \Longleftrightarrow \braces{y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0} \neq \emptyset, \ \forall \xi \in \Xi.
```

## Relatively complete recourse

A common form of recourse in models representing real-world problems is the so-called *relatively-complete recourse*. In this case, we only require the feasibility of the recourse problem for feasible first-stage solutions $x \in X$. 

This often makes sense in practice, as in such cases one is often concerned with feasibility as a whole and deem not relevant the consideration of feasible recourse problems when the first-stage solution $x$ is not itself feasible.

For obtaining a formal statement of relative complete recourse, we can modify {eq}`eq:complete_recourse` as follows

```{math}
Q(x,\xi) < \infty, \ \forall \xi \in \Xi, \ x \in X \Longleftrightarrow \braces{y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0} \neq \emptyset, \ \forall \xi \in \Xi, x \in X. 
```