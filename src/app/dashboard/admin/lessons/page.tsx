"use client";

import { Card, Table, Button, Space, Typography, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ManageLessons() {
  // Placeholder data
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level: string) => <Tag color="blue">{level}</Tag>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => `${duration} min`,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
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
        <Title level={2}>Manage Lessons</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Create Lesson
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={data}
          locale={{ emptyText: "No lessons found. Create your first lesson!" }}
        />
      </Card>
    </div>
  );
}
