"use client";
import React from "react";
import { Divider, Typography } from "@douyinfe/semi-ui";
import NetworkSummary from "@/app/home/main/networkSummary";
import ProxySummary from "@/app/home/main/proxySummary";
import CoffeeSummary from "@/app/home/main/coffeeSummary";
import Server from "@/app/home/main/server";

export default function DashboardPage() {
  const { Title } = Typography;

  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px" }}
      >
        👋 你好, 欢迎来到 HomeDash
      </Title>
      <Divider margin="12px" align="left">
        <div
          style={{
            marginLeft: "-10px",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          家庭网络
        </div>
      </Divider>
      <NetworkSummary />
      <Divider margin="12px" align="left">
        <div
          style={{
            marginLeft: "-10px",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          科学上网
        </div>
      </Divider>
      <ProxySummary />
      <Divider margin="12px" align="left">
        <div
          style={{
            marginLeft: "-10px",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          代理服务
        </div>
      </Divider>
      <CoffeeSummary />
      <Divider margin="12px" align="left">
        <div
          style={{
            marginLeft: "-10px",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          系统状态
        </div>
      </Divider>
      <Server />
    </>
  );
}
