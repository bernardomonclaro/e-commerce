import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
    static async getUsers(req: Request, res: Response) {
        res.send(await new UserService().getUsers());
    }

    static async getUserById(req: Request, res: Response){
        res.send(await new UserService().getUserById(req.params.id));
    }

    static async createUser(req: Request, res: Response) {
        await new UserService().createUser(req.body as User);
        res.status(201).send({ message: "User created successfully" });
    }

    static async updateUser(req: Request, res: Response) { 
        await new UserService().updateUser(req.params.id, req.body as User);
        res.send({ message: "User updated successfully" });
    }

    static async deleteUser(req: Request, res: Response) {
        await new UserService().deleteUser(req.params.id);
        res.send({message: "User deleted successfully"});
    }
}