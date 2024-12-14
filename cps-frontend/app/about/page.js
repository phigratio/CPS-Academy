"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";

const AboutPage = () => {
  const [userData, setUserData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
        alert("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "http://localhost:1337/api/auth/change-password",
        {
          currentPassword: currentPassword,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      alert("Password changed successfully");
      setIsDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      alert("Failed to change password");
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-12 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-blue-900 font-bold mb-4">About Me</h1>
      <div className="bg-white border border-blue-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <p className="mb-2">
          <strong>Username:</strong> {userData.username}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="mb-2">
          <strong>Role:</strong> {userData.role.name}
        </p>
        <p className="mb-4">
          <strong>Role Description:</strong> {userData.role.description}
        </p>

        <div className="flex gap-4 mb-4">
          {userData.role.name === "Social Media Manager" && (
            <Button
              variant="primary"
              onClick={() => router.push("/manage-roles")}
            >
              Manage Roles
            </Button>
          )}
          <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
            Change Password
          </Button>
        </div>

        {/* Smaller Dashboard Button */}
        <Button
          variant="outline"
          className="mt-4 text-sm p-2"
          onClick={() => router.push("/")}
        >
          Dashboard
        </Button>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handlePasswordChange}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutPage;
