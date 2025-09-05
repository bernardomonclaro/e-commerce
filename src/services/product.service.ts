import { NotFoundError } from "../errors/not-found.error.js";
import { Product, QueryParamsProduct } from "../models/product.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { isStorageValidUrl } from "../utils/validation-utils.js";
import { UploadFileService } from "./upload-file.service.js";

export class ProductService {
    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;
    private uploadFileService: UploadFileService;

    
    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.uploadFileService = new UploadFileService("image/products/");
        
    }

    async getProducts(query: QueryParamsProduct): Promise<Product[]> {
        return this.productRepository.getProducts(query);
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return product;
    }
    
    async createProduct(product: Product) {
        const category = await this.getCategoryById(product.categoria.id);
        product.categoria = category;
        
        if (product.imagem) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }
        return this.productRepository.createProduct(product);
    }

    async updateProduct(id: string, product: Product) {
        const updatedProduct = await this.getProductById(id);
        const category = await this.getCategoryById(product.categoria.id);
        
        if (product.imagem && !isStorageValidUrl(product.imagem)) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }

        updatedProduct.nome = product.nome;
        updatedProduct.descricao = product.descricao;
        updatedProduct.imagem = product.imagem;
        updatedProduct.preco = product.preco;
        updatedProduct.categoria = category;
        updatedProduct.ativo = product.ativo;

        await this.productRepository.updateProduct(updatedProduct);
    }

    private async getCategoryById(id: string) {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        return category;
    }

    async deleteProduct(id: string) {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        
        await this.productRepository.deleteProduct(id);
    }
}