import { look_at, Mat4, Vec3 } from 'common/math';
import { IControllable } from 'sgrenderer/controlling';

export class Camera implements IControllable {
    private pos: Vec3;
    
    private direction: Vec3;
    private up: Vec3;
    private right: Vec3;

    private view: Mat4;
    private projection: Mat4;

    constructor() {
        this.pos = new Vec3(0, 0, 0);
        this.direction = new Vec3(0, 0, -1);
        this.up = new Vec3(0, 1, 0);
        this.right = new Vec3(1, 0, 0);

        this.view = Mat4.identity();
        this.projection = Mat4.identity();

        this.update_view();
    }

    get_position(): Vec3 { return this.pos; }
    set_position(pos: Vec3) { this.pos = pos; this.update_view(); }

    get_direction(): Vec3 { return this.direction; }
    set_direction(direction: Vec3) { this.direction = direction; this.update_view(); }
    get_right(): Vec3 { return this.right; }
    set_right(right: Vec3) { this.right = right; this.update_view(); }
    get_up(): Vec3 { return this.up; }
    set_up(up: Vec3) { this.up = up; this.update_view(); }

    get_view(): Mat4 { return this.view; }
    set_view(view: Mat4) { this.view = view; }
    get_projection(): Mat4 { return this.projection; }
    set_projection(projection: Mat4) { this.projection = projection; }

    update_view() {
        this.view = look_at(this.pos, this.pos.add(this.direction), this.up);
    }
}