+++
title = "A fast, robust Boundary Tracing and Enumeration Algorithm"
author = "C. Cords"
date = 2021-07-30
draft = false
url = "/post/boundary_tracing_algorithm"
layout = "post/single"
categories = ["programming", "crisp"]
images = [""]
+++

# Abstract

Boundaries are central to many field in image processing and having a way to numerically represent them is the only way to build libraries of them for later feature detection. Here I present the algorithm used by ``crisp::ImageRegion`` that extracts from a region consisting of a set of 4 (8)-connected pixel coordinates all it's outer boundary points and enumerates them in a deterministic manner. The region has to fullfill no further constraints. The algorithm runs in amortized o(x + k) where x is the number of pixels in the region and k are the number of boundary pixels. The advantage of the method presented here is not only a robustness to common edge cases making user-input minimal but that both the freeman-chain codes and the minimum-vertex boundary polygon can be extracted at the end of the algorithm in o(1).

[(skip to source code)](#The Algorithm)

# Introduction

Boundary tracing it such an elemental task in image processing because boundaries are one of the best features to classify and many other features descriptors work as a function of boundary. Crisp for example uses the fourier transform of a boundary converted onto the complex plane (such that each vertices x position is the real, y position the complex part respectively) for boundary simplification and when I went to consult the literature I was frustrated that many of the common algorithms don't fullfill the following two demands I somewhat arbitrarily set myself:

+ **i) the algorithm should work on all closed regions, no exceptions**
  Common assumptions algorithms make are "let the region be simply connected" or "let the region boundary be non-overlapping". I want crisps algorithm to be able to handle all of these with not further user interaction, indeed the only assertion ``crisp`` makes is that the region is closed and connected which for image-processing purposes is an assumption that's made for all common segmentation algorithms anyway. If the region is not connected you can simply decompose them into connected segments, then the boundary of the original non-connected region is the union of the boundary of all segments
  
+ **ii) the resulting boundary should have the minimum number of points necessary to represent the region with no loss of detail**
  To build a library of boundaries you need to transform them and that transformation should be as computationally as possible and ``crisp`` achieves this by returning the boundary polygon, a set of ordeted vertices that when connected are *identical* to the set of boundary points. 
  
+ **iii) the resulting order of boundary points should be circular, consistent and predictable**
it is not difficult to isolate the set of boundary points from a region, however we want those points to have a strong order that makes sense to both humans and computers. ``crisp`` wants the vertex to orderd in the counter-clockwise with the position x-axis advancing to the east and the positive y-axis advancing south in 2d space. This order being consistent means for two sets such that the intersection of the two is empty, the algorithm should return two boundary point sequences that are identical. Circularity means that if we index the points with i = 0 ... N then point p_0 needs to be connected to p_1 and p_N, more on this constraint below
  
These three conditions need to be fullfilled at the same time of course. I've used quite a few terms without properly defining them so far so let's get that out of the way

# Definitions
A image region M of an Image I is defined as a finite set of pixels that is a subset of an image of size m*n such that the following conditions hold:

+ for any two pixel x in M there is a different pixel x_n such that x and x_n are 8-connected. 
+ M is a subset of I

A boundary can be intuitively described as the outer most pixels of the region that are still a subset of it. Each pixel in the boundary can be approached both from inside M and from the space around M. Formally a boundary K = {p_0, p_1, ..., p_n} is a set of pixels such that

+ A: K is a subset of M, this makes M a closed region
+ B: for any pixel p_i in K it holds that p_i-1 is 8-connected to p_i and p_i is 8-connected to p_i+1. p_0 is 8-connected to p_n, this makes the boundary *circular*
+ C: any pixel y in K has less than 8 neighbors in M, this means in image space y has at least 1 pixel that is not part of the region
+ D: K is not the boundary of a hole (TODO: define hole)

A boundary K is minimal if there exists **no** pixel p_i such that K - p_i (the set difference) is still 8-connected and fullfills condition B, see above

A boundary polygon P = {v_0, v_1, ..., v_n} is a set of vertices such that if you draw a 1-pixel thick line from v_0 to v_1, v_1 to v_2, ..., v_m-1 to v_m in image space then the set of pixels covered by these lines is identical to the boundary K.

On minimality, it's best to show visually what it means to be minimal, of course we want our set to be as small as possible for performance reason but visually it means that some pixels with only 1 non-M neighbor should be ommitted as such:

![](tracing_fig_1.png)
<center>
<img src="tracing_fig_1.png" alt="Fig01">
<br><b>Figure 1</b> An 8-connected region (A), a boundary (B) and the minimal boundary (C)
</center>


As state in the definition if we remove any boundary (white) pixel in C we would either loose detail from the original region or make it so there's an unconnected gap in the sequence of boundary points. 

# The Algorithm

Now that we know what we're trying to do let's first get the actual algorithm out of the way. An step-by-step explanation will follow below

```cpp
// in
BinaryImage image;  
// image that is true if the pixel is part of a closed region, false otherwise

// out
std::vector<Vector2ui> boundary;
std::vector<Vector2ui> boundary_polygon;
size_t n_holes;

// ### STEP 1: pre-process the image
bool segment_color = true;  // white

// fill all 1-pixel holes
for (long x = 0; x < image.get_size().x(); ++x)
{
    for (long y = 0; y < image.get_size().y(); ++y)
    {
        if (image(x, y) == segment_color)
            continue;
        
        // count 4-connected neighbors that are part of the region
        size_t n = 0;
        for (std::pair<int, int> i_j : {{-1, 0}, {1, 0}, {0, -1}, {0, 1}})
        {
            if (image(x + i_j.first, y + i_j.second) == segment_color)
                n++;
        }
        
        if (n >= 3)
            image(x, y) = segment_color;
    }   
}

// prune all 1-pixel lines
std::vector<Vecto2ui> pruned;
while (true)
{
    n_changed = 0;
    for (long x = 0; x < image.get_size().x(); ++x)
    {
        for (long y = 0; y < image.get_size().y(); ++y)
        {
            if (image(x, y) != segment_color)
                continue;
            
            size_t n = 0;
            for (std::pair<int, int> i_j : {{-1, 0}, {1, 0}, {0, -1}, {0, 1}})
            {
                if (image(x + i_j.first, y + i_j.second) == segment_color)
                    n++;
            }
        
            if (n == 1)
            {
                image(x, y) = not segment_color;
                n_changed++;
            }
        }
    }
    if (n_changed == 0)
        break;
}

// ### STEP 2: extract the segment
struct PixelCoordCompare
{
    bool operator()(const Vector2ui& a, const Vector2ui& b) const
    {
        return a.y() != b.y() ? a.y() < b.y() : a.x() < b.x();
    }
};

using PixelSet = std::set<Vector2ui, detail::PixelCoordCompare>;

std::vector<PixelSet> segments = crisp::decompose_into_connected_segments(image, {true});
PixelSet segment = segments.at(0);

// ### STEP 3: isolate all possible boundary points

PixelSet strong_pixels,     // 100% part of b oundary
         weak_pixels;       // may be needed for continuing in edge cases
        
for (auto& px : segment)
{
    size_t n_unconnected = 0;
    for (long i = -1; i <= +1; ++i)
    {
        for (long j = -1; j <= +1; ++j)
        {
            if (not (i == 0 and j == 0) and segment.find(Vector2ui(px.x() + i, px.y() + j)) == segment.end())
                n_unconnected++;
        }
    }
            
    if (n_unconnected > 1)
        strong_pixels.insert(px);
    else if (n_unconnected == 1)
        weak_pixels.insert(px);
}

// ### STEP 4: define the direction function

auto translate_in_direction = [&](Vector2ui point, uint8_t direction) -> Vector2ui
{
    direction = direction % 8;
    int x_offset, y_offset;
    switch (direction)
    {
        case 0: // WEST
            x_offset = -1;
            y_offset = 0;
            break;

        case 1: // SOUTH WEST
            x_offset = -1;
            y_offset = +1;
            break;

        case 2: // SOUTH
            x_offset = 0;
            y_offset = +1;
            break;

        case 3: // SOUTH EAST
            x_offset = +1;
            y_offset = +1;
            break;

        case 4: // EAST
            x_offset = +1;
            y_offset = 0;
            break;

        case 5: // NORTH EAST
            x_offset = +1;
            y_offset = -1;
            break;

        case 6: // NORTH
            x_offset = 0;
            y_offset = -1;
            break;

        case 7: // NORTH_WEST
            x_offset = -1;
            y_offset = -1;
            break;
    }

    return Vector2ui(point.x() + x_offset, point.y() + y_offset);
};

// ### STEP 5: Initialize the Tracing 

// output, each index holds 1 boundary object where the first one is the outer boundary and every subsequent one is the outline of a hole
std::vector<std::vector<Vector2ui>> boundaries_out;
std::vector<std::vector<uint8_t>> directions_out;

while (strong_pixels.size() > 0)
{
    boundaries_out.emplace_back();
    directions_out.emplace_back();

    auto& boundary = boundaries_out.back();
    auto& direction = directions_out.back();

    auto top_left = *strong_pixels.begin();
    boundary.push_back(top_left);
    strong_pixels.erase(top_left);
    direction.push_back(0);
    
    size_t current_i = 0;
            
    // ### STEP 6 trace and push once tracing complete
    do
    {
        // current pixel
        auto current = boundary.at(current_i);
        auto current_direction = direction.at(current_i);

        // was a candidate found
        bool found = false;

        // check strong candidates
        for (int dir = current_direction - 1, n = 0; n < 8; ++dir, ++n)
        {
            auto to_check = translate_in_direction(current, dir);

            if (to_check.x() < _x_bounds.x() or to_check.x() > _x_bounds.y() or
                to_check.y() < _y_bounds.x() or to_check.y() > _y_bounds.y())
                continue;

            // check for convergence by looping back to the starting pixel
            if (to_check == top_left)
                finished_maybe = true;

            if (strong_pixels.find(to_check) != strong_pixels.end())
            {
                // push new pixel from set to boundary
                boundary.push_back(to_check);
                direction.push_back(dir);
                strong_pixels.erase(to_check);
                found = true;
                break;
            }
        }

        // if we already found a strong candidate we can just jump to the next    
        if (found)
        {
            current_i = boundary.size() - 1;
            continue;
        } 
        // if no strong candidate was found even though we looped back, we are back at the start
        // c.f. explanation below
        else if (finished_maybe)
            break;
        

        // if no strong candidate was found, check weak candidates
        for (int dir = current_direction - 1, n = 0; n < 8; ++dir, ++n)
        {
            auto to_check = translate_in_direction(current, dir);

            if (to_check.x() < _x_bounds.x() or to_check.x() > _x_bounds.y() or
                to_check.y() < _y_bounds.x() or to_check.y() > _y_bounds.y())
                continue;

            if (weak_pixels.find(to_check) != weak_pixels.end())
            {
                boundary.push_back(to_check);
                direction.push_back(dir);
                weak_pixels.erase(to_check);
                found = true;
                break;
            }
        }

        if (found)
        {
            current_i = boundary.size() - 1;
            continue;
        }
        // if neither weak nor strong candidate found, start traceback
        else
            current_i--;
        
    } while (current_i != 0);
    
// ### STEP 7: reduce to non-redundant polygon vertices
outer_boundary = boundaries_out.at(0);
outer_boundary_directions = directions_out.at(0);

size_t n_holes = boundaries_out.size() - 1; // all boundary at position > 0 are those of holes

// define function to detect if two vertices in a sequence are colinear
auto turn_type = [&](size_t i_a, size_t i_b) -> int
{
    auto point_a = outer_boundary.at(i_a),
         point_b = outer_boundary.at(i_b);

    // warp point from traceback
    if (abs(int(point_a.x()) - int(point_b.x())) > 1 or
        abs(int(point_a.y()) - int(point_b.y())) > 1)
        return 0;

    auto dir_a = outer_boundary_directions.at(i_a),
         dir_b = outer_boundary_directions.at(i_b);

    if (dir_b > dir_a or (dir_a == 7 and dir_b == 0))
        return -1; // left-hand turn
    else if (dir_b < dir_a or (dir_a == 0 and dir_b == 7))
        return +1; // right-hand turn
    else
        return 0; // colinear
};

auto boundary_polygon_out = std::vector<Vector2ui>();

Vector2f mean_pos = Vector2f(0, 0);

// discard all colinear vertices but preserve order
for (size_t i = 0; i < _boundary.size() - 1; ++i)
    if (turn_type(i, i+1) != 0)
        boundary_polygon_out.push_back(_boundary.at(i));
        
return boundary_polygon_out;
```

## Step 1: Pre Processing

We first need to pre-process the image, 1-pixel holes and gaps and 1-pixel thick lines will cause problems later on so we need to remove them. Often these features happen purely because of noise and even if you would need them to be part of the actual region because you're working on that small a resolution you can simply scale the image by a factor of 2 and the automated pre-processing step will leave them untouched. 

To fill all 1-pixel holes we iterate through the region M (here represented as a binary image) and for each pixel count the number of 4-connected neighboring pixels that are also in M. If at least 3 of them are we found a hole or gap that needs to be patch

```cpp
// fill all 1-pixel holes
for (long x = 0; x < image.get_size().x(); ++x)
{
    for (long y = 0; y < image.get_size().y(); ++y)
    {
        // only iterate through region
        if (image(x, y) == segment_color)
            continue;
        
        size_t n = 0;
        // count for connected neighbors
        for (std::pair<int, int> i_j : {{-1, 0}, {1, 0}, {0, -1}, {0, 1}})
        {
            if (image(x + i_j.first, y + i_j.second) == segment_color)
                n++;
        }
        
        // make that pixel part of the region by setting it to the specified color (black)
        if (n >= 3)
            image(x, y) = segment_color;
    }   
}
```

![](tracing_fig_2.png)

<center>
<img src="tracing_fig_2.png" alt="Fig02">
<br><b>Figure 2:</b> Left: Segmented region corrupted by noise, Right: Region after filling all 1-pixel holes (newly assigned pixels shown in purple)
</center>

We now need to prune all 1-pixel thick lines. We do this recursively (there's more optimal ways to do this that have a far less performance overhead but for the sake of simplicity I will demonstrate the recursive method here. Optimally you would use a subtract a morphological hit-or-miss-transform that detects the lines from the original image) by "eating away" at the end of each line and repeat until no more lines are left:

```cpp
// prune all 1-pixel lines
while (true)
{
    // count number of changed pixels
    n_changed = 0;
    for (long x = 0; x < image.get_size().x(); ++x)
    {
        for (long y = 0; y < image.get_size().y(); ++y)
        {
            if (image(x, y) != segment_color)
                continue;
            
            // count number of 4-connected neighbors in M
            size_t n = 0;
            for (std::pair<int, int> i_j : {{-1, 0}, {1, 0}, {0, -1}, {0, 1}})
            {
                if (image(x + i_j.first, y + i_j.second) == segment_color)
                    n++;
            }
        
            // if it only has 1 neighbor it is the end of a line, prune it
            if (n == 1)
            {
                image(x, y) = not segment_color;
                n_changed++;
            }
        }
    }
    
    // if no lines changed, we converged
    if (n_changed == 0)
        break;
}
```

![](tracing_fig_3.png)

<center>
<img src="tracing_fig_3.png" alt="Fig03">
<br><b>Figure 3:</b> Left: Region after filling all 1-pixel holes, Right: Pruned region, removed pixels shown in purple with increased lightness as the number of iterations increases
</center>

Note that we leave a "stump" of size 1-pixel, if this throws of later processing feels free to first erode then dilate the area with a 2x2 structuring element. Morphological processing in general can make this process faster and cleaner but for now we will do it recursively like this.

Now that our region as an image is primed we can transform it into a region as a mathematical set of coordinates. 

## Step 2: Extract the Region

We first define a new typedef ``PixelSet``, this is a set that takes a custom comparator such that the pixel coordinates in the set are ordered left-to-right, top-to-bottom which means the first pixel is the pixel with the smalle x- and y- coordinate, if two pixels share a x-coordinate, the pixel with the lower y-coordinate comes first. Remember that our coordinate systems x-axis extends to right of the image, the y-axis to the bottom so a higher y-value means the pixel is lower down.

```cpp
struct PixelCoordCompare
{
    bool operator()(const Vector2ui& a, const Vector2ui& b) const
    {
        return a.y() != b.y() ? a.y() < b.y() : a.x() < b.x();
    }
};

using PixelSet = std::set<Vector2ui, detail::PixelCoordCompare>;

std::vector<PixelSet> segments = crisp::decompose_into_connected_segments(image, {true});
PixelSet segment = segments.at(0);
```
The actual extraction of the set is left to another crisp function, to learn more about it you can check the documentation HERE TODO. It extracts all 4-connected segments, let's assume our segment is the only one in the image so the only set in the vector is the set of all pixel coordinates M. 

## Step 3: Isolate all Boundary Pixels

A boundary pixel by definition is a pixel that has a neighbor in image space that is not part of M. Much like in our pre-processing steps we can simply iterate through the set and count the number of pixels with less than 8 neighbors. We furthermore devide these into ``weak`` and ``strong`` boundary candidates. A weak candidate is a pixel with exactly 1 non-M neighbour, a strong candidate is a pixel with 2 or more non-M neighbours. The reason for this seperation will come into play shortly

```cpp
PixelSet strong_pixels,
         weak_pixels;
        
for (auto& px : segment)
{
    // count non-M neighbours
    size_t n_unconnected = 0;
    for (long i = -1; i <= +1; ++i)
    {
        for (long j = -1; j <= +1; ++j)
        {
            if (not (i == 0 and j == 0) and segment.find(Vector2ui(px.x() + i, px.y() + j)) == segment.end())
                n_unconnected++;
        }
    }
            
    // 2 or more -> strong
    if (n_unconnected > 1)
        strong_pixels.insert(px);
    
    // exactly 1 -> weak
    else if (n_unconnected == 1)
        weak_pixels.insert(px);
}
```

![](tracing_fig_4.png)

<center>
<img src="tracing_fig_4.png" alt="Fig04">
<br><b>Figure 4:</b> Region with strong boundary candidates highlighted in mint-green, weak candidates in red. On the left is region from step 3 is shown again for convenience.
</center>






