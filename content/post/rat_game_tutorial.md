title = "[WIP] Adaptive AI in jRPGs: A Detailed Guide"
date = 2021-06-10T22:41:08+01:00
author = "C. Cords"
draft = false
url = "/post/jrpg-ai"
layout = "post/single"
categories = ["game design", "rat_game"]
+++

Things to do tutorials about (in order):

# Death/Knocked out
## Only one enemy: knock out to win
## Only one party: knock out won't quit until death
## One enemy has to die, other only knocked out

Nurse: 
    Nurse is weird cat from monster hunter in kezu clothing
    Always priority 1, inflict nurse-status on all allies
    Nurse Status: when entity gets knocked out, cure and instantly heal 50% health
    that way nurse needs to be killed first
    
    Attacks: Protect other
    
Syringe Bird:
    Special Status: refill syringe. Try to refill every turn, only works if not already refilled. While refilled counter at 0, attacks poison 
    
    
1 nurse, 1 normal
1 nurse, 2 normal

2 nurse no normal: nurse need to be knocked out at the same time. Right before bossfight to teach
2 nurse + boss

# Innate Moves
## Attack
Prologue first attack on douchebag should end the fight in one hit
## Protect
Two enemies, one chick and one mother. Mother does damage and while mother isn't knocked out, chick is impervious to all damage. Chick can't do anything, it just hides behind mother. Once mother is done, chick starts using player protect so first turn it will guard but the next turn it can't so the player can attack, the next turn guard again, etc.. Make HP so that chick needs at least 4 turns to kill
## Analysis
Attacks only do 1 damage. All enemies have high HP so just attacking won't work. They all have to have uneven HP to be killed. Sprite changes after attack.
## HEAL

# Targeting type
## targeting type: single enemy
Two lightning rods. Every second turn one lightningrod goes into a special status that makes it so when it is attacked it deals damage to entire party. Lasts for one turn. Have two lightningrods 
that change which one is attracting so the player has to use single target. Give player new multi-target move, then have one battle to try it out and then have the very next battle be lightningrods
## targeting type: all
5 sprouts. All have 1 hp however if one is knocked out the next turn another will revive all currently fallen sprouts. Have more sprouts than party members so player cannot kill them until they use a multi target move.
## targeting type: only ally
have first heal AP move be only ally. Player will expect restore AP to be for self like in other games
## targeting type: only enemy
doesn't need a tutorial
## targeting type: only self
doesn't need a tutorial
## targeting type: only ally and enemy not self

# Ressources
## no ap cost, inf stacks
## limited stacks, no ap cost
stacks should be introduced first because everybody knows how mana works
Have move that adds special status, then when used again it does an extra effect. Ideas:
STORE: add special status to target enemy. All damage done to them and done by them gets saved, when move is used again, all that damage is applied to enemy. Only 1 stack but you find two orbs. Find one orb first, that way player realizes they have to no way to trigger it and right after t hat fight give them the second orb. They have to have understood how stacks work then.

STORE DAMAGE:
    target: single enemy
    inflict special status to enemy. When inflicted, start a counter that counts all damage deal (and done?) to that enemy. After either 5 turns or when the move is used again, apply 50% (100% if detonated?) of the damage to that enemy. 

combo with: 
REFLECT DAMAGE:
    target: single enemy
    all damage dealt to user is instead deal to enemy that turn. Only transfers damage, status effects and buffs still go to user

## ap cost, inf stacks
restore n ap to ally, costs 0.5* n ap
## ap cost + limited stacks
really strong 1-stack unique move that costs a lot of ap. Has to be support so it isn't overpowered in a way where it steamrolls early enemies and is useless later. 

## consumables
girl: innate: If she used a consumable last turn, she can activate innate ability to invoke that consumable again once per fight

have her find weapons on your way to prof, then on way back she can use them

# Priming
## prime, no detonation
## prime goes away after 2 turns
## prime & detonate, only Type A
## cure prime by reseting to neutral
## switch prime with Type B

# Speed
## Queue Order
## Speed boost: single
## Speed decrease: single
## Speed boost + decrease in one move
## priority without speed modification
## priority with speed modification

# Status
## Asleep: Cure by waiting & cure by damage
## Stun
## Chill effect on speed
## Chill + Chill = Frozen
## Burn effect on defense

## Chill + Burn or Frozen + Burn
ENEMY:
    Ice Cream x2
    Fire Cream x1
    
    spawns: 
        IceIce Cream
        FireFire Cream
        IceFire Cream

ATTACKS:
Ai should make it so only one of them can pick one of the elemental attacks in the same turn
Ai always protects first turn

Ice:
    protect: inflict ice soul on self, stack 1
    freeze: low damage to single target, inflict chill on all enemies automatically
    
Fire:
    protect: inflict fire soul on self, stack 1
    attack: serious damage (so it is focused to trick palyer into)
    fire: deal damage to single target, infclit burn on all enemies automatically
    
IceIce:
    protect: regular protect
    attack: low-damage
    double-freeze: mid-damage, instantly freeze target and chill all others
    
FireFire:
    protect: regular protect
    attack: extreme damage
    double-fire: inflict burn on all enemies
    
IceFire:
    protect: regular protect
    attack: mid-damage
    Ice-fire: Inflict chill, then inflict burn, burn always last, 0 damage for joke
    
SPECIAL STATUS:
    Ice soul: 
        on death inflict ice soul on all allies
        if ally already has fire: spawn ice-fire, cure all
        if ally already has ice: spawn ice-ice, cure all
        
    Fire soul: on death inflict fire soul on the ally with the least health
        on death inflict fire soul on all allies
        if ally already has fire: spawn fire-fire, cure all
        if ally already has ice: spawn ice-fire, cure all

## Blind effect on Attacke
## At risk: only for enemy
## At risk: for player


    

    
    

