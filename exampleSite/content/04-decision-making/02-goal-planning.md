---
title: "Goal Planning"
weight: 2
---

Rather than reacting to the immediate environment, a planning robot
reasons about a sequence of actions that leads from the current state
to a goal state.

## STRIPS-Style Goals

```python
goal = {
    "robot_at": (10, 10),
    "map_coverage": 0.8,
}
```

## Simple Planner

```python
def plan(current_state, goal, actions):
    if satisfies(current_state, goal):
        return []
    for action in actions:
        if action.preconditions_met(current_state):
            new_state = action.apply(current_state)
            rest = plan(new_state, goal, actions)
            if rest is not None:
                return [action] + rest
    return None
```

{{< callout type="info" >}}
This naive planner works for small problems. For large worlds use A*
over the state space or a dedicated planning library.
{{< /callout >}}
