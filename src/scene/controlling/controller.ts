import { EventHandler } from "event";
import { Vec2, Vec3 } from "math";
import { IControllable } from "./icontrollable";

export class Controller implements EventHandler {
    private _controllable: IControllable;

    constructor(controllable?: IControllable) {
        if (controllable) { this._controllable = controllable; }
    }

    set_controllable(controllable: IControllable) { this._controllable = controllable; }

    get_position(): Vec3 { return this._controllable.get_position(); }
    set_position(position: Vec3) { this._controllable.set_position(position); }
    get_direction(): Vec3 { return this._controllable.get_direction(); }
    set_direction(direction: Vec3) { this._controllable.set_direction(direction); }
    get_up(): Vec3 { return this._controllable.get_up(); }
    set_up(up: Vec3) { this._controllable.set_up(up); }

    // can be overridden by subclasses
    on_resize?(width: number, height: number): void;
    on_down?(pos: Vec2, relative_pos: Vec2): void;
    on_up?(): void;
    on_move?(pos: Vec2, relative_pos: Vec2): void;
    on_exit?(): void;
}