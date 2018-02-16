export class NoSolutionException extends Error {
    constructor() {
        super();
        this.name = `NoSolutionException`;
    }
}