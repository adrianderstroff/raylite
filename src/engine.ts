import { WebGl } from "./common/backend/webgl2/webgl";

/**
 * Supported options for the engine:
 * 
 * - fps: number - frames per second, default is 30
 * - antialias: boolean - enable anti-aliasing, default is false
 */
export type RenderOptions = {
    fps?: number;
    antialias?: boolean;
};

export class Engine {
    private webgl: WebGl;
    private fps: number;
    private elapsed_time: number;
    private delta_time: number;
    private is_active: boolean = false;
    private animation_frame_id: number;
    private inner_draw: () => void;

    constructor(canvas: HTMLCanvasElement, options: RenderOptions = {}) {
        // extract properties that are passed to webgl
        const webgl_options = {
            antialias: ('antialias' in options) ? options.antialias : false
        };

        this.webgl = new WebGl(canvas, webgl_options);
        this.fps = ('fps' in options) ? options.fps : 30;
        this.is_active = false;
        this.animation_frame_id = -1;

        this.elapsed_time = 0;
        this.delta_time = 0;
    }

    get_width(): number { return this.webgl.canvas.width; }
    get_height(): number { return this.webgl.canvas.height; }

    set_fps(fps: number) { this.fps = fps; }
    get_fps(): number { return this.fps; }
    get_elapsed_time(): number { return this.elapsed_time; }
    get_delta_time(): number { return this.delta_time; }

    get_gl(): WebGL2RenderingContext { return this.webgl.get_gl(); }

    draw(callback: (dt: number, t: number) => void) {
        // cant start to draw calls
        if (this.is_active) return;

        const start: number = Date.now();
        let prev_time: number = Date.now();
        this.is_active = true;
        const self = this;

        function wrap() {
            const interval = 1000 / self.fps;
            const now = Date.now();
            const elapsed_time = now - prev_time;

            if (elapsed_time > interval) {
                const dt = now - prev_time;
                prev_time = now;

                // clear screen for next render
                self.webgl.clear();

                let overall_elapsed = now - start;

                self.elapsed_time = overall_elapsed;
                self.delta_time = dt;

                callback(dt, overall_elapsed);
            }

            if (self.is_active) {
                self.animation_frame_id = requestAnimationFrame(wrap);
            }
        }

        this.inner_draw = wrap;
        this.animation_frame_id = requestAnimationFrame(wrap);
    }

    issue_draw() {
        this.animation_frame_id = requestAnimationFrame(this.inner_draw);
    }

    stop() {
        this.is_active = false;
        cancelAnimationFrame(this.animation_frame_id);
    }
}