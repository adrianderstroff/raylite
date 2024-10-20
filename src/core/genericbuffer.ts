export type DataType = 'float' | 'int' | 'vec2' | 'vec3' | 'vec4' | 'ivec2' | 'ivec3' | 'ivec4';

export const get_number_of_components = (type: DataType): number => {
    switch (type) {
        case 'float': case 'int': return 1;
        case 'vec2': case 'ivec2': return 2;
        case 'vec3': case 'ivec3': return 3;
        case 'vec4': case 'ivec4': return 4;
    }
}

export const get_base_type = (type: DataType): DataType => {
    if (type.startsWith('i')) { return 'int'; }
    else { return 'float'; }
}

export class GenericBuffer {
    private _gl: WebGLRenderingContext;
    private _buffer: WebGLBuffer;
    private _size: number;
    private _type: DataType;

    constructor(gl: WebGLRenderingContext, type: DataType = 'float') {
        const buffer = gl.createBuffer();
        if (buffer !== null) { this._buffer = buffer; }
        else { console.warn("Couldn't create buffer."); }

        this._gl = gl;
        this._size = 0;
        this._type = type;
    }

    get_size(): number { return this._size; }
    get_type(): DataType { return this._type; }
    get_base_type(): DataType { return get_base_type(this._type); }
    get_num_components(): number { return get_number_of_components(this._type); }

    upload_data(data: number[], usage: number = this._gl.STATIC_DRAW) {
        const array_type = get_base_type(this._type) === 'float' ? Float32Array : Int32Array;
        this._size = data.length / get_number_of_components(this._type);

        this.bind();
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new array_type(data), usage);
        this.unbind();
    }

    bind() { this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer); }
    unbind() { this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null); }

    static create(gl: WebGLRenderingContext, data: number[], type: DataType, usage: number = gl.STATIC_DRAW) {
        const buffer = new GenericBuffer(gl, type);
        buffer.upload_data(data, usage);
        return buffer;
    }
}