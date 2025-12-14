"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spin } from "antd";

export default function AdminLayout({
  children,
}: {
  children: React.Node;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const userRole = session.user?.role;
    if (userRole !== "ADMIN" && userRole !== "TEACHER") {
      // Redirect students to their dashboard
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  const userRole = session?.user?.role;
  if (!session || (userRole !== "ADMIN" && userRole !== "TEACHER")) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
}
