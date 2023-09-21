"use client";

import {
  Descriptions,
  Progress,
  Skeleton,
  Typography,
} from "@douyinfe/semi-ui";
import "../styles/style.css";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

export default function CoffeeSummary() {
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
      key: "服务商",
      value: (
        <Title heading={2}>
          {data ? (
            "CoffeeCloud"
          ) : (
            <Skeleton
              placeholder={placeholder}
              loading={true}
              active
            ></Skeleton>
          )}
        </Title>
      ),
    },
    {
      key: "已使用流量",
      value:
        data?.coffeeInfo.usedBound !== undefined ? (
          data?.coffeeInfo.usedBound + "GB"
        ) : (
          <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
        ),
    },
    {
      key: "剩余流量",
      value:
        data?.coffeeInfo.remainBound !== undefined ? (
          data?.coffeeInfo.remainBound + "GB"
        ) : (
          <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
        ),
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
          {data?.coffeeInfo.remainBound !== undefined ? (
            (
              (Number(data?.coffeeInfo.remainBound) /
                Number(data?.coffeeInfo.planBound)) *
              100
            ).toFixed(2) + "%"
          ) : (
            <Skeleton
              placeholder={placeholder}
              loading={true}
              active
            ></Skeleton>
          )}
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
