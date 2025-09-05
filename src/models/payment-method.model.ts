import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";
import Joi from "joi";

export class PaymentMethod {
    id: string;
    descricao: string;
    ativo: boolean;

    constructor(data: PaymentMethod | any) {
        this.id = data.id;
        this.descricao = data.descricao;
        this.ativo = data.ativa ?? true;
    }
};

export const newPaymentSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativo: Joi.boolean().only().allow(true).default(true)
});

export const updatePaymentSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativo: Joi.boolean().required()
});

export const paymentMethodConverter: FirestoreDataConverter<PaymentMethod> = {
    toFirestore: (paymentMethod: PaymentMethod): DocumentData => {
        return {
            descricao: paymentMethod.descricao,
            ativo: paymentMethod.ativo
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): PaymentMethod => {
        return new PaymentMethod({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}