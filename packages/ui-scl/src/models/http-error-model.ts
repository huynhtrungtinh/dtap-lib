export class HttpError extends Error {
    message: any;
    status: number;
    body: any;
    name: string
    constructor(message: any, status: number, body = null) {
        super(message);
        this.message = message;
        this.status = status;
        this.body = body;
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
    }
}
