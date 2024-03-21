import {
  IconActivity,
  IconDisc,
  IconSafe,
  IconSignal,
} from "@douyinfe/semi-icons";
import { Divider, Progress, Typography } from "@douyinfe/semi-ui";
import React from "react";

import SurgeCard from "@/app/home/surge/components/surgeCard";
import { surgeTrafficDataSchema } from "@/app/home/surge/surgeTraffic";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

function SurgeStatus() {
  const { Title, Text } = Typography;
  const surgeGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetSurgeInfoSSE",
  );
  const surgeValidation = surgeTrafficDataSchema.safeParse(
    surgeGetData?.surgeInfo,
  );
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
            {surgeValidation.success
              ? surgeValidation.data.system_proxy_status
                ? "已启用"
                : "已禁用"
              : "..."}
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
            {surgeValidation.success
              ? surgeValidation.data.enhanced_mode_status
                ? "已开启"
                : "已关闭"
              : "..."}
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
            percent={
              surgeValidation.success
                ? (surgeValidation.data.connected_device / 230) * 100
                : 100
            }
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
          {surgeValidation.success
            ? surgeValidation.data.connected_device
            : "..."}
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
            {surgeValidation.success
              ? surgeValidation.data.traffic.start_days.toFixed(2)
              : "..."}
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
