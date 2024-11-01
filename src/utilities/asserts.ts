export function asserts(condition: boolean): asserts condition {
    if (!condition) {
        throw new Error("Assertion failed");
    }
}
