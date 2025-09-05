import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod, paymentMethodConverter } from "../models/payment-method.model.js";

export class PaymentMethodRepository {

    private collection: CollectionReference<PaymentMethod>;
    
    constructor() {
        this.collection = getFirestore()
        .collection("payment-methods")
        .withConverter(paymentMethodConverter);
    }

    async getPaymentMethods(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getPaymentMethodById(id: string): Promise<PaymentMethod | null> {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }

    async createPaymentMethod(paymentMethod: PaymentMethod) {
        await this.collection.add(paymentMethod);
    }

    async updatePaymentMethod(paymentMethod: PaymentMethod) {
        await this.collection
        .doc(paymentMethod.id)
        .set(paymentMethod);
    }

    async deletePaymentMethod(id: string) {
        await this.collection.doc(id).delete();
    }
}