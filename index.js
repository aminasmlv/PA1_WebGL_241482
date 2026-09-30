main();

function main() {

    // Create a WebGL Context

    const canvas = document.querySelector("#c");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.log("WebGL unavailable");
        return;
    }


    // Define and Store the Geometry

    const cubePositions = [

        // Front
        -0.70, -0.25, -0.5,
        -0.20, -0.25, -0.5,
        -0.20,  0.25, -0.5,

        -0.70, -0.25, -0.5,
        -0.20,  0.25, -0.5,
        -0.70,  0.25, -0.5,


        // Back
        -0.55, -0.10,  0.5,
        -0.55,  0.40,  0.5,
        -0.05,  0.40,  0.5,

        -0.55, -0.10,  0.5,
        -0.05,  0.40,  0.5,
        -0.05, -0.10,  0.5,


        // Bottom
        -0.70, -0.25, -0.5,
        -0.55, -0.10,  0.5,
        -0.05, -0.10,  0.5,

        -0.70, -0.25, -0.5,
        -0.05, -0.10,  0.5,
        -0.20, -0.25, -0.5,


        // Right
        -0.20, -0.25, -0.5,
        -0.05, -0.10,  0.5,
        -0.05,  0.40,  0.5,

        -0.20, -0.25, -0.5,
        -0.05,  0.40,  0.5,
        -0.20,  0.25, -0.5,


        // Top
        -0.70,  0.25, -0.5,
        -0.20,  0.25, -0.5,
        -0.05,  0.40,  0.5,

        -0.70,  0.25, -0.5,
        -0.05,  0.40,  0.5,
        -0.55,  0.40,  0.5,


        // Left
        -0.70, -0.25, -0.5,
        -0.70,  0.25, -0.5,
        -0.55,  0.40,  0.5,

        -0.70, -0.25, -0.5,
        -0.55,  0.40,  0.5,
        -0.55, -0.10,  0.5
    ];


    const wedgePositions = [

    // Left triangle
    0.20, -0.25, -0.5,
    0.35, -0.10,  0.5,
    0.35,  0.40,  0.5,


    // Right triangle
    0.65, -0.25, -0.5,
    0.80,  0.40,  0.5,
    0.80, -0.10,  0.5,


    // Bottom
    0.20, -0.25, -0.5,
    0.35, -0.10,  0.5,
    0.80, -0.10,  0.5,

    0.20, -0.25, -0.5,
    0.80, -0.10,  0.5,
    0.65, -0.25, -0.5,


    // Back
    0.35, -0.10,  0.5,
    0.80, -0.10,  0.5,
    0.80,  0.40,  0.5,

    0.35, -0.10,  0.5,
    0.80,  0.40,  0.5,
    0.35,  0.40,  0.5,


    // Slope
    0.20, -0.25, -0.5,
    0.65, -0.25, -0.5,
    0.80,  0.40,  0.5,

    0.20, -0.25, -0.5,
    0.80,  0.40,  0.5,
    0.35,  0.40,  0.5
];

    const positions = [
        ...cubePositions,
        ...wedgePositions
    ];


    const cubeVertexCount = cubePositions.length / 3;
    const wedgeVertexCount = wedgePositions.length / 3;
   let drawMode = gl.TRIANGLES;
let modeName = "TRIANGLES";
let depthEnabled = true;
let cubeFirst = true;


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


        // Slope gradient
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


    // Shaders

    const vsSource = `
        attribute vec3 aPosition;
        attribute vec4 aVertexColor;

        varying lowp vec4 vColor;

        void main() {
            gl_Position = vec4(aPosition, 1.0);
            vColor = aVertexColor;
            gl_PointSize = 6.0;
        }
    `;


    const fsSource = `
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


    // Drawing

function render() {

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.05, 0.05, 0.05, 1.0);

    if (depthEnabled) {
        gl.enable(gl.DEPTH_TEST);
    } else {
        gl.disable(gl.DEPTH_TEST);
    }

    gl.depthFunc(gl.LEQUAL);

    gl.clear(
        gl.COLOR_BUFFER_BIT |
        gl.DEPTH_BUFFER_BIT
    );

    if (cubeFirst) {

        gl.drawArrays(
            drawMode,
            0,
            cubeVertexCount
        );

        gl.drawArrays(
            drawMode,
            cubeVertexCount,
            wedgeVertexCount
        );

    } else {

        gl.drawArrays(
            drawMode,
            cubeVertexCount,
            wedgeVertexCount
        );

        gl.drawArrays(
            drawMode,
            0,
            cubeVertexCount
        );
    }

    const depthText = depthEnabled ? "ON" : "OFF";
    const orderText = cubeFirst ? "Cube first" : "Wedge first";

    document.querySelector("#status").textContent =
        "Student ID: 241482 | " +
        modeName +
        " | Depth: " +
        depthText +
        " | " +
        orderText;
}


document.addEventListener("keydown", function(event) {

    const key = event.key.toLowerCase();

    if (key === "1") {

        drawMode = gl.TRIANGLES;
        modeName = "TRIANGLES";

    } else if (key === "2") {

        drawMode = gl.LINE_LOOP;
        modeName = "LINE_LOOP";

    } else if (key === "3") {

        drawMode = gl.LINES;
        modeName = "LINES";

    } else if (key === "4") {

        drawMode = gl.LINE_STRIP;
        modeName = "LINE_STRIP";

    } else if (key === "5") {

        drawMode = gl.POINTS;
        modeName = "POINTS";

    } else if (key === "6") {

        drawMode = gl.TRIANGLE_STRIP;
        modeName = "TRIANGLE_STRIP";

    } else if (key === "d") {

        depthEnabled = !depthEnabled;

    } else if (key === "s") {

        cubeFirst = !cubeFirst;

    } else {

        return;
    }

    render();
});


render();
}


function createShader(gl, type, source) {

    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

        console.log(gl.getShaderInfoLog(shader));

        gl.deleteShader(shader);

        return null;
    }

    return shader;
}


function createProgram(gl, vertexShader, fragmentShader) {

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

        console.log(gl.getProgramInfoLog(program));

        return null;
    }

    return program;
}


function initBuffers(gl, positions, colors) {

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
    );


    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

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