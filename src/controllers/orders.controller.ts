import { Request, Response } from "express";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { OrderService } from "../services/order.service.js";

export class OrdersController {
    static async createOrder(req: Request, res: Response) {
        /* #swagger.tags = ['Orders']
            #swagger.summary = 'Crie um novo pedido'
            #swagger.description = 'Crie um novo pedido na empresa. Essa funcionalidade deverá ser usada pelo cliente para realização de pedidos sem a necessidade de cadastro na plataforma.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addOrder"
                        }  
                    }
                }
            }
        */
        const order = new Order(req.body);
        await new OrderService().createOrder(order);
        res.status(201).send({ message: "Order created successfully" });
    }

    static async search(req: Request, res: Response) {
        /*  #swagger.tags = ['Orders']
            #swagger.description = 'Pesquisa de pedidos usando filtro'
            #swagger.summary = 'Pesquisa de pedidos usando filtros'
            #swagger.description = 'Pesquise pedidos usando filtros de: Empresa, Período de data e Status. Você pode usar apenas um filtro ou combinar todos na mesma busca.'
            #swagger.parameters['$ref'] = [
                '#components/parameters/empresaId', 
                '#components/parameters/dataInicio',
                '#components/parameters/dataFim',
                '#components/parameters/orderStatus'
            ]
        */
        const orders = await new OrderService().search(req.query as QueryParamsOrder);
        res.send(orders);
    }

    static async getItems(req: Request, res: Response) {
        /*  #swagger.tags = ['Orders']
            #swagger.description = 'Obtenha os itens de um pedido'
            #swagger.description = 'Obtenha todos os itens de um pedido através id do pedido.'
        */
        const itens = await new OrderService().getItems(req.params.id);
        res.send(itens);        
    }

    static async getOrderById(req: Request, res: Response) {
        /* #swagger.tags = ['Orders']
           #swagger.description = 'Obtenha um pedido pelo id'
           #swagger.description = 'Obtenha todos os dados de um pedido através do id, incluindo os itens.'
        */
        const order = await new OrderService().getOrderById(req.params.id);
        res.send(order);        
    }

    static async changeStatus(req: Request, res: Response) {
        /*  #swagger.tags = ['Orders']
            #swagger.summary = 'Atualize o status do pedido'
            #swagger.description = 'Atualize o status de um pedido através do id.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/updateOrderStatus"
                        }  
                    }
                }
            }
        */
        await new OrderService().changeStatus(req.params.id, req.body.status);
        res.status(204).end();        
    }
}