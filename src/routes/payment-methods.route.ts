import { Router } from "express";
import asyncHandler from "express-async-handler";
import { PaymentMethodsController } from "../controllers/payment-methods.controller.js";
import { celebrate, Segments } from "celebrate";
import { newPaymentSchema, updatePaymentSchema } from "../models/payment-method.model.js";

export const paymentMethodRoutes = Router();

paymentMethodRoutes.get("/payment-methods", asyncHandler(PaymentMethodsController.getPaymentMethods));
paymentMethodRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodsController.getPaymentMethodById));
paymentMethodRoutes.post("/payment-methods", celebrate({ [Segments.BODY]: newPaymentSchema }), asyncHandler(PaymentMethodsController.createPaymentMethod));
paymentMethodRoutes.put("/payment-methods/:id", celebrate({ [Segments.BODY]: updatePaymentSchema }), asyncHandler(PaymentMethodsController.updatePaymentMethod));
paymentMethodRoutes.delete("/payment-methods/:id", asyncHandler(PaymentMethodsController.deletePaymentMethod));