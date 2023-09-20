import { Card, Descriptions, Progress } from "@douyinfe/semi-ui";

type ServiceCardProps = {
  title: string;
  value: string;
  percent: number;
};

function ServiceCard(props: ServiceCardProps) {
  const { title, value, percent } = props;
  const data = [
    {
      key: title,
      value: value,
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
          percent={percent}
          showInfo={true}
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
        backgroundColor: "rgba(var(--semi-grey-0), 1)",
      }}
    >
      <ServiceCard title={"核心服务"} value={"4/4"} percent={100} />
      <ServiceCard title={"分布式终端"} value={"4/4"} percent={100} />
      <ServiceCard title={"Docker存活"} value={"4/4"} percent={100} />
      <ServiceCard title={"证书有效期"} value={"4/4"} percent={100} />
    </div>
  );
}
