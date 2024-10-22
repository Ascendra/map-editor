export class UtilityService {
    static randomInt(start: number, end: number) {
        const minimum = Math.ceil(start);
        const maximum = Math.ceil(end);

        return Math.floor(Math.random() * (maximum - minimum) + minimum);
    }

    static assert(condition: boolean, message: string): asserts condition {
        if (!condition) {
            throw new Error(message);
        }
    }
}
