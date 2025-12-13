"use client";

import { Layout } from "antd";
import { SessionProvider } from "next-auth/react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <DashboardSidebar />
        <Layout style={{ marginLeft: 250 }}>
          <DashboardHeader />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: 8,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </SessionProvider>
  );
}
