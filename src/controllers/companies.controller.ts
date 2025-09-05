import { Request, Response } from "express";
import { Company } from "../models/company.model.js";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
    static async getCompanies(req: Request, res: Response) {
        res.send(await new CompanyService().getCompanies());
    }

    static async getCompanyById(req: Request, res: Response){
        res.send(await new CompanyService().getCompanyById(req.params.id));
    }

    static async createCompany(req: Request, res: Response) {
        await new CompanyService().createCompany(req.body as Company);
        res.status(201).send({ message: "Company created successfully" });
    }

    static async updateCompany(req: Request, res: Response) { 
        await new CompanyService().updateCompany(req.params.id, req.body as Company);
        res.send({ message: "Company updated successfully" });
    }

}