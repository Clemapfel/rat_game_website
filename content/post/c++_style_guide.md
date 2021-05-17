+++
title = "A (personal) modern C++ Styleguide"
author = "C. Cords"
date = 2021-05-01
draft = false
url = "/post/c++_style_guide"
layout = "post/single"
categories = ["programming"]
images = [""]
+++

<head>
code {
  display: block;
  white-space: pre-wrap;
}
</head>

<h1 id="INTRODUCTION"> Introduction </h1>

People, especially outside of CS, often think of code as purely utilitarian. It's like a machine, it doesn't matter how dirty a motor looks inside as long as it's working and a well-trained mechanic can fix it when it breaks. I disagree with this, writing a programming skript is pretty much identical to writing a report or pamphlet. It should be formatted for maximum clarity, ease of reading and to be understandable to the broadest set of people. This is especially important in interdisciplinary fields like bioinformatics or applied statitics, often your co-worked only have a basic understanding of programming and expecting them to understand a concurrent program the first time they read is is unrealistic and halts productivity. Obviously correctness is essential but in my opinion codes formatting should have the same amount of care and effort put into as someone would writing and formatting their dissertation. 
Irregardless of these ideological factors there isn't always a best answer. When developing a styleguide the most important thing is to just stick to it and have a reason for doing things. Even if a specific decision isn't that consequential, sticking to that format 100% of the time is what makes code readable. In a multi-person setting this means the team has to decide on one way of doing things before the first line of code is written and that is what this document is for. 

I started learning programming very late in my life in around 2016 with basically no guidance from someone more skilled than me. What I've come to realize over the years was that I went through a process of slowly iterating on my own ideosyncracies and that by the time I felt like I did develop my own well-justified style I tended to always gravitytate to the newest way of doing things so formalizing all the somewhat unconcsious decisions in a guide like this will also help me interrogate my own way of doing things and I will be the first person to change my mind should something come to my attention that's better than what I'm currently doing.

<h2 id="QUICKSTART"> Quickstart </h2>
skip to <a href="#EXAMPLE">here</a> for a fully syntax highlighted code example that has all the possible cases

<h1 id="TOC">Table of Contents</h1>
0. <a href="#QUICKSTART">Quickstart</a>
1. <a href="#VARIABLES">Variables</a>
1.1 <a href="#VARIABLES_NAMING">Naming</a>
1.2 <a href="#VARIABLES_DECLARATION">Declaration</a>
2. <a href="#OPERATORS">Operators</a>
2.1 <a href="#OPERATORS_PTR">References and Pointers</a>
2.2 <a href="#OPERATORS_LOGIC">Logical Operators</a>
2.3 <a href="#OPERATORS_NUMERIC">Numerical Operators</a>
2.4 <a href="#OPERATORS_PREFIX">Pre- and Postfix Increment</a>
3. <a href="#FUNCTIONS">Functions</a>
3.1 <a href="#FUNCTIONS_MEMBER">Member Functions</a>
3.2 <a href="#LAMBDAS">Lambdas</a>
3.3 <a href="#RETURN_AUTO">Auto-deducing Return Types</a>
4. <a href="#CLASSES_ENUMES">Classes & Enums</a>
4.1 <a href="#CLASSES_NAMING">Naming</a>
4.2 <a href="#CLASS_VS_STRUCT">Class vs. Struct</a>
4.3 <a href="#HPP_VS_CPP">Order of access-specified members: .hpp vs .cpp</a>
4.3.1 <a href="#FILENAMES">Filenames</a>
4.3.2 <a href="#HEADER_ONLY">Template for Header-only Libraries</a>
4.3.3 <a href="#NON_HEADER_ONLY">Template for Non-Header-Only</a>
5. <a href="DOCUMENTATION">Comments & Documentation</a>
5.1 <a href="#DOCUMENTATION">In-File Documentation</a>
6. <a href="#EPILOGUE">Closing Remarks</a>
6.1 <a href="#EPILOGUE_GIT">Version Control</a>
6.2 <a href="#EPILOGUE_BENCHMARK">Testing and Profiling</a>
6.3 <a href="#EPILOGUE_OPTIMIZATION">When Optimization is not Appropriate</a>
6.4 <a href="#EPILOGUE_REFACTOR">The Golden Rule: Always Refactor Once</a>
7. <a href="#THANKS">Thanks and References</a>

The following variable naming scheme should be adhered to at all times, in C++ and all other languages unless physically impossible. <small>(Looking at you, Swift, no emotes and umlaute in var-names anymore just because it's possible doesn't mean you should do it)</small>

<table style="width:100%">
  <tr>
    <th>Scope</th>
    <th>Qualifier</th>
    <th>Naming</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>local class or function scope</td>
    <td>non-const or const</td>
    <td>lower-case snake_case</td>
    <td>
        <code>size_t current_row_index;</code><br>
        <code>static const bool switch_flag = false;</code><br>
    </td>
  </tr>
  <tr>
    <td>global or namespace scope</td>
    <td>non-const or const</td>
    <td>all-caps snake_case</td>
    <td>
        <code>static InputHandler INPUT_HANDLER;</code><br>
        <code>#define PI 3.14159</code><br>
    </td>
  </tr>
  <tr>
    <td>public member</td>
    <td>non-const</td>
    <td>lower-case snake_case</td>
    <td>
        <code>Vector2f top, left;</code><br>
        <code>float value;</code><br>
    </td>
  </tr>
  <tr>
    <td>public member</td>
    <td>const</td>
    <td>all-caps snake_case</td>
    <td>
        <code>const float DEFAULT_FONT_SIZE = 20;</code><br>
        <code>constexpr size_t MAX_THREAD_COUNT = 64;</code><br>
    </td>
  </tr>
  <tr>
    <td>private or protected member</td>
    <td>non-const or const</td>
    <td>lower-case snake_case with prefix "_"</td>
    <td>
        <code>std::string _id;</code><br>
        <code>constexpr float _space_to_window_frame = 10;</code><br>
        <code>static Color _default_color;</code>
    </td>
  </tr>
</table>

Adhering to the above naming scheme, some variables should be pre- or postfix depending on their type as such:

<table style="width:100%">
    <tr>
    <th>Type</th>
    <th>Name</th>
  </tr>
    <tr>
    <td>unsigned int index</td>
    <td>i, j, ... or foo_i, foo_j, ...</td>
  </tr>
  <tr>
    <td>unsigned int counter</td>
    <td>n_foo</td>
  </tr>
  <tr>
    <td>bool</td>
    <td>is_foo, should_foo, can_foo, etc.</td>
  </tr>
  <tr>
    <td>Type*</td>
    <td>foo_ptr</td>
  </tr>
  <tr>
    <td>Type::Iterator</td>
    <td>foo_it</td>
  </tr>
  <tr>
    <td>Color</td>
    <td>foo_rgb, foo_rgba, foo_hsv, foo_hsva, etc.</td>
  </tr>
  <tr>
    <td>Angle in [0, 360] or [0, 2&#960]</td>
    <td>foo_dg, foo_rad</td>
  </tr>
  <tr>
    <td>Percent in [0%, 100%]</td>
    <td>foo_pct</td>
  </tr>
  
  <tr><
    <td>typename or using/typedef declaration name</td>
    <td>
        Foo_t
    </td>
  </tr>
</table>

<h2 id="VARIABLES_DECLARATION">Declaration</h2>

The order of variable specifiers should always be kept as following (in descending priority from left to right)
{{< highlight Cpp >}}
0: static 
1: inline
2: mutable
3: extern  
4: volatile 
5: constexpr = consteval = const
6: Type of the variable
<no space>
7: & or * or &&
<space>
8: Name of the variable

// for example
static inline const foo* foo_ptr const = //...
mutable extern volatile const foo* = //...

{{< /highlight >}}

So always put <code>static</code> fist, always group const as right as possible but before the variable type and name.
 
Any variable that explicitely calls a constructor or other function on the right hand-side of the declaration should have the type <code>auto</code>. 

{{< highlight Cpp >}}
// wrong:
Vector2f vec = Vector2f(20, 50);
Vector2f vec = create_vector(20, 50);
Vector2f vec(20, 50);

// correct:
auto vec = Vector2f(20, 50);
auto vec = create_vector(20, 50);
{{< /highlight >}}

This is to avoid confusion with C++20s new aggregate initialization with round brackets as it is not immediately obvious which of these the following statement tries to invoke:

{{< highlight Cpp >}} Vector2f foo();{{< /highlight >}}

I could be either calling the default constructor of Vector2f with c++20 aggregrate initialization with round brackets and no arguments or forward declaring a function with return type Vector2f and no arguments. Using 

{{< highlight Cpp >}} auto foo = Vector2f();{{< /highlight >}}

makes it immediatly obvious.

For trivial numeric types, always use <code>float</code> for floating points. 64-bit numbers like <code>double</code> should be a conscious decision on the developers part when they recognize that they need the extra precision, not the default. This is to avoid unnecessary overhead in bleeding-edge performance and big-data environments. 

Be aware of potential overhead this may cause by casting up or down the precision hirarchy when interacting with other libraries. clang-tidy usually issues a warning for this and it should not be ignored. 

On the topic of casting, <code>static_cast<foo></code> should always be preferred over c-style casts, even if foo is a trivial numeric type:

{{< highlight Cpp >}}
double high_precision = 2.21531652318625317;

// wrong
float low_precision = float(high_precision);
float low_precision = (float) high_precision;
auto low_precision = float(high_precision);
float low_precision = static_cast<float>(high_precision);

// correct
auto low_precision = static_cast<float>(high_precision);
{{< /highlight >}}

If multiple variables of the same type and type-qualifier are declared one after another, always use the <a href="https://en.cppreference.com/w/cpp/language/declarations#Declarators" target="_empty">init-declarator form</a> as such:

{{< highlight Cpp >}}
std::string first_name, 
            last_name,
            adress;
            
Foo *ptr_one,
    *ptr_two;
    
Bar &ref_one;
Bar not_ref_two;

{{< /highlight >}}

There should always be a newline after the first declaration. If one of the variables is a pointer, reference, r-value, etc. then all of them should. if this is not the case, the type should be explicitely redeclared

<h1 id ="OPERATORS">Operators</h1>

I think this chapter will ruffle some feathers but I also like to think that I have a well-funded opinion on why I do it this way, however I also have to admit that if anything in this guide is subject to change as I grow as a developer, it's this section. Anyway, let's get to it:

<h2 id="OPERATORS_PTR">Reference, Pointer, RValue-Reference, etc.</h2>
In function arguments and any other variable delcaration there should be a space following the &, *, && operators but <b>not</b> preceding it:
{{< highlight Cpp >}}
Foo& wrap_foo(const Foo* const foo_ptr, Foo&& foo_rvalue, const Foo& foo_ref) 
{
    // ...
}

std::vector<Foo>* foo_vec_ptr = // ...
for (auto& foo : *foo_vec_ptr)
{
    // ...
}
{{< /highlight >}}

I am aware this is an onpupolar choice so let me explain: When we read out code irl, like actually read it out loud to someone in the same room, when someone asks us: "What is the type of <code>const Foo* bar</code>?" we answer "constant foo pointer" or "a pointer to a constant foo". It's the same the same with references, r-values, etc.. I consider the type qualifier to be part of the type and it should thus be grouped with the type declaration.


I will admit this falls apart when using the above mentioned init-declarator-list:

{{< highlight Cpp >}}

const Foo& first,           // type Reference to a const Foo
           second,          // type const Foo
           *third,          // type Pointer to a const Foo
           *fourth const;   // type constant Pointer to a constant Foo

{{< /highlight >}} 

which is why I stated that when using this form, all variables should have the same type and type qualifier.

<h3 id="OPERATORS_LOGIC"> Logical Operators </h3>

Always use <code>and, or, not</code> instead of <code>&&, ||, !</code> for boolean operands.<br>
Always use <code>&, |, ^, ~</code> instead of <code>bitand, bitor, xor, compl</code> for numerical operands in a bit operation. Similarly always use <code>&=, |=, !=, ^=</code> over <code>and_eq, or_eq, not_eq, xor_eq</code> for these operands.

It may be my lua background but I'm fond of the <code>and, or, not</code> in boolean expressions, many people from non-cs fields that primarily work in matlab or another very high level scripting language will have an easier time reading complex boolean expressions.

<h3 id="OPERATORS_NUMERIC">Numerical Operators</h3>

There should be a space preceding and following the binary operators <code>+, -, /, %</code>. The unary <code>-</code> should be used on variables as well as number constants in favor of <code>-1 * </code>

{{< highlight Cpp >}}
int a, b;

// wrong:
c = 2*(a+b);
c = a*b;
c = -1*a;
c = std::modulus(a, a%b);

// correct:
c = 2 * (a + b);
c = a * b;
c = -a;
c = a % (a % b)
{{< /highlight >}}

Unless in performance critical code conditions where every operation counts, it is sometimes preferable to use the non-simplified formula for something if it aids in clarity.

<h2 id="OPERATORS_PREFIX">Pre- and Postfix Increment</h2>

Prefix incremenet / decrement should always be preferred over the postfix option unless specifically necessary to produce desired behavior:

{{< highlight Cpp >}}
size_t n = 0;

// wrong:
for (auto it = vec.begin(); it != vec.end() or n < 15; it += 1, n++)
    // ...

for (auto it = vec.begin(); it != vec.end() or n < 15; it.operator++(1), n++)
    // ...
    
// correct:
for (auto it = vec.begin(); it != vec.end() or n < 15; ++it, ++n)
    // ... 
    
{{< /highlight >}}

TIn many scenarios, post- and prefix operators are functionally equivalent but if they aren't in that 1% of cases, this may cause hard-to-catch bugs. Always defaulting to prefix avoids this as much as possible.

<h1 id="FUNCTIONS">Functions</h1>
All function names should be lower-case snake_case. This includes lambdas however functors should be named according to the class naming specification (c.f. below). On declaration, function arguments should be unnamed unless specifically necessary to give context or if there are multiple arguments of the same type:<br>
{{< highlight Cpp >}}
// wrong
void set_position(Vector2f position);
void add_percentage(float); // expects [0, 1]
void set_name(std::string, std::string);

// correct
void set_position(Vector2f);
void add_percentage(float zero_to_one);
void set_name(std::string first_name, std::string last_name);
{{< /highlight >}}

<h3 id="FUNCTIONS_MEMBER">Member Functions</h3>

Members functions that set one or more member variables should always be named <code>set_*</code> where <code>*</code> is the same name used when declaring the member in the .hpp.

{{< highlight Cpp >}}
class Color
{
    public:
        void set_r(float);
        void set_rgb(float, float, float);
        void set_alpha();

    private:
        float _r, 
              _g, 
              _b, 
              _alpha;
}
{{< /highlight >}}



Similarly, getters should always be named <code>get_*</code>, however if the function returns a single bool, if that bool is a member variable named <code>_is_foo</code> it's getter should be named <code>get_is_foo()</code>, however if 
that value is not a member it's getter should be phrased like a yes-no question, for example:

{{< highlight Cpp >}}
class OsWindowHandler;
class RenderWindow
{
    private:
        std::string _id;
        bool _is_closed = false;

    public:
        void set_closed(bool b) 
        {
            _closed = b;
        }

        bool get_is_closed() const  // member bool
        {
            return _closed;
        }

        bool is_focused() const // non-member bool
        {
            return OsWindowHandler::is_window_focused(_id);
        }

        bool should_notify_on_close() const // non-member bool
        {
            return OsWindowHandler::get_context_settings(__id).should_notify_on_close;
        }
}

{{< /highlight >}}

<h2 id="LAMBDAS">Lambdas</h2>

Lambdas are very powerful in modern C++ and it can be very attractive to not add a new member function and instead just open a local lambda function inside another function. Lambdas should be used only where necessary, if you would call the potential member function from 2 or more places it's almost never worth it to not just create the new function.

If you do have to use a lambda, if the lambda function itself is only called once inside it's scope, consider making it anonymous, the most common place would be inside a set or sorting algorithm with a custom comparison. If more than 1 routine needs it and it needs to be a lambda, consider making it a member and binding it to an std::function;

A place I like to employ lambdas is for inline static initialization. Sometimes you need to call functions that do not return the object you're trying to initialize like so:

{{< highlight Cpp >}}

class TexturedFoo : public Drawable 
{        
    private:
        const Texture _texture;
        
        static inline const _window_resolution = []() {
        
            if (not RenderWindow::is_initialized())
                RenderWindow::initialize_from_config();
                
            return RenderWindow::get_resolution();
        }();
        
    public:
        TexturedFoo(std::string texture_id)
            : _texture([&]() -> Texture&& {
                
                auto texture = new_texture();
               
                if (not texture.load_from_file(texture_id))
                    throw /...
                
                return std::move(texture);
            }())
        {}
}
{{< /highlight >}}

I think this can be a very elegant way to initiate things that need a more complex routine than just calling it's constructor however thought should be put into wether it really is necessary to make this a lambda. For example for the above example both initialization functions could should be a static member function of <code>RenderWindow</code> and <code>Texture</code> respectively and I would again argue that the lambda is only justified if that function is called exactly once in the entirety of the library.
When using lambdas it's almost always best to delcare them as <code>[&](auto arg1, auto arg2) { /... }</code> nowadays. This was the compiler will decide which variables to capture themself and the argument type is also automatically deduced. The capture should only be manually specificed if for example the invocation of a copy constructor is necessary. Similarly the trailing-return-type <code> [&](auto arg1, auto arg2){} -> foo</code> should be ommitted unless specifically necessary. 

I would advise you to check on the <a href="https://en.cppreference.com/w/cpp/language/lambda">lambda docs page</a> every year or so, it feels like the new C++ versions, C++20 just recently and C++23 recently, are very impactful on what is possible with lambdas and I would encourange everyone to try to stay up to date with the most recent way of doing things. 

<h2 id="RETURN_AUTO"> Auto-deducing return types </h2>

It's tempting to always return auto if possible, even if it's not strictly necessary. I often see devs being lazy and not wanting to type out a long template expression but I woudl advise caution. If documentation isn't done yet it can send potential collborators on the hunt through your function definition to find out what exactly your function returns. In my opinion, if auto is possible the following form should be used:

{{< highlight Cpp >}}
// wrong:
template<typename Return_t>
auto create_function() 
{
    return std::move(std::function<Return_t()>());
}

// better:
template<typename Return_t>
std::function<Return_t()>&& create_function 
{
    return std::move(std::function<Return_t()>());
}

// best:
// @brief creates dummy function, used for style guide only
// @returns rvalue of function<Return_t()>
template<typename Return_t>
auto create_function() 
{
    return std::move(std::function<Return_t()>());
}

{{< /highlight >}}

By employing good in-code documentation, the original dev gets to use auto and the collaborators only have to take one look at the function declaration to know what type the function returns. If for some reason in-line documentation is impossible, always prefer explicitely stating return types unless auto is absolutely necessary.

<h1 id="CLASSES_ENUMS">Classes & Enums</h1>

<h2 id="CLASSES_NAMING">Naming</h2>
Classes, Enums and other class-like entities are always named upper-case CamelCase. This includes structs, unions, enums, typenames and typedefs as well as using-declarations for class-like entities.<br>

<h2>Enums</h2>
As all Enum "members" are inherently scoped static constexpr constants, they should be in all-caps SNAKE_CASE. When each enumerator is manually defined with an expression, the enums type should also be manually defined as such:

{{< highlight Cpp >}}
// wrong:
enum Manual : int {ZERO, ONE, TWO}
enum Manual {FIRST = 1, SECOND = 2, THIRD = -2}

// correct:
enum Manual {ZERO, ONE, TWO}    // auto deduces int
enum Manual : int {FIRST = 1, SECOND = 2, THIRD = -2}
{{< /highlight >}}

An enum that's inside the global namespace should be declared a scope enum <code>enum class Foo</code>. This is to avoid name-collisions as using all-caps letters reduces the set of enumerator names.


<h2 id="CLASS_VS_STRUCT">Class vs. Struct</h2> 

If all member variables and functions of a user-defined type are public, <code>struct</code> should be used an no access specifiers should be user. 

In all other cases, <code>class</code> should be used and all members should be manually access specified with <code>public, protected, private</code>

<code>class</code> shold be preferred over struct unless every member and memberfunction of the object is public. <code>public, protected, private</code> should always be explicitely declared for every member, unless <code>struct</code> is used in which case neither should be specified.

{{< highlight Cpp >}}

// wrong:
struct HSV 
{
    public:
        float _h, _s, _v;
}

struct Color 
{
    HSV to_hsv() const;
    
    private:
        float _r, _g, _b, _alpha;
}

// correct:
struct HSV 
{
    float h, s, v;  // no _ because members are public
}

class Color
{
    public:
        HSV to_hsv() const;
        
    private:
        float _r, _g, _b, _alpha;
}
{{< /highlight >}}

<h2 id="HPP_VS_CPP">Order of Access Specified members: .cpp vs .hpp</h2>

<h3 id="FILENAMES"> Filenames </h3>

All programming language files should be lower-case snake_case. If a header holds a class named FooClass, the header should be named foo_class.hpp and similarly the source file should be foo_class.cpp. .h should not be used unless the entire header is exclusively written in C, not C++. For files in other programming languages the most common programming language file-extension should be used, for example if your data representation for a video-setting file is in lua and you agreed on a .cfg file extension for configs, the file should be name <code>video_settings.cfg.lua</code>. Many programming and data representation languages do not care what their file is name but you should still take care to make it immediatly obvious what a file is written in to collaborators, they should not have to have to open the file in notepad and try to figure out the language. Here is a non-exhaustive list of languages and file extensions I personally used:

<table style="width:100%">
  <tr>
    <th>Language</th>
    <th>Extension</th>
  </tr>
  <tr>
    <td>C++</td>
    <td>
        .hpp for headers<br>
        .cpp for source files
    </td>
  </tr>
  <tr>
    <td>Python</td>
    <td>
        .py
    </td>
  </tr>
  <tr>
    <td>Java</td>
    <td>
        .java
    </td>
  </tr>
  <tr>
    <td>JavaScript</td>
    <td>
        .js
    </td>
  </tr>
  <tr>
    <td>Lua</td>
    <td>
        .lua
    </td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td>
        .rb
    </td>
  </tr>
  <tr>
    <td>Perl</td>
    <td>
        .pl
    </td>
  </tr>
  <tr>
    <td>Go / Golang</td>
    <td>
        .go
    </td>
  </tr>
  <tr>
    <td>R</td>
    <td>
        .R
    </td>
  </tr>
  <tr>
    <td>GLSL</td>
    <td>
        .glsl<br>
        .frag for Fragment Shaders<br>
        .vert for Vertex Shaders<br>
    </td>
  </tr>
  <tr>
    <td>Data Representation: CSV</td>
    <td>
        .csv
    </td>
  </tr>
  <tr>
    <td>Data Representation: XML</td>
    <td>
        .xml
    </td>
  </tr>
  <tr>
    <td>Data Representation: Lua</td>
    <td>
        .sav.lua for savefiles<br>
        .cfg.lua for config<br>
        etc.<br>
    </td>
  </tr>
  <tr>
    <td>Data Representation: JSON</td>
    <td>
        .json
    </td>
  </tr>
  <tr>
    <td>Data Representation: Matlab</td>
    <td>
        .MAT
    </td>
  </tr>
</table>

I think a lot of these are standard and there's surely many I've missed like all the html-related things like .md and .css but the point of this list was more to instill in you a point of consistent flexibility. If it doesn't matter to the computer the extension is technically arbitrary, but the human part of your company should decide one exactly one answer anyway and stick to that at all times. If that answer overrides the script languages default extension like I do with .lua, it should be .yourextension.lua to allowed people to easily classify your files without having to open them. 

<h2 id="CLASSES">Classes and .hpp vs .cpp</h2>

I might be wrong on this but afaik in modern C++ the only reason to use the .hpp for declaration and .cpp for definition for a non-templated class is to reduce compile time. I've asked this question to multiple people and nobody was able to give me a solid answer, for cyclic linkage and multiple definition errors you can <code>inline</code> functions in the .hpp and static members you can also <code>inline</code> to allocate them without a .cpp. Furthermore templated classes require the definition to be in a .hpp or to manually declare the functions as <code>extern</code> so it's very confusing. This is how I've been doing it so far

<h3 id="HEADER_ONLY">Header-only library</h3>

If the library is header-only there should not be a single .cpp anywhere. The following form should be used:

Inside the same access-specifier (private, protected, public) region, the declarations should be in the following order:

0. using / friend class declaration
1. static member variables
2. non-static member variables
3. Constructor, Destructor, Copy- and Move-Constructors
4. Assignment operators
5. other operators
6. static member functions
7. non-static member functions 

Inside the class the access-specified regions should be in the following order:

1. private
2. protected 
3. public

All functions should be defined inline, for non template files the <code>inline</code> keyboard should be used. Similarly all static members, both in templated and non-templated classes, should be initialized inline. This may cause static initilizations to be sensitive to the order they're declared in a file so be wary of that. If you're not sure you can always use the <a href="https://isocpp.org/wiki/faq/ctors#static-init-order" target="_blank">construct-on-first-use idiom</a>.


{{< highlight Cpp >}}
// template_foo.hpp
template<typename First_t, typename... Args_t>
class TemplateFoo : protected ParentFoo 
{
    private:    
        static inline MemberType _static_private_member = //...
        Function_t _private_member;
        
        void private_func(Args_t... members) const 
        {
            // full definition here
        }
        
    protected:
        using Function_t = std::function<First_t(Args_t...)>;
    
        static inline protected MemberType _protected_member = //..
        MemberType2 _protected_member;
        
        template<typename T>
        First_t protected_func(T) 
        {
            // full definition here
        }
        
    public:
        static inline constexpr float PUBLIC_CONST_FOO = 42;
        float x, y;
        
        Foo() = default;
        Foo(Args_t...) = default;
        // + dtor, move-assignment, copy-constructor, etc.

        static float static_function() 
        {
            // full definition here
        } 
        
        auto get_private_member() const 
        {
            return _private_member;
        }
}

// non_template_foo.hpp
class NonTemplateFoo : public TemplateFoo<int, int>
{
    private:
        static inline int member = TemplateFoo<int, int>::static_function();

    public:
        inline NonTemplateFoo() 
        {
            // full definition here
        }
}
{{< /highlight >}}

Advantages of this form include an easier time linking thing, being able to access the source code directly by just following back the header you included and less duplicated elements because you do not have to redeclare the template for every external definition. 
Disadvantages include far larger compile time and the fact an IDE is needed so collaborators can collabls longer functions or internal classes to rapidly access all declared functions signatures. If that last point doesn't fully make sense, let's compare with the non-header only format:

<h2 id="NON_HEADER_ONLY">Not Header-only Library</h2>

If the library has at least one .cpp it is not header only and the following form should be used for all interal files from your library:

Inside the same access-specifier members should be declared in the following order:

0. using / friend class declaration
1. static member variables
2. non-static member variables
3. Constructor, Destructor, Copy- and Move-Constructors
4. Assignment operators
5. other operators
6. static member functions
7. non-static member functions 

Inside the class the access-specified regions should be in the following order:

1. public
2. protected 
3. private

Note that this is inverted when compared to header-only libraries. This is because in non-header-only libraries the class body should exclusively contain declarations. All functions and static members should be defined in the .cpp or if that is not possible (for example because the class is templated) they should still only be declared in the class definition and then defined later in the .hpp as such:

{{< highlight Cpp >}}
// template_foo.hpp
template<typename T>
class TemplateFoo : public ParentFoo 
{
    public:
        TemplateFoo();
        float get_member(); 
        void set_member(float) const;
        
    protected:
        static Type _protected_member;
        
    private:
        void private_function();
        float _private_member;
}

// ###################################################################

template<typename T>
Type TemplateFoo<T>::_protected_member = // ...

template<typename T>
TemplateFoo<T>::TemplateFoo() 
{
    // full definition
}

template<typename T> 
TemplateFoo<T>::get_member() const 
{
    return _private_member;
}

template<typename T> 
void TemplateFoo<T>::set_member(float f)
{
    _private_member = f;
}
{{< /highlight >}}

{{< highlight Cpp >}}
// non_template_foo.hpp
class NonTemplateFoo : public ParentFoo 
{
    public:
        NonTemplateFoo();
        float get_member(); 
        void set_member(float) const;
        
    protected:
        static Type _protected_member;
        
    private:
        void private_function();
        float _private_member;
}

// non_template_foo.cpp
Type NonTemplateFoo::_protected_member = // ...

NonTemplateFoo::NonTemplateFoo() 
{
    // ...
}

NonTemplateFoo::get_member() 
{
    return _private_member;
}

NonTemplateFoo::set_member(float f) 
{
    _private_member = f;
}

void NonTemplateFoo::private_function() 
{   
    // ..
}
{{< /highlight >}}

Advantages with this form include very nice readability. With just one look you get a complete overview of every function protected and public of a class without having an IDE to collpased the definitions and since everything is sorted as detailed above it's very easy to quickly go "what static members has this class again?" and go to the .hpp and find out within seconds. Another advantage is compile time, this is a very subjective thing because it depends both on your personality and what machine and environment your working with, if you're in a 100 person company then you probably only work on a small module that compiles within seconds and you have a machine that your employer gave you so having those compile times be 2s quicker really doesn't matter. If you're like me and your working on your kinda old laptop and have to sometimes recompile tens of thousands of lines of code on it you really notice it. It's the difference between 15s and 1.5 minutes and I'm personally a fan of being able to iterate as fast as possible and not having to stare at my screen twiddling my thumbs while it compiles is part of that.<br>
The main disadvantage to this is the effort and extra work it takes. Not only do you have to handle twice the amount of files but especially for template functions redeclaring the <code>template<typename T> void Foo<T>::</code> every single definition can get tiring after the ten-thousands time and the fact that it's in the .hpp anyway may make it feel like a sisyphean task but I personally believe that the time spend to split delcaration and definitions like this will be worth it in the end when you back to a header you wrote two years ago and you don't have to scroll through hundreds of lines to know what's going on. <br>
You may have noticed the deviding line between the template class declarations and their definitions <code>// ## (...) ##</code>. I used to create a seperate file <header_name>.inl and then include that file at the end of the header. This works and especially in projects where the source-code should not be easily user-accessible this may be the better option but I'm not a fan of introducing another arbitrary file-extension that isn't .cpp into my project so I will keep things in the header for now. 

<h1>Comments & Documentation</h1>

<h2 id="DOCUMENTATION">Inline Documentation</h2>
Unless otherwise fixed by the documentation API your project uses, the following from should be employed for all public or protected functions:
{{< highlight Cpp >}}
// @brief : Brief Description of what the functiom does, should only be one sentence
// @param name_param: First parameter, if it is named the name should come after @param
// @param 2: Second parameter, if it is unnamend the name should be replaced with an integer
// @returns: Return type and additional information 
// @author: Clem (optional)
Foo& add_to_foo(Foo named_param, int);

// c.f. below for a practical example
{{< /highlight >}}

For private functions or functions and classes in <code>namespace detail</code> the documentation can be substituted with a single line like this:
{{< highlight Cpp >}}
// Add to foo
// @author: Clem (optional)
Foo& add_to_foo(Foo named_param, int);
{{< /highlight >}}

While it would of course be best to document everything it is just a reality of software development that things that only you work on will be documented last and once your at that point you don't see the point anymore so you'll just keep it undocumented. I feel like this one-line solution is a good compromise. Note how the @author notion is still employed, this is so in a collaborate setting if someone else uses the function and the one line did not give enough context to make them understand what the function does they know who to ask which is sometimes faster and easier than trying to understand the code out of context. 

<h2 id="COMMENTS">Comments</h2>

All comments should be inline-comments of the form <code>// This is a comment</code>, notice the space after <code>//</code>. The reason all comments should be inline comment is mostlys a matter of preference, obviously any multi-line comment can be functionally equivalently replaced with many inline comment but if I was put on the spot to give a valid reason to never use multi-line I would argue that when debugging, you often multi-line comment out huge parts of code. If the code itself contains multi-line comments then that region will be interrupted making you have to create another multi-line comment region to truly disable what you wanted to. 
<br>
Comments should be short, conscise and in english. When writing a comment always ask yourself: "if another person reads my code, would they understand it clearly without the comment?". If the close to yes than no then delete the comment and maybe refactor the structure or rename some variables. Non-documentation comments should be a last-resort, your code should be easily understandable as is and I often see either beginners or people who learned to code in the 80s and never really evolved past that having non-sensical variable names in complex sections and then having a comment at the very beginning of that section explaining what is happening. This is bad form and is the main reason I encourange overly verbose variable names. Let's look at a practical example.

I would first like you to look at this code completely out of context. I intentionally choose variable names poorly but without malice, maybe I'm new or I really didn't have time to do this so I just submitted my first draft as a pull request

{{< highlight Cpp >}}
class Base 
{};

class Wrapper : public WrapperBase
{
    // ...
};

ThreadPool 
{
    void start(size_t);
    
    std::condition_variable _var;
    std::mutex _mutex;
    std::queue<std::unique_ptr<TaskWrapperBase>> _q;
    
    std::vector<std::thread> _w;
    
    bool _res,
         _shutdown,
};

void ThreadPool::start(size_t n)
{
    assert(_t.empty());

    for (size_t i = 0; i < n; ++i)
    {
        _t.emplace_back([&]()
        {
          auto lock = std::unique_lock<std::mutex>(_mutex, std::defer_lock);
          while (true)
          {
              lock.lock();

              _cv.wait(lock, [&]() -> bool {
                  return _res || !_queue.empty() || _shutdown;
              });

              if (_res || (_shutdown && _queue.empty()))
              {
                  return;
              }
              
              auto t = std::move(_queue.front());
              _queue.pop();

              lock.unlock();
              t->operator()();
          }
        });
    }
}
{{< /highlight >}}

What happens in this code? I'm sure you will be able to figure it out eventually but this isn't a pop-quiz, it's simply a demonstration. Let's look at the code again but overly commented in a vein effort to explain what is happening:

{{< highlight Cpp >}}
// empty base needed for unique pointer 
class Base 
{};

// Wraps tasks
class Wrapper : public WrapperBase
{
    // ...
};

ThreadPool 
{
    public:
        // ...
        
    private:
        // initialize threads
        void start(size_t);
        
        std::condition_variable _var;
        std::mutex _mutex;
        std::queue<std::unique_ptr<TaskWrapperBase>> _q;    // task queue
        
        std::vector<std::thread> _w;    // worked threads
        
        bool _res,      // is threapool paused for resizing?
             _shutdown, // is threapool shutting down?
};

void ThreadPool::start(size_t n)
{
    for (size_t i = 0; i < n; ++i)
    {
        // add thread with routine
        _t.emplace_back([&]()
        {
          // create lock for queue
          auto lock = std::unique_lock<std::mutex>(_mutex, std::defer_lock);
          
          // keep checking if new task for taskqueue is ready
          while (true)
          {
              lock.lock();
              // wait at conditional variable until notified
              _cv.wait(lock, [&]() -> bool {
                  return _res || !_queue.empty() || _shutdown;
              });

              // finish routine when resizing or shutting down
              if (_res || (_shutdown && _queue.empty()))
              {
                  return;
              }
              
              // then get task
              auto t = std::move(_queue.front());
              _queue.pop();

              lock.unlock();
              
              // and run it
              t->operator()();
          }
        });
    }
}
{{< /highlight >}}

This is prefectly understandable, I think most people will immediately know whats going on and it could be argued that's the only thing that counts but I don't think so. Operating under the paradigm of "only comment when absolutely necessary" we can rewrite the code with no comments without sacrificing clarity like so:

{{< highlight Cpp >}}
class TaskWrapperBase 
{};

class TaskWrapper : public TaskeWrapperBase
{
    // ...
};

ThreadPool 
{
    public: 
        // ... 
        
    private: 
        // @brief create worker threads
        // @param 1: number of threads
        // @returns: void
        void initialize_worker_threads(size_t);
        
        std::queue<std::unique_ptr<TaskWrapperBase>> _task_queue;
        std::condition_variable _queue_conditional_variable;
        std::mutex _queue_mutex;
        
        std::vector<std::thread> _worker_threads;
        
        bool _is_paused_for_resizing,
             _is_shutting_down;

};

void ThreadPool::initialize_worker_threads(size_t n_threads)
{
    for (size_t i = 0; i < n_threads; ++i)
    {
        _worker_threads.emplace_back([&]()
        {
          auto queue_lock = std::unique_lock<std::mutex>(_queue_mutex, std::defer_lock);
          
          while (true)
          {
              queue_lock.lock();
              _queue_conditional_variable.wait(queue_lock, [&]() -> bool {
                  return _is_paused_for_resizing || !_task_queue.empty() || _is_shutting_down;
              });

              if (_is_paused_for_resizing or _is_shutting_down and _task_queue.empty())
                  return;
              
              auto new_task = std::move(_task_queue.front());
              _task_queue.pop();

              queue_lock.unlock();
              
              new_task->operator()();
          }
        });
    }
}
{{< /highlight >}}

I think it is appropriate to say that this version is just as clear and easy to understand as the commented version except this time the reader actually looks at the code. Someone trying to debug the first version will ignore the code completely on their first read because they don't need it to understand what's even going on. The only thing I would argue warrants a comment is <code>new_task->operator()();</code> because the operator declaration has been skipped for brevity in <code>task_wrapper</code> so the reader (you) can't besure what exactly that operator does. But because the variable is name <code>new_task</code> and the thread is a worked thread I assume you will get that the worker thread does the task simply from context. That is the power of verbose, well-structured variable names and code in general. You don't need someone to explain how something works to you, you can just open it like a machine and everything is clean and well labeled so it's easy to understand. It respects the readers intelligence and invites them to actually analyze the code as quickly as possible and maybe find bugs or things that could be better. 

<h1 id="EPILOGUE">Closing Comments</h1>
Here are some things I didn't know where to put structurally but that I still think are important to say

<h2 id="EPILOGUE_GIT">Version Control</h2>
Commit as often as possible. Anytime you change file and continue to the next one you should create a new commit. The commit message should be what you have just done, past-tense, not what you're about to do. The more granular the commits are the easier it will be to rollback when something goes wrong and similar to documentation well formatted messages will help you understand thing instantly even 2 years later. Consider comming up with a labeling scheme each message begins with, I often see things like <code>[FIX], [POLISH], [TYPO], [ISSUE#1234]</code> etc.. Some teams even uses emotes which I do kinda like but not all shells support this so maybe alphanumerical would be better
You'd think having a million commits would get hard to manage but that's what pull-requests are for. The collapse all the tiny commits into one big package and by grouping them like this you both get the convenience of having the granularity on your machine but once it goes to the team they don't have to sift through pages and pages of messages to rebase. 

<h2 id="EPILOGUE_BENCHMARK">Test and Profile Frequently</h2>
Testing modules frequently is non-negotiable. I recommend <a href="https://github.com/google/googletest">google test</a> but an internal testing framework can also be used. Testing assures correctness and it can be used later to see if modules interact properly. Testing is like a stamp that checks if the puzzle pieces properly fit. If you don't do this they may fit but then 2 years later you realize one doesn't and replacing it will mean you have to replace every adjacent one and it's a mess. Always test everything, test small pieces of modules, you don't need to write a test for every function but a test shouldn't take 30mins to finish. That way if you only change on part you don't need to run the giant test again and again to see if it works now.

Profiling and Benchmarking are a more sublte issue because they aren't always necessary. For certain application yes, you should absolutely benchmark and especially if you're currently trying to optimize already existing code the only way you can do that properly is to optimize by eye, then run it to see if it actually got faster. Pretending like you're a pro and you can spot every bottleneck by just reading the code may be true sometimes but we're all human and humans make errors, no matter how good they are at what they do.
A good middle-ground I found is to have a profiling tool run in the background. For example for my game I have a seperate process that monitors how much time of the 1/60ths of a second the rendering and simulation needs and how much time the engine is just waiting for the monitor to refresh. If nothing happens that index is at 0%, if the engine is so slow that it will lag the screen it's above 100% and constnatly having that number on the side of m y screen will make me aware of stuff going wrong, if I changed something small and suddenly when I open this window it peaks to 80% instead of the usual 15% I know something is up and I need employ a proper profiler to investigate. 
<br>

<h2 id="EPILOGUE_OPTIMIZATION">When Optimization is Appropriate</h2>

On the topic of optimization, don't always go for the optimal way of doing things unless it's necessary. Again, some for some environments it's true, always do it the fastest way that's what counts but be realistic about it. If you for example want to allocate user made objects and access them later by ID and you expect the user to at most ever make 6 objects then writing a specially-hashed map that objects them in sub-logarithmic time is really not worth it vs just putting them in an array and iterating over all indices everytime you need to access them. 
Similarly I would always think first before parallelizing something. Anytime that decision is made, the reason should be "we can't make it sequential because x". Sequential should always always be default, parallelization is something that introduce so much complexity and hard-to-catch bugs that I would honestly recommend not doing anything in paralell until you're read to release and then paralellizing thing to make everything snappier though this requires a good softwaredesigner because things have to be designed in a way that would work both sequential and in paralell from the beginning

<h2 id="EPILOGUE_REFACTOR">Refactor at least once</h2>
When you realize you accomplished your taks or fixed a bug, take some time to go through your code again to pretty it up. I often set myself goals like "today I will implement x" and then at the end of the day when I run my test and it goes through I'll go "done for today" and leave and then I never touch that file again until something goes wrong. This is not good, just because something work doesn't mean it's done. It's not even about adding documentation, sometimes irrelevant stuff will be left over or an if-else branch has duplicate branches or variable names don't really make sense or most commonly <strike>I</strike> you slacked off and didn't 100% keep to the style guide rules detailed above. Always doing at least one refactor will do wonders to keep your code clean and most importantly the more you do this the more you will just do things properly the first time. I'm still learning to do this but I'm already noticing that my mandatory-refactor-time went down from about 15mins everyday to just 5. 
