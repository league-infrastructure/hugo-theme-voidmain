---
title: "Distance Sensor"
weight: 1
---

The distance sensor returns how many cells lie ahead of the robot
before hitting a wall or obstacle.

## Reading the Sensor

```python
distance = bot.sense_distance()
print(f"Clear cells ahead: {distance}")
```

A return value of `0` means the very next cell is blocked.

{{< callout type="info" >}}
`sense_distance()` only looks in the robot's **current heading** direction.
Rotate the robot to scan other directions.
{{< /callout >}}

## Safe Navigation

```python
def move_safe(bot, steps):
    """Move forward, stopping before any obstacle."""
    for _ in range(steps):
        if bot.sense_distance() == 0:
            print("Obstacle detected — stopping.")
            break
        bot.move_forward(1)
```

{{< callout type="warning" >}}
Every call to `sense_distance()` counts as one *action tick*.
Minimise unnecessary sensor reads when performance matters.
{{< /callout >}}

## Wall Follower

A classic exploration strategy is the wall-follower algorithm:
always keep a wall on your right and keep moving forward.

```python
def wall_follower(bot, steps=100):
    for _ in range(steps):
        # Try to turn right and hug the wall
        bot.turn_right()
        if bot.sense_distance() > 0:
            bot.move_forward(1)
        else:
            # Wall on the right — go straight or turn left
            bot.turn_left()
            if bot.sense_distance() > 0:
                bot.move_forward(1)
            else:
                bot.turn_left()   # dead end — face back
```

{{< callout type="tip" >}}
The wall-follower algorithm only works in **simply-connected** mazes
(mazes with no isolated walls). For complex maps you will need the
mapping approach introduced in the next lesson.
{{< /callout >}}

{{< instructor-guide >}}
## Instructor Notes

**Visualisation tip**: slow down the simulation with `world.set_speed(0.2)`
so students can see each sensor read in real time.

**Extension**: ask students to modify `wall_follower` to record every
visited cell in a `set`. How many unique cells does it visit in 100 steps?
{{< /instructor-guide >}}
