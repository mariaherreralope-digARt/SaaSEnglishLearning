"use client";

import { Card, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

export default function UserProgressPage() {
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Lesson",
      dataIndex: "lesson",
      key: "lesson",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Time Spent",
      dataIndex: "timeSpent",
      key: "timeSpent",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>User Progress Overview</Title>

      <Card style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={progress}
          loading={loading}
          locale={{ emptyText: "No progress data found" }}
        />
      </Card>
    </div>
  );
}
