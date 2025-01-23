import express from "express";
import cors from "cors";

import { routes } from "./routes";
// import { errorMiddleware } from "./middlewares/error.middleware";

import { connectToDatabase } from "./config/db.config"; // Assuming you have db.config.ts
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB");

    // Routes
    app.use("/api", routes);

    // Error Handling middleware
    // app.use(errorMiddleware);
    app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        errorHandler(err, req, res, next);
      }
    );

    const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

    app.listen(PORT, () => {
      console.log(`Server listening On PORT ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

// import express from "express";
// import cors from "cors";
// import { routes } from "./routes";
// import { errorMiddleware } from "./middlewares/error.middleware";

// const app = express();

// //middleware
// app.use(cors());
// app.use(express.json());

// //Routes
// app.use("/api", routes);

// //Error Handling middleware
// app.use(errorMiddleware);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server listening On PORT ${PORT}`);
// });
