import { Vec2 } from "math";
import { EventHandler } from "./eventhandler";

export class EventManager {
    private on_down_event_handlers: any[];
    private on_up_event_handlers: any[];
    private on_move_event_handlers: any[];
    private on_exit_event_handlers: any[];
    private on_resize_event_handlers: any[];

    constructor(canvas: HTMLCanvasElement) {
        this._register_events(canvas);
    }

    register_event_handler(event_handler: EventHandler) {
        if (obj_has_method(event_handler, 'on_down')) {
            this.on_down_event_handlers.push(event_handler);
        }
        if (obj_has_method(event_handler, 'on_up')) {
            this.on_up_event_handlers.push(event_handler);
        }
        if (obj_has_method(event_handler, 'on_move')) {
            this.on_move_event_handlers.push(event_handler);
        }
        if (obj_has_method(event_handler, 'on_exit')) {
            this.on_exit_event_handlers.push(event_handler);
        }
        if (obj_has_method(event_handler, 'on_resize')) {
            this.on_resize_event_handlers.push(event_handler);
        }
    }

    private _register_events(canvas: HTMLCanvasElement) {
        // initialize handler lists
        this.on_down_event_handlers = [];
        this.on_up_event_handlers = [];
        this.on_move_event_handlers = [];
        this.on_exit_event_handlers = [];
        this.on_resize_event_handlers = [];

        const get_mouse_pos = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            return new
                Vec2(x, y);
        }
        const get_touch_pos = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;

            return new
                Vec2(x, y);
        }
        const get_relative_pos = (pos: Vec2) => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            return new Vec2(pos.x / w, pos.y / h);
        }

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === canvas) {
                    const rect = canvas.getBoundingClientRect();
                    for (const handler of this.on_resize_event_handlers) {
                        handler.on_resize(rect.width, rect.height);
                    }
                }
            }
        });
        resizeObserver.observe(canvas);

        canvas.addEventListener('mousedown', (e) => {
            const pos = get_mouse_pos(e);
            const relative_pos = get_relative_pos(pos);
            for (const handler of this.on_down_event_handlers) {
                handler.on_down(pos, relative_pos);
            }
            e.preventDefault();
        }, false);

        canvas.addEventListener('mouseup', (e) => {
            for (const handler of this.on_up_event_handlers) {
                handler.on_up();
            }
            e.preventDefault();
        }, false);

        canvas.addEventListener('mousemove', (e) => {
            const pos = get_mouse_pos(e);
            const relative_pos = get_relative_pos(pos);
            for (const handler of this.on_move_event_handlers) {
                handler.on_move(pos, relative_pos);
            }
            e.preventDefault();
        }, false);

        canvas.addEventListener('mouseleave', (e) => {
            for (const handler of this.on_exit_event_handlers) {
                handler.on_exit();
            }
            e.preventDefault();
        }, false);

        canvas.addEventListener('touchstart', (e) => {
            const pos = get_touch_pos(e);
            const relative_pos = get_relative_pos(pos);
            for (const handler of this.on_down_event_handlers) {
                handler.on_down(pos, relative_pos);
            }
            e.preventDefault();
        }, false);

        canvas.addEventListener('touchmove', (e: TouchEvent) => {
            const pos = get_touch_pos(e);
            const relative_pos = get_relative_pos(pos);
            for (const handler of this.on_move_event_handlers) {
                handler.on_move(pos, relative_pos);
            }
            e.preventDefault();
        }, false);

        canvas.addEventListener('touchend', (e) => {
            for (const handler of this.on_exit_event_handlers) {
                handler.on_exit();
            }
            e.preventDefault();
        }, false);
    }
}

const obj_has_method = (obj: any, method: string) => {
    return typeof obj[method] === 'function';
}