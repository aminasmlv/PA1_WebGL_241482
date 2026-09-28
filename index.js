function main() {

    const canvas = document.querySelector("#c");
    const gl = canvas.getContext("webgl");


    if (!gl) {
        alert("WebGL not supported");
        return;
    }



    // ================= SHADERS =================


    const vertexShaderSource = `

    attribute vec3 aPosition;
    attribute vec3 aColor;

    varying vec3 vColor;


    void main() {

        gl_Position = vec4(aPosition, 1.0);

        vColor = aColor;

    }

    `;



    const fragmentShaderSource = `

    precision mediump float;

    varying vec3 vColor;


    void main() {

        gl_FragColor = vec4(vColor, 1.0);

    }

    `;



    function createShader(type, source) {

        const shader = gl.createShader(type);

        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        return shader;

    }



    const vertexShader = createShader(
        gl.VERTEX_SHADER,
        vertexShaderSource
    );


    const fragmentShader = createShader(
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );



    const program = gl.createProgram();


    gl.attachShader(program, vertexShader);

    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.useProgram(program);



    // ================= GEOMETRY =================
    // Front square + shifted back square


    const positions = [

        // Front square (z = 0.2)

        -0.5, -0.5, 0.2,
         0.5, -0.5, 0.2,
         0.5,  0.5, 0.2,

        -0.5, -0.5, 0.2,
         0.5,  0.5, 0.2,
        -0.5,  0.5, 0.2,



        // Back square shifted (+0.15,+0.15)

        -0.35, -0.35, -0.2,
         0.65, -0.35, -0.2,
         0.65,  0.65, -0.2,

        -0.35, -0.35, -0.2,
         0.65,  0.65, -0.2,
        -0.35,  0.65, -0.2,


        // Side triangles connecting front and back

        -0.5,-0.5,0.2,
        -0.35,-0.35,-0.2,
         0.65,-0.35,-0.2,

        -0.5,-0.5,0.2,
         0.65,-0.35,-0.2,
         0.5,-0.5,0.2,


        0.5,-0.5,0.2,
         0.65,-0.35,-0.2,
         0.65,0.65,-0.2,

        0.5,-0.5,0.2,
         0.65,0.65,-0.2,
         0.5,0.5,0.2

    ];



    // ================= COLORS =================


    const colors = [

        // Front red
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,
        1,0,0,


        // Back blue
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1,


        // Side green
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,


        // Side yellow
        1,1,0,
        1,1,0,
        1,1,0,
        1,1,0,
        1,1,0,
        1,1,0

    ];



    // ================= POSITION BUFFER =================


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



    const positionLocation = gl.getAttribLocation(
        program,
        "aPosition"
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



    // ================= COLOR BUFFER =================


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



    const colorLocation = gl.getAttribLocation(
        program,
        "aColor"
    );


    gl.enableVertexAttribArray(
        colorLocation
    );


    gl.vertexAttribPointer(
        colorLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );



    // ================= DRAW =================


    gl.enable(gl.DEPTH_TEST);


    gl.clearColor(
        0.05,
        0.05,
        0.05,
        1
    );


    gl.clear(
        gl.COLOR_BUFFER_BIT |
        gl.DEPTH_BUFFER_BIT
    );



    gl.drawArrays(
        gl.TRIANGLES,
        0,
        positions.length / 3
    );


}


main();