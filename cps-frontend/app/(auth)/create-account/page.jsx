// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import {
//   Toast,
//   ToastProvider,
//   ToastViewport,
//   ToastTitle,
//   ToastDescription,
//   ToastClose,
// } from "@/components/ui/toast";
// import { Toaster } from "@/components/ui/toaster";
// import { useToast } from "@/components/ui/use-toast";
// import GlobalApi from "@/app/_utils/GlobalApi";

// const CreateAccount = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { toast } = useToast();

//   useEffect(() => {
//     const jwt = sessionStorage.getItem("jwt");
//     if (jwt) {
//       router.push("/");
//     }
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (password !== confirmPassword) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Passwords do not match",
//       });
//       return;
//     }

//     if (password.length < 6) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Password must be at least 6 characters long",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await GlobalApi.registerUser(username, email, password);

//       // Store user token
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("token", response.data.jwt);

//       // Show success toast and redirect
//       toast({
//         title: "Account Created",
//         description: "You've successfully registered. Redirecting...",
//       });

//       // Short delay to show toast
//       setTimeout(() => {
//         router.push("/sign-in");
//       }, 1500);
//     } catch (err) {
//       // Handle registration errors
//       toast({
//         variant: "destructive",
//         title: "Registration Failed",
//         description:
//           err.response?.data?.error?.message || "An unexpected error occurred",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md space-y-8">
//         <div className="bg-white shadow-md rounded-md p-6">
//           <img
//             className="mx-auto h-12 w-auto"
//             src="https://www.svgrepo.com/show/499664/user-happy.svg"
//             alt="Register"
//           />

//           <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
//             Sign up for an account
//           </h2>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Username
//               </label>
//               <Input
//                 id="username"
//                 type="text"
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Password
//               </label>
//               <Input
//                 id="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="confirm-password"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Confirm Password
//               </label>
//               <Input
//                 id="confirm-password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm your password"
//               />
//             </div>

//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Registering..." : "Register Account"}
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 href="/sign-in"
//                 className="font-medium text-sky-600 hover:text-sky-500"
//               >
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <Toaster />
//     </div>
//   );
// };

// export default CreateAccount;
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_utils/GlobalApi";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await GlobalApi.registerUser(username, email, password);

      // Store user token
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.jwt);

      // Redirect to sign-in page
      router.push("/sign-in");
    } catch (err) {
      // Handle registration errors
      setError(
        err.response?.data?.error?.message ||
          "An unexpected error occurred during registration"
      );
    } finally {
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
            alt="Register"
          />

          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>

          {error && (
            <div className="mb-4 text-center text-red-600 bg-red-100 py-2 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
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

export default CreateAccount;
