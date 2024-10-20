import { Texture2D } from "./texture";

export class Framebuffer {
    private _gl: WebGL2RenderingContext;
    private _framebuffer: WebGLFramebuffer
    private _color_attachments: Texture2D[] = [];
    private _depth_attachment: Texture2D | null = null;
    private _stencil_attachment: Texture2D | null = null;
    private _width: number;
    private _height: number;

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;
        this._framebuffer = this._gl.createFramebuffer();
        this._width = 0;
        this._height = 0;
        this.unbind();
    }

    bind() {
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._framebuffer);
    }
    unbind() {
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
    }

    clear() {
        this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    }

    is_complete(): boolean {
        return this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER) === this._gl.FRAMEBUFFER_COMPLETE;
    }

    get_color_texture(index: number): Texture2D {
        return this._color_attachments[index];
    }
    get_depth_texture(): Texture2D {
        return this._depth_attachment;
    }
    get_stencil_texture(): Texture2D {
        return this._stencil_attachment;
    }

    add_color_texture(texture: Texture2D, attachment: number) {
        this._width = texture.get_width();
        this._height = texture.get_height();
        
        this.bind();
        texture.bind(0);
        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, attachment, this._gl.TEXTURE_2D, texture.get_handle(), 0);
        this._color_attachments.push(texture);
        texture.unbind();
        this.unbind();
    }
    set_depth_texture(texture: Texture2D) {
        this._width = texture.get_width();
        this._height = texture.get_height();
        
        this.bind();
        texture.bind(0);
        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.TEXTURE_2D, texture.get_handle(), 0);
        this._depth_attachment = texture;
        texture.unbind();
        this.unbind();
    }
    set_stencil_texture(texture: Texture2D) {
        this._width = texture.get_width();
        this._height = texture.get_height();
        
        this.bind();
        texture.bind(0);
        this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.STENCIL_ATTACHMENT, this._gl.TEXTURE_2D, texture.get_handle(), 0);
        this._stencil_attachment = texture;
        texture.unbind();
        this.unbind();
    }

    blit_to_screen() {
        this._gl.viewport(0, 0, this._width, this._height);
        this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
        this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER, this._framebuffer);
        this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER, null);
        this._gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, this._gl.COLOR_BUFFER_BIT, this._gl.NEAREST);
    }

    public static create_simple(gl: WebGL2RenderingContext, width: number, height: number): Framebuffer {
        const framebuffer = new Framebuffer(gl);

        framebuffer.bind();

        const color_texture = Texture2D.create_empty_color(gl, width, height);
        color_texture.bind(0);
        color_texture.set_filter(gl.NEAREST, gl.NEAREST);
        color_texture.unbind();

        const depth_texture = Texture2D.create_empty_depth(gl, width, height);
        depth_texture.bind(0);
        depth_texture.set_filter(gl.NEAREST, gl.NEAREST);
        depth_texture.unbind();

        framebuffer.add_color_texture(color_texture, gl.COLOR_ATTACHMENT0);
        framebuffer.set_depth_texture(depth_texture);

        framebuffer._width = width;
        framebuffer._height = height;

        framebuffer.unbind();
        
        return framebuffer;
    }
}