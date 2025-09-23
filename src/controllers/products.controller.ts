import { Request, Response } from "express";
import { Product, QueryParamsProduct } from "../models/product.model.js";
import { ProductService } from "../services/product.service.js";

export class ProductsController {

    static async getProducts(req: Request, res: Response) {
        /*  #swagger.tags = ['Products']
            #swagger.summary = 'Obtenha todos os produtos cadastradas'
            #swagger.description = 'Obtenha todos os produtos da empresa. Filtre por categoria se desejar.'
            #swagger.parameters['$ref'] = [ '#/components/parameters/categoriaId' ]
        */
        const products = await new ProductService().getProducts(req.query as QueryParamsProduct)
        res.send(products);
    }

    static async getProductById(req: Request, res: Response) {
        /*  #swagger.tags = ['Products']
            #swagger.summary = 'Busque um produto pelo id'
            #swagger.description = 'Obtenha um produto pelo id.'
        */
        res.send(await new ProductService().getProductById(req.params.id));
    }

    static async createProduct(req: Request, res: Response) {
        /*  #swagger.tags = ['Products']
            #swagger.summary = 'Crie um novo produto'
            #swagger.description = 'Adicione um novo produto ao catálogo de produtos da empresa.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addProduct"
                        }  
                    }
                }
            }
        */
        await new ProductService().createProduct(req.body as Product);
        res.status(201).send({ message: "Product created successfully" });
    }

    static async updateProduct(req: Request, res: Response) { 
        /*  #swagger.tags = ['Products']
            #swagger.summary = 'Atualize os dados do produto'
            #swagger.description = 'Atualize os dados de um produto específico.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/updateProduct"
                        }  
                    }
                }
            }
        */
        await new ProductService().updateProduct(req.params.id, req.body as Product);
        res.send({ message: "Product updated successfully" });
    }

    static async deleteProduct(req: Request, res: Response) {
        /*  #swagger.tags = ['Products']
            #swagger.summary = 'Exclua um produto'
            #swagger.description = 'Exclua um produto pelo id.'
        */
        await new ProductService().deleteProduct(req.params.id);
        res.send({ message: "Product deleted successfully" });
    }
}