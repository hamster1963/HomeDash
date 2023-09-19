"use client";
import { Descriptions, Typography } from "@douyinfe/semi-ui";
import "./style.css";
import { SSEDataFetch } from "@/app/home/utils/sse";

export default function NetworkSummary() {
  const { Title } = Typography;

  const data = SSEDataFetch("https://120.24.211.49/GetNetworkDataSSE");

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
      key: "设备数",
      value: data?.homeNetwork.deviceCount,
    },
    {
      key: "上传速率",
      value:
        data?.homeNetwork.rxSpeedMbps !== undefined
          ? data?.homeNetwork.rxSpeedMbps + "mb/s"
          : null,
    },
    {
      key: "下载速率",
      value:
        data?.homeNetwork.txSpeedMbps !== undefined
          ? data?.homeNetwork.txSpeedMbps + "mb/s"
          : null,
    },
  ];

  return (
    <>
      <Descriptions
        className="myDescription"
        data={networkSummaryData}
        row
        size="large"
      />
    </>
  );
}
