import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";

export class PaymentMethodService {
    private paymentMethodRepository: PaymentMethodRepository;
    
    constructor() {
        this.paymentMethodRepository = new PaymentMethodRepository();
    }

    async getPaymentMethods(): Promise<PaymentMethod[]> {
        return this.paymentMethodRepository.getPaymentMethods();
    }

    async getPaymentMethodById(id: string): Promise<PaymentMethod> {
        const paymentMethod = await this.paymentMethodRepository.getPaymentMethodById(id);
        if (!paymentMethod) {
            throw new NotFoundError("PaymentMethod not found");
        }
        return paymentMethod;
    }
    
    async createPaymentMethod(paymentMethod: PaymentMethod){
        return this.paymentMethodRepository.createPaymentMethod(paymentMethod);
    }

    async updatePaymentMethod(id: string, paymentMethod: PaymentMethod){
        const updatedPaymentMethod = await this.getPaymentMethodById(id);

        updatedPaymentMethod.descricao = paymentMethod.descricao;
        updatedPaymentMethod.ativo = paymentMethod.ativo;

        await this.paymentMethodRepository.updatePaymentMethod(updatedPaymentMethod);
    }

    async deletePaymentMethod(id: string){
        const paymentMethod = await this.paymentMethodRepository.getPaymentMethodById(id);
        if (!paymentMethod) {
            throw new NotFoundError("PaymentMethod not found");
        }
        
        await this.paymentMethodRepository.deletePaymentMethod(id);
    }
}