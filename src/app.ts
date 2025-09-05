import express from "express";
import { initializeApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { getFirestore } from "firebase-admin/firestore";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found-handler.middleware.js";
import { routes } from "./routes/index.js";
import { auth } from "./middlewares/auth.middleware.js";

initializeApp();
initializeFirebaseApp({
apiKey: process.env.API_KEY,
});
getFirestore();

const app = express();
auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

// Global error listeners to ensure terminal shows unhandled failures
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // optional: decide if you want to exit in prod
  // process.exit(1);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
