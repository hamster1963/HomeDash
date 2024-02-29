import { Skeleton, Typography } from "@douyinfe/semi-ui";
import React, { useEffect } from "react";
import { z } from "zod";

import NetworkChart from "@/app/home/main/components/networkChart";
import NewDescription from "@/app/home/main/components/NewDescription";
import { useSSEContext } from "@/app/home/utils/sseContext";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

const proxyInfoSchema = z.object({
  rxSpeedMbps: z.number(),
  txSpeedMbps: z.number(),
});

const nodeInfoSchema = z.object({
  nodeName: z.string(),
  nodeLatency: z.string(),
});

export default function ProxySummary() {
  const { Title } = Typography;
  const proxyGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  const proxyValidation = proxyInfoSchema.safeParse(proxyGetData?.proxyNetwork);
  const nodeValidation = nodeInfoSchema.safeParse(proxyGetData?.nodeInfo);

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
  }, [proxyGetData]);

  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );
  return (
    <>
      <div
        className={"newDescription"}
        style={{
          gap: "20px",
          display: "flex",
          marginLeft: "10px",
          marginRight: "10px",
          flexWrap: "wrap",
        }}
      >
        <NewDescription
          keyString={"当前节点"}
          value={
            nodeValidation.success ? (
              <Title heading={5}>
                {nodeValidation.data.nodeName.slice(1, -1)}
              </Title>
            ) : (
              <Skeleton
                placeholder={placeholder}
                loading={true}
                active
              ></Skeleton>
            )
          }
        />
        <NewDescription
          keyString={"延迟"}
          value={
            nodeValidation.success ? (
              nodeValidation.data.nodeLatency + "ms"
            ) : (
              <Skeleton
                placeholder={placeholder}
                loading={true}
                active
              ></Skeleton>
            )
          }
        />
        <NewDescription
          keyString={"上传速率"}
          value={
            proxyValidation.success ? (
              proxyValidation.data.txSpeedMbps + "mb/s"
            ) : (
              <Skeleton
                placeholder={placeholder}
                loading={true}
                active
              ></Skeleton>
            )
          }
        />
        <NewDescription
          keyString={"下载速率"}
          value={
            proxyValidation.success ? (
              proxyValidation.data.rxSpeedMbps + "mb/s"
            ) : (
              <Skeleton
                placeholder={placeholder}
                loading={true}
                active
              ></Skeleton>
            )
          }
        />
      </div>

      <NetworkChart
        data={ProxyNetworkSpeedList}
        keyString={"speed"}
        colorToken={"purple"}
      />
    </>
  );
}
