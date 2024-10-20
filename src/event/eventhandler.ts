import { Vec2 } from "math";

export interface EventHandler {
    on_resize?(width: number, height: number): void;
    // mouse events
    on_down?(pos: Vec2, relative_pos: Vec2): void;
    on_up?(): void;
    on_move?(pos: Vec2, relative_pos: Vec2): void;
    on_exit?(): void;
}