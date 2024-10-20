export function typeof_enum(enum_type: any, variable_to_check: any) {
    return Object.values(enum_type).includes(variable_to_check);
}

export function is_number_2d(variable: any): variable is number[][] {
    if (!Array.isArray(variable)) { return false; }
    if (variable.length == 0) { return false; }
    return variable.every(inner => {
        return Array.isArray(inner) && inner.every(val => {
            return typeof val === 'number';
        });
    });
}