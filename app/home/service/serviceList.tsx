import { Card, Progress, Tag, Typography } from "@douyinfe/semi-ui";
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
          percent={availability}
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

export default function ServiceList() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetUptimeDataSSE",
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "10px",
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
          backgroundColor: "rgba(var(--semi-grey-0), 1)",
        }}
      >
        <ServerDetailCard
          type={"核心服务"}
          service={"X-UI面板"}
          status={data ? data?.uptimeData?.xui?.status : false}
          availability={data ? data?.uptimeData?.xui?.uptime : 0}
          ping={data ? data?.uptimeData?.xui?.ping : 0}
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"V2raya"}
          status={data ? data?.uptimeData?.v2raya?.status : false}
          availability={data ? data?.uptimeData?.v2raya?.uptime : 0}
          ping={data ? data?.uptimeData?.v2raya?.ping : 0}
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"科学上网"}
          status={data ? data?.uptimeData?.proxy?.status : false}
          availability={data ? data?.uptimeData?.proxy?.uptime : 0}
          ping={data ? data?.uptimeData?.proxy?.ping : 0}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "10px",
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
          backgroundColor: "rgba(var(--semi-grey-0), 1)",
        }}
      >
        <ServerDetailCard
          type={"核心服务"}
          service={"NGINX"}
          status={data ? data?.uptimeData?.nginx?.status : false}
          availability={data ? data?.uptimeData?.nginx?.uptime : 0}
          ping={data ? data?.uptimeData?.nginx?.ping : 0}
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"智能家居"}
          status={data ? data?.uptimeData?.home?.status : false}
          availability={data ? data?.uptimeData?.home?.uptime : 0}
          ping={data ? data?.uptimeData?.home?.ping : 0}
        />
        <ServerDetailCard
          type={"核心服务"}
          service={"Netflix 连通性"}
          status={data ? data?.uptimeData?.netflix?.status : false}
          availability={data ? data?.uptimeData?.netflix?.uptime : 0}
          ping={data ? data?.uptimeData?.netflix?.ping : 0}
        />
      </div>
    </>
  );
}
