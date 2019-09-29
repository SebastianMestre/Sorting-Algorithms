# Sorting Algorithms

 - [gapsort](gapsort/index.html)
 - [in-place mergesort](inplacemerge/index.html)
 - [bad double selection sort](lolaso/index.html)
 - [mergesort](malosort/index.html)
 - [A really bad randomized sorting algorithm](maybesort/index.html)
 - [median of array](median/index.html)
 - [a slightly different in-place mergesort](pepesort/index.html)
 - [quicksort](quicksort/index.html)
 - [shellsort](shellsort/index.html)
 - [smoothsort](smoothsort/index.html)
 - [weavesort](weavesort/index.html)

## What is this?

These are some sorting algorithms (and related) visualizations i've made between 2017 and 2019.

Most of them are well-known algorithms (or are not sorting algorithms at all), there are only two original ones: the one I've named "Gapsort", and the one titled "a slightly different in-place mergesort". This last one I discovered by myself some time in 2018; soon after I found a better version of it online and ended up changing up the code somewhat, so what is shown on this repo is not quite what i discovered back then.

More interestingly, I've come to know that my "gapsort" is a variation on a little-studied class of sorting algorithms known as "Library sorts", those being a variant of insertion sorts. I have not done much analysis on the run time complexity of my gapsort, but the literature sugests that a good library sort can be done in O(nlogn), and gapsort is very clearly (empirically determined) less than quadratic.
