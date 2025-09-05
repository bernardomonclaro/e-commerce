import { Response } from "express";

export class BaseError extends Error {
    constructor(message: string, private statusCode: number) {
        super(message);
    }

    send(res: Response) {
        res.status(this.statusCode).send({ error: this.message });
    }
}