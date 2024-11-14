import "@webgpu/types";

export type DataType = 'float' | 'int' | 'vec2' | 'vec3' | 'vec4' | 'ivec2' | 'ivec3' | 'ivec4';
type RawData = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array 
    | Int32Array | Float32Array | Float64Array;

type VertexLayout = {offset: number, size: number}[];


export class VertexDescriptor {
    private _device: GPUDevice;
    private _buffer: GPUBuffer;

    constructor(device: GPUDevice, byteSize: number) {
        this._device = device;
    }
    
    setBuffer(data: RawData) {
        this._buffer = this._device.createBuffer({
            label: "Cell vertices",
            size: data.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });
    }

    addLayout() {

    }

    create() {

    }
}