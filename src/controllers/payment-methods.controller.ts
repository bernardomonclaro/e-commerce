import { Request, Response } from "express";
import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodService } from "../services/payment-method.service.js";

export class PaymentMethodsController {
    static async getPaymentMethods(req: Request, res: Response) {
        res.send(await new PaymentMethodService().getPaymentMethods());
    }

    static async getPaymentMethodById(req: Request, res: Response){
        res.send(await new PaymentMethodService().getPaymentMethodById(req.params.id));
    }

    static async createPaymentMethod(req: Request, res: Response) {
        await new PaymentMethodService().createPaymentMethod(req.body as PaymentMethod);
        res.status(201).send({ message: "PaymentMethod created successfully" });
    }

    static async updatePaymentMethod(req: Request, res: Response) { 
        await new PaymentMethodService().updatePaymentMethod(req.params.id, req.body as PaymentMethod);
        res.send({ message: "PaymentMethod updated successfully" });
    }

    static async deletePaymentMethod(req: Request, res: Response) {
        await new PaymentMethodService().deletePaymentMethod(req.params.id);
        res.send({ message: "PaymentMethod deleted successfully" });
    }
}