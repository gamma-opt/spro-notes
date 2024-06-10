# Sample average approximation

Sample average approximation (SAA) can be seen as an alternative generating scenario by employing a specialised method. Rather, we utilise Monte Carlo sampling to obtain scenarios. By repeatedly doing so, we can approximate the objective function value associated with the true stochastic process $\eta$.

The method was first analysed in the context of stochastic programming models in {cite}`shapiro1998simulation`, who provided techniques to bound the objective function value by means of Monte Carlo sampling. Since then, it has become a standard approah in the context of practical applications of stochastic programming models, in particular because it is a useful for dealing with problems with too large scenario trees or continuous stochastic processes.

When employing SAA, we are taking an alternative approach in which, instead of solving one single problem considering $|\xi|$ scenarios (or $\eta$, assuming $\eta$ discrete and finite), we solve multiple $M$ problems, each with scenario trees of size $N << |\xi|$.

```{figure} ../figures/SAA-scheme.drawio.svg
:align: center
:scale: 100%

Schematic representation of SAA
```

```{note}
The theory of SAA is, albeit more recent, also well developed for MSSPs. We focus on the 2SSP for the simplicity of exposition. 
```

## How SAA works

SAA is based on the law of large numbers (LLN) and the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem) (CLT), and as such is based on estimating *bounds* for the objective function value using mean values and associated *confidence intervals*

Let us first define a more compact notation, which will help us in this setting. For that, let us assume that $\xi$ is the scenario tree that we would like to solve our problem with. That is, $\xi$ perfectly describe $\eta$ or is has all possible realisations the uncertainty can attain, but is intractable, motivating the use of SAA. With that in mind, let

```{math}
f(x) = \mathbb{E}_\xi\brackets{F(x, \xi)}
```

where, as before, $F(x,\xi) = \braces{c^\top x + Q(x,\xi) : x \in X}$, $X=\braces{x \in \reals^n : Ax = b, x \ge 0}$, and $Q(x, \xi) = \mini_y \braces{q(\xi)^\top y : W(\xi)y = h(\xi) - T(\xi)x, y \ge 0}$.

```{note}
Notice that $f(x) \equiv \mathcal{F}(x, \xi)$. This is just a notation convenience, as before we wanted to expose the dependence of the problem to an alternative scenario tree, say $\xi^k$ and the associated $\mathcal{F}(x, \xi^k)$, whilst in the context of SAA we assume that we want to approximate $\mathcal{F}(x, \eta)$ and use $\xi$ and $\eta$ interchangeably.

```

## Calculating a lower bound

Let us define as $N$ the number of samples we draw from our original stochastic process $\eta$, forming a set of sampled scenarios (or scenario tree) $\xi = \braces{\xi_1, \dots, \xi_N}$. Given $\xi$, we can solve the sample-based approximation problem

```{math}
:label: SAA_problem

 \hat{z}_N = \min_x \braces{\tilde{f}_N(x) = \frac{1}{N}\sum_{n=1}^N F(x,\xi_n)}.
```

A first important point to be made is that $\tilde{f}_N(x)$ is an unbiased estimator for $f(x)$. To see that, it suffices to notice that

```{math}
\mathbb{E}_\xi\brackets{\tilde{f}_N(x)} = \frac{1}{N}\mathbb{E}_\xi\brackets{\sum_{n=1}^N F(x,\xi_n)} \xrightarrow{LLN} \frac{1}{N} (Nf(x)) = f(x).
```

````{admonition} Law of large numbers (LLN)
:class: note

The result from the law of large numbers (LLN) we are using is that, for a i.i.d random variable $X$ with mean value $\overline{X}$, we have that  
```{math}
\lim_{N \rightarrow \infty} \mathbb{E}\brackets{\frac{\sum_{n=1}^N X_n}{N}} = \frac{N \overline{X}}{N} = \overline{X}.
```
````

Let us now show how $\mathbb{E}\brackets{\hat{z}_N}$ is a lower bound for $z$.

```{math}
\begin{aligned}
\hat{z}_N = \min_x \braces{\frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n)} \le& \frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n) \\
   \mathbb{E}_\xi\brackets{\min_x \braces{\frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n)}} \le&  \mathbb{E}_\xi\brackets{\frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n)} \\
   \mathbb{E}_\xi\brackets{\hat{z}_N} \le&  \mathbb{E}_\xi\brackets{\frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n)} \\ 
   \mathbb{E}_\xi\brackets{\hat{z}_N} \le& \min_x \braces{\mathbb{E}_\xi\brackets{\frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n)}} \xrightarrow{N \rightarrow \infty} \\ 
   & \min_x \braces{\mathbb{E}_\xi\brackets{F(x,\xi)}} = \min_x f(x) = z.
\end{aligned}       
```

The first relation is simply the definition of a the minimum $x$. Next, we have the calculation of expectations on both sides, which preserves the inequality and leads to the next relation merely restating the definition of $\hat{z}_N$ inside the expectation. Next, we use the fact that if the inequality holds for all $x$, then it must hold for the minimum $x$. The last part missing is to use LLN to argue that, as $N \rightarrow \infty$, $\frac{1}{N}\sum_{n=1}^N F(x, \xi_n) \rightarrow F(x, \xi) \equiv f(x) = z$. Now, going back on the relations we stated, we notice that we arrived at $\mathbb{E}\brackets{\hat{z}_N} \le z$, thus proving that $\mathbb{E}\brackets{\hat{z}_N}$ is a lower bound for $z$.

Although we cannot directly calculate $\mathbb{E}\brackets{\hat{z}_N}$ (as we would need $N \rightarrow \infty$), we can approximate it using a sample estimate. This entails:

1. We start by sampling $M$ scenario trees of size $N$: $\braces{\xi_1^1,\dots,\xi_N^1}, \dots, \braces{\xi_1^M,\dots,\xi_N^M}$.
2. Then, for each of the scenario trees $m \in M$, solve the problem

   ```{math}
      \hat{z}^m_N = \min_x\braces{\frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n^m)}.
   ```

3. We can estimate $\mathbb{E}\brackets{\hat{z}_N}$ as

   ```{math}
      L_N^M = \frac{1}{M} \sum_{m=1}^M \hat{z}^m_N.
   ```

As before, notice that $L_N^M$ is a unbiased estimator (you can use the same LLN trick as before) for $\mathbb{E}\brackets{\hat{z}_N}$. Now, since $L_N^M$ provides estimates, we can use the CLT to provide confidence intervals to them. For that, we need a sample estimate for the variance $\sigma^2_{L_N^M}$, which can be obtained as

```{math}
   s^2_{L_N^M} = \frac{1}{M-1}\sum_{m=1}^M (\hat{z}^m_N - L_N^M)^2.
```

We can then use $s^2_{L_N^M}$ to obtain a 1-$\alpha$ confidence interval for $L_N^M$, which is given by

```{math}
\brackets{L_N^M - \frac{z_{\alpha/2} s_{L_N^M}}{\sqrt{M}}, L_N^M + \frac{z_{\alpha/2} s_{L_N^M}}{\sqrt{M}}}
```

where $z_{\alpha/2}$ is the standard normal $1-\alpha/2$ quantile.

## Calculating upper bounds

Let us first define the solution we obtain from {eq}`SAA_problem` as

```{math}
   \hat{x}^m_N = \argmin_x\braces{\frac{1}{N}\sum_{n=1}^{N}F(x, \xi_n^m)}, \ \forall m \in [M].
```

Under the assumption of relatively complete recourse, we have that $z \le f(\hat{x}^m_N), \forall m \in [M]$. Thus, the only thing we need to do is

1. choose one of the solutions $\hat{x}^{m'}_N$, with $m' \in [M]$
2. sample $T$ scenario trees of size $\overline{N}$: $\braces{\xi_1^1, \dots \xi_{\overline{N}}^1}, \dots, \braces{\xi_1^T, \dots \xi_{\overline{N}}^T}$
3. for each scenario tree $t \in T$, we solve the problem  

```{math}
   \check{z}_{\overline{N}}^t = \frac{1}{\overline{N}} \sum_{n=1}^{\overline{N}} F(\hat{x}^{m'}_N, \xi_n^t)
```

4. we can finally estimate $f(\hat{x}^m_N)$ as

```{math}
   U_{\overline{N}}^T = \frac{1}{T} \sum_{t=1}^T \check{z}_{\overline{N}}^t.
```

Analogously, as $U_{\overline{N}}^T$ provides estimate for $f(\hat{x}^m_N)$, we can use the CLT to calculate a confidence interval for it. Once again, we start by calculating the sample estimate for the variance of $U_{\overline{N}}^T$, given by

```{math}
   s^2_{U_{\overline{N}}^T} = \frac{1}{T-1}	\sum_{t=1}^T (\check{z}_{\overline{N}}^t - U_{\overline{N}}^T)^2,
```

to calculate a 1-$\alpha$ confidence interval for $U_{\overline{N}}^T$, given by

```{math}
   \brackets{U_{\overline{N}}^T - \frac{z_{\alpha/2} s_{U_{\overline{N}}^T}}{\sqrt{T}}, U_{\overline{N}}^T + \frac{z_{\alpha/2} s_{U_{\overline{N}}^T}}{\sqrt{T}}}.
```


```{admonition} Similarities between out-of-sample stability and SAA upper bounding
:class: note

When performing a out-of-sample analysis, we use Monte Carlo sampling to evaluate the sample mean and variance of $f(x^k)$ for a solution $x^k = \arg\min F(x, \xi^k)$ using a scenario tree $\xi^k$. SAA upper bounding is precisely the same thing, assuming that $\xi^k$ is the sample $m'$ of $N$ and $x^k$ is $\hat{x}^{m'}_N$.  
```

## Estimating optimality gaps

In possession of estimates for upper and lower bounds on $z$, it is natural to consider how we can use then to estimate of how far away from the true optimal $z$ we may be. In this context, *optimality gap* refers to the quantity of interest

```{math}
   f(\hat{x}^{m'}_N) - z.
```

From our developments up to this point, we have concluded that

```{math}
   \mathbb{E}\brackets{\hat{z}_N} \le z \le f(\hat{x}^{m'}_N),
```

and have developed estimates for $\mathbb{E}\brackets{\hat{z}_N}$ ($L_N^M$) and $f(\hat{x}^{m'}_N)$ ($U_{\overline{N}}^T$). Thus, we can calculate an estimate for the optimality gap as 

```{math}
   gap(N,M,\overline{N},T) = U_{\overline{N}}^T - L_N^M.
```

Moreover, just as before, we can calculate a confidence interval for $gap(N,M,\overline{N},T)$ using

```{math}
   \sigma^2_{gap(N,M,\overline{N},T)} = s^2_{L_N^M} + s^2_{U_{\overline{N}}^T}.
```

A word of caution though: unfortunately $gap(N,M,\overline{N},T)$ is a biased estimator, which is not too difficult to see, since

```{math}
   f(\hat{x}^{m'}_N) - \mathbb{E}\brackets{\hat{z}_N} \ge f(\hat{x}^{m'}_N) - z.
```

Although it does bear consequences on some particular cases (for example, using this as a stopping criterion in an algorithm), in practice this bias is not as worrisome, since $gap(N,M,\overline{N},T)$ *overestimates* $f(\hat{x}^{m'}_N) - z$. Thus, the only issue is that the true optimality gap my be smaller than the one we are estimating, which is a positive thing.

Another issue associated with $gap(N,M,\overline{N},T)$ is its dependency on the sample-estimated variance of both $L_N^M$ and $U_{\overline{N}}^T$, which lead to significantly wide confidence intervals. To mitigate this, one can consider trying to reduce the sample variances, i.e.,:

1. reduce $s^2_{L_N^M}$, via increasing $N$ and $M$;
2. reduce $s^2_{U_{\overline{N}}^T}$ by increasing $\overline{N}$ and $T$.

There are some trade-offs that must be observes when trying to reduce variance.For example, larger $N$ leads to larger problems, but they can be solved as $M$ parallel problems. In turn, larger $\overline{N}$ leads to more costly evaluation,bout are solvable as $T$ (as $\overline{N} \times T$ for 2SSPs) parallel problems.

## Final remarks

Designing an efficient SAA approach to a stochastic programming problem requires a a few design choices that may considerably affect the quality of the solution and bounds obtained.

One important decision is the *choice of the solution* $\hat{x}^{m'}_N$. If computationally feasible, ideally one would evaluate all distinct solutions $\hat{x}^{m}_N$ for $m \in \brackets{M}$ and choose that with best $L_N^M$, $U_{\overline{N}}^T$ or $gap(N,M,\overline{N},T)$. However, often this is not possible, and many authors opt to choose the solution that has the highest lower bound $L_N^M$.

Of the parameters that must be set, $N$, i.e., the number of scenarios in each scenario tree for calculating the lower bound estimate $L_N^M$, is possibly the most critical. Ideally, one would prefer to have $N$ small, as it bears the most strain to the computational requirements. However, a too small $N$ may lead to too many distinct solutions $\hat{x}^{m}_N$, $m \in [M]$, which is an indication of lack ofg stability. The previosuly discussed ideas relating to {ref}`error_and_stability` also apply to the definition of $N$.

One powerful idea that can be combined with SAA with beneficial consequences is the use of nonindependent sampling schemes, such as Latin hypercube sampling or any other quasi-Monte Carlo Sampling, to which CLT results are also known. 

Another idea for estimating $N$ is proposed in {cite}`oliveira2012optimization`. First, notice that $\hat{z}_N$ is the expected value of the random variable

```{math}
z_N(\xi) = F(\hat{x}_N, \xi), \text { where } \hat{x}_N = \argmin_x \braces{\frac{1}{N}\sum_{n=1}^N F(x,\xi_n)}.
```

Being so, we can just the same estimate confidence intervals using a sample-based variance

```{math}
s_N^2 = \frac{1}{N-1}\sum_{n=1}^N (\hat{z}_N - z_N(\xi_n))^2
```

and associated confidence interval

```{math}
\brackets{\hat{z}_N - \frac{z_{\alpha/2} s_N}{\sqrt{N}}, \hat{z}_N + \frac{z_{\alpha/2} s_N}{\sqrt{N}}}.
```

If we predefine a desired relative width for the confidence interval, say $\beta$, we can use it to infer that

```{math}
N \ge \left(\frac{z_{\alpha/2}s_N}{(\beta/2)\hat{z}_N}\right)^2,
```

giving us an approximation for the minimal value $N$ must attain. 

