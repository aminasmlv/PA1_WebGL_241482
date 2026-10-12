const STUDENT_ID = "241482";

const ORBIT_PERIOD = 8.0;
const ORBIT_RADIUS = 2.5;
const CUBE_SPIN_SPEED = 1.2;
const SOLID_SPIN_SPEED = 2.0;

const CAMERA_EYE = [5, 3, 5];
const START_FOV = 60;

const axisValue = 1 / Math.sqrt(3);
const CUBE_AXIS = [axisValue, axisValue, axisValue];

main();

function main() {
    const canvas = document.querySelector("#c");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.log("WebGL unavailable");
        return;
    }

    const cubePositions = [
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,

        -0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5,

        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,

        -0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,

        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,

        -0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,

         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,

         0.5, -0.5, -0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,

        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,

        -0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,

        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
        -0.5,  0.5,  0.5,

        -0.5, -0.5, -0.5,
        -0.5,  0.5,  0.5,
        -0.5, -0.5,  0.5
    ];

    const wedgePositions = [
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,

        -0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,

        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,

        -0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,

         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,

         0.5, -0.5, -0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,

        -0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,

        -0.5, -0.5, -0.5,
         0.5,  0.5,  0.5,
        -0.5, -0.5,  0.5
    ];

    const positions = [
        ...cubePositions,
        ...wedgePositions
    ];

    const cubeVertexCount = cubePositions.length / 3;
    const wedgeVertexCount = wedgePositions.length / 3;

    const cubeColors = [
        1.0, 0.2, 0.2, 1.0,
        1.0, 0.7, 0.2, 1.0,
        0.9, 0.2, 0.7, 1.0,
        1.0, 0.2, 0.2, 1.0,
        0.9, 0.2, 0.7, 1.0,
        0.8, 0.2, 0.3, 1.0,

        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,

        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,

        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,

        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,

        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0
    ];

    const wedgeColors = [
        0.8, 0.3, 0.3, 1.0,
        0.8, 0.3, 0.3, 1.0,
        0.8, 0.3, 0.3, 1.0,

        0.3, 0.4, 0.9, 1.0,
        0.3, 0.4, 0.9, 1.0,
        0.3, 0.4, 0.9, 1.0,

        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,

        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,

        1.0, 0.2, 0.2, 1.0,
        0.2, 0.8, 0.9, 1.0,
        1.0, 0.7, 0.2, 1.0,
        1.0, 0.2, 0.2, 1.0,
        1.0, 0.7, 0.2, 1.0,
        0.7, 0.3, 0.8, 1.0
    ];

    const colors = [
        ...cubeColors,
        ...wedgeColors
    ];

    console.assert(
        colors.length === (positions.length / 3) * 4,
        "Colour array must contain 4 values per vertex"
    );

    const buffers = initBuffers(gl, positions, colors);

    const vsSource = `
        attribute vec4 aPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelMatrix;
        uniform mat4 uViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main() {
            gl_Position =
                uProjectionMatrix *
                uViewMatrix *
                uModelMatrix *
                aPosition;

            vColor = aVertexColor;
        }
    `;

    const fsSource = `
        precision mediump float;

        varying lowp vec4 vColor;

        void main() {
            gl_FragColor = vColor;
        }
    `;

    const vertexShader = createShader(
        gl,
        gl.VERTEX_SHADER,
        vsSource
    );

    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fsSource
    );

    if (!vertexShader || !fragmentShader) {
        return;
    }

    const program = createProgram(
        gl,
        vertexShader,
        fragmentShader
    );

    if (!program) {
        return;
    }

    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(
        program,
        "aPosition"
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(
        positionLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );

    const colorLocation = gl.getAttribLocation(
        program,
        "aVertexColor"
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.enableVertexAttribArray(colorLocation);

    gl.vertexAttribPointer(
        colorLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
    );

    const modelMatrixLocation = gl.getUniformLocation(
        program,
        "uModelMatrix"
    );

    const viewMatrixLocation = gl.getUniformLocation(
        program,
        "uViewMatrix"
    );

    const projectionMatrixLocation = gl.getUniformLocation(
        program,
        "uProjectionMatrix"
    );

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    const state = {
    t: 0,
    paused: false,
    ortho: false,
    fovDeg: START_FOV,
    azimuth: 0
};

    let aspect = 1;

    function resize() {
        const dpr = window.devicePixelRatio || 1;

        const width = Math.round(
            canvas.clientWidth * dpr
        );

        const height = Math.round(
            canvas.clientHeight * dpr
        );

        if (
            canvas.width !== width ||
            canvas.height !== height
        ) {
            canvas.width = width;
            canvas.height = height;
        }

        gl.viewport(
            0,
            0,
            canvas.width,
            canvas.height
        );

        aspect =
            canvas.clientWidth /
            canvas.clientHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    document.addEventListener(
        "keydown",
        function(event) {
            const key = event.key.toLowerCase();

            if (key === "p") {
                state.paused = !state.paused;
            }

            else if (key === "o") {
                state.ortho = !state.ortho;
            }

            else if (
                (event.key === "+" ||
                 event.key === "=") &&
                !state.ortho
            ) {
                state.fovDeg = Math.min(
                    100,
                    state.fovDeg + 5
                );
            }

            else if (
                (event.key === "-" ||
                 event.key === "_") &&
                !state.ortho
            ) {
                state.fovDeg = Math.max(
                    20,
                    state.fovDeg - 5
                );
            }

            else if (event.key === "ArrowLeft") {
                state.azimuth -= 5 * Math.PI / 180;
                event.preventDefault();
            }

            else if (event.key === "ArrowRight") {
                state.azimuth += 5 * Math.PI / 180;
                event.preventDefault();
            }

            else if (key === "r") {
                state.t = 0;
                state.paused = false;
                state.ortho = false;
                state.fovDeg = START_FOV;
                state.azimuth = 0;
            }
        }
    );

    let fps = 0;
    let fpsFrames = 0;
    let fpsStart = 0;

    let then = 0;
   

    function render(now) {
        now *= 0.001;

        if (then === 0) {
            then = now;
            fpsStart = now;
        }

   const dt = Math.min(
    now - then,
    0.1
);
        


        then = now;

        if (!state.paused) {
            state.t += dt;
        }

        const cosA = Math.cos(state.azimuth);
        const sinA = Math.sin(state.azimuth);

        const eyeX =
            CAMERA_EYE[0] * cosA +
            CAMERA_EYE[2] * sinA;

        const eyeZ =
            -CAMERA_EYE[0] * sinA +
            CAMERA_EYE[2] * cosA;

        const eye = [
            eyeX,
            CAMERA_EYE[1],
            eyeZ
        ];

        const target = [0, 0, 0];
        const up = [0, 1, 0];

        const viewMatrix = mat4.create();

        mat4.lookAt(
            viewMatrix,
            eye,
            target,
            up
        );

        const projectionMatrix = mat4.create();

        const fovRadians =
            state.fovDeg *
            Math.PI / 180;
const near = 0.1;
const far = 30.0;

        if (!state.ortho) {
        mat4.perspective(
    projectionMatrix,
    fovRadians,
    aspect,
    near,
    far
);
        } else {
            const cameraDistance = Math.hypot(
                eye[0],
                eye[1],
                eye[2]
            );

            const halfHeight =
                Math.tan(fovRadians / 2) *
                cameraDistance;

            const halfWidth =
                halfHeight * aspect;

            mat4.ortho(
                projectionMatrix,
                -halfWidth,
                 halfWidth,
                -halfHeight,
                 halfHeight,
                near,
                far
            );
        }

        gl.uniformMatrix4fv(
            projectionMatrixLocation,
            false,
            projectionMatrix
        );

        gl.uniformMatrix4fv(
            viewMatrixLocation,
            false,
            viewMatrix
        );

        gl.clearColor(
            0.05,
            0.05,
            0.05,
            1.0
        );

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        const cubeMatrix =
            cubeModelMatrix(state.t);

        gl.uniformMatrix4fv(
            modelMatrixLocation,
            false,
            cubeMatrix
        );

        gl.drawArrays(
            gl.TRIANGLES,
            0,
            cubeVertexCount
        );

        const wedgeMatrix =
            solidModelMatrix(state.t);

        gl.uniformMatrix4fv(
            modelMatrixLocation,
            false,
            wedgeMatrix
        );

        gl.drawArrays(
            gl.TRIANGLES,
            cubeVertexCount,
            wedgeVertexCount
        );

        fpsFrames++;

        const fpsElapsed =
            now - fpsStart;

        if (fpsElapsed >= 1.0) {
            fps =
                fpsFrames /
                fpsElapsed;

            fpsFrames = 0;
            fpsStart = now;
        }

        const projectionName =
            state.ortho
                ? "Orthographic"
                : "Perspective";

        document.querySelector(
            "#status"
        ).textContent =
            "Student ID: " +
            STUDENT_ID +
            " | " +
            projectionName +
            " | FOV: " +
            state.fovDeg +
            "°" +
            " | t: " +
            state.t.toFixed(1) +
            " | FPS: " +
            fps.toFixed(1);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function cubeModelMatrix(t) {
    const model = mat4.create();

    const angle =
        CUBE_SPIN_SPEED * t;

    mat4.rotate(
        model,
        model,
        angle,
        CUBE_AXIS
    );

    return model;
}

function solidModelMatrix(t) {
    const model = mat4.create();

    const orbitAngle =
    2 *
    Math.PI *
    t /
    ORBIT_PERIOD;

mat4.rotateX(
    model,
    model,
    orbitAngle
);

mat4.translate(
    model,
    model,
    [
        0,
        0,
        ORBIT_RADIUS
    ]
);

const selfSpinAngle =
    SOLID_SPIN_SPEED * t;

mat4.rotateY(
    model,
    model,
    selfSpinAngle
);

    const scaleValue =
        0.65 +
        0.15 *
        Math.sin(
            2 *
            Math.PI *
            t /
            3
        );

    mat4.scale(
        model,
        model,
        [
            scaleValue,
            scaleValue,
            scaleValue
        ]
    );

    return model;
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(
        shader,
        source
    );

    gl.compileShader(shader);

    if (
        !gl.getShaderParameter(
            shader,
            gl.COMPILE_STATUS
        )
    ) {
        console.log(
            gl.getShaderInfoLog(shader)
        );

        gl.deleteShader(shader);

        return null;
    }

    return shader;
}

function createProgram(
    gl,
    vertexShader,
    fragmentShader
) {
    const program = gl.createProgram();

    gl.attachShader(
        program,
        vertexShader
    );

    gl.attachShader(
        program,
        fragmentShader
    );

    gl.linkProgram(program);

    if (
        !gl.getProgramParameter(
            program,
            gl.LINK_STATUS
        )
    ) {
        console.log(
            gl.getProgramInfoLog(program)
        );

        gl.deleteProgram(program);

        return null;
    }

    return program;
}

function initBuffers(
    gl,
    positions,
    colors
) {
    const positionBuffer =
        gl.createBuffer();

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        positionBuffer
    );

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
    );

    const colorBuffer =
        gl.createBuffer();

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        colorBuffer
    );

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(colors),
        gl.STATIC_DRAW
    );

    return {
        position: positionBuffer,
        color: colorBuffer
    };
}