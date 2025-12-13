"use client";

import { Typography, Card, Row, Col, Progress, List, Tag } from "antd";
import {
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// Mock progress data
const progressData = {
  lessonsCompleted: 0,
  totalLessons: 12,
  totalPoints: 0,
  studyStreak: 0,
  timeStudied: 0,
  currentLevel: "A1",
  levelProgress: 0,
};

const recentActivity = [
  // Empty for now - would be populated from database
];

export default function ProgressPage() {
  const completionRate = (progressData.lessonsCompleted / progressData.totalLessons) * 100;

  return (
    <div>
      <Title level={2}>My Progress</Title>
      <Paragraph type="secondary">
        Track your learning journey and achievements
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <BookOutlined style={{ fontSize: 32, color: "#1890ff", marginBottom: 8 }} />
              <Title level={3}>{progressData.lessonsCompleted}</Title>
              <Text type="secondary">Lessons Completed</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <TrophyOutlined style={{ fontSize: 32, color: "#faad14", marginBottom: 8 }} />
              <Title level={3}>{progressData.totalPoints}</Title>
              <Text type="secondary">Total Points</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <FireOutlined style={{ fontSize: 32, color: "#f5222d", marginBottom: 8 }} />
              <Title level={3}>{progressData.studyStreak}</Title>
              <Text type="secondary">Day Streak</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <ClockCircleOutlined style={{ fontSize: 32, color: "#52c41a", marginBottom: 8 }} />
              <Title level={3}>{progressData.timeStudied}</Title>
              <Text type="secondary">Hours Studied</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Current Level">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <Text strong>Level {progressData.currentLevel}</Text>
                <Text type="secondary">{progressData.levelProgress}%</Text>
              </div>
              <Progress percent={progressData.levelProgress} status="active" />
            </div>
            <Paragraph type="secondary">
              Complete {progressData.totalLessons - progressData.lessonsCompleted} more lessons to reach the next level!
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Overall Completion">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <Text strong>Course Progress</Text>
                <Text type="secondary">{Math.round(completionRate)}%</Text>
              </div>
              <Progress percent={Math.round(completionRate)} />
            </div>
            <Paragraph type="secondary">
              {progressData.lessonsCompleted} of {progressData.totalLessons} lessons completed
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity" style={{ marginTop: 24 }}>
        {recentActivity.length === 0 ? (
          <Paragraph type="secondary">
            No recent activity. Start a lesson to begin tracking your progress!
          </Paragraph>
        ) : (
          <List
            dataSource={recentActivity}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                <Tag color="blue">{item.points} pts</Tag>
              </List.Item>
            )}
          />
        )}
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Paragraph>
          <strong>💡 Tips for Better Progress:</strong>
          <br />
          • Study consistently every day to build your streak
          <br />
          • Complete lessons in order for better understanding
          <br />
          • Practice exercises to reinforce your learning
          <br />
          • Set daily goals to stay motivated
        </Paragraph>
      </Card>
    </div>
  );
}
