import { IUser } from "../interfaces/user";
import User from "../models/user.model";

export class UserService {
  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      // Handle potential errors during user creation (e.g., duplicate email)
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async loginUser(userData: {
    email: string;
    password: string;
  }): Promise<IUser> {
    try {
      const { email, password } = userData;
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      // Compare passwords (use a secure hashing library like bcrypt)
      // This is a simplified example, use a proper password comparison function
      if (password !== user.password) {
        throw new Error("Incorrect password");
      }

      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw new Error("Failed to login user");
    }
  }
}
