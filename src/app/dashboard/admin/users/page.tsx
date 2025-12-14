"use client";

import { Card, Table, Tag, Typography, Space, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ManageUsers() {
  // Placeholder data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const color =
          role === "ADMIN" ? "red" : role === "TEACHER" ? "blue" : "green";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const data: any[] = [];

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={2}>User Management</Title>
        <Button type="primary" icon={<UserOutlined />}>
          Add User
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={data}
          locale={{ emptyText: "No users found" }}
        />
      </Card>
    </div>
  );
}
