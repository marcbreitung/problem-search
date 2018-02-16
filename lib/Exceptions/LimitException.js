export class LimitException extends Error {
    constructor() {
        super();
        this.name = `LimitException`;
    }
}