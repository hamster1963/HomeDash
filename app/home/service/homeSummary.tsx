import { Card, Tag, Typography } from "@douyinfe/semi-ui";
import Image from "next/image";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

type HomeCardProps = {
  type: string;
  status: boolean;
  value: string;
  img: string;
};

const HomeCard = ({ type, status, value, img }: HomeCardProps) => {
  const { Title } = Typography;
  return (
    <Card
      style={{
        flex: 1,
        minWidth: "260px",
        margin: "10px",
        borderRadius: "20px",
        background: status ? "rgba(var(--semi-green-0), 1)" : "",
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
            heading={6}
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
};

export default function HomeSummary() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetHomeDataSSE",
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
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        <HomeCard
          type={"空调"}
          status={data ? data?.homeData.AirConditioner.state : false}
          value={data ? data?.homeData.AirConditioner.temp + "°C" : "离线中"}
          img={"/air.png"}
        />

        <HomeCard
          type={"加湿器"}
          status={data ? data?.homeData.Humidifier.state : false}
          value={data ? data?.homeData.Humidifier.humidity + "%" : "离线中"}
          img={"/wet.png"}
        />

        <HomeCard
          type={"空气净化器"}
          status={data ? data?.homeData.AirPurifier.state : false}
          value={data ? data?.homeData.AirPurifier.pm25 + "ug/m³" : "离线中"}
          img={"/tree.png"}
        />
        <HomeCard
          type={"卧室床头灯"}
          status={data ? data?.homeData.Light.state : false}
          value={data ? data?.homeData.Light.brightness + "%" : "离线中"}
          img={"/light.png"}
        />
      </div>
    </>
  );
}
