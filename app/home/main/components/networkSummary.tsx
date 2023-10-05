import "../../style.css";

import { Descriptions, Skeleton } from "@douyinfe/semi-ui";
import React, { useEffect } from "react";

import NetworkChart from "@/app/home/main/components/networkChart";
import { useSSEContext } from "@/app/home/utils/sseContext";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

export default function NetworkSummary() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );

  const { setSSEConnect, HomeNetworkSpeedList, setHomeNetworkSpeedList } =
    useSSEContext();

  useEffect(() => {
    if (data?.homeNetwork?.rxSpeedMbps !== undefined) {
      // 获取当前的速度列表
      const currentList = [...HomeNetworkSpeedList];

      // 添加新的速度数据到列表中
      currentList.push({
        speed: Number(
          data.homeNetwork.rxSpeedMbps + data.homeNetwork.txSpeedMbps,
        ),
      });

      // 如果长度大于10，删除第一个元素
      if (currentList.length > 10) {
        currentList.shift();
      }

      // 更新速度列表
      setHomeNetworkSpeedList(currentList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) {
      setSSEConnect(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        data={HomeNetworkSpeedList}
        keyString={"speed"}
        colorToken={"blue"}
      />
    </>
  );
}
