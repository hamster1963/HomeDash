import { Skeleton } from "@douyinfe/semi-ui";
import React, { useEffect } from "react";
import { z } from "zod";

import NetworkChart from "@/app/home/main/components/networkChart";
import NewDescription from "@/app/home/main/components/NewDescription";
import { useSSEContext } from "@/app/home/utils/sseContext";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

const NetworkInfoSchema = z.object({
  deviceCount: z.number(),
  rxSpeedMbps: z.number(),
  txSpeedMbps: z.number(),
})

const AdGuardInfoSchema = z.object({
  AvgProcessingTime: z.number(),
  NumBlockedFiltering: z.number(),
  NumDnsQueries: z.number(),
});

export default function NetworkSummary() {
  const networkGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  const networkValidation = NetworkInfoSchema.safeParse(
    networkGetData?.homeNetwork,
  );
  const adguardGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetAdGuardInfoSSE",
  );
  const adguardValidation = AdGuardInfoSchema.safeParse(
    adguardGetData?.adGuardInfo,
  );

  const { setSSEConnect, HomeNetworkSpeedList, setHomeNetworkSpeedList } =
    useSSEContext();

  useEffect(() => {
    if (networkValidation.success) {
      // 获取当前的速度列表
      const currentList = [...HomeNetworkSpeedList];

      // 添加新的速度数据到列表中
      currentList.push({
        speed: Number(
          networkValidation.data.rxSpeedMbps +
          networkValidation.data.txSpeedMbps,
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
  }, [networkGetData]);

  useEffect(() => {
    if (networkValidation.success) {
      setSSEConnect(true);
    } else {
      setSSEConnect(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkGetData]);

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
          keyString={"设备数"}
          value={
            networkValidation.success ? (
              networkValidation.data.deviceCount
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
          style={{
            width: "105px",
            overflow: "hidden",
          }}
          keyString={"上传速率"}
          value={
            networkValidation.success ? (
              networkValidation.data.txSpeedMbps + "mb/s"
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
          style={{
            width: "105px",
            overflow: "hidden",
          }}
          keyString={"下载速率"}
          value={
            networkValidation.success ? (
              networkValidation.data.rxSpeedMbps + "mb/s"
            ) : (
              <Skeleton
                placeholder={placeholder}
                loading={true}
                active
              ></Skeleton>
            )
          }
        />
        <section
          style={{
            columnGap: "20px",
            display: "flex",
          }}
        >
          <NewDescription
            keyString={"DNS查询数"}
            value={
              adguardValidation.success ? (
                adguardValidation.data.NumDnsQueries
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
            keyString={"拦截数"}
            value={
              adguardValidation.success ? (
                adguardValidation.data.NumBlockedFiltering
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
            keyString={"处理时间"}
            value={
              adguardValidation.success ? (
                adguardValidation.data.AvgProcessingTime + "ms"
              ) : (
                <Skeleton
                  placeholder={placeholder}
                  loading={true}
                  active
                ></Skeleton>
              )
            }
          />
        </section>
      </div>
      <NetworkChart
        data={HomeNetworkSpeedList}
        keyString={"speed"}
        colorToken={"blue"}
      />
    </>
  );
}
