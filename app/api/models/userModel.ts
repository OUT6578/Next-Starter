import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddress {
  permanent: string;
  correspondence: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  mobile: string;
  dob?: Date;
  address?: IAddress;
  role: "User" | "Admin";
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    dob: {
      type: Date,
    },
    address: {
      permanent: { type: String },
      correspondence: { type: String },
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation error in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
