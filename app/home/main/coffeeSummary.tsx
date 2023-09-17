"use client";

import useSWRSubscription from "swr/subscription";
import { Descriptions, Progress, Typography } from "@douyinfe/semi-ui";
import "./style.css";

export default function CoffeeSummary() {
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
      key: "服务商",
      value: <Title heading={2}>CoffeeCloud</Title>,
    },
    {
      key: "已使用流量",
      value:
        data?.proxyInfo.usedBound !== undefined
          ? data?.proxyInfo.usedBound + "GB"
          : null,
    },
    {
      key: "剩余流量",
      value:
        data?.proxyInfo.remainBound !== undefined
          ? data?.proxyInfo.remainBound + "GB"
          : null,
    },
    {
      key: "剩余占比",
      value: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {data?.proxyInfo.remainBound !== undefined
            ? (
                (Number(data?.proxyInfo.remainBound) /
                  Number(data?.proxyInfo.planBound)) *
                100
              ).toFixed(2) + "%"
            : null}
          {data?.proxyInfo.remainBound !== undefined && (
            <Progress
              percent={
                (Number(data?.proxyInfo.remainBound) /
                  Number(data?.proxyInfo.planBound)) *
                100
              }
              style={{
                marginLeft: "5px",
              }}
              type="circle"
              size="small"
            />
          )}
        </div>
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
