+++
title = "[WIP] Adaptive AI in jRPGs: A Detailed Guide"
date = 2021-03-01T22:41:08+01:00
author = "C. Cords"
draft = false
url = "/post/jrpg-ai"
layout = "post/single"
categories = ["programming", "rat_game"]
+++

### 1. Introduction

On October 17th, 2005 "F.E.A.R.", a horror FPS, released. It had one of the most widely appreciated AI, controlling multiple enemy soldiers with one entity, formulating goal-oriented and seemingly well-coordinated plans to flank the player, user objects and their surrounding to their advantage and support each other with cover fire and the like. On November 17th, 2008 "Left 4 Dead" a survival game with zombies introduced the world to an AI Director that not only controlls hordes of zombies but directs them in a way that when the player is being overwhelmed they act less aggressive and have worse pathfinding and if the player is killing man without problem it will call in reinforcements and dynamically up the tension.
In April 2007 "Pokémon Diamond" a turn-based jRPG released and it's final boss Cynthia was what the community considers one of the hardest bosses in Pokémon. Cynthias AI randomly choose one of 4 moves, could heal up to 3 of her 6 Pokémon at most once and would switch if she notices that her Pokémon is weak to your Pokémon. You may notice a bit of a discrepancy in sophistication there but let's say it's a product of it's time and Pokémon isn't about battling anyway. Well, in July 2018, Nintendo released what I consider one of the most quintessential jRPG: Octopath Traveler. Octopath travelers enemy choose from a small list (less than 4) of unique attacks at random. If their health is low they may heal. Furthermore every bosses will use a certain attack like a big AOE damage hit every n turns. That's it. I could go on but I personally consider most of the jRPGs and similar battle systems since their inception to be vastly behind the flashy 3d FPS AI and that's odd to me, surely it must be way, way easier to implement an AI for something that isn't real time, doesn't have a taxing giant engine running at the same time, is inherently divided into turns and contains at most 8 - 12 entities instead of entire armies of zombies. Yet most jRPGs don't bother, it's like they just gave up on trying. Well I did, I tried to extend what has become a trope at this point and introduce a similar level of complexity into turn-based jRPG AI by employing simple tricks and clever design. Nothing that I will detail in this post requires a college degree, there's no dynamic learning algorithm or somethign like that and that's the point. This article aims to give designers a guide on how to set up their system in a way where the theoretical upper limit of sophistication for their AI is endless and furthermore shed light on how it works in my game in detail. 

### 2. Entities and their Properties

To be able to explain in detail how everything works I will first need to establish a baseline of what objects with what properties we are dealing with. Note that the following examples only contain a fraction of the actual properties used in-game but for the sake of clarity I will try to simplify as much as possible.

The actors during battle are called "Entity", I think it's easiest to compare them to Dungeons & Dragons (D&D) player characters. All characters including the enemies share the same set of properties as such (vaguely c++ pseudo code below):

```cpp

enum StatusAilment { 
    DEAD = -1, 
    NO_STATUS = 0, 
    POISONED = 1, 
    STUNNED = 2
};

struct Entity {

	uint _health;
	uint _mana;

	uint _attack;
	uint _defense;

	const bool _is_enemy;

	StatusAilment _status = NO_STATUS;

	set<Move> _moveset;
}
```

Ignoring the last line I hope that most readers will be familiar with this setup, each character has ``health``, it starts out at a fixed value depending on the character and when damage is dealt, the targets health decreases. If the health reaches 0, the character dies. ``attack`` and ``defense`` are used to determine damage dealt while ``status`` is a representation of possible status effects the character may be suffering from such as being poisoned (which means taking damage each turn) or being stunned (which means they may not act for the turn). ``_is_enemy`` species wether the entity - well - is an enemy, false means it is a player controlled entitiy, true means it is AI controlled.
Lastly each entity has a ``moveset`` which is a set of ``moves`` that look something like:

```cpp
struct Move {

	uint _mana_cost;

	void apply(Entity& user, Entity& target) const {
		// move behavior here
	}
}
```

Each move has a mana cost a set of instructions that define the moves behavior. To illustrate a moves effect, let's look at an example where someone is struck with a poisoned dagger. The move ``apply`` function will have the following effects:

```cpp
Entity& user, target;

user._mana -= this->_mana_cost;
target._health -= (user._attack - target._defense);
target._status.insert(POISONED);
return;
```
I assume it's clear what's happening here. We can think of a move as a simple set of instructions that operate on 2 entites at the same time, sometimes the user and the target can be one and the same though, think of a simple heal:

```cpp 
Entity& user, target = user;

user._mana -= this->_mana_cost;
user._hp += 50;
return 
```

Now that we established the properties of each entity, let's look at the entirety of the game state during a battle:

```cpp
struct Battle {

	static vector<Entity> _entities;

	static vector<Entity> get_enemies() {
		
		vector<Entity> enemies;
		for (auto entity : _entities)
			if (entity._is_enemy)
				enemies.push_back(entity);

		return enemies;
	}

	static vector<Entity> get_party() { ... //analogous }
}
```
This battle (also called "scene") is basically a simple container that holds all of the entities, accessing the container is simply taking a subset of the entities held and returing them. 
In jRPGs like rat_game the course of an in-game fight is divided into rounds or turns, each turn the following actions happen in order:

```cpp
// order entities by speed
vector<Entity> in_order = Battle::_entities;
sort(in_order.begin(), in_order.end(), [](auto a, auto b) -> bool { return a._speed > b._speed; }

// ask for actions and apply them
for (auto entity : in_order)
{	
	Move move; 
	Entity user = entity, target;

	if (not entity._is_enemy)
	{	
		auto decision = ask_player_for_action(user);
		move = decision.first;
		target = decision.second;
	}
	else 
	{
		auto decision = ask_ai_for_action(user);
		move = decision.first;
		target = decision.second;
	}

	move.apply(user, target);
}
```
Here we see the objective of our AI, it will only ever be asked 2 questions: a) what move should an enemy use and b) which entity should that move target. These are fairly simple questions and this allows us without much black magic to make a fairly sophisticated AI because none of these decisions are timer-based (like is often the case in games), much like a chess computer we simple give the AI the current state of the board (along with the past battle) and it returns a single move to make. 

### 3. AI: from trivial to sophisticated

Now that we know what objects we have to deal with lets write the simplest AI one could imagine:

```cpp
// returns number in [lower_bound, upper_bound)
uint rand(uint lower_bound, uint upper_bound);

pair<Move, Entity> ask_ai_for_action(user) 
{
	pair<Move, Entity> out;

	// pick one move at random
	vector<Move> all_moves;
	for (auto move : user._moveset)
		all_moves.push_back(move);

	out.first = all_moves.at(rand(0, all_moves.size()));

	// pick one target at random
	auto scene = (...);
	out.second = scene._entities.at(rand(0, _scene.entities.size()));

	return out;
}
```
Randomness is often desirable for AI as it makes it impossible to know for sure what move the enemy will make and thus prevents trivializing counterplay but this is not the way to go about it. For one the ai picks one target from *all* entities, so it may by chance stab another enemy (it's ally) or even itself. Furthermore if the user does not have enough mana to user the move, it will fail. We can prevent this by constraining the choice of move and target while still utilizing randomness

```cpp
pair<Move, Entity> ask_ai_for_action(user) 
{
	pair<Move, Entity> out;

	// only consider moves the user has enough mana for
	vector<Move> possible_moves;
	for (auto move : user._moveset)
		if (move._mana_cost > user._mana)
			continue;
		else 
			possible_moves.push_back(move);

	out.first = all_moves.at(rand(0, possible_moves.size()));

	// only pick enemies of the user
	auto scene = (...)
	vector<Entity> possible_targets;
	for (auto entity : scene._entities)
		if (entity._is_enemy == user._is_enemy)
			continue;
		else 
			possible_targets.push_back(entity);
			
	out.second = possible_targets.at(rand(0, possible_targets.size()));

	return out;
}
```
We now have replicated the AI of the first 3 generations Pokémon games. In these games there is one further constraint that if the user has a move that would be very effective (deal extra damage to a target with a specific elemental type) then all moves that wouldn't be very effective are also discarded. In the very first Pokémon games from 1990 this [created a softlock](https://www.youtube.com/watch?v=CClsivwN8aw&lc=UgzUIZGpL-9YN6IptHB4AaABAg) (a game state in which it is both impossible to win and loose) because some Enemies will only have a single super effective move and as the AI discards all other moves without consideration this results in an Enemy using the same move over and over. Our D&D system currently has no such constraint but to emulate it, let's say we want to prevent the AI from picking the same move twice in a row. How would we go about this? We could simply create a new variable that holds the move the AI used last turn and compare wether the current decision would use the same move again. While this works, what if we want the AI to only use a move 5 times total? What about every 5 turns the AI should use a specific move the heals the user? Again we could introduces more and more counters and variables for each scenario but this is hardly scalable. What we instead need is general purpose *memory*, we need to only consider the current state of the scene but all relevant previous states. 

#### 3.1 Memory

We could log the memory every time the game state changes, this however is unneccesary and will results in way too much memory overhead. Rather I consider a good temporal resolution for the memory to be the state after a move finishes their apply() function. At that point all more granular effects will have been applied and if we really do need to know what exactly happened we can either measure the difference between the state at t and the state at t+1 after the move resolves or we can just take t, look up which move was used and simulate each step of the move by applying it's effect to a virtual t (this does not change the actual in-game state for the player).
We've settled on when to make an entry in our memory so let's take inventory of what information is available to the player and what should thus be available to the AI [1]:

- all entities
	+ their health, mana and current status ailment
	+ their moveset
- the history of which move they/the AI chose to use on which entity
- the set of possible moves of all player controlled characters (but not the enemies)

We furthermore need some kinda of temporal indicator. To model this we could simply save all the snapshotted states in a strongly ordered container or make a linked list where each node is a state with all the relevant data that points to a previous state. As linked lists tend to scale badly for bigger data let's just allocate a simple static vector in global namespace that will hold all the state (note that though possible this will not function without some extra work in a paralell context):

```cpp
class SceneSnapshot {
	public:
		struct LastAction {
			Entity _user, _target;
			Move _move;
		}

		SceneSnapshot(Scene& scene, LastAction last_action, bool is_first = false) 
			: _is_first_snapshot(is_first), _last_action(last_action) {

			for (auto& entity : scene._entities)
				_entities.emplace_back(entity)	// invokes copy constructor
		}

		const vector<Entities>& get_entities() const { 
			return _entities;
		}

		const bool is_first_snapshot;
		const LastAction last_action;

	private:
		vector<Entities> _entities;	
}

namespace global {
	static inline vector<SceneSnapshot> Snapshots = vector<SceneSnapshot>();
}
```

Out ``SceneSnapshot`` extracts all current information out of our scene and save it in time by offering no non-const access to the outside. The internal class ``LastAction`` offers a standardized format of what action resolved before this snapshot was saved. This means however that the very first snapshot cannot have such an action which is why we introduce a flag to account for this. 
Now that we have the memory setup, let's go back to our example and see if how we would implement not using the same move twice in a row or 5 times total:

```cpp
// do not use the same move twice in a row and only 5 times total
pair<Move, Entity> ask_ai_for_action(user) 


	// last move used
	Move last_move = Snapshots.back().last_action._move;

	// map saving how often each move was used
	map<Move, uint> n_uses;
	for (auto& snapshot : Snapshots) {
		if (snapshot.last_action.user == user) {	
			if (n_uses.find(move) == n_uses.end()) // no entry for move created yet
				n_uses.emplace(move, 0); 		   // create entry with move and a counter of 0

			n_uses[snapshot.last_action.move] += 1;
		}
	}

	vector<Move> possible_moves;
	for (auto& move : user._moveset)
		if (move._mana_cost > user._mana or 		// skip move if no mana or...
			move == last_move or 					// used same move last turn or..
			n_uses[move] >= 5)						// used move 5 times already
			continue;
		else 
			possible_moves.push_back(move);

	out.first = all_moves.at(rand(0, possible_moves.size()));
}
```
(Note that for the sake of simplicity I have retconned Move to be comparable, in praxis you would achieve this by giving each move a unique ID and comparing IDs)

Now that we have full access to all past actions our AI can decide in a way more sophisticated way what move to use instead of just taking the current state of all entities into account. Using our Pokémon Lythmus test to my knowledge this AI is already more intelligent than any enemy in any Pokémon game, even the modern ones. The same can be said for most traditional jRPGs, for some reason chess programs had AI way better than this in 1999 but turn-based games never really got there. We are not done however, let's keep going by minimizing the randomness and actually having the AI weight each possible option.

[1] Good game design should make sure that both have the same set of variables to base their decision on. Very often the AI in games will have more information than the player such as hidden variables that the player would not have access to looking at opponents, the players button inputs the very frame they were made or knowing formulas or behavior of function the player would only be expected to understand an approximation of.

#### 3.2 Score-Based Decision Making

So far we taught our AI how to choose which move not to use, however it still decides at pure random which of the possible moves to use. To alleviate this we give each move a *weight* or score, the higher the score the better of an decision it is to use that move. The AI picks the move with the highest score, if two scores are the same we randomized which one to pick. [2]

[2] Note that from a game design perspective it is ill-advised to have the AI pick the objectively best option every time. This will create a situation similar to theoretical game theory where both participants are assume to make the most rational decision based on their current information. You can but shouldn't assume your player to work this well, humans aren't perfect and requiring perfection will prove not fun fairly quick. Instead randomize an error rate for your AI, 25% of the time it picks from the top5 options instead of the top option for example.

We could just write a 15k lines of code AI that has a case for each move and goes through them one by one but from an implementation perspective this is not very good practice. To make a scoring system like this scalable, I consider it a good choice to instead encapsulated the scoring-scheme inside each move. Let's consider our poisoned dagger (c.f. Chapter 2) example again:

```cpp
// Poisoned Dagger implementation

mana_cost = 10;

void apply (Entity user, Entity target) const { 

	user._mana -= this->_mana_cost;
	target._health -= (user._attack - target._defense);
	target._status.insert(POISONED);
}

float score (Entity user, Entity target) const {

	// total score (recommendation of wether to use the move at all)
	float score = 0;

	// consider current state
	auto scene = Snapshots.back();
			
	// if target is already poisoned, shouldn't poison
	if (target._status == POISONED) 
		score -= 1;
	else if (target._status == NO_STATUS)
		score += 1;

	// however if the move would kill target, good choice anyway
	if (target._health < (user._attack - target._defense)) // resulting damage c.f. apply()
		score += 2;

	// if target isn't enemy, forget about it
	if (target.is_enemy == user.is_enemy)
		score = -10;	// note = instead of += resets others

	auto normalize = [](float score) { return score; }; // noop for now
	return normalize(score);
}
```

Let's talk through this in detail, the move now has a ``score`` function, it can be hander a user and a possible target and it will return a score showing how good of a choice it would be to use the move on that target. If the target is already poisoned the move could be kind of a waste but if it isn't poisoning might be a good idea. If the target has less HP than the move deals damage it should be made very attractive to use the move to instantly kill the target. Lastly if the target is an ally, the score is reset and set to something really low so the AI will know never to use the move on an ally. Lastly that score is normalized, for now lets assume the normalize Lambda just does nothing but return the score. During a battle the AI may check all of the enemies out and get the following scores:

```
Poisoned Dagger Scores:
	Entity A: -10;
	Entity B: 1; 
	Entity C: -10;
	Entity D: 3;
	Entity E: 2;
```
Simply from the scores we can deduce that A and C are allies of the user, B is not poisoned but has enough health to tank the hit, E is already poisoned but would be killed be the move and D is not poisoned and would be killed. A naive approach would just tell the AI to pick D as it has the highest score but if you think about, for both D and E the poisoning is irrelevant because it will die instantly anyway. I intentionally implemented the ``score`` function dodgily likes this to illustrate how scoring a target is more art than science. Which condition rewards how many points is up to the designer and it is advised to introduce some amount of fuzzyness on top of that so the AI doesn't become predictable. One may propose an approach of doing a proper statistic optimization or simulating test fights and numerically evaluating which scoring theme results in the most wins but I would advise caution, not only is this approach unnecessarily hard work but we're also not technically dealing with an optimization problem. This AI is for a video game, it shouldn't always act optimally and the subtle hand of a designer modifying how each situation is evaluated instead of simply computing the optimal choice and then randomnly either picking it or not will in my opinion result in a more fun opponent.
Let's go back to ``normalize``, if you only consider scores for a single move it's simple to pick the best version, but what if our scoring results look like this:

```
Poisoned Dagger Scores:
	Entity A: -10;
	Entity B: 1; 
	Entity C: -10;
	Entity D: 3;
	Entity E: 2;

Heal Scores:
	Entity A: 1;
	Entity B: -11;
	Entity C: 2;
	Entity D: -7;
	Entity E: -3;
```

How do you pick which move to use? I haven't shown you how ``heal`` scoring works just returning a number is meaningless. One could argue that each score should take into account all other scores and give a proportional result but this again is not very scalable. Instead the scores should be properly normalized so comparing two moves as well as two targets for the same move is valid. 

#### 3.3 Comparing Scores






