export class NotSupportedError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, NotSupportedError.prototype);
    }
}
