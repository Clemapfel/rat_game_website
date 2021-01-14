+++
title = "About"
#date = 2020-12-03T18:50:46+01:00
description = "On this page I will talk about myself, what I do / did and what my professional qualifications are."
draft = false
#footer = true
#toc = true
#categories = 
#tags =

[[copyright]]
  owner = "Clem Cords"
  date = "2020"
  license = "cc-by-nc-sa-4.0"
+++

<style>
    xp_title 
    {
        float:left;
        font-size:20px;
        font-weight:bold;
    }

    xp_bar
    {
        font-size:20px;
        float:right;
        position:relative;
        left:-65%;
        display:inline-block
    }
    
    header_quote 
    {   
        text-align:center;
        position:relative;
        left:10vw;
        max-width:30vw;
        min-width:30vw;
        border-style:solid;
        border-color:grey;
        padding:12px;
    }+++
    
</style>

<head>
    <link rel="stylesheet" href="/config.css">
</head>

<div>
    <div id="link_bar">
        <a href="http://localhost:1313/welcome"><selected>[welcome]</selected></a> 
        <a href="http://localhost:1313/about">[about]</a>
        <a href="http://localhost:1313/professional/landing">[<strike>blog</strike>] </a>
        <a href="http://localhost:1313/contact">[contact]</a>
        <span style="float:right;">
            <a href="http://localhost:1313/rat_game/landing">[rat_game]</a>
        </span>
    </div>  
</div>
<hr style="border:1px solid #e92d7d"> </hr>

<p style="text-align:left;
          position:relative;
          max-width:30vw;
          margin-left:auto;
          margin-right:auto;
          border-style:solid;
          border-color:grey;
          padding:1vw;">
"My dream job: Someone hands me a drive with 2TB of data I've never seen before, gives me a single question and a few days to answer it. 
It's like playing detective except you have 10⁹ clues and more documents that would fit in this room."<br>
<span style="float:right">- me, every morning I wake up jobless including today</span>
<br>
</p>

On this page I will talk about myself, what I do / did and what my professional qualifications are. References or certificates
of proficiency can be provided on request. Please navgiate to the appropriate section with the following table of contents:

1. [**General Information**](#general-information)<br>
2. [**Education**](#education)<br>
3. [**Programming Skills**](#programming-skills) <br>
3.1 [**Legend**](#legend) <br>
3.2 [**Programming Languages**](#programming-languages) <br>
3.3 [**Programming Related Things**](#programming-related-things) <br>
4. [**Natural Languages**](#natural-languages) <br>
6. [**Soft Skills & Expectation**](#soft-skills-and-expectations) <br>

---

## General Information
- **Nationality**: German, born in Berlin
- **Age**: 25 
- **Location**: Berlin, Germany (available to move after September 2021)
- **Professional Interested**: Statistics, Bleeding Edge Performance Optimization, Data Visualization, Big Data Processing
- **Personal Interested**: Gaming, Watercolor and Ink Wash Painting, Felt Sculptures, keeping Pet Birds

## Education
- Graduated Lilienthal Highschool, Berlin in 2011, 
- **2011 - 2012** full-time student: 2 Semester of Bachelor of Pure Math at TU Berlin
- **2013 - 2016** full-time student: Switched to Bachelor Bioinformatics at FU Berlin<br>
    2 months internship at a radiology praxis working with their picture database<br>
- **2017 - 2019** Health-induced break from university, full-time lead developer for [rat_game](../rat_game/landing).
- **2019 - 2020** Health-issues resolved, full-time student again <br>
     6 week internship at {{< external href="https://github.com/seqan/seqan3" text="SeqAn3"/>}} that resulted in big collborative project for my thesis<br>
     finished Bachelorthesis creating an optimized kmer-index for SeqAn3
- **2020 - present** only part-time lead developer and artist for [rat_game](../rat_game/landing) due to insufficient funding

---

# Programming Skills
## Legend
On this page my proficienency in a given language will be visually depicted on a scale from 0 to 10 with the aid of bar as such:

<span style="font-size:20px">[<span style="color:#F33C72">▮▯▯▯▯▯▯▯▯▯</span>]</span>   : Novice<br>
Syntax and paradigms as well as general features are known to me and I'm able to understand
 averagely complex code written by other people. I have setup this language on my computer before
 and know how to compile or run programs. I have not worked with this language for longer than a few hours

<span style="font-size:20px">[<span style="color:#F33C72">▮▮▮▮▮▯▯▯▯▯</span>]</span>    : Intermediate <br>
I know how to write complex programs in this application and how to interpret common compiler 
errors. I know most notable features of the standard library and how to use them and I've used common external modules
related to my field. I have worked with this language for multiple months

<span style="font-size:20px">[<span style="color:#F33C72">▮▮▮▮▮▮▮▮▮▮</span>]</span>    : Expert <br>
    : Expert
I know this language very well, I can write code fluently without looking things up. I have 
experience with the inner workings of the language and am familiar with every standard library feature 
and all of the obscure idiosyncracies. Similarly I have seen every compiler error there is
 I am familiar with many 3rd party libraries related to my field. I have worked with this language for years.
<br><br>

(Note that this is only a visual aid and as such there is no highly defined meaning to a score of for example 6/10 compared to 7/10.)

---
## Programming Languages
<p>
<xp_title>C++</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▮▮▮▯</span>]</xp_bar><br>
Over 3 years of experience including 1.5 years of using it daily as a full-time job on a big multi-person project. 
It's my language of choice and I consider myself highly familiar with it, including things like compile-time execution, bleeding edge 
 performance optimization (which was the main focus of my thesis), meta template programming, and good-practice like const correctness at all times,
not yet rolled out C++20 features like ranges and concepts as well as many 3rd party libraries such as 
{{< external href="www.boost.org" text="Boost"/>}}, 
{{< external href="https://abseil.io/" text="Abseil"/>}}, 
{{< external href="https://github.com/google/benchmark" text="Google Benchmark"/>}} & 
{{< external href="https://github.com/google/googletest" text="Test"/>}} as well as 
{{< external href="https://sol2.readthedocs.io/en/latest/" text="Lua-"/>}} and 
{{< external href="https://github.com/zeux/pugixml" text="Xml Interfaces"/>}} and of course {{< external href="https://github.com/seqan/seqan3" text="SeqAn3"/>}}
</p>

<p>
<xp_title>R</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▮▮▯▯</span>]</xp_bar><br>
Over 2 years of experience. My language of choice for data processing and visualization. I have taught statistics Lectures 
as a TA using R and I gave special crashcourses for students in this language. Every bigger project that requires graphing 
or dealing with data I would do almost exclusively in R and I am confident of my visualization skills and using
{{< external href="https://ggplot2.tidyverse.org/" text="ggplot2"/>}} and 
{{< external href="https://dplyr.tidyverse.org/" text="other tidyverse modules"/>}}
 to create expressive graphs, well substantiated results and neat and easy to read scripts to create them. 
</p>

<p>
<xp_title>Lua</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▯▯▯▯</span>]</xp_bar><br>
I choose Lua as a secondary support language for [rat_games](../rat_game/landing) C++ engine and have thus worked with it for 1.5a as part of
  my daily tasks. I consider it a decent data-representation language and the {{< external href="https://sol2.readthedocs.io/en/latest/" text="interface between it and C++"/>}} is stellar and allows me to seamlessly pass
complex object between each language. I know lua syntax and have used metatables or concurrent execution in the past, 
however I consider Lua a secondary language and wouldn't be confident creating a project that is solely done in lua quite yet.
</p>

<p>
<xp_title>Swift</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▯▯▯▯</span>]</xp_bar><br> 
<xp_title>Objective-C</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▯▯▯▯▯▯</span>]</xp_bar><br> 
During an internship scraping the server of a radiologists office I was tasked to exclusively develop for mac and as such
became familiar with both objective-c and it's de-facto replacement swift in a professional context. While I consider
myself capable of working on a large-scale objective-c project if I was to create my own from scratch I would vastly 
prefer swift which is one of my favorite languages but because of the non-portability I can rarely justify using it for
science-related applications.
</p>

<p>
<xp_title>Python</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▯▯▯▯▯</span>]</xp_bar><br> 
I mostly use python for (genomic-) text-processing as well as more complex single-run programs like scripts 
extracting values or anaylzing tables. I feel comfortable in python but do not consider myself fully able to match
the skill and pythonic-ness of professionals with years of experience. We used python a lot at uni and for my own projects I've
for example written a complex AI for [rat_game](../rat_game/landing) in python.
</p>

<p>
<xp_title>GLSL</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▯▯▯▯▯</span>]</xp_bar><br> 
While not very relevant in data science applications I have used GLSL in 2d environments to create complex shaders and
through the restrictions inherent to the language I feel that I now have a good grasp on paralel execution in distributed 
system as each OpenGL fragment is basically a little node running the same GLSL script as all the others just like in a distributed system.
I have some experience with the OpenGL system-interface functions but I consider myself only fully capable of employing it
in 2d-only applications.

<p>
<xp_title>Java</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▯▯▯▯▯▯</span>]</xp_bar><br> 
During lectures for my pure math degree we had to use java and I only ever used it in that context. If a task 
requires and object-oriented programming language I'd much rather use C++ but I know enough Java to understand code
written by others and to be able to modify / refactor it and to develop smaller modules for a bigger library. I'd just
prefer to do the same but in C++.
</p>


<p>
<xp_title>JS</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▯▯▯▯▯▯</span>]</xp_bar><br> 
I use javascript mostly to interfacing with data that happens to be provided in json and I like the language a lot. 
During website-related work I have dealt with it in a more encapsulated way and while I don't consider myself an 
expert out of all of the languages here I'm most motivated to learn more about JS.
</p>

<p>
<xp_title>Bash</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▯▯▯▯▯▯▯</span>]</xp_bar><br> 
I know enough bash to write stuff to get my programm running or stitch programs together to create a pipeline or do 
system-admin stuff but I don't think I'm able to create bigger bash-only projects without previous studying. 
I am confident though with using both MacOS and a Linux-distribution shell (in stark contrast to windows powershell 
which I prefer to... not deal with - ever).
</p>

<p>
<xp_title>MatLab</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
We used MatLab (or Octav) in almost every math-related lecture and I'm able to use it as a tool in that context, however I have not worked with it
in a professional context other than as a helper for doing complex operations. I know the syntax and many of the highly
useful features but if I want to do complex math I usually prefer to use R or Python modules
</p>

<p>
<xp_title>Go</xp_title><xp_bar>[<span style="color:#F33C72">▮▯▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
<xp_title>Haskell</xp_title><xp_bar>[<span style="color:#F33C72">▮▯▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
<xp_title>Perl</xp_title><xp_bar>[<span style="color:#F33C72">▮▯▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
<xp_title>Ruby</xp_title><xp_bar>[<span style="color:#F33C72">▮▯▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
Minimal experience but I have used these before and I wouldn not be starting at 0 learning any of these languages to use at full effect. 
I'm actually excited to learn more about go as the few hours I've played around with it show a lot of potential for me and I enjoy the design.
</p>

## Programming Related Things
<p>
<xp_title>Git</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▮▯▯▯</span>]</xp_bar><br> 
I've been using git for years and am comfortable with all the day-to-day stuff like pull requests and rebasing and 
properly formatting commit messages. I've worked in international multi-person projects all using the same github repo 
so I'm aware of all the features however I don't think I would be able to set such a big server up myself without 
previously studying how to do it properly. In summary: I can use what's already there really well but if I have to make
it be already there for others I'd rather someone more qualified do that.
</p>

<p>
<xp_title>CMake</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▯▯▯▯</span>]</xp_bar><br> 
I don't particularly enjoy cmake but have been using it for every C++ project after so far including for big libraries such as 
SeqAn3 so I'm confident I can spot whats causing cmake errors and setup a proper install script for my current project.
</p>

<p>
<xp_title>Latex</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▯▯▯▯</span>]</xp_bar><br> 
I've been turning in my homework or thesis' in latex since I started going to college so I am able to create well 
formatted and cohesive projects of arbitrary purposed requirement. I do often have to look up all the proper labels 
and codes though
</p>

<p>
<xp_title>HTML</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▯▯▯▯▯▯</span>]</xp_bar><br> 
<xp_title>CSS</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▯▯▯▯▯▯</span>]</xp_bar><br> 
I know enough to create this website by myself but I wouldn't consider myself a web-developer and would much rather
be applied to the back-end and under-the-hood stuff servers-side.
</p>

<p>
<xp_title>MySQL</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
We used MySQL all throughout our database lectures so I am familiar with it and know how to use it however I have not
yet worked on a big multi-person project with MySQL especially none where the database is cosntantly changing, in
bioinformatics they're often quite static but I realize that for commerce this is rarely the case.
</p>

---

## Natural Languages
<p>
<xp_title>German</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▮▮▮▮</span>]</xp_bar><br> 
I was born and educated in germany so I'm fluent both in conversational and academic tone in any subject
</p>

<p>
<xp_title>English</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▮▮▮▮▮▮</span>]</xp_bar><br> 
I had a lot of exposure to english friends and any professional or programming work including papers or reports will be written 
in english exclusively by me so I consider myself fluent and almost accent-free both conversationally and academically talking about any subject.
</p>

<p>
<xp_title>Japanese</xp_title><xp_bar>[<span style="color:#F33C72">▮▮▮▮▯▯▯▯▯▯</span>]</xp_bar><br> 
I've taken 2 years of weekly tutoring so I consider myself not a novice, I can hold conversations about simple topics 
but to translate more complex thigns especially written I will have to consult a dictionary.
</p>

<p>
<xp_title>Italian</xp_title><xp_bar>[<span style="color:#F33C72">▮▯▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
<xp_title>French</xp_title><xp_bar>[<span style="color:#F33C72">▮▯▯▯▯▯▯▯▯▯</span>]</xp_bar><br> 
4 Semesters in Highschool twice-weekly. I don't think I would survive if I was thrown into italy/france but I do know the 
basics of grammar, pronounciation, etc. and I think with a few months of tutoring I could become versed enough 
to handle day-to-day workplace situations like meetings or emails.
</p>

---
## Soft-Skills and Expectations

I consider myself team-oriented and am willing to delegate tasks or have tasks delegated to me if it's the better 
option for the current project. My work tends to mean a lot to and I'm proud to do the best I can on anything that I 
enjoy doing which may sometimes backfire when a project fails because of reasons out of my control which may impact me emotionally. 
I prefer working later and on a flexible time schedule even late at night if those hours are needed but I do not have a 
problem with regular day-to-day work schedules. I don't have any personal or familial restraints until about the end of 
 2021 after which I'm okay with moving to pretty much any city in the world if they job is worth it. 

Hopefully this page has helped you get a clearer picture of me, if you intend to reach out to me feel free to navigate
to the [contact](../contact) page and shoot me a message. 

Thank you for reading!

---
<footer>
  <div markdown="1">
    <center>
    <p style="font-size:11px">
    &copy 2020 Clem Cords | all original images are subject to copyright and may not be shared without attribution <br>
    </center>
    </p>
  </div>
</footer>





