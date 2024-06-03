# Quality measures for scenario trees

One crucial aspect related to stochastic programming is that scenario generation plays a significant part of the modelling process. This is a point that is often overlooked in the literature on stochastic programming applications, which has nonnegligible consequences to the quality of the model obtained.

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
````

As such, one common saying related to stochastic programming model is "garbage in equals garbage out". This refers to the fact that, having a sophisticated stochastic programming model, perhaps including many of the features we will discuss in the next chapters, is not enough for one to have a reliable model for analyses. One must, just as carefully, consider whether the quality of the uncertainty representation, as they majorly influence the quality of the solutions obtained. 

## Error and stability of scenario trees

There are two measures that one must consider when generating scenario trees:

1. Error: scenario trees naturally encode an inherent amount of error, as they are *approximations* of the a stochastic process. On the other hand, 
2. Stability





