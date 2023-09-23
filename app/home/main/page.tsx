"use client";
import React from "react";
import { Divider, Typography } from "@douyinfe/semi-ui";
import NetworkSummary from "@/app/home/main/networkSummary";
import ProxySummary from "@/app/home/main/proxySummary";
import CoffeeSummary from "@/app/home/main/coffeeSummary";
import Server from "@/app/home/main/server";
import XuiInfoSummary from "@/app/home/main/xuiSummary";

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
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
              display: "flex",
              flexDirection: "column",
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
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
