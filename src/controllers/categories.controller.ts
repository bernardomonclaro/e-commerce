import { Request, Response } from "express";
import { Category } from "../models/category.model.js";
import { CategoryService } from "../services/category.service.js";

export class CategoriesController {
    static async getCategories(req: Request, res: Response) {
        res.send(await new CategoryService().getCategories());
    }

    static async getCategoryById(req: Request, res: Response){
        res.send(await new CategoryService().getCategoryById(req.params.id));
    }

    static async createCategory(req: Request, res: Response) {
        await new CategoryService().createCategory(req.body as Category);
        res.status(201).send({ message: "Category created successfully" });
    }

    static async updateCategory(req: Request, res: Response) { 
        await new CategoryService().updateCategory(req.params.id, req.body as Category);
        res.send({ message: "Category updated successfully" });
    }

    static async deleteCategory(req: Request, res: Response) {
        await new CategoryService().deleteCategory(req.params.id);
        res.send({ message: "Category deleted successfully" });
    }
}