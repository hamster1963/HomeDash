import { Descriptions, Skeleton, Typography } from "@douyinfe/semi-ui";
import React, { useEffect } from "react";
import { z } from "zod";

import NetworkChart from "@/app/home/main/components/networkChart";
import { useSSEContext } from "@/app/home/utils/sseContext";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

const proxyInfoSchema = z.object({
  rxSpeedMbps: z.number(),
  txSpeedMbps: z.number(),
});

const nodeInfoSchema = z.object({
  nodeName: z.string(),
});

export default function ProxySummary() {
  const { Title } = Typography;
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  const proxyValidation = proxyInfoSchema.safeParse(data?.proxyNetwork);
  const nodeValidation = nodeInfoSchema.safeParse(data?.nodeInfo);

  const { ProxyNetworkSpeedList, setProxyNetworkSpeedList } = useSSEContext();

  useEffect(() => {
    if (proxyValidation.success) {
      // 获取当前的速度列表
      const currentList = [...ProxyNetworkSpeedList];

      // 添加新的速度数据到列表中
      currentList.push({
        speed: Number(
          proxyValidation.data.rxSpeedMbps + proxyValidation.data.txSpeedMbps,
        ),
      });

      // 如果长度大于10，删除第一个元素
      if (currentList.length > 10) {
        currentList.shift();
      }

      // 更新速度列表
      setProxyNetworkSpeedList(currentList);
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
      key: "当前节点",
      value: nodeValidation.success ? (
        <Title heading={5}>{nodeValidation.data.nodeName.slice(1, -1)}</Title>
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "上传速率",
      value: proxyValidation.success ? (
        proxyValidation.data.txSpeedMbps + "mb/s"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "下载速率",
      value: proxyValidation.success ? (
        proxyValidation.data.rxSpeedMbps + "mb/s"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
  ];
  return (
    <>
      <Descriptions
        className="mainDescription"
        data={networkSummaryData}
        row
        size="medium"
      />
      <NetworkChart
        data={ProxyNetworkSpeedList}
        keyString={"speed"}
        colorToken={"purple"}
      />
    </>
  );
}
