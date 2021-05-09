private before public in template and non-template

either header-only for library or always .cpp if possible for shorter compile time

*& next to type name except in multi-definition
always use multi-definition with newline

always auto ... = Constructor

not making single-argument constructor explicit should be a conscious choice

return type explicit unless auto is necessary

brackets around loop directives if one or more of the chain has more than 1 line. If all are 1 line, never use brackets

bool setters and getters:

get member that's bool:

bool get_control_enabled() const;
void set_control_enabled(bool)

if member is _control_enabled

get non-member

bool is_control_enabled() const;
bool is_empty() const;

function args:
only name if multiple of the same type in one function

put type of value into name if not obvious, for example:

set_percentage(float zero_to_one)
set_rotation(float degree_in_rad)

always use size_t and float unless high precision floating point is necessary or a specific number of bits is necessary

always use class and specify public and private unless all members are public, then use struct and specify nothing

always use at() or similarly exception prone functions unless [] is absolutely necessary

all non-external crashes should produce an exception with a message, if code may segfault due to user error, throw an exception (or assertion) instead

always put dfeault arguments in header

trailing one-line else is okay, but not in between. Never have multiple one-line commands like if(...) while(...)if ...

size_t vars that count should be _n_*, size_t wars that index should be _*_i;

filenames: lower case, snake case for both .hpp and .cpp

if 1-line if-else is possible, always do it

private at top, then public, then protected

commits prefix: [FIX], [POLISH], [STASHING], [STABLE]


