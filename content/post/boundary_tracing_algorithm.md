+++
title = "A fast, robust Boundary Tracing and Enumeration Algorithm"
author = "C. Cords"
date = 2021-07-30
draft = false
url = "/post/k-means_heuristic"
layout = "post/single"
categories = ["programming", "crisp"]
images = [""]
+++

# Abstract

Boundaries are very important in image feature description and having a way to numerically represent them in a consistent manner is the only way to build libraries of them for later feature detection. Here I present the algorithm used by ``crisp::ImageRegion`` that transform a set of 4-connected pixel coordinates into the regions boundary. The algorithm runs in amortized o(x + k) where x is the number of pixels in the region and k are the number of boundary pixels. The advantage of the method presented here is that not only is the boundary traced but it allows easy conversion to both freeman chain codes and minimum-perimeter-polygon representation in amortized o(1) and amortized o(m*3) respectively.

# Introduction
A image region M of an Image I is defined as a finite set of pixels that is a subset of an image of size m*n such that the following conditions hold:

+ for any two pixel x in M there is a different pixel x_n such that x and x_n are 8-connected. 
+ M is a subset of I

A boundary can be intuitively described as the outer border of the region that is still a subset of it. Each pixel in the boundary can be approached both from inside M and from the space around M. Formally a boundary K is a set of pixels such that

+ K is a subset of I
+ for any pixel y in K there exists exactly two different pixels y_n1, y_n2 such that y_n1 is 8-connected to y and y_n2 is 8-connected to y but y_n1 is not 8-connexted to y_n2

The latter condition is used to enforce that minimum number of pixels needed to fully represent the boundary. 

TODO image

# Goal

The goal of our algorithm is two-fold: For one we want to isolate all boundary points from M and we then want to enumerate them, meaning we assign each pixel in the boundary one and only one index. For a pixel y_n in K with index n it must hold that

+ y_(n-1) is 8-connected to y_n and y_(n+1) is 8-connected to y_n
+ y_0 is 8-connected to both y_1 and y_(#K-1)

The latter property makes it so our boundary is *circular* which means it can be normalized to be represented independently from the rotation of the region.

The most obvious implementation of an algorithm to do this would be to start at a well-defined pixel p_0 (the left-most, top-most point henceforth) and then check all boundary pixels it's neighbourhood, if another pixel is found we call that one the next one and continue. The problem with this is in an edgecase where the region is not "well-cored", meaning there exists a p in K such that there is no pixel in (M - K) (this is the set-difference) such that p is 8-connected to that pixel. This happens when a region is unpruned and long 1- or 2-pixel thick appendages originate from it. ``crisps`` algorithm treats these edge cases in a consistent and stable way as we will see shortly.

# The Algorthm

## Step 1: find all edge pixels

Let M be the region of pixels, K the boundary. Then
+ A pixel p is in K if and only if it has at least two pixels p_i, p_j in it's neighbourhood such that p_i, p_j are not part of M

I'd like to demonstrate why I use a stronger condition here than usually, technically you could simple check if at least one neighbor isn't part of M, however this causes problems later on:

TODO: image of at least 1 vs at least 2

As we can setting the threshold as one creates redundant pixels, keeping the threshold eliminates this however we now run into a problem in certain edge cases. Consider:

TODO: image of M

If there is a 1-pixel thick negative space protruding into M, the end of the protusion only has one non-M neighbor. If we were to trace the boundary with the trivial algorithm outlined above it would stop there. ``crisps``s algorithm handles this by keeping track of both pixels with threshold 2 and pixels with threshold one. The latter are *candidate pixels*, meaning if possible they should be discarded from the final boundary but if an edge case appears we will use only the pixel that's necessary to make the boundary unbroken. This gives us the first part of the algorithm (pseudocode):

```lua
in: region M

let S,  -- set of guaranteed boundary pixels 
    W   -- set of candidate boundary pixels

for ((x, y) in M) do

    let n_connected = 0
    for (i in {-1, 0, -1}) do
        for (j in {-1, 0, -1}) do
            if (x+i, y+j) in M then 
                n += 1
            end
        end
    end
    
    if (n > 2) then 
        S.insert((x, y))
    else if (n == 1) then
        W.insert((x, y))
    end
end
```
Here we simple iterate through M, count the number of non-M neighbors of each pixel (x, y) and if there are 2 non-M neighbors, we add it to S (the set of *s*trong pixels), if there is 1 non-M neighbor we add it to W (the set of *w*eak pixels). 

# Linking the Edges

We define a direction of a part of the boundary going from (x, y) to (a,b) as such:

```lua
in: pixel (x, y), 
    direction d (int)
out: pixel (a, b)

translate_in_direction = function((x, y), d)
    
    d = d mod 8
    
    -- west
    if (d == 0) 
        return (x-1, y)
    
    -- south west
    else if (d == 1)
        return (x-1, y+1)
    
    -- south
    else if (d == 2)
        return (x, y+1)
    
    -- south east
    else if (d == 3)
        return (x+1, y+1)
    
    -- east
    else if (d == 4)
        return (x+1, y)
    
    -- north
    else if (d == 5)
        return (x+1, y-1)
    
    -- north east
    else if (d == 6)
        return (x+0, y-1)
    
    -- north west
    else if (d == 7)
        return (x-1, y-1)
```

This function maps an integer value in [0, 7] to a direction. It can be best understood as translating (x, y) by 1 pixel into the corresponding direction where the positive x-axis extends to the right and the positive y-axis extends to the bottom (the GLSL standard). This function will be important shortly.

We can now start tracing our boundary. We start at the top-most, left-most point in the set of strong boundary pixels. We then open two vectors, one for the final set of boundary points, one for the direction of the current point. So for a pixel p_i at position i in boundary, ``direction.at(i)`` will be such that ``translate_in_direction(p_(i-1) == p_i``. It basically keeps track of the direction needed to travel from the previous point to this point. We initialize both of these vectors with the top-left point and direction 0 (corresponding to west)

```lua
let directions = {p_0}
let boundary = {0}
``` 



