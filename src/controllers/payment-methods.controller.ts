import { Request, Response } from "express";
import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodService } from "../services/payment-method.service.js";

export class PaymentMethodsController {
    static async getPaymentMethods(req: Request, res: Response) {
        /*  #swagger.tags = ['Payment Methods']
            #swagger.summary = 'Obtenha todas as formas de pagamento cadastradas'
            #swagger.description = 'Obtenha todas as formas de pagamento da empresa'
        */
        res.send(await new PaymentMethodService().getPaymentMethods());
    }

    static async getPaymentMethodById(req: Request, res: Response){
        /*  #swagger.tags = ['Payment Methods']
            #swagger.summary = 'Obtenha uma forma de pagamento pelo id'
            #swagger.description = 'Obtenha um método de pagamento pelo id'
        */
        res.send(await new PaymentMethodService().getPaymentMethodById(req.params.id));
    }

    static async createPaymentMethod(req: Request, res: Response) {
        /* #swagger.tags = ['Payment Methods']
            #swagger.summary = 'Crie uma nova forma de pagamento'
            #swagger.description = 'Crie um novo método de pagamento'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addPaymentMethod"
                        }  
                    }
                }
            }
        */

        await new PaymentMethodService().createPaymentMethod(req.body as PaymentMethod);
        res.status(201).send({ message: "PaymentMethod created successfully" });
    }

    static async updatePaymentMethod(req: Request, res: Response) {
        /* #swagger.tags = ['Payment Methods']
            #swagger.summary = 'Atualize os dados da forma de pagamento'
            #swagger.description = 'Atualize os dados de uma forma de pagamento específica.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/updatePaymentMethod"
                        }  
                    }
                }
            }
        */
        await new PaymentMethodService().updatePaymentMethod(req.params.id, req.body as PaymentMethod);
        res.send({ message: "PaymentMethod updated successfully" });
    }

    static async deletePaymentMethod(req: Request, res: Response) {
        /*  #swagger.tags = ['Payment Methods']
            #swagger.summary = 'Exclua uma forma de pagamento'
            #swagger.description = 'Exclua uma forma de pagamento pelo id.'
        */
        await new PaymentMethodService().deletePaymentMethod(req.params.id);
        res.send({ message: "PaymentMethod deleted successfully" });
    }
}