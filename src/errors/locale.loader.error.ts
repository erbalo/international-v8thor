export class LocaleLoaderError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, LocaleLoaderError.prototype);
    }
}
