import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newUserSchema, updateUserSchema } from "../models/user.model.js";

export const userRoutes = Router();

userRoutes.get("/users", asyncHandler(UsersController.getUsers));
userRoutes.get("/users/:id", asyncHandler(UsersController.getUserById));
userRoutes.post("/users", celebrate({ [Segments.BODY]: newUserSchema }), asyncHandler(UsersController.createUser));
userRoutes.put("/users/:id", celebrate({ [Segments.BODY]: updateUserSchema }), asyncHandler(UsersController.updateUser));
userRoutes.delete("/users/:id", asyncHandler(UsersController.deleteUser));
