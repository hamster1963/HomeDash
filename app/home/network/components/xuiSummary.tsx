import { SSEDataFetch } from "@/app/home/utils/sseFetch";
import { Descriptions, Skeleton, Typography } from "@douyinfe/semi-ui";
import "../../style.css";
import React from "react";

export default function XuiSummary() {
  const { Title } = Typography;
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetXuiDataSSE",
  );
  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );
  const networkSummaryData = [
    {
      key: "状态",
      value: data?.xuiData ? (
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
      value: data?.xuiData ? (
        data?.xuiData.user_count
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "总上传流量",
      value: data?.xuiData ? (
        data?.xuiData.up_total.toFixed(2) + "GB"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "总下载流量",
      value: data?.xuiData ? (
        data?.xuiData.down_total.toFixed(2) + "GB"
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
