export type MatData = number|number[]|number[][];

export const is_array = (value: any): value is number[] => {
    return Array.isArray(value) && value.every(item => typeof item === 'number');
}
export const is_matrix = (value: any): value is number[][] => {
    return Array.isArray(value) && value.every(is_array);
}