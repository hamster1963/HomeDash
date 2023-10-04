"use client";
import {
  IconGithubLogo,
  IconTick,
  IconUploadError,
} from "@douyinfe/semi-icons";
import { Tag, Typography } from "@douyinfe/semi-ui";
import React from "react";

import CoffeeSummary from "@/app/home/main/components/coffeeSummary";
import NetworkSummary from "@/app/home/main/components/networkSummary";
import ProxySummary from "@/app/home/main/components/proxySummary";
import Server from "@/app/home/main/components/serverList";
import XuiInfoSummary from "@/app/home/main/components/xuiSummary";
import { useSSEConnect } from "@/app/home/utils/sseContext";

export default function DashboardPage() {
  const { Title } = Typography;
  const { SSEConnect } = useSSEConnect();

  return (
    <>
      <Title
        heading={2}
        style={{
          marginTop: "30px",
          marginLeft: "30px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
        >
          👋 你好, 欢迎来到 HomeDash
          {SSEConnect ? (
            <Tag
              type={"light"}
              color="green"
              prefixIcon={<IconTick />}
              size="large"
              shape="circle"
              style={{
                marginLeft: "5px",
              }}
            >
              SSE 已连接
            </Tag>
          ) : (
            <Tag
              type={"light"}
              color="red"
              prefixIcon={<IconUploadError />}
              size="large"
              shape="circle"
              style={{
                marginLeft: "5px",
              }}
            >
              SSE 未连接
            </Tag>
          )}
          <Tag
            color="grey"
            prefixIcon={<IconGithubLogo />}
            size="large"
            shape="circle"
            onClick={() => {
              window.open("https://github.com/hamster1963/HomeDash");
            }}
            style={{
              marginLeft: "5px",
            }}
          >
            GitHub
          </Tag>
        </div>
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
