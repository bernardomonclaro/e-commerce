import { BaseError } from "./base.error.js";

export class NotFoundError extends BaseError {
    constructor(message: string = "Not Found") {
        super(message, 404);
    }
}