export const deg_to_rad = (angle: number): number => {
    return angle * Math.PI / 180.0;
}

export const rad_to_deg = (angle: number): number => {
    return angle * 180.0 / Math.PI;
}

export const clamp = (value: number, v_min: number, v_max: number) => {
    return Math.max(v_min, Math.min(value, v_max));
}

export const rand = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

export const rand_int = (min: number, max: number): number => {
    return Math.floor(rand(min, max));
}