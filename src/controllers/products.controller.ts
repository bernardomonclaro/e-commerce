import { Request, Response } from "express";
import { Product, QueryParamsProduct } from "../models/product.model.js";
import { ProductService } from "../services/product.service.js";

export class ProductsController {

    static async getProducts(req: Request, res: Response) {
        const products = await new ProductService().getProducts(req.query as QueryParamsProduct)
        res.send(products);
    }

    static async getProductById(req: Request, res: Response) {
        res.send(await new ProductService().getProductById(req.params.id));
    }

    static async createProduct(req: Request, res: Response) {
        await new ProductService().createProduct(req.body as Product);
        res.status(201).send({ message: "Product created successfully" });
    }

    static async updateProduct(req: Request, res: Response) { 
        await new ProductService().updateProduct(req.params.id, req.body as Product);
        res.send({ message: "Product updated successfully" });
    }

    static async deleteProduct(req: Request, res: Response) {
        await new ProductService().deleteProduct(req.params.id);
        res.send({ message: "Product deleted successfully" });
    }
}