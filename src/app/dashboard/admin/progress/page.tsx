"use client";

import { Card, Table, Progress, Typography, Tag } from "antd";
import { TrophyOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function UserProgress() {
  // Placeholder data
  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Lessons Completed",
      dataIndex: "lessonsCompleted",
      key: "lessonsCompleted",
      render: (count: number) => <Tag color="green">{count}</Tag>,
    },
    {
      title: "Total Score",
      dataIndex: "totalScore",
      key: "totalScore",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
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
        <TrophyOutlined style={{ fontSize: 32, marginRight: 12 }} />
        <Title level={2} style={{ margin: 0 }}>
          User Progress Overview
        </Title>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: "No student progress data available",
          }}
        />
      </Card>
    </div>
  );
}
