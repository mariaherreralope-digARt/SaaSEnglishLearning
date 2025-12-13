import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SellPoint - Marketplace for Digital & Physical Goods",
  description: "Buy and sell items with ease on SellPoint marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1890ff",
                colorSuccess: "#52c41a",
                colorWarning: "#faad14",
                colorError: "#ff4d4f",
                colorInfo: "#1890ff",
                borderRadius: 6,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              },
              components: {
                Button: {
                  controlHeight: 40,
                  fontSize: 14,
                },
                Input: {
                  controlHeight: 40,
                },
                Select: {
                  controlHeight: 40,
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
