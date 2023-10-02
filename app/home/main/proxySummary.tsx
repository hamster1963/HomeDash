"use client";

import { Descriptions, Skeleton, Typography } from "@douyinfe/semi-ui";
import "../styles/style.css";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";
import NetworkChart from "@/app/home/main/networkChart";
import React, { useEffect, useState } from "react";

export default function ProxySummary() {
  const { Title } = Typography;
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  type SpeedData = { speed: number };

  // 1. 使用 useState 设置状态
  const [rxSpeedList, setRxSpeedList] = useState<SpeedData[]>([]);

  // 2. 使用 useEffect 监视数据的变化
  useEffect(() => {
    if (data?.proxyNetwork.rxSpeedMbps !== undefined) {
      setRxSpeedList((prevList) => {
        const newList = [
          ...prevList,
          {
            speed:
              data.proxyNetwork.rxSpeedMbps + data.proxyNetwork.txSpeedMbps,
          },
        ];
        if (newList.length > 10) {
          newList.shift(); // 删除最旧的数据
        }
        return newList;
      });
    }
  }, [data]);
  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );
  const networkSummaryData = [
    {
      key: "当前节点",
      value: data?.nodeInfo ? (
        <Title heading={6}>{data?.nodeInfo.nodeName.slice(1, -1)}</Title>
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "上传速率",
      value: data?.proxyNetwork ? (
        data?.proxyNetwork.txSpeedMbps + "mb/s"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "下载速率",
      value: data?.proxyNetwork ? (
        data?.proxyNetwork.rxSpeedMbps + "mb/s"
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
        size="medium"
      />
      <NetworkChart
        data={rxSpeedList}
        keyString={"speed"}
        colorToken={"purple"}
      />
    </>
  );
}
