// Copyright 2021 Clemens Cords (mail@clemens-cords.com)
precision highp float;

float project(float lower, float upper, float value)
{
    return value * abs(upper - lower) + min(lower, upper);
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

varying vec4 _vertex_color;
varying vec2 _vertex_pos;

uniform float _time;
uniform vec2 _screen_resolution;

void main()
{
    float time = _time / 10.0;
    vec2 pos = _vertex_pos;
    pos.x *= _screen_resolution.x / _screen_resolution.y;
    pos.x /= 5.0;
    pos.x -= time;

    float rng = random(pos.xy) * dot(pos.xy, pos.xy + time);

    const float thickness = 0.4;
    float cycle = (sin(time) + 1.0) / 2.0;

    vec4 inside;
    inside.x = project(0.7, 0.85, rng);
    inside.y = 0.0;
    inside.z = 0.0; //clamp(rng, 0.0, 0.001);
    inside.w = float(abs(rng) < thickness) * (1.0 - abs(rng) + 0.3);

    inside = mix(inside, vec4(time / 3.0, 1.0, clamp(1.0 - cycle, 0.5, 1.0), 1.0), float(abs(rng) < 0.01));
    inside.xyz = hsv_to_rgb(inside.xyz);

    float out_rng = project(0.775, 1.05, abs(random(0.3 * _vertex_pos.xy + vec2(0.9, 2) * (time / 25.0))));
    vec3 outside = vec3(out_rng, 0.8, clamp(cycle, 0.3, 0.8));
    vec4 color = mix(vec4(hsv_to_rgb(outside), 1), inside, inside.w);
    gl_FragColor = vec4(color);
}