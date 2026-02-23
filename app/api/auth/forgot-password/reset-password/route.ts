import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/app/api/models/userModel";
import { hashPassword } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { mobile, resetToken, newPassword } = await req.json();

    if (!mobile || !resetToken || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    try {
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || "secret") as { type?: string };

      if (decoded.type !== "reset") {
        throw new Error("Invalid token type");
      }
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired reset token" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      { success: false, message: "Error resetting password", error: err.message },
      { status: 500 }
    );
  }
}
