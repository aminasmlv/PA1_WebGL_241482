// =========================================================
// PA2 - Matrix Transformations and Perspective
// Student ID: 241482
// =========================================================


// =========================================================
// VARIANT PARAMETERS
// =========================================================

const STUDENT_ID = "241482";

// Last digit = 2 -> T = 6 + 2 = 8 seconds
const ORBIT_PERIOD = 8.0;

// Fixed parameters from the assignment
const ORBIT_RADIUS = 2.5;
const CUBE_SPIN_SPEED = 1.2;
const SOLID_SPIN_SPEED = 2.0;

// Camera variant:
// 4th-to-last digit = 1 -> eye (5, 3, 5), FOV 60 degrees
const CAMERA_EYE = [5, 3, 5];
const START_FOV = 60;

// Cube axis:
// 2nd-to-last digit 8 mod 3 = 2
// normalized (1, 1, 1)
const axisValue = 1 / Math.sqrt(3);

const CUBE_AXIS = [
    axisValue,
    axisValue,
    axisValue
];


main();


// =========================================================
// MAIN
// =========================================================

function main() {

    // =====================================================
    // CREATE WEBGL CONTEXT
    // =====================================================

    const canvas = document.querySelector("#c");

    const gl = canvas.getContext("webgl");


    if (!gl) {

        console.log("WebGL unavailable");

        return;

    }


    // =====================================================
    // GEOMETRY
    // =====================================================


    // -----------------------------------------------------
    // CUBE
    //
    // Cube is now centred at the origin.
    // Every coordinate is between -0.5 and +0.5.
    // -----------------------------------------------------

    const cubePositions = [

        // Front
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,

        -0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5,


        // Back
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,

        -0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,


        // Bottom
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,

        -0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,


        // Right
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,

         0.5, -0.5, -0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,


        // Top
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,

        -0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,


        // Left
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
        -0.5,  0.5,  0.5,

        -0.5, -0.5, -0.5,
        -0.5,  0.5,  0.5,
        -0.5, -0.5,  0.5

    ];


    // -----------------------------------------------------
    // WEDGE
    //
    // PA1 depth offset has been removed.
    // The solid is centred around its own origin and fits
    // inside a 1 x 1 x 1 box.
    // -----------------------------------------------------

    const wedgePositions = [

        // Front triangle
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,


        // Back triangle
        -0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,


        // Bottom
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,

        -0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,


        // Right side
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,

         0.5, -0.5, -0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,


        // Sloped side
        -0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,

        -0.5, -0.5, -0.5,
         0.5,  0.5,  0.5,
        -0.5, -0.5,  0.5

    ];


    // Put both objects into ONE position buffer.

    const positions = [

        ...cubePositions,
        ...wedgePositions

    ];


    const cubeVertexCount =
        cubePositions.length / 3;

    const wedgeVertexCount =
        wedgePositions.length / 3;



    // =====================================================
    // COLORS
    // =====================================================

    const cubeColors = [

        // Front
        1.0, 0.2, 0.2, 1.0,
        1.0, 0.7, 0.2, 1.0,
        0.9, 0.2, 0.7, 1.0,

        1.0, 0.2, 0.2, 1.0,
        0.9, 0.2, 0.7, 1.0,
        0.8, 0.2, 0.3, 1.0,


        // Back
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,

        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,


        // Bottom
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,

        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,


        // Right
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,

        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,


        // Top
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,

        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,


        // Left
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,

        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0

    ];



    const wedgeColors = [

        // Front
        0.8, 0.3, 0.3, 1.0,
        0.8, 0.3, 0.3, 1.0,
        0.8, 0.3, 0.3, 1.0,


        // Back
        0.3, 0.4, 0.9, 1.0,
        0.3, 0.4, 0.9, 1.0,
        0.3, 0.4, 0.9, 1.0,


        // Bottom
        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,

        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,
        0.9, 0.7, 0.2, 1.0,


        // Right
        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,

        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,
        0.2, 0.8, 0.4, 1.0,


        // Slope
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

        colors.length ===
        (positions.length / 3) * 4,

        "Colour array must contain 4 values per vertex"

    );



    // =====================================================
    // CREATE BUFFERS - ONCE
    // =====================================================

    const buffers =
        initBuffers(
            gl,
            positions,
            colors
        );



    // =====================================================
    // SHADERS - ONCE
    // =====================================================

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



    const vertexShader =
        createShader(
            gl,
            gl.VERTEX_SHADER,
            vsSource
        );


    const fragmentShader =
        createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fsSource
        );


    if (!vertexShader || !fragmentShader) {

        return;

    }


    const program =
        createProgram(
            gl,
            vertexShader,
            fragmentShader
        );


    if (!program) {

        return;

    }


    gl.useProgram(program);



    // =====================================================
    // ATTRIBUTE LOCATIONS - ONCE
    // =====================================================

    const positionLocation =
        gl.getAttribLocation(
            program,
            "aPosition"
        );


    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffers.position
    );


    gl.enableVertexAttribArray(
        positionLocation
    );


    gl.vertexAttribPointer(
        positionLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );



    const colorLocation =
        gl.getAttribLocation(
            program,
            "aVertexColor"
        );


    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffers.color
    );


    gl.enableVertexAttribArray(
        colorLocation
    );


    gl.vertexAttribPointer(
        colorLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
    );



    // =====================================================
    // UNIFORM LOCATIONS - ONCE
    // =====================================================

    const modelMatrixLocation =
        gl.getUniformLocation(
            program,
            "uModelMatrix"
        );


    const viewMatrixLocation =
        gl.getUniformLocation(
            program,
            "uViewMatrix"
        );


    const projectionMatrixLocation =
        gl.getUniformLocation(
            program,
            "uProjectionMatrix"
        );



    // =====================================================
    // WEBGL STATE
    // =====================================================

    gl.enable(gl.DEPTH_TEST);

    gl.depthFunc(gl.LEQUAL);



    // =====================================================
    // PROGRAM STATE
    // =====================================================

    const state = {

        t: 0,

        paused: false,

        ortho: false,

        fovDeg: START_FOV,

        azimuth: 0

    };



    // =====================================================
    // RESIZE
    // =====================================================

    let aspect = 1;


    function resize() {

        const dpr =
            window.devicePixelRatio || 1;


        const width =
            Math.round(
                canvas.clientWidth * dpr
            );


        const height =
            Math.round(
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


    window.addEventListener(
        "resize",
        resize
    );


    resize();



    // =====================================================
    // CONTROLS
    // =====================================================

    document.addEventListener(
        "keydown",
        function(event) {

            const key =
                event.key.toLowerCase();


            // P = pause / resume
            if (key === "p") {

                state.paused =
                    !state.paused;

            }


            // O = perspective / orthographic
            else if (key === "o") {

                state.ortho =
                    !state.ortho;

            }


            // + or = increases FOV
            else if (
                (event.key === "+" ||
                 event.key === "=") &&
                !state.ortho
            ) {

                state.fovDeg =
                    Math.min(
                        100,
                        state.fovDeg + 5
                    );

            }


            // - decreases FOV
            else if (
                (event.key === "-" ||
                 event.key === "_") &&
                !state.ortho
            ) {

                state.fovDeg =
                    Math.max(
                        20,
                        state.fovDeg - 5
                    );

            }


            // Left arrow
            else if (
                event.key === "ArrowLeft"
            ) {

                state.azimuth -=
                    5 * Math.PI / 180;

                event.preventDefault();

            }


            // Right arrow
            else if (
                event.key === "ArrowRight"
            ) {

                state.azimuth +=
                    5 * Math.PI / 180;

                event.preventDefault();

            }


            // R = reset
            else if (key === "r") {

                state.t = 0;

                state.paused = false;

                state.ortho = false;

                state.fovDeg =
                    START_FOV;

                state.azimuth = 0;

            }

        }
    );



    // =====================================================
    // FPS VARIABLES
    // =====================================================

    let fps = 0;

    let fpsFrames = 0;

    let fpsStart = 0;



    // =====================================================
    // ANIMATION LOOP
    // =====================================================

    let then = 0;


    function render(now) {

        // Convert milliseconds to seconds.
        now *= 0.001;


        if (then === 0) {

            then = now;

            fpsStart = now;

        }


        // Delta time.
        // Maximum is 0.1 seconds.
        const dt =
            Math.min(
                now - then,
                0.1
            );


        then = now;


        // Time stops while paused.
        if (!state.paused) {

            state.t += dt;

        }



        // =================================================
        // CAMERA
        // =================================================

        const cosA =
            Math.cos(state.azimuth);

        const sinA =
            Math.sin(state.azimuth);


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


        const viewMatrix =
            mat4.create();


        mat4.lookAt(
            viewMatrix,
            eye,
            target,
            up
        );



        // =================================================
        // PROJECTION
        // =================================================

        const projectionMatrix =
            mat4.create();


        const fovRadians =
            state.fovDeg *
            Math.PI / 180;


        const near = 0.1;

        const far = 30.0;


        if (!state.ortho) {

            // Perspective projection

            mat4.perspective(
                projectionMatrix,
                fovRadians,
                aspect,
                near,
                far
            );

        }

        else {

            // Orthographic projection.
            // Half-height is selected to make the
            // scene appear approximately the same size.

            const cameraDistance =
                Math.hypot(
                    eye[0],
                    eye[1],
                    eye[2]
                );


            const halfHeight =
                Math.tan(
                    fovRadians / 2
                ) *
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



        // Upload projection and view matrices.

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



        // =================================================
        // CLEAR SCREEN
        // =================================================

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



        // =================================================
        // DRAW CUBE
        // =================================================

        const cubeMatrix =
            cubeModelMatrix(
                state.t
            );


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



        // =================================================
        // DRAW WEDGE
        // =================================================

        const wedgeMatrix =
            solidModelMatrix(
                state.t
            );


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



        // =================================================
        // FPS
        // =================================================

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



        // =================================================
        // STATUS LABEL
        // =================================================

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



// =========================================================
// CUBE MODEL MATRIX
// =========================================================

function cubeModelMatrix(t) {

    const model =
        mat4.create();


    // Cube stays at the origin.
    // It rotates at 1.2 rad/s around normalized (1,1,1).

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



// =========================================================
// WEDGE MODEL MATRIX
// =========================================================

function solidModelMatrix(t) {

    const model =
        mat4.create();


    // -----------------------------------------------------
    // ORBIT
    //
    // Variant: vertical orbit around X.
    // Full orbit takes 8 seconds.
    // -----------------------------------------------------

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


    // Move the Wedge 2.5 units away from the cube.
    // Because this translation is after orbit rotation
    // in the matrix product, it creates the orbit.

    mat4.translate(
        model,
        model,
        [
            0,
            0,
            ORBIT_RADIUS
        ]
    );



    // -----------------------------------------------------
    // SELF-SPIN
    // -----------------------------------------------------

    const selfSpinAngle =
        SOLID_SPIN_SPEED * t;


    mat4.rotateY(
        model,
        model,
        selfSpinAngle
    );



    // -----------------------------------------------------
    // SCALE PULSE
    //
    // s(t) = 0.65 + 0.15 sin(2πt / 3)
    // -----------------------------------------------------

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



// =========================================================
// CREATE SHADER
// =========================================================

function createShader(
    gl,
    type,
    source
) {

    const shader =
        gl.createShader(type);


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



// =========================================================
// CREATE PROGRAM
// =========================================================

function createProgram(
    gl,
    vertexShader,
    fragmentShader
) {

    const program =
        gl.createProgram();


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



// =========================================================
// CREATE BUFFERS
// =========================================================

function initBuffers(
    gl,
    positions,
    colors
) {

    // Position buffer

    const positionBuffer =
        gl.createBuffer();


    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        positionBuffer
    );


    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
            positions
        ),
        gl.STATIC_DRAW
    );



    // Colour buffer

    const colorBuffer =
        gl.createBuffer();


    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        colorBuffer
    );


    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
            colors
        ),
        gl.STATIC_DRAW
    );



    return {

        position:
            positionBuffer,

        color:
            colorBuffer

    };

}