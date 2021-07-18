+++
title = "Liquid Pink Wave: A step-by-step guide on how to arrive at art with shaders"
author = "C. Cords"
date = 2021-06-07
draft = false
url = "/post/liquid-shader"
layout = "post/single"
categories = ["programming", "art"]
images = [""]
+++ 

<h1>Introduction </h1>

Shaders have a reputation of being hard to write and for a good reason, GLSL (the programming language shaders are written in) operates under a completely different paradigm to any other language I'm aware of. There is no "program" or classes, rather each fragment (henceforth called "pixel" for simplicity if slightly inaccurate) runs the entire shader code onces per render cycle. The order the pixels run them in is not defined, many graphic cards run many of the pixels at the same time which means we already have a paralell programming problem of desynchronization in that we cannot share information between the pixels, each of them is on their own little island but we also can't differentiate between them, we can send one letter with information and then the graphics card copies that letter and send and identical version to all the islands. This is why writing shaders is incredibly intuitive so if you see a pattern, be it real or in your head most people including myself until about a half a year ago go "I don't know how to even begin writing a shader like that". That's what this is about. I'll try to step-by-step explain how I arrived at the product I desired so let's start with that

<h1>The Goal</h1>
If you know how to draw or compose music you might know what this is like but if you don't let me spell it out for you. If you want to create something you first need to be able to imagine it. For a painter it would be what to paint, what the image looks like, what colors it will have. Then once the painter settled on it they will have to decide what medium to paint it in, which objects to paint first, what techniques to use, etc.. This is not how art usually works, usually you start with a sketch of something in your head and just start working, you may replicated the sketch 1:1 in real life and you might be done or you might get side-tracked and end up at a completely different thing. Allowing for this process to be part of your planning will make the difference between creating a shader that has a purpose like bloom or being a specific post-fx and a shaders that's just kind of a pretty interactive art piece. 
 
<center>
<img src="https://thumbs.gfycat.com/ExaltedOccasionalBrownbutterfly-size_restricted.gif">
<br><b>Figure 1</b>: <i>Animation of Ameoba moving.</i>
</center>

This is an amoeba, they're basically bioactive slime. They don't really have much structure to them, obviously enough to not just disintegrate but they're not rigid cells or bacteria or a small ball like a virus, they're very fluid and I wanted something that replicates this fluidity. 
Let's try to dissamble this idea because we need to start at some point. If the shaders is moving it needs and variable that represents the flow of time. There is no way to get the current time value in GLSL, we need to feed it to each pixel indepedently like this:

```GLSL
uniform float _time_s;

void main()
{}
```
The uniform means it's a constant that's fed to the shaders from the outside, my naming scheme for uniforms is that they always start with a ``_`` and if they are in a unit and the unit is not obvious, a post-fix. Because we measure time in seconds here instead of milliseconds and microseconds we append ``_s`` so a value of 1 means 1 second.

If we run this shader nothing happens, it's just a transparent window with nothing in it so we need to start out with some kind of pattern. Let's start with equilateral stripes of two colors of whom we also both have to send to all the pixels manually

```GLSL
uniform float _time_s;
uniform vec3 _color_a;
uniform vec3 _color_b;

void main()
{
    // get position of this pixel
    vec2 pos = gl_TexCoord[0].xy;

    // number of stripes
    float n_stripes = 10;
    
    // thickness of stripe
    float eps = 1 / n_stripes;

    // initial color of background
    vec3 color = _color_a;
    
    // if pixels y-coordinate is where a stripe should be, color in
    for (int i = 0; i < n_stripes + 1; i = i + 2)
    {
        if (abs(pos.y - i * eps) < 0.5 * eps)
            color = _color_b;
    }

    // export color to render window
    gl_FragColor = vec4(color, 1);
}
```

Don't worry if you don't fully understand the code on first read, this isn't a GLSL tutorial rather I'm trying to illustrate how to arrive at a product by iterating upon a relatively simple starting out point, step-by-step. 

This is what our shader looks like now:

TODO: 01

In GPU coding you want to avoid for loops as much as possible, we just used 10 loops to draw 10 sprites, what if we want to draw 2000 stripes? Each pixel on the screen would have to call the loop 2000 times which would melt the PC so instead we observe that the pattern we made is symmetrical. If we were to duplicate it, it would align perfectly as such:

TODO: 02

I added the blacklines to make the lines visible. Well you might be thinking that if we can duplicate 10 lines to get 20 for the cost of 10, why not just draw 1 line and duplicate it to 20 for the cost of 1? And that's exactly what we will do:

TODO: 03

The code for this looks like this now, notice the fract() operation, on a conceptual level it duplicates and image and by zooming out 16 times we see 16 duplicates. This zooming out however is only a single operator one a single float so instead of our old 1-loop for 1-stripe approach we can no draw an infinite number of stripes for the same cost of 1

```GLSL
uniform float _time_s;
uniform vec3 _color_a;
uniform vec3 _color_b;

void main()
{
    vec2 pos = gl_TexCoord[0].xy;

    // mirror along axis and zoom out by 5 screensizes
    pos = fract(pos * 5);

    // origin image now just upper 50% color_a, lower 50% color_b
    vec3 color;
    if (pos.y > 0.5)
        color = _color_a;
    else
        color = _color_b;

    gl_FragColor = vec4(color, 1);
}
```

Stripes are nice but they are goopy or anything, so our next step is to make them goopy. What we want is to distort them in a way that looks smooth and can move fluidly. To do any kind of movement we need a random function which for GLSL is a non-trivial matter but I will leave that to another tutorial. For now let's just say we have this magic random function 

```GLSL
// returns a random number between 0 and 1 based on x and y
float random(float x, float y)
{
    return magic(x, y);
}
```

with this we can start distorting our to just see what happens so let's do that. Also to make it animated, let's also add back in our time input variable, that way we can see the effects of randomness over time:

```GLSL
uniform float _time_s;
uniform vec3 _color_a;
uniform vec3 _color_b;
uniform float _zoom_out;

void main()
{
    vec2 pos = gl_TexCoord[0].xy;
    float time = _time_s / 5;

    float gridscale = 5;
    pos = pos * gridscale;
    pos = fract(pos);
    
    // get randomness based on both time and position
    float distortion_offset = random(pos.x + time, pos.y + time);
    
    // add to y 
    float distorted_y = pos.y < 0.5 ? pos.y + distortion_offset : pos.y - distortion_offset;
    
    if (distorted_y > 0.5)
        color = _color_a;
    else 
        color = _color_b;
    
    gl_FragColor = vec4(color, 1);
}
```

TODO: 04

That sure looks... random. But this is something we can work with, it's animated now and we see a path ahead. Looking at it I think the most important thing that makes it unappealing is that all the tiles show the exact same thing. So let's change that 

```GLSL
uniform float _time_s;
uniform vec3 _color_a;
uniform vec3 _color_b;
uniform float _zoom_out;

void main()
{
    vec2 pos = gl_TexCoord[0].xy;
    float time = _time_s / 5;

    float gridscale = 5;
    pos = pos * gridscale;
    
    // we enumerate each tile, top row is 0, 1, 2, 3, 4 then second row is 5, 6, etc.
    float x_index = mod(pos.x, gridscale);
    float y_index = mod(pos.y, gridscale) + gridscale;
    pos = fract(pos);

    // then we add into our random call
    time += random(x_index, y_index);
    float distortion_offset = random(pos.x + time, pos.y + time); // by modifiying time we also affect this call
    
    float distorted_y = pos.y < 0.5 ? pos.y + distortion_offset : pos.y - distortion_offset;
    if (distorted_y > 0.5)
        color = _color_a;
    else 
        color = _color_b;
    
    gl_FragColor = vec4(color, 1);
}
```

TODO: 0.5

I'll stick to screenshots to save bandwithds, don't worry we'll go back to animated when it gets exciting. Either way this is much better now. Each tile shows a different picture so it almost looks like a pattern. The problem is that the tiling is still very much visible. It doesn't look like a closed pattern, it looks like a bunch of patterns, each disconnected by the boundaries of the tile. 


We observe that when we subtitue 

```GLSL
// before
float distortion_offset = random(pos.x + time, pos.y + time);
// after
float distortion_offset = random(pos.x + time, pos.x + time);
```

TODO: 06

then the pattern lines up in each column. This is because the randomness does no longer depend on y as a variable so within each column the pattern is constant. This means that we have to eliminate both x and y from the distortion offset for the pattern to match up. I could've just told you this directly but I wanted to illustrate that sometimes playing with the code to see what happens can help you understand what variables affect what part of the pattern. There is a mathematical and stochastic reason which may be lost on many people but intuitively you can just push a few button and see what happens even if you have no grasp on the math involved in why those buttons do the specific thing.

TODO: 07 

Having eliminate positional coordinates completely we get something much more closely resembling an artsy pattern. If you look closely there's still some artifacting around the tile boundaries but we'll leave that alone for now. However I think the apttern is too simple, it's just kinda blotchy and has barely any fine detail like an amoeba would. To change this we need to change the following line:

```GLSL
// before
time += random(x_index, y_index);
// after
time += random(x_index, y_index) * frequency_scale;
```

I rigged this shader to slowly increase the variable frequency_scale, it starts at 0 and then slowly goes up. Look what happens:

TODO: 08

If you multiple a sine wave sin(x) by a factor N like ``sin(x) * N`` what you observe is that the phase (the time it takes to do a full circle) shortens, increasing the frequency. This works just the same for pictures and pattern, the reason for this is highly mathematical but what I do want you to take away is that multiplying a pattern will make it more complex, divding it will take away complexity and make it more coarse. I let it run for a few minutes and it stagnated around 100 due to aliasing and at that point it's just a mess so do it in a controlled manner so you don't give your users an epileptic seizure. I set frequency_scale to about 7 so this is what we have now:

TODO: 09

It looks really good, I think it would be valid to call it here but for me it still doesn't look like an amoeba, it's too uniform, it's just a pattern instead of a patterned amoeba-y object. To give it shape we need to morph it towards a specific point, let's just pick the center of the screen and see what happens. 


















Before we continue let's look at the full code, we've added and appended some things and we haven't had it in full for a bit so here it is:

```GLSL
uniform float _time_s;
uniform vec3 _color_a;
uniform vec3 _color_b;

void main()
{
    // get position of pixel
    vec2 pos = gl_TexCoord[0].xy;
    
    // scale time 
    float time = _time_s / 5;

    // transform into a grid and give each tile an index
    float gridscale = 5;
    pos = pos * gridscale;
    float x_index = mod(pos.x, gridscale);
    float y_index = mod(pos.y, gridscale);
    pos = fract(pos);

    // offset the time by a random amount, different for each tile
    time += random(x_index, y_index) * 7;

    // distort the original line by a random amount, the same for each tile
    float distortion_offset = smoothstep(0.5, 0, random(time, time));
    
    float distorted_y = pos.y < 0.5 ? pos.y + distortion_offset : pos.y - distortion_offset; 

    // for each of the original lines, distort it either up- or downwards
    bool even = pos.y < 0.5;
    vec3 color;
    if (distorted_y > 0.5)
        color = even ? _color_a : _color_b;
    else
        color = even ? _color_b : _color_a;

    // send to be rendered
    gl_FragColor = vec4(color, 1);
}
```

Hopefully you can see how each region responds to one step in our pipeline:
- we create a single stripe
- we duplicate that stripe through tiling to get multiple stripes without performance overhead
- we distort the strips by a random amount
- we alter the random distorting to be different for each tile
- we multiply the pattern to get a more complex pattern 

It's important to think as these steps as a creative iterative process, once you're proficient with GLSL and the math behind you can kinda just sit down and paint basically, try things out and see what happens and arrive at something beautiful (maybe).



