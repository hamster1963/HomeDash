import { Card, Progress, Typography } from "@douyinfe/semi-ui";

import { getDaysBetweenDates } from "@/app/home/utils/functions";

type PayCardProps = {
  service: string;
  expireDate: string;
};

function PayDetailCard(props: PayCardProps) {
  const { service, expireDate } = props;

  // 获取今天的日期
  const today = new Date().toISOString().split("T")[0];
  const daysRemain: number = getDaysBetweenDates(today!.toString(), expireDate);
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
            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(var(--semi-grey-7), 1)",
              }}
            >
              {daysRemain}天
            </div>
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
      <PayDetailCard service="XGP 会员" expireDate={"2024-09-25"} />
    </div>
  );
}
