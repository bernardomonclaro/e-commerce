import { Request, Response } from "express";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { OrderService } from "../services/order.service.js";

export class OrdersController {
    static async createOrder(req: Request, res: Response) {
        const order = new Order(req.body);
        await new OrderService().createOrder(order);
        res.status(201).send({ message: "Order created successfully" });
    }

    static async search(req: Request, res: Response) {
        const orders = await new OrderService().search(req.query as QueryParamsOrder);
        res.send(orders);
    }

    static async getItens(req: Request, res: Response) {
        const itens = await new OrderService().getItens(req.params.id);
        res.send(itens);        
    }

    static async getOrderById(req: Request, res: Response) {
        const order = await new OrderService().getOrderById(req.params.id);
        res.send(order);        
    }

    static async changeStatus(req: Request, res: Response) {
        await new OrderService().changeStatus(req.params.id, req.body.status);
        res.status(204).end();        
    }
}