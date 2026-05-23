---
title: "Wall Following"
weight: 2
---

Wall-following (the "right-hand rule") is a simple reactive strategy
that works in any simply-connected maze without needing a map.

## The Algorithm

Keep your right hand touching the wall at all times and you will
eventually reach the exit.

```python
def wall_follow(bot):
    while not bot.at_goal():
        if bot.can_turn_right():
            bot.turn_right()
            bot.move_forward(1)
        elif bot.can_move_forward():
            bot.move_forward(1)
        else:
            bot.turn_left()
```

{{< callout type="tip" >}}
The right-hand rule fails in mazes with islands (disconnected walls).
Use BFS when you need a guaranteed solution.
{{< /callout >}}
