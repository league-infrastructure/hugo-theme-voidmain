---
title: "Building a Map"
weight: 2
---

As the robot explores it can record what it has seen, building an
internal map that grows richer with every move.

## The Map Object

```python
from robot_sim import Map

map = Map(world.width, world.height)

# Mark a cell as visited
map.mark_visited(bot.position)

# Check whether a cell has been visited
if map.is_visited((3, 4)):
    print("We have been there before.")
```

## Exploration Loop

```python
def explore(bot, map, max_steps=200):
    for _ in range(max_steps):
        map.mark_visited(bot.position)

        if bot.sense_distance() > 0:
            bot.move_forward(1)
        else:
            bot.turn_right()

    coverage = map.visited_count() / (world.width * world.height)
    print(f"Explored {coverage:.0%} of the world")
```

{{< callout type="tip" >}}
Try rendering the map after exploration with `map.render()`.
Visited cells appear in green; unvisited cells are grey.
{{< /callout >}}

{{< callout type="info" >}}
`Map` is a simple grid of booleans. In later modules you will replace
it with a probability grid that handles sensor uncertainty.
{{< /callout >}}

{{< readme-shared >}}
### Quick Reference — Map

```python
map.mark_visited(pos)     # record (col, row) as seen
map.is_visited(pos)       # True / False
map.visited_count()       # number of visited cells
map.render()              # display the map
```
{{< /readme-shared >}}

{{< readme-only >}}
> **Note for README readers**: run `python examples/explore.py` to see
> the full exploration demo in action.
{{< /readme-only >}}

{{< instructor-guide >}}
## Instructor Notes

**Discussion**: once students have a working `explore` function, ask:
"What percentage of the world do you think a simple right-turn strategy
visits?" Let them predict, then run the simulation and compare.

**Challenge extension**: modify the loop to prefer unvisited cells
(hint: check `map.is_visited` for each neighbouring cell before choosing
a direction). This significantly increases coverage.
{{< /instructor-guide >}}
