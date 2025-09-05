import { Joi } from "celebrate";
import { Product } from "./product.model.js";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class OrderItem {
    id: string;
    produto: Product;
    quantidade: number;
    observacao: string;

    constructor(data: OrderItem | any) {
        this.id = data.id;
        this.produto = new Product(data.produto);
        this.quantidade = data.quantidade;
        this.observacao = data.observacao;
    }

    getTotal(): number {
        return this.quantidade * this.produto.preco;
    }

};

export const orderItemSchema = Joi.object().keys({
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    quantidade: Joi.number().integer().positive().required(),
    observacao: Joi.string().trim().allow(null).default(null)
});

export const orderItemConverter: FirestoreDataConverter<OrderItem> = {
    toFirestore: (orderItem: OrderItem): DocumentData => {
        return {
            produto: {
                id: orderItem.produto.id,
                nome: orderItem.produto.nome,
                descricao: orderItem.produto.descricao,
                preco: orderItem.produto.preco,
                imagem: orderItem.produto.imagem,
                categoria: {
                    id: orderItem.produto.categoria.id,
                    descricao: orderItem.produto.categoria.descricao
                }
            },
            quantidade: orderItem.quantidade,
            observacao: orderItem.observacao
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): OrderItem => {
        return new OrderItem({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}