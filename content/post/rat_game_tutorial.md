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

# Targeting type
## targeting type: single enemy
## targeting type: all
## targeting type: only ally | only enemy
## targeting type: only self
## targeting type: only ally and enemy not self

# Ressources
## no ap cost, inf stacks
## ap cost, inf stacks
## limited stacks, no ap cost
## ap cost + limited stacks
## consumables

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


    

    
    

