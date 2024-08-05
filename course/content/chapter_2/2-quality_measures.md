# Quality measures for scenario trees

One crucial aspect related to stochastic programming is that scenario generation plays a significant part in the modelling process. This is a point that is often overlooked in the literature on stochastic programming applications, which has nonnegligible consequences for the quality of the model obtained.

Figure {ref}`SP_flowchart` illustrates how should think about the process of developing stochastic programming models. That diagram highlights the central role that scenario generation has in the process.

(SP_flowchart)=
```{mermaid}
:align: center
:caption: A flowchart representing the modelling process using stochastic programming
%%{ init: { 'flowchart': { 'curve': 'stepAfter' } } }%%

flowchart TB
   id1[Decision process]
   id2[Stochastic process]
   id3[Scenario tree]
   id4[Stochastic programming model]
   id1 --> id3
   id2 --> id3
   id3 --> id4

classDef default fill:white, stroke:black, stroke-width:2px;
```

As such, one common saying related to the stochastic programming model is "garbage in equals garbage out". This refers to the fact that having a sophisticated stochastic programming model, perhaps including many of the features we will discuss in the next chapters, is not enough for one to have a reliable model for analysis. One must, just as carefully, consider whether the quality of the uncertainty representation, as they majorly influence the quality of the solutions obtained. 

(error_and_stability)=
## Error and stability of scenario trees

We are interested in understanding how scenario trees, being an approximation of the stochastic process that is being represented in our stochastic programming model, affect the solutions we obtain from it. There are two measures that one must consider for this purpose:

1. **Error**: scenario trees naturally incorporate an inherent amount of error. On the other hand, measuring this error directly is often impossible.
2. **Stability**: assume, due to some random component in the way we generate scenarios, we have two distinct scenario trees that approximate the same stochastic process. One would expect that, for either scenario tree, the stochastic programming model should return solutions and objective function values that are close. This is what is meant by stability in this context.

Let us define the above more formally. Let $\xi$ be a scenario tree representing the stochastic process $\eta$. Also, let $\mathcal{F}(x \xi) = \mathbb{E}_\xi[F(x,\xi)]$, where, as before,

```{math}
F(x,\xi) = \braces{c^\top x + \mathbb{E}_\xi\brackets{Q(x,\xi)} : Ax = b, \ x ge 0}, 
```

and $Q(x,\xi)$ is our second-stage problem, defined as

```{math}
Q(x, \xi) = \braces{\mini q(\xi)^\top y : W(\xi)y = h(\xi) - T(\xi)x, \ y \ge 0}.
```

We are interested in understanding whether we can safely say that

```{math}
\min_{x} \mathcal{F}(x, \xi) \approx \min_{x} \mathcal{F}(x, \eta).
```

Let us assume that we have multiple scenario trees $\xi_k$, with $k \in [n]$ that were generated to represent $\eta$. These could be, for example, the product of a scenario generation method that relies on sampling. Once we solve a stochastic programming models using $\xi_k$ for some $k$, we have that

```{math}
x_k^* = \arg\min_{x} \mathcal{F}(x, \xi_k).
```

The approximation error, as defined in {cite}`pflug2001scenario`, can be defined as

```{math}
\begin{aligned}
e(\eta, \xi_k) =~ & \mathcal{F}(\arg\min_{x} \mathcal{F}(x, \xi_k), \eta) - \mathcal{F}(\arg\min_{x} \mathcal{F}(x, \eta), \eta) \\
=~ & \mathcal{F}(x_k^\star, \eta) - \min_{x} \mathcal{F}(x, \eta).
\end{aligned}
```

Although useful from an analytical standpoint, the approximation error $e(\eta, \xi_k)$ is not something one can calculate. Notice that our inability to calculate $\min_{x} \mathcal{F}(x, \eta)$ is what motivates the need for generating scenarios in the first place!

As a general rule, we are often not capable of evaluating $\mathcal{F}(x_k^\star, \eta)$ either. However, we can still approximate it by means of Monte Carlo sampling. This will of course induce some measure or error that we will have to keep in "the back of our minds".

## Out-of-sample stability

Under the assumption that we can approximate $\mathcal{F}(x_k^\star, \eta)$, we can perform tests to check for *stability*. To see that, let $x_1^\star$ and $x_2^\star$ be solutions generated from scenario trees $\xi_1$ and $\xi_2$. Then, via Monte Carlo sampling, we can check whether $\mathcal{F}(x_i^\star, \eta) \approx \mathcal{F}(x_2^\star, \eta)$. This is what we mean by *out-of-sample stability*

This essentially allows us to compare solutions directly or to compare scenario-generation methods for sets of trees generated from distinct scenario-generation methods. In essence, we are performing out-of-sample tests, and as such, we can use them to argue whether one scenario tree is more stable than another. Notice that this can be used to help with the definition of the treewidth, i.e., the number of scenarios per stage.

```{admonition} Scenario generation for 2SSP and MSSP
:class: warning
For the sake of simplicity, we defined $\min_{x} \mathcal{F}(x, \xi)$ as a 2SSP, which means that approximating $\mathcal{F}(x_k^\star, \eta)$ amounts to solving the second-stage problem $Q(x_k^\star, \eta_s)$ for each sample $\eta_s$ from $\eta$, which is typically computationally cheap.

In turn, for MSSPs, approximating $\mathcal{F}(x_k^\star, \eta)$ amounts to solve a problem with one stage less than the original MSSP, which may still be considerably difficult and not scale well, which in turn hinders the reliability of the estimate obtained for $\mathcal{F}(x_k^\star, \eta)$.
```

A central result from {cite}`pflug2001scenario` is that, if the approximation error $e(\eta, \xi_k)$ is low, then we should observe stability among scenario trees generated to represent the same stochastic process $\eta$. Formally, we have that

```{math}
e(\eta, \xi_k) \approx 0 \Rightarrow e(\eta, \xi_k) \approx e(\eta, \xi_l) \equiv \mathcal{F}(x_k^\star,\eta) \approx \mathcal{F}(x_l^\star,\eta)
```

This result gives us a way to have some margin of confidence in our scenario generation process and/or the scenario trees generated, as higher measures of stability may be an indication of acceptable error levels. However, notice that the implication does not flow both ways and, as such, stability cannot be taken as a definite certificate of small error. For a more technical treatment of stability, we recommend {cite}`dupavcova1990stability, schultz2000some, heitsch2006stability`

## In-sample stability

Stability can also be thought of from a different perspective. We say that we have *in-sample* stability if we observe that

```{math}
\mathcal{F}(x_k^\star, \xi_k) \approx \mathcal{F}(x_l^\star, \xi_l), \text{ for } k,l = 1,\dots, n : k \neq l.
```

Notice that this measures whether the objective function value is similar when two distinct scenario trees are used. One can also consider it from the perspective of the solutions itself, i.e.,

```{math}
||x_k^\star - x_l^\star||_p \approx 0, \text{ for } k,l = 1,\dots, n : k \neq l.
```

where $|| \cdot ||_p$ is a vector $p$-norm.

There is no direct relationship between in-sample and out-of-sample stability. In-sample stability translates to a measure of confidence we may have in a method that generates scenarios randomly in terms of the objective function reported and the solution obtained.

## Final remarks on stability

As a general rule, the lack of stability, be it in-sample or out-of-sample, implies a *dependence on the scenario tree*, which should be avoided. Lacking stability can be addressed either by increasing the number of scenarios, or more radically, replacing the method with scenario generation altogether. In any case, it is important that one provide analytical evidence of stability when using stochastic programming models to support decision-making.

```{figure} ../figures/scen_stability.svg
:align: center
:name: scen_stability

Computational results for a scenario stability analysis (source: {cite}`dillon2017two`)
```

{numref}`scen_stability` shows an example of a stability analysis performed considering the standard deviation of the objective function values. Notice how, as the number of scenarios increases, the standard deviation decreases, signalling an increased stability. On the other hand, as the number of scenarios increases, so does the computational time to solve it. This is precisely the trade-off between the quality of representation and computational requirements discussed here: {ref}`scenario_tree_shape`.

In some contexts, approximating $\mathcal{F}(x_k^\star, \eta)$ may not be possible via Monte Carlo sampling. For example, this is the case when the second-stage problem is too computationally demanding or we are in a setting with more than 2 stages. In such settings, one may employ *cross-testing* to obtain a measure of stability. 

For that, assume that we generate $n$ scenario trees $\xi_k$ and obtain solutions $x_k^\star$, for $k \in [n]$. Then, let

```{math}
\overline{\mathcal{F}} = \braces{\mathcal{F}(x_k^\star, \xi_l)}_{k,l = 1,\dots, n : k \neq l}.
```

We can verify out-of-sample stability by noticing that it would imply that the standard deviation of $\overline{\mathcal{F}}$ is close to zero.
