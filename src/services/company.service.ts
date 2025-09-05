import { NotFoundError } from "../errors/not-found.error.js";
import { Company } from "../models/company.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { isStorageValidUrl } from "../utils/validation-utils.js";
import { UploadFileService } from "./upload-file.service.js";

export class CompanyService {
    private companyRepository: CompanyRepository;
    private uploadFileService: UploadFileService;
    
    constructor() {
        this.companyRepository = new CompanyRepository();
        this.uploadFileService = new UploadFileService("image/companies/");
    }

    async getCompanies(): Promise<Company[]> {
        return this.companyRepository.getCompanies();
    }

    async getCompanyById(id: string): Promise<Company> {
        const company = await this.companyRepository.getCompanyById(id);
        if (!company) {
            throw new NotFoundError("Company not found");
        }
        return company;
    }
    
    async createCompany(company: Company) {
        const logomarcaUrl = await this.uploadFileService.upload(company.logomarca);
        company.logomarca = logomarcaUrl;
        await this.companyRepository.createCompany(company);
    }

    async updateCompany(id: string, company: Company){
        const updatedCompany = await this.getCompanyById(id);

        if (!isStorageValidUrl(company.logomarca)) {
            updatedCompany.logomarca = await this.uploadFileService.upload(company.logomarca);
        }

        updatedCompany.logomarca = company.logomarca;
        updatedCompany.cpfCnpj = company.cpfCnpj;
        updatedCompany.razaoSocial = company.razaoSocial;
        updatedCompany.nomeFantasia = company.nomeFantasia;
        updatedCompany.telefone = company.telefone;
        updatedCompany.horarioFuncionamento = company.horarioFuncionamento;
        updatedCompany.endereco = company.endereco;
        updatedCompany.localizacao = company.localizacao;
        updatedCompany.taxaEntrega = company.taxaEntrega;
        updatedCompany.ativa = company.ativa

        await this.companyRepository.updateCompany(updatedCompany);
    }
}