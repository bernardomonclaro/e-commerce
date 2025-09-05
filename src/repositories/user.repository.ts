import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User, userConverter } from "../models/user.model.js";

export class UserRepository {

    private collection: CollectionReference<User>;
    
    constructor() {
        this.collection = getFirestore()
        .collection("users")
        .withConverter(userConverter);
    }

    async getUsers(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getUserById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }

    async createUser(user: User) {
        await this.collection.add(user);
    }

    async updateUser(user: User) {
        await this.collection.doc(user.id).set(user);
    }

    async deleteUser(id: string) {
        await this.collection.doc(id).delete();
    }
}