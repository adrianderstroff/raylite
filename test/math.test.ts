import { Mat2, Vec2, Vec3 } from "raylite/math";

describe('Test Vec2', () => {
    // test constructors
    test('test vec2 constructor', () => {
        expect(new Vec2().x).toBe(0);
        expect(new Vec2().y).toBe(0);
        expect(new Vec2(1, 2).x).toBe(1);
        expect(new Vec2(1, 2).y).toBe(2);
    });

    // getters and setters
    test('test vec2 xy', () => {
        expect(new Vec2(1, 2).x).toBe(1);
        expect(new Vec2(1, 2).y).toBe(2);
        expect(new Vec2(1, 2).yx).toEqual(new Vec2(2, 1));
        expect(new Vec2(1, 2).yy).toEqual(new Vec2(2, 2));
    });
    test('test vec2 length', () => {
        expect(new Vec2(3, 4).length).toBe(2);
    });

    // copied methods
    test('test vec2 copy', () => {
        expect(new Vec2(1, 2).copy()).toEqual(new Vec2(1, 2));
    });
    test('test vec2 add', () => {
        expect(new Vec2(1, 2).add(new Vec2(3, 4))).toEqual(new Vec2(4, 6));
    });
    test('test vec2 sub', () => {
        expect(new Vec2(1, 2).sub(new Vec2(3, 4))).toEqual(new Vec2(-2, -2));
    });
    test('test vec2 mul', () => {
        expect(new Vec2(1, 2).mul(3)).toEqual(new Vec2(3, 6));
    });
    test('test vec2 div', () => {
        expect(new Vec2(3, 6).div(3)).toEqual(new Vec2(1, 2));
    });
    test('test vec2 negate', () => {
        expect(new Vec2(1, 2).negate()).toEqual(new Vec2(-1, -2));
    });
    test('test vec2 normalize', () => {
        expect(new Vec2(3, 4).normalize().norm()).toEqual(1.0);
    });
    test('test vec2 dot', () => {
        expect(new Vec2(1, 2).dot(new Vec2(3, 4))).toBe(11);
    });
    test('test vec2 norm', () => {
        expect(new Vec2(3, 4).norm()).toBe(5);
    });
    

    // in-place methods
    test('test vec2 add-inp', () => {
        expect(new Vec2(1, 2).add_inp(new Vec2(3, 4))).toEqual(new Vec2(4, 6));
    });
    test('test vec2 sub-inp', () => {
        expect(new Vec2(1, 2).sub_inp(new Vec2(3, 4))).toEqual(new Vec2(-2, -2));
    });
    test('test vec2 mul-inp', () => {
        expect(new Vec2(1, 2).mul_inp(3)).toEqual(new Vec2(3, 6));
    });
    test('test vec2 div-inp', () => {
        expect(new Vec2(3, 6).div_inp(3)).toEqual(new Vec2(1, 2));
    });
    test('test vec2 negate-inp', () => {
        expect(new Vec2(3, 4).negate_inp()).toEqual(new Vec2(-3, -4));
    });
    test('test vec2 normalize-inp', () => {
        expect(new Vec2(3, 4).normalize_inp().norm()).toEqual(1.0);
    });
});

describe('Test Vec3', () => {
    // test constructors
    test('test vec3 constructor', () => {
        expect(new Vec3().x).toBe(0);
        expect(new Vec3().y).toBe(0);
        expect(new Vec3().z).toBe(0);
        expect(new Vec3(1).y).toBe(1);
        expect(new Vec3(1).z).toBe(1);
        expect(new Vec3(1, 2).z).toBe(2);
        expect(new Vec3(1, 2, 3).x).toBe(1);
        expect(new Vec3(1, 2, 3).y).toBe(2);
        expect(new Vec3(1, 2, 3).z).toBe(3);
    });

    // getters and setters
    test('test vec3 xy', () => {
        expect(new Vec3(1, 2, 3).x).toBe(1);
        expect(new Vec3(1, 2, 3).y).toBe(2);
        expect(new Vec3(1, 2, 3).z).toBe(3);
        expect(new Vec3(1, 2, 3).yx).toEqual(new Vec2(2, 1));
        expect(new Vec3(1, 2, 3).yy).toEqual(new Vec2(2, 2));
        expect(new Vec3(1, 2, 3).zyx).toEqual(new Vec3(3, 2, 1));
        expect(new Vec3(1, 2, 3).yyy).toEqual(new Vec3(2, 2, 2));
        expect(new Vec3(1, 2, 3).xzx).toEqual(new Vec3(1, 3, 1));
    });
    test('test vec3 length', () => {
        expect(new Vec3(3, 4, 5).length).toBe(3);
    });
    
    // copied methods
    test('test vec3 copy', () => {
        expect(new Vec3(1, 2, 3).copy()).toEqual(new Vec3(1, 2, 3));
    });
    test('test vec3 add', () => {
        expect(new Vec3(1, 2, 0).add(new Vec3(3, 4, 0))).toEqual(new Vec3(4, 6, 0));
    });
    test('test vec3 sub', () => {
        expect(new Vec3(1, 2, 3).sub(new Vec3(3, 4, 5))).toEqual(new Vec3(-2, -2, -2));
    });
    test('test vec3 mul', () => {
        expect(new Vec3(1, 2, 3).mul(3)).toEqual(new Vec3(3, 6, 9));
    });
    test('test vec3 div', () => {
        expect(new Vec3(3, 6, 9).div(3)).toEqual(new Vec3(1, 2, 3));
    });
    test('test vec3 normalize', () => {
        expect(new Vec3(2, 3, 6).normalize().norm()).toBeCloseTo(1.0, 5);
    });
    test('test vec3 negate', () => {
        expect(new Vec3(2, 3, 6).negate()).toEqual(new Vec3(-2, -3, -6));
    });
    test('test vec3 dot', () => {
        expect(new Vec3(1, 2, 3).dot(new Vec3(3, 4, 5))).toBe(26);
    });
    test('test vec3 norm', () => {
        expect(new Vec3(2, 3, 6).norm()).toBe(7);
    });
    test('test vec3 cross', () => {
        expect(new Vec3(1, 0, 0).cross(new Vec3(0, 1, 0))).toEqual(new Vec3(0, 0, 1));
    });
    
    // in-place methods
    test('test vec3 add_inp', () => {
        expect(new Vec3(1, 2, 0).add_inp(new Vec3(3, 4, 0))).toEqual(new Vec3(4, 6, 0));
    });
    test('test vec3 sub_inp', () => {
        expect(new Vec3(1, 2, 3).sub_inp(new Vec3(3, 4, 5))).toEqual(new Vec3(-2, -2, -2));
    });
    test('test vec3 mul_inp', () => {
        expect(new Vec3(1, 2, 3).mul_inp(3)).toEqual(new Vec3(3, 6, 9));
    });
    test('test vec3 div_inp', () => {
        expect(new Vec3(3, 6, 9).div_inp(3)).toEqual(new Vec3(1, 2, 3));
    });
    test('test vec3 normalize_inp', () => {
        expect(new Vec3(2, 3, 6).normalize_inp().norm()).toBeCloseTo(1.0, 5);
    });
    test('test vec3 negate_inp', () => {
        expect(new Vec3(2, 3, 6).negate_inp()).toEqual(new Vec3(-2, -3, -6));
    });
});

describe('Test Mat2', () => {
    // test constructors
    test('test mat2 constructor', () => {
        expect(new Mat2().data).toEqual([0, 0, 0, 0]);
        expect(new Mat2(0.0).data).toEqual([0, 0, 0, 0]);
        expect(Mat2.zeros().data).toEqual([0, 0, 0, 0]);
        expect(new Mat2(1.0).data).toEqual([1, 0, 0, 1]);
        expect(Mat2.identity().data).toEqual([1, 0, 0, 1]);
        expect(new Mat2([1, 2, 3, 4]).data).toEqual([1, 2, 3, 4]);
        expect(new Mat2([[1, 2], [3, 4]]).data).toEqual([1, 2, 3, 4]);
    });

    // getters and setters
    test('test mat2 get', () => {
        expect(new Mat2([1, 2, 3, 4]).get(0, 0)).toBe(1);
        expect(new Mat2([1, 2, 3, 4]).get(0, 1)).toBe(2);
        expect(new Mat2([1, 2, 3, 4]).get(1, 0)).toBe(3);
        expect(new Mat2([1, 2, 3, 4]).get(1, 1)).toBe(4);
    });

    // copied methods
    test('test mat2 copy', () => {
        expect(new Mat2([1, 2, 3, 4]).copy().data).toEqual([1, 2, 3, 4]);
    });
    test('test mat2 add', () => {
        expect(new Mat2([1, 2, 3, 4]).add(new Mat2([4, 3, 2, 1])).data).toEqual([5, 5, 5, 5]);
    });
    test('test mat2 sub', () => {
        expect(new Mat2([1, 2, 3, 4]).sub(new Mat2([4, 3, 2, 1])).data).toEqual([-3, -1, 1, 3]);
    });
    test('test mat2 mul', () => {
        expect(new Mat2([1, 2, 3, 4]).mul(2).data).toEqual([2, 4, 6, 8]);
        expect(new Mat2([[2, 0], [0, 3]]).mul(new Vec2(1, 2)).data).toEqual([2, 6]);
        expect(new Mat2(1.0).mul(new Mat2([1, 2, 3, 4])).data).toEqual([1, 2, 3, 4]);
    });
    test('test mat2 div', () => {
        expect(new Mat2([2, 4, 6, 8]).div(2).data).toEqual([1, 2, 3, 4]);
    });
    test('test mat2 transpose', () => {
        expect(new Mat2([[1, 2], [3, 4]]).transpose()).toEqual(new Mat2([[1, 3], [2, 4]]));
    });

    // in-place methods
    test('test mat2 add_inp', () => {
        expect(new Mat2([1, 2, 3, 4]).add_inp(new Mat2([4, 3, 2, 1])).data).toEqual([5, 5, 5, 5]);
    });
    test('test mat2 sub_inp', () => {
        expect(new Mat2([1, 2, 3, 4]).sub_inp(new Mat2([4, 3, 2, 1])).data).toEqual([-3, -1, 1, 3]);
    });
    test('test mat2 div_inp', () => {
        expect(new Mat2([2, 4, 6, 8]).div_inp(2).data).toEqual([1, 2, 3, 4]);
    });
    test('test mat2 transpose_inp', () => {
        expect(new Mat2([[1, 2], [3, 4]]).transpose_inp()).toEqual(new Mat2([[1, 3], [2, 4]]));
    });
});