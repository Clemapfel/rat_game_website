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

I learned programmring pretty much on my own completely out of context very late in my life and I've come to realize that writing a programm should require the same amount of editing work as if I was writing a paper, a pamphlet or a blog. Often code is seen as 100% utilitarian and as long as it works right it's as good as it needs to be and I vehemently agree with this. Often people complain about badly kept documentation which is a problem obviously but it can be alleviated greatly if any potential user or colleague working on your library can just read the header and understand whats happened. For me this is the central goal for writing code, obviously it should work and also obviously it should be as optimal as possible in a performance sensitive context but apart from those two factors readability, clarity should always be prioritized. Often people treat tis as a zero-sum-game and it really isn't, I especially noticed this when learning GLSL where often reference material was written like we're still in the 70s and variables have a character limit so they take up less space in your 1kb ram. 
My goal with this piece is to give any potential collaborater, employee or employer of mine to have not only a reference of how to reproduce my specific coding style but to understand why I do certain things they way I do. Some things are as arbitrary as "it just looks nicer" but often I have a clearly formulated goal behind certain rules. Secondly by writing this piece I'm forced to interrogate my own Style and investigate wether I adhered to properly and if my choices really do make sense. I have to admit that especially for 1-person-projects where I don't excpect anybody to ever see the code I will slack off but this past year I've been trying to eliminate that attitude entirely, mostly because adhering to your standards just makes you better at writing clean `code` the first time. 

<div class="muted"><small>(The following is intended for C++17 and up. Unless stated otherwise. A similar guide for Lua and maybe R may be relased in the future)</small></div>


<h1 id="TOC">Table of Contents</h1>
    0. <a href="#INTRODUCTION">Introduction</a><br>
    1. <a href="#VARIABLES">Variables</a><br>
    1.1 <a href="#VARIABLES_NAMING">Naming</a><br>
    1.2 <a href="#VARIABLES_DECLARATION">Declaration</a><br>
    2. <a href="#OPERATORS">Operators</a><br>
    2.1 <a href="#OPERATORS_PTR">References, Pointers, rvalues</a><br>
    2.2 <a href="#OPERATORS_LOGIC">Logical Operators</a><br>
    2.3 <a href="#OPERATORS_NUMERIC">Numerical Operators</a><br>
    2.4 <a href="#OPERATORS_PREFIX">Pre- and Postfix Increment</a><br>
    3. <a href="#FUNCTIONS">Functions</a><br>
    3.1 <a href="#FUNCTIONS_MEMBER">Member Functions</a><br>
    3.2 <a href="#FUNCTIONS_LAMBDA">Lambda</a><br>
    4. <a href="#CLASSES">Classes</a><br>
    5. <a href="#COMMENTS">Comments and Documentation</a><br>
    6. <a href="#EPILOGUE">Closing Remarks</a><br>
    6.1 <a href="#EPILOGUE_GIT">Version Control</a><br>
    
    
<h1 id="VARIABLES">Variables</h1>
<h3 id="VARIABLES_NAMING"> Naming </h3>

The following Variable naming scheme should be adhered to at all times, in all languages unless physically impossible. <small>(Looking at you, Swift, no emotes and umlaute in var-names anymore)</small>

<table style="width:100%">
  <tr>
    <th>Scope</th>
    <th>Qualifier</th>
    <th>Naming</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>local scope</td>
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

While a table like this is nice for referencing back to, also have this fully syntax-highlighted example that contains all relevant cases in a practical way:

{{< highlight Cpp >}}

{{< /highlight >}}


Furthermore certain datatypes should be noted in the format of the variable name, somewhat similar to hungarian notation but a lot lighter and less intrusive. The following is an exhaustive list, any other types not noted should not have a suffix like this:

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
    <td>typedef, typename or u>sing declaration name</td>
    <td>Foo_t</td>
  </tr>
</table>


<h3 id="VARIABLES_DECLARATION"> Declaration </h3>

When declaring variables, any variable that explicitely calls a constructor should be declared as <code>auto</code>:
{{< highlight Cpp >}}
// wrong:
Vector2f vec = Vector2f(20, 50);
Vector2f vec = create_vector(20, 50);
Vector2f vec{20, 50};
Vector2f vec(20, 50);

// correct:
auto vec = Vector2f(20, 50);
auto vec = create_vector(20, 50);
{{< /highlight >}}

This is to avoid confusion with C++20s new aggregate initialization with round brackets as it is not immediately obvious which of these the following statement tries to invoke:

{{< highlight Cpp >}} Vector2f foo();{{< /highlight >}}

I could be either calling the default constructor of Vector2f with c++20 aggregrate initialization with round brackets and no arguments or declaring a function with return type Vector2f and no arguments. Using 

{{< highlight Cpp >}} auto foo = Vector2f();{{< /highlight >}}

makes it immediatly obvious.

An exception to this form is when the variable is of an integral or floating point type. This is to avoid situations like:

{{< highlight Cpp >}}
auto first_f = 1.0;  // resolves to double
auto second_f = 1;   // resolves to signed int
auto third_f = 1.;   // resolves to double
auto fourth_f = 1.f; // resolves to float
{{< /highlight >}} 

While the compiler or an experience user will never be confused by this I think it is much more clearer to just declare the type explicitely and maybe force an implicit conversion which since it's only an numeric type will cause very little overhead.

On the topic of casting, <code>static_cast<foo></code> should always be preferred, even if foo is a trivial numeric type:

{{< highlight Cpp >}}
double high_precision = 2.21531652318625317;

// wrong
float low_precision = float(high_precision);
auto low_precision = float(high_precision);
float low_precision = static_cast&ltfloat>(high_precision);

// correct
auto low_precision = static_cast&ltfloat>(high_precision);
{{< /highlight >}}

If multiple variables of the same type are declared one after another, this form should be used at all times including in class definitions for member declaration:

{{< highlight Cpp >}}
std::string first_name, 
            last_name,
            adress;
            
Foo *ptr_one,
    *ptr_two;
    
Bar &ref_one;
Bar not_ref_two;
{{< /highlight >}}

There should always be a newline after the first declaration. If one of the variables is a pointer, reference, r-value, etc. then all of them should. if this is not the case, the type should be redeclared;
    
    


<h1 id ="OPERATORS">Operators</h1>

So I think in this chapter I will ruffle some feathers so I would like to explicitely state that a styleguide is not an objective answer to a problem, it is a preference and it's only purpose is to make code look <i>consistent</i>. Over my admittedly relatively short career I grew to like this form of doing things best and I feel like as long as I and any collaborator do it this way, every time it's a valid choice.

<h3 id="OPERATORS_PTR">Reference, Pointer, lref, etc.</h3>
In function declarations, loops, etc., there should be a space following the &, *, && operators but not preceding it:
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

I've been doing this since I started and I know it's an unpopular choice so let me justify it a little. When we read out code irl, when someone asks us: "What is the type of <code>const Foo* bar</code>?" we answer "constant foo pointer" or "a pointer to a constant foo". Similarly with with references and rvalues, lvalues, and even c-style arrays. Thus I consider wether or not something is a pointer part of it's type in my head and this is reflected in this notation. I have to admit that this breaks apart when using the following declaration syntax:

{{< highlight Cpp >}}

const Foo& first,           // type Reference to a const Foo
           second,          // type const Foo
           *third,          // type Pointer to a const Foo
           *fourth const;   // type constant Pointer to a constant Foo

{{< /highlight >}} 

This is incredibly confusing and putting the & next to "first" would be a lot more clearer however I would argue that writing it like this is confusing to begin with, earlier I stated that if one of the variables in a declaration chain like this is a different pointer/reference, a new chain should be opened. This avoids this situation and other than this case I am not aware of a C++ feature that makes my no-preceding-space operators not make sense. I am however willing to have my mind changed and just the fact I once spent an hour trying to track down a bug because I didn't know the multi-declaration work like that would make a good argument to at least make it preceding- and following- spaces instead. Anyway lets get to another very spicy take of mine:

<h3 id="OPERATORS_LOGIC"> Logical Operators </h3>

Always use <code>and, or, not</code> instead of <code>&&, ||, !</code> for boolean operands.<br>
Always use <code>&, |, ^, ~</code> for numerical operands as bit operations.

Always use <code>and, or, not, bitand, bitor, xor, compl</code> instead of <code>&&, ||, !, &, |, ^, ~</code>.

Obviously <code>and/not/or</code> are also bit-operations but what I mean is that if <code>!</code> is used, it should be read as flipping that operands byte rather than negating a boolean expression. I have to admit that I like lua a lot and while I'm neutral on the if-then-else syntax the "and" and "not" really do increase readiblity, especially for someone who is less knowledgable in "hard" languages like C++ and is more used to something like matlab or VBS. Let's look at a real example from my game:

{{< highlight Cpp >}}
std::vector<BattleID> BattleMove::get_valid_targets(BattleID user_id, const BattleScene *scene) const
{
    std::vector<BattleID> out;
    for (auto& id : scene->get_entities())
    {
        bool is_enemy = scene->get_handler()->is_enemy(id);
    
        if (id == user_id and can_target_self() or 
            not id == user_id and not is_enemy and can_target_ally() or
            is_enemy and can_target_enemy())
        {
            out.push_back(id);
        }
    }
    return out;
}
{{< /highlight >}}

You're missing a lot of context yet when I would ask you in what case a target is considered "valid" you could simply read out the if clause without thinking twice about it because the and, or, not combined with the above mention question-format of boolean variables make the code very close to human language, much close I would argue than using the traditional logical operators. Furthermore <code>and/or</code> are equivalent to && and || meaning the shortcut. Often a beginner will introduce performance issues into their code by not knowing what that means and using the bit-and and or that do not shortcut. Using <code>and/or</code> makes this effortless. In summary I would say this: if <code>and/or/not</code> where not in some way better than the traditional operators, why would they have been added if they weren't better in some way.

I am currently still undecided on <code>not_eq, and_eq, or_eq</code>, I have to admit I don't use them which is probably inconsistent I don't really have a valid reason for that, once again this is just my preference and subject to change, especially if a good argument is brought against my way of doing things.

<h3 id="OPERATORS_NUMERIC">Numerical Operators</h3>

There should be a space precedeing and following the binary operators <code>+, -, /, %</code>. The unary <code>-</code> should be used on variables as well as number constants.

If the left operand of <code>*</code> is a number constant, the following space can be ommited (c.f. below)

{{< highlight Cpp >}}
int a, b;

// wrong:
c = 2*(a*b);
c = a*b;
c = -1*a;

// correct:
c = 2 * (a*b);
c = 2*a * 2*b;
c = 2 * a * 2 * b;
c = a * b;
c = -a; // always use unary instead of -1*

// all other operators should have a space before and after:
{{< /highlight >}}

Unless in performance critical code where every operation counts, it is sometimes preferable to use the non-simplified formular for something if it aids in clarity, this is up to personal preference and the whim of whoever is in charge of okay-ing pull requests.

<h3 id="OPERATORS_PREFIX">Pre- and Postfix Increment</h3>

Prefix incremenet / decrement should always be preferred over the other options unless specifically necessary to produce the desired behavior:

{{< highlight Cpp >}}
size_t n = 0;

// wrong:
for (auto it = vec.begin(); it != vec.end() or n < 15; it += 1, n++)
    // ...
    
// correct:
for (auto it = vec.begin(); it != vec.end() or n < 15; ++it, ++n)
    // ... 
    
{{< /highlight >}}

This is to avoid hard-to-catch bugs where the execution order is important to the routines result in a way that impacts stability. Usually in those situations prefix increment will always work well while postfix increment would cause the bug. 

<h1 id="FUNCTIONS">Functions</h1>
All functions are lower-case snake_case. This includes lambdas however Functors should be named according to the class naming specification (c.f. below). On declaration function argument should be unnamed unless specifically necessary to give context or if there are multiple arguments of the same type:<br>
{{< highlight Cpp >}}
void set_position(Vector2f);
void add_percentage(float zero_to_one);
void set_name(std::string first_name, std::string last_name);
{{< /highlight >}}

Here, the name for the argument in <code>add_percentage</code> is needed so the user knows to specify a float in range [0, 1] rather than [0, 100] as "percent" might imply.

<h3 id="FUNCTIONS_MEMBER">Member Functions</h3>

Members functions that set one or more member variables should always be named <code>set_*</code> where <code>*</code> is the name of the member variable, even if that variable is private:

{{< highlight Cpp >}}
class Color
{
    public:
        void set_r();
        float get_r() const;

        void set_alpha();
        float get_alpha() const;

    private:
        float _r, 
              _g, 
              _b, 
              _alpha;
}
{{< /highlight >}}

If the function returns a single bool, if that bool is a member variable named <code>_is_foo</code> it's getter should be named <code>get_is_foo()</code>, however if 
that value is not a member it's getter should be phrased like a yes-no question, for example:

{{< highlight Cpp >}}
class OsWindowHandler;
class RenderWindow
{
    public:
        void set_closed(bool b) 
        {
            _closed = b;
        }

        bool get_is_closed() const
        {
            return _closed;
        }

        bool is_focused() const
        {
            return OsWindowHandler::is_window_focused(_id);
        }

        bool should_notify_on_close() const
        {
            return OsWindowHandler::get_context_settings(__id).should_notify_on_close;
        }

    private:
        std::string _id;
        bool _is_closed = false;
}
{{< /highlight >}}

Lambdas are very powerful however it can be very attractive to not add a new member function and instead just open a local lambda function inside another function. Lambdas should be used only where necessary, if you would call the potential member function from 2 or more places, it's almost never worth it to not just create the new function.
If the lambda function itself is only called once inside it's scope, consider making it anonymous, the most common place would be inside a set or sorting algorithm with a custom comparison. If more than 1 routine needs it, consider making it either a member or just creating a functor.
Another place I like to employ lambdas is for inline static initialization. Sometimes you need to call functions that do not return the object you're trying to initialize like so:

{{< highlight Cpp >}}

class TexturedFoo : public Drawable 
{        
    public:
        TexturedFoo(std::string texture_id)
            : _texture([&]() -> Texture&& {
                
                auto texture = new_texture();
               
                if (not texture.load_from_file(texture_id))
                    throw /...
                
                return std::move(texture);
            }())
        {}
        
      private:
        const Texture _texture;
        
        static inline const _window_resolution = []() {
        
            if (not RenderWindow::is_initialized())
                RenderWindow::initialize_from_config();
                
            return RenderWindow::get_resolution();
        }();
}
{{< /highlight >}}

I think this can be a very elegant way to initiate things that need a more complex routine than just calling it's constructor yet do not justify opening their own initialize() function somewhere else. You may have also notice my way of formatting lambda, unlike regular functions the first { should be in line with declaration, followed my an empty newline and then followed by the function body. Doing it all in one line can feel elegant because you did something really complex in just one line but the ego boost is rarely worth it. Lambdas are already somewhat hard to read and using formatting of the same quality as you would use for regular functions is advisable. When using lambdas it's almost alway best if you just specify <code>[&](auto arg_1, auto arg_2){}</code> nowadays, this automatically captures all things the lambda needs by reference and it auto deduces both the argument and return type. I'm not positive if this impacts performance but the convenience is worth it, maybe in 2011 you needed to do things manually but in 2021 using auto as much as possible is almost always the best option. I do however have one case where I do not think it is:


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
// @returns rvalue of function<Return_t()>
template<typename Return_t>
auto create_function() 
{
    return std::move(std::function<Return_t()>());
}

{{< /highlight >}}

Sometimes setting the return type is absolutely necessary however it isn't always. I often see devs being lazy and not wanting to type out a long templated expression and while the code will compile if it's complex enough it can be very hard to use. The user is not sure what type the function actually returns, if they should std::forward the result, what could possibly trigger implicit conversion, etc.. The best compromise here is to explicitely state the return type along with the description in the @return tag. This way a user doesn't have to understand the function body to know whats going on and you get to put auto which, as I said before, should nowadays be used as often as possible. 

<h1 id="CLASSES">Classes</h1>

Classes and other class-like entities are always upper-case CamelCase. This includes structs, unions, enums, typenames and typedefs or using-declarations for class-like entities.
On the topic of enums, as all Enum members are inherently scoped static constants, they should be in all-caps SNAKE_CASE. Enums should be specific as enum-class when they are outside of the namespace scope, such as inside class or maybe also in <code>namespace detail</code>. If one or more Enum members are explicitely declared, the enum should also specify the underlying integral type explicitely;

{{< highlight Cpp >}}
// wrong:
template<class returns, typename... args>
class Foonctor
{
    public:
        returns operator()(args... args);
        
    private:
        enum state { STATE_A = -1, STATE_b };
} 
// correct:
template<typename Return_t, typename... Args_t> // always use typename, _t suffix 
class Foonctor 
{
    public:
        Return_t operator()(Args_t...);
        
    private:
        enum class State : int      // enum class because it is not global
        {                           // manually specifiy int because STATE_A is hardtyped to -1
            STATE_A = -1,           
            STATE_B
        }
}

{{< /highlight >}}

<code>class</code> shold be preferred over struct unless every member and memberfunction of the object is public. <code>public, protected, private</code> should always be explicitely declared for every member, unless <code>struct</code> is used in which case neither should be specified.

{{< highlight Cpp >}}

// wrong:
struct RGB 
{
    public:
        float _r, _g, _b;
}

struct Color 
{
    RGB to_rgb() const;
    
    private:
        float _alpha;
}

// correct:
struct RGB 
{
    float _r, _g, _b;   // no "public:" if struct
}

class Color // use class because there is a private member
{
    public:     // always manually specify
        RGB to_rgb() const;
        
    private:
        float _alpha;
}
{{< /highlight >}}

Lastly I would like to talk about the order members should be written in. All classes should follow this template:
{{< highlight Cpp >}}
// foo.hpp
class Foo 
{
    // friend declarations
    friend class FriendFoo;
    
    public:    
        // ctor, dtor, copy/move constructors, rule of five, etc.
        Foo(...);
        
        void setter_1(int);
        int getter_1() const;
        
        void setter_2(float);
        float getter_2() const;
        
        static const size_t PUBLIC_FOO_MEMBER_CONSTANT;
        Vector2f PUBLIC_FOO_MEMBER;
        
    protected:
        void protected_foo_function();
        
        size_t _protected_foo_member;
        
    private:
        class InternalFooClass {};
        enum InternalFooEnum {};
        
        void private_foo_function();
        std::any _private_foo_member();
}

// foo.cpp

// foo functions in the same order as in class declaration
Foo::Foo() {...

void Foo::setter_1(int) ...      
int Foo::getter_1() const ...;
        
}
{{< /highlight >}}

For all scopes it's CTOR/DTOR first, then functions (setter before getter), then member variables. Public first, then protected then private. However this only applies if you are implementing the class in a .cpp. If everything is defined inline, you instead invert the order, so first private member vars, then private function, the protected member vars, then protected function, the public member vars, then public functions. This is because when someone is reading that header they would not understand the functions since they have no idea what any of the members are or do. With a .cpp this isn't a problem because all declarations including the members are read during the first pass of the .hpp so by the time a colleague goes to the .cpp they have all the context they need. 

Lastly I would like to briefly talk about internal classes. C++ is very powerful because it not only lets you nest classes inside each one but these classes themself can inherit from multiple others (and even from each other within a super class). This is very, very rarely necessary. I used to just put classes inside others to "hide" them from the user. This class functionality is only necessary in it's outer class so you put it in there so it's invisible, however this should only be done if the internal class actually needs to be there, for example because it needs access to the outer classes members and even then it's sometimes best to instead move the internal class into <code>namespace detail</code> and just have it befriend the formerly outer class. Nesting classes is really useful but it should only be done if absolutely necessary as it can make code very hard to follow, especially if all definitions are inline in the same .hpp. Lastly if multiple different classes are declared inside the same .hpp, be it because they are internal or because they make sense to be together, each class should have it's own .cpp. This way they can be accessed by just including and working with the same header but on your end it doesn't become cluttered and you have to scroll through and then recompile 5000 lines of unrelated code so you can work on the the outer class. Always try to compartmentalize as much as possible, that compared with good software design will make it so once a file is done and working you can just leave it alone and never have to look at it again. 

<h1 id="COMMENTS">Comments & Documentation</h1>

For comments, always have a space following <code>//</code>. The following might be contentious but do not use multi-line comments at all. My rational for this is the follow: a) every multiline comment can be replace by single-line comments and the only difference is that you save a single character per line (<code>*</code> instead of <code>//</code>) and b) When debugging I like to comment out huge parts of code sometimes. When the regular comments also have multi-line comments this breaks-apart my commenting-out so I will have to do another multi-line comment after the regular comment and it's really annoying. Admittedly this is a very petty issue so if you really do want to use multi-line comments, format them as such:

{{< highlight Cpp >}}
// wrong:
/* 
    @author: Clem
    @param A: some random param
    @returns: void*/
    
// correct:
/* 
 * @author: Clem
 * @param A: some random param
 * @return: void
 */ 
 
{{< /highlight >}}

In general think about wether a person who has no idea what your code does needs the comment to understand it. If that's the case, think about wether that's because the code does something really complicated or wether the code itself is really complicated. In the latter case it is better to refactor things, rename variables and make the layout cleaner rather than using the easy out and writing what it does in a comment. 
This does not apply to comments that are needed for documentation systems like doxygen, however often those only need comments outside of the function/class. For comments inside the nitty-gritty of your code, try to have as few as humanly possible without sacrificing clarity (this does not apply to <code>// sic</code);

If no documentation system is in place (such as during development before release), the following comments should be added to every user-facing (i.e. not internal or inside namespace detail) class and every public function:

{{< highlight Cpp >}}
// wrong:

template<typename Number_t> 
// vector
class Vector : private std::array<Number_t, 2>
{
    public:
        Vector2(Number_t, Number_t);
        normalize();
        
    protected:
        template<typename Other_t>
        operator Vector2<Other_t>();
}

// correct:

// @brief n-Element Vector, intended for numeric types
// @param Number_t: type of element
// @param n: number of elements
// @author Clementine // optional
template<typename Number_t, size_t n> 
class Vector : private std::array<Number_t, n>
{
    public:
        // @brief CTOR
        // @param fist: First element          // use name or 1, 2, ... if no name in declaration
        // @param 2: Second element
        Vector2(Number_t first, Number_t);
        
        // @brief Normalize this vector
        // @return Reference to itself after normilization
        Vector2& normalize();
        
    protected:
        // cast to other type, needed for implicit conversion
        template<typename Other_t>
        auto operator Vector2<Other_t>();
}
{{< /highlight >}}

It's always nice to give credit but it can make your code cluttered to give the @author tag to every function and use @return even if the function is void so it is important to keep that in mind. In a more collaborative setting or a crowd-sourcing project however, @author for every function can be appropriate. I think as a beginner it's easy to fall into the thinking that commenting isn't coding so you're not getting any work done but look at it this way: You commenting will save someone else or even you in the future to take time and reread everything to understand whats going on. It's always worth it to spend the 30s typing out the documentation, always always, no exceptions.

<h1 id="PROJECT_FOLDER">Filenames, Ressources and Project Folder</h1>

<h2>File Names</h2>

Text files should always be lower-case snake_case. This includes files such as *.hpp, *.cpp, *.h, *.lua, *.py, *.txt, *.md, *.html. Excluded are c-make related files or similar files where the library in questions needs to you to confirm to their naming model. 

Resource files such as music, sprites, dialogue-trees, logs, etc. should be all-caps SNAKE_CASE. This is because inside your engine these files will have a non-human-readable ID at some point anyway and I think it's a lot easier to debug to give these an ID that's limited to all capital letters, numbers and _ instead of a size_t or something like that. That way in your debugger you can immediately identify ressources without having to cross-reference the map they are stored in. The all-caps will furthermore make it easy to tell-apart resources needed for your application and tertiary files, for examples you may have a .png that is the graphic for something you need which should have an all-caps name and in the same folder have the .ps file that stores all the information relevant to photoshop. That file should have the same name but not all-caps so when programming there will never be an error of accidentally loading a malformatted file, yet you can still keep them together to make exporting and version control easier. 

<h2>.hpp vs .cpp</h2>

*.hpp should always be preferred over *.h . *.h should exclusviely be used for projects that use specifically C and not C++. 

A less easy to answer question is wether or not you need .cpp files at all. When I started I was never sure what the actual reason for off-loading all the definitions is, it's true that back in the day you couldn't have everything in the header or you would get multiple-definition warnings but nowadays that's not true anymore. You can <code>inline</code> any static definition and you can <code>extern</code> any function to avoid things circular dependencies and linker issues. For templated classes you need to also manually specify extern if you want them to not be in the .hpp and it's just a mess. I may be missing some info here but for me it comes down to two questions: Should your project be a header-only library and if not, is compile-time important to you. The first part is obviously, if you don't want your user to have to compile your library make it header-only, that way it's a nice and easy drop-in solution. The only real disadvantage to this I can come up with is compile time. When you change something in a .hpp file the compiler will have to relink and recompile all files that include the header. For a small student project this may result in 0.5s more compile time but for a big project, especially one where very frequent iterating is the name of the game that compile time can add-up fast. If not using .cpp makes it so everytime you change something you have to wait 5s long, after 3 years and multiplied by dozens of employees that's a non-trivial amount of time spend unproductive looking at a screen. It's not that big of an issue but on a purely personal basis I prefer offloading as much as possible into a .cpp. Being used to working in lua and other non-compile languages it can be really annoying to just change the value of a number and having to wait 15s every time you want to see if that still triggers the error again. In summary that's what it comes down to for me. Are you scared of circular dependencies? Do you get annoyed at compile time when you could just be doing this in python right now and not have to wait? If you answer yes to either of those, use .cpps and maybe even <code>extern</code> all functions for templated classes.

<h1 id="EPILOGUE">Git, Miscellaneous Stuff & Closing Remarks</h1>

Before I thank you for reading I will go over some thoughts that didn't really fit into any of the other chapters:

Write your tests for small portions of code and test frequently. It's important to isolate as many of the variables that could trigger bugs because it helps you track them down faster. If you wrote routine A and B and only then ran them and saw there is a bug, you now don't know if it's A or Bs fault. If you ran A first, tested it, it worked and now after B stuff is breaking you'll have it so much easier

<h3 id="EPILOGUE_GIT"> Version Control </h3>

Commit as often as possible. This was a huge thing I've only recently started doing but every file should have their own commit basically, obviously sometimes you need to bundle it but each commit should be the smallest, sensible incremental progress. Having many commits doesn't hurt anybody, it's only on your branch. Once you try to make a pull request you should bundle things to not bog down your team with unnecessary busy work but as long as it's only on your machine make as many commits for the smallest things. That way you will never have to loose unrelated work that didn't have any problems when you have to go back.

Establish a consistent commit message format. This will have to be done with your team, a popular thing I've been seeing is either starting each message with a tag like [FIX], [POLISH], [ISSUE#456], etc. Another more modern way is to use unicode emotes, maybe the nailpolish emote for polishing code, a red X for and unstable build, etc.. Either way you start them, write your commit messages in way they say what you did before committing. Like if commit t-1 was fixing a bug, then commit t is polishing that code and commit t+1 is working on something unrelated, the messages should talk about the last step. Don't write at commit t "about to work on something unrelated" and t-1 "will polish now". If you scroll through your commit history to rebase later it will be hard to track which commit to actually go back to. instead write your commit messages in the past, say what you did before committing. The only valid exception to it is "stashing", where you just need to shelf something to work on something else and then go back and pick up where you left off. 

<h3 id="EPILOGUE_FIN">The End</h3>
Thank you for reading this far, hopefully you at least learned something or if you're reading this but do not actually have to work with me and don't need to standardize on my way of doing things I hope you may have gotten some ideas on how to find your own styleguide. Always remember that there's rarely a best way to do thing, what's most important is to be consistent within your library and to always want to evolve your style, if new features drop you should incorporate them, I see so many old-hats not liking C++20s ranges and using auto everywhere. std::LegacyIterator should not be part of your programs anymore, just because the code works it's not always just about that. I'm very young so maybe this will change in 20 years when I get nostalgic and refuse to change my ways but until then I would actually appreciate if you have any critique on my style. If you think something doesn't make sense, there's a way better way to do something or I'm breaking my own rules I would love to hear about it as that's what this piece was mostly about, to give me the change to sort my thoughts and open an opportunity to make my style and my work better. 

C.





