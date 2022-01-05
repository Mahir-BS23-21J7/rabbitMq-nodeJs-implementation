export class ValidationError extends Error {
    public status: number = 400
    public errors: any = []
    constructor(message: string, errors: any = []) {
        super(message || 'Validation Error');
        this.name = this.constructor.name
        this.errors = errors
    }
}
