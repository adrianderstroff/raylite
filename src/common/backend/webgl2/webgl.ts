export class WebGl {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;

    constructor(canvas: HTMLCanvasElement, options: WebGLContextAttributes = {}) {
        // grab canvas element
        this.canvas = canvas;

        // create webgl context
        const gl = this._init_gl(canvas, options);
        if (gl === null) { return; }
        this.gl = gl;
    }

    get_gl(): WebGL2RenderingContext {
        return this.gl;
    }

    initialized(): boolean {
        return typeof this.gl !== 'undefined';
    }

    background(r: number, g: number, b: number, a: number = 1) {
        this.gl.clearColor(r, g, b, a);
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
    }
    clear_color() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    clear_depth() {
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }
    clear_stencil() {
        this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
    }
    clear_color_depth() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    
    private _init_gl(canvas: HTMLCanvasElement, options: WebGLContextAttributes): WebGL2RenderingContext | null {
        // initialize the GL context
        const gl: WebGL2RenderingContext | null = canvas.getContext("webgl2", options);
        if (gl === null) {
            console.error("Unable to initialize WebGL.");
            return null;
        }

        // set reasonable initial gl state
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.disable(gl.CULL_FACE);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        return gl;
    }
}