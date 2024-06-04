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

## Probability metric-based methods

Probability metric-based methods are methods that focus on some sort of measure of distance between probability distributions. These methods are based on a result from, e.g., {cite}`pflug2001scenario`, that bounds the error $e(\eta, \xi_k)$ as

```{math}
e(\eta, \xi_k) \le K d(\eta, \xi_k)
```

where where $K$ is a (Lipschitz-related) constant and $d$ is a Wasserstein distance between the original stochastic process $\eta$ and the scenario tree $\xi_k$. This result motivates the idea of then devising methods for generating $\xi_k$ that focus on minimising the Wasserstein distance $d$.

The Wasserstein distance is essentially a metric for the measuring how two probability distributions differ. For the context where the compared distribution probabilities are discreet, calculating the metric can be done rather efficiently from a computational standpoint, which motivates its use for working with scenario generation techniques. 

The Wasserstein distance can be defined as follows. Let $\xi^l = (z^l, p^l) \in \Xi^l$. The ($p$-order) Wasserstein distance $d(\xi^1, \xi^2)$ is defined as

```{math}
:label: wasserstein_distance

\begin{aligned}
   d(\xi^1, \xi^2) = \mini_{\pi} & \sum_{i \in \xi^1, j \in \xi^2} ||z^1_i - z^2_j||_p \pi_{ij} \\
   \st & \sum_{j \in \xi^2} \pi_{ij} = p^1_i, \ \forall i \in \xi_1 \\ 
   & \sum_{i \in \xi^1} \pi_{ij} = p^2_j, \ \forall j \in \xi_2.
\end{aligned}
```

That is, calculating the Wasserstein distance amounts to solving a optimal flow problem, which can be done rather efficiently. {numref}`wasserstein_distance` illustrates how calculating $dd(\xi^1, \xi^2)$ can be seem as a transportation problem, where $\xi^1$ has three realisations, and $\xi^2$ has two.

```{figure} ../figures/wasserstein_distance.svg
:name: wasserstein_distance
:align: center

The calculation of the Wasserstein distance for two discrete distributions as an optimal flow problem
```

### Clustering-based methods

Clustering-based methods focus on using a distance metric (typically Wasserstein, but other alternative measures are also possible to be used) to aggregate (or combine) scenarios such that the distance between the scenario trees before and after the aggregation is minimal. 

One example of this is the used of $k$-means clustering, and related variants, that instead of using an Euclidean norm between to choose how elements are distributed among clusters, they utilise the Wasserstein distance. For more details, see, for example {cite}`condeixa2020wasserstein`. This is in fact known to work well in settings where considerable amounts of historical data is available, including the one in focus, which is applying hierarchical clustering to solar, demand, and wind time series.

```{seealso} 
{cite}`kaut2021scenario` provides a comprehensive comparison of alternative methods for generating scenario trees from historical data by selecting data points and attributing weights to them.
```

One alternative type of clustering methods is that proposed in {cite}`lohndorf2016empirical` in which the clustering is done via a competitive learning approach. This iterative approach, combined with a specialised sampling technique, can mitigate issues related to artificially decreased variance as the number of dimensions increase. Figure XXX extracted from {cite}`lohndorf2016empirical` show how the combination competitive learning and stratified sampling can provide a richer representation of the uncertainty (in this case a bivariate log normal vector).

```{figure} ../figures/lohndorf2016.svg
:name: lohndorf2016
:align: center

Comparison of alternative scenario generation methods (source: {cite}`lohndorf2016empirical`)
```

### Scenario reduction

Scenario reduction is a popular framework for generating scenario trees. As the name implies, the main idea is to obtain a scenario tree $\xi^2$ from a original scenario tree $\xi^1$ such that $|\xi^2| < |\xi^1|$. To achieve that, the methods focus on ideas from the theory of stability for stochastic programming problems {cite}`romisch2003stability`, which shows how changes in their solution in case the underlying probability distribution is perturbed. The author shows that this change can be approximated via a Fortet-Mourier-type metric whose calculation can be performed via a Monge-Kantorovich mass transportation problem, which the Wasserstein distance for discrete distributions shown in {eq}`wasserstein_distance` is a special case.

Scenario reduction has seem active development in the 2000's, with not only the development of the theory supporting it, but also computational tools that implemented the methods to a wider audience, which is partially the reason of its widespread success.

```{admonition} Chronology of scenario reduction
:class: note 

1. {cite}`dupavcova2003scenario, heitsch2003scenario` more or less at the same time propose the first version of the back reduction and forward selection methods, which are the two main scenario reduction methods;
2. {cite}`heitsch2007note` then propose additional heuristic improvements to both methods;
3. {cite}`heitsch2009scenario` show that using the original methods would not guarantee representative scenario trees in the case of multistage problems and provide an updated method that can be used for multi-staged scenario trees.
```

There are two types of scenario reduction algorithms, namely *backward reduction* and *forward selection*, with the main diference being whether the reduced scenario tree $|\xi|^2$ is created by subtracting or selecting from the original scenario tree $\xi^1$. In particular, let $K$ be the target value for $|\xi|^2$. Then, the methods proceed as follows:

**Backward reduction**: repeat until $|\xi|^2 = K$, starting from $\xi^2 = \xi^1$:

1. Find the scenario whose removal causes the smallest error increase
2. Remove the scenario and redistribute its probability (via normalisation)

**Forward selection**: repeat until $|\xi|^2 = K$, starting from $\xi^2 = \emptyset$

1. Find the scenario whose inclusion causes the largest error decrease
2. Add the scenario and redistribute its probability (via normalisation)

Both alternative eventually yield a reduced scenario tree. As a general rule, forward selection tend to yiled better results in terms of tree proximity, but tends to be slower when $|\xi^1|$ and/or $K$ is large. 

Scenario reduction has shown to provide positive results as a "out-of-the-box" method for generating scenarios for stochastic programming problems, with very positive results. For example, in {cite}`heitsch2003scenario` the authors show that with tree comprising 50% of the scenarios presented 90% accuracy whilst 1% of the scenarios was already responsible for 50% of accuracy. In addition, the implementation Scenred2 available in GAMS, with interfaces for Python and Julia, has played a prominent role in its popularisation.

{numref}}`scenred` illustrates the results reported in {cite}`oliveira2016framework`, where the authors utilised scenario reduction to generate scenario trees from initial scenario samples of varied sizes. In that, one can see how the number of initial samples ($|\xi^1|$) affect how close the generated tree ($K$ is represented by the shades of blue), while also showing the diminishing benefits of increasing $K$.

```{figure} ../figures/scenred.svg
:name: scenred
:align: center

Numerical results showing the performance of scenario reduction (source {cite}`oliveira2016framework`)
```

## Final remarks on scenario geenration methods

There is no universal scenario generation method that is accepted as the best performing. Indeed, the evidence in the literature is such that the best performing method is considerably dependent on the problem. For example, in {cite}`lohndorf2016empirical` it is clear that moment matching fails short on providing what the authors consider to be a good representation. 

In {cite}`kaut2021scenario` show that scenario reduction is the best performing method while moment matching is a closely following option. In contrast, {cite}`fernandez2018optimizing` compare scenario reduction with a quasi-Monte Carlo strategy, and find the former to perform better than the latter.

```{figure} ../figures/stdev_cost_in.svg
:name: scenred
:align: center
:scale: 150%
```
```{figure} ../figures/stdev_cost_out.svg
:name: scenred
:align: center
:scale: 150%

In- (top) and out-of-sample (bottom) evaluation for three distinct scenario generation methods (source: {cite}`fernandez2018optimizing`)
```


