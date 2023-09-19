"use client";

import { Descriptions, Skeleton, Typography } from "@douyinfe/semi-ui";
import "../styles/style.css";
import { SSEDataFetch } from "@/app/home/utils/sse";

export default function ProxySummary() {
  const { Title } = Typography;
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
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
      key: "当前节点",
      value: data?.nodeInfo ? (
        data?.nodeInfo.nodeName.slice(1, -1)
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "上传速率",
      value:
        data?.proxyNetwork.rxSpeedMbps !== undefined ? (
          data?.proxyNetwork.rxSpeedMbps + "mb/s"
        ) : (
          <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
        ),
    },
    {
      key: "下载速率",
      value:
        data?.proxyNetwork.txSpeedMbps !== undefined ? (
          data?.proxyNetwork.txSpeedMbps + "mb/s"
        ) : (
          <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
        ),
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
