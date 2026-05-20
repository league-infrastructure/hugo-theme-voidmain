---
title: "Getting Started"
weight: 1
---

In this lesson you will install the robot simulator and verify that
your Python environment is ready.

## Prerequisites

You need Python 3.10 or newer. Check your version:

```bash
python3 --version
```

{{< callout type="tip" >}}
If you have multiple Python versions installed, make sure `python3`
points to 3.10+. Use `pyenv` or `conda` to manage versions.
{{< /callout >}}

## Install the Simulator

```bash
pip install robot-explorer-sim
```

{{< callout type="info" >}}
The simulator opens a window using `pygame`. On headless servers you
will need a virtual display such as `Xvfb`.
{{< /callout >}}

## Run Your First Simulation

```python
from robot_sim import World, Robot

world = World(width=20, height=20)
bot   = Robot(world, start=(0, 0))

bot.move_forward(3)
bot.turn_right()
bot.move_forward(2)

world.render()
```

{{< callout type="warning" >}}
Always call `world.render()` at the end of your script, or the
simulator window will close immediately.
{{< /callout >}}

{{< instructor-guide >}}
## Instructor Notes

**Common issues**

- Students on Windows sometimes see a `DLL load failed` error from pygame.
  Have them install the Visual C++ Redistributable from Microsoft.
- The default window size (800 × 600) may be too large on small displays.
  Students can pass `scale=0.5` to `World()`.

**Discussion prompt**: Ask students what they think the robot "sees."
Lead into the sensor lessons in Module 2.
{{< /instructor-guide >}}
