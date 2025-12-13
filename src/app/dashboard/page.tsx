"use client";

import { Typography, Row, Col, Card, Statistic, Progress } from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";

const { Title, Paragraph } = Typography;

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div>
      <Title level={2}>Welcome back, {session?.user?.name}!</Title>
      <Paragraph type="secondary">
        Continue your English learning journey
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Lessons Completed"
              value={0}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Points"
              value={0}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Study Streak"
              value={0}
              suffix="days"
              prefix={<FireOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Time Studied"
              value={0}
              suffix="hrs"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Current Level Progress">
            <div style={{ marginBottom: 16 }}>
              <Paragraph>Level: A1 (Beginner)</Paragraph>
              <Progress percent={0} status="active" />
            </div>
            <Paragraph type="secondary">
              Complete more lessons to advance to the next level!
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity">
            <Paragraph type="secondary">
              No recent activity. Start a lesson to begin tracking your progress!
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }} title="Quick Actions">
        <Paragraph>
          • Start a new lesson from the Lessons page
          <br />
          • Practice with exercises
          <br />
          • Track your progress and achievements
        </Paragraph>
      </Card>
    </div>
  );
}
