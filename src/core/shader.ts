import { Mat2, Mat3, Mat4, Vec2, Vec3, Vec4 } from 'math';

export class Shader {
    private _gl: WebGL2RenderingContext;
    private _program: any;
    private _sources: WebGLShader[];
    private _no_fragment_shader: boolean;

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;
        this._program = gl.createProgram();
        this._sources = [];
        this._no_fragment_shader = false;
    }

    attach(source: string, type: number) {
        const gl: WebGLRenderingContext = this._gl;

        const shader: WebGLShader | null = gl.createShader(type);
        if (shader === null) {
            return;
        }

        this._sources.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const shader_type = type === gl.VERTEX_SHADER ? 'vertex' : 'fragment';
            console.error(`An error occurred compiling the ${shader_type} shader:\n ${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return;
        }

        gl.attachShader(this._program, shader);
    }
    link() {
        const gl: WebGLRenderingContext = this._gl;

        gl.linkProgram(this._program);

        // If creating the shader program failed, alert
        if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
            console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(this._program)}`);
            return null;
        }
    }

    bind() {
        this._gl.useProgram(this._program);
        if (this._no_fragment_shader) {
            this._gl.enable(this._gl.RASTERIZER_DISCARD);
        }
    }
    unbind() {
        if (this._no_fragment_shader) {
            this._gl.disable(this._gl.RASTERIZER_DISCARD);
        }
        this._gl.useProgram(null);
    }

    set_uniform(name: string, value: any) {
        // grab location
        const location = this.get_uniform_location(name);

        if (typeof value === 'number') {
            this._gl.uniform1f(location, value);
        }
        else if (value instanceof Vec2) {
            this._gl.uniform2f(location, value.x, value.y);
        }
        else if (value instanceof Vec3) {
            this._gl.uniform3f(location, value.x, value.y, value.z);
        }
        else if (value instanceof Vec4) {
            this._gl.uniform4f(location, value.x, value.y, value.z, value.w);
        }
        else if (value instanceof Mat2) {
            const data = value.data;
            this._gl.uniformMatrix2fv(location, true, data);
        }
        else if (value instanceof Mat3) {
            const data = value.data;
            this._gl.uniformMatrix3fv(location, true, data);
        }
        else if (value instanceof Mat4) {
            const data = value.data;
            this._gl.uniformMatrix4fv(location, true, data);
        }
        else {
            console.warn(`Value ${value} doesn't match any uniform type.`);
        }
    }

    get_attrib_location(name: string): number {
        return this._gl.getAttribLocation(this._program, name);
    }
    get_uniform_location(name: string): WebGLUniformLocation | null {
        return this._gl.getUniformLocation(this._program, name);
    }

    disable_fragment_shader(state: boolean) {
        this._no_fragment_shader = state;
    }

    static create_simple(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
        const shader = new Shader(gl);
        shader.attach(vertexSource, gl.VERTEX_SHADER);
        shader.attach(fragmentSource, gl.FRAGMENT_SHADER);
        shader.link();
        return shader;
    }
    static create_transformfeedback(gl: WebGL2RenderingContext, vertexSource: string, varyings: string[]) {
        const shader = new Shader(gl);
        shader.attach(vertexSource, gl.VERTEX_SHADER);
        shader.attach(DUMMY_FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
        gl.transformFeedbackVaryings(shader._program, varyings, gl.SEPARATE_ATTRIBS);
        shader.link();
        return shader;
    }
}

const DUMMY_FRAGMENT_SHADER = `
#version 300 es
precision highp float;

out vec4 fragment_color;

void main() {
    fragment_color = vec4(1.0, 0.0, 0.0, 1.0);
}
`.trim();