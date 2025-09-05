import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newProductSchema, searchQuerySchema, updateProductSchema } from "../models/product.model.js";

export const productRoutes = Router();

productRoutes.get("/products", celebrate({ [Segments.QUERY]: searchQuerySchema }), asyncHandler(ProductsController.getProducts));
productRoutes.get("/products/:id", asyncHandler(ProductsController.getProductById));
productRoutes.post("/products", celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.createProduct));
productRoutes.put("/products/:id", celebrate({ [Segments.BODY]: updateProductSchema }), asyncHandler(ProductsController.updateProduct));
productRoutes.delete("/products/:id", asyncHandler(ProductsController.deleteProduct));