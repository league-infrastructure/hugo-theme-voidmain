---
title: "State Machines"
weight: 1
---

A finite state machine (FSM) gives your robot a clear, inspectable
way to manage different behaviours — exploring, retreating, charging.

## Defining States

```python
from enum import Enum

class State(Enum):
    EXPLORE  = "explore"
    RETREAT  = "retreat"
    CHARGE   = "charge"
```

## Transition Logic

```python
def next_state(state, sensors):
    if sensors.battery < 20:
        return State.CHARGE
    if sensors.obstacle_ahead:
        return State.RETREAT
    return State.EXPLORE
```
