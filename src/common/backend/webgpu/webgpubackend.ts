import "@webgpu/types";
import { IBackend } from "../interface";


export class WebGPUBackend implements IBackend {
    private _adapter: GPUAdapter | null;
    private _device: GPUDevice | undefined;

    isSupportedByBrowser(): boolean {
        throw new Error("Method not implemented.");
    }
    async initialize(canvas: HTMLCanvasElement): Promise<void> {
        this._adapter = await navigator.gpu?.requestAdapter();
        this._device = await this._adapter?.requestDevice();
    }
}
