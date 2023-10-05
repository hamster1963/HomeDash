import "../../style.css";

import { Descriptions, Skeleton, Typography } from "@douyinfe/semi-ui";
import React from "react";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

const xuiDetailDataSchema = z.object({
  user_count: z.number(),
  up_total: z.number(),
  down_total: z.number(),
});

export default function XuiSummary() {
  const { Title } = Typography;
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetXuiDataSSE",
  );
  const xuiDetailValidation = xuiDetailDataSchema.safeParse(data?.xuiData);
  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );
  const networkSummaryData = [
    {
      key: "状态",
      value: xuiDetailValidation.success ? (
        <Title heading={2} type="success">
          在线
        </Title>
      ) : (
        <Title heading={2} type="danger">
          离线
        </Title>
      ),
    },
    {
      key: "代理用户数",
      value: xuiDetailValidation.success ? (
        xuiDetailValidation.data.user_count
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "总上传流量",
      value: xuiDetailValidation.success ? (
        xuiDetailValidation.data.up_total.toFixed(2) + "GB"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "总下载流量",
      value: xuiDetailValidation.success ? (
        xuiDetailValidation.data.down_total.toFixed(2) + "GB"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
  ];

  return (
    <>
      <Descriptions
        className="xuiDescription"
        data={networkSummaryData}
        row
        size="large"
      />
    </>
  );
}
