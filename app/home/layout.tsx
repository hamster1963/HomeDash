"use client";
import "./globals.css";

import { Layout } from "@douyinfe/semi-ui";
import React, { useState } from "react";

import FixedButton from "@/app/home/utils/fixedButton";
import LeftSide from "@/app/home/utils/leftSide";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Sider, Content } = Layout;

  const [navWidth, setNavWidth] = useState("220px");
  const callbackNavWidth = (width: string) => {
    setNavWidth(width);
  };

  return (
    <Layout>
      <Sider
        style={{
          marginRight: navWidth,
        }}
      >
        <LeftSide callbackWidth={callbackNavWidth} />
      </Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <FixedButton />
    </Layout>
  );
}
