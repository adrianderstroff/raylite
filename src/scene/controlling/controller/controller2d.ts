import { rotate_vector_axis_angle, Vec2, Vec3 } from "math";
import { Controller } from "../controller";

export class Controller2D extends Controller {
    private _pos: Vec3;
    private _up: Vec3;

    private active: boolean;
    private last_pos: Vec2;

    constructor(pos: Vec3 = new Vec3(0), radius: number, theta: number = 0, phi: number = 90) {
        super();
        this._pos = pos;
        this._up = new Vec3(0, 1, 0);
        this._update();
    }

    rotate(dx: number, dy: number) {
        const d_theta = dx * Math.PI / 180;
        this._up = rotate_vector_axis_angle(this._up, new Vec3(0, 0, 1), d_theta);
        this._update();
    }

    on_down(_: Vec2, relative_pos: Vec2) {
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
        this._pos = this._pos.add(new Vec3(direction.x, direction.y, 0));
        this.last_pos = relative_pos;
    }

    private _update() {
        const position = this._pos;
        const direction = new Vec3(0, 0, -1);
        const up = this._up;

        this.set_position(position);
        this.set_direction(direction);
        this.set_up(up);
    }
}