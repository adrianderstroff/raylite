import { Vec3 } from "common/math";

export interface IControllable {
    get_position(): Vec3;
    set_position(pos: Vec3): void;
    get_direction(): Vec3;
    set_direction(direction: Vec3): void;
    get_up(): Vec3;
    set_up(up: Vec3): void;
}