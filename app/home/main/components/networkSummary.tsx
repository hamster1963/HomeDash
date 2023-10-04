import "../../style.css";

import { Descriptions, Skeleton } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";

import NetworkChart from "@/app/home/main/components/networkChart";
import { useSSEConnect } from "@/app/home/utils/sseContext";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

export default function NetworkSummary() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );

  type SpeedData = { speed: number };

  const { setSSEConnect } = useSSEConnect();

  // 1. 使用 useState 设置状态
  const [rxSpeedList, setRxSpeedList] = useState<SpeedData[]>([]);

  // 2. 使用 useEffect 监视数据的变化
  useEffect(() => {
    if (data?.homeNetwork?.rxSpeedMbps !== undefined) {
      setRxSpeedList((prevList) => {
        const newList = [
          ...prevList,
          {
            speed: data.homeNetwork.rxSpeedMbps + data.homeNetwork.txSpeedMbps,
          },
        ];
        if (newList.length > 10) {
          newList.shift(); // 删除最旧的数据
        }
        return newList;
      });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setSSEConnect(true);
    }
  }, [data, setSSEConnect]);

  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );

  const networkSummaryData = [
    {
      key: "设备数",
      value: data?.homeNetwork ? (
        data?.homeNetwork.deviceCount
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "上传速率",
      value: data?.homeNetwork ? (
        data?.homeNetwork.txSpeedMbps + "mb/s"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "下载速率",
      value: data?.homeNetwork ? (
        data?.homeNetwork.rxSpeedMbps + "mb/s"
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
        colorToken={"blue"}
      />
    </>
  );
}
