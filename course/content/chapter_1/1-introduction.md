---
jupytext:
  cell_metadata_filter: -all
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.1
kernelspec:
  display_name: Julia 1.10.3
  language: julia
  name: julia-1.10
---

# Introduction

We start with the classic example from Birge and Louveaux: the farmer's problem. This is perhaps the most classical example used to discuss the notion of recourse and the interplay between information and decision. Before formalising all these concepts, let's have a close look at the example itself. 

A farmer has 500 acres of land available for raising wheat, corn, and sugar beets. She needs at least 200 tons of wheat and 240 tons of corn for cattle feed. Cattle feed amounts can be raised on the farm or bought from a wholesale market. Sugar beet is raised for profit only. However, production above a 6000 ton quota has a lower sales price. 

```{csv-table} Farmer's problem data
:header: >
: " ", "Wheat", "Corn", "Sugar beets" 
:widths: auto

"Yield (ton/acre")", 2.5, 3, 20 
"Planting cost (\$/acre)", 150, 230, 260
"Selling price (\$/ton)", 170, 150, 36 
"Purchase price (\$/ton)", 238, 210, -
```

In that, we consider the following model
$$
\begin{align}
\min. & f(x) \\ 
&x \in X
\end{align}
$$