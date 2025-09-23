import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
    static async getUsers(req: Request, res: Response) {
        /*  #swagger.tags = ['Users']
            #swagger.summary = 'Obtenha todos os usuários cadastrados'
            #swagger.description = 'Obtenha todos os usuários da empresa.'
            #swagger.responses[200] = {
                description: 'Lista de todos os usuários',
                content: {
                    "application/json": {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/User'
                            }
                        }
                    }
                }
            }
        */
        res.send(await new UserService().getUsers());
    }

    static async getUserById(req: Request, res: Response){
        /*  #swagger.tags = ['Users']
            #swagger.summary = 'Busque um usuário pelo id'
            #swagger.description = 'Obtenha um usuário pelo id.'
            #swagger.parameters['id'] = { description: 'Id do usuário' }
            #swagger.responses[200] = {
                description: 'Dados do usuário',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            }
        */
        res.send(await new UserService().getUserById(req.params.id));
    }

    static async createUser(req: Request, res: Response) {
        /*  #swagger.tags = ['Users']
            #swagger.summary = 'Crie um novo usuário'
            #swagger.description = 'Crie um novo usuário para acessar as funcionalidades da empresa.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addUser"
                        }  
                    }
                }
            }
        */
        await new UserService().createUser(req.body as User);
        res.status(201).send({ message: "User created successfully" });
    }

    static async updateUser(req: Request, res: Response) {
        /*  #swagger.tags = ['Users']
            #swagger.summary = 'Atualize os dados do usuário'
            #swagger.description = 'Atualize os dados de um usuário específico.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/updateUser"
                        }  
                    }
                }
            }
        */
        await new UserService().updateUser(req.params.id, req.body as User);
        res.send({ message: "User updated successfully" });
    }

    static async deleteUser(req: Request, res: Response) {
        /*  #swagger.tags = ['Users']
            #swagger.summary = 'Exclua um usuário'
            #swagger.description = 'Exclua um usuário pelo id.<br><br><b>Obs.:</b> <i>Essa ação é irreversível. Após excluído não será possível recuperar os dados do usuário.</i>'
        */  
        await new UserService().deleteUser(req.params.id);
        res.send({message: "User deleted successfully"});
    }
}