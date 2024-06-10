(section:the_farmers_problem)=
# The farmer's problem

We start with the classic example from {cite}`birge2011introduction`: the farmer's problem. This is perhaps the most classical example used to discuss the notion of recourse and the interplay between information and decision. Before formalising all these concepts, let's have a close look at the example itself.

## The deterministic farmers problem

A farmer has 500 acres of land available for raising wheat, corn, and sugar beets. She needs at least 200 tons of wheat and 240 tons of corn for cattle feed. Cattle feed amounts can be raised on the farm or bought from a wholesale market. Sugar beet is raised for profit only. However, production above a 6000 ton quota has a lower sales price. 

:::{table} Farmer's problem data
:name: farmers_data
|                          | **Wheat**       | **Corn**       | **Sugar beets**          |
|--------------------------|-----------------|----------------|--------------------------|
| **Yield (ton/acre)**     | 2.5             | 3              | 20                       |
| **Planting cost ($/acre)** | 150           | 230            | 260                      |
| **Selling price ($/ton)** | 170            | 150            | 36 (under 6000 ton)      |
|                          |                 |                | 10 (above 6000 ton)      |
| **Purchase price ($/ton)** | 238           | 210            | -                        |
:::

The farmer's objective is to maximise its profit, whilst satisfying the cattle feed demand. For that, let $I=\braces{1:\text{wheat}, 2:\text{corn}, 3:\text{sugar beets}}$. Then, we can define the following decision variables:

- $x_i$	- acres devoted to crop $i \in I$;
- $y_i$ - tons of $i$ purchased, $i \in I \setminus \braces{3}$;
- $w_i$ - tons of $i$ sold, $i \in I \cup \braces{4}$, $\braces{4: \text{sugar beets (over quota)}}$.

With that, we can pose the farmer's problem as
```{math}
:label: farmers_deterministic
\begin{aligned}
		\mini & 150x_1 + 230 x_2 + 260 x_3 + 238 y_1 + 210 y_2 \\ & - 170 w_1 - 150 w_2 - 36 w_3 - 10w_4 \\
		\st & x_1 + x_2 + x_3 \le 500 \\
		& 2.5x_1 + y_1 - w_1 \ge 200 \\
		& 3 x_2 + y_2 - w_2 \ge 240 \\
		& w_3 + w_4 \le 20x_3 \\
		& w_3 \le 6000 \\
		& x_i \ge 0, i \in I; y_i \ge 0, i \in I \setminus \braces{3}; w_i \ge 0, i \in I \cup \braces{4}.
\end{aligned}
```

The optimal strategy for the farmer's problem [](farmers_deterministic) is given by

:::{table} Optimal solution considering average yields
:name: farmers_optimal_avg
|                    | **Wheat** | **Corn** | **Sugar beets** |
|--------------------|-----------|----------|-----------------|
| **Surface**        | 120       | 80       | 300             |
| **Yield**          | 300       | 240      | 6000            |
| **Sales**          | 100       | -        | 6000            |
| **Purchase**       | -         | -        | -               |
| **Overall profit:**|           |          | **$118,600**     |
:::

You can notice that there is a straightforward strategy for the farmer to follow:

1. Plant the "just-right" amount of sugar beets to reach the quota;
2. Satisfy the minimum requirements for cattle feed;
3. Plant the remaining land with wheat.

Notice how ths optimal strategy is sensitive to the crop yields per acre planted. As one may suspect, small variations in these numbers can render this strategy not optimal anymore. 

:::{admonition} Strategy vs. policy
:class: note
In our context, the terms strategy and policy have the same meaning: a set of instructions that define a certain course of action.
:::

## Considering multiple scenarios individually

To illustrate what this means, let us consider that crop yields can fluctuate $\pm$ 20% due to climate related factors such as solar incidence and rainfall. The most natural way to take into consideration such variation is to rely on the notion of *scenarios*, which essentially means solving the problem for different inputs (in this case different crop yields) and seeing how the optimal strategy changes.

Let us first consider that our yields are 20% higher than the average values listed in {numref}`farmers_data`. Then our optimal decisions become

:::{table} Optimal solution considering 20% higher yields
:name: farmers_optimal_20+
|                    | **Wheat** | **Corn** | **Sugar beets** |
|--------------------|-----------|----------|-----------------|
| **Surface**        | 183.33    | 66.67    | 250             |
| **Yield**          | 550       | 240      | 6000            |
| **Sales**          | 350       | -        | 6000            |
| **Purchase**       | -         | -        | -               |
| **Overall profit:**|           |          | **$167,667**    |
:::

Notice how in this case, the original strategy still yields the optimal solution. Trivially what changes is that we allocate less land to steps 1 and 2 due to the higher yields, and are left with more land to plant wheat and sell.

Let us now consider the other scenario, in which the yields are instead 20% lower. In this case, we obtain the following optimal solution:

:::{table} Optimal solution considering 20% lower yields
:name: farmers_optimal_20-
|                    | **Wheat** | **Corn** | **Sugar beets** |
|--------------------|-----------|----------|-----------------|
| **Surface**        | 100       | 25       | 375             |
| **Yield**          | 200       | 60       | 6000            |
| **Sales**          | -         | -        | 6000            |
| **Purchase**       | -         | 180      | -               |
| **Overall profit:**|           |          | **$59,950**     |
:::

The results in {numref}`farmers_optimal_20-` show that in this case, our optimal strategy changes in some way. Essentially, we are still following steps 1-3, but we never really reach step 3, as we are left with not enough land to satisfy our cattle feed constraints. As corn is cheaper to buy than wheat, we focus on fulfilling the need for wheat and plant the reminder of the land with corn, complementing it with an amount of 180 tons from the market.

## Considering multiple scenarios at once

Although we can extract a logic on how to proceed, one may notice that our strategy has a fundamental flaw: it depends on *knowing what would be the yields* so we can plan the exact amount of acres that will yield 6000 tons of sugar beets. Clearly, it the yields are truly uncertain, we must design a strategy that can perform well *regardless* of the observed yield.

One way to look at this issue is to consider a long-term perspective. That is, we assume that 

1. each year, one of these scenarios will happen;
2. we assume then to be equally likely to realise, but exactly which will happen we cannot know;
3. we are interested in maximising the farmer's expected profit, whick is akin to maximising the long-run profit of the farm.

To formulate the farmer's problem as such, we must first define a set of yield scenarios $S = \braces{1: \text{-20\%}, 2: \text{avg.}, 3:\text{+20\%}}$. Then, we have to separate the set of variables that must be decided such that their values are the same regardless of the observed scenario and those who can have their value decided once the uncertainty is observed. In our case, the former are the land allocation decisions, while the latter are the purchase and sales decisions. Thus, our decision variables are redefined as

- $x_i$	- acres devoted to crop $i \in I$;
- $y_{is}$ - tons of $i$ purchased in scenario $s$, $i \in I \setminus \braces{3}$, $s \in S$;
- $w_{is}$ - tons of $i$ sold, $i \in I \cup \braces{4}$, $\braces{4: \text{sugar beets (over quota)}}, $s \in S$.

Finally, our reformulated model becomes

:::{math}
:label: farmers_stochastic
\begin{aligned}
    \mini & 150x_1 + 230 x_2 + 260 x_3 +~ \\
    & \frac{1}{3} (238 y_{11} + 210 y_{21} - 170 w_{11} - 150 w_{21} - 36 w_{31} - 10w_{41})\\
    & \frac{1}{3} (238 y_{12} + 210 y_{22} - 170 w_{12} - 150 w_{22} - 36 w_{32} - 10w_{42})\\
    & \frac{1}{3} (238 y_{13} + 210 y_{23} - 170 w_{13} - 150 w_{23} - 36 w_{33} - 10w_{43})\\
    \text{s.t.:~} & x_1 + x_2 + x_3 \le 500 \\
    &2x_1 + y_{11} - w_{11} \ge 200, \ 2.5x_1 + y_{12} - w_{12} \ge 200, \ 3x_1 + y_{13} - w_{13} \ge 200 \\
    & 2.4 x_2 + y_{21} - w_{21} \ge 240, \ 3 x_2 + y_{22} - w_{22} \ge 240, \ 3.6 x_2 + y_{23} - w_{23} \ge 240 \\
    & w_{31} + w_{41} \le 16x_3, \ w_{32} + w_{42} \le 20x_3, \ w_{33} + w_{43} \le 24x_3 \\
    & w_{31} \le 6000, w_{32} \le 6000, w_{33} \le 6000 \\
    & x_i \ge 0, i \in I; y_{is} \ge 0, i \in I \setminus \braces{3}, s \in S; w_{is} \ge 0, i \in I \cup \braces{4}, s \in S.
\end{aligned}
:::

The optimal solution to {eq}`farmers_stochastic` is given by

:::{table} Optimal solution considering the three scenarios simultaneously
:name: farmers_optimal_2ssp
|      |               | **Wheat** | **Corn** | **Sugar beets** |
|------|---------------|-----------|----------|-----------------|
|      | **Surface**   | 170       | 80       | 250             |
|------|---------------|-----------|----------|-----------------|
| $s=1$| **Yield**     | 340       | 192      | 4000            |
|      | **Sales**     | 140       | -        | 4000            |
|      | **Purchase**  | -         | 48       | -               |
|------|---------------|-----------|----------|-----------------|
| $s=2$| **Yield**     | 422       | 240      | 5000            |
|      | **Sales**     | 225       | -        | 5000            |
|      | **Purchase**  | -         | -        | -               |
|------|---------------|-----------|----------|-----------------|
| $s=3$| **Yield**     | 510       | 288      | 6000            |
|      | **Sales**     | 310       | 48       | 6000            |
|      | **Purchase**  | -         | -        | -               |
|------|---------------|-----------|----------|-----------------|
|      | **Overall profit:** |           |          | **$108,390**    |
:::

Notice that this model has a few remarkable features. First of all, notice that by considering all scenarios *simultaneously* and marking some decisions to be scenario-dependent while others are not, the farmer is effectively exploiting the *timing* making decisions and observing the realisation of the uncertainties.

:::{admonition} Non-anticipativity and temporal causality
:class: note
In this simple example, having variables that depend on the scenarios imply that they are decided with the knowledge from observing the uncertainty revelation.

In contrast, variables that do not depend on the scenarios are implicitly decided without knowing which realisation occured. In other words, they cannot anticipate the uncertainty, thus satisfying temporal causality.
:::

Moreover, the farmer's land allocation decisions are such that they are *hedging* against the fact that, ultimately, the farmer cannot know which scenario will indeed occur. Naturally, this hedging comes with a "price" that is paid in comparison to the setting where th farmer can perfectly match the land allocation to the crop yields.

Effectively, this encoding of the dynamics between decision-making and uncertainty observations is the one of the main focus of *stochastic programming*, i.e., how to incorporate within the model the notion of sequential decisions which are made prior or after information about the uncertainty becomes available.

%TODO: Include diagram with the farmers's first and second stge decisions.