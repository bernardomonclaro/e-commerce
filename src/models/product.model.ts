import { Joi } from "celebrate";
import { Category } from "./category.model.js";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";


export class Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Category;
    ativo: boolean;

    constructor(data: Product | any) {
        this.id = data.id;
        this.nome = data.nome;
        this.descricao = data.descricao;
        this.preco = data.preco;
        this.imagem = data.imagem;
        this.categoria = new Category(data.categoria);
        this.ativo = data.ativo ?? true;
    }
};

export const newProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.string().base64().allow(null).default(null),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativo: Joi.boolean().only().allow(true).default(true)
});

export const updateProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.alternatives().try(
        Joi.string().base64(),
        Joi.string().uri()
    ).allow(null).default(null),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativo: Joi.boolean().required()
});

export const searchQuerySchema = Joi.object().keys({
    categoriaId: Joi.string().trim()
});

export type QueryParamsProduct = {
    categoriaId?: string;
}

export const productConverter: FirestoreDataConverter<Product> = {
    toFirestore: (product: Product): DocumentData => {
        return {
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            imagem: product.imagem,
            categoria: {
                id: product.categoria.id,
                descricao: product.categoria.descricao
            },
            ativo: product.ativo
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Product => {
        return new Product({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}
