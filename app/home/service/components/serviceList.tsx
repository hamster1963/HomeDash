import { Card, Progress, Tag, Typography } from "@douyinfe/semi-ui";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

type ServiceCardProps = {
  type: string;
  service: string;
  status: boolean;
  ping: number;
  availability: number;
};

function ServerDetailCard(props: ServiceCardProps) {
  const { type, service, ping, status, availability } = props;
  const { Title } = Typography;
  return (
    <Card
      style={{
        flex: 1,
        minWidth: "220px",
        margin: "10px",
        borderRadius: "15px",
        border: "none",
        backgroundColor: status
          ? "rgba(var(--semi-green-5), 1)"
          : "rgba(var(--semi-red-5), 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Title
            heading={6}
            style={{
              fontSize: "0.9rem",
              color: status
                ? "rgba(var(--semi-green-1), 1)"
                : "rgba(var(--semi-red-1), 1)",
            }}
          >
            {type}
          </Title>
          {!status && (
            <Tag
              style={{
                marginLeft: "5px",
                backgroundColor: "rgba(var(--semi-red-6), 1)",
              }}
              type={"solid"}
            >
              {" "}
              Offline{" "}
            </Tag>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title
            heading={4}
            style={{
              color: status
                ? "rgba(var(--semi-green-0), 1)"
                : "rgba(var(--semi-red-0), 1)",
            }}
          >
            {service}
          </Title>
          <Title
            heading={5}
            style={{
              color: status
                ? "rgba(var(--semi-green-0), 1)"
                : "rgba(var(--semi-red-0), 1)",
            }}
          >
            <Title
              heading={6}
              style={{
                fontSize: "0.8rem",
                color: status
                  ? "rgba(var(--semi-green-1), 1)"
                  : "rgba(var(--semi-red-1), 1)",
              }}
            >
              {ping}ms
            </Title>
            {availability}%
          </Title>
        </div>

        <Progress
          percent={Number(availability)}
          stroke={
            status
              ? "rgba(var(--semi-green-0), 1)"
              : "rgba(var(--semi-red-0), 1)"
          }
          orbitStroke={
            status
              ? "rgba(var(--semi-green-3), 1)"
              : "rgba(var(--semi-red-3), 1)"
          }
          style={{
            height: "8px",
            marginTop: "10px",
          }}
        />
      </div>
    </Card>
  );
}

const serviceInfoSchema = z.object({
  xui: z.object({
    status: z.boolean(),
    uptime: z.string(),
    ping: z.number(),
  }),
  v2raya: z.object({
    status: z.boolean(),
    uptime: z.string(),
    ping: z.number(),
  }),
  proxy: z.object({
    status: z.boolean(),
    uptime: z.string(),
    ping: z.number(),
  }),
  nginx: z.object({
    status: z.boolean(),
    uptime: z.string(),
    ping: z.number(),
  }),
  home: z.object({
    status: z.boolean(),
    uptime: z.string(),
    ping: z.number(),
  }),
  netflix: z.object({
    status: z.boolean(),
    uptime: z.string(),
    ping: z.number(),
  }),
});

export default function ServiceList() {
  const serviceListGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetUptimeDataSSE",
  );
  const uptimeValidation = serviceInfoSchema.safeParse(
    serviceListGetData?.uptimeData,
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "10px",
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        <ServerDetailCard
          type={"核心服务"}
          service={"X-UI面板"}
          status={
            uptimeValidation.success ? uptimeValidation.data.xui.status : false
          }
          availability={
            uptimeValidation.success
              ? Number(uptimeValidation.data.xui.uptime)
              : 0
          }
          ping={uptimeValidation.success ? uptimeValidation.data.xui.ping : 0}
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"V2raya"}
          status={
            uptimeValidation.success
              ? uptimeValidation.data.v2raya?.status
              : false
          }
          availability={
            uptimeValidation.success
              ? Number(uptimeValidation.data.v2raya?.uptime)
              : 0
          }
          ping={
            uptimeValidation.success ? uptimeValidation.data.v2raya?.ping : 0
          }
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"科学上网"}
          status={
            uptimeValidation.success
              ? uptimeValidation.data.proxy?.status
              : false
          }
          availability={
            uptimeValidation.success
              ? Number(uptimeValidation.data.proxy?.uptime)
              : 0
          }
          ping={
            uptimeValidation.success ? uptimeValidation.data.proxy?.ping : 0
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "10px",
          marginRight: "10px",
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        <ServerDetailCard
          type={"核心服务"}
          service={"NGINX"}
          status={
            uptimeValidation.success
              ? uptimeValidation.data.nginx?.status
              : false
          }
          availability={
            uptimeValidation.success
              ? Number(uptimeValidation.data.nginx?.uptime)
              : 0
          }
          ping={
            uptimeValidation.success ? uptimeValidation.data.nginx?.ping : 0
          }
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"智能家居"}
          status={
            uptimeValidation.success ? uptimeValidation.data.home.status : false
          }
          availability={
            uptimeValidation.success
              ? Number(uptimeValidation.data.home.uptime)
              : 0
          }
          ping={uptimeValidation.success ? uptimeValidation.data.home.ping : 0}
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"Netflix 连通性"}
          status={
            uptimeValidation.success
              ? uptimeValidation.data.netflix.status
              : false
          }
          availability={
            uptimeValidation.success
              ? Number(uptimeValidation.data.netflix.uptime)
              : 0
          }
          ping={
            uptimeValidation.success ? uptimeValidation.data.netflix.ping : 0
          }
        />
      </div>
    </>
  );
}
