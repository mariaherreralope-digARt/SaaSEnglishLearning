"use client";

import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  EditOutlined,
  TrophyOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const { Sider } = Layout;

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role || "STUDENT";

  // Base menu items for all authenticated users
  const baseItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Overview</Link>,
    },
    {
      key: "/dashboard/lessons",
      icon: <BookOutlined />,
      label: <Link href="/dashboard/lessons">Lessons</Link>,
    },
    {
      key: "/dashboard/exercises",
      icon: <EditOutlined />,
      label: <Link href="/dashboard/exercises">Exercises</Link>,
    },
    {
      key: "/dashboard/progress",
      icon: <TrophyOutlined />,
      label: <Link href="/dashboard/progress">My Progress</Link>,
    },
  ];

  // Admin-only items (ADMIN and TEACHER)
  const adminItems =
    userRole === "ADMIN" || userRole === "TEACHER"
      ? [
          {
            key: "admin-section",
            icon: <TeamOutlined />,
            label: "Admin",
            children: [
              {
                key: "/dashboard/admin/lessons",
                icon: <BookOutlined />,
                label: <Link href="/dashboard/admin/lessons">Manage Lessons</Link>,
              },
              {
                key: "/dashboard/admin/users",
                icon: <TeamOutlined />,
                label: <Link href="/dashboard/admin/users">Users</Link>,
              },
              {
                key: "/dashboard/admin/progress",
                icon: <BarChartOutlined />,
                label: <Link href="/dashboard/admin/progress">User Progress</Link>,
              },
              {
                key: "/dashboard/admin/logs",
                icon: <FileTextOutlined />,
                label: <Link href="/dashboard/admin/logs">Activity Logs</Link>,
              },
            ],
          },
        ]
      : [];

  // User settings (for all users)
  const settingsItems = [
    {
      key: "/dashboard/profile",
      icon: <UserOutlined />,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/settings">Settings</Link>,
    },
  ];

  const menuItems = [
    ...baseItems,
    ...adminItems,
    ...settingsItems,
  ];

  return (
    <Sider
      width={250}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        📚 LearnEnglish
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
}
