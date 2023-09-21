import { Card, Descriptions, Progress } from "@douyinfe/semi-ui";
import { SSEDataFetch } from "@/app/home/utils/sse";

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

export default function ServiceSummary() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetDockerMonitorSSE",
  );
  function getDaysBetweenDates(date1: string, date2: string): number {
    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // 计算两个日期之间的天数差异
    return Math.round(
      Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay),
    );
  }

  // 获取今天的日期
  const today: string = new Date().toISOString().split("T")[0];
  const date2: string = "2023-12-16";
  const daysBetween: number = getDaysBetweenDates(today, date2);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "stretch",
        alignItems: "center",
        marginLeft: "30px",
        marginRight: "30px",
        borderRadius: "20px",
        minWidth: "250px",
        padding: "10px",
        flexWrap: "wrap",
        // backgroundColor: "rgba(var(--semi-grey-0), 1)",
      }}
    >
      <ServiceCard
        title={"核心服务"}
        totalValue={data?.dockerData.serverCount}
        runningValue={
          data?.dockerData.serverCount - data?.dockerData.errorCount
        }
      />
      <ServiceCard
        title={"分布式终端"}
        totalValue={data?.dockerData.dockerStatus?.ServerCount}
        runningValue={
          data?.dockerData.dockerStatus?.ServerCount -
          data?.dockerData.dockerStatus?.ErrorServer
        }
      />
      <ServiceCard
        title={"Docker存活"}
        totalValue={data?.dockerData?.dockerStatus?.DockerCount}
        runningValue={
          data?.dockerData?.dockerStatus?.DockerCount -
          data?.dockerData?.dockerStatus?.ErrorDocker
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
