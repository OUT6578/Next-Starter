
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";

// ─── Zod Schema ────────────────────────────────────────────────────────────────

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be under 15 digits")
    .regex(/^[+]?[0-9\s\-()]+$/, "Please enter a valid mobile number"),

  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      return age >= 18;
    }, "You must be at least 18 years old"),

  permanentAddress: z
    .string()
    .max(500, "Address must be under 500 characters")
    .optional()
    .or(z.literal("")),

  correspondenceAddress: z
    .string()
    .max(500, "Address must be under 500 characters")
    .optional()
    .or(z.literal("")),

  role: z.enum(["User", "Admin"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Field Error Component ──────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

// ─── Register Page ──────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      dob: "",
      permanentAddress: "",
      correspondenceAddress: "",
      role: "User",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setServerError("");

    try {
      await axiosInstance.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        dob: data.dob,
        role: data.role,
        address: {
          permanent: data.permanentAddress,
          correspondence: data.correspondenceAddress,
        },
      });

      router.push("/login");
    } catch (err: any) {
      setServerError(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">

            {/* Full Name */}
            <div>
              <Input
                {...register("name")}
                type="text"
                placeholder="Full Name"
                className={errors.name ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.name?.message} />
            </div>

            {/* Email */}
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Password */}
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={errors.password ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.password?.message} />
            </div>

            {/* Mobile */}
            <div>
              <Input
                {...register("mobile")}
                type="tel"
                placeholder="Mobile Number"
                className={errors.mobile ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.mobile?.message} />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <Input
                {...register("dob")}
                type="date"
                className={`mt-1 ${errors.dob ? "border-red-400 focus-visible:ring-red-400" : ""}`}
              />
              <FieldError message={errors.dob?.message} />
            </div>

            {/* Permanent Address */}
            <div>
              <Input
                {...register("permanentAddress")}
                type="text"
                placeholder="Permanent Address"
                className={errors.permanentAddress ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.permanentAddress?.message} />
            </div>

            {/* Correspondence Address */}
            <div>
              <Input
                {...register("correspondenceAddress")}
                type="text"
                placeholder="Correspondence Address"
                className={errors.correspondenceAddress ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.correspondenceAddress?.message} />
            </div>

            {/* Role */}
            <div>
              <select
                {...register("role")}
                className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                  errors.role
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-input focus-visible:ring-ring"
                }`}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <FieldError message={errors.role?.message} />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
}