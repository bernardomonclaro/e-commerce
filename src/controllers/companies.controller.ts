import { Request, Response } from "express";
import { Company } from "../models/company.model.js";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
    static async getCompanies(req: Request, res: Response) {
        /*  #swagger.tags = ['Companies']
            #swagger.summary = 'Obtenha todas as empresas cadastradas'
            #swagger.description = 'Obtenha todas as empresas cadastradas.'
        */
        res.send(await new CompanyService().getCompanies());
    }

    static async getCompanyById(req: Request, res: Response){
        /*  #swagger.tags = ['Companies']
            #swagger.summary = 'Busque uma empresa pelo id'
            #swagger.description = 'Obtenha uma empresa pelo id.'
        */
        res.send(await new CompanyService().getCompanyById(req.params.id));
    }

    static async createCompany(req: Request, res: Response) {
        /*  #swagger.tags = ['Companies']
            #swagger.summary = 'Crie uma nova empresa'
            #swagger.description = 'Crie uma nova empresa.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addCompany"
                        }  
                    }
                }
            }
        */
        await new CompanyService().createCompany(req.body as Company);
        res.status(201).send({ message: "Company created successfully" });
    }

    static async updateCompany(req: Request, res: Response) {
        /*  #swagger.tags = ['Companies']
            #swagger.summary = 'Atualize os dados da empresa'
            #swagger.description = 'Atualize os dados de uma empresa específica.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/updateCompany"
                        }  
                    }
                }
            }
        */
        await new CompanyService().updateCompany(req.params.id, req.body as Company);
        res.send({ message: "Company updated successfully" });
    }

}