"use client";

import {
  Card,
  Descriptions,
  Divider,
  Progress,
  Typography,
} from "@douyinfe/semi-ui";
import "../styles/style.css";
import ServiceSummary from "@/app/home/service/serviceSummary";

export default function Service() {
  const { Title } = Typography;

  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px" }}
      >
        🛠️ 核心服务状态
      </Title>
      <Divider margin="12px" align="left">
        <div
          style={{
            marginLeft: "-10px",
            fontWeight: "normal",
            fontSize: "30px",
          }}
        >
          服务概览
        </div>
      </Divider>
      <ServiceSummary />
    </>
  );
}
