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

# Multi-stage stochastic programming (MSSP) problems

Now that we have clear understanding of the structure of two-stage stochastic programming problems, we can generalise the idea for an arbitrary number of stages. 

Having multiple stages in an stochastic programming model allows for realistically model nonanticipativity (temporal causality) and how information about uncertainty gradually unveils. This is particularly important in settings where problems have multiple decision points in time, meaning that decisions are made in particular sequence that at each decision point more information is revealed.

%TODO: Diagram showing multiple stage decisions

From the diagram above, one key feature regarding multi-stage stochastic programming (MSSP) problems becomes evident: they are essentially *nested* 2SSPs. This
