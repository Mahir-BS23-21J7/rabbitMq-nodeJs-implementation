export class AuthenticationError extends Error {
    public status: number = 403
    constructor(message: string = "") {
        super(message || 'Authentication Error');
        this.name = this.constructor.name
    }
}
