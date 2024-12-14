"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const token = searchParams.get("token");
      await axios.post("http://localhost:1337/api/auth/reset-password", {
        code: token,
        password,
        passwordConfirmation: confirmPassword,
        // The token from the reset link
      });
      setSuccessMessage(
        "Password has been reset successfully. You can log in now."
      );
      setTimeout(() => router.push("/sign-in"), 3000); // Redirect to sign-in after success
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "An unexpected error occurred while resetting password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>

          {error && (
            <div className="mb-4 text-center text-red-600 bg-red-100 py-2 rounded">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 text-center text-green-600 bg-green-100 py-2 rounded">
              {successMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
