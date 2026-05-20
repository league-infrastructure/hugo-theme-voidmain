---
title: "Movement and Coordinates"
weight: 2
---

The robot lives on a 2-D grid. Understanding the coordinate system is
essential before we add sensors or decision-making.

## The Grid

Each cell on the grid is identified by `(column, row)` — `(0, 0)` is the
**top-left** corner. Column numbers increase to the right; row numbers
increase downward.

```
(0,0)  (1,0)  (2,0) ...
(0,1)  (1,1)  (2,1) ...
(0,2)  (1,2)  (2,2) ...
```

{{< callout type="info" >}}
This is the standard screen coordinate system used by most 2-D game
engines. It is the *opposite* of the mathematical convention where `y`
increases upward.
{{< /callout >}}

## Robot Headings

The robot always faces one of four cardinal directions:

| Heading | Value |
|---------|-------|
| North   | 0     |
| East    | 1     |
| South   | 2     |
| West    | 3     |

`turn_right()` increments the heading (mod 4); `turn_left()` decrements it.

## Movement Methods

| Method | Effect |
|--------|--------|
| `move_forward(n)` | Move `n` cells in the current heading direction |
| `move_backward(n)` | Move `n` cells opposite to the current heading |
| `turn_right()` | Rotate 90° clockwise |
| `turn_left()` | Rotate 90° counter-clockwise |

{{< callout type="warning" >}}
Moving outside the world boundaries raises `OutOfBoundsError`. Always
check `bot.can_move_forward()` before moving in unknown terrain.
{{< /callout >}}

## Try It

Write a program that moves the robot in a square: forward 4, turn right,
forward 4, turn right, forward 4, turn right, forward 4.

{{< readme-shared >}}
### Quick Reference — Movement

```python
bot.move_forward(n)   # move n steps
bot.turn_right()      # rotate clockwise
bot.turn_left()       # rotate counter-clockwise
bot.position          # (col, row) tuple
bot.heading           # 0=N 1=E 2=S 3=W
```
{{< /readme-shared >}}

{{< instructor-guide >}}
## Instructor Notes

The square-movement exercise is a good pair-programming activity.
One student calls the methods verbally; the other types them. Then
they swap. This surfaces misunderstandings about which direction
"right" turns the robot without requiring the simulator to be open.
{{< /instructor-guide >}}
