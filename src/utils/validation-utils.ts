import { ValidationError } from "../errors/validation.error.js";

    export const isStorageValidUrl = (str: string): boolean => {
        try {
           const url = new URL(str);
           if(url.host !== "firebasestorage.googleapis.com") {
            throw new ValidationError("Invalid URL");
           }
            return true;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            return false;
        }
    }