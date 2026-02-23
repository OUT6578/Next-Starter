import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/app/api/models/userModel";
import { verifyOTP } from "@/lib/otp-manager";
import { generateAccessToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { mobile, otp } = await req.json();

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, message: "Please provide mobile number and OTP" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isValidOTP = verifyOTP(mobile, otp);

    if (!isValidOTP) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    const resetToken = generateAccessToken({
      id: user._id,
      role: user.role,
      type: "reset",
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        resetToken,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      { success: false, message: "Error verifying OTP", error: err.message },
      { status: 500 }
    );
  }
}
