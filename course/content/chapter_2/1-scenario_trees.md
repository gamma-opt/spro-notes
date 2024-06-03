
# Using scenarios for representing uncertainty

As we seen so far, stochastic programming models are mathematical programming models which encode the additional assumption that its some of its parameters behave as a *random variable*.

Therefore, the components form our stochastic programming problem are:

1. a mathematical programming model representing a deterministic version of the problem;
2. the values of the deterministic parameters; and
3. a description of the stochasticity, which can be formed from:
   1. a known (or assumed) probability distribution;
   2. historical data;
   3. probability distribution properties (average, standard deviation, i.e., statistical moments).

We also seen that, for obtaining computationally tractable models, we typically rely on discrete representations of the uncertainty, which are referred to as *scenarios*. However, as one may suspect, when these scenarios are meant to be a discrete representation of a stochastic phenomena, they become an *approximation* of it and, as such, care regarding how to define these must be exercised.

## Scenario trees

A *scenario tree* provides a structure for the sequentially observed realisations of the random variable $\xi^t$, with $t \in \braces{1,\dots,H}$ where $H$ represents the numbers of stages.

Let us define $\xi = (\xi^t)_{t \in [H]}$, where $[H] = \braces{1,\dots,H}$ and $(\cdot)$ denotes a sequence. Also, we have that $\xi_t \in \Xi_t$, that is, at each stage, the stochastic process has its own support $\Xi_y$ while the support of $\xi$ is the Cartesian product $\prod_{t \in [H]}\Xi_t$.

A *scenario* is denoted $(\xi_sˆt)_{t \in [H]}$, forming a *path* through $\xi$. Thus, we can think of the scenario tree $\xi$ as being a set of paths, i.e., $\xi = \braces{\xi_s}_{s \in [S]}$ where $S$ is the number of scenarios.

%TODO: Diagram/ figure with scenario tree


## Taxonomy of scenario trees

Scenario trees have a particular terminology that is a contention not only in stochastic programming, but also in other fields that utilise tree-based representation of sequential decision making under uncertainty.

Consider figure X again. In that, each node represent a known *state* that one is in, meaning that the uncertainty at that point has been revealed and a decision is to be made. Now, each vertical line marks a *stage*, which is a point in time where a decision is made, not "knowing" how the tree will branch forward, but with the knowledge (at each state in that stage) of how the tree branched (or the uncertainty unveiled) up to that point.

The scenario tree is a representation of the stochastic process, and, as such, does not explicitly show at which points decisions are made. The first-stage decision is made at the root of the tree. At each of the nodes between the root and the leaves, there is a decision before observing the uncertainty associated with the node (state) and one immediately after, once the state is observed. The same hold for the leave nodes, i.e., in addition to a decision leading to the revelation of the last state, there is one after the leaf state is observed.

Stages are often associated with time steps in the decision process, as they denote the points in the sequence of decisions that information in obtained (or uncertainty is observed). However, it is common to pose multi-period problems with less stages than time periods represented in the model. A typical example is multi-period lot-sizing problems, where first-stage decisions represent capacity sizing or production commitments, whilst the second-stage represent the operation for all time periods considered. 

So, what does it mean for a multi-period problem to only have two stages? Essentially, having no further states means that all of the uncertainty become revealed, once the first stage decision is made. This leads to a tree that is shaped as a *fan*, as described in figure Y.

% TODO: Add diagram/ figure of a fan tree

```{admonition} 2SSP v. MSSP for modelling multi-period problems
:class: note
This relates with the discussion about the need for MSSPs in {ref}`sec:MSSP`. Fan trees are essentially approximations of their multi-stage counterparts, as they do not correctly convey the nonanticipativity of the uncertainty.
```

## Generating scenario trees

A scenario tree is essentially a discrete approximation of a (typically continuous) stochastic process. As such, there are decisions that must be made that influence how well the scenario tree approximates the original stochastic process.

### Scenario tree shape

Two key parameters govern the geometry of a scenario tree:

1. Its **depth**, which is a consequence of the number of stages it possess
2. Its **breadth** (or width), which is due to the number of realisations per stage ($|\xi_t|$, $t \in [H]$).

The decision on the *number of stages* $H$ must reflect the need for adaptability to revealed information, which is connected to the representation of how gradually the uncertainty is revealed. On the other hand, the number of scenarios $S$ convey a more precise description of the uncertainty, and, in general, the more the better.

The relationship between the two influence the total number of scenarios the model will have. In particular, the number of scenarios will $O(N^H)$, where $|\xi_t| \le N$ for $t \in [H]$. This quantity is critical to be kept in mind, as the more scenarios the stochastic programming model has, the more computationally challenging it will be. Indeed, most scenario generation methods seek to find scenario trees with minimal $|\x|$ such that *representation quality* requirements are observed. 

### Data source

In practical settings, we often can rely on pre-existent models of the stochastic process, or some data on past observations of the uncertainty. Some common sources that can be used for generating scenarios are

1. **Historical data:** can be used directly as surrogates for possible realisation of the uncertainty. Has as built-in premise of stability of the stochastic process, as it assumes that past realisations are good representations of possible future observations.
2. **Sampling from (simulation) models:** once a stochastic model is available, on can repeatedly sample from it to generate possible realisations via Monte Carlo sampling. This include not only classical stochatic models (e.g., time series models) but also simulation models such as systems dynamics, agent-based and discrete event simulation.
3. **Expert elicitation:** typically involve a small number of "handcrafted" scenarios with its likelihood being defined according to the expectation of one or a group of specialists. One drawback is that does not allow for (out-of-sample) testing.

Often, the process of generating scenarios involves a combination of the above. In particular, provided that enough data is available, it is often common that one would define some parametric (e.g., statistical machine learning) model from which observations, or samples, are then generated.

Clearly, this involves considerable care regarding modelling premises, statistical analyses, and experiment design. Questions such as which model better represent the stochastic phenomena, how to sample scenarios and many scenarios are necessary are only some of the questions that must be answered *before* we even obtain a stochastic programming model.
