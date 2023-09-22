import { Card, Tag, Typography } from "@douyinfe/semi-ui";
import Image from "next/image";

type HomeCardProps = {
  type: string;
  status: boolean;
  value: string;
  img: string;
};

function HomeCard({ type, status, value, img }: HomeCardProps) {
  const { Title } = Typography;
  return (
    <Card
      style={{
        flex: 1,
        minWidth: "270px",
        margin: "10px",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Title
            heading={5}
            style={{
              color: "rgba(var(--semi-grey-9), 1)",
            }}
          >
            {type}
            <Tag
              style={{
                marginLeft: "5px",
              }}
              size="small"
              shape="circle"
              color={status ? "green" : "amber"}
            >
              {" "}
              {status ? "运行中" : "已关闭"}{" "}
            </Tag>
          </Title>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Title
              heading={4}
              style={{
                color: "rgba(var(--semi-grey-9), 1)",
              }}
            >
              {value}
            </Title>
          </div>
        </div>
        <Image src={img} alt={"air"} width={80} height={80} />
      </div>
    </Card>
  );
}

export default function HomeSummary() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "30px",
          marginRight: "30px",
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
          // backgroundColor: "rgba(var(--semi-grey-0), 1)",
        }}
      >
        <HomeCard type={"空调"} status={true} value={"22°C"} img={"/air.png"} />

        <HomeCard
          type={"加湿器"}
          status={true}
          value={"22%"}
          img={"/wet.png"}
        />

        <HomeCard
          type={"空气净化器"}
          status={false}
          value={"36ug/m³"}
          img={"/tree.png"}
        />
        <HomeCard
          type={"当前电量"}
          status={true}
          value={"2.0w"}
          img={"/light.png"}
        />
      </div>
    </>
  );
}
