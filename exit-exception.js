export class ExitException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExitException';
    }

}