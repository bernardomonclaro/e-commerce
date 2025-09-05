import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Product, productConverter, QueryParamsProduct } from "../models/product.model.js";

export class ProductRepository {

    private collection: CollectionReference<Product>;
    
    constructor() {
        this.collection = getFirestore()
        .collection("products")
        .withConverter(productConverter);
    }

    async getProducts(queryParams: QueryParamsProduct): Promise<Product[]> {
        let query: FirebaseFirestore.Query<Product> = this.collection;
        
        if (queryParams.categoriaId) {
            query = query.where("categoria.id", "==", queryParams.categoriaId)
        }
        
        const snapshot = await query.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getProductById(id: string): Promise<Product | null> {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }

    async createProduct(product: Product) {
        await this.collection.add(product);
    }

    async updateProduct(product: Product) {
        await this.collection.doc(product.id).set(product);
    }

    async deleteProduct(id: string) {
        await this.collection.doc(id).delete();
    }

    async getCountByCategory(categoriaId: string) {
        const countSnapshot = await this.collection
            .where("categoria.id", "==", categoriaId)
            .count()
            .get();
        return countSnapshot.data().count;
    }
}

