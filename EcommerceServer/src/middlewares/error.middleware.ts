// import { Request, Response } from "express";

// export const errorMiddleware = (err: Error, req: Request, res: Response) => {
//   // Handle errors here
//   console.error(err);
//   res.status(500).json({ message: "Internal server error" });
// };

// interface CustomError extends Error {
//   status?: number;
// }

// // filepath: error.middleware.ts
// import { Request, Response } from "express";
// import { ZodError } from "zod";

// interface CustomError extends Error {
//   status?: number;
// }

// export const errorHandler = (err: CustomError, req: Request, res: Response) => {
//   if (err instanceof ZodError) {
//     if (process.env.NODE_ENV === "production") {
//       // Concise error messages in production
//       res.status(400).json({
//         message: "Validation error. Please check your inputs.",
//       });
//     } else {
//       // Detailed error messages in development
//       res.status(400).json({
//         errors: err.issues.map((issue) => ({
//           path: issue.path,
//           message: issue.message,
//         })),
//       });
//     }
//   }

//   // Handle other errors
//   const statusCode = err.status || 500;
//   const message =
//     process.env.NODE_ENV === "production"
//       ? "An error occurred. Please try again later."
//       : err.message || "Internal Server Error";

//   res.status(statusCode).json({ message });
// };

import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
  stack?: string;
  errors?: unknown;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction // Ensure you include `next` here
): Response | void => {
  console.error("Error:", err); // Log the error for debugging

  const isProduction = process.env.NODE_ENV === "production";
  console.log("isProduction", isProduction);

  if (err.name === "ValidationError") {
    console.log("in validation error");
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors || undefined,
      stack: isProduction ? undefined : err.stack, // Show stack only in development
    });
  }

  // Handle unexpected errors
  res.status(500).json({
    message: "Internal Server Error",
    stack: isProduction ? undefined : err.stack,
  });
};
