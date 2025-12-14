import { Card, Table, Tag, Typography } from "antd";
import { prisma } from "@/lib/prisma";

const { Title } = Typography;

export default async function UserProgressPage() {
  // Fetch real progress data from database
  const progressRecords = await prisma.userProgress.findMany({
    include: {
      user: true,
      lesson: true,
    },
    orderBy: { updatedAt: "desc" },
  });

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
      render: (seconds: number) => `${Math.floor(seconds / 60)} min`,
    },
  ];

  const data = progressRecords.map((record) => ({
    key: record.id,
    student: record.user.name,
    lesson: record.lesson.title,
    status: record.completed ? "Completed" : "In Progress",
    score: record.score,
    timeSpent: record.timeSpent,
  }));

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>User Progress Overview</Title>

      <Card style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={data}
          locale={{ emptyText: "No progress data found" }}
        />
      </Card>
    </div>
  );
}
