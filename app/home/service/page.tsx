"use client";

import { Typography } from "@douyinfe/semi-ui";
import "../style.css";
import ServiceSummary from "@/app/home/service/components/serviceSummary";
import ServiceList from "@/app/home/service/components/serviceList";
import HomeSummary from "@/app/home/service/components/homeSummary";
import PaySummary from "@/app/home/service/components/paySummary";

export default function Service() {
  const { Title } = Typography;

  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "10px" }}
      >
        🛠️ 核心服务状态
      </Title>
      <ServiceSummary />
      <HomeSummary />
      <PaySummary />
      <ServiceList />
    </>
  );
}
