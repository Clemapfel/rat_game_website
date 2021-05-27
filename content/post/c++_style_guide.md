+++
title = "A (personal) modern C++ Styleguide"
author = "C. Cords"
date = 2021-05-18
draft = false
url = "/post/c++_style_guide"
layout = "post/single"
categories = ["programming"]
images = [""]
+++

<h1 id="QUICKSTART"> Quickstart </h1>
skip to <a href="#EXAMPLE">here</a> for a fully syntax highlighted code example that has all the possible cases

<h1 id="INTRODUCTION"> Introduction </h1>

People, especially outside of CS, often think of code as purely utilitarian. It's like a machine or a tool, it doesn't matter how dirty it is inside, as long as it works and if it breaks you can call someone to fix it, it's the best it can be. While this may be the case for a <a href="https://saltassociation.co.uk/education/make-salt/rock-salt-production/" target="_blank">pneumatic borer</a> I would urge everyone to consider source code asthetically equivalent to a dissertation, a pamphlet or an instruction guide and any piece of code should have the same care and effort put into it's formatting and presentation as into more traditional documents. The main reason for this is to allow for cooperation, it's always nice to have good documentation but if someone new joins the team knowing nothing about how things are done and they're tasked to fix something rather than just use it their success and speed of accomplishing this mainly depends on how well maintained the code is. This way pretty code not only shows that you take pride and care in your work but also increases productiveness far, far into the future.<br>

I would like to quickly break down my philosophy of what makes good practice and code style. The most important things are (in order starting with most important):

1. <b>Consistency</b>: If you format something a certain way and you think it's the best way to do it, format it that way every single time
2. <b>Clarity</b>: Assume your audience has a very hard time understanding any code and try to make it easy to understand for them, not your well-trained doctorated senior dev
3. <b>Adaptability</b>: Try to stay with the most up-to-date-way of doing things and if someone shows you a better way to do things, adopt it without question
4. <b>Elegance</b>: Assuming maximum clarity and correctness the most elegant way to do something is the right way.

<h1 id="TOC">Table of Contents</h1><br>
0. <a href="#QUICKSTART">Quickstart</a><br> 
1. <a href="#BRACKETS">Loops & Brackets</a><br>
2. <a href="#VARIABLES">Variables</a><br>
&nbsp&nbsp&nbsp&nbsp2.1 <a href="#VARIABLES_NAMING">Naming</a><br>
&nbsp&nbsp&nbsp&nbsp2.2 <a href="#VARIABLES_DECLARATION">Declaration</a><br>
3. <a href="#OPERATORS">Operators</a><br>
&nbsp&nbsp&nbsp&nbsp3.1 <a href="#OPERATORS_PTR">References and Pointers</a><br>
&nbsp&nbsp&nbsp&nbsp3.2 <a href="#OPERATORS_LOGIC">Logical Operators</a><br>
&nbsp&nbsp&nbsp&nbsp3.3 <a href="#OPERATORS_NUMERIC">Numerical Operators</a><br>
&nbsp&nbsp&nbsp&nbsp3.4 <a href="#OPERATORS_PREFIX">Pre- and Postfix Increment</a><br>
4. <a href="#FUNCTIONS">Functions</a><br>
&nbsp&nbsp&nbsp&nbsp4.1 <a href="#FUNCTIONS_MEMBER">Member Functions</a><br>
&nbsp&nbsp&nbsp&nbsp4.2 <a href="#LAMBDAS">Lambdas</a><br>
&nbsp&nbsp&nbsp&nbsp4.3 <a href="#RETURN_AUTO">Auto-deducing Return Types</a><br>
5. <a href="#CLASSES_ENUMES">Classes & Enums</a><br>
&nbsp&nbsp&nbsp&nbsp5.1 <a href="#CLASSES_NAMING">Naming</a><br>
&nbsp&nbsp&nbsp&nbsp5.2 <a href="#CLASS_VS_STRUCT">Class vs. Struct</a><br>
&nbsp&nbsp&nbsp&nbsp5.3 <a href="#HPP_VS_CPP">Order of access-specified members: .hpp vs .cpp</a><br>
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp5.3.1 <a href="#FILENAMES">Filenames</a><br>
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp5.3.2 <a href="#HEADER_ONLY">Template for Header-only Libraries</a><br>
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp5.3.3 <a href="#NON_HEADER_ONLY">Template for Non-Header-Only</a><br>
6. <a href="#DOCUMENTATION">Comments & Documentation</a><br>
&nbsp&nbsp&nbsp&nbsp6.1 <a href="#DOCUMENTATION">In-File Documentation</a><br>
&nbsp&nbsp&nbsp&nbsp6.2 <a href="#COMMENTS">Comments</a><br>
&nbsp&nbsp&nbsp&nbsp6.3 <a href="#VARIABLE_NAMING_CLARITY">Choice of Variable/Function Names</a><br>
7. <a href="#EPILOGUE">Closing Remarks</a><br>
&nbsp&nbsp&nbsp&nbsp7.1 <a href="#EPILOGUE_GIT">Version Control</a><br>
&nbsp&nbsp&nbsp&nbsp7.2 <a href="#EPILOGUE_BENCHMARK">Testing and Profiling</a><br>
&nbsp&nbsp&nbsp&nbsp7.3 <a href="#EPILOGUE_OPTIMIZATION">When Optimization is not Appropriate</a><br>
&nbsp&nbsp&nbsp&nbsp7.4 <a href="#EPILOGUE_REFACTOR">The Golden Rule: Always Refactor Once</a><br>
8. <a href="#THANKS">Thanks and References</a><br>

<h1 id="LOOPS">Loops & Brackets</h1>

Let's get the omnipresent stuff out of the way first:

If present at all, brackets after if-else, while, for, try-catch and similar loops as well as blocks, non-lambda functions, classes, structs and enums should always have a newline before the first bracket as such:

{{< highlight Cpp >}}
// wrong
enum { MEMBER_1, MEMBER_2 };

class foo {
    inline Foo() {
        for (auto& i : unmentioned_member) {
            initialize(i);
        };
    }
    
    inline void bar() {
        return 1;
    }
    
    inline void empty_function() 
    {
    }
}

// correct
enum 
{
    MEMBER_1, 
    MEMBER_2
};

class foo 
{
    inline Foo() 
    {
        for (auto& i : unmentioned_member) 
        {
            initialize(i);
        };
    }
    
    inline void bar() 
    {
        return 1;
    }
}
{{< /highlight

The only exceptions to this are namespaces and lambdas with only one line of code inside of them as empty blocks. These should be opened and closed in the same line:

{{< highlight Cpp >}}

namespace style_guide::inside 
{
    Foo::Foo() 
    {}  // newline before the first bracket but closed in the same line
    
    Foo::Foo(ArgumentType arg) 
        : _member_a(//...),
          _member_b(//...),
          _other_member([&]() -> MemberType&&   // newline because lambda body has more than one line of code
          {  
            do_something_else();
            return std::move(MemberType(arg));
          }()),
          _member_c(//...)
    {
        std::sort(member_a.begin(), member_a.end() [](auto a, auto b) { return a > b; });
        // no newline because it is one line
    }
}
{{< /highlight }}

Note how the multi-line lambda in the constructor is indented the same as the other _members in the trailing initializer list.

Now this decision is pretty arbitrary and it's kind of a toincoss wether an individual dev will do newline-before or newline-after for curved brackets but I'd still like to give some context: I think the main reason to do after is to force devs to put a basically empty line after the first statement. This helps distinguish between function/class definitions and regular statements and it also makes it easier to find the start of the loop. Basically what I'm trying to say is:

{{< highlight Cpp >}}

// messy
namespace space {
    ClassName : public Mother {
        ClassName() = default;
        ClassName(ArgType arg) : ClassName() {
        }
    }
}

// clearer
namespace space 
{
    ClassName : public Mother 
    {
        ClassName() = default;
        ClassName(ArgType arg) 
            : ClassName() 
        {}
    }
}

// equally clear though:
namespace space {

    ClassName : public Mother {
    
        ClassName() = default;
        ClassName(ArgType arg) 
            : ClassName() {
        }
    }
}
{{< /highlight }}

What's important isn't the bracket but the empty or almost empty line after the declaration. The reason I pick newline-before is because for constructors like in the above example I like the opening bracket for the CTOR definition to not be inline with one of the initializer list statements, with normal functions it can't get lost but with CTORs it can in all the brackets of the initializer list:

{{< highlight Cpp >}}

    Foo::Foo()
        : LambdaMember2([&]() 
          {
            auto res = multiline_lambda();
            res += multiline_lambda();
            return res;
          }(),
          LambdaMember([&](){ return oneline_lambda();}()) {
    }
{{< /highlight >}}

Is very hard to parse. With the bracket starting the ctor definition preceded by a newline it is much easier and if you're doing the newline-before in one situation you should do it always because as I said, consistency is the most important thing. 

<h1 id="VARIABLES">Variables</h1>

The following variable naming scheme should be adhered to at all times in most C-based languages unless language specifics prohibit:

<table style="width:100%">
  <tr>
    <th>Scope</th>
    <th>Qualifier</th>
    <th>Naming</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>local class-, function- or internal namespace scope</td>
    <td>non-const or const</td>
    <td>
        lower-case snake_case<br>
    </td>
    <td>
        <code>size_t not_a_member;</code><br>
    </td>
  </tr>
  <tr>
    <td>global scope</td>
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
    </td>
  </tr>
  <tr>
    <td>public member</td>
    <td>const</td>
    <td>all-caps snake_case</td>
    <td>
        <code>const size_t MAX_THREAD_COUNT = 64;</code><br>
    </td>
  </tr>
  <tr>
    <td>private or protected member</td>
    <td>non-const or const</td>
    <td>lower-case snake_case with prefix "_"</td>
    <td>
        <code>std::string _id;</code><br>
        <code>static Color _default_color;</code>
    </td>
  </tr>
</table>

Some variables gain a pre- or postfix depending on their type as such (the above naming scheme still applies):

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
  <tr>
    <td>typename or using/typedef declaration name</td>
    <td>
        Foo_t
    </td>
  </tr>
</table>

<h2 id="VARIABLES_DECLARATION">Declaration</h2>

The order of type qualifier should always adhere to the following priorites (where 0 is the left most qualifier)
{{< highlight Cpp >}}
0: static 
1: inline, extern
2: mutable
4: volatile 
5: constexpr, consteval, const
6: Type of the variable
<no space>
7: & or * or &&
<space>
8: Name of the variable

// for example
static inline const foo* const ptr = //...
extern mutable volatile const auto* var = //...
{{< /highlight >}}

In easier to remember terms: always put <code>static</code> fist, always group const as right as possible but before the variable type and name. It's rare for this many qualifiers to pile up but it's good to have a solid idea of where stuff goes should the time come.
 
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

For trivial numeric types, always use <code>float</code> for floating points. 64-bit numbers like <code>double</code> should be a conscious decision on the developers part when they recognize that they need the extra precision, not the default. This is to avoid unnecessary overhead on certain cpu architectures or in bleeding-edge-performance environment.

Be aware of potential overhead this may cause by casting up or down the precision hirarchy when interacting with other libraries. clang-tidy usually issues a warning for this and it should not be ignored. 

On the topic of casting, <code>static_cast<foo></code> should always be preferred over c-style casts, even for trivial numeric type:

{{< highlight Cpp >}}
double high_precision = 2.2153165231;

// wrong
float low_precision = float(high_precision);
float low_precision = (float) high_precision;
auto low_precision = float(high_precision);
float low_precision = static_cast<float>(high_precision);

// correct
auto low_precision = static_cast<float>(high_precision);
{{< /highlight >}}

If multiple variables of the same type and type-qualifier are declared one after another, always use the <a href="https://en.cppreference.com/w/cpp/language/declarations#Declarators" target="_empty">init-declarator-list</a> form as such:

{{< highlight Cpp >}}
std::string first_name, 
            last_name,
            adress;
            
Foo *ptr_one,
    *ptr_two;
    
Bar &ref;
Bar not_ref;

{{< /highlight >}}

There should always be a newline after the first declaration. If one of the variables is a pointer, reference, r-value, etc. then all of them should have the same type qualifier. If this is not the case, the type should be explicitely redeclared in a new line.

This form reduces redundant words be redeclaring the type over and over and makes it easy to group members or variables by type on first glance.

I would make an exception if all variables names are very short words, consider: 
{{< highlight Cpp >}}
// version 1
struct Color 
{
    float r, g, b, a;
}

// version 2
struct Color 
{
    float r, 
          g, 
          b, 
          a;
}
{{< /highlight >}}

I would not reject a pull request with version 1 however I would also not ask someone using version 2 for consistency to change the formatting to version 1. Make of that what you will.

<h1 id="OPERATORS">Operators</h1>
<h2 id="OPERATORS_PTR">Reference, Pointer, R-Value-Reference, etc.</h2>
In function arguments and any other variable delcaration there should be a space following the &, *, && qualifiers but <b>not</b> preceding it:
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

I am aware this is an onpupolar choice so let me explain: When we read out code in real life meaning actually read it out loud to someone in the same room, when someone asks us: "What is the type of <code>const Foo* bar</code>?" we answer "constant foo pointer" or "a pointer to a constant foo". It's the same the same with references, r-values, etc.. I consider the type qualifier to be part of the type and it should thus be grouped with the type in the declaration.

I will admit this falls apart when using the above mentioned init-declarator-list:

{{< highlight Cpp >}}

const Foo& first,           // type Reference to a const Foo
           second,          // type const Foo
           *third,          // type Pointer to a const Foo
           *fourth const;   // type constant Pointer to a constant Foo

{{< /highlight >}} 

which is why I stated that when using this form, all variables should have the same type and type qualifier.

<h2 id="OPERATORS_LOGIC"> Logical Operators </h2>

Always use <code>and, or, not</code> instead of <code>&&, ||, !</code> for boolean operands.<br>
Always use <code>&, |, ^, ~</code> instead of <code>bitand, bitor, xor, compl</code> for numerical operands. Similarly always use <code>&=, |=, !=, ^=</code> over <code>and_eq, or_eq, not_eq, xor_eq</code> for these operands.

It may be my lua background but I'm fond of the <code>and, or, not</code> in boolean expressions, many people from non-cs fields that primarily work in matlab or another very high level scripting language will have an easier time reading complex boolean expressions and using the keywords eliminates typos where the bit-wise logical operators are used accidentally triggering not error but performance overhead from <a href="https://en.cppreference.com/w/cpp/language/operator_logical" target="_blank">non-short-circuiting</a> expressions.

<h2 id="OPERATORS_NUMERIC">Numerical Operators</h2>

There should be a space preceding and following the binary operators <code>+, -, /, %</code>. The unary <code>-</code> should be used on variables as well as number constants in favor of <code>-1 * </code>

{{< highlight Cpp >}}
int a, 
    b;

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

Unless in performance critical code conditions where every operation counts it is sometimes preferable to not mathematically simplify formulas for something if it aids in clarity.

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

In many scenarios, post- and prefix operators are functionally equivalent but in that 1% of cases in which they aren't using the wrong one may cause hard-to-catch bugs. Always defaulting to the prefix version tends to avoid this as much as possible.

<h1 id="FUNCTIONS">Functions</h1>
All function names should be lower-case snake_case. This includes lambdas however functors should be named according to the class naming specification (c.f. below). On declaration without definition, function arguments should be unnamed unless specifically necessary to give context or if there are multiple arguments of the same type:<br>
{{< highlight Cpp >}}
// wrong
void set_position(Vector2f position);
void add_percentage(float); // expects [0, 1], not [0, 100]
void set_name(std::string, std::string);

// correct
void set_position(Vector2f);
void add_percentage(float zero_to_one);
void set_name(std::string first_name, std::string last_name);
{{< /highlight >}}

<h3 id="FUNCTIONS_MEMBER">Member Functions</h3>

Members functions that set one or more member variables should always be named <code>set_*</code> where <code>*</code> is the same name used when declaring the member in the .hpp source code.

{{< highlight Cpp >}}
class Color
{
    private:
        float _r, 
              _g, 
              _b, 
              _alpha;

    public:
        void set_rgb(float, float, float);
        void set_alpha();
        
        // wrong:
        void set_red(float);
        
        // correct:
        void set_r(float;
}
{{< /highlight >}}



Similarly, getters should always be named <code>get_*</code>, however if the function returns a single bool, if that bool is a member variable named <code>_is_foo</code> it's getter should be named <code>get_is_foo()</code>, however if 
that value is not a member it's getter should be phrased like a yes-or-no question, for example:

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

I think this can be a very elegant way to initiate things that need a more complex routine than just calling it's constructor, however thought should be put into wether it really is necessary to make this a lambda.<br>
 For the above example both initialization functions could just be a static member function of <code>RenderWindow</code> and <code>Texture</code> respectively and I would again argue that the lambda is only justified if that behavior is only called exactly once in the entirety of the library.<br><br>
When using lambdas it's almost always best to delcare them as <code>[&](auto arg1, auto arg2) { //... </code> nowadays. This way the compiler will decide which variables to capture themself and the argument type is automatically deduced. The capture should only be manually specificed if for example the invocation of a copy constructor is necessary. Similarly the trailing return-type <code> [&](auto arg1, auto arg2) -> foo { //...</code> should be ommitted unless specifically necessary.

I would advise you to check on the <a href="https://en.cppreference.com/w/cpp/language/lambda" target="_blank">lambda docs page</a> every year or so, it feels like the new C++ versions, C++20 just recently and C++23 recently, are very impactful on what is possible with lambdas and I would encourange everyone to try to stay up to date with the most recent way of doing things, most recently templated lambdas and constraints/concepts support.

<h2 id="RETURN_AUTO"> Auto-deducing return types </h2>

It's tempting to always declare the return-types as auto if possible, even if it's not strictly necessary. It may often seem like the most modern way to do things but I would advise caution. If proper documentation isn't done yet it can send potential collborators on the hunt through your function definition to find out what exactly your function returns anyway. Without auto one look at the function declaration would've sufficed. In my opinion, if auto is possible the following form should be used:

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
// @brief dummy function
// @returns rvalue of type function<Return_t()>
template<typename Return_t>
auto create_function() 
{
    return std::move(std::function<Return_t()>());
}

{{< /highlight >}}

By employing good in-code documentation the original dev gets to use the convenience of auto and the collaborators only have to take one look at the function declaration to know what type the function returns. In cases were returning auto is absolutely necessary (such as when the return type depends on template parameters outside the developers control) other than proper documentation there is no way of getting around needing to see the definition to truly understand what's happening. 

<h1 id="CLASSES_ENUMS">Classes & Enums</h1>

<h2 id="CLASSES_NAMING">Naming</h2>
Classes, Enums and other class-like entities are always named upper-case CamelCase. This includes structs, unions, enums, typenames and typedefs as well as using-declarations for any of these entities.<br>

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

An enum that's inside the global namespace should be declared a scope enum <code>enum class Foo</code>. This is to avoid name-collisions which can  be very annoying when an unrelated library you're using already reserved an enum constant name you want but they didn't scope their enum properly. If an enum is only used inside a very limited scope it is fine to omit the class for the convenience of not having to specify 3 scopes before using an enum constant.

{{< highlight Cpp >}}
namespace MyLibrary 
{
    // use enum class
    enum class PublicEnum { //...
    
    namespace detail 
    {
        // no enum class okay
        enum DetailEnum { //...
    }
    
    class Class 
    {
        private:
            // also okay
            enum PrivateEnum { //...
    }
}
// never put an enum in global namespace

{{< /highlight >}}
<h2 id="CLASS_VS_STRUCT">Class vs. Struct</h2> 

If all member variables and functions of a user-defined type are public, <code>struct</code> should be used an no access specifiers (<code>public, protected, private</code>) should be stated. 

In all other cases, <code>class</code> should be used and all members should be manually access specified.

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

<h2 id="HPP_VS_CPP">File Organization: .hpp and .cpp</h2>

<h3 id="FILENAMES"> Filenames </h3>

All programming language files should be lower-case snake_case. If a header holds a class named FooClass, the header should be named <code>foo_class.hpp</code> and similarly the source file should be <code>foo_class.cpp</code>.<br>
If FooClass contains and internal class FooInternal declared in the same header then there should be a seperate second .cpp named <code>foo_internal.cpp</code>. This avoids having to recompile both classes when only changing something in one of them.

<code>.h</code> should not be used unless the entire header is exclusively written in C, not C++. For files in other programming languages the most common programming language file-extension should be used, for example if your data representation for a video-setting file is in lua and you agreed on a .cfg file extension for configs, the file should be name <code>video_settings.cfg.lua</code>. Many programming and data representation languages do not care what their file is name but you should still take care to make it immediatly obvious what language a file is written in, collaborators should not have to open the file in notepad and try to figure out the language. Here is a non-exhaustive list of languages and file extensions I personally use:

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

I think a lot of these are standard and there's surely many I've missed like all the html-related things like .md and .css but the point of this list was more to instill in you a point of consistent flexibility. If it doesn't matter to the computer the extension is technically arbitrary, but the human part of your company should decide one exactly one answer anyway and stick to that at all times. If that answer overrides the script languages default extension like I do with .lua, it should be .yourextension.lua to allow people from outside your team to easily classify your files too.

<h2 id="CLASSES">Classes: Declaration and Definition</h2>

I might be wrong on this but afaik in modern C++ the only reason to use the .hpp for declaration and .cpp for definition for a non-templated class is to reduce compile time. I've asked this question to multiple people and nobody was able to give me a solid answer, for cyclic linkage and multiple definition errors you can <code>inline</code> functions in the .hpp and static members you can also <code>inline</code> to allocate them without a .cpp. Furthermore templated classes require the definition to be in a .hpp anyway so it's very confusing. This is how I've been doing it so far and it kinda depends on a decision made at the very beginning of development:

<h3 id="HEADER_ONLY">Header-only library</h3>

If the library is header-only there should not be a single .cpp anywhere. The following form should be used:

Inside the same access-specifier (private, protected, public) region, the declarations immediately followed by the definition should be in the following order:

1. using / friend class declaration
2. static member variables
3. non-static member variables
4. Constructor, Destructor, Copy- and Move-Constructors
5. Assignment operators
6. other operators
7. static member functions
8. non-static member functions 

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
        inline void NonTemplateFoo() 
        {
            // full definition here
        }
}
{{< /highlight >}}

Advantages of this form include an easier time linking things, being able to access the source code directly by just following back the header you included and less duplicated elements because you do not have to redeclare the template for every external definition. 
Disadvantages include far larger compile time and the fact an IDE is needed so collaborators can collabls longer functions or internal classes to rapidly access all declared functions signatures without having to scroll through thousands of lines. If that last point doesn't fully make sense, let's compare with the non-header only format:

<h2 id="NON_HEADER_ONLY">Not Header-only Library</h2>

If the library has at least one .cpp it is not header only and the following form should be used for all interal files from your library:

Inside the same access-specifier members should be declared in the following order:

1. using / friend class declaration
2. static member variables
3. non-static member variables
5. Constructor, Destructor, Copy- and Move-Constructors
6. Assignment operators
7. other operators
8. static member functions
9. non-static member functions 

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
float TemplateFoo<T>::get_member() const 
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

float NonTemplateFoo::get_member() 
{
    return _private_member;
}

void NonTemplateFoo::set_member(float f) 
{
    _private_member = f;
}

void NonTemplateFoo::private_function() 
{   
    // ..
}
{{< /highlight >}}

Advantages of this form include improved readability as with just one look a collaborator can get all the relevant external information about a class. Further compile-time is vastly improved which I'd like to put into context here because this point is honestly mostly dependent on personality.<br>
Compile time is usually just seen as a necessary evil and since the user will most often not have to compile your product it's somewhat irrelevant for the economical process, right? Well anytime your machine is compiling you're not doing anything else. If this is just for a small app you only loose seconds which is irrelevant but if it's for a big highly interlinked app and especially if either your machine is slow and/or you use a lot of compile-time execution (which you should nowadays) things can add up fast. For my biggest project recompiling all modules on my somewhat-decent laptop can take upwards of 90s. In an environment where rapid iteration is needed this can add up fast and I can imagine is a big reason people tend to gravity towards scripting language that don't need to compile nowadays. <br><br>
No matter how you stand on the issue of compile time, wether you split the .hpp or you don't is up to preference but you do have to decide early on stick to it. Again consistency is the most important thing, if you do something badly but the same everytime it's easier understood than using 20 different elegant solutions that don't look alike. 

<h1>Comments & Documentation</h1>

<h2 id="DOCUMENTATION">In-File Documentation</h2>
Unless otherwise dictated by the documentation API your project uses, the following form should be employed for all public or protected functions:

<table style="width:100%">
  <tr>
    <th>Tag</th>
    <th>Is Optional</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>@brief</td>
    <td>Never Optional</td>
    <td>
        Short description of what the function does. Should be one sentence
    </td>
  </tr>
  <tr>
    <td>@param</td>
    <td>Optional if function has no parameters or functions exists in private context</td>
    <td>
        Description of function argument follower by <code>&ltname_of_the_parameter>:</code>. If parameter is unnamed in delcaration, the name is ommitted and replaced with a number instead (see example below
    </td>
  </tr>
  <tr>
    <td>@returns  </td>
    <td>Optional if function returns void or function exists in private context</td>
    <td>
        Description of the returned value. If functions returns auto, explicit mention of the function return type
    </td>
  </tr>
  <tr>
    <td>@author</td>
    <td>Always Optional</td>
    <td>
        Handle of developer, this may be the real name or for example a github user name. Ask collborators if they are okay with having their full name distributed and always give credit in highly collaborative scenarios such as crowd-sourcing 
    </td>
    </tr>
  <tr>
    <td>(no tag)</td>
    <td>always optional</td>
    <td>
        Verbose description of the functions. Always put last after all the tagged content right before the actual function declaration
    </td>
  </tr>
</table>

{{< highlight Cpp >}}
// @brief mix two foos using the ratio
// @param 1: First foo to merge
// @param 2: Second foo to merge
// @param ratio: ratio of first to second foo, [0, 1]
// @returns rvalue reference to newly merge foo
// 
// Functions takes two foos and applies (...) 
// (...)
// (...)
// returning the now coagulated foos as an rvalue reference 
Foo&& merge_foos(Foo&, Foo&, float ratio);
{{< /highlight >}}

For private functions or functions and classes in <code>namespace detail</code> the documentation can be substituted with a single line like this:
{{< highlight Cpp >}}
// @brief merge using ratio
Foo&& merge_foos(Foo&, Foo&, float ratio);
{{< /highlight >}}

While it would of course be best to document everything it's a reality of software development that proper documentation will happen last. That's why some tags are optional, it's an incentive for developers to at least do the one-line version however it is not an excuse to then never extend the one-line version. It's a temporary solution but a better compromise than not documenting anything.

<h2 id="COMMENTS">Comments</h2>

In case you haven't noticed so far, comments should be inline-comments of the form
{{< highlight Cpp >}}
// this is a comment concerning the next line
auto next_line = ...
{{< /highlight >}}
Notice the space after <code>//</code>. All comments should start at the smallest indent of the block meaning there should never be a piece of code left of the comment and the comment should be appropriately indented as such:

{{< highlight Cpp >}}
// wrong:
for (size_t x = 0; x < n_x; ++x)
{
    for (size_t y = 0; y < 0.75 * n_x; ++y)    // x:y ratio should be 4:3
    {
        doo_foo(x, y);
        // ...
    }
}
            
// correct:
for (size_t x = 0; x < n_x; ++x)
{
    // x:y ratio should be 4:3
    for (size_t y = 0; y < 0.75 * n_x; ++y)
    {
        doo_foo(x, y);
        // ...
    }
}

{{< /highlight >}}

All comments should be in-line comments. This is mostly a matter of prefrence but I do have a valid reason: When debugging you often want to disable a piece of the program by "commenting it out", i.e. putting a multi-line comment around it temporarly. If there are already multiline comments in that section this will break the commented-out section up which means you have to add multiple comments just to comment something out for 10mins. An exception to this rule are comments at the very beginning of the file such as copy right disclaimers or similar legal-related things. As they are at the start of the file they can never interrupt multi-line comments. If you do decide to include multi-line comments in the release they should be formatted as such:

{{< highlight Cpp >}}

/* 
 * There should be an empty line above the first line
 * An each line should start with an asterisk
 * (...)
 * (...)
 */

{{< /highlight >}}

<h2 id="VARIABLE_NAMING_CLARITY">Choice of Variable/Function Names</h2>

Let's do a little hypothecial, first I'd like you to look at this code completely out of context. I intentionally choose variable names poorly but without malice, maybe I'm new or I really didn't have time to do this so I just submitted my first draft as a pull request

{{< highlight Cpp >}}
class Base 
{};

class Wrapper : public WrapperBase
{
    // ...
};

Pool 
{
    void start(size_t);
    
    std::condition_variable _var;
    std::mutex _mutex;
    std::queue<std::unique_ptr<TaskWrapperBase>> _q;
    
    std::vector<std::thread> _w;
    
    bool _res,
         _shutdown,
};

void Pool::start(size_t n)
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

What happens in this code? I'm sure many of you will be able to figure it out eventually but this isn't a pop-quiz, it's simply a demonstration of what a difference code-style can make to a third party. Let's look at the same code again but overly commented in a vein effort to explain what is happening:

{{< highlight Cpp >}}
// empty base needed for unique pointer 
class Base 
{};

// Wraps tasks
class Wrapper : public WrapperBase
{
    // ...
};

// variable size thread pool 
Pool 
{
    public:
        // ...
        
    private:
        // initialize threads
        void start(size_t);
        
        std::condition_variable _var;
        std::mutex _mutex;
        std::queue<std::unique_ptr<TaskWrapperBase>> _q;    // task queue
        
        std::vector<std::thread> _w;    // worker threads
        
        bool _res,      // is threapool paused for resizing?
             _shutdown, // is threapool shutting down?
};

void Pool::start(size_t n)
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

This is prefectly understandable, I think most people will immediately know whats going on and it could be argued that's the only thing that counts but I would like you to remind of one of the goals of this style guide: elegance. Comments are not elegant, because operating under the paradigm of "only comment when absolutely necessary" we can rewrite the code without sacrificing clarity like so:

{{< highlight Cpp >}}
class TaskWrapperBase 
{};

class TaskWrapper : public TaskWrapperBase
{
    // ...
};

ThreadPool 
{
    public: 
        // ... 
        
    private: 
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
                  return not _task_queue.empty() or _is_paused_for_resizing or _is_shutting_down;
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

I think it is appropriate to say that this version is just as clear and easy to understand as the commented version except this time the reader actually looks at the code. Someone trying to debug the first version will ignore the code completely on their first read because they don't need it to understand what's even going on but when they do they still have to deal with obtuse variable names. Using the more elegant minimally commented version allows for less fluff at no cost of clarity.

<h1 id="EPILOGUE">Closing Comments</h1>
Here are some things I didn't know where to put structurally but that I still think are important to say:

<h2 id="EPILOGUE_GIT">Version Control</h2>
Commit as often as possible. Anytime you change file or continue to the next step of implementing/fixing something, create a new commit. The actual commit message should be what was just done, past-tense, not what you're about to do. The more granular the commits are the easier it will be to rollback when something goes wrong and similar to documentation well formatted messages will help you understand things instantly even 2 years later. Consider coming up with a labeling scheme each message begins with, I often see things like <code>[FIX], [POLISH], [TYPO], [ISSUE#1234]</code> etc.. Some teams even uses emotes which I do kinda like but not all shells support this so maybe alphanumerical would be better for now.<br>
You'd think having a million commits would get hard to manage but that's what pull-requests are for. They collapse all the tiny commits into one big package and by grouping them like this you both get the convenience of having the granularity on your machine but once it goes to the team or users they don't have to sift through pages and pages of messages to rebase. 

<h2 id="EPILOGUE_BENCHMARK">Test and Profile Frequently</h2>
Testing modules frequently is non-negotiable. I recommend <a href="https://github.com/google/googletest">google test</a> but an internal testing framework can also be used. Testing assures correctness and it can be used later to see if modules would interact properly were this new feature merge with the master.<br>
Test small pieces of modules, you don't need to write a test for every function but a test should take no more than 5mins to finish. If you do need testing in general to run for 30mins should should create 6 smaller tests and run them sequentially. That way if you only change one part you don't need to run the giant test again to see if it works now.

Profiling and Benchmarking are a more sublte issue because they aren't always necessary in my opinion. For certain application yes, you should absolutely benchmark and especially if you're currently trying to optimize already existing code the only way you can do that properly is to actually benchmark the code by running it to see if it actually got faster. There are best-practice ways for this such as using a steady machine or running benchmarks multiple times and using statistical analysis on the results but I won't go into that here.<br>
Don't think you can spot performance problems just by re-reading code, always run it even if you have three doctorates and 40 years of experience humans make errors or overlook things no matter how good they are at what they do. Having solid proof of how things are better now in forms of data is also a better way to convince customers or collaborators that what you did was actually successfull.<br>
I do realize that this can be overkill, you don't need to squeeze out that last 5% performance increase for your app that starts a washing machine in your house. A good middle-ground I found is to have a profiling tool run in the background. For example for my game I have a seperate process that monitors how much time of the 1/60ths of a second (the duration of one frame) the rendering and simulation needs and how much time the engine has just waiting for the monitor to refresh. If nothing happens that index is at 0%, if the engine is so slow that it lags the screen the tool will notify me that the percentage is above 100%. I always have that number on the side of my screen, that way when something doesn't quite break but behaves unexpectedly non-performant I know to investigate. 
<br>

<h2 id="EPILOGUE_OPTIMIZATION">When Optimization is Appropriate</h2>

On the topic of optimization, don't always go for the optimal way of doing things unless it's necessary. Again, some for some environments it's true, always do it the fastest way that's what counts but be realistic about it. If you for example want to allocate user made objects and access them later by ID and you expect the user to at most ever make 6 objects then writing a specially-hashed map that objects them in sub-logarithmic time is really not worth it vs just putting them in an array and iterating over all indices everytime you need to access them. 
Similarly I would always think first before parallelizing something. Anytime that decision is made, the reason should be "we can't make it sequential because x". Sequential should always always be default, parallelization is something that introduce so much complexity and hard-to-catch bugs that I would honestly recommend not doing anything in paralell until you're read to release and then paralellizing thing to make everything snappier though this requires a good softwaredesigner because things have to be designed in a way that would work both sequential and in paralell from the beginning

<h2 id="EPILOGUE_REFACTOR">Always Refactor at least once</h2>
When you realize you accomplished your taks or fixed a bug, take some time to go through your code again to pretty it up. I often set myself goals like "today I will implement x" and then at the end of the day when I run my test and it goes through I'll go "done for today" and leave and then I never touch that file again until something goes wrong. This is not good, just because something works doesn't mean it's done. It's not even about adding documentation, sometimes redundant stuff will be left over or an if-else branch has duplicate branches or you forgot to delete a commented out section or <strike>I</strike> you slacked off and didn't 100% keep to the style guide rules detailed above. Always doing at least one refactor will do wonders to keep your code clean and most importantly the more you do this the more you will just do things properly the first time. I'm still in this learning process myself but actually challenging what I do through force of habit will get me closer to doing it right the first time over time.

<h1>Epilogue</h1>
If you read this far through in one go then I would like to thank you for your time. The main point of this piece was less to inform (nobody is reading these anyway) but to investigate my own way of doing things. Writing everything out forces me to argue my points to the imagined reader and it helps me structure and maybe questions my ways of doing things and like I stated at the beginning, adaptability and a willingless to discard tradition in favor of better things are the 3rd most important thing you can do with your coding style.

C.

<hr>
As I evolve I'll probably change and keep this update so here is a list of edits:
First published, Mai 18th 2021
Added Bracket Chapter, Mai 28th 2021