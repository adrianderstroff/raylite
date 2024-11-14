import "@webgpu/types";
import { IBackend } from "../interface";


export class WebGPUBackend implements IBackend {
    private _canvas: HTMLCanvasElement;
    private _adapter: GPUAdapter | null;
    private _device: GPUDevice | undefined;
    private _webgpu: GPUCanvasContext | undefined;

    isSupportedByBrowser(): boolean {
        if (navigator.gpu === undefined) return false;
        return true;
    }
    async initialize(canvas: HTMLCanvasElement): Promise<boolean> {
        this._canvas = canvas;
        this._adapter = await navigator.gpu?.requestAdapter();
        this._device = await this._adapter?.requestDevice();
        
        // something went wrong, abort
        if (this._device === undefined) {
            this._canvas = undefined;
            this._adapter = undefined;
            return false;
        }

        this._webgpu = this._canvas.getContext("webgpu");
        this._webgpu.configure({
            device: this._device,
            format: navigator.gpu.getPreferredCanvasFormat(),
        });

        return true;
    }

    render() {
        const encoder = this._device.createCommandEncoder();

        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: this._webgpu.getCurrentTexture().createView(),
                loadOp: "clear",
                storeOp: "store",
            }]
        });

        pass.end();

        this._device.queue.submit([encoder.finish()]);
    }
}
