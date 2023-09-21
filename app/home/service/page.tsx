"use client";

import { Typography } from "@douyinfe/semi-ui";
import "../styles/style.css";
import ServiceSummary from "@/app/home/service/serviceSummary";
import ServiceList from "@/app/home/service/serviceList";

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
      <ServiceList />
    </>
  );
}
