import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company, companyConverter } from "../models/company.model.js";

export class CompanyRepository {

    private collection: CollectionReference<Company>;
    
    constructor() {
        this.collection = getFirestore()
            .collection("companies")
            .withConverter(companyConverter);
    }

    async getCompanies(): Promise<Company[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getCompanyById(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }

    async createCompany(company: Company) {
        await this.collection.add(company);
    }

    async updateCompany(company: Company) {
        await this.collection
        .doc(company.id)
        .set(company);
    }
}
