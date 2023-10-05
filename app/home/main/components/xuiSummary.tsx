import "../../style.css";

import { Descriptions, Skeleton } from "@douyinfe/semi-ui";
import React from "react";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

const XuiInfoSchema = z.object({
  user_count: z.number(),
  up_total: z.number(),
  down_total: z.number(),
});

export default function XuiInfoSummary() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetXuiDataSSE",
  );
  const xuiValidation = XuiInfoSchema.safeParse(data?.xuiData);

  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );

  const networkSummaryData = [
    {
      key: "代理用户数",
      value: xuiValidation.success ? (
        xuiValidation.data.user_count
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "总上传流量",
      value: xuiValidation.success ? (
        xuiValidation.data.up_total.toFixed(2) + "GB"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "总下载流量",
      value: xuiValidation.success ? (
        xuiValidation.data.down_total.toFixed(2) + "GB"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
  ];

  return (
    <>
      <Descriptions
        className="mainDescription"
        data={networkSummaryData}
        row
        size="medium"
      />
    </>
  );
}
