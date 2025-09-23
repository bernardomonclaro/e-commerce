import { NotFoundError } from "../errors/not-found.error.js";
import { OrderItem } from "../models/order-item.model.js";
import { Order, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class OrderService {
    private orderRepository: OrderRepository;
    private companyRepository: CompanyRepository
    private paymentMethodRepository: PaymentMethodRepository
    private productRepository: ProductRepository


    constructor() {
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodRepository();
        this.productRepository = new ProductRepository();
    }

    async createOrder(order: Order) {
        const company = await this.companyRepository.getCompanyById(order.empresa.id!)
        if (!company) {
            throw new NotFoundError("Company not found")
        }
        order.empresa = company;

        const paymentMethod = await this.paymentMethodRepository.getPaymentMethodById(order.formaPagamento.id)
        if (!paymentMethod) {
            throw new NotFoundError("PaymentMethod not found")
        }
        order.formaPagamento = paymentMethod;

        for (const item of order.itens!) {
            const product = await this.productRepository.getProductById(item.produto.id)
            if (!product) {
                throw new NotFoundError("Product not found")
            }
            item.produto = product;
        }

        await this.orderRepository.createOrder(order);
    }

    async search(query: QueryParamsOrder): Promise<Order[]> {
        return this.orderRepository.search(query)
    }

    async getItems(orderId: string): Promise<OrderItem[]> {
        return this.orderRepository.getItems(orderId)
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.orderRepository.getOrderById(id);
        if (!order) {
            throw new NotFoundError("Order not found");
        }
        return order;
    }

    async changeStatus(id: string, status: OrderStatus) {
        await this.orderRepository.changeStatus(id, status);
    }
}