---
title: "Grid Search"
weight: 1
---

A grid search visits every reachable cell in the world systematically.
It is the simplest complete algorithm: if a path exists, grid search
will find it.

## Breadth-First Search

BFS explores neighbours level by level, guaranteeing the shortest
path in an unweighted grid.

```python
from collections import deque

def bfs(world, start, goal):
    queue = deque([start])
    visited = {start: None}
    while queue:
        current = queue.popleft()
        if current == goal:
            break
        for neighbour in world.neighbours(current):
            if neighbour not in visited:
                visited[neighbour] = current
                queue.append(neighbour)
    return reconstruct_path(visited, start, goal)
```

## Depth-First Search

DFS uses a stack and is not guaranteed to find the shortest path,
but uses less memory on deep, narrow mazes.

{{< callout type="warning" >}}
DFS can get stuck in infinite loops on cyclic grids. Always track
visited cells.
{{< /callout >}}
