import express, { Request, Response, NextFunction } from "express";
import { InternalServerError } from "../errors/internal-server.error.js";
import { errors } from "celebrate";
import { BaseError } from "../errors/base.error.js";

export const errorHandler = (app: express.Express) => {
    app.use(errors());
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        // Log details to terminal for visibility
        console.error("[ERROR]", {
            message: error.message,
            stack: error.stack,
            method: req.method,
            path: req.path
        });

        if (error instanceof BaseError) {
            return error.send(res);
        }

        // In non-production, include stack for easier debugging
        if (process.env.NODE_ENV !== "production") {
            return res.status(500).send({ error: error.message, stack: error.stack });
        }

        return new InternalServerError().send(res);
    });
}
