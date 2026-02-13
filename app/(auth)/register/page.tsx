"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    permanentAddress: "",
    correspondenceAddress: "",
    role: "User",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/register", {
        ...formData,
        address: {
          permanent: formData.permanentAddress,
          correspondence: formData.correspondenceAddress,
        },
      });

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
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

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                name="mobile"
                type="tel"
                placeholder="Mobile Number"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <Input
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                name="permanentAddress"
                type="text"
                placeholder="Permanent Address"
                value={formData.permanentAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                name="correspondenceAddress"
                type="text"
                placeholder="Correspondence Address"
                value={formData.correspondenceAddress}
                onChange={handleChange}
              />
            </div>
            <div>
                <select
                    name="role"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
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
