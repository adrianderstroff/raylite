import { GenericBuffer } from "./genericbuffer";

export class VertexArrayObject {
    private _gl: WebGL2RenderingContext;
    private _vertex_array: WebGLVertexArrayObject;
    private _cur_location: number;
    private _size: number;
    private _type: number;
    private _num_instances: number;

    constructor(gl: WebGL2RenderingContext) {
        const vertex_array = gl.createVertexArray();
        if (vertex_array !== null) { this._vertex_array = vertex_array; }
        else { console.warn("Couldn't create vertex array."); }

        this._gl = gl;
        this._cur_location = 0;
        this._size = 0;
        this._type = gl.TRIANGLES;
        this._num_instances = 0;
    }

    set_num_instances(num_instances: number) {
        this._num_instances = num_instances;
    }
    set_primitive_type(type: number) {
        this._type = type;
    }

    bind() { this._gl.bindVertexArray(this._vertex_array); }
    unbind() { this._gl.bindVertexArray(null); }

    draw() {
        this.bind();
        this._gl.drawArrays(this._type, 0, this._size);
        this.unbind();
    }
    draw_arrays_instanced(num_instances?: number) {
        num_instances = num_instances || this._num_instances;

        this.bind();
        this._gl.drawArraysInstanced(this._type, 0, this._size, num_instances);
        this.unbind
    }
    draw_elements_instanced(num_instances?: number) {
        num_instances = num_instances || this._num_instances;

        this.bind();
        this._gl.drawElementsInstanced(this._type, this._size, this._gl.UNSIGNED_INT, 0, num_instances);
        this.unbind();
    }

    add_buffer(buffer: GenericBuffer) {
        this.bind();
        buffer.bind();

        // todo: check out if there is a better way to determine the size
        if (this._cur_location === 0) {
            this._size = buffer.get_size();
        }

        const location = this._cur_location;
        const num_components = buffer.get_num_components();
        const gl_data_type = this._determine_gl_type(buffer.get_base_type());

        this._gl.enableVertexAttribArray(location);
        this._gl.vertexAttribPointer(
            location,       // attribute location
            num_components, // number of elements
            gl_data_type,   // type of data
            false,          // normalize
            0,              // stride
            0,              // offset
        );

        this.unbind();
        buffer.unbind();

        this._cur_location++;
    }
    add_instance_buffer(buffer: GenericBuffer, per_n_instances: number) {
        this.bind();
        buffer.bind();

        const location = this._cur_location;
        const num_components = buffer.get_num_components();
        const gl_data_type = this._determine_gl_type(buffer.get_base_type());

        this._gl.enableVertexAttribArray(location);
        this._gl.vertexAttribPointer(
            location,       // attribute location
            num_components, // number of elements
            gl_data_type,   // type of data
            false,          // normalize
            0,              // stride
            0,              // offset
        );
        this._gl.vertexAttribDivisor(location, per_n_instances);

        this.unbind();
        buffer.unbind();

        this._cur_location++;
    }

    static create(gl: WebGL2RenderingContext, buffers: GenericBuffer[]) {
        const vertex_array = new VertexArrayObject(gl);
        buffers.forEach(buffer => vertex_array.add_buffer(buffer));
        return vertex_array;
    }

    private _determine_gl_type(type: string): number {
        // todo: add more types
        // https://registry.khronos.org/OpenGL-Refpages/gl4/html/glVertexAttribPointer.xhtml
        switch (type) {
            case 'float': return this._gl.FLOAT;
            case 'int': return this._gl.INT;
            default: return this._gl.FLOAT;
        }
    }
}