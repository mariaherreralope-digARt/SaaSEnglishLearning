"use client";

import { Typography, Card, Button, Radio, Space, Progress, Alert } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;

// Mock exercise data
const exercises = [
  {
    id: "1",
    question: "How do you greet someone in the morning?",
    type: "MULTIPLE_CHOICE",
    options: ["Good morning", "Good night", "Goodbye", "See you later"],
    correctAnswer: "Good morning",
  },
  {
    id: "2",
    question: "Choose the correct form: 'She ___ to school every day.'",
    type: "MULTIPLE_CHOICE",
    options: ["go", "goes", "going", "went"],
    correctAnswer: "goes",
  },
  {
    id: "3",
    question: "What comes after nineteen?",
    type: "MULTIPLE_CHOICE",
    options: ["eighteen", "twenty", "thirty", "twelve"],
    correctAnswer: "twenty",
  },
];

export default function ExercisesPage() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const exercise = exercises[currentExercise];
  const isCorrect = selectedAnswer === exercise.correctAnswer;
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  const handleSubmit = () => {
    setShowResult(true);
    if (isCorrect) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div>
      <Title level={2}>Practice Exercises</Title>
      <Paragraph type="secondary">
        Test your knowledge with interactive exercises
      </Paragraph>

      <Card style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <Text type="secondary">Progress</Text>
          <Progress percent={Math.round(progress)} status="active" />
        </div>

        <Title level={4}>
          Question {currentExercise + 1} of {exercises.length}
        </Title>
        <Paragraph style={{ fontSize: 16, marginTop: 16 }}>
          {exercise.question}
        </Paragraph>

        <Radio.Group
          onChange={(e) => setSelectedAnswer(e.target.value)}
          value={selectedAnswer}
          disabled={showResult}
          style={{ width: "100%", marginTop: 24 }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {exercise.options.map((option) => (
              <Radio key={option} value={option} style={{ fontSize: 16 }}>
                {option}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        {showResult && (
          <Alert
            style={{ marginTop: 24 }}
            message={isCorrect ? "Correct!" : "Incorrect"}
            description={
              isCorrect
                ? "Great job! You got it right."
                : `The correct answer is: ${exercise.correctAnswer}`
            }
            type={isCorrect ? "success" : "error"}
            showIcon
            icon={isCorrect ? <CheckCircleOutlined /> : undefined}
          />
        )}

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          {!showResult ? (
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              size="large"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleNext}
              disabled={currentExercise === exercises.length - 1}
              size="large"
            >
              Next Question
            </Button>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: "#f0f2f5", borderRadius: 8 }}>
          <Text strong>Your Score: {score} points</Text>
        </div>
      </Card>
    </div>
  );
}
