"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; // Ensure this exists via shadcn
import { Button } from "@/components/ui/button"; // Ensure this exists via shadcn
import GlobalApi from "@/app/_utils/GlobalApi";
import { setToken } from "@/lib/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
    setError("");
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await GlobalApi.loginUser(email, password);
      console.log("API Response:", response);

      if (response?.data?.jwt) {
        localStorage.setItem("jwt", response.data.jwt); // Store JWT in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Optional: Store user data

        router.push("/"); // Redirect to dashboard after successful login
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.log("Login error:", err);
      setError(
        err.response?.data?.error?.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-6 shadow-md sm:rounded-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Access your account below
          </p>
        </div>
        {error && (
          <div className="mb-4 text-center text-red-600 bg-red-100 py-2 rounded">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/create-account"
            className="font-medium text-sky-600 hover:text-sky-500"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
