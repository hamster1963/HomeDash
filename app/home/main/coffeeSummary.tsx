"use client";

import { Descriptions, Progress, Typography } from "@douyinfe/semi-ui";
import "../styles/style.css";
import { SSEDataFetch } from "@/app/home/utils/sse";

export default function CoffeeSummary() {
  const { Title } = Typography;
  const data = SSEDataFetch("https://120.24.211.49/GetNetworkDataSSE");
  const networkSummaryData = [
    {
      key: "服务商",
      value: <Title heading={2}>CoffeeCloud</Title>,
    },
    {
      key: "已使用流量",
      value:
        data?.coffeeInfo.usedBound !== undefined
          ? data?.coffeeInfo.usedBound + "GB"
          : null,
    },
    {
      key: "剩余流量",
      value:
        data?.coffeeInfo.remainBound !== undefined
          ? data?.coffeeInfo.remainBound + "GB"
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
          {data?.coffeeInfo.remainBound !== undefined
            ? (
                (Number(data?.coffeeInfo.remainBound) /
                  Number(data?.coffeeInfo.planBound)) *
                100
              ).toFixed(2) + "%"
            : null}
          {data?.coffeeInfo.remainBound !== undefined && (
            <Progress
              percent={
                (Number(data?.coffeeInfo.remainBound) /
                  Number(data?.coffeeInfo.planBound)) *
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
