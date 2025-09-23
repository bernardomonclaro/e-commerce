import express, { Router } from "express";
import { authRoutes } from "./auth.route.js";
import { userRoutes } from "./users.route.js";
import { companyRoutes } from "./companies.route.js";
import { categoryRoutes } from "./categories.route.js";
import { productRoutes } from "./products.route.js";
import { paymentMethodRoutes } from "./payment-methods.route.js";
import { orderRoutes } from "./orders.route.js";
import { allowAnonymousUser } from "../middlewares/allow-anonymous-user.middleware.js";

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "5mb" }));
    app.use(authRoutes);
    app.use(allowAnonymousUser);

    const authenticateRoutes = Router();
    authenticateRoutes.use(userRoutes);
    authenticateRoutes.use(companyRoutes);
    authenticateRoutes.use(categoryRoutes);
    authenticateRoutes.use(productRoutes);
    authenticateRoutes.use(paymentMethodRoutes);
    authenticateRoutes.use(orderRoutes);
    app.use(
        // #swagger.security = [{ "bearerAuth": [] }]
        authenticateRoutes
    )
}