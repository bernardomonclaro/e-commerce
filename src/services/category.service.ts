import { NotFoundError } from "../errors/not-found.error.js";
import { Category } from "../models/category.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class CategoryService {
    private categoryRepository: CategoryRepository;
    private productRepository: ProductRepository;
    
    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productRepository = new ProductRepository();
    }

    async getCategories(): Promise<Category[]> {
        return this.categoryRepository.getCategories();
    }

    async getCategoryById(id: string): Promise<Category> {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        return category;
    }
    
    async createCategory(category: Category){
        return this.categoryRepository.createCategory(category);
    }

    async updateCategory(id: string, category: Category){
        const updatedCategory = await this.getCategoryById(id);

        updatedCategory.descricao = category.descricao;
        updatedCategory.ativa = category.ativa;

        await this.categoryRepository.updateCategory(updatedCategory);
    }

    async deleteCategory(id: string){
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        
        if (await this.productRepository.getCountByCategory(id) > 0) {
            throw new Error("Cannot delete category with associated products");
        }
        
        await this.categoryRepository.deleteCategory(id);
    }
}