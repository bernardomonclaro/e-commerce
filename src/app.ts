import express from "express";
import { initializeApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { getFirestore } from "firebase-admin/firestore";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found-handler.middleware.js";
import { routes } from "./routes/index.js";
import { auth } from "./middlewares/auth.middleware.js";
import { swaggerDocs } from "./routes/swagger-docs.route.js";

// Initialize Firebase Admin and Firestore using Application Default Credentials (ADC)
// In Cloud Functions, ADC is provided by the runtime service account.
initializeApp();
initializeFirebaseApp({
  apiKey: process.env.API_KEY
});
getFirestore();

const app = express();

// Compose middleware and routes
swaggerDocs(app);
auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

// Global error listeners to ensure terminal shows unhandled failures
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

export { app };

