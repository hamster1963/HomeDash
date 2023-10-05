import { IconCode, IconGithubLogo, IconResso } from "@douyinfe/semi-icons";
import { Card, Progress, Typography } from "@douyinfe/semi-ui";
import React from "react";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

type InfoCardProps = {
  backgroundColor: string;
  icon: React.ReactNode;
  title: string;
  moreIcon: React.ReactNode;
  moreInfo: string;
  value: number;
  unit: string;
  name: string;
  total: number;
};

export function InfoCard(props: InfoCardProps) {
  const { Title } = Typography;
  return (
    <Card
      style={{
        flex: "1",
        minWidth: "220px",
        margin: "10px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: props.backgroundColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            {props.icon}
            <Title
              heading={6}
              style={{
                marginLeft: "5px",
              }}
            >
              {props.title}
            </Title>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                marginRight: "5px",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              {props.moreInfo}
            </div>
            {props.moreIcon}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "baseline",
          }}
        >
          <Title
            style={{
              marginTop: "15px",
              marginBottom: "10px",
            }}
            heading={1}
          >
            {props.value.toFixed(2)}
          </Title>
          <Title
            style={{
              marginLeft: "3px",
              fontWeight: "lighter",
            }}
            heading={6}
          >
            {props.unit}
          </Title>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            {props.name}
          </div>
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            {props.value.toFixed(2)}/{props.total}
          </div>
        </div>
        <Progress
          stroke={"rgba(var(--semi-grey-9), 1)"}
          orbitStroke={"rgba(var(--semi-grey-1), 1)"}
          style={{
            height: "8px",
          }}
          percent={
            props.value !== 0
              ? Math.round((props.value / props.total) * 100)
              : 0
          }
          aria-label={props.name}
        />
      </div>
    </Card>
  );
}

const CoffeeInfoSchema = z.object({
  usedBound: z.string(),
  remainBound: z.string(),
  planBound: z.string(),
});

const XuiInfoSchema = z.object({
  user_count: z.number(),
  up_total: z.number(),
  down_total: z.number(),
});

export default function InfoCardList() {
  const coffeeGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  const coffeeValidation = CoffeeInfoSchema.safeParse(
    coffeeGetData?.coffeeInfo,
  );
  const xuiGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetXuiDataSSE",
  );
  const xuiValidation = XuiInfoSchema.safeParse(xuiGetData?.xuiData);
  return (
    <>
      <InfoCard
        backgroundColor={"rgba(var(--semi-blue-0), 0.5)"}
        icon={<IconResso />}
        title={"代理服务"}
        moreIcon={<IconCode />}
        value={
          coffeeValidation.success ? Number(coffeeValidation.data.usedBound) : 0
        }
        unit={"GB"}
        name={"CoffeeCloud"}
        total={
          coffeeValidation.success ? Number(coffeeValidation.data.planBound) : 0
        }
        moreInfo={"重置: " + "12 天"}
      />
      <InfoCard
        backgroundColor={"rgba(var(--semi-purple-0), 0.5)"}
        icon={<IconResso />}
        title={"x-ui 面板"}
        moreIcon={<IconCode />}
        value={xuiValidation.success ? xuiValidation.data.down_total : 0}
        unit={"GB"}
        name={"下载流量"}
        total={xuiValidation.success ? 1000 : 0}
        moreInfo={
          "用户数: " +
          (xuiValidation.success ? xuiValidation.data.user_count : 0)
        }
      />
      <InfoCard
        backgroundColor={"rgba(var(--semi-green-0), 0.5)"}
        icon={<IconGithubLogo />}
        title={"Actions"}
        moreIcon={<IconCode />}
        value={xuiValidation.success ? 65 : 0}
        unit={"Minutes"}
        name={"已用构建时间"}
        total={xuiValidation.success ? 2400 : 0}
        moreInfo={"构建次数: " + (xuiValidation.success ? 254 : 0)}
      />
    </>
  );
}
