import { NotFoundError } from "../errors/not-found.error.js";
import { User } from "../models/user.model.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "./auth.service.js";

export class UserService {
    private userRepository: UserRepository;
    
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }
    
    async createUser(user: User){
        const userAuth = await new AuthService().create(user);
        user.id = userAuth.uid;
        return this.userRepository.updateUser(user);
    }

    async updateUser(id: string, user: User){
        const updatedUser = await this.getUserById(id);

        updatedUser.nome = user.nome;
        updatedUser.email = user.email;

        await new AuthService().update(id, user);
        await this.userRepository.updateUser(updatedUser);
    }

    async deleteUser(id: string){
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        await new AuthService().delete(id);
        await this.userRepository.deleteUser(id);
        
    }
}