"use client";

import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";

const { Title } = Typography;

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Admin Dashboard</Title>
      <Title level={5} type="secondary" style={{ marginBottom: 24 }}>
        Welcome back, {session?.user?.name || "Admin"}
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Lessons"
              value={0}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Students"
              value={0}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Activity Logs"
              value={0}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Quick Actions</Title>
        <p>Use the sidebar to navigate to different admin sections:</p>
        <ul>
          <li>Manage Lessons - Create and edit learning content</li>
          <li>Users - View and manage user accounts</li>
          <li>User Progress - Monitor student learning progress</li>
          <li>Activity Logs - View system activity and user actions</li>
        </ul>
      </Card>
    </div>
  );
}
