///////////////////////////////////////////////////////////////////////////////
// vertex shader recipes
///////////////////////////////////////////////////////////////////////////////

export const PASS_THROUGH_VERTEX_SOURCE = `
    #version 300 es

    layout(location = 0) in vec3 vertex_position;
    layout(location = 2) in vec2 vertex_uv;

    out vec3 fragment_position;
    out vec2 fragment_uv;

    void main() {
        fragment_position = vertex_position;
        fragment_uv = vertex_uv;

        gl_Position = vec4(vertex_position, 1);
    }
`.trim();

export const SIMPLE_VERTEX_SOURCE = `
    #version 300 es

    layout(location = 0) in vec3 vertex_position;
    layout(location = 1) in vec3 vertex_normal;
    layout(location = 2) in vec2 vertex_uv;

    uniform mat4 u_MVP;

    out vec3 fragment_position;
    out vec3 fragment_normal;
    out vec2 fragment_uv;

    void main() {
        fragment_position = vertex_position;
        fragment_normal = vertex_normal;
        fragment_uv = vertex_uv;

        gl_Position = u_MVP * vec4(vertex_position, 1);
    }
`.trim();

///////////////////////////////////////////////////////////////////////////////
// fragment shader recipes
///////////////////////////////////////////////////////////////////////////////

export const UV_COLOR_FRAGMENT_SOURCE = `
    #version 300 es
    
    precision mediump float;

    in vec3 fragment_position;
    in vec2 fragment_uv;

    out vec4 fragment_color;

    void main() {
        fragment_color = vec4(fragment_uv, 0, 1);
    }
`.trim();

export const FLAT_FRAGMENT_SOURCE = `
    #version 300 es
    
    precision mediump float;

    uniform vec4 u_color;

    out vec4 fragment_color;

    void main() {
        fragment_color = u_color;
    }
`.trim();