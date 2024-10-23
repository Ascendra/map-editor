export const randomInt = (start: number, end: number): number => {
    const minimum = Math.ceil(start);
    const maximum = Math.ceil(end);

    return Math.floor(Math.random() * (maximum - minimum) + minimum);
};
