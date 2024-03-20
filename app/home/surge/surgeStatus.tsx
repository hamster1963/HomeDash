import {
  IconActivity,
  IconDisc,
  IconSafe,
  IconSignal,
} from "@douyinfe/semi-icons";
import { Divider, Progress, Typography } from "@douyinfe/semi-ui";
import React from "react";

import SurgeCard from "@/app/home/surge/components/surgeCard";

function SurgeStatus() {
  const { Title, Text } = Typography;
  return (
    <section
      style={{
        marginLeft: "30px",
        marginRight: "30px",
        marginBottom: "30px",
        overflow: "visible",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <SurgeCard
        style={{
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            padding: "3px",
            width: "70px",
            height: "25px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(var(--semi-green-5), 1)",
          }}
        >
          <Text
            style={{
              color: "rgba(var(--semi-green-0), 1)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <IconDisc />
            已启用
          </Text>
        </div>
        <Title heading={1}>系统代理</Title>
      </SurgeCard>
      <SurgeCard
        style={{
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            padding: "3px",
            width: "70px",
            height: "25px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(var(--semi-green-5), 1)",
          }}
        >
          <Text
            style={{
              color: "rgba(var(--semi-green-0), 1)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <IconSafe />
            已启用
          </Text>
        </div>
        <Title heading={1}>增强模式</Title>
      </SurgeCard>
      <div
        className="responsive-divider"
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Divider
          style={{
            height: "100px",
          }}
          layout="vertical"
        />
      </div>
      <SurgeCard
        style={{
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "start",
          background: "rgba(var(--semi-grey-0), 1)",
          border: "none",
          boxShadow: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title heading={3}>设备数</Title>
          <Progress
            orbitStroke={"rgba(var(--semi-grey-1), 1)"}
            stroke={"rgba(var(--semi-green-5), 1)"}
            percent={40}
            type="circle"
            size="small"
          />
        </div>

        <Text
          style={{
            fontSize: "50px",
            lineHeight: "50px",
            fontWeight: "lighter",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "5px",
            marginTop: "20px",
          }}
        >
          144
          <Text
            style={{
              color: "rgba(var(--semi-green-5), 1)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <IconSignal />
            已连接
          </Text>
        </Text>
      </SurgeCard>
      <SurgeCard
        style={{
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "start",
          background: "rgba(var(--semi-grey-0), 1)",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Title heading={3}>在线时长</Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{
              fontSize: "50px",
              lineHeight: "50px",
              fontWeight: "lighter",
              display: "flex",
              alignItems: "baseline",
              gap: "5px",
              marginTop: "20px",
            }}
          >
            3
            <Text
              style={{
                fontSize: "15px",
                fontWeight: "lighter",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              Days
            </Text>
          </Text>
          <Text
            style={{
              color: "rgba(var(--semi-green-5), 1)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <IconActivity />
            已开启
          </Text>
        </div>
      </SurgeCard>
    </section>
  );
}

export default SurgeStatus;
