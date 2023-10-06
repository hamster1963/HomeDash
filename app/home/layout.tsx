"use client";
import "./globals.css";

import { Layout } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";

import FixedButton from "@/app/home/utils/fixedButton";
import LeftSide from "@/app/home/utils/leftSide";
import { useSSEContext } from "@/app/home/utils/sseContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Sider, Content } = Layout;

  // 从 SSEContext 中获取侧边栏状态及其 setter 函数
  const { isNavCollapsed } = useSSEContext();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout>
      <Sider
        style={{
          marginRight: isNavCollapsed ? "60px" : "220px",
        }}
      >
        <LeftSide />
      </Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <FixedButton />
    </Layout>
  );
}
