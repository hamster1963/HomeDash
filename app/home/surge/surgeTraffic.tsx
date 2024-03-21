import { Descriptions, Skeleton, Typography } from "@douyinfe/semi-ui";
import React from "react";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

export const surgeTrafficDataSchema = z.object({
  traffic: z.object({
    out_current_speed: z.number(),
    in_current_speed: z.number(),
    direct: z.number(),
    proxy: z.number(),
    total: z.number(),
    start_days: z.number(),
  }),
  connected_device: z.number(),
  enhanced_mode_status: z.boolean(),
  system_proxy_status: z.boolean(),
  now_node: z.string(),
  node_latency: z.number(),
});

function SurgeTraffic() {
  const { Title, Text } = Typography;
  const surgeGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetSurgeInfoSSE",
  );
  const surgeValidation = surgeTrafficDataSchema.safeParse(
    surgeGetData?.surgeInfo,
  );
  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );
  const surgeTrafficDataOne = [
    {
      key: "上传速度",
      value: surgeValidation.success ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "5px",
          }}
        >
          <Text
            style={{
              fontSize: "50px",
              lineHeight: "50px",
              fontWeight: "lighter",
            }}
          >
            {surgeValidation.data.traffic.out_current_speed.toFixed(2)}
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "lighter",
            }}
          >
            Mb/s
          </Text>
        </div>
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "下载速度",
      value: surgeValidation.success ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "5px",
          }}
        >
          <Text
            style={{
              fontSize: "50px",
              lineHeight: "50px",
              fontWeight: "lighter",
            }}
          >
            {surgeValidation.data.traffic.in_current_speed.toFixed(2)}
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "lighter",
            }}
          >
            Mb/s
          </Text>
        </div>
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
  ];
  const surgeTrafficDataTwo = [
    {
      key: "节点",
      value: surgeValidation.success ? (
        <Title
          heading={2}
          style={{
            fontWeight: "lighter",
          }}
        >
          {surgeValidation.data.now_node}
        </Title>
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "延迟",
      value: surgeValidation.success ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "5px",
          }}
        >
          <Text
            style={{
              fontSize: "33px",
              fontWeight: "lighter",
            }}
          >
            {surgeValidation.data.node_latency.toFixed(2)}
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "lighter",
            }}
          >
            ms
          </Text>
        </div>
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "流量占比",
      value: surgeValidation.success ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "250px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width:
                (surgeValidation.data.traffic.direct /
                  surgeValidation.data.traffic.total) *
                  100 +
                "%",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "lighter",
                color: "rgba(var(--semi-grey-6), 1)",
              }}
            >
              {surgeValidation.data.traffic.direct.toFixed(2) + "GB"}
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                height: "5px",
                backgroundColor: "rgba(var(--semi-grey-3), 1)",
                marginRight: "5px",
                borderRadius: "10px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width:
                (surgeValidation.data.traffic.proxy /
                  surgeValidation.data.traffic.total) *
                  100 +
                "%",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "lighter",
                color: "rgba(var(--semi-green-6), 1)",
              }}
            >
              {surgeValidation.data.traffic.proxy.toFixed(2) + "GB"}
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "5px",
                backgroundColor: "rgba(var(--semi-green-5), 1)",
                marginRight: "5px",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
  ];
  return (
    <section
      style={{
        marginBottom: "30px",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        flexWrap: "wrap",
      }}
    >
      <Descriptions
        className="xuiDescription"
        data={surgeTrafficDataOne}
        row
        size="large"
      />
      <Descriptions
        className="xuiDescription"
        data={surgeTrafficDataTwo}
        row
        size="large"
      />
    </section>
  );
}

export default SurgeTraffic;
