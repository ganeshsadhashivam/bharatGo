import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserService } from "../services/user.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserController {
  private userService = new UserService();

  public register: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.createUser({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  public login: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.loginUser({ email, password });
      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { email: user.email }, // Payload
        process.env.JWT_SECRET as string, // Secret key
        { expiresIn: "2h" } // Token expiry
      );

      // Send response with token and user data
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

// import { Request, Response, NextFunction } from "express";
// import { UserService } from "../services/user.service";

// export class UserController {
//   private userService = new UserService();

//   public async register(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { name, email, password } = req.body;
//       const user = await this.userService.createUser({ name, email, password });
//       res.status(201).json(user);
//     } catch (error) {
//       //   console.log(error);
//       //   return res.status(500).json({ message: "Internal Server Error" });
//       next(error);
//     }
//   }

//   public async login(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { email, password } = req.body;
//       const user = await this.userService.loginUser({ email, password });
//       res.status(200).json(user);
//     } catch (error) {
//       //   console.log(error);
//       //   return res.status(500).json({ message: "Internal Server Error" });
//       next(error);
//     }
//   }
// }
