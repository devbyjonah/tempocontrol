"use client";
import { useSession } from "next-auth/react";

// checks authorized users
export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (session.status === "unauthenticated" || session.status === "loading") {
    return (
      <div className="flex justify-center items-center px-20 text-center py-40 w-full h-full text-3xl text-white">
        <h1>
          Please{" "}
          <a
            className="text-primary hover:shadow-primary"
            href="/api/auth/signin"
          >
            sign in
          </a>{" "}
          to continue!
        </h1>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
