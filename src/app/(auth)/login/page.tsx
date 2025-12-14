"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        message.error("Invalid email or password");
      } else {
        message.success("Login successful!");
        
        // Get the session to determine redirect based on role
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        
        const userRole = session?.user?.role;
        
        // Redirect based on role
        if (userRole === "ADMIN" || userRole === "TEACHER") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard");
        }
        
        router.refresh();
      }
    } catch (error) {
      message.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Welcome to LearnEnglish
            </Title>
            <Text type="secondary">Sign in to continue your learning journey</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center" }}>
            <Text type="secondary">
              Don't have an account? <Link href="/register">Sign up</Link>
            </Text>
          </div>

          <div style={{ marginTop: 16, padding: 12, background: "#f5f5f5", borderRadius: 6 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <strong>Test Credentials:</strong>
              <br />
              Admin: admin@learnenglish.com / admin123
              <br />
              Teacher: teacher@learnenglish.com / teacher123
              <br />
              Student: student@learnenglish.com / student123
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}
