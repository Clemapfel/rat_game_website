+++
title = "Choosing initial Cluster Centers for use in RGB Image Segmentation using k-means clustering"
author = "C. Cords"
date = 2021-07-30
draft = false
url = "/post/k-means_heuristic"
layout = "post/single"
categories = ["programming", "crisp"]
images = [""]
+++

# Abstract

TODO

# The Algorithm

First we initialize the cluster centers (how exactly this is done will be explained later)

```cpp
using namespace crisp;

struct Cluster 
{
    Color color_sum;
    size_t n;
    Color mean_color;
}

std::vector<Cluster> clusters;

for (size_t i = 0; i < n_clusters; ++i)
{
    Color color = // heuristically choosen, see below
    clusters.push_back(Cluster{color, 1, color});
}
``` 

Here ``n`` is the number of pixels currently in the cluster, ``color_sum`` is the sum of the rgb color and ``mean_color`` is the current color assigned to the entire cluster. 

We then specify a distance measure, for this variant the euclidian distance in rgb space is sufficient. Quantizing the possible values (remember, our Colors are floating point vectors which each element in the range [0, 1]) aids in performance

```cpp
auto distance = [](Color a, Color b) -> int 
{
    int score = abs(int(a.red() * 255) - int(b.red() * 255)) +
                abs(int(a.green() * 255) - int(b.green() * 255)) +
                abs(int(a.blue() * 255) - int(b.blue() * 255));
                
    return score;
}
```

We quantize the color components to 8-bit and then compute the euclidian distance ommitting the square root and square operations for improved performance as no normalization is necessary. Note that this function will return values in the range of [0, 3*255].

The algorithm is initialized by first allocating the result image. To save on performance we use the image itself as a way to keep track of which pixel is in which clusters. Since the result image is an RGB image we arbitrarily declare the .red() component to be the cluster index (range {0, 1, 2, ..., n_clusters - 1}) while all other components are set to 0. While color components can only be in the range [0, 1] for display, crisp allows you to freely set the values while the images are still in memory. The range is only enforced when binding an image for rendering.

```cpp
ColorImage out; // .r is cluster index
out.create(image.get_size().x(), image.get_size().y(), Color(-1, 0, 0));
```
Now for the algorithm proper, we can think of it in two parts, the first part is the initial iteration. Here we assign each pixel to the cluster nearest to it:

```cpp
for (long x = 0; x < image.get_size().x(); ++x)
for (long y = 0; y < image.get_size().y(); ++y)
{
    auto& pixel = image(x, y);
    
    // find cluster with minimum distance
    int min_distance = std::numeric_limits<int>::max();
    size_t min_cluster_i = -1;

    for (size_t i = 0; i < clusters.size(); ++i)
    {
        // compute mean color of all cluster pixels
        auto current_distance = distance(pixel, clusters.at(i).mean_color);
        if (current_distance < min_distance)
        {
            min_distance = current_distance;
            min_cluster_i = i;
        }
    }
    
    // assign pixel to cluster, .red() component is cluster index
    pixel.red() = min_cluster_i;
}
```
We could end the algorithm right now and we would have a decent segmentation however this relies entirely on the heuristically chosen cluster centers and there is no guruantee the clusters would trend towards optimality. We achieve a decent approximation of this behavior (achieving proper optimality is NP-hard) by iteratively checking each pixel again and if there is a cluster that's a better fit for it, we reassign it. After each iteration, we recompute the current mean cluster color meaning the clusters will change a little each iteration until convergence is achieved.

```cpp
size_t n_changed = -1; 
// number of pixels that changed cluster this iteration

while (n_changed > 0)
{
    n_changed = 0;
    for (long y = 0; y < image.get_size().y(); ++y)
    {
        auto& pixel = image(x, y);
        
        // find cluster with minimum distance
        int min_distance = std::numeric_limits<int>::max();
        size_t min_cluster_i = -1;
    
        for (size_t i = 0; i < clusters.size(); ++i)
        {
            // compute mean color of all cluster pixels
            auto current_distance = distance(pixel, clusters.at(i).mean_color);
            if (current_distance < min_distance)
            {
                min_distance = current_distance;
                min_cluster_i = i;
            }
        }
        
        // get cluster pixel is currently assigned to
        int old_i = pixel.red();
        
        // reassign
        if (old_i != min_cluster_i)
        {
            auto& old_cluster = clusters.at(old_i);
            auto& new_cluster = clusters.at(new_i);
            
            old_cluster.n -= 1;
            old_cluster.color_sum -= pixel;

            new_cluster.n += 1;
            new_cluster.color_sum += pixel;
        }
        // else do nothing
    }
    
    // update clusters
    for (auto& cluster : clusters)
        cluster.mean_color = cluster.color_sum / cluster.n;
}
```
It can be shown [TODO] that if ties (that is two clusters have the exact same distance to a single pixel) are resolved arbitrarily but each pixel is only assigned to one cluster this algorithm will always converge.

[TODO: convergence with images after each cluster]

# The Heuristic
In proper statistics it is common to run the algorithm multiple times with different number of cluster centers. Some even randomize the cluster centers completely and the solution is achieved by testing convergence between different entire runs rather than iterations within the same run. In image segmentation this is not available to us, usually the viewer will a) know how many principal color clusters there are in an image and b) will not have the memory nor time to do multiple executions. This means we basically need to nail it on the first try. 
