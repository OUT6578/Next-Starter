"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Step = "mobile" | "otp" | "password";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!mobile || mobile.length < 10) {
        setError("Please enter a valid mobile number");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post("/auth/forgot-password/send-otp", {
        mobile,
      });

      if (response.data.success) {
        setSuccess("OTP sent to your registered mobile number");
        setTimeout(() => {
          setStep("otp");
          setSuccess("");
        }, 1500);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!otp || otp.length < 4) {
        setError("Please enter a valid OTP");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post("/auth/forgot-password/verify-otp", {
        mobile,
        otp,
      });

      if (response.data.success) {
        setResetToken(response.data.resetToken);
        setSuccess("OTP verified successfully");
        setTimeout(() => {
          setStep("password");
          setSuccess("");
        }, 1500);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(
        error.response?.data?.message || error.message || "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!newPassword || newPassword.length < 6) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post(
        "/auth/forgot-password/reset-password",
        {
          mobile,
          resetToken,
          newPassword,
        }
      );

      if (response.data.success) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      setStep("mobile");
      setOtp("");
      setError("");
      setSuccess("");
    } else if (step === "password") {
      setStep("otp");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setSuccess("");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {step === "mobile" && (
            <>
              <div className="mb-8">
                <Link href="/login" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
                <h1 className="text-4xl font-bold text-gray-900">Reset your password</h1>
                <p className="mt-2 text-gray-600">
                  Enter your mobile number to receive a password reset code
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleMobileSubmit} className="space-y-5">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your 10-digit mobile number"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    maxLength={10}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2">We'll send an OTP to this number</p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="mb-8">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <h1 className="text-4xl font-bold text-gray-900">Verify OTP</h1>
                <p className="mt-2 text-gray-600">
                  We&apos;ve sent a verification code to <span className="font-semibold">+91 {mobile}</span>
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                    OTP Code
                  </label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 4-digit OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center text-2xl tracking-widest font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-2">Check your mobile for the OTP</p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Didn&apos;t receive code?{" "}
                  <button
                    type="button"
                    onClick={handleMobileSubmit}
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Resend OTP
                  </button>
                </p>
              </form>
            </>
          )}

          {step === "password" && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Create new password</h1>
                <p className="mt-2 text-gray-600">
                  Enter a strong password to secure your account
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">At least 6 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Resetting...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative h-full flex flex-col justify-center px-16 text-white">
          <div className="max-w-lg">
            <h2 className="text-5xl font-bold mb-6">Secure your account</h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              We&apos;re here to help you regain access to your account safely and securely. Reset your password in just a few simple steps.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-lg">Quick and easy process</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-lg">Secure OTP verification</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-lg">Your account remains protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
