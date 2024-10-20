export async function load_image(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(new Error(`Failed to load image from url: ${url}`));
        img.src = url;
    });
}

export class Texture2D {
    private _gl: WebGL2RenderingContext;
    private _texture: WebGLTexture | null;
    private _width: number = 0;
    private _height: number = 0;
    private _format: number = 0;
    private _internal_format: number = 0;
    private _type: number = 0;

    constructor(gl: WebGL2RenderingContext, width: number, height: number, format?: number, type?: number) {
        this._gl = gl;
        this._texture = this._create_empty(width, height, format, type);
        this._width = width;
        this._height = height;
    }

    public get_handle(): WebGLTexture | null {
        return this._texture;
    }
    public get_width(): number {
        return this._width;
    }
    public get_height(): number {
        return this._height;
    }

    public bind(unit: number, location?: WebGLUniformLocation): void {
        const gl = this._gl;
        
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);

        if (location !== undefined) {
            gl.uniform1i(location, unit);
        }
    }
    public unbind(): void {
        this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    }

    public set_wrap(wrap_s: number, wrap_t: number): void {
        const gl = this._gl;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap_s);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap_t);
    }
    public set_filter(min_filter: number, mag_filter: number): void {
        const gl = this._gl;
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min_filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mag_filter);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    public create_mipmap(): void {
        this._gl.generateMipmap(this._gl.TEXTURE_2D);
    }

    public upload_data(data: HTMLImageElement): void {
        const gl = this._gl;

        gl.texImage2D(
            gl.TEXTURE_2D,         // target
            0,                     // level
            this._internal_format, // internalformat
            this._format,          // format
            this._type,            // type
            data                   // source
        );
    }

    private _create_empty(width: number, height: number, image_format?: number, data_type?: number): WebGLTexture | null {
        const gl = this._gl;
        this._format = image_format || gl.RGBA;
        this._type = data_type || gl.UNSIGNED_BYTE;
        this._internal_format = (this._format === gl.DEPTH_COMPONENT) ? gl.DEPTH_COMPONENT24 : this._format;
        
        // Create a texture object
        const texture = gl.createTexture();
        if (!texture) {
            console.error('Failed to create WebGL texture');
            return null;
        }

        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Upload the image into the texture
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            this._internal_format,
            width,
            height,
            0,
            this._format,
            this._type,
            null
        );

        // Unbind the texture
        gl.bindTexture(gl.TEXTURE_2D, null);

        return texture;
    }

    static async create_from_url(gl: WebGL2RenderingContext, url: string, image_format?:number): Promise<Texture2D> {
        const image = await load_image(url);
        let texture = new Texture2D(gl, image.width, image.height, image_format);
        texture.bind(0);
        texture.upload_data(image);
        texture.unbind();
        return texture;
    }

    static create_empty_color(gl: WebGL2RenderingContext, width: number, height: number): Texture2D {
        return new Texture2D(gl, width, height);
    }

    static create_empty_depth(gl: WebGL2RenderingContext, width: number, height: number): Texture2D {
        return new Texture2D(gl, width, height, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT);
    }
}