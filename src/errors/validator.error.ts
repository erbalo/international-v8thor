export class ValidatorError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, ValidatorError.prototype);
    }
}
