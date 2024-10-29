import { clamp, Vec2, Vec3 } from "common/math";
import { Controller } from "../controller";

export class OrbitController extends Controller {
    private radius: number;
    private theta: number;
    private phi: number;
    private target: Vec3;

    private active: boolean;
    private last_pos: Vec2;

    constructor(target: Vec3 = new Vec3(0), radius: number, theta: number = 0, phi: number = 90) {
        super();
        this.radius = radius;
        this.theta = theta;
        this.phi = phi;
        this.target = target;
        this._update();
    }

    rotate(dx: number, dy: number) {
        // const d_theta = dx * 2 * Math.PI;
        // const d_phi = dy * Math.PI;
        const fov = Math.PI / 180;
        const d_theta = dx * fov;
        const d_phi = dy * fov;

        this.theta += d_theta;
        this.phi -= d_phi;

        this.phi = clamp(this.phi, 1e-4, Math.PI - 1e-4);
        this.theta = this.theta % (2 * Math.PI);

        this._update();
    }
    zoom(s: number) {
        this.radius += s;
        this.radius = clamp(this.radius, 1e-4, 1000);
    
        this._update();
    }

    get_radius(): number { return this.radius; }
    set_radius(radius: number) { 
        this.radius = radius; 
        this._update(); 
    }
    get_theta(): number { return this.theta; }
    set_theta(theta: number) { 
        this.theta = theta;
        this._update();  
    }
    get_phi(): number { return this.phi; }
    set_phi(phi: number) { 
        this.phi = phi;
        this._update();  
    }

    on_down(pos: Vec2, relative_pos: Vec2) {
        this.active = true;
        this.last_pos = relative_pos;
    }
    on_up() {
        this.active = false;
    }
    on_exit() {
        this.active = false;
    }
    on_move(_: Vec2, relative_pos: Vec2) {
        if (!this.active) { return; }

        const direction = relative_pos.sub(this.last_pos);
        this.rotate(direction.x, direction.y);
        this.last_pos = relative_pos;
    }

    private _update() {
        const x = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
        const y = this.radius * Math.cos(this.phi);
        const z = this.radius * Math.sin(this.phi) * Math.sin(this.theta);

        const position = new Vec3(x, y, z).add(this.target);
        const direction = position.sub(this.target).normalize();
        const up = new Vec3(0, 1, 0);

        this.set_position(position);
        this.set_direction(direction);
        this.set_up(up);
    }
}