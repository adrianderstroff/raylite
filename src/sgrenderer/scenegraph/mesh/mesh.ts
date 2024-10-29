import { VertexBuffer, VertexLayout } from 'common/backend/webgl2';


// TODO: implement geometry class
export abstract class Mesh {
    private gl: WebGL2RenderingContext;
    private vertex_array: WebGLVertexArrayObject;
    private vertex_buffer: VertexBuffer;

    constructor(gl: WebGL2RenderingContext, layout: VertexLayout) {
        this.gl = gl;
        this.vertex_array = gl.createVertexArray();
        this.bind();
        this.vertex_buffer = new VertexBuffer(gl, layout);
        this.unbind();
    }

    upload_data(data: number[]) {
        this.bind();
        this.vertex_buffer.upload_data(data);
        this.unbind();
    }

    bind() { this.gl.bindVertexArray(this.vertex_array); }
    unbind() { this.gl.bindVertexArray(null); }

    draw() { this.vertex_buffer.draw(); }
}

export const merge_vertex_data = (vertex_data_arrays: any[][], sizes: number[]): any[] => {
    const num_arrays = vertex_data_arrays.length;
    let num_elements = vertex_data_arrays[0].length / sizes[0];

    let merged_vertex_data: any[] = [];
    for (let i = 0; i < num_elements; i++) {
        for (let j = 0; j < num_arrays; j++) {
            const size = sizes[j];
            for (let k = 0; k < size; k++) {
                merged_vertex_data.push(vertex_data_arrays[j][i * size + k]);
            }
        }
    }

    return merged_vertex_data;
}
