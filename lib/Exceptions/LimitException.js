export class LimitException extends Error {
    constructor(message) {
        super(message);
        this.name = `LimitException`;
    }
}