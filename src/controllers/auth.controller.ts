import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
    static async login(req: Request, res: Response) {
        const UserRecord = await new AuthService().login(req.body.email, req.body.password);
        const token = await UserRecord.user.getIdToken(true);
        res.send({ token: token });
    }

    static async recovery(req: Request, res: Response) {
        const email = req.body.email;
        await new AuthService().recovery(email);
        res.status(200).send({ message: "Recovery email sent" });
    }

    static async signin(req: Request, res: Response) {
        const userRecord = await new AuthService().signin();
        const token = await userRecord.user.getIdToken(true);
        res.send({ token: token });
    }
}