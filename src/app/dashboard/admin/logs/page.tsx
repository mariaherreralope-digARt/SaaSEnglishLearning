"use client";

import { Card, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
        return <Tag color={color}>{action}</Tag>;
      },
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Activity Logs</Title>

      <Card style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={logs}
          loading={loading}
          locale={{ emptyText: "No activity logs found" }}
        />
      </Card>
    </div>
  );
}
