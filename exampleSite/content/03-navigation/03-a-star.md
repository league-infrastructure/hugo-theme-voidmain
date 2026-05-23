---
title: "A* Pathfinding"
weight: 3
---

A* combines the completeness of BFS with a heuristic that guides the
search toward the goal, making it much faster on large grids.

## Heuristic

The Manhattan distance is the standard heuristic for grid worlds
with four-directional movement.

```python
def manhattan(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])
```

## Implementation

```python
import heapq

def astar(world, start, goal):
    open_set = [(0, start)]
    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            return reconstruct_path(came_from, start, goal)
        for nb in world.neighbours(current):
            tentative_g = g_score[current] + 1
            if tentative_g < g_score.get(nb, float('inf')):
                came_from[nb] = current
                g_score[nb] = tentative_g
                f = tentative_g + manhattan(nb, goal)
                heapq.heappush(open_set, (f, nb))
    return None
```
