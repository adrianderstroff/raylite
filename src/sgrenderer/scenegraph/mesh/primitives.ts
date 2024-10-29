import { Vec2, Vec3 } from "common/math";
import { merge_vertex_data, Mesh } from "./mesh";

export class Triangle extends Mesh {
    constructor(gl: WebGL2RenderingContext, width: number = 2.0, height: number = 2.0) {
        super(gl, {
            0: {offset: 0, size: 3}, 
            1: {offset: 3, size: 3}, 
            2: {offset: 6, size: 2}}
        );

        const half_width = width / 2;
        const half_height = height / 2;

        const pos = [
            -half_width, -half_height, 0,
            half_width, -half_height, 0,
            0, half_height, 0
        ];
        const normal = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ]
        const tex = [
            0, 0,
            1, 0,
            1, 1
        ]

        this.upload_data(merge_vertex_data([pos, normal, tex], [3, 3, 2]));
    }
}

export class Plane extends Mesh {
    constructor(gl: WebGL2RenderingContext, width: number = 2.0, height: number = 2.0) {
        super(gl, {
            0: {offset: 0, size: 3}, 
            1: {offset: 3, size: 3}, 
            2: {offset: 6, size: 2}}
        );

        const half_width = width / 2;
        const half_height = height / 2;

        const pos = [
            -half_width, -half_height, 0,
            half_width, -half_height, 0,
            half_width, half_height, 0,
            -half_width, -half_height, 0,
            half_width, half_height, 0,
            -half_width, half_height, 0
        ];
        const normal = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ]
        const tex = [
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1
        ]

        this.upload_data(merge_vertex_data([pos, normal, tex], [3, 3, 2]));
    }
}

export class Quad extends Mesh {
    constructor(gl: WebGL2RenderingContext, width: number = 2.0, height: number = 2.0, depth: number = 2.0) {
        super(gl, {
            0: {offset: 0, size: 3}, 
            1: {offset: 3, size: 3}, 
            2: {offset: 6, size: 2}}
        );

        const half_width = width / 2;
        const half_height = height / 2;
        const half_depth = depth / 2;

        const pos = [
            // front
            -half_width, -half_height, half_depth,
            half_width, -half_height, half_depth,
            half_width, half_height, half_depth,
            -half_width, -half_height, half_depth,
            half_width, half_height, half_depth,
            -half_width, half_height, half_depth,
            // back
            half_width, -half_height, -half_depth,
            -half_width, -half_height, -half_depth,
            -half_width, half_height, -half_depth,
            half_width, -half_height, -half_depth,
            -half_width, half_height, -half_depth,
            half_width, half_height, -half_depth,
            // left
            -half_width, -half_height, -half_depth,
            -half_width, -half_height, half_depth,
            -half_width, half_height, half_depth,
            -half_width, -half_height, -half_depth,
            -half_width, half_height, half_depth,
            -half_width, half_height, -half_depth,
            // right
            half_width, -half_height, half_depth,
            half_width, -half_height, -half_depth,
            half_width, half_height, -half_depth,
            half_width, -half_height, half_depth,
            half_width, half_height, -half_depth,
            half_width, half_height, half_depth,
            // top
            -half_width, half_height, half_depth,
            half_width, half_height, half_depth,
            half_width, half_height, -half_depth,
            -half_width, half_height, half_depth,
            half_width, half_height, -half_depth,
            -half_width, half_height, -half_depth,
            // bottom
            -half_width, -half_height, -half_depth,
            half_width, -half_height, -half_depth,
            half_width, -half_height, half_depth,
            -half_width, -half_height, -half_depth,
            half_width, -half_height, half_depth,
            -half_width, -half_height, half_depth
        ];
        const normal = [
            // front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // left
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            // right
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // top
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // bottom
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
        ];
        const tex = [
            // front
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            // back
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            // left
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            // right
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            // top
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
            // bottom
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1
        ];

        this.upload_data(merge_vertex_data([pos, normal, tex], [3, 3, 2]));
    }
}

export class Sphere extends Mesh {
    constructor(gl: WebGL2RenderingContext, resolution: number = 10, radius: number = 1.0) {
        super(gl, {
            0: {offset: 0, size: 3}, 
            1: {offset: 3, size: 3}, 
            2: {offset: 6, size: 2}}
        );
        const pos = [];
        const normal = [];
        const tex = [];

        const stepH = Math.PI * 2 / resolution;
        const stepV = Math.PI / resolution;

        const spherical_to_cartesian = (theta: number, phi: number, radius: number): Vec3 => {
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);
            return new Vec3(x, y, z);
        }

        const add_vertex = (p: Vec3, n: Vec3, uv: Vec2) => {
            pos.push(p.x);
            pos.push(p.y);
            pos.push(p.z);

            normal.push(n.x);
            normal.push(n.y);
            normal.push(n.z);

            tex.push(uv.x);
            tex.push(uv.y);
        }

        const origin = new Vec3(0);

        for (let v = 1; v < resolution + 1; v++) {
            const phi1 = (v - 1) * stepV;
            const phi2 = v * stepV;
            for (let h = 1; h < resolution + 1; h++) {
                const theta1 = (h - 1) * stepH;
                const theta2 = h * stepH;

                const p11 = spherical_to_cartesian(theta1, phi1, radius);
                const p21 = spherical_to_cartesian(theta2, phi1, radius);
                const p12 = spherical_to_cartesian(theta1, phi2, radius);
                const p22 = spherical_to_cartesian(theta2, phi2, radius);

                const n11 = p11.sub(origin).normalize();
                const n21 = p21.sub(origin).normalize();
                const n12 = p12.sub(origin).normalize();
                const n22 = p22.sub(origin).normalize();

                const u11 = new Vec2(theta1 / (2 * Math.PI), phi1 / Math.PI);
                const u21 = new Vec2(theta2 / (2 * Math.PI), phi1 / Math.PI);
                const u12 = new Vec2(theta1 / (2 * Math.PI), phi2 / Math.PI);
                const u22 = new Vec2(theta2 / (2 * Math.PI), phi2 / Math.PI);

                // x--x
                // | /
                // x
                add_vertex(p11, n11, u11);
                add_vertex(p12, n12, u12);
                add_vertex(p21, n21, u21);

                //    x
                //  / |
                // x--x
                add_vertex(p12, n12, u12);
                add_vertex(p22, n22, u22);
                add_vertex(p21, n21, u21);
            }
        }

        this.upload_data(merge_vertex_data([pos, normal, tex], [3, 3, 2]));
    }
}