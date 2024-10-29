import { is_array, is_matrix, MatData } from './type';
import { Vec, zero_array } from './vec';

class Mat {
    protected _data: number[];
    protected readonly _rows: number;
    protected readonly _cols: number;

    constructor(rows: number, cols: number, data: MatData = 0.0) {
        this._rows = rows;
        this._cols = cols;

        const temp = (is_matrix(data))
            ? data.flat()
            : (is_array(data))
                ? data
                : zero_array(rows*cols);
        this._data = temp;

        // create identity matrix if data === 1.0
        if (typeof data === 'number' && data === 1.0) {
            for (let i = 0; i < this._rows; i++) {
                this.set(i, i, 1.0);
            }
        }
    }

    get rows() { return this._rows; }
    get cols() { return this._cols; }
    get data() { return this._data; }

    get(row: number, col: number): number { return this._data[row*this._cols + col]; }
    set(row: number, col: number, value: number) { this._data[row*this._cols + col] = value; }

    ////////////////////////////////////////////////////////////////////////////
    // methods that work on a copy
    ////////////////////////////////////////////////////////////////////////////
    copy(): this { 
        if (this.constructor.name === 'Mat') {
          return new (this.constructor as new (a: number, b: number, d: number[]) 
            => this)(this._rows, this._cols, [...this._data]);
        }
        return new (this.constructor as new (d: number[]) 
            => this)([...this._data]);  
    }
    add(other: Mat): Mat { return this.copy().add_inp(other); }
    sub(other: Mat): Mat { return this.copy().sub_inp(other); }
    mul(other: Vec): Vec;
    mul(other: number|Mat): Mat;
    mul(other: number|Vec|Mat): Vec|Mat {
        if (other instanceof Mat) {
            // for simplicity we assume that matrices are square
            const out = other.copy();
            for (let r = 0; r < this._rows; r++) {
                for (let c = 0; c < other._cols; c++) {
                    let sum: number = 0;
                    for (let i = 0; i < this._cols; i++) {
                        sum += this.get(r, i) * other.data[i*other.cols + c];
                    }
                    out.set(r, c, sum);
                }
            }
            return out;
        } else if (other instanceof Vec) {
            // for simplicity we assume the shape of the vec won't change
            const out = other.copy();
            for (let r = 0; r < this._rows; r++) {
                let sum: number = 0;
                for (let c = 0; c < this._cols; c++) {
                    sum += this.get(r, c) * other.get(c);
                }
                out.set(r, sum);
            }
            return out;
        } else if (typeof other === 'number') {
            const out = this.copy();
            for (let r = 0; r < this._rows; r++) {
                for (let c = 0; c < this._cols; c++) {
                    out.set(r, c, this.get(r, c) * other);
                }
            }
            return out;
        } else {
            throw new Error('Invalid type');
        }
    }
    div(other: number): Mat { return this.copy().div_inp(other); }
    transpose(): Mat { return this.copy().transpose_inp(); }
    
    ////////////////////////////////////////////////////////////////////////////
    // in-place methods
    ////////////////////////////////////////////////////////////////////////////
    add_inp(other: Mat): this {
        this._elementwise_inp_op(other.data, (a, b) => a+b);
        return this;
    }
    sub_inp(other: Mat): this {
        this._elementwise_inp_op(other.data, (a, b) => a-b);
        return this;
    }
    div_inp(other: number): this {
        const other_data = Array(this.data.length).fill(other);
        this._elementwise_inp_op(other_data, (a, b) => a/b);
        return this;
    }
    transpose_inp(): this {
        let data = zero_array(this._rows*this._cols);
        for (let r = 0; r < this._rows; r++) {
            for (let c = 0; c < this._cols; c++) {
                data[c*this._rows + r] = this.get(r, c);
            }
        }
        this._data = data;

        return this;
    }

    ////////////////////////////////////////////////////////////////////////////
    // methods that have to be implemented by derived classes
    ////////////////////////////////////////////////////////////////////////////
    static zeros(rows: number, cols: number): Mat { return new Mat(rows, cols, 0.0); }
    static identity(rows: number, cols: number): Mat { return new Mat(rows, cols, 1.0); }

    ////////////////////////////////////////////////////////////////////////////
    // private methods
    ////////////////////////////////////////////////////////////////////////////
    private _elementwise_inp_op(other: number[], op: (a:number, b:number) => number) {
        this.data.forEach((value, i) => { this.data[i] = op(value, other[i]); });
    }
}

export class Mat2 extends Mat {
    constructor(data?: MatData) { super(2, 2, data); }
    static zeros(): Mat2 { return new Mat2(0.0); }
    static identity(): Mat2 { return new Mat2(1.0); }
}
export class Mat3 extends Mat {
    constructor(data?: MatData) { super(3, 3, data); }
    static zeros(): Mat3 { return new Mat3(0.0); }
    static identity(): Mat3 { return new Mat3(1.0); }
}
export class Mat4 extends Mat {
    constructor(data?: MatData) { super(4, 4, data); }

    static zeros(): Mat4 { return new Mat4(0.0); }
    static identity(): Mat4 { return new Mat4(1.0); }
    static from_mat3(other: Mat3): Mat4 {
        const out = this.identity();
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                out.set(r, c, other.get(r, c));
            }
        }
        return out;
    }
}