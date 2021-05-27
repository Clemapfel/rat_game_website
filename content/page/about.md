+++
title = "About"
layout = "single"
url = "/about/"
+++

<i>(Eine deutsche Version dieses Lebenslaufes ist <a href="/about_german/">hier</a> verfügbar)</i>

# About

This page is somewhat of a CV, detailing my professional interests and proficiencies to give potential employers or coworkers a better idea of what they can expect from me.

Please navigate to the appropriate section via the following table of contents:

1. [**General Information**](#general-information)<br>
1.1 [**Education**](#education)<br>
1.2 [**Natural Languages**](#natural-languages)<br>
2. [**Programming Skills**](#programming-skills) <br>
2.1 [**Programming Languages**](#programming-languages) <br>
2.2 [**Programming Related Things**](#programming-related-things) <br>
3. [**Soft Skills & Expectation**](#soft-skills-and-expectations) <br>

---

## General Information
- **Nationality**: German, born in Berlin
- **Location**: Berlin, Germany 
- **Professional Interested**: Big Data Processing, Data Visualization and Computer Graphics, Bleeding Edge Performance Optimization

### Education
- Graduated Lilienthal Highschool, Berlin, in 2013, 
- **2013 - 2014** full-time student: 2 Semester of Bachelor of Pure Math at TU Berlin
- **2015 - 2018** full-time student: Switched to Bachelor Bioinformatics at FU Berlin<br>
    2 months internship at a radiology praxis working with their picture database<br>
- **2018 - 2019** Health-induced break from university, full-time lead developer for [rat_game](../rat_game/landing).
- **2019 - 2020** Health-issues resolved<br>
     6 week internship at {{< external href="https://github.com/seqan/seqan3" text="SeqAn3"/>}} that resulted in my thesis<br>
     finished Bachelorthesis creating an optimized kmer-index for SeqAn3
- **late 2020** Graduated FU Berlin with a Bachelor in Bioinformatics
- **early 2020 - present** lead developer and artist for [rat_game](../rat_game/landing)

### Natural Languages
**German**: Fluent at academic level, native tongue<br>
**English**: Fluent at academic level<br>
**Japanese**: Conversational level, 2 years of private tutoring<br>
**Italian**: Basic level, part of Highschool education<br>
**French**: Basic level, part of Highschool education<br>

## Soft-Skills and Expectations

I highly prefer working in an environment that is consistently challenging and problem-oriented in a way where I'm not only intellectually working on capacity but am forced to evolve and learn new things on the fly. I enjoy being given a complex problem along with a certain amount of time to answer it and then left to get to that answer through my own process; an example would be someone handing me a few terrabyte of medical data and asking a specific question about that population or being asked to implement a certain functionality in the most performant way without specifying the exact process that fills the blackbox between input and output. <br>
I enjoy working in a team because often being able to bounced ideas off another person aids in iterating faster and veering off potential dead ends thanks to the other persons perception. I tend to get invested into my work and having a social component to it helps a lot with that too.

I am currently located in Berlin and unable to move until at least 2022. I'm more interesting in a position that's fun and challenging than necessarily that well-paying. I'm available to work both full-time or part-time and am capable of working overnight to for example interact with oversea clients to bridge timezones.

Below you are more detailed explanations of my programming-related expertise. If you would like to contact me feel free to navigate to the contact page through [this link](../contact) or the header above.
<hr>

## Programming Languages

<h3 style="float:right; position:relative; top:-1em">5/5  [<span style="color:#F33C72;">▮▮▮▮▮</span>]</h3>
<h3>C++</h3>
<p>
Over 3 years of experience including 2 years of using it daily as a full-time job on a multi-person project. 
I decided early on that this was the language I would focus most of my education and expertise on and I now consider myself highly familiar with it. I have a strong graps on more complex topics such as compile-time execution, template meta programming, paralell computing and bleeding edge optimization. I also strongly believe in well-documenting, testing and benchmarking code and keeping it as pretty and good-practice as possible at all times. I furthermore have experience with somewhat new C++20 features such as ranges and concepts and I've used 3rd party libraries such as 
{{< external href="www.boost.org" text="Boost"/>}}, 
{{< external href="https://abseil.io/" text="Abseil"/>}}, 
{{< external href="https://github.com/google/benchmark" text="Google Benchmark"/>}} and
{{< external href="https://github.com/google/googletest" text="Test"/>}},
{{< external href="https://sol2.readthedocs.io/en/latest/" text="Sol3 Lua Binding"/>}} and {{< external href="https://www.sfml-dev.org/" text="SFML"/>}} as well as {{< external href="https://www.opengl.org//" text="OpenGL"/>}}
</p>

<h3 style="float:right; position:relative; top:-1em">4/5 [<span style="color:#F33C72;">▮▮▮▮▯</span>]</h3>
<h3>R</h3>
<p>
Over 2 years of experience. I was more or less forced to master it because I was a TA in statistics in college and the class was taught mostly in R. When I later found myself having to do data processing and visualization I stuck to R simply out of familiarity. It is now my go-to in applications that are not performance critical and I feel confident in being able to do most day-to-day statistical tasks and illustration the most complex things in detailed, layered plots
I'm capable of using the shipped R-modules but prefer to stick to 
{{< external href="https://ggplot2.tidyverse.org/" text="ggplot2"/>}} and 
{{< external href="https://dplyr.tidyverse.org/" text="other tidyverse modules"/>}} to create expressive graphics and self-contained data processing pipelines. 
</p>

<h3 style="float:right; position:relative; top:-1em">4/5 [<span style="color:#F33C72;">▮▮▮▮▯</span>]</h3>
<h3>Lua</h3>
<p>
I choose Lua as as secondary data-representation language for my game but have since come to appreciate the freedom, speed of iterating and versatility a non-compiled language with reflection and introspection this deep provides. I moved AI and file-interfacing components of any of my projects to be exclusively written in Lua.
Being c-based and having native C-interfaces as well as
 {{< external href="https://sol2.readthedocs.io/en/latest/" text="third party C++-interfaces that I've become very familiar with"/>}} Lua has become my script language of choice.
</p>

<h3 style="float:right; position:relative; top:-1em">4/5 [<span style="color:#F33C72;">▮▮▮▮▯</span>]</h3>
<h3>GLSL</h3>
<p>
While not very relevant in data science applications I have used GLSL in 2d environments to create complex shaders and
through the restrictions inherent to the language I feel that I now have a strong grasp on paralell execution in distributed 
system as each OpenGL fragment is basically a little node running the same GLSL script completely independent to all other nodes, just like in a distributed system.
</p>

<h3 style="float:right; position:relative; top:-1em">3/5 [<span style="color:#F33C72;">▮▮▮▯▯</span>]</h3>
<h3>Swift</h3>
<p>
During an internship doing data analysis on a server at a radiologists office I was tasked to exclusively develop for mac and as such
became familiar with both Objective-C and it's de-facto replacement swift in a professional context. I enjoy working in swift immensily and if it wasn't for the fact it is only intended for one operating system I would probably make it one of my main languages and welcome any project that brings external justification for me working exclusively in swift again.
</p>

<h3 style="float:right; position:relative; top:-1em">2/5 [<span style="color:#F33C72;">▮▮▯▯▯</span>]</h3>
<h3>Java</h3>
<p>
I started out learning Java at TU Berlin during my first few semesters of a pure math degree so I do have experience with it but later in life basically decided to forgo it for the sake of C++. If I was to work on a project that already established it's infrastructure strictly in Java I'm confident I will be able to work with it after brief acclimation.
</p>

<h3 style="float:right; position:relative; top:-1em">2/5 [<span style="color:#F33C72;">▮▮▯▯▯</span>]</h3>
<h3>Python</h3>
<p>
I've used Python mostly for medical-/genomic-data processing especiall in College because it has one of the best back-catalogues for libraries but have since moved my focus onto instead using R and C++ for the same purposes. This choice was somewhat arbitary and much like swift I would welcome an opportunity that gives me a reason to truly master Python to round out my toolbox of languages for every occasion.
</p>

<p>
<h3 style="float:right; position:relative; top:-1em">1/5 [<span style="color:#F33C72;">▮▯▯▯▯</span>]</h3>
<h3>JS, Matlab, Go, Haskell, Perl, Ruby</h3>
<p>
I have minimal but existing experience with the above languages meaning I do know the syntax and have worked with them before but would consider myself in need of having to do ~2 weeks of studying before truly being comfortable with using them for complex tasks.
</p>

<h1>Programming Related Things</h1>

<h3 style="float:right; position:relative; top:-1em">
    5/5 [<span style="color:#F33C72;">▮▮▮▮▮</span>]<br>
    5/5 [<span style="color:#F33C72;">▮▮▮▮▮</span>]<br>
    2/5 [<span style="color:#F33C72;">▮▮▯▯▯</span>]<br>
</h3>
<h3>
    Linux<br>
    MacOS<br>
    Windows
</h3>
<p>
My personal and work machines/servers all run some version of linux however I am also intimitatly familiar with MacOS for both personal and programming-related use. I'm used to Windows but not too well versed with their shell and would highly prefer to work on a Linux-like OS and cross-compile than having to deal with a native Windows machine for most of the time directly.
</p>

<h3 style="float:right; position:relative; top:-1em">4/5 [<span style="color:#F33C72;">▮▮▮▮▯</span>]</h3>
<h3>Git</h3>
<p>
I'm aware of best-practice ways to do version control and I'm fully capable of integrating into a projects infrastructure, rebasing, pull-request, etc.. I have no experience with Mercurial.
</p>

<h3 style="float:right; position:relative; top:-1em">3/5 [<span style="color:#F33C72;">▮▮▮▯▯</span>]</h3>
<h3>Latex</h3>
<p>
I've exclusively used Latex for homework, assignments, papers and documentation in both my personal and professional life and while I do have to google things frequently I'm able to format any documenting according to arbitrary templates and styleguides.
</p>

<p>
<h3 style="float:right; position:relative; top:-1em">2/5 [<span style="color:#F33C72;">▮▮▯▯▯</span>]</h3>
<h3>HTML, CSS</h3>hier
<p>
I obviously know enough to create this very website withouth help from scratch, I have no experience with dynamic websites but am able to intergrate into or communicating with a front-end team for potential web-facing applications. 
</p>

---

Hopefully this page has helped you get a clearer picture of me, again if you intend to reach out to you can do so via [this](../contact) page.

Thank you for reading
C. Cords

---



