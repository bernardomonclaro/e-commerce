import { BaseError } from "./base.error.js";

export class EmailAlreadyExistsError extends BaseError {
    constructor(message: string = "Email Already Exists") {
        super(message, 409);
    }
}