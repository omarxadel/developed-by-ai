import React, { Suspense } from "react";
import ItemList from "@/components/ItemList";
import { ItemListSkeleton } from "@/components/ItemListSkeleton";
import Link from "next/link";
import { getAuthUser } from "@/lib/data/user";
import { LogoutButton } from "@/components/LogoutButton";

const HomePage = async () => {
  const authUser = await getAuthUser();
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex justify-between mb-4">
        <h1 className="text-3xl font-semibold">Welcome to Our Store</h1>
        <div className="flex gap-2 items-center">
          {authUser ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className="flex py-2 px-4 bg-blue-500 text-white rounded-md items-center shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <Suspense fallback={<ItemListSkeleton />}>
        <ItemList />
      </Suspense>
    </div>
  );
};

export default HomePage;
