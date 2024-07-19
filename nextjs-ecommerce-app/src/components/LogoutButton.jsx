"use client";

import { logout } from "@/lib/data/user";
import React from "react";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex py-2 px-4 bg-blue-500 text-white rounded-md items-center shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
    >
      Logout
    </button>
  );
};
