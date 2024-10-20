import { DataType, GenericBuffer } from "./genericbuffer";

export type VertexLayout = {[key: number]: {offset: number, size: number}};

export class VertexBuffer {
    private _gl: WebGLRenderingContext;
    private _buffer: WebGLBuffer;
    private _type: number;
    private _count: number;
    private _vertex_size: number;

    constructor(gl: WebGLRenderingContext, vertex_layout: VertexLayout, data?: number[]) {
        this._gl = gl;

        const buffer = gl.createBuffer();
        if (buffer !== null) { this._buffer = buffer; }
        else { console.warn("Couldn't create buffer."); }

        this._type = gl.TRIANGLES;
        this._count = 0;
        this._vertex_size = 0;

        this._create_layout(vertex_layout);

        if (typeof data !== 'undefined') {
            this.upload_data(data);
        }
    }

    set_primitive_type(type: number) {
        this._type = type;
    }
    get_primitive_type() {
        return this._type;
    }

    upload_data(data: number[]) {
        this.bind();
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(data), this._gl.STATIC_DRAW);
        this.unbind();

        this._count = data.length / this._vertex_size;
    }

    bind() {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
    }

    unbind() {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
    }

    draw() {
        this._gl.drawArrays(this._type, 0, this._count);
    }

    private _create_layout(vertex_layout: VertexLayout) {
        const gl = this._gl;

        this.bind();

        let stride = Object.values(vertex_layout).reduce((acc, layout) => acc + layout.size, 0);
        this._vertex_size = stride;

        const vertex_layout_entries = Object.entries(vertex_layout);
        for (let [attrib_id, layout] of vertex_layout_entries) {
            const type = gl.FLOAT;
            const type_bytes = 4;
            const normalize = false;

            const location = parseInt(attrib_id);
            const num_components = layout.size;
            const offset = layout.offset;

            gl.vertexAttribPointer(
                location, num_components, type, normalize, stride * type_bytes,
                offset * type_bytes);
            gl.enableVertexAttribArray(location);
        }

        this.unbind();
    }
}

export type TransformFeedbackLayout = {[key: number]: {type: DataType, name: string}};

export class TransformFeedbackBuffer {
    private _gl: WebGL2RenderingContext;
    private _layout: TransformFeedbackLayout;
    private _buffer: WebGLTransformFeedback;
    private _names: string[];

    constructor(gl: WebGL2RenderingContext, layout: TransformFeedbackLayout) {
        this._gl = gl;

        const buffer = gl.createTransformFeedback();
        if (buffer !== null) { this._buffer = buffer; }
        else { console.warn("Couldn't create transform feedback buffer."); }
    
        this._layout = layout;
        this._names = Object.values(layout).map((entry) => entry.name);
    }

    bind(primitive_type: number) {
        this._gl.bindTransformFeedback(this._gl.TRANSFORM_FEEDBACK, this._buffer);
        this._gl.beginTransformFeedback(primitive_type);
    }
    unbind() {
        this._gl.endTransformFeedback();
        this._gl.bindTransformFeedback(this._gl.TRANSFORM_FEEDBACK, null);
    }

    get_names() {
        return this._names;
    }

    upload_data(data_sets: number[][]) {
        this._gl.bindTransformFeedback(this._gl.TRANSFORM_FEEDBACK, this._buffer);
        const layout_entries = Object.entries(this._layout);
        for (let i = 0; i < layout_entries.length; i++) {
            const entry_idx = parseInt(layout_entries[i][0]);
            const entry_type = layout_entries[i][1].type;
            const array_type = (entry_type === 'float') ? Float32Array : Int32Array;
            const buffer = this._create_buffer(new array_type(data_sets[i]));
            this._gl.bindBufferBase(this._gl.TRANSFORM_FEEDBACK_BUFFER, entry_idx, buffer);
        }
        this._gl.bindTransformFeedback(this._gl.TRANSFORM_FEEDBACK, null);
    }

    private _create_buffer(data: ArrayBuffer) {
        const buffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, data, this._gl.STATIC_DRAW);
        return buffer;
    }
}

export class VertexArray {
    private _gl: WebGL2RenderingContext;
    private _vertex_array: WebGLVertexArrayObject;

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;

        const vertex_array = gl.createVertexArray();
        if (vertex_array !== null) { this._vertex_array = vertex_array; }
        else { console.warn("Couldn't create vertex array."); }
    }

    bind() {
        this._gl.bindVertexArray(this._vertex_array);
    }

    unbind() {
        this._gl.bindVertexArray(null);
    }

    add_buffer(buffer: GenericBuffer, layout: VertexLayout) {
        this.bind();
        buffer.bind();

        const attrib_id = Object.keys(layout)[0];
        const location = parseInt(attrib_id);
        this._gl.enableVertexAttribArray(location);
        this._gl.vertexAttribPointer(
            location,       // attribute location
            2,              // number of elements
            this._gl.FLOAT, // type of data
            false,          // normalize
            0,              // stride (0 = auto)
            0,              // offset
        );

        this.unbind();
        buffer.unbind();
    }

    static create(gl: WebGL2RenderingContext, buffers: GenericBuffer[], data_type: DataType[]) {
        const vertex_array = new VertexArray(gl);
        let offset = 0;
        for (let i = 0; i < buffers.length; i++) {
            const layout = this._create_layout(data_type[i], i, offset);
            offset += layout[i].size;
            vertex_array.add_buffer(buffers[i], layout);
        }
        return vertex_array;
    }

    private static _create_layout(data_type: DataType, index: number, offset: number): VertexLayout {
        let layout = {};
        let entry = {offset: offset, size: 0};
        layout[index] = entry;

        switch (data_type) {
            case 'float':
                entry.size = 1;
                break;
            case 'int':
                entry.size = 1;
                break;
            case 'vec2':
                entry.size = 2;
                break;
            case 'vec3':
                entry.size = 3;
                break;
            case 'vec4':
                entry.size = 4;
                break;
            case 'ivec2':
                entry.size = 2;
                break;
            case 'ivec3':
                entry.size = 3;
                break;
            case 'ivec4':
                entry.size = 4;
                break;
        }

        return layout;
    }
}