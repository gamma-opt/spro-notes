# Chance constraints

## Modelling risk in stochastic programming

Stochastic programming models as posed so far disregard feasibility considerations whilst assuming that solutions must be such that feasibility is attained (relatively complete recourse) for all scenarios. This may turn to be both too simplistic and too strict, in particular in settings where reliability issues security concerns must be taken into account.

We will consider a few alternatives to address this, which are in many ways interconnected. These modelling techniques will serve to augment our capabilities in representing the decision makers perspective regarding how the uncertainty must be taken into account.

## Chance constraints

The first alternative is related to the *feasibility* of solutions, and how we approach feasibility from a probabilistic setting. Essentially, we are interested in developing a model that can offer a probabilistic certificate to feasibility.

There are two main paradigms for modelling feasibility requirements. Let us consider the constraint

```{math}
:label: static_eq
T(\xi) x = h(\xi), \ \forall \xi \in \Xi.
```

The first alternative is to impose that we require {eq}`static_eq` to be feasible for any realisation of $\xi$ within a set of realisations $U \subseteq \Xi$. This is strongly tied with the notion of robust optimisation and, as such, we will put on hold and discuss at a later moment in these notes.

The other consists of enforcing that the *probability* of {eq}`static_eq` holding is at least a given threshold. Probabilistic constraints as such are often called *chance constraints* in the stochastic programming literature.

```{admonition} Static models
:class: note

Notice that we pose a model with no recourse decisions. These models are known (in particular in the robust optimisation literature) as static models.
```

%TODO: Can we say more about the methodological support that exists for 2-stage CC models?

Chance constraints can be found in two distinct formats. To see that, let us first define $T(\xi)$ to be a $m_2 \times n_1$ matrix, where $T(\xi)_i$ represents its $i^\th$ row and $h(\xi)$ is a $m_2$ vector with components $h(\xi)_i$.

Chance constraints can be posed individually, as

```{math}
p_i(x) = \mathbb{P}(T(\xi)_i ^\top x = h(\xi)_i) \ge \alpha_i, \ \forall i \in [m_2].
```

Notice that they are individual in the sense that the probability requirement is posed on each of the constraints $i \in [m_2]$.

A more natural way to pose these probability requirements is to consider them *jointly*, that is, to pose the chance constraint as 

```{math}
:label: JCC
p(x) = \mathbb{P}(T(\xi)_i ^\top x = h(\xi)_i, \ \forall i \in [m_2]) \ge \alpha_i.
```

Notice that in this case, there is no differentiation regarding which constraints are required to be feasible. Instead, feasibility is seen as a general concept (and arguably more natural) perspective.

Although the difference may seem subtle from a formulation standpoint, it turns out that joint chance constraints such as {eq}`JCC` are typically challenging regarding their numerical tractability. 

### Tractability of chance constraints

One way to circumvent this issue is to rely on *Bonferroni's inequality*, which allows us to approximate joint chance constraints via individual chance constraints. In particular, applying the suitable variant of Bonferroni's inequality, we can see that, for a given $x$, if $p_i(x) > \alpha, \forall i \in [m_2]$, where $\alpha_i$, for each $i \in  [m_2]$ is set to

```{math}
\alpha_i = 1 - \frac{1-\alpha}{m_2}
```

then, we have that $p(x) \ge \alpha$. Of course, for this to be a feasible alternative, we must have that the original individual chance constraint is tractable.

These tractability issues associated with chance constraints stem from the geometrical properties of the feasibility sets they yield. More formally, let

```{math}
\begin{align*}
		& C(\alpha_1, \dots, \alpha_{m_2}) := \bigcap_{i \in [m_2]} = C_i(\alpha_i), \text{ where } \\
		& C_i(\alpha_i) = \braces{x \in \reals^n : p_i(x) \ge \alpha_i}.
	\end{align*}
```

A crucial issue is that the convexity of $C_i(\alpha_i)$ (and consequently, the convexity of $C(\alpha_1, \dots, \alpha_{m_2})$)is not generally guaranteed, precluding the use of efficient convex optimisation methods.

However, there are some particular cases in which the convexity of $C(\alpha_1, \dots, \alpha_{m_2})$ can be asserted. For example, assume that $T(\xi) = T, \forall \xi \in \Xi$, i.e., that the matrix $T$ is not uncertain. Also, assume that $h(\xi) = \xi$. Then, for the univariate case, we have that

```{math}
C(\alpha) = \braces{x \in \reals^{n_1} :  Tx \ge F^{-1}(\alpha)}.
```

which yields a convex feasibility set.

For the multivariate case, Theorem {prf:ref}`multi-variate-convexity` provides a general well-known convexity result.

```{prf:theorem}
:label: multi-variate-convexity
Let $T(\xi) = T$, $\forall \xi \in \Xi$, and $h(\xi) = \xi$, where $\xi \in \reals^{m_2}$ is a random vector with density function $f$. If $\log(f)$ is concave (assuming $\log(0) = -\infty$), then $C(\alpha)$ is closed and convex for all $\alpha \in [0,1]$.
```

The most frequent setting in which this is a useful result is the setting where $\xi$ follows a normal distribution with vector mean $\mu$ and covariance matrix $\Sigma$. However, the result can be extended to a wider set of probability distributions. {cite}`nemirovski2007convex` present a comprehensive analysis of other probability distributions that yield convex representations.

Another tractable known case is when we assume a single constraint with multiple random coefficients. Let $T(\xi)$ be a $1 \times n$ random vector and let us assume that $h(\xi) = h$, $\forall \xi \in \Xi$. Theorem {prf:ref}`multi-variate-convexity-2` provides a convex reformulation for the chance constraint.

```{prf:theorem}
:label: multi-variate-convexity-2
Assume that $T(\xi) = \xi = (\xi_i)_i=1^{n_1}$ is the only random parameter, where $\xi \sim \text{Normal}(\mu, \Sigma)$ with $\mu = (\mu_i)_{i=1}^{n_1}$ a vector of means and $\Sigma$ the covariance matrix. Then
$$
    C(\alpha) = \braces{x \in \reals^{n_1} : \mu^\top x \ge h + \Phi^{-1}(\alpha)\sqrt{x^\top \Sigma x}}
$$
```

```{prf:proof}
The random variable $\xi^\top x$ is a multivariate normal with mean $\mu^\top x$ and variance $x^\top\Sigma x$. Letting $Z$ follow a standard normal, we have that
\begin{align*} 
    \mathbb{P}(\xi^\top x \ge h) \ge \alpha & \Leftrightarrow \mathbb{P}\left(\frac{\xi^\top x - \mu ^\top x}{\sqrt{x^\top \Sigma x}} \ge \frac{h^\top x - \mu ^\top x}{\sqrt{x^\top \Sigma x}} \right) \ge \alpha \\
    & \Leftrightarrow 1 - \mathbb{P}\left( Z \le \frac{h - \mu ^\top x}{\sqrt{x^\top \Sigma x}} \right) \ge \alpha	\\
    & \Leftrightarrow 1 - \Phi\left(\frac{h - \mu ^\top x}{\sqrt{x^\top \Sigma x}} \right)	\ge \alpha \\
    & \Leftrightarrow \Phi\left(\frac{\mu ^\top x - h}{\sqrt{x^\top \Sigma x}} \right)	\ge \alpha\\
    & \Leftrightarrow \frac{\mu ^\top x - h}{\sqrt{x^\top \Sigma x}} \ge \Phi^{-1}(\alpha) \Leftrightarrow \mu^\top x \ge h + \Phi^{-1}(\alpha)\sqrt{x^\top \Sigma x}.
\end{align*}
Notice that the constraint is convex if $\Phi^{-1}(\alpha) \ge 0$, i.e., $\alpha \in [1/2, 1]$.    
```

### Using scenarios with chance constraints

All of the tractability issues previously discussed stem from the challenging analytical nature of the probability distribution functions.

However, once a scenario representation is available, as it is typically the case in stochastic programming settings, convexity becomes a given, provided that the original problem is convex.

This more general setting enables the consideration of much more sophisticated settings when it comes to modelling uncertainty, including the incorporation of stages. However, one key disadvantage is that these scenario-based chance constraint formulations require the employment of additional binary variables.

Let us start posing our standard formulation for a two-stage stochastic programming model with recourse in its deterministic equivalent form:

```{math}
:label: 2SSP-DE
\begin{align*}
    \mini  & c^\top x + \sum_{s\in S} P_s q_s^\top y_s \\
    \st	   & Ax = b, x \ge 0 \\
            & T_sx + W_s y_s = h_s, \ \forall s \in S \\
            & y_s \ge 0, \ \forall s \in S.
\end{align*}
```

Let $v_s \in \braces{0,1}$, $u_s \in \reals$ and $\forall s \in S$ be auxiliary variables, and $M$ be a sufficiently large (big-M) value. Assume that we want to impose that the second-stage problem is feasible with probability $\alpha$ (or is infeasible with probability $1-\alpha$). Then, we can model the chance-constrained version of {eq}`2SSP-DE` as

```{math}
\begin{align}
\mini  & c^\top x + \sum_{s\in S} P_s q_s^\top y_s \\
\st	   & Ax = b \\
        & T_sx + W_s y_s = h_s + u_s, \ \forall s \in S \\
        & |u_s| \le Mv_s, \ \forall s \in S  \label{eq:cc_scenario_1}\\ 
        & \sum_{s \in S} P_s v_s \le 1-\alpha \label{eq:cc_scenario_2} \\
        & x \ge 0 \\
        & y_s \ge 0, u_s \in \reals, v_s \in \braces{0,1}  \ \forall s \in S,
\end{align}
```

Notice how the formulation operates. For each scenario $s \in S$, the auxiliary variable $u_s$ captures the deviation between the left- and right-hand sides of constraint $T_sx + W_s y_s = h_s + u_s$. In turn, if $u_s$ takes a value different than zero this activates the binary variable $v_s$. The accumulated probability of all infeasible scenarios is then bounded to be $1- \alpha$.

Some final remarks about this formulation. First, recall that absolute values can be trivially linearised. Also, if the constraint is instead an inequality, one can discard the absolute value altogether and consider only nonnegative deviations.

The term $\sum_{s \in S} P_s v_s \le 1-\alpha$ provides the infeasibility probability, which can be calculated thanks to the additional $|S|$ binary variables. For a larger number of scenarios, this may be a computational hindrance. One variant of this formulation, known as *integrated chance constraints*, imposes limits to the expected amount of infeasibility, i.e., the value of variables $u_s$ (or their absolute value, for equality constraints), $\forall s \in S$. Then, one can use it instead

```{math}
\sum_{s \in S} P_s u_s \le \beta,
```

where $\beta$ is a limit on the expected amount of constraint violation (or infeasiblity).
