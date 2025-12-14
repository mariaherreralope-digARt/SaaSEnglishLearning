"use client";

import { Card, Table, Tag, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ActivityLogs() {
  // Placeholder data
  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
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
        const color = action.includes("LOGIN")
          ? "blue"
          : action.includes("COMPLETED")
          ? "green"
          : "default";
        return <Tag color={color}>{action}</Tag>;
      },
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  const data: any[] = [];

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <FileTextOutlined style={{ fontSize: 32, marginRight: 12 }} />
        <Title level={2} style={{ margin: 0 }}>
          Activity Logs
        </Title>
      </div>

      <Card>
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
