export const getHoverFocusStateClasses = (baseClasses: string[], group = false): string => {
    const prefix = group ? 'group-' : '';

    const states = [
        `${prefix}hover`,
        `${prefix}focus`,
        `${prefix}focus-within`,
    ];

    return baseClasses
        .flatMap(baseClass => states.map(state => `${state}:${baseClass}`))
        .join(' ');
};