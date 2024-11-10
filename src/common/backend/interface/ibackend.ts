export interface IBackend {
    isSupportedByBrowser(): boolean;
    initialize(canvas: HTMLCanvasElement): Promise<void>;
};