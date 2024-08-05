(sec:MSSP)=
# Multi-stage stochastic programming (MSSP) problems

Now that we have a clear understanding of the structure of two-stage stochastic programming problems, we can generalise the idea for an arbitrary number of stages. 

Having multiple stages in a stochastic programming model allows for realistic modelling nonanticipativity (temporal causality) and how information about uncertainty is gradually unveiled. This is particularly important in settings where problems have multiple decision points in time, meaning that decisions are made in a particular sequence and at each decision point more information is revealed.

%TODO: Diagram showing multiple stage decisions

## Solving MSSP problems 

From the diagram above, one key feature regarding multi-stage stochastic programming (MSSP) problems becomes evident: they are essentially *nested* 2SSPs. This observation paves the way for these to be tackled from two distinct points of views:

1. They can be posed from the perspective of *recurrence*, which allows for a bridge to [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) to be made; alternatively
2. they can be posed as deterministic equivalent problems and solved as "monolithic" *(large-scale) mathematical programming* models.

Essentially, both perspectives are equivalent. Considering dynamic programming as a framework for solving MSSP problems allows us to adapt the techniques used for solving dynamic programming problems to solve MSSPs.

On the other hand, considering MSSP deterministic equivalents directly has the benefit of allowing us to handle it as a standard mathematical programming model. The caveat is that these tend to present a considerably large number of variables and constraints.

## Why MSSPs?

Solving MSSP is computationally demanding due to the so-called *curse of dimensionality*. In our case, the dimensions are the stages, and, as we can see from the figure above, the number of scenarios (and consequently the number of variables and constraints in the deterministic equivalent) grows exponentially with the number of stages. In particular, let $H$ be the number of stages and $|\Xi|$ the number of scenarios in each stage. Then, the total number of scenarios in an MSSP is $|\Xi|^(H-1)$.

```{note}
The number of scenarios is not necessarily the same at each stage. More generally, assume that for each stage $t \in \braces{2,\dots,H}$ we have $|Xi_t|$ scenarios. Then the total number of scenarios is given by $\prod_{t=2}^{H |\Xi_t|}$.
```

The inherent trade-off between the number of stages and computational tractability is what guides the number of stages one must consider. Essentially, MSSP models try to capture how gradual information revelation is as decisions are made. That is, we have that

```{math}
\begin{aligned}
x^1 \rightarrow \xi^2 \rightarrow x^2(\xi^2,x^1) \rightarrow \xi^3 \rightarrow x^3((\xi^2,\xi^3), (x^1,x^2)) & \rightarrow \dots \\ 
\dots &\rightarrow  \xi^H \rightarrow x^H((\xi^2,\dots,\xi^H), (x^1,\dots,x^{H-1}))
\end{aligned}
```

One can see how the gradual dependencies between past decisions and past realisation are unveiled as one progresses in the decision process. Also, it becomes clear how much more involved the problem becomes, as one must make sure that these dependencies (nonanticipativity conditions) are correctly reflected.

Accurately modelling this gradual uncertainty realisation is critically important in settings where decisions must be made frequently and having a model that can inadvertently anticipate the future can lead to over-optimistic performances. Classical examples of such settings are inventory control problems, hydropower generation scheduling and portfolio asset management. In all of these, nonanticipativity plays a crucial role in defining optimal decisions, and as such, must be modelled as precisely as possible.
%TODO: Add references

%TODO: include a discussion of 2-stage approximation and rolling horizon approaches

## MSSPs as dynamic programming problems

To ease the notation, let use define that up to stage $t \in \braces{2,\dots,H}$, $\xi$ represent a sequence of realisations up to period $t$. Moreover, iwe assume that the dependence of $x_t$ to $x_1, \dots, x_{t-1}$ is encoded in the feasible set of the $t$-stage problem, and as such, we can drop from the notation the explicit dependence of $x_t$ to $(x_1, \dots, x_{t-1})$ Thus, we can compactly state that $x^t(\xi) = x^t((\xi^2,\dots,\xi^t), (x^1,\dots,x^{t-1})$.

```{warning}
An important premise underlying classical stochastic programming is that the uncertainty is *exogenous*. That is, earlier decisions do not have any effect on the probability distribution of later uncertainty realisation. This is why one does not need to keep track of past decisions, but only past realisations of the random variable $\xi$. 
```

Let us see how we can pose an MSSP as a dynamic programming problem. We start from the last stage $H$, in which we have

```{math}
\begin{aligned}
   Q^H(x^{H-1},\xi^H) = \mini & c^H(\xi)^\top x^H(\xi) \\
   \st & W^H(\xi) x^H(\xi) = h^H(\xi) - T^{H-1}(\xi)x^{H-1} \\
   &x^H(\xi) \ge 0.  
\end{aligned}
```

With $Q^H(x^{H-1},\xi^H)$ defined, we can state, for $t = 2, \dots, H-1$, our recursive step

```{math}
\begin{aligned}
   Q^t(x^{t-1},\xi^t) = \mini & c^t(\xi)^\top x^t(\xi) + \mathcal{Q}^{t+1}(x^t)\\
   \st & W^t(\xi) x^t(\xi) = h^t(\xi) - T^{t-1}(\xi)x^{t-1} \\
   &x^t(\xi) \ge 0.  
\end{aligned}
```

And finally, we are interested in solving

```{math}
\begin{aligned}
   \mini & c^{1\top} x^1 + \mathcal{Q}(x^1) \\
   \st & W^1x^1 = h^1 \\
   &x^1 \ge 0.  
\end{aligned}
```

%TODO: discuss features of this formulation: what it is useful for?

## Deterministic equivalent of MSSPs

Equivalently, one can pose these models as monolith formulations, which can be directly fed to, e.g., a mathematical programming solver. For illustration purposes, let us consider a 3-stage stochastic programming problem. Then, the deterministic equivalent can be written as

```{math}
\begin{aligned}
   \mini & c^{1\top}  x^1 + \sum_{\xi^2_s \in S^2}P(\xi^2_s)\left[c^2(\xi^2_s)^\top x^2(\xi^2_s) + \sum_{\xi^3_s \in S^3(\xi^2_s)} P(\xi^3_s | \xi^2_s)\left({c^3(\xi^3_s | \xi^2_s)}^\top x^3(\xi^3_s | \xi^2_s) \right)\right] \\
   \st & T^1 x^1 = h^1 \\
   & T(\xi^2_s)x^1 + W(\xi^2_s)x^2(\xi^2_s) = h(\xi^2_s), \ \forall \xi^2_s \\
   & T(\xi^3_s | \xi^2_s) x^2(\xi^2_s) + W(\xi^3_s | \xi^2_s)x^3(\xi^3_s | \xi^2_s) = h(\xi^3_s | \xi^2_s), \ \forall \xi^2_s, \xi^3_s | \xi^2_s \\
   &x^1 \ge 0 \\
   &x^2(\xi^2_s) \ge 0, \ \forall \xi^2_s \\
   &x^3(\xi^3_s | \xi^2_s) \ge 0, \ \forall \xi^2_s, \xi^3_s|\xi^2_s.
\end{aligned}
```

%TODO: Develop this to include more on the structure of the problem. Let's also use Conejo's book to discuss nested v. explicit formulations, and add a discussion on nonanticipativity conditions.
