import { Card, Progress, Typography } from "@douyinfe/semi-ui";

type PayCardProps = {
  service: string;
  expireDate: string;
};

function PayDetailCard(props: PayCardProps) {
  const { service, expireDate } = props;
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
  const daysRemain: number = getDaysBetweenDates(today, expireDate);
  const remainPercent: string = ((daysRemain / 365) * 100).toFixed(2);
  const { Title } = Typography;
  return (
    <Card
      style={{
        flex: 1,
        minWidth: "220px",
        margin: "10px",
        borderRadius: "15px",
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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title
            heading={4}
            style={{
              color: "rgba(var(--semi-grey-9), 1)",
            }}
          >
            {service}
          </Title>
          <Title
            heading={5}
            style={{
              color: "rgba(var(--semi-grey-9), 1)",
            }}
          >
            <Title
              heading={6}
              style={{
                fontSize: "0.8rem",
                color: "rgba(var(--semi-grey-7), 1)",
              }}
            >
              {daysRemain}天
            </Title>
            {remainPercent}%
          </Title>
        </div>

        <Progress
          percent={Number(remainPercent)}
          stroke={"rgba(var(--semi-grey-9), 1)"}
          orbitStroke={"rgba(var(--semi-grey-3), 1)"}
          style={{
            height: "8px",
            marginTop: "10px",
          }}
        />
      </div>
    </Card>
  );
}

export default function PaySummary() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "10px",
      }}
    >
      <PayDetailCard service="阿里云服务器" expireDate={"2024-09-15"} />
      <PayDetailCard service="buycoffee.top 域名" expireDate={"2024-05-19"} />
    </div>
  );
}
