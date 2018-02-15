export class LimitException extends Error {
    constructor(...params) {
        super(...params);
        this.name = `LimitException`;
    }
}