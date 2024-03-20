"use client";
import { Typography } from "@douyinfe/semi-ui";
import React from "react";

import SurgeStatus from "@/app/home/surge/surgeStatus";
import SurgeTraffic from "@/app/home/surge/surgeTraffic";

export default function SurgeContent() {
  const { Title } = Typography;

  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px" }}
      >
        🎛️️ Surge 网关状态
      </Title>
      <SurgeTraffic />
      <SurgeStatus />
    </>
  );
}
