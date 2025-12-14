"use client";

import { Card, Table, Tag, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { prisma } from "@/lib/prisma";

const { Title } = Typography;

export default async function ActivityLogsPage() {
  // Fetch real logs from database
  const logs = await prisma.log.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 50, // Limit to last 50 logs
  });

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: string) => {
        const color =
          action.includes("LOGIN")
            ? "blue"
            : action.includes("COMPLETED")
            ? "green"
            : "default";
        return <Tag color={color}>{action.replace(/_/g, " ")}</Tag>;
      },
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
  ];

  const data = logs.map((log) => ({
    key: log.id,
    user: log.user.name,
    action: log.action,
    timestamp: new Date(log.createdAt).toLocaleString(),
  }));

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Activity Logs</Title>

      <Card style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: "No activity logs found",
          }}
        />
      </Card>
    </div>
  );
}
