import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/app/api/models/userModel";
import { generateOTP, storeOTP, sendOTPToMobile } from "@/lib/otp-manager";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { mobile } = await req.json();

    if (!mobile || mobile.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid mobile number" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "No account found with this mobile number" },
        { status: 404 }
      );
    }

    const otp = generateOTP();
    storeOTP(mobile, otp);

    const sent = sendOTPToMobile(mobile, otp);

    if (!sent) {
      return NextResponse.json(
        { success: false, message: "Failed to send OTP. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully to your mobile number",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      { success: false, message: "Error sending OTP", error: err.message },
      { status: 500 }
    );
  }
}
