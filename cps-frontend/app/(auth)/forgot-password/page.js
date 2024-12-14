"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/forgot-password",
        {
          email: email,
        },
        {
          // Add timeout to prevent indefinite loading
          timeout: 10000000,
        }
      );

      setSuccessMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
      setEmail("");
    } catch (err) {
      console.log("Forgot password error:", err);

      // More specific error handling
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(
          err.response.data?.error?.message ||
            "An error occurred during password reset"
        );
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setError("An unexpected error occurred");
      }
    } finally {
      // Ensure loading state is always turned off
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt="Forgot Password"
          />

          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Forgot Password
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
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Request Password Reset"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
