"use client";

import { Typography, Card, List, Tag, Button, Row, Col } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

// Mock data - in a real app, this would come from the database
const lessons = [
  {
    id: "1",
    title: "Greetings and Introductions",
    description: "Learn how to greet people and introduce yourself in English",
    level: "A1",
    category: "Speaking",
    duration: 15,
    completed: false,
  },
  {
    id: "2",
    title: "Numbers 1-100",
    description: "Master counting from 1 to 100 in English",
    level: "A1",
    category: "Vocabulary",
    duration: 20,
    completed: false,
  },
  {
    id: "3",
    title: "Present Simple Tense",
    description: "Understanding and using the present simple tense",
    level: "A1",
    category: "Grammar",
    duration: 25,
    completed: false,
  },
  {
    id: "4",
    title: "Past Simple Tense",
    description: "Learn to talk about past events and actions",
    level: "A2",
    category: "Grammar",
    duration: 30,
    completed: false,
  },
];

export default function LessonsPage() {
  return (
    <div>
      <Title level={2}>Lessons</Title>
      <Paragraph type="secondary">
        Browse and start lessons to improve your English skills
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {lessons.map((lesson) => (
          <Col xs={24} md={12} lg={8} key={lesson.id}>
            <Card
              hoverable
              actions={[
                <Link href={`/dashboard/lessons/${lesson.id}`} key="start">
                  <Button type="primary" block>
                    Start Lesson
                  </Button>
                </Link>,
              ]}
            >
              <div style={{ marginBottom: 16 }}>
                <BookOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              </div>
              <Title level={4}>{lesson.title}</Title>
              <Paragraph type="secondary">{lesson.description}</Paragraph>
              <div style={{ marginTop: 12 }}>
                <Tag color="blue">{lesson.level}</Tag>
                <Tag color="green">{lesson.category}</Tag>
                <Tag icon={<ClockCircleOutlined />}>{lesson.duration} min</Tag>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Paragraph type="secondary">
          💡 <strong>Tip:</strong> Complete lessons in order to build a strong foundation in English!
        </Paragraph>
      </Card>
    </div>
  );
}
