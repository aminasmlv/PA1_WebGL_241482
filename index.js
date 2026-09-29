main();


function main() {

    /*========== Create a WebGL Context ==========*/

    const canvas = document.querySelector("#c");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.log("WebGL unavailable");
        return;
    }


    /*========== Define and Store the Geometry ==========*/

    const positions = [

        // FRONT FACE
        -0.70, -0.25, -0.5,
        -0.20, -0.25, -0.5,
        -0.20,  0.25, -0.5,

        -0.70, -0.25, -0.5,
        -0.20,  0.25, -0.5,
        -0.70,  0.25, -0.5,


        // BACK FACE
        // shifted by (+0.15, +0.15)

        -0.55, -0.10,  0.5,
        -0.55,  0.40,  0.5,
        -0.05,  0.40,  0.5,

        -0.55, -0.10,  0.5,
        -0.05,  0.40,  0.5,
        -0.05, -0.10,  0.5,


        // BOTTOM FACE

        -0.70, -0.25, -0.5,
        -0.55, -0.10,  0.5,
        -0.05, -0.10,  0.5,

        -0.70, -0.25, -0.5,
        -0.05, -0.10,  0.5,
        -0.20, -0.25, -0.5,


        // RIGHT FACE

        -0.20, -0.25, -0.5,
        -0.05, -0.10,  0.5,
        -0.05,  0.40,  0.5,

        -0.20, -0.25, -0.5,
        -0.05,  0.40,  0.5,
        -0.20,  0.25, -0.5,


        // TOP FACE

        -0.70,  0.25, -0.5,
        -0.20,  0.25, -0.5,
        -0.05,  0.40,  0.5,

        -0.70,  0.25, -0.5,
        -0.05,  0.40,  0.5,
        -0.55,  0.40,  0.5,


        // LEFT FACE

        -0.70, -0.25, -0.5,
        -0.70,  0.25, -0.5,
        -0.55,  0.40,  0.5,

        -0.70, -0.25, -0.5,
        -0.55,  0.40,  0.5,
        -0.55, -0.10,  0.5

    ];


    const colors = [

        // FRONT - gradient
        1.0, 0.2, 0.2, 1.0,
        1.0, 0.7, 0.2, 1.0,
        0.9, 0.2, 0.7, 1.0,

        1.0, 0.2, 0.2, 1.0,
        0.9, 0.2, 0.7, 1.0,
        0.8, 0.2, 0.3, 1.0,


        // BACK - blue
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,

        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,
        0.2, 0.3, 0.9, 1.0,


        // BOTTOM - yellow
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,

        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,
        0.9, 0.8, 0.2, 1.0,


        // RIGHT - green
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,

        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,
        0.2, 0.8, 0.3, 1.0,


        // TOP - cyan
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,

        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,
        0.2, 0.8, 0.9, 1.0,


        // LEFT - purple
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,

        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0,
        0.6, 0.3, 0.8, 1.0

    ];


    const cubeVertexCount = positions.length / 3;

    console.assert(
        colors.length === cubeVertexCount * 4,
        "Colour array must contain 4 values per vertex"
    );


    const buffers = initBuffers(gl, positions, colors);


    /*========== Shaders ==========*/

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


    /*====== Connect the attributes with the vertex shader ======*/

    const positionLocation = gl.getAttribLocation(
        program,
        "aPosition"
    );

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffers.position
    );

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

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffers.color
    );

    gl.enableVertexAttribArray(colorLocation);

    gl.vertexAttribPointer(
        colorLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
    );


    /*========== Drawing ==========*/

    function render() {

        gl.viewport(
            0,
            0,
            canvas.width,
            canvas.height
        );


        gl.clearColor(
            0.05,
            0.05,
            0.05,
            1.0
        );


        gl.enable(gl.DEPTH_TEST);

        gl.depthFunc(gl.LEQUAL);


        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );


        gl.drawArrays(
            gl.TRIANGLES,
            0,
            cubeVertexCount
        );


        document.querySelector("#status").textContent =
            "Student ID: 241482 | TRIANGLES | Depth: ON | Cube";
    }


    render();
}



function createShader(gl, type, source) {

    const shader = gl.createShader(type);

    gl.shaderSource(
        shader,
        source
    );

    gl.compileShader(shader);


    if (!gl.getShaderParameter(
        shader,
        gl.COMPILE_STATUS
    )) {

        console.log(
            gl.getShaderInfoLog(shader)
        );

        gl.deleteShader(shader);

        return null;
    }


    return shader;
}



function createProgram(gl, vertexShader, fragmentShader) {

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


    if (!gl.getProgramParameter(
        program,
        gl.LINK_STATUS
    )) {

        console.log(
            gl.getProgramInfoLog(program)
        );

        return null;
    }


    return program;
}



function initBuffers(gl, positions, colors) {

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        positionBuffer
    );

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
    );


    const colorBuffer = gl.createBuffer();

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