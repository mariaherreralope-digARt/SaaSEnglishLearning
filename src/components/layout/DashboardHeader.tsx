"use client";

import { Layout, Dropdown, Avatar, Space, Typography } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";

const { Header } = Layout;
const { Text } = Typography;

export default function DashboardHeader() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => router.push("/dashboard/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => router.push("/dashboard/settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 24px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
        <Space style={{ cursor: "pointer" }}>
          <Avatar
            icon={<UserOutlined />}
            src={session?.user?.avatar}
            style={{ backgroundColor: "#1890ff" }}
          />
          <Space direction="vertical" size={0}>
            <Text strong>{session?.user?.name || "User"}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {session?.user?.role || "BUYER"}
            </Text>
          </Space>
        </Space>
      </Dropdown>
    </Header>
  );
}
