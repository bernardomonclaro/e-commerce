import fs from "node:fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { fileTypeFromBuffer } from "file-type";
import { randomUUID } from "node:crypto";
import { ValidationError } from "../errors/validation.error.js";

export class UploadFileService {
    constructor(private path: string = "") { }

    async upload(base64: string): Promise<string> {
       const fileBuffer = Buffer.from(base64, "base64");

       const fileType = await fileTypeFromBuffer(fileBuffer);
       if(!fileType) {
           throw new Error("Invalid file type");
       }
       
       if(!["image/jpeg", "image/png", "image/jpg"].includes(fileType.mime)) {
           throw new ValidationError("Unsupported file type");
       }

       const fileName = `${randomUUID().toString()}.${fileType?.ext}`;
       fs.writeFileSync(fileName, fileBuffer);
       
       const bucket = getStorage().bucket("e-commerce-3c2be.firebasestorage.app");
       const uploadResponse = await bucket.upload(fileName, {
            destination: this.path + fileName
       });

       fs.unlinkSync(fileName);

       return getDownloadURL(uploadResponse[0]);
    }
}