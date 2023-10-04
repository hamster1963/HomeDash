"use client";
import React from "react";
import { Typography } from "@douyinfe/semi-ui";
import NetworkSummary from "@/app/home/main/components/networkSummary";
import ProxySummary from "@/app/home/main/components/proxySummary";
import CoffeeSummary from "@/app/home/main/components/coffeeSummary";
import Server from "@/app/home/main/components/serverList";
import XuiInfoSummary from "@/app/home/main/components/xuiSummary";

export default function DashboardPage() {
  const { Title } = Typography;

  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "10px" }}
      >
        👋 你好, 欢迎来到 HomeDash
      </Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            paddingTop: "10px",
            border: "1px solid rgba(var(--semi-grey-1), 1)",
            borderRadius: "15px",
            minWidth: "200px",
            marginRight: "20px",
            marginBottom: "20px",
            flex: 1,
          }}
        >
          <Title
            heading={3}
            style={{
              marginLeft: "20px",
            }}
          >
            家庭网络
          </Title>
          <NetworkSummary />
        </div>

        <div
          style={{
            paddingTop: "10px",
            border: "1px solid rgba(var(--semi-grey-1), 1)",
            borderRadius: "15px",
            flex: 1,
            marginRight: "20px",
            marginBottom: "20px",
            minWidth: "200px",
          }}
        >
          <Title
            heading={3}
            style={{
              marginLeft: "20px",
            }}
          >
            科学上网
          </Title>
          <ProxySummary />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "10px",
          }}
        >
          <Title
            heading={3}
            style={{
              marginLeft: "20px",
            }}
          >
            代理服务
          </Title>
          <CoffeeSummary />
        </div>
        <div
          style={{
            padding: "10px",
          }}
        >
          <Title
            heading={3}
            style={{
              marginLeft: "20px",
            }}
          >
            x-ui
          </Title>
          <XuiInfoSummary />
        </div>
      </div>

      <Title
        heading={3}
        style={{
          marginLeft: "30px",
          marginBottom: "10px",
        }}
      >
        系统状态
      </Title>
      <Server />
    </>
  );
}
