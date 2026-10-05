PA2 — Matrix Transformations and Perspective

Student ID: 241482

Personal Variant

- Assigned solid: Wedge
- Orbit period: 8 seconds
- Cube spin axis: normalized (1, 1, 1)
- Orbit plane: vertical orbit around the X-axis
- Camera eye: (5, 3, 5)
- Initial FOV: 60 degrees

Description

This project extends PA1 into an animated 3D WebGL scene using matrix transformations and a real camera.

The cube stays at the origin and rotates around the normalized (1, 1, 1) axis.

The Wedge orbits the cube with a radius of 2.5 units and a period of 8 seconds. At the same time, it rotates around its own Y-axis and changes its scale over time.

The scene uses separate model, view, and projection matrices.

How to Run

1. Open the project folder in Visual Studio Code.
2. Run `index.html` using Live Server.
3. Open the page in a current version of Chrome or Firefox.

Controls

- `P` — Pause / resume animation
- `O` — Toggle Perspective / Orthographic projection
- `+` or `=` — Increase FOV by 5 degrees
- `-` — Decrease FOV by 5 degrees
- `Left Arrow` — Orbit camera left around the Y-axis
- `Right Arrow` — Orbit camera right around the Y-axis
- `R` — Reset camera and animation time

Technologies

- WebGL 1.0
- JavaScript
- GLSL
- glMatrix 2.8.1