import { Card, Table, Tag, Typography, Space, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { prisma } from "@/lib/prisma";

const { Title } = Typography;

export default async function ManageUsers() {
  // Fetch real users from database
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

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
      render: (date: Date) => new Date(date).toLocaleDateString(),
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

  const data = users.map((user) => ({
    key: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  }));

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
