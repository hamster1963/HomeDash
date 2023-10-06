import {
  IconBrackets,
  IconCalendarClock,
  IconConnectionPoint2,
  IconGithubLogo,
  IconGlobeStroke,
  IconUser,
} from "@douyinfe/semi-icons";
import { Card, Progress, Typography } from "@douyinfe/semi-ui";
import React from "react";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

type InfoCardProps = {
  backgroundColor: string;
  backgroundFillColor: string;
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
  // 计算进度百分比
  const progressPercent =
    props.value !== 0 ? Math.round((props.value / props.total) * 100) : 0;
  // 使用线性渐变设置背景色
  // 这里我们使用绿色表示进度，你可以根据需要更改颜色
  const backgroundColor = `linear-gradient(90deg, ${props.backgroundFillColor} ${progressPercent}%, ${props.backgroundColor} ${progressPercent}%)`;
  return (
    <Card
      style={{
        flex: "1",
        minWidth: "220px",
        margin: "10px",
        borderRadius: "10px",
        border: "none",
        // backgroundColor: props.backgroundColor,
        backgroundImage: backgroundColor,
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
            alignItems: "center",
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
          orbitStroke={"rgba(var(--semi-grey-2), 0.5)"}
          style={{
            height: "4px",
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
  resetDay: z.string(),
});

const XuiInfoSchema = z.object({
  user_count: z.number(),
  up_total: z.number(),
  down_total: z.number(),
});

const GitHubInfoSchema = z.object({
  included_minutes: z.number(),
  next_bill_day: z.number(),
  total_minutes_used: z.number(),
});

const OpenaiUsageInfoSchema = z.object({
  monthly_usage: z.number(),
  next_bill_day: z.number(),
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

  const githubGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetGitHubActionDataSSE",
  );
  const githubValidation = GitHubInfoSchema.safeParse(
    githubGetData?.GitHubActionData,
  );

  const openaiGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetOpenaiUsageDataSSE",
  );
  const openaiValidation = OpenaiUsageInfoSchema.safeParse(
    openaiGetData?.OpenaiUsageData,
  );

  return (
    <>
      <InfoCard
        backgroundColor={"rgba(var(--semi-light-blue-3), 0.1)"}
        backgroundFillColor={"rgba(var(--semi-light-blue-3), 0.3)"}
        icon={<IconGlobeStroke />}
        title={"代理服务"}
        moreIcon={<IconCalendarClock />}
        value={
          coffeeValidation.success ? Number(coffeeValidation.data.usedBound) : 0
        }
        unit={"GB"}
        name={"CoffeeCloud"}
        total={
          coffeeValidation.success ? Number(coffeeValidation.data.planBound) : 0
        }
        moreInfo={
          "重置: " +
          (coffeeValidation.success ? coffeeValidation.data.resetDay : 0) +
          "天"
        }
      />
      <InfoCard
        backgroundColor={"rgba(var(--semi-light-green-3), 0.1)"}
        backgroundFillColor={"rgba(var(--semi-light-green-3), 0.3)"}
        icon={<IconConnectionPoint2 />}
        title={"x-ui 面板"}
        moreIcon={<IconUser />}
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
        backgroundColor={"rgba(var(--semi-cyan-3), 0.1)"}
        backgroundFillColor={"rgba(var(--semi-cyan-3), 0.3)"}
        icon={<IconGithubLogo />}
        title={"Actions"}
        moreIcon={<IconCalendarClock />}
        value={
          githubValidation.success
            ? githubValidation.data.total_minutes_used
            : 0
        }
        unit={"Minute"}
        name={"已用构建时间"}
        total={
          githubValidation.success ? githubValidation.data.included_minutes : 0
        }
        moreInfo={
          "重置: " +
          (githubValidation.success ? githubValidation.data.next_bill_day : 0) +
          "天"
        }
      />
      <InfoCard
        backgroundColor={"rgba(var(--semi-violet-3),0.1)"}
        backgroundFillColor={"rgba(var(--semi-violet-3),0.3)"}
        icon={<IconBrackets />}
        title={"OpenAI"}
        moreIcon={<IconCalendarClock />}
        value={
          openaiValidation.success ? openaiValidation.data.monthly_usage : 0
        }
        unit={"Dollar"}
        name={"使用量"}
        total={openaiValidation.success ? 50 : 0}
        moreInfo={
          "账单: " +
          (openaiValidation.success ? openaiValidation.data.next_bill_day : 0) +
          "天"
        }
      />
    </>
  );
}
