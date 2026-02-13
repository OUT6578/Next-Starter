import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/app/api/models/userModel";
import { comparePassword, generateAccessToken, generateRefreshToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide email and password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if password exists (could be missing if using OAuth, but here purely manual)
    if (!user.password) {
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

    // Save refresh token to database (optional but good for revocation)
    user.refreshToken = refreshToken;
    await user.save();

    const cookieStore = await cookies();

    // Set refresh token in HTTP-only cookie (1 day expiration)
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    // Set access token in HTTP-only cookie (1 minute expiration)
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60, // 1 minute
      path: "/",
    });

    // Return user info (excluding password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobile: user.mobile,
      address: user.address,
    };

    return NextResponse.json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
