"use client";

import useSWRSubscription from "swr/subscription";
import { Descriptions, Typography } from "@douyinfe/semi-ui";
import "./style.css";

export default function ProxySummary() {
  const { Title } = Typography;
  const { data } = useSWRSubscription(
    "http://120.24.211.49:10401/GetNetworkDataSSE",
    (key, { next }) => {
      const source = new EventSource(key);
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        next(null, parsedData);
      };
      source.onerror = () => next(new Error("EventSource error"));
      return () => source.close();
    },
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
      value: data?.nodeInfo.nodeName.slice(1, -1),
    },
    {
      key: "上传速率",
      value:
        data?.proxyNetwork.rxSpeedMbps !== undefined
          ? data?.proxyNetwork.rxSpeedMbps + "mb/s"
          : null,
    },
    {
      key: "下载速率",
      value:
        data?.proxyNetwork.txSpeedMbps !== undefined
          ? data?.proxyNetwork.txSpeedMbps + "mb/s"
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
