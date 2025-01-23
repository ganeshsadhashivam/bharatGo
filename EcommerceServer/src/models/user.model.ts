import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "../interfaces/user";

const userSchema: Schema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser & Document>("User", userSchema);

export default User;
