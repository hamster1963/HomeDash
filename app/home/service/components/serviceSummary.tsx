import { Card, Descriptions, Progress } from "@douyinfe/semi-ui";
import { z } from "zod";

import { getDaysBetweenDates } from "@/app/home/utils/functions";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

type ServiceCardProps = {
  title: string;
  totalValue: number;
  runningValue: number;
};

export function ServiceCard(props: ServiceCardProps) {
  const { title, totalValue, runningValue } = props;
  const data = [
    {
      key: title,
      value: runningValue ? runningValue + "/" + totalValue : "0/0",
      style: { paddingRight: "0px" },
    },
  ];
  return (
    <Card
      style={{
        flex: 1,
        minWidth: "220px",
        margin: "10px",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Progress
          percent={
            runningValue
              ? Number(((runningValue / totalValue) * 100).toFixed(0))
              : 0
          }
          showInfo={true}
          format={(percent) => (
            <div style={{ fontWeight: "bolder" }}>{percent}%</div>
          )}
          stroke={
            Number(((runningValue / totalValue) * 100).toFixed(0)) < 80
              ? "rgba(var(--semi-orange-5), 1)"
              : Number(((runningValue / totalValue) * 100).toFixed(0)) < 50
              ? "rgba(var(--semi-red-5), 1)"
              : "rgba(var(--semi-green-5), 1)"
          }
          type="circle"
          strokeWidth={10}
          aria-label={title}
        />
        <Descriptions
          data={data}
          row
          size="medium"
          style={{
            marginLeft: "10px",
          }}
        />
      </div>
    </Card>
  );
}

const serviceSummarySchema = z.object({
  serverCount: z.number(),
  errorCount: z.number(),
  dockerStatus: z.object({
    ServerCount: z.number(),
    ErrorServer: z.number(),
    DockerCount: z.number(),
    ErrorDocker: z.number(),
  }),
});

export default function ServiceSummary() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetDockerMonitorSSE",
  );
  const serviceSummaryValidation = serviceSummarySchema.safeParse(data);

  const today = new Date().toISOString().split("T")[0];
  const date2: string = "2023-12-16";
  const daysBetween: number = getDaysBetweenDates(today!.toString(), date2);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "stretch",
        alignItems: "center",
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "20px",
        minWidth: "250px",
        padding: "10px",
        flexWrap: "wrap",
      }}
    >
      <ServiceCard
        title={"核心服务"}
        totalValue={
          serviceSummaryValidation.success
            ? serviceSummaryValidation.data.serverCount
            : 0
        }
        runningValue={
          serviceSummaryValidation.success
            ? serviceSummaryValidation.data.serverCount -
              serviceSummaryValidation.data.errorCount
            : 0
        }
      />
      <ServiceCard
        title={"分布式终端"}
        totalValue={
          serviceSummaryValidation.success
            ? serviceSummaryValidation.data.dockerStatus.ServerCount
            : 0
        }
        runningValue={
          serviceSummaryValidation.success
            ? serviceSummaryValidation.data.dockerStatus.ServerCount -
              serviceSummaryValidation.data.dockerStatus.ErrorServer
            : 0
        }
      />
      <ServiceCard
        title={"Docker存活"}
        totalValue={
          serviceSummaryValidation.success
            ? serviceSummaryValidation.data.dockerStatus.DockerCount
            : 0
        }
        runningValue={
          serviceSummaryValidation.success
            ? serviceSummaryValidation.data.dockerStatus.DockerCount -
              serviceSummaryValidation.data.dockerStatus.ErrorDocker
            : 0
        }
      />
      <ServiceCard
        title={"证书有效期"}
        totalValue={90}
        runningValue={daysBetween}
      />
    </div>
  );
}
