// Copyright 2021 Clemens Cords (mail@clemens-cords.com)

let fragment_source = `precision highp float;

float project(float lower, float upper, float value)
{
    return value * abs(upper - lower) + min(lower, upper);
}

vec2 rotate_point(vec2 point, vec2 pivot, float angle_dg)
{
    float angle = angle_dg * (3.14159 / 180.0);

    float s = sin(angle);
    float c = cos(angle);

    // translate point back to origin:
    point -= pivot;

    // rotate point
    point.x = point.x * c - point.y * s;
    point.y = point.x * s + point.y * c;

    // translate point back:
    point += pivot;

    return point;
}

vec3 rgb_to_hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv_to_rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// random
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float random(vec2 v)
{
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0

  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float symmetrical_mod(float x)
{
    x = (2.0 * mod(x, 1.0)) - 1.0;
    return mod(1.0 + (1.0 - float(int(abs(x)))) * x, 1.0);
}

float round(float x)
{
    return max(float(int(abs(x) - 0.5)), float(int(abs(x) + 0.5))) + 1.0;
}

varying vec4 _vertex_color;
varying vec2 _vertex_pos;

uniform float _time;
uniform vec2 _screen_resolution;

#define pink vec3(0.816, 0.188, 0.439)
#define blue vec3(0.205, 0.384, 0.76)

void main()
{
    vec2 pos = _vertex_pos;    
    pos.x *= _screen_resolution.x / _screen_resolution.y;
        
    float time = _time / 10.0;
        
    pos.x -= time;
    pos.y -= 2.0 * time;
   
    pos.x *= 20.0;
    pos.x += (3.0 + random(vec2(time, pos.y))) * sin(5.0 * pos.y);

    vec3 color;
    if (mod(round(pos.x), 2.0) == 0.0)
      color = mix(blue, pink, symmetrical_mod(0.333 * fract(pos.x) + time));
    else 
      color = vec3(0);
        
    gl_FragColor = vec4(color, 1.0);
}
`

let time = Math.random() * 1000;

main();

/// @brief main
function main()
{
  const canvas = document.querySelector('#glcanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program
  const vertex_source = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    
    varying lowp vec4 _vertex_color;
    varying lowp vec2 _vertex_pos;
    
    void main(void) 
    {
      gl_Position = aVertexPosition; //uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      _vertex_color = aVertexColor;
      _vertex_pos = aVertexPosition.xy;
    }
  `;

  const shaderProgram = initShaderProgram(gl, vertex_source, fragment_source);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const buffers = initBuffers(gl);

  // render loop
  let then = 0;
  function render(now) {

    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, deltaTime);
    requestAnimationFrame(render);
  }

  // hacky fix but works for now
  function reload() {window.location.reload(true);}
  window.addEventListener('resize', reload, false);

  requestAnimationFrame(render);
}

/// @brief initialize color and positional buffers
function initBuffers(gl)
{
  const position_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);

  // vertex pos
  const val_x = 1;
  const val_y = 1;
  const positions = [
     val_x,  val_y,
    -val_x,  val_y,
     val_x, -val_y,
    -val_x, -val_y,
  ];

 
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // vertex colors
  const colors = [
    1.0,  1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,  1.0,
  ];

  const color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return {
    position: position_buffer,
    color: color_buffer,
  };
}

/// @brief clear the screen, then display
function drawScene(gl, programInfo, buffers, deltaTime)
{
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  const fieldOfView = 45 * Math.PI / 180;
  const aspect = 1; //gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0;
  const zFar = 1.0;
  const projectionMatrix = mat4.create();
  
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);
  
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix,
                 modelViewMatrix,
                 [-0.0, 0.0, -5]);
  
  // bind vertex pos
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // bind vertex color
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }


  gl.useProgram(programInfo.program);

  // set uniforms
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  gl.uniform1f(gl.getUniformLocation(programInfo.program, '_time'), time);
  gl.uniform2f(gl.getUniformLocation(programInfo.program, "_screen_resolution"), window.innerWidth, window.innerHeight);
  
  {
    const offset = 0;
    const vertex_count = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertex_count);
  }

  time += deltaTime;
}

function initShaderProgram(gl, vertex_source, fragment_source) 
{
  const vertex_shader = loadShader(gl, gl.VERTEX_SHADER, vertex_source);
  const fragment_shader = loadShader(gl, gl.FRAGMENT_SHADER, fragment_source);

  const program = gl.createProgram();
  gl.attachShader(program, vertex_shader);
  gl.attachShader(program, fragment_shader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

function loadShader(gl, type, source)
{
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
