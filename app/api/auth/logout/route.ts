import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/app/api/models/userModel";
import { jwtVerify } from "jose";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
      await connectDB();
      try {
        const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret-key");
        const { payload } = await jwtVerify(refreshToken, secret);
        
        if (payload && payload.id) {
           await User.updateOne({ _id: payload.id }, { $unset: { refreshToken: 1 } });
        }
      } catch (e) {
        // Token invalid or expired, just proceed to clear cookies
      }
    }

    // Clear cookies
    cookieStore.set("accessToken", "", { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, 
      path: "/" 
    });
    cookieStore.set("refreshToken", "", { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, 
      path: "/" 
    });

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error logging out", error: error.message },
      { status: 500 }
    );
  }
}
