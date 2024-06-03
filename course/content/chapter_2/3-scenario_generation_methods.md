# Scenario (tree) generation methods

The main ideas encompassing the methods for generating scenarios stem from 3 main approaches:

1. **Sampling**: employment of Monte Carlo sampling of some quasi-Monte Carlo sampling strategy, such as Latin hypercube or Sobol sampling.
2. **Moment matching**: scenario trees are generated to match known statistical moments (first four plus correlation, usually). These moments can be for example, estimated from data or known from a certain probability distribution.
3. **Metric-based**: these comprise methods forming a smaller scenario set such that a metric measuring similarity between this smaller set and a original reference one is maximised. Includes methods such as clustering and scenario reduction techniques.

There is no universally good method for scenario generation, and certain methods tend to lend themselves better than others depending on the context. Next, we'll focus on describing the main workings of some widespread methods so you can make a conscious choice when choosing the most appropriate one for your own application.

## Moment matching

The key idea is to build a scenario tree $\xi = (z_s, p_s)_{s \in [S]}$ of size $S$ such the statistical moments $f_m(z,p)$, with $m \in M$ match target values $M_m^{\text{VAL}}$. These target values are either arbitrarily set, or extracted from historical data.

As originally proposed in {cite}`hoyland2001generating`, building such a scenario tree requires solving a problem of the form

```{math}
:label: moment_matching_problem
\begin{aligned}
   \min_{z, p \ge 0} & \sum_{m \in M} w_m(f_m(z,p) - M^{\text{VAL}}_m)^2 \\
   \text{s.t.:~} & \sum_{j=1}^{S} p_j = 1,	
\end{aligned}
```

where the optimal solution $\xi^\star = (z^\star,p^\star)$ gives us the matching probability distribution. The weights $w_m$ are used to calibrate the importance of each moment as well as for scaling purposes. 

Problem {eq}`moment_matching_problem` is notoriously challenging due to the nature of the moment functions $f_m$, $m \in M$, in particular when $m$ represent higher moments. In {cite}`hoyland2003heuristic`, the authors circumvent this by proposing an heuristic approach. 

## 