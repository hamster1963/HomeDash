"use client";
import { Typography } from "@douyinfe/semi-ui";
import React from "react";

import XuiSummary from "@/app/home/xui/components/xuiDetail";
import XuiTable from "@/app/home/xui/components/xuiTable";

export default function XuiContent() {
  const { Title } = Typography;
  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px" }}
      >
        👨‍👨‍👧‍👦 代理用户列表
      </Title>
      <XuiSummary />
      <XuiTable />
    </>
  );
}
