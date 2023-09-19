import { SSEDataFetch } from "@/app/home/utils/sse";
import { Descriptions, Typography } from "@douyinfe/semi-ui";
import "../styles/style.css";
import React from "react";

export default function XuiSummary() {
  const { Title } = Typography;
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetXuiDataSSE",
  );
  const networkSummaryData = [
    {
      key: "状态",
      value: data ? (
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
      value: data?.xuiData.user_count,
    },
    {
      key: "总上传流量",
      value:
        data?.xuiData.up_total !== undefined
          ? data?.xuiData.up_total.toFixed(2) + "GB"
          : null,
    },
    {
      key: "总下载流量",
      value:
        data?.xuiData.down_total !== undefined
          ? data?.xuiData.down_total.toFixed(2) + "GB"
          : null,
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
