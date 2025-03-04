dotenv.config();
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { errorHandler, notFound } from "./middleware/error-middleware.js";
import { redisClient } from "./utils/redis.js";

import userRoute from "./routes/user-route.js";

const app = express();
const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;

// Middleware
app.use(express.json());


mongoose
  .connect(dbUri)
  .then(() => console.log("=> Success, connected to App database"))
  .then(() => {
    redisClient.connect().then(() => {
      console.log("=> Success, redis server connected");
      // Run server
      app.listen(port, () => {
        console.log(`=> Server is running on port ${port}`);
      });
    });
  })
  .catch((err) =>
    console.error("=> Fail, could not connect to Database!", err.message)
  );

// Routes
app.use("/api/user", userRoute);

app.use(notFound);
app.use(errorHandler);