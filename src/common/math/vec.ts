export const zero_array = (length: number) => Array(length).fill(0);
export const ones_array = (length: number) => Array(length).fill(1);

export class Vec {
    protected _data: number[];
    protected readonly _length: number;

    constructor(length: number, data: number|number[]) {
        const temp = (typeof data === 'number')
            ? Array(length).fill(data)
            : data;
        this._data = temp;
        this._length = length;
    }

    get length() { return this._length; }
    get data() { return this._data; }

    get(index: number) { return this._data[index]; }
    set(index: number, value: number) { this._data[index] = value; }
    
    ////////////////////////////////////////////////////////////////////////////
    // methods that work on a copy
    ////////////////////////////////////////////////////////////////////////////
    copy(): this {
        if (this.constructor.name === 'Vec') {
            console.log('is vec');
            return new (this.constructor as new (l: number, d: number[]) 
                => this)(this._length, [...this._data]);
        }
        return new (this.constructor as new (...args: number[]) 
            => this)(...this._data);
    }
    add(other: Vec): this { return this.copy().add_inp(other); }
    sub(other: Vec): this { return this.copy().sub_inp(other); }
    mul(other: number|Vec): this { return this.copy().mul_inp(other); }
    div(other: number|Vec): this { return this.copy().div_inp(other); }
    negate(): this { return this.copy().negate_inp(); }
    normalize(): this { return this.copy().normalize_inp(); }
    dot(other: Vec): number {
        const other_data = other._data;
        const sum = this._data
            .map((value, index) => value*other_data[index])
            .reduce((acc: number, cur: number) => acc+cur, 0.0);
        return sum;
    }
    norm(): number {
        return Math.sqrt(this.dot(this));
    }

    ////////////////////////////////////////////////////////////////////////////
    // in-place methods
    ////////////////////////////////////////////////////////////////////////////
    add_inp(other: Vec): this {
        const other_data = other.data;
        this._elementwise_inp_op(other_data, (a, b) => a+b);
        return this;
    }
    sub_inp(other: Vec): this {
        const other_data = other.data;
        this._elementwise_inp_op(other_data, (a, b) => a-b);
        return this;
    }
    mul_inp(other: number|Vec): this {
        if (typeof other === 'number') {
            const other_data = Array(this._length).fill(other);
            this._elementwise_inp_op(other_data, (a, b) => a*b);
            return this;
        }
        else if (other instanceof Vec) {
            const other_data = other._data;
            this._elementwise_inp_op(other_data, (a, b) => a*b);
            return this;
        }
        else throw new Error(`mul doesn't support type of ${other}`);
    }
    div_inp(other: number|Vec): this {
        if (typeof other === 'number') {
            const other_data = Array(this._length).fill(other);
            this._elementwise_inp_op(other_data, (a, b) => a/b);
            return this;
        }
        else if (other instanceof Vec) {
            const other_data = other._data;
            this._elementwise_inp_op(other_data, (a, b) => a/b);
            return this;
        }
        else throw new Error(`mul doesn't support type of ${other}`);
    }
    negate_inp(): this {
        const other_data = Array(this._length).fill(-1.0);
        this._elementwise_inp_op(other_data, (a, b) => a*b);
        return this;
    }
    normalize_inp(): this {
        const len: number = this.norm();
        this.div_inp(len);
        return this;
    }

    ////////////////////////////////////////////////////////////////////////////
    // special methods
    ////////////////////////////////////////////////////////////////////////////
    toString(): string {
        return `Vec${this._length}(${this._data.join(', ')})`;
    }

    ////////////////////////////////////////////////////////////////////////////
    // private methods
    ////////////////////////////////////////////////////////////////////////////
    private _elementwise_inp_op(other: number[], op: (a:number, b:number) => number) {
        this.data.forEach((value, i) => { this._data[i] = op(value, other[i]); });
    }
}

export class Vec2 extends Vec {
    constructor(x?: number, y?: number) {
        if (typeof x === 'undefined') x = 0;
        if (typeof y === 'undefined') y = x;
        super(2, [x, y]);
    }

    get x(): number { return this.data[0]; }
    get y(): number { return this.data[1]; }

    get xx(): Vec2 { return new Vec2(this.x, this.x); }
    get xy(): Vec2 { return new Vec2(this.x, this.y); }
    get yx(): Vec2 { return new Vec2(this.y, this.x); }
    get yy(): Vec2 { return new Vec2(this.y, this.y); }
}

export class Vec3 extends Vec {
    constructor(x?: number, y?: number, z?: number) {
        if (typeof x === 'undefined') x = 0;
        if (typeof y === 'undefined') y = x;
        if (typeof z === 'undefined') z = y;
        super(3, [x, y, z]);
    }

    get x(): number { return this.data[0]; }
    get y(): number { return this.data[1]; }
    get z(): number { return this.data[2]; }

    get xx(): Vec2 { return new Vec2(this.x, this.x); }
    get xy(): Vec2 { return new Vec2(this.x, this.y); }
    get yx(): Vec2 { return new Vec2(this.y, this.x); }
    get yy(): Vec2 { return new Vec2(this.y, this.y); }
    get yz(): Vec2 { return new Vec2(this.y, this.z); }
    get zx(): Vec2 { return new Vec2(this.z, this.x); }
    get zy(): Vec2 { return new Vec2(this.z, this.y); }
    get zz(): Vec2 { return new Vec2(this.z, this.z); }

    get xxx(): Vec3 { return new Vec3(this.x, this.x, this.x); }
    get xxy(): Vec3 { return new Vec3(this.x, this.x, this.y); }
    get xxz(): Vec3 { return new Vec3(this.x, this.x, this.z); }
    get xyx(): Vec3 { return new Vec3(this.x, this.y, this.x); }
    get xyy(): Vec3 { return new Vec3(this.x, this.y, this.y); }
    get xyz(): Vec3 { return new Vec3(this.x, this.y, this.z); }
    get xzx(): Vec3 { return new Vec3(this.x, this.z, this.x); }
    get xzy(): Vec3 { return new Vec3(this.x, this.z, this.y); }
    get xzz(): Vec3 { return new Vec3(this.x, this.z, this.z); }
    get yxx(): Vec3 { return new Vec3(this.y, this.x, this.x); }
    get yxy(): Vec3 { return new Vec3(this.y, this.x, this.y); }
    get yxz(): Vec3 { return new Vec3(this.y, this.x, this.z); }
    get yyx(): Vec3 { return new Vec3(this.y, this.y, this.x); }
    get yyy(): Vec3 { return new Vec3(this.y, this.y, this.y); }
    get yyz(): Vec3 { return new Vec3(this.y, this.y, this.z); }
    get yzx(): Vec3 { return new Vec3(this.y, this.z, this.x); }
    get yzy(): Vec3 { return new Vec3(this.y, this.z, this.y); }
    get yzz(): Vec3 { return new Vec3(this.y, this.z, this.z); }
    get zxx(): Vec3 { return new Vec3(this.z, this.x, this.x); }
    get zxy(): Vec3 { return new Vec3(this.z, this.x, this.y); }
    get zxz(): Vec3 { return new Vec3(this.z, this.x, this.z); }
    get zyx(): Vec3 { return new Vec3(this.z, this.y, this.x); }
    get zyy(): Vec3 { return new Vec3(this.z, this.y, this.y); }
    get zyz(): Vec3 { return new Vec3(this.z, this.y, this.z); }
    get zzx(): Vec3 { return new Vec3(this.z, this.z, this.x); }
    get zzy(): Vec3 { return new Vec3(this.z, this.z, this.y); }
    get zzz(): Vec3 { return new Vec3(this.z, this.z, this.z); }

    cross(other: Vec3): Vec3 {
        return new Vec3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }
}

export class Vec4 extends Vec {
    constructor(x?: number, y?: number, z?: number, w?: number) {
        if (typeof x === 'undefined') x = 0;
        if (typeof y === 'undefined') y = x;
        if (typeof z === 'undefined') z = y;
        if (typeof w === 'undefined') w = z;
        super(4, [x, y, z, w]);
    }

    static from_vec3(vec: Vec3, w: number): Vec4 {
        return new Vec4(vec.x, vec.y, vec.z, w);
    }

    get x(): number { return this.data[0]; }
    get y(): number { return this.data[1]; }
    get z(): number { return this.data[2]; }
    get w(): number { return this.data[3]; }

    get xx(): Vec2 { return new Vec2(this.x, this.x); }
    get xy(): Vec2 { return new Vec2(this.x, this.y); }
    get xz(): Vec2 { return new Vec2(this.x, this.z); }
    get xw(): Vec2 { return new Vec2(this.x, this.w); }
    get yx(): Vec2 { return new Vec2(this.y, this.x); }
    get yy(): Vec2 { return new Vec2(this.y, this.y); }
    get yz(): Vec2 { return new Vec2(this.y, this.z); }
    get yw(): Vec2 { return new Vec2(this.y, this.w); }
    get zx(): Vec2 { return new Vec2(this.z, this.x); }
    get zy(): Vec2 { return new Vec2(this.z, this.y); }
    get zz(): Vec2 { return new Vec2(this.z, this.z); }
    get zw(): Vec2 { return new Vec2(this.z, this.w); }
    get wx(): Vec2 { return new Vec2(this.w, this.x); }
    get wy(): Vec2 { return new Vec2(this.w, this.y); }
    get wz(): Vec2 { return new Vec2(this.w, this.z); }
    get ww(): Vec2 { return new Vec2(this.w, this.w); }

    get xxx(): Vec3 { return new Vec3(this.x, this.x, this.x); }
    get xxy(): Vec3 { return new Vec3(this.x, this.x, this.y); }
    get xxz(): Vec3 { return new Vec3(this.x, this.x, this.z); }
    get xyx(): Vec3 { return new Vec3(this.x, this.y, this.x); }
    get xyy(): Vec3 { return new Vec3(this.x, this.y, this.y); }
    get xyz(): Vec3 { return new Vec3(this.x, this.y, this.z); }
    get xzx(): Vec3 { return new Vec3(this.x, this.z, this.x); }
    get xzy(): Vec3 { return new Vec3(this.x, this.z, this.y); }
    get xzz(): Vec3 { return new Vec3(this.x, this.z, this.z); }
    get yxx(): Vec3 { return new Vec3(this.y, this.x, this.x); }
    get yxy(): Vec3 { return new Vec3(this.y, this.x, this.y); }
    get yxz(): Vec3 { return new Vec3(this.y, this.x, this.z); }
    get yyx(): Vec3 { return new Vec3(this.y, this.y, this.x); }
    get yyy(): Vec3 { return new Vec3(this.y, this.y, this.y); }
    get yyz(): Vec3 { return new Vec3(this.y, this.y, this.z); }
    get yzx(): Vec3 { return new Vec3(this.y, this.z, this.x); }
    get yzy(): Vec3 { return new Vec3(this.y, this.z, this.y); }
    get yzz(): Vec3 { return new Vec3(this.y, this.z, this.z); }
    get zxx(): Vec3 { return new Vec3(this.z, this.x, this.x); }
    get zxy(): Vec3 { return new Vec3(this.z, this.x, this.y); }
    get zxz(): Vec3 { return new Vec3(this.z, this.x, this.z); }
    get zyx(): Vec3 { return new Vec3(this.z, this.y, this.x); }
    get zyy(): Vec3 { return new Vec3(this.z, this.y, this.y); }
    get zyz(): Vec3 { return new Vec3(this.z, this.y, this.z); }
    get zzx(): Vec3 { return new Vec3(this.z, this.z, this.x); }
    get zzy(): Vec3 { return new Vec3(this.z, this.z, this.y); }
    get zzz(): Vec3 { return new Vec3(this.z, this.z, this.z); }

    get xxxx(): Vec4 { return new Vec4(this.x, this.x, this.x, this.x); };
    get xxxy(): Vec4 { return new Vec4(this.x, this.x, this.x, this.y); };
    get xxxz(): Vec4 { return new Vec4(this.x, this.x, this.x, this.z); };
    get xxxw(): Vec4 { return new Vec4(this.x, this.x, this.x, this.w); };
    get xxyx(): Vec4 { return new Vec4(this.x, this.x, this.y, this.x); };
    get xxyy(): Vec4 { return new Vec4(this.x, this.x, this.y, this.y); };
    get xxyz(): Vec4 { return new Vec4(this.x, this.x, this.y, this.z); };
    get xxyw(): Vec4 { return new Vec4(this.x, this.x, this.y, this.w); };
    get xxzx(): Vec4 { return new Vec4(this.x, this.x, this.z, this.x); };
    get xxzy(): Vec4 { return new Vec4(this.x, this.x, this.z, this.y); };
    get xxzz(): Vec4 { return new Vec4(this.x, this.x, this.z, this.z); };
    get xxzw(): Vec4 { return new Vec4(this.x, this.x, this.z, this.w); };
    get xxwx(): Vec4 { return new Vec4(this.x, this.x, this.w, this.x); };
    get xxwy(): Vec4 { return new Vec4(this.x, this.x, this.w, this.y); };
    get xxwz(): Vec4 { return new Vec4(this.x, this.x, this.w, this.z); };
    get xxww(): Vec4 { return new Vec4(this.x, this.x, this.w, this.w); };
    get xyxx(): Vec4 { return new Vec4(this.x, this.y, this.x, this.x); };
    get xyxy(): Vec4 { return new Vec4(this.x, this.y, this.x, this.y); };
    get xyxz(): Vec4 { return new Vec4(this.x, this.y, this.x, this.z); };
    get xyxw(): Vec4 { return new Vec4(this.x, this.y, this.x, this.w); };
    get xyyx(): Vec4 { return new Vec4(this.x, this.y, this.y, this.x); };
    get xyyy(): Vec4 { return new Vec4(this.x, this.y, this.y, this.y); };
    get xyyz(): Vec4 { return new Vec4(this.x, this.y, this.y, this.z); };
    get xyyw(): Vec4 { return new Vec4(this.x, this.y, this.y, this.w); };
    get xyzx(): Vec4 { return new Vec4(this.x, this.y, this.z, this.x); };
    get xyzy(): Vec4 { return new Vec4(this.x, this.y, this.z, this.y); };
    get xyzz(): Vec4 { return new Vec4(this.x, this.y, this.z, this.z); };
    get xyzw(): Vec4 { return new Vec4(this.x, this.y, this.z, this.w); };
    get xywx(): Vec4 { return new Vec4(this.x, this.y, this.w, this.x); };
    get xywy(): Vec4 { return new Vec4(this.x, this.y, this.w, this.y); };
    get xywz(): Vec4 { return new Vec4(this.x, this.y, this.w, this.z); };
    get xyww(): Vec4 { return new Vec4(this.x, this.y, this.w, this.w); };
    get xzxx(): Vec4 { return new Vec4(this.x, this.z, this.x, this.x); };
    get xzxy(): Vec4 { return new Vec4(this.x, this.z, this.x, this.y); };
    get xzxz(): Vec4 { return new Vec4(this.x, this.z, this.x, this.z); };
    get xzxw(): Vec4 { return new Vec4(this.x, this.z, this.x, this.w); };
    get xzyx(): Vec4 { return new Vec4(this.x, this.z, this.y, this.x); };
    get xzyy(): Vec4 { return new Vec4(this.x, this.z, this.y, this.y); };
    get xzyz(): Vec4 { return new Vec4(this.x, this.z, this.y, this.z); };
    get xzyw(): Vec4 { return new Vec4(this.x, this.z, this.y, this.w); };
    get xzzx(): Vec4 { return new Vec4(this.x, this.z, this.z, this.x); };
    get xzzy(): Vec4 { return new Vec4(this.x, this.z, this.z, this.y); };
    get xzzz(): Vec4 { return new Vec4(this.x, this.z, this.z, this.z); };
    get xzzw(): Vec4 { return new Vec4(this.x, this.z, this.z, this.w); };
    get xzwx(): Vec4 { return new Vec4(this.x, this.z, this.w, this.x); };
    get xzwy(): Vec4 { return new Vec4(this.x, this.z, this.w, this.y); };
    get xzwz(): Vec4 { return new Vec4(this.x, this.z, this.w, this.z); };
    get xzww(): Vec4 { return new Vec4(this.x, this.z, this.w, this.w); };
    get xwxx(): Vec4 { return new Vec4(this.x, this.w, this.x, this.x); };
    get xwxy(): Vec4 { return new Vec4(this.x, this.w, this.x, this.y); };
    get xwxz(): Vec4 { return new Vec4(this.x, this.w, this.x, this.z); };
    get xwxw(): Vec4 { return new Vec4(this.x, this.w, this.x, this.w); };
    get xwyx(): Vec4 { return new Vec4(this.x, this.w, this.y, this.x); };
    get xwyy(): Vec4 { return new Vec4(this.x, this.w, this.y, this.y); };
    get xwyz(): Vec4 { return new Vec4(this.x, this.w, this.y, this.z); };
    get xwyw(): Vec4 { return new Vec4(this.x, this.w, this.y, this.w); };
    get xwzx(): Vec4 { return new Vec4(this.x, this.w, this.z, this.x); };
    get xwzy(): Vec4 { return new Vec4(this.x, this.w, this.z, this.y); };
    get xwzz(): Vec4 { return new Vec4(this.x, this.w, this.z, this.z); };
    get xwzw(): Vec4 { return new Vec4(this.x, this.w, this.z, this.w); };
    get xwwx(): Vec4 { return new Vec4(this.x, this.w, this.w, this.x); };
    get xwwy(): Vec4 { return new Vec4(this.x, this.w, this.w, this.y); };
    get xwwz(): Vec4 { return new Vec4(this.x, this.w, this.w, this.z); };
    get xwww(): Vec4 { return new Vec4(this.x, this.w, this.w, this.w); };
    get yxxx(): Vec4 { return new Vec4(this.y, this.x, this.x, this.x); };
    get yxxy(): Vec4 { return new Vec4(this.y, this.x, this.x, this.y); };
    get yxxz(): Vec4 { return new Vec4(this.y, this.x, this.x, this.z); };
    get yxxw(): Vec4 { return new Vec4(this.y, this.x, this.x, this.w); };
    get yxyx(): Vec4 { return new Vec4(this.y, this.x, this.y, this.x); };
    get yxyy(): Vec4 { return new Vec4(this.y, this.x, this.y, this.y); };
    get yxyz(): Vec4 { return new Vec4(this.y, this.x, this.y, this.z); };
    get yxyw(): Vec4 { return new Vec4(this.y, this.x, this.y, this.w); };
    get yxzx(): Vec4 { return new Vec4(this.y, this.x, this.z, this.x); };
    get yxzy(): Vec4 { return new Vec4(this.y, this.x, this.z, this.y); };
    get yxzz(): Vec4 { return new Vec4(this.y, this.x, this.z, this.z); };
    get yxzw(): Vec4 { return new Vec4(this.y, this.x, this.z, this.w); };
    get yxwx(): Vec4 { return new Vec4(this.y, this.x, this.w, this.x); };
    get yxwy(): Vec4 { return new Vec4(this.y, this.x, this.w, this.y); };
    get yxwz(): Vec4 { return new Vec4(this.y, this.x, this.w, this.z); };
    get yxww(): Vec4 { return new Vec4(this.y, this.x, this.w, this.w); };
    get yyxx(): Vec4 { return new Vec4(this.y, this.y, this.x, this.x); };
    get yyxy(): Vec4 { return new Vec4(this.y, this.y, this.x, this.y); };
    get yyxz(): Vec4 { return new Vec4(this.y, this.y, this.x, this.z); };
    get yyxw(): Vec4 { return new Vec4(this.y, this.y, this.x, this.w); };
    get yyyx(): Vec4 { return new Vec4(this.y, this.y, this.y, this.x); };
    get yyyy(): Vec4 { return new Vec4(this.y, this.y, this.y, this.y); };
    get yyyz(): Vec4 { return new Vec4(this.y, this.y, this.y, this.z); };
    get yyyw(): Vec4 { return new Vec4(this.y, this.y, this.y, this.w); };
    get yyzx(): Vec4 { return new Vec4(this.y, this.y, this.z, this.x); };
    get yyzy(): Vec4 { return new Vec4(this.y, this.y, this.z, this.y); };
    get yyzz(): Vec4 { return new Vec4(this.y, this.y, this.z, this.z); };
    get yyzw(): Vec4 { return new Vec4(this.y, this.y, this.z, this.w); };
    get yywx(): Vec4 { return new Vec4(this.y, this.y, this.w, this.x); };
    get yywy(): Vec4 { return new Vec4(this.y, this.y, this.w, this.y); };
    get yywz(): Vec4 { return new Vec4(this.y, this.y, this.w, this.z); };
    get yyww(): Vec4 { return new Vec4(this.y, this.y, this.w, this.w); };
    get yzxx(): Vec4 { return new Vec4(this.y, this.z, this.x, this.x); };
    get yzxy(): Vec4 { return new Vec4(this.y, this.z, this.x, this.y); };
    get yzxz(): Vec4 { return new Vec4(this.y, this.z, this.x, this.z); };
    get yzxw(): Vec4 { return new Vec4(this.y, this.z, this.x, this.w); };
    get yzyx(): Vec4 { return new Vec4(this.y, this.z, this.y, this.x); };
    get yzyy(): Vec4 { return new Vec4(this.y, this.z, this.y, this.y); };
    get yzyz(): Vec4 { return new Vec4(this.y, this.z, this.y, this.z); };
    get yzyw(): Vec4 { return new Vec4(this.y, this.z, this.y, this.w); };
    get yzzx(): Vec4 { return new Vec4(this.y, this.z, this.z, this.x); };
    get yzzy(): Vec4 { return new Vec4(this.y, this.z, this.z, this.y); };
    get yzzz(): Vec4 { return new Vec4(this.y, this.z, this.z, this.z); };
    get yzzw(): Vec4 { return new Vec4(this.y, this.z, this.z, this.w); };
    get yzwx(): Vec4 { return new Vec4(this.y, this.z, this.w, this.x); };
    get yzwy(): Vec4 { return new Vec4(this.y, this.z, this.w, this.y); };
    get yzwz(): Vec4 { return new Vec4(this.y, this.z, this.w, this.z); };
    get yzww(): Vec4 { return new Vec4(this.y, this.z, this.w, this.w); };
    get ywxx(): Vec4 { return new Vec4(this.y, this.w, this.x, this.x); };
    get ywxy(): Vec4 { return new Vec4(this.y, this.w, this.x, this.y); };
    get ywxz(): Vec4 { return new Vec4(this.y, this.w, this.x, this.z); };
    get ywxw(): Vec4 { return new Vec4(this.y, this.w, this.x, this.w); };
    get ywyx(): Vec4 { return new Vec4(this.y, this.w, this.y, this.x); };
    get ywyy(): Vec4 { return new Vec4(this.y, this.w, this.y, this.y); };
    get ywyz(): Vec4 { return new Vec4(this.y, this.w, this.y, this.z); };
    get ywyw(): Vec4 { return new Vec4(this.y, this.w, this.y, this.w); };
    get ywzx(): Vec4 { return new Vec4(this.y, this.w, this.z, this.x); };
    get ywzy(): Vec4 { return new Vec4(this.y, this.w, this.z, this.y); };
    get ywzz(): Vec4 { return new Vec4(this.y, this.w, this.z, this.z); };
    get ywzw(): Vec4 { return new Vec4(this.y, this.w, this.z, this.w); };
    get ywwx(): Vec4 { return new Vec4(this.y, this.w, this.w, this.x); };
    get ywwy(): Vec4 { return new Vec4(this.y, this.w, this.w, this.y); };
    get ywwz(): Vec4 { return new Vec4(this.y, this.w, this.w, this.z); };
    get ywww(): Vec4 { return new Vec4(this.y, this.w, this.w, this.w); };
    get zxxx(): Vec4 { return new Vec4(this.z, this.x, this.x, this.x); };
    get zxxy(): Vec4 { return new Vec4(this.z, this.x, this.x, this.y); };
    get zxxz(): Vec4 { return new Vec4(this.z, this.x, this.x, this.z); };
    get zxxw(): Vec4 { return new Vec4(this.z, this.x, this.x, this.w); };
    get zxyx(): Vec4 { return new Vec4(this.z, this.x, this.y, this.x); };
    get zxyy(): Vec4 { return new Vec4(this.z, this.x, this.y, this.y); };
    get zxyz(): Vec4 { return new Vec4(this.z, this.x, this.y, this.z); };
    get zxyw(): Vec4 { return new Vec4(this.z, this.x, this.y, this.w); };
    get zxzx(): Vec4 { return new Vec4(this.z, this.x, this.z, this.x); };
    get zxzy(): Vec4 { return new Vec4(this.z, this.x, this.z, this.y); };
    get zxzz(): Vec4 { return new Vec4(this.z, this.x, this.z, this.z); };
    get zxzw(): Vec4 { return new Vec4(this.z, this.x, this.z, this.w); };
    get zxwx(): Vec4 { return new Vec4(this.z, this.x, this.w, this.x); };
    get zxwy(): Vec4 { return new Vec4(this.z, this.x, this.w, this.y); };
    get zxwz(): Vec4 { return new Vec4(this.z, this.x, this.w, this.z); };
    get zxww(): Vec4 { return new Vec4(this.z, this.x, this.w, this.w); };
    get zyxx(): Vec4 { return new Vec4(this.z, this.y, this.x, this.x); };
    get zyxy(): Vec4 { return new Vec4(this.z, this.y, this.x, this.y); };
    get zyxz(): Vec4 { return new Vec4(this.z, this.y, this.x, this.z); };
    get zyxw(): Vec4 { return new Vec4(this.z, this.y, this.x, this.w); };
    get zyyx(): Vec4 { return new Vec4(this.z, this.y, this.y, this.x); };
    get zyyy(): Vec4 { return new Vec4(this.z, this.y, this.y, this.y); };
    get zyyz(): Vec4 { return new Vec4(this.z, this.y, this.y, this.z); };
    get zyyw(): Vec4 { return new Vec4(this.z, this.y, this.y, this.w); };
    get zyzx(): Vec4 { return new Vec4(this.z, this.y, this.z, this.x); };
    get zyzy(): Vec4 { return new Vec4(this.z, this.y, this.z, this.y); };
    get zyzz(): Vec4 { return new Vec4(this.z, this.y, this.z, this.z); };
    get zyzw(): Vec4 { return new Vec4(this.z, this.y, this.z, this.w); };
    get zywx(): Vec4 { return new Vec4(this.z, this.y, this.w, this.x); };
    get zywy(): Vec4 { return new Vec4(this.z, this.y, this.w, this.y); };
    get zywz(): Vec4 { return new Vec4(this.z, this.y, this.w, this.z); };
    get zyww(): Vec4 { return new Vec4(this.z, this.y, this.w, this.w); };
    get zzxx(): Vec4 { return new Vec4(this.z, this.z, this.x, this.x); };
    get zzxy(): Vec4 { return new Vec4(this.z, this.z, this.x, this.y); };
    get zzxz(): Vec4 { return new Vec4(this.z, this.z, this.x, this.z); };
    get zzxw(): Vec4 { return new Vec4(this.z, this.z, this.x, this.w); };
    get zzyx(): Vec4 { return new Vec4(this.z, this.z, this.y, this.x); };
    get zzyy(): Vec4 { return new Vec4(this.z, this.z, this.y, this.y); };
    get zzyz(): Vec4 { return new Vec4(this.z, this.z, this.y, this.z); };
    get zzyw(): Vec4 { return new Vec4(this.z, this.z, this.y, this.w); };
    get zzzx(): Vec4 { return new Vec4(this.z, this.z, this.z, this.x); };
    get zzzy(): Vec4 { return new Vec4(this.z, this.z, this.z, this.y); };
    get zzzz(): Vec4 { return new Vec4(this.z, this.z, this.z, this.z); };
    get zzzw(): Vec4 { return new Vec4(this.z, this.z, this.z, this.w); };
    get zzwx(): Vec4 { return new Vec4(this.z, this.z, this.w, this.x); };
    get zzwy(): Vec4 { return new Vec4(this.z, this.z, this.w, this.y); };
    get zzwz(): Vec4 { return new Vec4(this.z, this.z, this.w, this.z); };
    get zzww(): Vec4 { return new Vec4(this.z, this.z, this.w, this.w); };
    get zwxx(): Vec4 { return new Vec4(this.z, this.w, this.x, this.x); };
    get zwxy(): Vec4 { return new Vec4(this.z, this.w, this.x, this.y); };
    get zwxz(): Vec4 { return new Vec4(this.z, this.w, this.x, this.z); };
    get zwxw(): Vec4 { return new Vec4(this.z, this.w, this.x, this.w); };
    get zwyx(): Vec4 { return new Vec4(this.z, this.w, this.y, this.x); };
    get zwyy(): Vec4 { return new Vec4(this.z, this.w, this.y, this.y); };
    get zwyz(): Vec4 { return new Vec4(this.z, this.w, this.y, this.z); };
    get zwyw(): Vec4 { return new Vec4(this.z, this.w, this.y, this.w); };
    get zwzx(): Vec4 { return new Vec4(this.z, this.w, this.z, this.x); };
    get zwzy(): Vec4 { return new Vec4(this.z, this.w, this.z, this.y); };
    get zwzz(): Vec4 { return new Vec4(this.z, this.w, this.z, this.z); };
    get zwzw(): Vec4 { return new Vec4(this.z, this.w, this.z, this.w); };
    get zwwx(): Vec4 { return new Vec4(this.z, this.w, this.w, this.x); };
    get zwwy(): Vec4 { return new Vec4(this.z, this.w, this.w, this.y); };
    get zwwz(): Vec4 { return new Vec4(this.z, this.w, this.w, this.z); };
    get zwww(): Vec4 { return new Vec4(this.z, this.w, this.w, this.w); };
    get wxxx(): Vec4 { return new Vec4(this.w, this.x, this.x, this.x); };
    get wxxy(): Vec4 { return new Vec4(this.w, this.x, this.x, this.y); };
    get wxxz(): Vec4 { return new Vec4(this.w, this.x, this.x, this.z); };
    get wxxw(): Vec4 { return new Vec4(this.w, this.x, this.x, this.w); };
    get wxyx(): Vec4 { return new Vec4(this.w, this.x, this.y, this.x); };
    get wxyy(): Vec4 { return new Vec4(this.w, this.x, this.y, this.y); };
    get wxyz(): Vec4 { return new Vec4(this.w, this.x, this.y, this.z); };
    get wxyw(): Vec4 { return new Vec4(this.w, this.x, this.y, this.w); };
    get wxzx(): Vec4 { return new Vec4(this.w, this.x, this.z, this.x); };
    get wxzy(): Vec4 { return new Vec4(this.w, this.x, this.z, this.y); };
    get wxzz(): Vec4 { return new Vec4(this.w, this.x, this.z, this.z); };
    get wxzw(): Vec4 { return new Vec4(this.w, this.x, this.z, this.w); };
    get wxwx(): Vec4 { return new Vec4(this.w, this.x, this.w, this.x); };
    get wxwy(): Vec4 { return new Vec4(this.w, this.x, this.w, this.y); };
    get wxwz(): Vec4 { return new Vec4(this.w, this.x, this.w, this.z); };
    get wxww(): Vec4 { return new Vec4(this.w, this.x, this.w, this.w); };
    get wyxx(): Vec4 { return new Vec4(this.w, this.y, this.x, this.x); };
    get wyxy(): Vec4 { return new Vec4(this.w, this.y, this.x, this.y); };
    get wyxz(): Vec4 { return new Vec4(this.w, this.y, this.x, this.z); };
    get wyxw(): Vec4 { return new Vec4(this.w, this.y, this.x, this.w); };
    get wyyx(): Vec4 { return new Vec4(this.w, this.y, this.y, this.x); };
    get wyyy(): Vec4 { return new Vec4(this.w, this.y, this.y, this.y); };
    get wyyz(): Vec4 { return new Vec4(this.w, this.y, this.y, this.z); };
    get wyyw(): Vec4 { return new Vec4(this.w, this.y, this.y, this.w); };
    get wyzx(): Vec4 { return new Vec4(this.w, this.y, this.z, this.x); };
    get wyzy(): Vec4 { return new Vec4(this.w, this.y, this.z, this.y); };
    get wyzz(): Vec4 { return new Vec4(this.w, this.y, this.z, this.z); };
    get wyzw(): Vec4 { return new Vec4(this.w, this.y, this.z, this.w); };
    get wywx(): Vec4 { return new Vec4(this.w, this.y, this.w, this.x); };
    get wywy(): Vec4 { return new Vec4(this.w, this.y, this.w, this.y); };
    get wywz(): Vec4 { return new Vec4(this.w, this.y, this.w, this.z); };
    get wyww(): Vec4 { return new Vec4(this.w, this.y, this.w, this.w); };
    get wzxx(): Vec4 { return new Vec4(this.w, this.z, this.x, this.x); };
    get wzxy(): Vec4 { return new Vec4(this.w, this.z, this.x, this.y); };
    get wzxz(): Vec4 { return new Vec4(this.w, this.z, this.x, this.z); };
    get wzxw(): Vec4 { return new Vec4(this.w, this.z, this.x, this.w); };
    get wzyx(): Vec4 { return new Vec4(this.w, this.z, this.y, this.x); };
    get wzyy(): Vec4 { return new Vec4(this.w, this.z, this.y, this.y); };
    get wzyz(): Vec4 { return new Vec4(this.w, this.z, this.y, this.z); };
    get wzyw(): Vec4 { return new Vec4(this.w, this.z, this.y, this.w); };
    get wzzx(): Vec4 { return new Vec4(this.w, this.z, this.z, this.x); };
    get wzzy(): Vec4 { return new Vec4(this.w, this.z, this.z, this.y); };
    get wzzz(): Vec4 { return new Vec4(this.w, this.z, this.z, this.z); };
    get wzzw(): Vec4 { return new Vec4(this.w, this.z, this.z, this.w); };
    get wzwx(): Vec4 { return new Vec4(this.w, this.z, this.w, this.x); };
    get wzwy(): Vec4 { return new Vec4(this.w, this.z, this.w, this.y); };
    get wzwz(): Vec4 { return new Vec4(this.w, this.z, this.w, this.z); };
    get wzww(): Vec4 { return new Vec4(this.w, this.z, this.w, this.w); };
    get wwxx(): Vec4 { return new Vec4(this.w, this.w, this.x, this.x); };
    get wwxy(): Vec4 { return new Vec4(this.w, this.w, this.x, this.y); };
    get wwxz(): Vec4 { return new Vec4(this.w, this.w, this.x, this.z); };
    get wwxw(): Vec4 { return new Vec4(this.w, this.w, this.x, this.w); };
    get wwyx(): Vec4 { return new Vec4(this.w, this.w, this.y, this.x); };
    get wwyy(): Vec4 { return new Vec4(this.w, this.w, this.y, this.y); };
    get wwyz(): Vec4 { return new Vec4(this.w, this.w, this.y, this.z); };
    get wwyw(): Vec4 { return new Vec4(this.w, this.w, this.y, this.w); };
    get wwzx(): Vec4 { return new Vec4(this.w, this.w, this.z, this.x); };
    get wwzy(): Vec4 { return new Vec4(this.w, this.w, this.z, this.y); };
    get wwzz(): Vec4 { return new Vec4(this.w, this.w, this.z, this.z); };
    get wwzw(): Vec4 { return new Vec4(this.w, this.w, this.z, this.w); };
    get wwwx(): Vec4 { return new Vec4(this.w, this.w, this.w, this.x); };
    get wwwy(): Vec4 { return new Vec4(this.w, this.w, this.w, this.y); };
    get wwwz(): Vec4 { return new Vec4(this.w, this.w, this.w, this.z); };
    get wwww(): Vec4 { return new Vec4(this.w, this.w, this.w, this.w); };
}

type VectorType = Vec2 | Vec3 | Vec4;
const is_parallel = <T extends VectorType> (a: T, b: T): boolean => {
    // return false if types dont match
    if (!is_same_type(a, b)) {
        return false;
    }

    let dot = 0;
    if (a instanceof Vec2 && b instanceof Vec2) {
        dot = a.dot(b);
    } else if (a instanceof Vec3 && b instanceof Vec3) {
        dot = a.dot(b);
    } else if (a instanceof Vec4 && b instanceof Vec4) {
        dot = a.dot(b);
    }

    return dot === a.norm() * b.norm();
}

const is_same_type = <T extends VectorType>(a: T, b: VectorType): b is T => {
    return (
        (a as Vec2).x !== undefined && (a as Vec2).y !== undefined && (b as Vec2).x !== undefined && (b as Vec2).y !== undefined ||
        (a as Vec3).z !== undefined && (b as Vec3).z !== undefined ||
        (a as Vec4).w !== undefined && (b as Vec4).w !== undefined
    );
}