# Robust optimisation


## Introduction

Robust optimisation is an alternative paradigm for the consideration of uncertainty. The term *robust* refers to the worst-case perspective from which decisions are made. In essence, one seeks to impose in the model a bias in the decisions chosen as optimal, such that they remain feasible for a range of possible realisations of the uncertain parameters, the so-called *uncertainty set*. In the robust optimisation paradigm, this is achieved by having models that returns as an optimal solution that is guaranteed to be feasible for the worst-case realisation of the uncertainty within the uncertainty set.

The are numerous parallels to be made between robust optimisation, chance constraints, and the use of risk measures. This is natural, since, in many ways, these are all modelling mechanisms that ultimately impose in the model risk aversion towards unfavourable realisations of the uncertainty. In terms of applications of robust optimisation, very often the concern is feasibility, although there is nothing that limits the imposition of robust considerations to objective functions. Indeed, later when we discuss adjustable robust optimisation, we will see that the main focus of its most commonly employed forms is objective function performance.

There are essentially two key dimensions relating to robust optimisation models, relating to whether they are

1. *static* (single stage; no recourse) or *adjustable/ adaptable* (multi-stage; with recourse)
2. whether the uncertainty is represented by a (continuous) *uncertainty set* or by *scenarios*.

For now, we will focus on the static case and consider continuous uncertainty sets. For that, let us first state our deterministic problem as

```{math}
    \begin{align}
		\mini_x & c^\top x \\
		\st & Ax \le b \\
    & x \ge 0
    \end{align}    
```

where $A$ is an $m \times n$ matrix. Let us assume that given row of $A$, say $i \in [m]$, has uncertain coefficients. Our developments will focus on how to devise a *robust counterpart* that takes into consideration such uncertainty and, under particular assumptions, provide a solution that is protected against such uncertainty. 

## Robust counterparts

Let us first reformulate our model to expose the uncertain constraint. Let $A_i$ be the $i$-th row of $A$. Then, let $X = \braces{A_{i'}^\top x \le b_{i'}, i' \in [m] : i' \neq i; x \ge 0 }$, so we can compactly reformulate our deterministic problem as

```{math}
    \begin{align}
		\mini_x & c^\top x \\
		\st & A_i^x \le b_i \\
    & x \in X. 
    \end{align}    
```


## Uncertainty set geometries

### Example: knapsack problem

## Constraint violation probabilities 