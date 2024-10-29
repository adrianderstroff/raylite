import { Mat3, Mat4 } from "./mat";
import { deg_to_rad } from "./scalar";
import { Vec3 } from "./vec";

////////////////////////////////////////////////////////////////////////////////
// transform vectors
////////////////////////////////////////////////////////////////////////////////
/**
 * Rodriguez rotation formula of rotating around an axis by an angle
 * @param axis 
 * @param angle 
 * @returns 
 */
export const rotate_vector_axis_angle = (vec: Vec3, axis: Vec3, angle: number): Vec3 => {
    const a = vec.mul(Math.cos(angle));
    const b = axis.cross(vec).mul(Math.sin(angle));
    const c = axis.mul(axis.dot(vec) * (1 - Math.cos(angle)));
    return a.add(b).add(c);
}

////////////////////////////////////////////////////////////////////////////////
// projection matrices
////////////////////////////////////////////////////////////////////////////////

export const translate = (vec: Vec3): Mat4 => {
    const data = [
        [1, 0, 0, vec.x],
        [0, 1, 0, vec.y],
        [0, 0, 1, vec.z],
        [0, 0, 0,     1]
    ];
    return new Mat4(data);
}
export const scale = (vec: Vec3): Mat4 => {
    const data = [
        [vec.x,     0,     0, 0],
        [    0, vec.y,     0, 0],
        [    0,     0, vec.z, 0],
        [    0,     0,     0, 1]
    ];
    return new Mat4(data);
}
export const rotate_x = (angle: number): Mat4 => {
    const a = deg_to_rad(angle);
    const c = Math.cos(a);
    const s = Math.sin(a);

    const data = [
        [1, 0, 0, 0],
        [0, c,-s, 0],
        [0, s, c, 0],
        [0, 0, 0, 1]
    ];
    return new Mat4(data);
}
export const rotate_y = (angle: number): Mat4 => {
    const a = deg_to_rad(angle);
    const c = Math.cos(a);
    const s = Math.sin(a);

    const data = [
        [ c, 0, s, 0],
        [ 0, 1, 0, 0],
        [-s, 0, c, 0],
        [ 0, 0, 0, 1]
    ];
    return new Mat4(data);
}
export const rotate_z = (angle: number): Mat4 => {
    const a = deg_to_rad(angle);
    const c = Math.cos(a);
    const s = Math.sin(a);

    const data = [
        [c,-s, 0, 0],
        [s, c, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
    return new Mat4(data);
}
export const rotate_axis_angle = (axis: Vec3, angle: number): Mat4 => {
    const theta = deg_to_rad(angle);

    const K = new Mat3([
        [      0, -axis.z,  axis.y],
        [ axis.z,       0, -axis.x],
        [-axis.y,  axis.x,       0]
    ]);

    const R = Mat3.identity()
        .add(K.mul(Math.sin(theta)))
        .add(K.mul(K).mul(1 - Math.cos(theta)));
    return Mat4.from_mat3(R);
}

////////////////////////////////////////////////////////////////////////////////
// view matrices
////////////////////////////////////////////////////////////////////////////////

/**
 * Inspired by glm. Matrix for projecting points into the local camera 
 * coordinate system. The up vector may not be parallel to the viewing direction
 * (at - eye) or otherwise the result will be undefined.
 * @param eye position of the camera
 * @param at position the camera is looking at
 * @param up up vector to uniquely determine the orientation of the camera.
 * @returns 
 */
export const look_at = (eye: Vec3, at: Vec3, up: Vec3): Mat4 => {
    const v = up.normalize();
    const forward: Vec3 = eye.sub(at).normalize();
    const right: Vec3 = v.cross(forward).normalize();
    up = forward.cross(right);

    return new Mat4([
        [  right.x,   right.y,   right.z, -right.dot(eye)  ],
        [     up.x,      up.y,      up.z, -up.dot(eye)     ],
        [forward.x, forward.y, forward.z, -forward.dot(eye)],
        [        0,         0,         0,                 1]
    ]);
}

////////////////////////////////////////////////////////////////////////////////
// projection matrices
////////////////////////////////////////////////////////////////////////////////

/**
 * A simple symmetric perspective projection matrix specified by the field of 
 * view and near and far planes. Taken from scratchapixel
 * https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-
 * orthographic-projection-matrix/opengl-perspective-projection-matrix.html
 * @param fov field of view in degrees
 * @param aspect aspect ratio of the screen (width / height)
 * @param near the z distance to the near plane
 * @param far the z distance to the far plane
 * @returns a perspective projection matrix
 */
export const perspective = (fov: number, aspect: number, near: number, far: number): Mat4 => {
    let f = 1 / Math.tan(0.5 * deg_to_rad(fov));
    const a = f / aspect;
    const b = f;
    const c = (far + near) / (near - far);
    const d = 2 * far * near / (near - far);

    let data = [
        [a, 0, 0, 0],
        [0, b, 0, 0],
        [0, 0, c, d],
        [0, 0, -1, 0]
    ];

    return new Mat4(data);
}