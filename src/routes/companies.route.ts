import { Router } from "express";
import { CompaniesController } from "../controllers/companies.controller.js";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newCompanySchema, updateCompanySchema } from "../models/company.model.js";

export const companyRoutes = Router();

companyRoutes.get("/companies", asyncHandler(CompaniesController.getCompanies));
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getCompanyById));
companyRoutes.post("/companies", celebrate({ [Segments.BODY]: newCompanySchema }), asyncHandler(CompaniesController.createCompany));
companyRoutes.put("/companies/:id", celebrate({ [Segments.BODY]: updateCompanySchema }), asyncHandler(CompaniesController.updateCompany));
